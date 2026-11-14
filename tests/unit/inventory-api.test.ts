import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  requireAdmin: vi.fn(),
  poolQuery: vi.fn(),
  connect: vi.fn(),
  clientQuery: vi.fn(),
  release: vi.fn(),
  clientResponses: [] as unknown[],
}));

vi.mock('pg', () => ({
  Pool: class {
    constructor() {
      return {
        query: mocks.poolQuery,
        connect: mocks.connect,
      };
    }
  },
}));

vi.mock('../../netlify/functions/_shared/auth.mjs', () => ({
  requireAdmin: mocks.requireAdmin,
}));

import handler from '../../netlify/functions/inventory.mjs';

const superAdmin = {
  id: 'admin-1',
  email: 'admin@example.com',
  role: 'super_admin',
  store_id: null,
  store_slug: null,
};

const storeAdmin = {
  id: 'admin-2',
  email: 'yotaabo@example.com',
  role: 'store_admin',
  store_id: 'store-y',
  store_slug: 'yotaabo',
};

const productId = '123e4567-e89b-42d3-a456-426614174000';
const store = { id: 'store-y', slug: 'yotaabo' };

const emptyResult = () => ({ rowCount: 0, rows: [] });

function makeRequest(
  method: string,
  body?: unknown,
  query = '',
  authenticated = true,
) {
  const headers = new Headers();

  if (authenticated) {
    headers.set('authorization', 'Bearer test-token');
  }

  if (body !== undefined) {
    headers.set('content-type', 'application/json');
  }

  return new Request(
    `https://example.test/.netlify/functions/inventory${query}`,
    {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    },
  );
}

async function readResponse(response: Response) {
  return {
    status: response.status,
    body: await response.json(),
  };
}

function queueClientResponses(...responses: unknown[]) {
  mocks.clientResponses.push(...responses);
}

function queueSuccessfulMovement({
  action = 'opening-stock',
  quantity = 10,
  onHand = 0,
  reserved = 0,
  initialized = false,
}: {
  action?: string;
  quantity?: number;
  onHand?: number;
  reserved?: number;
  initialized?: boolean;
} = {}) {
  const delta = action === 'adjustment-decrease' ? -quantity : quantity;

  mocks.poolQuery.mockResolvedValueOnce({
    rowCount: 1,
    rows: [store],
  });

  queueClientResponses(
    emptyResult(), // BEGIN
    emptyResult(), // set_config
    { rowCount: 1, rows: [{ id: productId, name: 'Test Product' }] },
    emptyResult(), // INSERT balance if missing
    {
      rowCount: 1,
      rows: [{
        on_hand_quantity: onHand,
        reserved_quantity: reserved,
        is_initialized: initialized,
      }],
    },
    emptyResult(), // UPDATE balance
    emptyResult(), // INSERT movement
    emptyResult(), // COMMIT
  );

  return {
    expectedOnHand: onHand + delta,
    expectedDelta: delta,
  };
}

function stockBody(
  action = 'opening-stock',
  quantity = 10,
  reason = '',
) {
  return {
    storefront: 'yotaabo',
    product_id: productId,
    action,
    quantity,
    reason,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('SUPABASE_DB_URL', 'postgres://test');

  mocks.clientResponses.length = 0;
  mocks.requireAdmin.mockResolvedValue(superAdmin);
  mocks.poolQuery.mockResolvedValue(emptyResult());

  mocks.clientQuery.mockImplementation(async () => {
    const next = mocks.clientResponses.shift();

    if (next instanceof Error) {
      throw next;
    }

    return next ?? emptyResult();
  });

  mocks.connect.mockResolvedValue({
    query: mocks.clientQuery,
    release: mocks.release,
  });
});

