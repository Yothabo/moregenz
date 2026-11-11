import { useMemo } from 'react';
import type { AdminRow, Order, CategoryFilter, OrderFilter } from '../types/admin.types';
import { inTimeRange } from '../utils/timeRange';
import type { TimeRange } from '../types/admin.types';

type Args = {
  products: AdminRow[];
  orders: Order[];
  storefrontFilter: 'all' | string;
  categoryFilter: CategoryFilter;
  searchQuery: string;
  currentPage: number;
  orderFilter: OrderFilter;
  orderSearch: string;
  orderPage: number;
  timeRange: TimeRange;
  ITEMS_PER_PAGE: number;
  ORDERS_PER_PAGE: number;
};

export function useAdminDerivedData({
  products,
  orders,
  storefrontFilter,
  categoryFilter,
  searchQuery,
  currentPage,
  orderFilter,
  orderSearch,
  orderPage,
  timeRange,
  ITEMS_PER_PAGE,
  ORDERS_PER_PAGE,
}: Args) {
  const storefrontProducts = useMemo(
    () => storefrontFilter === 'all' ? products : products.filter((p) => p.storefront === storefrontFilter),
    [products, storefrontFilter],
  );

  const storefrontOrders = useMemo(
    () => storefrontFilter === 'all' ? orders : orders.filter((o) => o.storefront === storefrontFilter),
    [orders, storefrontFilter],
  );

  const timeFilteredOrders = useMemo(
    () => storefrontOrders.filter((o) => inTimeRange(o.created_at, timeRange)),
    [storefrontOrders, timeRange],
  );

  const timeFilteredProducts = useMemo(
    () => storefrontProducts.filter((p) => inTimeRange(p.created_at, timeRange)),
    [storefrontProducts, timeRange],
  );

  const filteredProducts = useMemo(() => {
    return storefrontProducts
      .filter((product) => {
        if (categoryFilter === 'Hidden') {
          if (product.is_active) return false;
        } else if (categoryFilter !== 'All' && product.category !== categoryFilter) {
          return false;
        }
        if (searchQuery.trim() && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [storefrontProducts, categoryFilter, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage, ITEMS_PER_PAGE]);

  const filteredOrders = useMemo(() => {
    return storefrontOrders.filter((order) => {
      if (orderFilter !== 'All' && order.status !== orderFilter.toLowerCase()) return false;
      if (orderSearch.trim()) {
        const query = orderSearch.toLowerCase();
        const matches =
          order.order_number.toLowerCase().includes(query) ||
          order.customer_name.toLowerCase().includes(query) ||
          order.customer_phone.includes(orderSearch);
        if (!matches) return false;
      }
      return true;
    });
  }, [storefrontOrders, orderFilter, orderSearch]);

  const totalOrderPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const start = (orderPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [filteredOrders, orderPage, ORDERS_PER_PAGE]);

  const stats = useMemo(
    () => ({
      total: storefrontProducts.length,
      active: storefrontProducts.filter((p) => p.is_active).length,
      hidden: storefrontProducts.filter((p) => !p.is_active).length,
    }),
    [storefrontProducts],
  );

  const orderStats = useMemo(
    () => ({
      total: storefrontOrders.length,
      pending: storefrontOrders.filter((o) => o.status === 'pending').length,
      confirmed: storefrontOrders.filter((o) => o.status === 'confirmed').length,
      delivered: storefrontOrders.filter((o) => o.status === 'delivered').length,
      cancelled: storefrontOrders.filter((o) => o.status === 'cancelled').length,
    }),
    [storefrontOrders],
  );

  return {
    storefrontProducts,
    storefrontOrders,
    timeFilteredOrders,
    timeFilteredProducts,
    filteredProducts,
    paginatedProducts,
    totalPages,
    filteredOrders,
    paginatedOrders,
    totalOrderPages,
    stats,
    orderStats,
  };
}
