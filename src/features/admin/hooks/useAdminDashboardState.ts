import { useEffect, useState } from 'react';
import type { Tab, CategoryFilter, OrderFilter, Storefront, TimeRange } from '../types/admin.types';

export function useAdminDashboardState(
  adminRole: string | undefined,
  adminStoreSlug: string | undefined,
) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [storefrontFilter, setStorefrontFilter] = useState<'all' | Storefront>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [overviewMonth, setOverviewMonth] = useState<string | undefined>('Nov');
  const [timeRange, setTimeRange] = useState<TimeRange>('this-year');
  const [currentPage, setCurrentPage] = useState(1);

  const [orderFilter, setOrderFilter] = useState<OrderFilter>('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderPage, setOrderPage] = useState(1);
  const [viewingOrder, setViewingOrder] = useState<import('../types/admin.types').Order | null>(null);
  const [confirmDeleteOrder, setConfirmDeleteOrder] = useState<import('../types/admin.types').Order | null>(null);

  const ITEMS_PER_PAGE = 20;
  const ORDERS_PER_PAGE = 20;

  useEffect(() => {
    if (adminRole === 'store_admin' && adminStoreSlug) {
      setStorefrontFilter(adminStoreSlug as Storefront);
    } else if (adminRole === 'super_admin') {
      setStorefrontFilter('all');
    }
  }, [adminRole, adminStoreSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return {
    activeTab, setActiveTab,
    storefrontFilter, setStorefrontFilter,
    categoryFilter, setCategoryFilter,
    searchQuery, setSearchQuery,
    notificationsOpen, setNotificationsOpen,
    overviewMonth, setOverviewMonth,
    timeRange, setTimeRange,
    currentPage, setCurrentPage,
    orderFilter, setOrderFilter,
    orderSearch, setOrderSearch,
    orderPage, setOrderPage,
    viewingOrder, setViewingOrder,
    confirmDeleteOrder, setConfirmDeleteOrder,
    ITEMS_PER_PAGE,
    ORDERS_PER_PAGE,
  };
}
