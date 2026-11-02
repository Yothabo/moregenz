import { useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import type { AdminActivity } from '../hooks/useAdminActivity';
import AdminPageHeader from './AdminPageHeader';

type AdminOverviewProps = {
  activities: AdminActivity[];
  isLoadingActivities: boolean;
  email: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onAddProduct: () => void;
  onViewAllActivities: () => void;
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
  email,
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onAddProduct,
  stats,
  orderStats,
  activities,
  isLoadingActivities,
  onViewAllActivities,
}: AdminOverviewProps) {
  const statsGridRef = useRef<HTMLDivElement>(null);
  const [statsGridHeight, setStatsGridHeight] = useState(0);

  useEffect(() => {
    const grid = statsGridRef.current;
    if (!grid) return;

    const observer = new ResizeObserver(([entry]) => {
      setStatsGridHeight(entry.contentRect.height);
    });

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12
      ? 'Good morning'
      : hour < 17
        ? 'Good afternoon'
        : 'Good evening';

  return (
    <section className="admin-overview">
      <AdminPageHeader
        eyebrow={now.toLocaleDateString('en-ZA', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
        title={`${greeting}, ${email}.`}
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

      <div className="mx-auto mt-8 flex w-full max-w-[896px] items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-[0.1em] text-[#4d4d4d]">
          Current Statistics
        </span>
      </div>

      <section className="mx-auto mt-3 w-full max-w-[896px] border border-[#4d4d4d]/10">
        <div className="px-3 py-2">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="admin-stat-card bg-[#f5f5f5]">
            <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Products</p>
            <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{stats.total}</p>
          </div>

          <div className="admin-stat-card bg-[#f5f5f5]">
            <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Live Products</p>
            <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{stats.active}</p>
          </div>

          <div className="admin-stat-card bg-[#f5f5f5]">
            <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Orders Received</p>
            <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{orderStats.total}</p>
          </div>

          <div className="admin-stat-card bg-[#f5f5f5]">
            <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Pending</p>
            <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{orderStats.pending}</p>
          </div>

          <div className="admin-stat-card bg-[#f5f5f5]">
            <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Confirmed Orders</p>
            <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{orderStats.confirmed}</p>
          </div>

          <div className="admin-stat-card bg-[#f5f5f5]">
            <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">Completed</p>
            <p className="admin-stat-value admin-type-metric text-[#4d4d4d]">{orderStats.delivered}</p>
          </div>
        </div>


        </div>
      </section>

      <div className="mx-auto mt-8 flex w-full max-w-[896px] items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#4d4d4d]">
          Recent Activities
        </h2>
        <button
          type="button"
          onClick={onViewAllActivities}
          className="text-xs font-medium uppercase tracking-[0.1em] text-[#4d4d4d]/65 transition-colors hover:text-[#4d4d4d]"
        >
          View all
        </button>
      </div>

      <section
        className="mx-auto mt-[var(--admin-space-xs)] flex w-full max-w-[896px] flex-col border border-[#4d4d4d]/10"
        style={{ height: statsGridHeight || 'auto' }}
      >
        <div className="min-h-0 flex-1 overflow-y-auto space-y-2 px-3 py-2">
          {isLoadingActivities && activities.length === 0 ? (
            <p className="px-4 py-6 text-sm text-[#4d4d4d]/50">
              Loading activities...
            </p>
          ) : activities.length === 0 ? (
            <p className="px-4 py-6 text-sm text-[#4d4d4d]/50">
              No activities yet.
            </p>
          ) : (
            activities.slice(0, 5).map((activity) => {
              const metadata = activity.metadata ?? {};

              const productName =
                typeof metadata.product_name === 'string'
                  ? metadata.product_name.trim()
                  : '';

              const rawOrderNumber =
                typeof metadata.order_number === 'string'
                  ? metadata.order_number.trim()
                  : '';

              const orderNumber = rawOrderNumber.replace(/^#+/, '');

              const description =
                activity.event_type === 'product.created' && productName
                  ? `${productName} added`
                  : activity.event_type === 'order.received' && orderNumber
                    ? `Order #${orderNumber} received`
                    : activity.description.replace(
                        /^(Order)\s*#+/i,
                        '$1 #'
                      );

              return (
                <article
                  key={activity.id}
                  className="flex items-center justify-between gap-3 rounded-sm bg-[#f5f5f5] px-4 py-2.5"
                >
                  <p className="min-w-0 text-sm leading-relaxed text-[#4d4d4d]/45">
                    {description}
                  </p>
                  <time
                    dateTime={activity.created_at}
                    className="shrink-0 whitespace-nowrap text-right text-xs text-[#4d4d4d]/45"
                  >
                    {new Date(activity.created_at).toLocaleString('en-ZA', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </article>
              );
            })
          )}
        </div>
      </section>
    </section>
  );
}
