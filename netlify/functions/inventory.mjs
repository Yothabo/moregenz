import { Pool } from 'pg';
import { requireAdmin } from './_shared/auth.mjs';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const json = (data, status = 200) =>
  Response.json(data, { status });

const error = (message, status = 400) =>
  json({ error: message }, status);

async function resolveStore(admin, requestedStorefront) {
  const storefront = admin.role === 'store_admin'
    ? admin.store_slug
    : String(requestedStorefront || '').trim().toLowerCase();

  if (!storefront) return null;

  const result = await pool.query(
    `SELECT id, slug
     FROM public.stores
     WHERE slug = $1
       AND is_active IS TRUE
     LIMIT 1`,
    [storefront]
  );

  return result.rows[0] || null;
}

async function listInventory(store) {
  const [inventoryResult, movementsResult, aggregatesResult] =
    await Promise.all([
      pool.query(
        `SELECT
           p.id AS product_id,
           p.name AS product_name,
           p.sku,
           p.price,
           p.supplier_cost,
           p.image_url,
           p.is_active,
           COALESCE(b.on_hand_quantity, 0) AS on_hand_quantity,
           COALESCE(b.reserved_quantity, 0) AS reserved_quantity,
           COALESCE(
             b.on_hand_quantity - b.reserved_quantity, 0
           ) AS available_quantity,
           COALESCE(b.is_initialized, false) AS is_initialized,
           b.updated_at
         FROM public.products p
         LEFT JOIN public.inventory_balances b
           ON b.product_id = p.id
          AND b.store_id = p.store_id
         WHERE p.store_id = $1
         ORDER BY p.name ASC`,
        [store.id]
      ),
      pool.query(
        `SELECT
           m.id,
           m.product_id,
           p.name AS product_name,
           p.sku AS product_sku,
           m.movement_type,
           m.quantity_delta,
           m.reserved_delta,
           m.source_type,
           m.reason,
           m.actor_email,
           m.created_at
         FROM public.inventory_movements m
         INNER JOIN public.products p
           ON p.id = m.product_id
          AND p.store_id = m.store_id
         WHERE m.store_id = $1
         ORDER BY m.created_at DESC
         LIMIT 50`,
        [store.id]
      ),
      pool.query(
        `SELECT
           COALESCE(
             SUM(
               CASE
                 WHEN movement_type IN ('opening_stock', 'replenishment')
                   THEN GREATEST(quantity_delta, 0)
                 ELSE 0
               END
             ),
             0
           ) AS received,
           COALESCE(
             SUM(
               CASE
                 WHEN movement_type IN (
                   'adjustment_increase',
                   'adjustment_decrease'
                 )
                   THEN ABS(quantity_delta)
                 ELSE 0
               END
             ),
             0
           ) AS adjusted
         FROM public.inventory_movements
         WHERE store_id = $1`,
        [store.id]
      ),
    ]);

  return json({
    inventory: inventoryResult.rows,
    movements: movementsResult.rows,
    aggregates: aggregatesResult.rows[0] || {
      received: 0,
      adjusted: 0,
    },
  });
}

