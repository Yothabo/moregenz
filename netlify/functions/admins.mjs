import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';
import { requireAdmin } from './_shared/auth.mjs';
import { buildAdminInvitationEmail } from './_shared/admin-invitation-email.mjs';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
});

const responseHeaders = {
  'Cache-Control': 'private, no-store',
};

const INVITATION_HOURS = 24;

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: responseHeaders,
  });
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

async function deleteAuthUser(supabaseUrl, serviceRoleKey, userId) {
  const response = await fetch(
    `${supabaseUrl}/auth/v1/admin/users/${userId}`,
    {
      method: 'DELETE',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    }
  );

  if (!response.ok) {
    console.error('Auth user cleanup failed:', {
      userId,
      status: response.status,
    });
  }

  return response.ok;
}

export default async function handler(request) {
  try {
    if (!['GET', 'POST'].includes(request.method)) {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const admin = await requireAdmin(request, pool);

    if (!admin) {
      return json({ error: 'Not authorised.' }, 401);
    }

    if (admin.role !== 'super_admin') {
      return json({ error: 'Super Admin access required.' }, 403);
    }

    if (request.method === 'GET') {
      const result = await pool.query(`
        SELECT
          a.id,
          a.email,
          a.role,
          a.store_id,
          s.name AS store_name,
          s.slug AS store_slug,
          a.is_active,
          a.created_at,
          i.id AS invitation_id,
          CASE
            WHEN i.status = 'pending' AND i.expires_at <= now()
              THEN 'expired'
            ELSE i.status
          END AS invitation_status,
          i.created_at AS invitation_created_at,
          i.expires_at AS invitation_expires_at
        FROM public.admins a
        LEFT JOIN public.stores s ON s.id = a.store_id
        LEFT JOIN LATERAL (
          SELECT id, status, created_at, expires_at
          FROM public.admin_invitations
          WHERE admin_id = a.id
          ORDER BY created_at DESC
          LIMIT 1
        ) i ON TRUE
        ORDER BY
          CASE WHEN a.role = 'super_admin' THEN 0 ELSE 1 END,
          a.created_at ASC
      `);

      return json({ admins: result.rows });
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return json({ error: 'Invalid request body.' }, 400);
    }

    const email =
      typeof body.email === 'string'
        ? body.email.trim().toLowerCase()
        : '';

    const role = body.role;
    const storeSlug = body.storeSlug;

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return json({ error: 'Enter a valid email address.' }, 400);
    }

    if (role !== 'store_admin') {
      return json({
        error: 'Only Store Admin invitations can be created.',
      }, 403);
    }

    if (!['yotaabo', 'poshies'].includes(storeSlug)) {
      return json({ error: 'Select a valid storefront.' }, 400);
    }

    const storeResult = await pool.query(
      `SELECT id, name
       FROM public.stores
       WHERE slug = $1
         AND is_active IS TRUE
       LIMIT 1`,
      [storeSlug]
    );

    if (!storeResult.rowCount) {
      return json({
        error: 'The selected storefront is unavailable.',
      }, 400);
    }

    const storeId = storeResult.rows[0].id;
    const storeName = storeResult.rows[0].name;

    const existingAdmin = await pool.query(
      `SELECT id
       FROM public.admins
       WHERE lower(email) = $1
       LIMIT 1`,
      [email]
    );

    if (existingAdmin.rowCount) {
      return json({
        error: 'This email is already an administrator.',
      }, 409);
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
      console.error('Admin invitation environment configuration is incomplete.');

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

    const invitationId = randomUUID();
    const redirectUrl = `${appUrl}/update-password?invitationId=${invitationId}`;

    // Generate an invitation link without sending Supabase's own email.
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
          type: 'invite',
          email,
          options: {
            redirectTo: redirectUrl,
          },
        }),
      }
    );

    const generated = await generateResponse.json().catch(() => null);

    const authUserId = generated?.user?.id || generated?.id;
    const invitationLink =
      generated?.action_link ||
      generated?.properties?.action_link;

    if (
      !generateResponse.ok ||
      !authUserId ||
      !invitationLink
    ) {
      console.error('Supabase invitation link generation failed:', {
        status: generateResponse.status,
        message: generated?.msg ||
          generated?.message ||
          generated?.error ||
          'No invitation link returned.',
      });

      if ([409, 422].includes(generateResponse.status)) {
        return json({
          error: 'This email may already have a Supabase account or invitation.',
        }, 409);
      }

      return json({
        error: 'Unable to generate the administrator invitation.',
      }, 502);
    }

    const client = await pool.connect();
    let databaseCommitted = false;

    try {
      await client.query('BEGIN');

      const insertAdmin = await client.query(
        `INSERT INTO public.admins (
           id,
           email,
           role,
           store_id,
           is_active
         )
         VALUES ($1, $2, $3, $4, FALSE)
         RETURNING id, email, role, store_id, is_active, created_at`,
        [authUserId, email, role, storeId]
      );

      const newAdmin = insertAdmin.rows[0];

      const insertInvitation = await client.query(
        `INSERT INTO public.admin_invitations (
           id,
           admin_id,
           email,
           invited_by,
           status,
           expires_at
         )
         VALUES (
           $1,
           $2,
           $3,
           $4,
           'pending',
           now() + ($5 * interval '1 hour')
         )
         RETURNING id, expires_at`,
        [invitationId, newAdmin.id, email, admin.id, INVITATION_HOURS]
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
           'admin.invited',
           'admin',
           $1,
           'Administrator invitation created.',
           $2,
           $3::jsonb
         )`,
        [
          newAdmin.id,
          admin.email,
          JSON.stringify({
            invitation_id: invitationId,
            invited_email: email,
            role,
            store_id: storeId,
            expires_at: insertInvitation.rows[0].expires_at,
          }),
        ]
      );

      await client.query('COMMIT');
      databaseCommitted = true;

      const invitationEmail = buildAdminInvitationEmail({
        storeName,
        storeSlug,
        email,
        invitationLink,
        expiresInHours: INVITATION_HOURS,
      });

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
            to: [email],
            ...invitationEmail,
          }),
        }
      );

      const resendResult = await resendResponse.json().catch(() => null);

      if (!resendResponse.ok || !resendResult?.id) {
        console.error('Resend invitation delivery failed:', {
          status: resendResponse.status,
          message: resendResult?.message || resendResult?.name,
        });

        await client.query('BEGIN');

        await client.query(
          `UPDATE public.admin_invitations
           SET status = 'revoked',
               revoked_at = now()
           WHERE id = $1
             AND status = 'pending'`,
          [invitationId]
        );

        await client.query(
          `DELETE FROM public.admins
           WHERE id = $1
             AND is_active IS FALSE`,
          [authUserId]
        );

        await client.query('COMMIT');

        await deleteAuthUser(supabaseUrl, serviceRoleKey, authUserId);

        return json({
          error: 'The invitation email could not be sent. No administrator access was granted.',
        }, 502);
      }

      return json({
        message: 'Administrator invitation sent successfully.',
        admin: newAdmin,
        invitation: {
          id: invitationId,
          expiresAt: insertInvitation.rows[0].expires_at,
        },
      }, 201);
    } catch (databaseError) {
      if (!databaseCommitted) {
        await client.query('ROLLBACK').catch(() => {});
      }

      console.error('Administrator invitation database error:', {
        code: databaseError?.code,
        constraint: databaseError?.constraint,
        message: databaseError?.message,
      });

      if (databaseCommitted && invitationId) {
        await client.query('BEGIN').catch(() => {});

        await client.query(
          `UPDATE public.admin_invitations
           SET status = 'revoked',
               revoked_at = now()
           WHERE id = $1
             AND status = 'pending'`,
          [invitationId]
        ).catch(() => {});

        await client.query(
          `DELETE FROM public.admins
           WHERE id = $1
             AND is_active IS FALSE`,
          [authUserId]
        ).catch(() => {});

        await client.query('COMMIT').catch(() => {});
      }

      await deleteAuthUser(supabaseUrl, serviceRoleKey, authUserId);

      if (databaseError?.code === '23505') {
        return json({
          error: 'An administrator or pending invitation already exists for this email.',
        }, 409);
      }

      return json({
        error: 'Administrator registration failed. No access was granted.',
      }, 500);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Admin management error:', error);
    return json({
      error: 'Unable to process administrator request.',
    }, 500);
  }
}
