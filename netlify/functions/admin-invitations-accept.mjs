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

export default async function handler(request) {
  let client;
  let databaseCommitted = false;

  try {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const body = await request.json().catch(() => null);
    const invitationId = body?.invitationId;

    if (typeof invitationId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(invitationId)) {
      return json({ error: 'A valid invitation ID is required.' }, 400);
    }

    const authorization = request.headers.get('authorization') || '';
    const token = authorization.startsWith('Bearer ')
      ? authorization.slice(7).trim()
      : '';

    if (!token) {
      return json({ error: 'Authentication required.' }, 401);
    }

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      ''
    ).replace(/\/+$/, '');

    const supabaseKey =
      process.env.SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Invitation acceptance authentication is not configured.');
      return json({ error: 'Authentication service is unavailable.' }, 503);
    }

    const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!authResponse.ok) {
      return json({ error: 'Your invitation session is invalid or expired.' }, 401);
    }

    const user = await authResponse.json();

    if (!user?.id || !user?.email) {
      return json({ error: 'Unable to verify your account.' }, 401);
    }

    client = await pool.connect();
    await client.query('BEGIN');

    const invitationResult = await client.query(
      `SELECT
         i.id AS invitation_id,
         i.admin_id,
         i.email,
         i.status,
         i.expires_at,
         a.is_active,
         a.email AS admin_email
       FROM public.admin_invitations i
       JOIN public.admins a ON a.id = i.admin_id
       WHERE i.id = $1
         AND i.admin_id = $2
         AND lower(i.email) = lower($3)
         AND lower(a.email) = lower($3)
       FOR UPDATE OF i, a`,
      [invitationId, user.id, user.email]
    );

    if (!invitationResult.rowCount) {
      await client.query('ROLLBACK');
      return json({
        error: 'This invitation is invalid or does not belong to your account.',
      }, 404);
    }

    const invitation = invitationResult.rows[0];

    if (invitation.status === 'accepted' && invitation.is_active) {
      await client.query('COMMIT');
      databaseCommitted = true;
      return json({ accepted: true, alreadyAccepted: true });
    }

    if (invitation.status !== 'pending') {
      await client.query('ROLLBACK');
      return json({
        error: 'This invitation is no longer valid. Contact your administrator.',
      }, 410);
    }

    if (new Date(invitation.expires_at).getTime() <= Date.now()) {
      await client.query(
        `UPDATE public.admin_invitations
         SET status = 'expired'
         WHERE id = $1
           AND status = 'pending'`,
        [invitation.invitation_id]
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
           'admin.invitation_expired',
           'admin',
           $1,
           'Administrator invitation expired.',
           $2,
           $3::jsonb
         )`,
        [
          invitation.admin_id,
          invitation.admin_email,
          JSON.stringify({ invitation_id: invitation.invitation_id }),
        ]
      );

      await client.query('COMMIT');
      databaseCommitted = true;

      return json({
        error: 'This invitation has expired. Ask your administrator to resend it.',
      }, 410);
    }

    await client.query(
      `UPDATE public.admin_invitations
       SET status = 'accepted',
           accepted_at = now()
       WHERE id = $1
         AND status = 'pending'`,
      [invitation.invitation_id]
    );

    const activated = await client.query(
      `UPDATE public.admins
       SET is_active = TRUE
       WHERE id = $1
         AND lower(email) = lower($2)
         AND is_active IS FALSE
       RETURNING id`,
      [invitation.admin_id, user.email]
    );

    if (!activated.rowCount) {
      await client.query('ROLLBACK');
      return json({
        error: 'The administrator account could not be activated.',
      }, 409);
    }

    await client.query(
      `INSERT INTO public.admin_activity_log (
         event_type,
         entity_type,
         entity_id,
         description,
         actor_email,
         metadata
       )
       VALUES
         (
           'admin.invitation_accepted',
           'admin',
           $1,
           'Administrator invitation accepted.',
           $2,
           $3::jsonb
         ),
         (
           'admin.activated',
           'admin',
           $1,
           'Administrator account activated.',
           $2,
           $3::jsonb
         )`,
      [
        invitation.admin_id,
        invitation.admin_email,
        JSON.stringify({ invitation_id: invitation.invitation_id }),
      ]
    );

    await client.query('COMMIT');
    databaseCommitted = true;

    return json({
      accepted: true,
      message: 'Your administrator account has been activated.',
    });
  } catch (error) {
    if (client && !databaseCommitted) {
      await client.query('ROLLBACK').catch(() => {});
    }

    console.error('Invitation acceptance error:', error);

    return json({
      error: 'Unable to accept the administrator invitation.',
    }, 500);
  } finally {
    client?.release();
  }
}
