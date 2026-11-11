import { FiActivity, FiArrowUpRight, FiCheckCircle, FiShoppingBag, FiTruck, FiXCircle } from 'react-icons/fi';

type OrderOverviewProps = {
  orderStats: {
    total: number;
    pending: number;
    confirmed: number;
    delivered: number;
    cancelled: number;
  };
  onViewOrders?: () => void;
};

export default function OrderOverviewCard({ orderStats, onViewOrders }: OrderOverviewProps) {
  const orderStatuses = [
    { label: 'Pending', value: orderStats.pending, icon: FiActivity, color: 'var(--ds-color-status-warning)', background: 'var(--ds-color-bg-status-warning)' },
    { label: 'Confirmed', value: orderStats.confirmed, icon: FiCheckCircle, color: 'var(--ds-color-status-success)', background: 'var(--ds-color-bg-status-success)' },
    { label: 'Delivered', value: orderStats.delivered, icon: FiTruck, color: 'var(--ds-color-status-success)', background: 'var(--ds-color-bg-status-success)' },
    { label: 'Cancelled', value: orderStats.cancelled, icon: FiXCircle, color: 'var(--ds-color-status-danger)', background: 'var(--ds-color-bg-status-danger)' },
  ];

  const totalOrders = Math.max(orderStats.total, 0);

  return (
    <section className="flex h-full min-w-0 flex-col gap-ds-4 rounded-ds-xl border border-design-border-secondary bg-design-surface p-ds-4 shadow-ds-xs sm:p-ds-5">
      <div className="flex items-center justify-between gap-ds-3">
        <div className="flex items-center gap-ds-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-ds-md bg-design-surface-secondary text-design-icon-primary">
            <FiShoppingBag size={18} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-0">
            <h2 className="admin-font-heading text-ds-heading-3 text-design-text-primary">
              Order overview
            </h2>
            <p className="admin-font-body text-ds-caption text-design-text-secondary">
              Order status breakdown
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onViewOrders}
          disabled={!onViewOrders}
          className="inline-flex min-h-9 items-center gap-ds-1 rounded-ds-md px-ds-2 text-ds-caption font-medium text-design-text-accent transition-colors hover:bg-design-surface-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-design-focus-ring motion-reduce:transition-none"
        >
          View orders
          <FiArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-end gap-ds-3 mt-auto">
        <p className="admin-font-heading text-ds-display tabular-nums text-design-text-primary">
          {orderStats.total}
        </p>
        <p className="admin-font-body pb-ds-2 text-ds-caption text-design-text-secondary">
          Total orders received
        </p>
      </div>

      <div className="flex h-2 w-full overflow-hidden rounded-ds-full bg-design-surface-secondary">
        {orderStatuses.map((status) => {
          const percentage = totalOrders > 0 ? (status.value / totalOrders) * 100 : 0;
          return (
            <span
              key={status.label}
              className="h-full first:rounded-l-ds-full last:rounded-r-ds-full"
              style={{ width: `${percentage}%`, backgroundColor: status.color }}
              title={`${status.label}: ${status.value}`}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-x-ds-4 gap-y-ds-3 border-t border-design-border-secondary pt-ds-4">
        {orderStatuses.map((status) => {
          const StatusIcon = status.icon;
          return (
            <div key={status.label} className="flex items-center gap-ds-2">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-ds-md"
                style={{ color: status.color, backgroundColor: status.background }}
              >
                <StatusIcon size={15} aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-col gap-0">
                <span className="admin-font-body text-ds-caption text-design-text-secondary">
                  {status.label}
                </span>
                <span className="admin-font-heading text-ds-heading-3 tabular-nums text-design-text-primary">
                  {status.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
