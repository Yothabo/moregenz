import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function json(data, status = 200) {
  return Response.json(data, { status });
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

function validateProduct(body) {
  const name = String(body?.name || '').trim();
  const price = Number(body?.price);
  const category = String(body?.category || '');
  const subcategory = String(body?.subcategory || '').trim();
  const description = body?.description
    ? String(body.description).trim()
    : null;
  const imageUrl = body?.image_url
    ? String(body.image_url).trim()
    : null;
  const isActive = body?.is_active;
  const sortOrder = Number(body?.sort_order ?? 0);

  if (name.length < 1 || name.length > 160) {
    return { error: 'Product name must be between 1 and 160 characters.' };
  }

  if (!Number.isFinite(price) || price <= 0 || price > 1000000) {
    return { error: 'Please provide a valid product price.' };
  }

  if (!['His', 'Hers', 'Spaces'].includes(category)) {
    return { error: 'Please select a valid category.' };
  }

  if (!subcategory || subcategory.length > 100) {
    return { error: 'Please provide a valid subcategory.' };
  }

  if (typeof isActive !== 'boolean') {
    return { error: 'Please provide a valid product status.' };
  }

  if (!Number.isInteger(sortOrder) || sortOrder < 0) {
    return { error: 'Please provide a valid sort order.' };
  }

  if (description && description.length > 10000) {
    return { error: 'Product description is too long.' };
  }

  if (imageUrl && imageUrl.length > 2048) {
    return { error: 'Product image URL is too long.' };
  }

  return {
    product: {
      name,
      price: Math.round(price * 100) / 100,
      category,
      subcategory,
      description,
      image_url: imageUrl,
      is_active: isActive,
      sort_order: sortOrder,
    },
  };
}

async function saveProduct(request, body, isUpdate) {
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
  const values = [
    product.name,
    product.price,
    product.category,
    product.subcategory,
    product.description,
    product.image_url,
    product.is_active,
    product.sort_order,
  ];

  let result;

  if (isUpdate) {
    result = await pool.query(
      `UPDATE public.products
       SET name = $1,
           price = $2,
           category = $3,
           subcategory = $4,
           description = $5,
           image_url = $6,
           is_active = $7,
           sort_order = $8
       WHERE id = $9
       RETURNING id, name, price, category, subcategory, description,
                 image_url, is_active, sort_order`,
      [...values, body.id]
    );
  } else {
    result = await pool.query(
      `INSERT INTO public.products
         (name, price, category, subcategory, description, image_url,
          is_active, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, name, price, category, subcategory, description,
                 image_url, is_active, sort_order`,
      values
    );
  }

  if (!result.rowCount) {
    return json({ error: 'Product not found.' }, 404);
  }

  return json({ product: result.rows[0] }, isUpdate ? 200 : 201);
}

export default async (request) => {
  try {
    if (!['POST', 'PATCH'].includes(request.method)) {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const admin = await requireAdmin(request);
    if (!admin) {
      return json({ error: 'You are not authorised to manage products.' }, 401);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid request body.' }, 400);
    }

    return await saveProduct(request, body, request.method === 'PATCH');
  } catch (error) {
    console.error('Products function error:', error);
    return json({ error: 'Unable to save the product right now.' }, 500);
  }
};