describe('inventory API: HTTP contract', () => {
  it('rejects unsupported methods', async () => {
    const result = await readResponse(await handler(makeRequest('PUT')));

    expect(result.status).toBe(405);
    expect(mocks.requireAdmin).not.toHaveBeenCalled();
  });

  it('rejects unauthenticated requests', async () => {
    mocks.requireAdmin.mockResolvedValue(null);

    const result = await readResponse(
      await handler(makeRequest('GET', undefined, '', false)),
    );

    expect(result.status).toBe(401);
    expect(mocks.connect).not.toHaveBeenCalled();
  });

  it('rejects malformed JSON', async () => {
    const request = new Request(
      'https://example.test/.netlify/functions/inventory',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{"product_id":',
      },
    );

    const result = await readResponse(await handler(request));

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Invalid request body.');
    expect(mocks.connect).not.toHaveBeenCalled();
  });
});

describe('inventory API: storefront authorization', () => {
  it('forces store admins to use their own storefront', async () => {
    mocks.requireAdmin.mockResolvedValue(storeAdmin);
    mocks.poolQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [store],
    });

    queueClientResponses(
      emptyResult(), // BEGIN
      emptyResult(), // set_config
      emptyResult(), // product not found
      emptyResult(), // ROLLBACK
    );

    const result = await readResponse(
      await handler(
        makeRequest('POST', {
          ...stockBody(),
          storefront: 'poshies',
        }),
      ),
    );

    expect(mocks.poolQuery).toHaveBeenCalledWith(
      expect.stringContaining('FROM public.stores'),
      ['yotaabo'],
    );
    expect(result.status).toBe(404);
    expect(mocks.release).toHaveBeenCalledOnce();
  });

  it('rejects an unknown storefront for a super admin', async () => {
    const result = await readResponse(
      await handler(
        makeRequest('GET', undefined, '?storefront=unknown'),
      ),
    );

    expect(result.status).toBe(400);
    expect(mocks.connect).not.toHaveBeenCalled();
  });
});

describe('inventory API: GET inventory', () => {
  it('returns inventory, recent movements, and aggregate totals', async () => {
    const inventoryRows = [{
      product_id: productId,
      product_name: 'Test Product',
      on_hand_quantity: 15,
      reserved_quantity: 3,
      available_quantity: 12,
      is_initialized: true,
    }];

    const movementRows = [{
      id: 'movement-1',
      product_id: productId,
      product_name: 'Test Product',
      product_sku: 'TEST-001',
      movement_type: 'replenishment',
      quantity_delta: 5,
      reason: 'Supplier delivery',
    }];

    const aggregateRows = [{
      received: '15',
      adjusted: '3',
    }];

    mocks.poolQuery
      .mockResolvedValueOnce({ rowCount: 1, rows: [store] })
      .mockResolvedValueOnce({ rowCount: 1, rows: inventoryRows })
      .mockResolvedValueOnce({ rowCount: 1, rows: movementRows })
      .mockResolvedValueOnce({ rowCount: 1, rows: aggregateRows });

    const result = await readResponse(
      await handler(makeRequest('GET', undefined, '?storefront=yotaabo')),
    );

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      inventory: inventoryRows,
      movements: movementRows,
      aggregates: aggregateRows[0],
    });

    const calls = mocks.poolQuery.mock.calls;

    expect(calls).toHaveLength(4);
    expect(calls[1][0]).toContain('FROM public.products p');
    expect(calls[1][0]).toContain('WHERE p.store_id = $1');
    expect(calls[1][1]).toEqual([store.id]);

    expect(calls[2][0]).toContain('FROM public.inventory_movements m');
    expect(calls[2][0]).toContain('p.sku AS product_sku');
    expect(calls[2][0]).toContain('p.id = m.product_id');
    expect(calls[2][0]).toContain('p.store_id = m.store_id');
    expect(calls[2][0]).toContain('WHERE m.store_id = $1');
    expect(calls[2][1]).toEqual([store.id]);

    expect(calls[3][0]).toContain('FROM public.inventory_movements');
    expect(calls[3][0]).toContain('WHERE store_id = $1');
    expect(calls[3][1]).toEqual([store.id]);

    expect(mocks.connect).not.toHaveBeenCalled();
  });

  it('forces store admins to read only their assigned storefront', async () => {
    mocks.requireAdmin.mockResolvedValue(storeAdmin);

    mocks.poolQuery
      .mockResolvedValueOnce({ rowCount: 1, rows: [store] })
      .mockResolvedValueOnce(emptyResult())
      .mockResolvedValueOnce(emptyResult())
      .mockResolvedValueOnce(emptyResult());

    const result = await readResponse(
      await handler(
        makeRequest('GET', undefined, '?storefront=poshies'),
      ),
    );

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      inventory: [],
      movements: [],
      aggregates: { received: 0, adjusted: 0 },
    });

    const calls = mocks.poolQuery.mock.calls;

    expect(calls[0][1]).toEqual(['yotaabo']);
    expect(calls).toHaveLength(4);

    for (const call of calls.slice(1)) {
      expect(call[1]).toEqual([store.id]);
    }
  });

  it('defaults aggregate totals to zero when no aggregate row is returned', async () => {
    mocks.poolQuery
      .mockResolvedValueOnce({ rowCount: 1, rows: [store] })
      .mockResolvedValueOnce(emptyResult())
      .mockResolvedValueOnce(emptyResult())
      .mockResolvedValueOnce(emptyResult());

    const result = await readResponse(
      await handler(makeRequest('GET', undefined, '?storefront=yotaabo')),
    );

    expect(result.status).toBe(200);
    expect(result.body.aggregates).toEqual({
      received: 0,
      adjusted: 0,
    });
  });
});