async function updateStock(body, admin, store) {
  const productId = String(body?.product_id || '');
  const action = String(body?.action || '');
  const quantity = Number(body?.quantity);
  const reason = String(body?.reason || '').trim();

  const allowedActions = [
    'opening-stock',
    'replenishment',
    'adjustment-increase',
    'adjustment-decrease',
  ];

  if (!uuidPattern.test(productId)) {
    return error('A valid product ID is required.');
  }

  if (!allowedActions.includes(action)) {
    return error('Invalid inventory action.');
  }

  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 1000000) {
    return error('Quantity must be a positive whole number.');
  }

  if (reason.length > 500) {
    return error('Reason cannot exceed 500 characters.');
  }

  if (action !== 'opening-stock' && !reason) {
    return error('A reason is required for this stock movement.');
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      "SELECT set_config('app.actor_email', $1, true)",
      [admin.email || '']
    );

    const productResult = await client.query(
      `SELECT id, name
       FROM public.products
       WHERE id = $1
         AND store_id = $2
       FOR UPDATE`,
      [productId, store.id]
    );

    if (!productResult.rowCount) {
      await client.query('ROLLBACK');
      return error('Product not found in this storefront.', 404);
    }

    await client.query(
      `INSERT INTO public.inventory_balances
         (store_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT (store_id, product_id) DO NOTHING`,
      [store.id, productId]
    );

    const balanceResult = await client.query(
      `SELECT on_hand_quantity, reserved_quantity, is_initialized
       FROM public.inventory_balances
       WHERE store_id = $1
         AND product_id = $2
       FOR UPDATE`,
      [store.id, productId]
    );

    const balance = balanceResult.rows[0];

    if (action === 'opening-stock' && balance.is_initialized) {
      await client.query('ROLLBACK');
      return error(
        'Opening stock has already been recorded. Use an adjustment instead.',
        409
      );
    }

    if (action !== 'opening-stock' && !balance.is_initialized) {
      await client.query('ROLLBACK');
      return error(
        'Record opening stock before making other stock movements.',
        409
      );
    }

    let movementType;
    let delta;

    switch (action) {
      case 'opening-stock':
        movementType = 'opening_stock';
        delta = quantity;
        break;
      case 'replenishment':
        movementType = 'replenishment';
        delta = quantity;
        break;
      case 'adjustment-increase':
        movementType = 'adjustment_increase';
        delta = quantity;
        break;
      case 'adjustment-decrease':
        movementType = 'adjustment_decrease';
        delta = -quantity;
        break;
    }

    const newOnHand = balance.on_hand_quantity + delta;

    if (newOnHand > 2147483647) {
      await client.query('ROLLBACK');
      return error(
        'The resulting stock balance exceeds the supported maximum.',
        409
      );
    }

    if (newOnHand < balance.reserved_quantity) {
      await client.query('ROLLBACK');
      return error(
        'This adjustment would reduce stock below the reserved quantity.',
        409
      );
    }

    await client.query(
      `UPDATE public.inventory_balances
       SET on_hand_quantity = $1,
           is_initialized = TRUE,
           updated_at = now()
       WHERE store_id = $2
         AND product_id = $3`,
      [newOnHand, store.id, productId]
    );

    await client.query(
      `INSERT INTO public.inventory_movements
         (store_id, product_id, movement_type,
          quantity_delta, reserved_delta,
          source_type, reason, actor_id, actor_email)
       VALUES ($1, $2, $3, $4, 0, 'manual', $5, $6, $7)`,
      [
        store.id,
        productId,
        movementType,
        delta,
        reason || 'Opening stock',
        admin.id,
        admin.email || null,
      ]
    );

    await client.query('COMMIT');

    return json({
      success: true,
      product_id: productId,
      movement_type: movementType,
      quantity_delta: delta,
      on_hand_quantity: newOnHand,
      reserved_quantity: balance.reserved_quantity,
      available_quantity: newOnHand - balance.reserved_quantity,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export default async (request) => {
  try {
    if (!process.env.SUPABASE_DB_URL) {
      return error('Inventory service is not configured.', 500);
    }

    if (!['GET', 'POST'].includes(request.method)) {
      return error('Method not allowed.', 405);
    }

    const admin = await requireAdmin(request, pool);

    if (!admin) {
      return error('You are not authorised to manage inventory.', 401);
    }

    let body = {};

    if (request.method === 'POST') {
      try {
        body = await request.json();
      } catch {
        return error('Invalid request body.');
      }
    }

    const url = new URL(request.url);
    const requestedStorefront =
      request.method === 'GET'
        ? url.searchParams.get('storefront')
        : body.storefront;

    const store = await resolveStore(admin, requestedStorefront);

    if (!store) {
      return error('A valid storefront is required.', 400);
    }

    if (request.method === 'GET') {
      return await listInventory(store);
    }

    return await updateStock(body, admin, store);
  } catch (err) {
    console.error('Inventory function error:', err);
    return error('Unable to process the inventory request.', 500);
  }
};
