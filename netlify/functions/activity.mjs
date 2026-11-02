import { Pool } from 'pg';

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
    throw new Error('Missing Supabase authentication configuration.');
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

export default async (request) => {
  try {
    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const admin = await requireAdmin(request);

    if (!admin) {
      return json({ error: 'Not authorised.' }, 401);
    }

    const result = await pool.query(
      `SELECT id, event_type, entity_type, entity_id,
              description, actor_email, metadata, created_at
       FROM public.admin_activity_log
       ORDER BY created_at DESC`
    );

    return json({ activities: result.rows });
  } catch (error) {
    console.error('Activity function error:', error);
    return json({ error: 'Unable to retrieve activities.' }, 500);
  }
};