describe('inventory API: stock movements', () => {
  it('records opening stock and commits the balance and movement', async () => {
    const expected = queueSuccessfulMovement();

    const result = await readResponse(
      await handler(makeRequest('POST', stockBody())),
    );

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      success: true,
      product_id: productId,
      movement_type: 'opening_stock',
      quantity_delta: expected.expectedDelta,
      on_hand_quantity: expected.expectedOnHand,
      reserved_quantity: 0,
      available_quantity: expected.expectedOnHand,
    });

    expect(mocks.clientQuery).toHaveBeenCalledWith(
      expect.stringContaining('UPDATE public.inventory_balances'),
      [10, store.id, productId],
    );

    expect(mocks.clientQuery).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO public.inventory_movements'),
      [
        store.id,
        productId,
        'opening_stock',
        10,
        'Opening stock',
        superAdmin.id,
        superAdmin.email,
      ],
    );

    expect(mocks.clientQuery).toHaveBeenCalledWith('COMMIT');
    expect(mocks.release).toHaveBeenCalledOnce();
  });

  it('rejects a second opening-stock movement', async () => {
    mocks.poolQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [store],
    });

    queueClientResponses(
      emptyResult(),
      emptyResult(),
      { rowCount: 1, rows: [{ id: productId, name: 'Test Product' }] },
      emptyResult(),
      {
        rowCount: 1,
        rows: [{
          on_hand_quantity: 10,
          reserved_quantity: 0,
          is_initialized: true,
        }],
      },
      emptyResult(), // ROLLBACK
    );

    const result = await readResponse(
      await handler(makeRequest('POST', stockBody())),
    );

    expect(result.status).toBe(409);
    expect(result.body.error).toContain('already been recorded');
    expect(mocks.clientQuery).not.toHaveBeenCalledWith(
      expect.stringContaining('UPDATE public.inventory_balances'),
      expect.anything(),
    );
    expect(mocks.release).toHaveBeenCalledOnce();
  });

  it('rejects movements before opening stock is initialized', async () => {
    mocks.poolQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [store],
    });

    queueClientResponses(
      emptyResult(),
      emptyResult(),
      { rowCount: 1, rows: [{ id: productId, name: 'Test Product' }] },
      emptyResult(),
      {
        rowCount: 1,
        rows: [{
          on_hand_quantity: 0,
          reserved_quantity: 0,
          is_initialized: false,
        }],
      },
      emptyResult(),
    );

    const result = await readResponse(
      await handler(
        makeRequest('POST', stockBody('replenishment', 5, 'Supplier delivery')),
      ),
    );

    expect(result.status).toBe(409);
    expect(result.body.error).toContain('Record opening stock');
  });

  it.each([
    ['replenishment', 'replenishment', 5, 15],
    ['adjustment-increase', 'adjustment_increase', 5, 15],
    ['adjustment-decrease', 'adjustment_decrease', -5, 5],
  ])(
    'applies %s and records the corresponding movement',
    async (action, movementType, delta, expectedOnHand) => {
      queueSuccessfulMovement({
        action,
        quantity: Math.abs(delta),
        onHand: 10,
        initialized: true,
      });

      const result = await readResponse(
        await handler(
          makeRequest(
            'POST',
            stockBody(action, Math.abs(delta), 'Verified stock movement'),
          ),
        ),
      );

      expect(result.status).toBe(200);
      expect(result.body.movement_type).toBe(movementType);
      expect(result.body.quantity_delta).toBe(delta);
      expect(result.body.on_hand_quantity).toBe(expectedOnHand);
    },
  );

  it('requires a reason for non-opening movements', async () => {
    mocks.poolQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [store],
    });

    const result = await readResponse(
      await handler(
        makeRequest(
          'POST',
          stockBody('replenishment', 5),
        ),
      ),
    );

    expect(result.status).toBe(400);
    expect(result.body.error).toContain('reason is required');
    expect(mocks.connect).not.toHaveBeenCalled();
  });

  it('rejects a decrease below reserved stock', async () => {
    mocks.poolQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [store],
    });

    queueClientResponses(
      emptyResult(),
      emptyResult(),
      { rowCount: 1, rows: [{ id: productId, name: 'Test Product' }] },
      emptyResult(),
      {
        rowCount: 1,
        rows: [{
          on_hand_quantity: 5,
          reserved_quantity: 3,
          is_initialized: true,
        }],
      },
      emptyResult(),
    );

    const result = await readResponse(
      await handler(
        makeRequest(
          'POST',
          stockBody('adjustment-decrease', 3, 'Physical count correction'),
        ),
      ),
    );

    expect(result.status).toBe(409);
    expect(result.body.error).toContain('reserved quantity');
    expect(mocks.clientQuery).not.toHaveBeenCalledWith(
      expect.stringContaining('UPDATE public.inventory_balances'),
      expect.anything(),
    );
  });

  it('rejects a resulting balance above PostgreSQL int4 maximum', async () => {
    mocks.poolQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [store],
    });

    queueClientResponses(
      emptyResult(),
      emptyResult(),
      { rowCount: 1, rows: [{ id: productId, name: 'Test Product' }] },
      emptyResult(),
      {
        rowCount: 1,
        rows: [{
          on_hand_quantity: 2147483647,
          reserved_quantity: 0,
          is_initialized: true,
        }],
      },
      emptyResult(),
    );

    const result = await readResponse(
      await handler(
        makeRequest(
          'POST',
          stockBody('replenishment', 1, 'Supplier delivery'),
        ),
      ),
    );

    expect(result.status).toBe(409);
    expect(result.body.error).toContain('supported maximum');
    expect(mocks.clientQuery).not.toHaveBeenCalledWith(
      expect.stringContaining('UPDATE public.inventory_balances'),
      expect.anything(),
    );
  });

  it('rejects an invalid product ID before opening a transaction', async () => {
    mocks.poolQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [store],
    });

    const result = await readResponse(
      await handler(
        makeRequest(
          'POST',
          { ...stockBody(), product_id: 'invalid-id' },
        ),
      ),
    );

    expect(result.status).toBe(400);
    expect(mocks.connect).not.toHaveBeenCalled();
  });

  it('rolls back and releases the connection when a movement insert fails', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    mocks.poolQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [store],
    });

    queueClientResponses(
      emptyResult(),
      emptyResult(),
      { rowCount: 1, rows: [{ id: productId, name: 'Test Product' }] },
      emptyResult(),
      {
        rowCount: 1,
        rows: [{
          on_hand_quantity: 0,
          reserved_quantity: 0,
          is_initialized: false,
        }],
      },
      emptyResult(), // UPDATE balance
      new Error('Movement insert failed'),
      emptyResult(), // ROLLBACK
    );

    const result = await readResponse(
      await handler(makeRequest('POST', stockBody())),
    );

    expect(result.status).toBe(500);
    expect(mocks.clientQuery).toHaveBeenCalledWith('ROLLBACK');
    expect(mocks.release).toHaveBeenCalledOnce();

    consoleError.mockRestore();
  });
});
