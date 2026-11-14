import type { Storefront } from '../../types/admin.types';
import type {
  OverviewAnalytics,
  OverviewBusinessSummary,
  OverviewDateRangeValue,
  OverviewOrder,
  OverviewOrderOperations,
  OverviewProductPerformanceItem,
  OverviewSalesPerformance,
  OverviewSalesPoint,
  OverviewStorePerformance,
} from '../../types/overview.types';
import {
  getOverviewDateKey,
  isWithinOverviewRange,
} from '../../utils/overview/dateRanges';

const STOREFRONTS: Storefront[] = ['yotaabo', 'poshies'];

function isDelivered(order: OverviewOrder): boolean {
  return order.status === 'delivered';
}

function isCancelled(order: OverviewOrder): boolean {
  return order.status === 'cancelled';
}

function isEligibleForSales(order: OverviewOrder): boolean {
  return isDelivered(order) && !isCancelled(order);
}

function getOrderValue(order: OverviewOrder): number {
  return Number.isFinite(order.subtotal) ? order.subtotal : 0;
}

function getItemValue(price: number, quantity: number): number {
  return price * quantity;
}

function getStatusCounts(orders: OverviewOrder[]) {
  return {
    pending: orders.filter((order) => order.status === 'pending').length,
    confirmed: orders.filter((order) => order.status === 'confirmed').length,
    delivered: orders.filter(isDelivered).length,
    cancelled: orders.filter(isCancelled).length,
  };
}

export function calculateBusinessSummary(
  periodOrders: OverviewOrder[],
  catalogue: {
    total: number;
    active: number;
    hidden: number;
  },
): OverviewBusinessSummary {
  const statuses = getStatusCounts(periodOrders);

  return {
    ordersReceived: periodOrders.filter(
      (order) => !isCancelled(order),
    ).length,
    outstandingOrders: statuses.pending + statuses.confirmed,
    pendingOrders: statuses.pending,
    confirmedOrders: statuses.confirmed,
    deliveredOrders: statuses.delivered,
    cancelledOrders: statuses.cancelled,
    totalProducts: catalogue.total,
    activeProducts: catalogue.active,
    hiddenProducts: catalogue.hidden,
  };
}

export function calculateSalesPerformance(
  periodOrders: OverviewOrder[],
): OverviewSalesPerformance {
  const deliveredOrders = periodOrders.filter(isEligibleForSales);

  const salesByDate = new Map<string, OverviewSalesPoint>();

  for (const order of deliveredOrders) {
    const date = getOverviewDateKey(order.created_at);

    const point = salesByDate.get(date) ?? {
      date,
      label: date,
      value: 0,
      orders: 0,
    };

    point.value += getOrderValue(order);
    point.orders += 1;

    salesByDate.set(date, point);
  }

  const dailySales = [...salesByDate.values()].sort(
    (a, b) => a.date.localeCompare(b.date),
  );

  return {
    recordedSalesValue: deliveredOrders.reduce(
      (total, order) => total + getOrderValue(order),
      0,
    ),
    deliveredOrders: deliveredOrders.length,
    dailySales,
  };
}

export function calculateOrderOperations(
  periodOrders: OverviewOrder[],
): OverviewOrderOperations {
  const statuses = getStatusCounts(periodOrders);

  const recentOrders = [...periodOrders]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime(),
    )
    .slice(0, 10);

  return {
    total: periodOrders.length,
    ...statuses,
    recentOrders,
  };
}

export function calculateProductPerformance(
  periodOrders: OverviewOrder[],
): OverviewProductPerformanceItem[] {
  const products = new Map<string, OverviewProductPerformanceItem>();

  for (const order of periodOrders) {
    if (!isEligibleForSales(order)) continue;

    for (const item of order.items) {
      // Deleted products retain their order lines, but cannot
      // be attributed to a product in performance rankings.
      if (
        typeof item.product_id !== 'string' ||
        item.product_id.trim().length === 0
      ) continue;

      const current = products.get(item.product_id) ?? {
        productId: item.product_id,
        productName: item.name,
        unitsSold: 0,
        recordedValue: 0,
      };

      current.unitsSold += item.qty;
      current.recordedValue += getItemValue(item.price, item.qty);

      products.set(item.product_id, current);
    }
  }

  return [...products.values()].sort(
    (a, b) =>
      b.unitsSold - a.unitsSold ||
      b.recordedValue - a.recordedValue,
  );
}

export function calculateStoreComparison(
  periodOrders: OverviewOrder[],
  selectedStore: Storefront | 'all',
): OverviewStorePerformance[] {
  const stores =
    selectedStore === 'all' ? STOREFRONTS : [selectedStore];

  return stores.map((storefront) => {
    const storeOrders = periodOrders.filter(
      (order) => order.storefront === storefront,
    );

    const deliveredOrders = storeOrders.filter(isEligibleForSales);

    const unitsSold = deliveredOrders.reduce(
      (total, order) =>
        total +
        order.items.reduce((itemTotal, item) => itemTotal + item.qty, 0),
      0,
    );

    return {
      storefront,
      orders: storeOrders.filter((order) => !isCancelled(order)).length,
      deliveredOrders: deliveredOrders.length,
      recordedSalesValue: deliveredOrders.reduce(
        (total, order) => total + getOrderValue(order),
        0,
      ),
      unitsSold,
    };
  });
}

export function calculateOverviewAnalytics(args: {
  orders: OverviewOrder[];
  dateRange: OverviewDateRangeValue;
  catalogue: {
    total: number;
    active: number;
    hidden: number;
  };
  selectedStore: Storefront | 'all';
}): OverviewAnalytics {
  const filteredOrders = args.orders.filter((order) =>
    isWithinOverviewRange(order.created_at, args.dateRange),
  );

  const periodOrders =
    args.selectedStore === 'all'
      ? filteredOrders
      : filteredOrders.filter(
          (order) => order.storefront === args.selectedStore,
        );

  return {
    businessSummary: calculateBusinessSummary(
      periodOrders,
      args.catalogue,
    ),
    salesPerformance: calculateSalesPerformance(periodOrders),
    orderOperations: calculateOrderOperations(periodOrders),
    productPerformance: calculateProductPerformance(periodOrders),
    storeComparison: calculateStoreComparison(
      filteredOrders,
      args.selectedStore,
    ),
  };
}
