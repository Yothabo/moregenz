export async function requireAdmin(request, pool) {
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : '';

  if (!token) return null;

  const supabaseUrl = (
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
  ).replace(/\/+$/, '');

  const supabaseKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase authentication configuration is missing.');
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
    `SELECT
       a.id,
       a.email,
       a.role,
       a.store_id,
       a.is_active,
       s.slug AS store_slug,
       s.is_active AS store_is_active
     FROM public.admins a
     LEFT JOIN public.stores s ON s.id = a.store_id
     WHERE a.id = $1
       AND a.is_active IS TRUE
     LIMIT 1`,
    [user.id]
  );

  if (!result.rowCount) return null;

  const admin = result.rows[0];

  if (admin.role === 'super_admin') {
    if (admin.store_id !== null) return null;
    return admin;
  }

  if (admin.role === 'store_admin') {
    if (!admin.store_id || !admin.store_slug || admin.store_is_active !== true) {
      return null;
    }

    return admin;
  }

  return null;
}

export function canAccessStore(admin, storefront) {
  if (!admin || !storefront) return false;

  if (admin.role === 'super_admin') return true;

  return (
    admin.role === 'store_admin' &&
    admin.store_slug === storefront
  );
}
