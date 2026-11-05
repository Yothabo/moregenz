import { Pool } from 'pg';
import { requireAdmin } from './_shared/auth.mjs';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
});

const headers = {
  'Cache-Control': 'private, no-store',
};

function json(data, status = 200) {
  return Response.json(data, { status, headers });
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  let client;
  let databaseCommitted = false;

  try {
    const admin = await requireAdmin(request, pool);

    if (!admin) {
      return json({ error: 'Not authorised.' }, 401);
    }

    if (admin.role !== 'super_admin') {
      return json({ error: 'Super Admin access required.' }, 403);
    }

    const body = await request.json().catch(() => null);
    const adminId =
      typeof body?.adminId === 'string' ? body.adminId.trim() : '';

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(adminId)) {
      return json({ error: 'A valid administrator ID is required.' }, 400);
    }

    client = await pool.connect();
    await client.query('BEGIN');

    const invitationResult = await client.query(
      `SELECT
         i.id,
         i.email,
         i.status,
         i.expires_at,
         a.is_active
       FROM public.admin_invitations i
       INNER JOIN public.admins a ON a.id = i.admin_id
       WHERE i.admin_id = $1
       ORDER BY i.created_at DESC
       LIMIT 1
       FOR UPDATE OF i, a`,
      [adminId],
    );

    if (!invitationResult.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'No invitation was found for this administrator.' }, 404);
    }

    const invitation = invitationResult.rows[0];

    if (invitation.is_active) {
      await client.query('ROLLBACK');
      return json({ error: 'Active administrator accounts cannot be revoked here.' }, 409);
    }

    if (invitation.status !== 'pending') {
      await client.query('ROLLBACK');
      return json({ error: 'This invitation is no longer pending.' }, 409);
    }

    if (new Date(invitation.expires_at).getTime() <= Date.now()) {
      await client.query(
        `UPDATE public.admin_invitations
         SET status = 'expired'
         WHERE id = $1
           AND status = 'pending'`,
        [invitation.id],
      );

      await client.query('COMMIT');
      databaseCommitted = true;

      return json({ error: 'This invitation has expired. It cannot be revoked.' }, 409);
    }

    await client.query(
      `UPDATE public.admin_invitations
       SET status = 'revoked',
           revoked_at = now()
       WHERE id = $1
         AND status = 'pending'`,
      [invitation.id],
    );

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
         'admin.invitation_revoked',
         'admin',
         $1,
         'Administrator invitation revoked.',
         $2,
         $3::jsonb
       )`,
      [
        adminId,
        admin.email,
        JSON.stringify({
          invitation_id: invitation.id,
          invited_email: invitation.email,
        }),
      ],
    );

    await client.query('COMMIT');
    databaseCommitted = true;

    return json({ success: true });
  } catch (error) {
    if (client && !databaseCommitted) {
      await client.query('ROLLBACK').catch(() => {});
    }

    console.error('Administrator invitation revocation failed:', {
      message: error?.message,
      code: error?.code,
    });

    return json({ error: 'Unable to revoke this invitation.' }, 500);
  } finally {
    client?.release();
  }
}
