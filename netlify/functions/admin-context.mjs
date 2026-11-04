import { Pool } from 'pg';
import { requireAdmin } from './_shared/auth.mjs';

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
});

export default async (request) => {
  try {
    if (request.method !== 'GET') {
      return Response.json({ error: 'Method not allowed.' }, { status: 405 });
    }

    const admin = await requireAdmin(request, pool);

    if (!admin) {
      return Response.json({ error: 'Not authorised.' }, { status: 401 });
    }

    return Response.json({
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        storeId: admin.store_id,
        storeSlug: admin.store_slug,
      },
    }, {
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch (error) {
    console.error('Admin context error:', error);
    return Response.json(
      { error: 'Unable to verify admin access.' },
      { status: 500 }
    );
  }
};
