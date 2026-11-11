import type { Order, AdminRow } from '../types/admin.types';
import OverviewHeader from './OverviewHeader';
import StatsRow from './StatsRow';
import StorePerformanceCard from './StorePerformanceCard';
import BusinessInsights from './business/BusinessInsights';
import SectionHeader from './SectionHeader';

type AdminOverviewProps = {
  email: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onAddProduct: () => void;
  activeFilter?: string;
  onFilterSelect?: (filterId: string) => void;
  activeMonth?: string;
  onMonthSelect?: (month: string | undefined) => void;
  orders?: Order[];
  products?: AdminRow[];
  stats?: { total: number; active: number; hidden: number };
  orderStats?: {
    total: number;
    pending: number;
    confirmed: number;
    delivered: number;
    cancelled: number;
  };
};

export default function AdminOverview({
  email,
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onAddProduct,
  activeFilter,
  onFilterSelect,
  activeMonth,
  onMonthSelect,
  orders = [],
  products = [],
  stats = { total: 0, active: 0, hidden: 0 },
  orderStats = { total: 0, pending: 0, confirmed: 0, delivered: 0, cancelled: 0 },
}: AdminOverviewProps) {
  return (
    <section
      className="admin-overview flex w-full flex-col"
      style={{ gap: 'var(--admin-space-xl)' }}
    >
      <OverviewHeader
        email={email}
        onAddProduct={onAddProduct}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchFocus={onSearchFocus}
        activeFilter={activeFilter}
        onFilterSelect={onFilterSelect}
      />
      <StatsRow
        totalOrders={orderStats.total}
        pendingOrders={orderStats.pending}
        confirmedOrders={orderStats.confirmed}
        deliveredOrders={orderStats.delivered}
        cancelledOrders={orderStats.cancelled}
        totalProducts={stats.total}
        activeProducts={stats.active}
        inactiveProducts={stats.hidden}
        activeFilter={activeFilter}
        orders={orders}
        products={products}
      />
      <div className="flex flex-col" style={{ gap: 'var(--admin-space-md)' }}>
        <SectionHeader
          title="Revenue performance"
          description="Where the money is going — monthly revenue by category."
        />
        <StorePerformanceCard orders={orders} products={products} activeFilter={activeFilter} />
      </div>
      <BusinessInsights activeFilter={activeFilter} />
    </section>
  );
}
