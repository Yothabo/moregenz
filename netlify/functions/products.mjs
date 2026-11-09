import { Pool } from 'pg';
import { requireAdmin } from './_shared/auth.mjs';
import { validateProduct, uuidPattern } from './_shared/product-validation.mjs';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

function json(data, status = 200) {
  return Response.json(data, { status });
}

async function saveProduct(body, isUpdate, admin) {
  if (isUpdate) {
    const id = String(body?.id || '');
    if (!uuidPattern.test(id)) {
      return json({ error: 'A valid product ID is required.' }, 400);
    }
  }

  const validation = validateProduct(body);
  if (validation.error) {
    return json({ error: validation.error }, 400);
  }

  const product = validation.product;

  if (admin.role === 'store_admin') {
    if (product.storefront && product.storefront !== admin.store_slug) {
      return json({ error: 'You cannot manage products for another storefront.' }, 403);
    }

    product.storefront = admin.store_slug;
  } else if (!isUpdate && !product.storefront) {
    return json({ error: 'A storefront is required for a new product.' }, 400);
  }

  const client = await pool.connect();
  let result;

  try {
    await client.query('BEGIN');
    await client.query(
      "SELECT set_config('app.actor_email', $1, true)",
      [admin.email || '']
    );

    // On updates, retain the product's existing storefront.
    // Store admins are restricted to products belonging to their own store.
    let existingProduct = null;

    if (isUpdate) {
      const existing = await client.query(
        `SELECT storefront, category_id, subcategory_id
         FROM public.products
         WHERE id = $1
           AND ($2::text IS NULL OR storefront = $2)
         FOR UPDATE`,
        [body.id, admin.role === 'store_admin' ? admin.store_slug : null]
      );

      if (!existing.rowCount) {
        await client.query('ROLLBACK');
        return json({ error: 'Product not found.' }, 404);
      }

      existingProduct = existing.rows[0];
      product.storefront = existingProduct.storefront;
    }

    const storeResult = await client.query(
      `SELECT id
       FROM public.stores
       WHERE slug = $1`,
      [product.storefront]
    );

    if (!storeResult.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'The selected storefront does not exist.' }, 400);
    }

    const storeId = storeResult.rows[0].id;

    // Resolve category IDs within the effective storefront.
    // Legacy Poshies "Spaces" submissions resolve to canonical "Lounge".
    const categoryResult = product.category_id
      ? await client.query(
          `SELECT id, name, is_active
           FROM public.categories
           WHERE id = $1
             AND store_id = $2
             AND (is_active IS TRUE OR id = $3)`,
          [product.category_id, storeId, existingProduct?.category_id ?? null]
        )
      : await client.query(
          `SELECT id, name, is_active
           FROM public.categories
           WHERE store_id = $1
             AND is_active IS TRUE
             AND lower(name) = lower(
               CASE
                 WHEN $2 = 'poshies' AND lower(trim($3)) = 'spaces'
                   THEN 'Lounge'
                 ELSE trim($3)
               END
             )`,
          [storeId, product.storefront, product.category]
        );

    if (!categoryResult.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'The selected category is not available in this storefront.' }, 400);
    }

    const category = categoryResult.rows[0];

    // Resolve the subcategory within the selected category and storefront.
    const subcategoryResult = product.subcategory_id
      ? await client.query(
          `SELECT id, name
           FROM public.subcategories
           WHERE id = $1
             AND store_id = $2
             AND category_id = $3
             AND (is_active IS TRUE OR id = $4)
             AND ( $5::boolean IS TRUE OR id = $4 )`,
          [
            product.subcategory_id,
            storeId,
            category.id,
            existingProduct?.subcategory_id ?? null,
            category.is_active,
          ]
        )
      : await client.query(
          `SELECT id, name
           FROM public.subcategories
           WHERE store_id = $1
             AND category_id = $2
             AND is_active IS TRUE
             AND lower(name) = lower(trim($3))`,
          [storeId, category.id, product.subcategory]
        );

    if (!subcategoryResult.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'The selected subcategory is not available under this category.' }, 400);
    }

    const subcategory = subcategoryResult.rows[0];

    const values = [
      product.name,
      product.price,
      category.name,
      subcategory.name,
      product.description,
      product.image_url,
      product.is_active,
      product.sort_order,
      product.storefront,
      storeId,
      category.id,
      subcategory.id,
    ];

    if (isUpdate) {
      result = await client.query(
        `UPDATE public.products
         SET name = $1,
             price = $2,
             category = $3,
             subcategory = $4,
             description = $5,
             image_url = $6,
             is_active = $7,
             sort_order = $8,
             storefront = $9,
             store_id = $10,
             category_id = $11,
             subcategory_id = $12
         WHERE id = $13
           AND ($14::text IS NULL OR storefront = $14)
         RETURNING id, name, price, category, subcategory,
                   description, image_url, is_active, sort_order,
                   storefront, store_id, category_id, subcategory_id`,
        [
          ...values,
          body.id,
          admin.role === 'store_admin' ? admin.store_slug : null,
        ]
      );
    } else {
      result = await client.query(
        `INSERT INTO public.products
           (name, price, category, subcategory, description, image_url,
            is_active, sort_order, storefront, store_id, category_id,
            subcategory_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING id, name, price, category, subcategory,
                   description, image_url, is_active, sort_order,
                   storefront, store_id, category_id, subcategory_id`,
        values
      );
    }

    if (!result.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'Product not found.' }, 404);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

  return json({ product: result.rows[0] }, isUpdate ? 200 : 201);
}

