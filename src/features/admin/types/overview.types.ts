import type { Storefront } from './admin.types';

export type OverviewDatePreset =
  | 'today'
  | 'yesterday'
  | 'last-7-days'
  | 'last-30-days'
  | 'this-month'
  | 'last-month'
  | 'this-year'
  | 'last-year'
  | 'all-time';

export type OverviewDateSelection =
  | { type: 'preset'; preset: OverviewDatePreset }
  | { type: 'dates'; dates: string[] };

export type OverviewLoadState =
  | 'loading'
  | 'success'
  | 'empty'
  | 'error';

export type OverviewOrderStatus =
  | 'pending'
  | 'confirmed'
  | 'delivered'
  | 'cancelled';

export interface OverviewOrderItem {
  product_id: string | null;
  name: string;
  price: number;
  qty: number;
}

export interface OverviewOrder {
  id: string;
  storefront: Storefront;
  order_number: string;
  items: OverviewOrderItem[];
  subtotal: number;
  status: OverviewOrderStatus;
  created_at: string;
  updated_at: string;
}

export interface OverviewDateRangeValue {
  start: Date | null;
  end: Date;
  ranges?: { start: Date; end: Date }[];
}

export interface OverviewMetric {
  value: number;
  previousValue: number | null;
  changePercent: number | null;
}

export interface OverviewBusinessSummary {
  ordersReceived: number;
  outstandingOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalProducts: number;
  activeProducts: number;
  hiddenProducts: number;
}

export interface OverviewSalesPoint {
  date: string;
  label: string;
  value: number;
  orders: number;
}

export interface OverviewSalesPerformance {
  recordedSalesValue: number;
  deliveredOrders: number;
  dailySales: OverviewSalesPoint[];
}

export interface OverviewProductPerformanceItem {
  productId: string;
  productName: string;
  unitsSold: number;
  recordedValue: number;
}

export interface OverviewStorePerformance {
  storefront: Storefront;
  orders: number;
  deliveredOrders: number;
  recordedSalesValue: number;
  unitsSold: number;
}

export interface OverviewOrderOperations {
  total: number;
  pending: number;
  confirmed: number;
  delivered: number;
  cancelled: number;
  recentOrders: OverviewOrder[];
}

export interface OverviewAnalytics {
  businessSummary: OverviewBusinessSummary;
  salesPerformance: OverviewSalesPerformance;
  orderOperations: OverviewOrderOperations;
  productPerformance: OverviewProductPerformanceItem[];
  storeComparison: OverviewStorePerformance[];
}
