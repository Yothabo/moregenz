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
  let client;
  let databaseCommitted = false;

  try {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const admin = await requireAdmin(request, pool);

    if (!admin?.app_session_id) {
      return json({ error: 'Session is not active.' }, 401);
    }

    const body = await request.json().catch(() => ({}));

    if (body.action === 'heartbeat') {
      return json({ success: true });
    }

    if (body.action !== 'logout') {
      return json({ error: 'Invalid session action.' }, 400);
    }

    client = await pool.connect();
    await client.query('BEGIN');

    const ended = await client.query(
      `UPDATE public.admin_sessions
       SET ended_at = now()
       WHERE id = $1
         AND admin_id = $2
         AND ended_at IS NULL
         AND revoked_at IS NULL
       RETURNING id`,
      [admin.app_session_id, admin.id]
    );

    if (ended.rowCount) {
      await client.query(
        `INSERT INTO public.admin_activity_log (
           event_type,
           entity_type,
           entity_id,
           description,
           actor_email,
           metadata
         )
         VALUES (
           'admin.logout',
           'admin',
           $1,
           'Administrator signed out.',
           $2,
           '{}'::jsonb
         )`,
        [admin.id, admin.email]
      );
    }

    await client.query('COMMIT');
    databaseCommitted = true;

    return json({ success: true });
  } catch (error) {
    if (client && !databaseCommitted) {
      await client.query('ROLLBACK').catch(() => {});
    }

    console.error('Admin session error:', error);
    return json({ error: 'Unable to update administrator session.' }, 500);
  } finally {
    client?.release();
  }
};
