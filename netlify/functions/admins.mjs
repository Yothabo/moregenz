import { Pool } from 'pg';
import { requireAdmin } from './_shared/auth.mjs';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
});

const responseHeaders = {
  'Cache-Control': 'private, no-store',
};

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: responseHeaders,
  });
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
          a.created_at
        FROM public.admins a
        LEFT JOIN public.stores s ON s.id = a.store_id
        ORDER BY
          CASE WHEN a.role = 'super_admin' THEN 0 ELSE 1 END,
          a.created_at ASC
      `);

      return json({ admins: result.rows });
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
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

    if (!['super_admin', 'store_admin'].includes(role)) {
      return json({ error: 'Invalid administrator role.' }, 400);
    }

    let storeId = null;

    if (role === 'store_admin') {
      if (!['yotaabo', 'poshies'].includes(storeSlug)) {
        return json({ error: 'Select a valid storefront.' }, 400);
      }

      const storeResult = await pool.query(
        `SELECT id
         FROM public.stores
         WHERE slug = $1
           AND is_active IS TRUE
         LIMIT 1`,
        [storeSlug]
      );

      if (!storeResult.rowCount) {
        return json({ error: 'The selected storefront is unavailable.' }, 400);
      }

      storeId = storeResult.rows[0].id;
    } else if (storeSlug != null && storeSlug !== '') {
      return json({
        error: 'Super Admin accounts cannot have a storefront assignment.',
      }, 400);
    }

    const existingAdmin = await pool.query(
      `SELECT id
       FROM public.admins
       WHERE lower(email) = $1
       LIMIT 1`,
      [email]
    );

    if (existingAdmin.rowCount) {
      return json({ error: 'This email is already an administrator.' }, 409);
    }

    const supabaseUrl = (
      process.env.SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      ''
    ).replace(/\/+$/, '');

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Admin invitation configuration is missing.');
      return json({ error: 'Invitation service is not configured.' }, 503);
    }

    const redirectUrl = `${process.env.URL || process.env.DEPLOY_PRIME_URL}/update-password`;
    const inviteUrl = `${supabaseUrl}/auth/v1/invite?redirect_to=${encodeURIComponent(redirectUrl)}`;

    const authResponse = await fetch(inviteUrl, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const authResult = await authResponse.json().catch(() => null);

    if (!authResponse.ok || !authResult?.id) {
      console.error('Supabase invitation failed:', {
        status: authResponse.status,
        message: authResult?.msg || authResult?.message || authResult?.error,
      });

      if (authResponse.status === 422 || authResponse.status === 409) {
        return json({
          error: 'This email may already have a Supabase account or invitation.',
        }, 409);
      }

      return json({ error: 'Unable to send the invitation.' }, 502);
    }

    try {
      const insertResult = await pool.query(
        `INSERT INTO public.admins (
           id,
           email,
           role,
           store_id,
           is_active
         )
         VALUES ($1, $2, $3, $4, TRUE)
         RETURNING id, email, role, store_id, is_active, created_at`,
        [authResult.id, email, role, storeId]
      );

      return json({
        message: 'Administrator invitation sent successfully.',
        admin: insertResult.rows[0],
      }, 201);
    } catch (databaseError) {
      const duplicateEmail =
        databaseError?.code === '23505' &&
        databaseError?.constraint === 'admins_email_unique_idx';

      if (duplicateEmail) {
        console.error('Duplicate administrator email:', email);
      } else {
        console.error('Admin registration failed after invitation:', databaseError);
      }

      // Remove the newly invited Auth user if database registration fails.
      const rollbackResponse = await fetch(
        `${supabaseUrl}/auth/v1/admin/users/${authResult.id}`,
        {
          method: 'DELETE',
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
          },
        }
      ).catch(() => null);

      if (!rollbackResponse?.ok) {
        console.error('Auth invitation rollback failed:', authResult.id);
      }

      if (duplicateEmail) {
        return json({
          error: 'This email is already registered as an administrator.',
        }, 409);
      }

      return json({
        error: 'Administrator registration failed. No access was granted.',
      }, 500);
    }
  } catch (error) {
    console.error('Admin management error:', error);
    return json({ error: 'Unable to process administrator request.' }, 500);
  }
}
