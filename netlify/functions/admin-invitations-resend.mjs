import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';
import { requireAdmin } from './_shared/auth.mjs';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
});

const INVITATION_HOURS = 24;

const headers = {
  'Cache-Control': 'private, no-store',
};

function json(data, status = 200) {
  return Response.json(data, { status, headers });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
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

    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(adminId)
    ) {
      return json({ error: 'A valid administrator ID is required.' }, 400);
    }

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      ''
    ).replace(/\/+$/, '');

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const appUrl = (process.env.PUBLIC_APP_URL || '').replace(/\/+$/, '');

    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !resendApiKey ||
      !resendFromEmail ||
      !appUrl
    ) {
      console.error('Admin resend environment configuration is incomplete.');
      return json({
        error: 'The administrator invitation service is not configured.',
      }, 503);
    }

    let parsedAppUrl;

    try {
      parsedAppUrl = new URL(appUrl);
    } catch {
      return json({ error: 'The application URL is invalid.' }, 500);
    }

    if (!['https:', 'http:'].includes(parsedAppUrl.protocol)) {
      return json({ error: 'The application URL is invalid.' }, 500);
    }

    client = await pool.connect();
    await client.query('BEGIN');

    const existingResult = await client.query(
      `SELECT
         a.id,
         a.email,
         a.role,
         a.is_active,
         i.id AS invitation_id,
         i.status AS invitation_status
       FROM public.admins a
       LEFT JOIN LATERAL (
         SELECT id, status
         FROM public.admin_invitations
         WHERE admin_id = a.id
         ORDER BY created_at DESC
         LIMIT 1
       ) i ON TRUE
       WHERE a.id = $1
       FOR UPDATE OF a`,
      [adminId],
    );

    if (!existingResult.rowCount) {
      await client.query('ROLLBACK');
      return json({ error: 'Administrator account not found.' }, 404);
    }

    const existing = existingResult.rows[0];

    if (existing.is_active) {
      await client.query('ROLLBACK');
      return json({
        error: 'Active administrator accounts do not need an invitation.',
      }, 409);
    }

    if (!['pending', 'expired'].includes(existing.invitation_status)) {
      await client.query('ROLLBACK');
      return json({
        error: 'This administrator does not have a pending or expired invitation.',
      }, 409);
    }

    const invitationId = randomUUID();
    const redirectUrl = `${appUrl}/update-password?invitationId=${invitationId}`;

    // Generate a recovery link for the existing Supabase Auth user.
    const generateResponse = await fetch(
      `${supabaseUrl}/auth/v1/admin/generate_link`,
      {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'recovery',
          email: existing.email,
          options: {
            redirectTo: redirectUrl,
          },
        }),
      },
    );

    const generated = await generateResponse.json().catch(() => null);

    const generatedUserId = generated?.user?.id || generated?.id;
    const invitationLink =
      generated?.properties?.action_link ||
      generated?.action_link;

    if (
      !generateResponse.ok ||
      generatedUserId !== existing.id ||
      !invitationLink
    ) {
      console.error('Supabase recovery link generation failed:', {
        status: generateResponse.status,
        message:
          generated?.msg ||
          generated?.message ||
          generated?.error ||
          'No valid recovery link returned.',
      });

      await client.query('ROLLBACK');

      return json({
        error: 'Unable to generate a new administrator invitation link.',
      }, 502);
    }

    // Invalidate older pending invitations and create the replacement.
    await client.query(
      `UPDATE public.admin_invitations
       SET status = 'revoked',
           revoked_at = now()
       WHERE admin_id = $1
         AND status = 'pending'`,
      [adminId],
    );

    const invitationResult = await client.query(
      `INSERT INTO public.admin_invitations (
         id,
         admin_id,
         email,
         invited_by,
         resend_of,
         status,
         expires_at
       )
       VALUES (
         $1,
         $2,
         $3,
         $4,
         $5,
         'pending',
         now() + ($6 * interval '1 hour')
       )
       RETURNING id, expires_at`,
      [
        invitationId,
        adminId,
        existing.email,
        admin.id,
        existing.invitation_id,
        INVITATION_HOURS,
      ],
    );

    const invitation = invitationResult.rows[0];

    const safeEmail = escapeHtml(existing.email);
    const safeLink = escapeHtml(invitationLink);

    // Send the email before committing. Delivery failure rolls back
    // the replacement invitation and preserves the previous database state.
    const resendResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFromEmail,
          to: [existing.email],
          subject: 'Your new Yotaabo administrator invitation',
          html: `
            <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px 20px;color:#222">
              <h1 style="font-size:26px">Yotaabo</h1>
              <h2 style="font-size:21px">Your administrator invitation has been renewed</h2>
              <p>A new invitation has been issued for your administrator account.</p>
              <p><strong>Account:</strong> ${safeEmail}</p>
              <p>This invitation expires in ${INVITATION_HOURS} hours.</p>
              <p style="margin:32px 0">
                <a href="${safeLink}" style="background:#222;color:#fff;padding:14px 22px;text-decoration:none;border-radius:5px">
                  Continue to your account
                </a>
              </p>
              <p style="font-size:13px;color:#666">If you were not expecting this email, contact your administrator.</p>
            </div>
          `,
          text: [
            'Your Yotaabo administrator invitation has been renewed.',
            `Account: ${existing.email}`,
            `Continue to your account: ${invitationLink}`,
            `This invitation expires in ${INVITATION_HOURS} hours.`,
          ].join('\n\n'),
        }),
      },
    );

    const resendResult = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok || !resendResult?.id) {
      console.error('Resend delivery failed:', {
        status: resendResponse.status,
        message: resendResult?.message || resendResult?.name,
      });

      await client.query('ROLLBACK');

      return json({
        error: 'The new invitation email could not be sent. The previous invitation remains unchanged.',
      }, 502);
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
       VALUES (
         'admin.invitation_resent',
         'admin',
         $1,
         'Administrator invitation resent.',
         $2,
         $3::jsonb
       )`,
      [
        adminId,
        admin.email,
        JSON.stringify({
          invitation_id: invitation.id,
          previous_invitation_id: existing.invitation_id,
          invited_email: existing.email,
          expires_at: invitation.expires_at,
          resend_email_id: resendResult.id,
        }),
      ],
    );

    await client.query('COMMIT');
    databaseCommitted = true;

    return json({
      success: true,
      message: 'Administrator invitation resent successfully.',
      invitation: {
        id: invitation.id,
        expiresAt: invitation.expires_at,
      },
    });
  } catch (error) {
    if (client && !databaseCommitted) {
      await client.query('ROLLBACK').catch(() => {});
    }

    console.error('Administrator invitation resend failed:', {
      message: error?.message,
      code: error?.code,
    });

    return json({
      error: 'Unable to resend the administrator invitation.',
    }, 500);
  } finally {
    client?.release();
  }
}