async function listProducts(request) {
  const url = new URL(request.url);
  const isAdminRequest = url.searchParams.get('scope') === 'admin';
  let requestedStorefront = url.searchParams.get('storefront')?.trim().toLowerCase() || null;

  if (requestedStorefront && !['yotaabo', 'poshies'].includes(requestedStorefront)) {
    return json({ error: 'Invalid storefront.' }, 400);
  }

  if (isAdminRequest) {
    const admin = await requireAdmin(request, pool);

    if (!admin) {
      return json({ error: 'You are not authorised to view products.' }, 401);
    }

    if (admin.role === 'store_admin') {
      if (requestedStorefront && requestedStorefront !== admin.store_slug) {
        return json({ error: 'You cannot view another storefront.' }, 403);
      }
      requestedStorefront = admin.store_slug;
    }
  }

  const storefrontFilter = requestedStorefront || (isAdminRequest ? null : 'yotaabo');
  const filters = [];
  const queryValues = [];

  if (!isAdminRequest) filters.push('is_active = TRUE');

  if (storefrontFilter) {
    queryValues.push(storefrontFilter);
    filters.push(`storefront = $${queryValues.length}`);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const result = await pool.query(
    `SELECT *
     FROM public.products
     ${whereClause}
     ORDER BY category ASC, sort_order ASC, created_at DESC`,
    queryValues
  );

  return new Response(JSON.stringify({ products: result.rows }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': isAdminRequest
        ? 'private, no-store'
        : 'public, max-age=30, s-maxage=300, stale-while-revalidate=600',
    },
  });
}

async function updateProductStatus(body, admin) {
  const id = String(body?.id || '');

  if (!uuidPattern.test(id)) {
    return json({ error: 'A valid product ID is required.' }, 400);
  }

  if (typeof body?.is_active !== 'boolean') {
    return json({ error: 'A valid product status is required.' }, 400);
  }

  const client = await pool.connect();
  let result;

  try {
    await client.query('BEGIN');
    await client.query(
      "SELECT set_config('app.actor_email', $1, true)",
      [admin.email || '']
    );

    result = await client.query(
      `UPDATE public.products
       SET is_active = $1
       WHERE id = $2
         AND ($3::text IS NULL OR storefront = $3)
       RETURNING id, name, is_active`,
      [body.is_active, id, admin.role === 'store_admin' ? admin.store_slug : null]
    );

    if (!result.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'Product not found.' }, 404);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

  return json({ product: result.rows[0] });
}

async function deleteProduct(body, admin) {
  const id = String(body?.id || '');

  if (!uuidPattern.test(id)) {
    return json({ error: 'A valid product ID is required.' }, 400);
  }

  const client = await pool.connect();
  let result;

  try {
    await client.query('BEGIN');
    await client.query(
      "SELECT set_config('app.actor_email', $1, true)",
      [admin.email || '']
    );

    result = await client.query(
      `DELETE FROM public.products
       WHERE id = $1
         AND ($2::text IS NULL OR storefront = $2)
       RETURNING id, name, image_url, storefront`,
      [id, admin.role === 'store_admin' ? admin.store_slug : null]
    );

    if (!result.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'Product not found.' }, 404);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

  return json({ deleted: result.rows[0] });
}

export default async (request) => {
  try {
    if (request.method === 'GET') {
      return await listProducts(request);
    }

    if (!['POST', 'PATCH', 'DELETE'].includes(request.method)) {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const admin = await requireAdmin(request, pool);
    if (!admin) {
      return json({ error: 'You are not authorised to manage products.' }, 401);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid request body.' }, 400);
    }

    if (request.method === 'DELETE') {
      return await deleteProduct(body, admin);
    }

    if (request.method === 'PATCH' && body?.action === 'set-status') {
      return await updateProductStatus(body, admin);
    }

    return await saveProduct(body, request.method === 'PATCH', admin);
  } catch (error) {
    console.error('Products function error:', error);
    return json({ error: 'Unable to process the product request right now.' }, 500);
  }
};
