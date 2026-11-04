import { Pool } from 'pg';
import { requireAdmin } from './_shared/auth.mjs';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
});

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'private, no-store' },
  });
}

export default async (request) => {
  try {
    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const admin = await requireAdmin(request, pool);

    if (!admin) {
      return json({ error: 'Not authorised.' }, 401);
    }

    const storeSlug =
      admin.role === 'store_admin' ? admin.store_slug : null;

    const result = await pool.query(
      `SELECT
         a.id,
         a.event_type,
         a.entity_type,
         a.entity_id,
         a.description,
         a.actor_email,
         a.metadata,
         a.created_at
       FROM public.admin_activity_log a
       WHERE
         $1::text IS NULL
         OR a.metadata->>'storefront' = $1
         OR a.metadata->'current'->>'storefront' = $1
         OR a.metadata->'previous'->>'storefront' = $1
         OR (
           a.entity_type = 'product'
           AND EXISTS (
             SELECT 1
             FROM public.products p
             WHERE p.id = a.entity_id
               AND p.storefront = $1
           )
         )
         OR (
           a.entity_type = 'order'
           AND EXISTS (
             SELECT 1
             FROM public.orders o
             WHERE o.id = a.entity_id
               AND o.storefront = $1
           )
         )
       ORDER BY a.created_at DESC`,
      [storeSlug]
    );

    return json({ activities: result.rows });
  } catch (error) {
    console.error('Activity function error:', error);
    return json({ error: 'Unable to retrieve activities.' }, 500);
  }
};
