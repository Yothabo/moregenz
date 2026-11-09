import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

function json(data, status = 200, headers = {}) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'public, max-age=30, s-maxage=300, stale-while-revalidate=600',
      ...headers,
    },
  });
}

export default async (request) => {
  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  try {
    const url = new URL(request.url);
    const storefront = (
      url.searchParams.get('storefront') || 'yotaabo'
    ).trim().toLowerCase();

    if (!['yotaabo', 'poshies'].includes(storefront)) {
      return json({ error: 'Invalid storefront.' }, 400);
    }

    const result = await pool.query(
      `SELECT
         c.id,
         c.name,
         c.slug,
         c.sort_order,
         c.is_active,
         COALESCE(
           json_agg(
             json_build_object(
               'id', sc.id,
               'name', sc.name,
               'slug', sc.slug,
               'sort_order', sc.sort_order,
               'is_active', sc.is_active
             )
             ORDER BY sc.sort_order ASC, sc.name ASC
           ) FILTER (WHERE sc.id IS NOT NULL),
           '[]'::json
         ) AS subcategories
       FROM public.categories c
       JOIN public.stores s
         ON s.id = c.store_id
       LEFT JOIN public.subcategories sc
         ON sc.category_id = c.id
        AND sc.store_id = c.store_id
       WHERE s.slug = $1
       GROUP BY c.id, c.name, c.slug, c.sort_order, c.is_active
       ORDER BY c.sort_order ASC, c.name ASC`,
      [storefront]
    );

    return json({
      storefront,
      categories: result.rows,
    });
  } catch (error) {
    console.error('Categories function error:', error);
    return json(
      { error: 'Unable to load categories right now.' },
      500
    );
  }
};
