import { FiPlus } from 'react-icons/fi';
import AdminPageHeader from './AdminPageHeader';

type AdminOverviewProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onAddProduct: () => void;
  stats: {
    total: number;
    active: number;
  };
  orderStats: {
    total: number;
    pending: number;
    confirmed: number;
    delivered: number;
  };
};

export default function AdminOverview({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onAddProduct,
  stats,
  orderStats,
}: AdminOverviewProps) {
  return (
    <section>
      <AdminPageHeader
        title="Overview"
        searchValue={searchQuery}
        searchPlaceholder="Search products"
        onSearchFocus={onSearchFocus}
        onSearchChange={onSearchChange}
        action={
          <button
            type="button"
            onClick={onAddProduct}
            className="admin-square-action inline-flex shrink-0 items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d]"
          >
            <FiPlus size={18} />
          </button>
        }
      />

      <div className="admin-overview-grid mx-auto grid w-full grid-cols-2 border-t border-[#4d4d4d]/10 sm:grid-cols-3">
        <div className="admin-stat-card bg-[#f5f5f5]">
          <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Total Products</p>
          <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{stats.total}</p>
        </div>

        <div className="admin-stat-card bg-[#f5f5f5]">
          <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Active Products</p>
          <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{stats.active}</p>
        </div>

        <div className="admin-stat-card bg-[#f5f5f5]">
          <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Total Orders</p>
          <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{orderStats.total}</p>
        </div>

        <div className="admin-stat-card bg-[#f5f5f5]">
          <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Pending Orders</p>
          <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{orderStats.pending}</p>
        </div>

        <div className="admin-stat-card bg-[#f5f5f5]">
          <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Confirmed Orders</p>
          <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{orderStats.confirmed}</p>
        </div>

        <div className="admin-stat-card bg-[#f5f5f5]">
          <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Delivered Orders</p>
          <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{orderStats.delivered}</p>
        </div>
      </div>
    </section>
  );
}
