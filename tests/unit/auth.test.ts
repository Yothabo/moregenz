import { afterEach, describe, expect, it, vi } from 'vitest';
import { canAccessStore, requireAdmin } from '../../netlify/functions/_shared/auth.mjs';

const adminId = '123e4567-e89b-42d3-a456-426614174000';
const sessionId = '223e4567-e89b-42d3-a456-426614174000';
const appSessionId = '323e4567-e89b-42d3-a456-426614174000';

function makeToken(claims: Record<string, unknown> = { session_id: sessionId }) {
  const payload = Buffer.from(JSON.stringify(claims)).toString('base64url');
  return `header.${payload}.signature`;
}

function makeRequest(token = makeToken()) {
  return new Request('https://example.test', {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
}

function makePool(...responses: unknown[]) {
  const query = vi.fn();

  for (const response of responses) {
    query.mockResolvedValueOnce(response);
  }

  return { query };
}

function supabaseUserResponse(ok = true, user: unknown = { id: adminId }) {
  return {
    ok,
    json: vi.fn().mockResolvedValue(user),
  };
}

const activeSuperAdmin = {
  id: adminId,
  email: 'admin@example.com',
  role: 'super_admin',
  store_id: null,
  is_active: true,
  store_slug: null,
  store_is_active: null,
};

const activeStoreAdmin = {
  id: adminId,
  email: 'store@example.com',
  role: 'store_admin',
  store_id: 'store-y',
  is_active: true,
  store_slug: 'yotaabo',
  store_is_active: true,
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('requireAdmin: bearer token handling', () => {
  it('rejects a missing bearer token without calling Supabase', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const result = await requireAdmin(makeRequest(''), makePool());

    expect(result).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a malformed authorization scheme', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('https://example.test', {
      headers: { authorization: 'Basic abc123' },
    });

    const result = await requireAdmin(request, makePool());

    expect(result).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a token with an empty payload segment', async () => {
    const fetchMock = vi.fn().mockResolvedValue(supabaseUserResponse());
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');

    const result = await requireAdmin(
      makeRequest('header..signature'),
      makePool(),
    );

    expect(result).toBeNull();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('rejects a token with a malformed JSON payload', async () => {
    const fetchMock = vi.fn().mockResolvedValue(supabaseUserResponse());
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');

    const malformedToken =
      `header.${Buffer.from('{').toString('base64url')}.signature`;

    const result = await requireAdmin(
      makeRequest(malformedToken),
      makePool(),
    );

    expect(result).toBeNull();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('rejects a token without a session_id claim', async () => {
    const fetchMock = vi.fn().mockResolvedValue(supabaseUserResponse());
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');

    const result = await requireAdmin(
      makeRequest(makeToken({ sub: adminId })),
      makePool(),
    );

    expect(result).toBeNull();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('rejects malformed session IDs', async () => {
    const fetchMock = vi.fn().mockResolvedValue(supabaseUserResponse());
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');

    const result = await requireAdmin(
      makeRequest(makeToken({ session_id: 'not-a-uuid' })),
      makePool(),
    );

    expect(result).toBeNull();
  });

  it('rejects tokens that Supabase does not validate', async () => {
    const fetchMock = vi.fn().mockResolvedValue(supabaseUserResponse(false));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');

    const result = await requireAdmin(makeRequest(), makePool());

    expect(result).toBeNull();
  });

  it('rejects a validated Supabase response without a user ID', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      supabaseUserResponse(true, {}),
    );
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');

    const result = await requireAdmin(makeRequest(), makePool());

    expect(result).toBeNull();
  });

  it('throws when Supabase authentication configuration is missing', async () => {
    vi.stubEnv('SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('SUPABASE_ANON_KEY', '');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', '');

    await expect(
      requireAdmin(makeRequest(), makePool()),
    ).rejects.toThrow('Supabase authentication configuration is missing.');
  });

  it('uses the fallback Vite Supabase configuration', async () => {
    const fetchMock = vi.fn().mockResolvedValue(supabaseUserResponse());
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_URL', 'https://project.supabase.co///');
    vi.stubEnv('SUPABASE_ANON_KEY', '');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'publishable-key');

    const pool = makePool(
      { rowCount: 0, rows: [] },
    );

    await requireAdmin(makeRequest(), pool);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://project.supabase.co/auth/v1/user',
      expect.objectContaining({
        headers: {
          apikey: 'publishable-key',
          Authorization: `Bearer ${makeToken()}`,
        },
      }),
    );
  });
});

describe('requireAdmin: admin account validation', () => {
  function setup() {
    const fetchMock = vi.fn().mockResolvedValue(supabaseUserResponse());
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');
    return fetchMock;
  }

  it('rejects an admin account that does not exist or is inactive', async () => {
    setup();

    const pool = makePool({ rowCount: 0, rows: [] });

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledOnce();
  });

  it('rejects a super admin assigned to a store', async () => {
    setup();

    const pool = makePool({
      rowCount: 1,
      rows: [{ ...activeSuperAdmin, store_id: 'store-y' }],
    });

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledOnce();
  });

  it('rejects a store admin without a store assignment', async () => {
    setup();

    const pool = makePool({
      rowCount: 1,
      rows: [{ ...activeStoreAdmin, store_id: null }],
    });

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledOnce();
  });

  it('rejects a store admin without a store slug', async () => {
    setup();

    const pool = makePool({
      rowCount: 1,
      rows: [{ ...activeStoreAdmin, store_slug: null }],
    });

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledOnce();
  });

  it('rejects a store admin whose store is inactive', async () => {
    setup();

    const pool = makePool({
      rowCount: 1,
      rows: [{ ...activeStoreAdmin, store_is_active: false }],
    });

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledOnce();
  });

  it('rejects an unknown admin role', async () => {
    setup();

    const pool = makePool({
      rowCount: 1,
      rows: [{ ...activeSuperAdmin, role: 'owner' }],
    });

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledOnce();
  });
});

describe('requireAdmin: application sessions', () => {
  function setup() {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(supabaseUserResponse()),
    );
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co');
    vi.stubEnv('SUPABASE_ANON_KEY', 'test-key');
  }

  it('rejects an unknown application session by default', async () => {
    setup();

    const pool = makePool(
      { rowCount: 1, rows: [activeSuperAdmin] },
      { rowCount: 0, rows: [] },
    );

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  it('allows session bootstrap only when explicitly enabled', async () => {
    setup();

    const pool = makePool(
      { rowCount: 1, rows: [activeSuperAdmin] },
      { rowCount: 0, rows: [] },
    );

    const result = await requireAdmin(
      makeRequest(),
      pool,
      { allowSessionBootstrap: true },
    );

    expect(result).toMatchObject({
      ...activeSuperAdmin,
      supabase_session_id: sessionId,
      needs_session_bootstrap: true,
    });
  });

  it('rejects an ended application session', async () => {
    setup();

    const pool = makePool(
      { rowCount: 1, rows: [activeSuperAdmin] },
      {
        rowCount: 1,
        rows: [{ id: appSessionId, ended_at: new Date(), revoked_at: null }],
      },
    );

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  it('rejects a revoked application session', async () => {
    setup();

    const pool = makePool(
      { rowCount: 1, rows: [activeSuperAdmin] },
      {
        rowCount: 1,
        rows: [{ id: appSessionId, ended_at: null, revoked_at: new Date() }],
      },
    );

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  it('rejects a session when its heartbeat update affects no rows', async () => {
    setup();

    const pool = makePool(
      { rowCount: 1, rows: [activeSuperAdmin] },
      {
        rowCount: 1,
        rows: [{ id: appSessionId, ended_at: null, revoked_at: null }],
      },
      { rowCount: 0, rows: [] },
    );

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledTimes(3);
  });

  it('returns a valid super admin with the application session ID', async () => {
    setup();

    const pool = makePool(
      { rowCount: 1, rows: [activeSuperAdmin] },
      {
        rowCount: 1,
        rows: [{ id: appSessionId, ended_at: null, revoked_at: null }],
      },
      { rowCount: 1, rows: [] },
    );

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toMatchObject({
      ...activeSuperAdmin,
      supabase_session_id: sessionId,
      app_session_id: appSessionId,
    });
  });

  it('returns a valid store admin', async () => {
    setup();

    const pool = makePool(
      { rowCount: 1, rows: [activeStoreAdmin] },
      {
        rowCount: 1,
        rows: [{ id: appSessionId, ended_at: null, revoked_at: null }],
      },
      { rowCount: 1, rows: [] },
    );

    const result = await requireAdmin(makeRequest(), pool);

    expect(result).toMatchObject({
      ...activeStoreAdmin,
      app_session_id: appSessionId,
    });
  });

  it('binds the Supabase user ID and session ID as SQL parameters', async () => {
    setup();

    const pool = makePool(
      { rowCount: 1, rows: [activeSuperAdmin] },
      {
        rowCount: 1,
        rows: [{ id: appSessionId, ended_at: null, revoked_at: null }],
      },
      { rowCount: 1, rows: [] },
    );

    await requireAdmin(makeRequest(), pool);

    expect(pool.query.mock.calls[0][1]).toEqual([adminId]);
    expect(pool.query.mock.calls[1][1]).toEqual([sessionId, adminId]);
    expect(pool.query.mock.calls[2][1]).toEqual([appSessionId, adminId]);
  });
});

describe('canAccessStore', () => {
  it('rejects a missing admin', () => {
    expect(canAccessStore(null, 'yotaabo')).toBe(false);
  });

  it('rejects an empty storefront', () => {
    expect(canAccessStore(activeSuperAdmin, '')).toBe(false);
  });

  it('allows a super admin to access either storefront', () => {
    expect(canAccessStore(activeSuperAdmin, 'yotaabo')).toBe(true);
    expect(canAccessStore(activeSuperAdmin, 'poshies')).toBe(true);
  });

  it('allows a store admin to access their own storefront', () => {
    expect(canAccessStore(activeStoreAdmin, 'yotaabo')).toBe(true);
  });

  it('rejects a store admin accessing another storefront', () => {
    expect(canAccessStore(activeStoreAdmin, 'poshies')).toBe(false);
  });

  it('rejects unknown roles', () => {
    expect(
      canAccessStore({ ...activeSuperAdmin, role: 'owner' }, 'yotaabo'),
    ).toBe(false);
  });
});
