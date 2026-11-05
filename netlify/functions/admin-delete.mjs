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

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  let client;
  let adminId = '';
  let databaseCommitted = false;

  try {
    const actor = await requireAdmin(request, pool);

    if (!actor) {
      return json({ error: 'Not authorised.' }, 401);
    }

    if (actor.role !== 'super_admin') {
      return json({ error: 'Super Admin access required.' }, 403);
    }

    const body = await request.json().catch(() => null);
    adminId =
      typeof body?.adminId === 'string' ? body.adminId.trim() : '';

    if (!UUID_REGEX.test(adminId)) {
      return json({ error: 'A valid administrator ID is required.' }, 400);
    }

    if (adminId === actor.id) {
      return json({ error: 'You cannot delete your own administrator account.' }, 409);
    }

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      ''
    ).replace(/\/+$/, '');

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Administrator deletion: Supabase service configuration is incomplete.');
      return json({ error: 'The administrator deletion service is not configured.' }, 503);
    }

    client = await pool.connect();
    await client.query('BEGIN');

    // Serialize administrator deletions to protect the last active Super Admin.
    await client.query(
      "SELECT pg_advisory_xact_lock(hashtext('admin-deletion-guard'))",
    );

    const targetResult = await client.query(
      `SELECT id, email, role, is_active
       FROM public.admins
       WHERE id = $1
       FOR UPDATE`,
      [adminId],
    );

    if (!targetResult.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'Administrator not found.' }, 404);
    }

    const target = targetResult.rows[0];

    if (target.role === 'super_admin') {
      const superAdmins = await client.query(
        `SELECT id
         FROM public.admins
         WHERE role = 'super_admin'
           AND is_active IS TRUE
         FOR UPDATE`,
      );

      if (superAdmins.rowCount <= 1 && target.is_active) {
        await client.query('ROLLBACK');
        return json({
          error: 'The last active Super Admin cannot be deleted.',
        }, 409);
      }
    }

    await client.query(
      `UPDATE public.admin_invitations
       SET status = 'revoked',
           revoked_at = COALESCE(revoked_at, now())
       WHERE admin_id = $1
         AND status = 'pending'`,
      [adminId],
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
         'admin.deleted',
         'admin',
         $1,
         'Administrator account deleted.',
         $2,
         $3::jsonb
       )`,
      [
        adminId,
        actor.email,
        JSON.stringify({
          deleted_admin_email: target.email,
          deleted_admin_role: target.role,
          deleted_by: actor.id,
        }),
      ],
    );

    await client.query(
      `DELETE FROM public.admins
       WHERE id = $1`,
      [adminId],
    );

    await client.query('COMMIT');
    databaseCommitted = true;

    // Remove the Supabase Auth identity only after database access is revoked.
    const authResponse = await fetch(
      `${supabaseUrl}/auth/v1/admin/users/${target.id}`,
      {
        method: 'DELETE',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      },
    );

    if (!authResponse.ok && authResponse.status !== 404) {
      const errorBody = await authResponse.json().catch(() => null);

      console.error('Supabase Auth cleanup remains pending:', {
        adminId,
        status: authResponse.status,
        message: errorBody?.message || errorBody?.msg || 'Unknown error',
      });

      return json({
        success: true,
        deletedAdminId: adminId,
        authUserCleanupPending: true,
        warning: 'Administrator access was removed, but Supabase Auth cleanup needs attention.',
      });
    }

    return json({
      success: true,
      deletedAdminId: adminId,
      authUserCleanupPending: false,
    });
  } catch (error) {
    if (client && !databaseCommitted) {
      await client.query('ROLLBACK').catch(() => {});
    }

    console.error('Administrator deletion failed:', {
      message: error?.message,
      code: error?.code,
      databaseCommitted,
    });

    if (databaseCommitted) {
      return json({
        success: true,
        deletedAdminId: adminId,
        authUserCleanupPending: true,
        warning: 'Administrator access was removed, but Supabase Auth cleanup could not be confirmed.',
      });
    }

    return json({ error: 'Unable to delete this administrator.' }, 500);
  } finally {
    client?.release();
  }
}
