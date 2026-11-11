import { formatRand } from '../shared/formatRand';
import WidgetCard from '../shared/WidgetCard';

type StoreMetricsWidgetProps = {
  averageOrderValue: number;
  repeatRate: number;
  totalCustomers: number;
  revenueGrowthPercent: number;
};

export default function StoreMetricsWidget({
  averageOrderValue,
  repeatRate,
  totalCustomers,
  revenueGrowthPercent,
}: StoreMetricsWidgetProps) {
  const positive = revenueGrowthPercent >= 0;
  return (
    <WidgetCard title="Store metrics" description="AOV, repeat rate, and growth.">
      <div className="flex flex-col" style={{ gap: 'var(--admin-space-sm)' }}>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--admin-size-caption)', color: 'var(--admin-text-secondary)' }}>Average order value</span>
          <span style={{ fontSize: 'var(--admin-size-heading-3)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{formatRand(averageOrderValue)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--admin-size-caption)', color: 'var(--admin-text-secondary)' }}>Repeat rate</span>
          <span style={{ fontSize: 'var(--admin-size-heading-3)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(repeatRate * 100)}%</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--admin-size-caption)', color: 'var(--admin-text-secondary)' }}>Total customers</span>
          <span style={{ fontSize: 'var(--admin-size-heading-3)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{totalCustomers.toLocaleString()}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--admin-size-caption)', color: 'var(--admin-text-secondary)' }}>Revenue growth</span>
          <span style={{ fontSize: 'var(--admin-size-heading-3)', fontWeight: 'var(--admin-weight-semibold)', color: positive ? 'var(--admin-status-green, var(--admin-status-green))' : 'var(--admin-status-red, var(--admin-status-red))', fontVariantNumeric: 'tabular-nums' }}>
            {positive ? '+' : ''}{revenueGrowthPercent.toFixed(1)}%
          </span>
        </div>
      </div>
    </WidgetCard>
  );
}
