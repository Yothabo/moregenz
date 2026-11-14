import { describe, expect, it } from 'vitest';
import type { OverviewOrder } from '../../../src/features/admin/types/overview.types';
import {
  calculateBusinessSummary,
  calculateOrderOperations,
  calculateProductPerformance,
  calculateSalesPerformance,
  calculateStoreComparison,
} from '../../../src/features/admin/analytics/overview/overviewCalculations';

const makeOrder = (
  overrides: Partial<OverviewOrder> = {},
): OverviewOrder => ({
  id: 'order-1',
  storefront: 'yotaabo',
  order_number: 'YOT-001',
  status: 'delivered',
  subtotal: 150,
  created_at: '2026-11-12T10:00:00+02:00',
  updated_at: '2026-11-12T10:00:00+02:00',
  items: [
    {
      product_id: 'product-1',
      name: 'Test Product',
      price: 100,
      qty: 1,
    },
    {
      product_id: null,
      name: 'Deleted Product',
      price: 50,
      qty: 1,
    },
  ],
  ...overrides,
});

describe('Overview calculations with nullable product IDs', () => {
  it('excludes deleted products from product performance', () => {
    const result = calculateProductPerformance([makeOrder()]);

    expect(result).toEqual([
      {
        productId: 'product-1',
        productName: 'Test Product',
        unitsSold: 1,
        recordedValue: 100,
      },
    ]);
  });

  it('does not lose valid product performance when an order contains deleted products', () => {
    const order = makeOrder({
      items: [
        {
          product_id: null,
          name: 'Deleted Product',
          price: 50,
          qty: 3,
        },
        {
          product_id: 'product-1',
          name: 'Test Product',
          price: 100,
          qty: 2,
        },
      ],
    });

    const result = calculateProductPerformance([order]);

    expect(result).toHaveLength(1);
    expect(result[0].productId).toBe('product-1');
    expect(result[0].unitsSold).toBe(2);
    expect(result[0].recordedValue).toBe(200);
  });

  it('includes the full order subtotal in recorded sales', () => {
    const result = calculateSalesPerformance([makeOrder()]);

    expect(result.recordedSalesValue).toBe(150);
    expect(result.deliveredOrders).toBe(1);
    expect(result.dailySales).toHaveLength(1);
    expect(result.dailySales[0].value).toBe(150);
    expect(result.dailySales[0].orders).toBe(1);
  });

  it('includes orders containing deleted products in order operations', () => {
    const order = makeOrder();

    const result = calculateOrderOperations([order]);

    expect(result.total).toBe(1);
    expect(result.delivered).toBe(1);
    expect(result.recentOrders).toHaveLength(1);
    expect(result.recentOrders[0].id).toBe(order.id);
  });

  it('includes deleted-product orders in business summary', () => {
    const result = calculateBusinessSummary(
      [makeOrder()],
      { total: 5, active: 4, hidden: 1 },
    );

    expect(result.ordersReceived).toBe(1);
    expect(result.deliveredOrders).toBe(1);
    expect(result.totalProducts).toBe(5);
  });

  it('includes all delivered quantities in store comparison', () => {
    const result = calculateStoreComparison(
      [makeOrder()],
      'all',
    );

    const yotaabo = result.find(
      (store) => store.storefront === 'yotaabo',
    );

    expect(yotaabo).toBeDefined();
    expect(yotaabo?.deliveredOrders).toBe(1);
    expect(yotaabo?.recordedSalesValue).toBe(150);
    expect(yotaabo?.unitsSold).toBe(2);
  });

  it('does not count cancelled orders as recorded sales', () => {
    const result = calculateSalesPerformance([
      makeOrder({ status: 'cancelled' }),
    ]);

    expect(result.recordedSalesValue).toBe(0);
    expect(result.deliveredOrders).toBe(0);
    expect(result.dailySales).toHaveLength(0);
  });

  it('does not attribute an order with only deleted products to a product', () => {
    const result = calculateProductPerformance([
      makeOrder({
        items: [
          {
            product_id: null,
            name: 'Deleted Product',
            price: 50,
            qty: 2,
          },
        ],
      }),
    ]);

    expect(result).toEqual([]);
  });
});
