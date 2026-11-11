import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { formatRand } from '../shared/formatRand';
import WidgetCard from '../shared/WidgetCard';

type PortfolioHealthWidgetProps = {
  revenueGrowthPercent: number;
  totalRevenue: number;
  totalOrders: number;
  newCustomers: number;
  returningCustomers: number;
};

export default function PortfolioHealthWidget({
  revenueGrowthPercent,
  totalRevenue,
  totalOrders,
  newCustomers,
  returningCustomers,
}: PortfolioHealthWidgetProps) {
  const positive = revenueGrowthPercent >= 0;
  return (
    <WidgetCard title="Portfolio health" description="Growth and customer activity this period.">
      <div className="flex items-baseline" style={{ gap: 'var(--admin-space-xs)' }}>
        <span style={{ fontSize: 'var(--admin-size-page-title)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
          {positive ? '+' : ''}{revenueGrowthPercent.toFixed(1)}%
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', color: positive ? 'var(--admin-status-green, var(--admin-status-green))' : 'var(--admin-status-red, var(--admin-status-red))' }}>
          {positive ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
        </span>
      </div>
      <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', display: 'block', marginTop: 'var(--admin-space-xxs)' }}>revenue growth</span>
      <div className="flex flex-col" style={{ gap: 'var(--admin-space-xs)', marginTop: 'var(--admin-space-md)' }}>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)' }}>Total revenue</span>
          <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{formatRand(totalRevenue)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)' }}>Total orders</span>
          <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{totalOrders}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)' }}>New customers</span>
          <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{newCustomers}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)' }}>Returning</span>
          <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{returningCustomers}</span>
        </div>
      </div>
    </WidgetCard>
  );
}
