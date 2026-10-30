import { Pool } from 'pg';
import { randomBytes } from 'node:crypto';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

const statuses = ['pending', 'confirmed', 'delivered', 'cancelled'];
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function json(data, status = 200) {
  return Response.json(data, { status });
}

function error(message, status = 400) {
  return json({ error: message }, status);
}

function orderNumber() {
  const date = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Johannesburg',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date()).replace(/\//g, '');

  return `#YT-${date}-${randomBytes(2).toString('hex').toUpperCase()}`;
}

async function requireAdmin(request) {
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : '';

  if (!token) return null;

  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase authentication environment variables are missing.');
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;

  const user = await response.json();
  if (!user?.id) return null;

  const result = await pool.query(
    'SELECT id FROM public.admins WHERE id = $1 LIMIT 1',
    [user.id]
  );

  return result.rowCount ? user : null;
}

async function createOrder(body) {
  const customerName = String(body?.customer_name || '').trim();
  const customerPhone = String(body?.customer_phone || '').replace(/\D/g, '');
  const submittedItems = body?.items;

  if (customerName.length < 2 || customerName.length > 120) {
    return error('Please provide a valid full name.');
  }

  if (customerPhone.length < 7 || customerPhone.length > 15) {
    return error('Please provide a valid WhatsApp number.');
  }

  if (!Array.isArray(submittedItems) || submittedItems.length < 1 || submittedItems.length > 50) {
    return error('Your cart is empty or contains too many items.');
  }

  const quantities = new Map();

  for (const item of submittedItems) {
    const id = String(item?.product_id || '');
    const quantity = Number(item?.quantity);

    if (!uuidPattern.test(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return error('One or more cart items are invalid.');
    }

    quantities.set(id, (quantities.get(id) || 0) + quantity);
  }

  for (const quantity of quantities.values()) {
    if (quantity > 20) return error('Maximum quantity per product is 20.');
  }

  const productIds = [...quantities.keys()];
  const productResult = await pool.query(
    `SELECT id, name, price
     FROM public.products
     WHERE id = ANY($1::uuid[])
       AND is_active IS TRUE`,
    [productIds]
  );

  if (productResult.rowCount !== productIds.length) {
    return error('A product in your cart is no longer available. Please refresh your cart.', 409);
  }

  const products = productResult.rows.map((product) => {
    const unitCents = Math.round(Number(product.price) * 100);
    return {
      product_id: product.id,
      product_name: product.name,
      unit_price: (unitCents / 100).toFixed(2),
      quantity: quantities.get(product.id),
      line_total: ((unitCents * quantities.get(product.id)) / 100).toFixed(2),
      line_cents: unitCents * quantities.get(product.id),
    };
  });

  const subtotalCents = products.reduce((sum, item) => sum + item.line_cents, 0);
  const subtotal = (subtotalCents / 100).toFixed(2);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const insertedOrder = await client.query(
      `INSERT INTO public.orders
         (order_number, customer_name, customer_phone, subtotal, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING id, order_number, customer_name, customer_phone,
                 subtotal, status, created_at, updated_at`,
      [orderNumber(), customerName, customerPhone, subtotal]
    );

    const order = insertedOrder.rows[0];

    for (const item of products) {
      await client.query(
        `INSERT INTO public.order_items
           (order_id, product_id, product_name, unit_price, quantity)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          order.id,
          item.product_id,
          item.product_name,
          item.unit_price,
          item.quantity,
        ]
      );
    }

    await client.query('COMMIT');

    return json({
      order: {
        ...order,
        subtotal: Number(order.subtotal),
        items: products.map(({ line_cents, ...item }) => item),
      },
    }, 201);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function listOrders() {
  const result = await pool.query(
    `SELECT id, order_number, customer_name, customer_phone,
            subtotal, status, created_at, updated_at
     FROM public.orders
     ORDER BY created_at DESC`
  );

  if (!result.rowCount) return json({ orders: [] });

  const ids = result.rows.map((order) => order.id);
  const itemResult = await pool.query(
    `SELECT order_id, product_id, product_name, unit_price, quantity
     FROM public.order_items
     WHERE order_id = ANY($1::uuid[])
     ORDER BY created_at ASC`,
    [ids]
  );

  const itemsByOrder = new Map();

  for (const item of itemResult.rows) {
    const items = itemsByOrder.get(item.order_id) || [];
    items.push({
      product_id: item.product_id,
      name: item.product_name,
      price: Number(item.unit_price),
      qty: item.quantity,
    });
    itemsByOrder.set(item.order_id, items);
  }

  return json({
    orders: result.rows.map((order) => ({
      ...order,
      subtotal: Number(order.subtotal),
      items: itemsByOrder.get(order.id) || [],
    })),
  });
}

export default async (request) => {
  try {
    if (!process.env.SUPABASE_DB_URL) {
      return error('Order service is not configured.', 500);
    }

    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    if (method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch {
        return error('Invalid request body.');
      }
      return await createOrder(body);
    }

    if (!['GET', 'PATCH', 'DELETE'].includes(method)) {
      return error('Method not allowed.', 405);
    }

    const admin = await requireAdmin(request);
    if (!admin) return error('You are not authorised to manage orders.', 401);

    if (method === 'GET') {
      return await listOrders();
    }

    const body = method === 'DELETE' ? {} : await request.json();
    const id = String(body.id || url.searchParams.get('id') || '');

    if (!uuidPattern.test(id)) return error('Invalid order ID.');

    if (method === 'PATCH') {
      const status = String(body.status || '');

      if (!statuses.includes(status)) return error('Invalid order status.');

      const result = await pool.query(
        `UPDATE public.orders
         SET status = $1, updated_at = now()
         WHERE id = $2
         RETURNING id, order_number, status`,
        [status, id]
      );

      if (!result.rowCount) return error('Order not found.', 404);
      return json({ order: result.rows[0] });
    }

    const result = await pool.query(
      `DELETE FROM public.orders
       WHERE id = $1
       RETURNING id, order_number`,
      [id]
    );

    if (!result.rowCount) return error('Order not found.', 404);
    return json({ deleted: result.rows[0] });
  } catch (err) {
    console.error('Orders function error:', err);
    return error('The order request could not be completed.', 500);
  }
};
