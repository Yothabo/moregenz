import type { Order } from '../../types/admin.types';

type OrdersStatCardProps = {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  orders: Order[];
  accentColor: string;
};

const CARD_STYLE = {
  minHeight: 'var(--admin-stat-card-min-height, 160px)',
  borderRadius: 'var(--ds-radius-lg)',
  borderWidth: '1px',
  borderStyle: 'solid' as const,
  borderColor: 'var(--admin-border-strong)',
  backgroundColor: 'var(--admin-surface)',
  backgroundImage: [
    'linear-gradient(to bottom, var(--admin-surface) 0%, transparent 30%)',
    'linear-gradient(to top, var(--admin-surface) 0%, transparent 30%)',
    'linear-gradient(to right, color-mix(in srgb, var(--admin-border-strong) 8%, transparent) 1px, transparent 1px)',
    'linear-gradient(to bottom, color-mix(in srgb, var(--admin-border-strong) 8%, transparent) 1px, transparent 1px)',
  ].join(','),
  backgroundSize: [
    '100% 100%',
    '100% 100%',
    'var(--admin-card-grid-size) var(--admin-card-grid-size)',
    'var(--admin-card-grid-size) var(--admin-card-grid-size)',
  ].join(','),
  backgroundRepeat: 'no-repeat, no-repeat, repeat, repeat',
  padding: 'var(--admin-space-md)',
  gap: 'var(--admin-space-xs)',
} as const;

export default function OrdersStatCard({
  totalOrders,
  pendingOrders,
  deliveredOrders,
  orders,
  accentColor,
}: OrdersStatCardProps) {
  // 30 daily bars
  const days = 30;
  const now = new Date();
  const dailyCounts: number[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const count = orders.filter((o) => {
      if (o.status === 'cancelled') return false;
      const t = new Date(o.created_at).getTime();
      return t >= d.getTime() && t < next.getTime();
    }).length;
    dailyCounts.push(count);
  }
  const dailyMax = Math.max(1, ...dailyCounts);
  const barAreaHeight = 32;

  return (
    <div className="admin-card-bg relative flex flex-col overflow-hidden" style={CARD_STYLE}>
      <div className="flex items-center justify-between" style={{ gap: 'var(--admin-space-xs)' }}>
        <span
          style={{
            fontSize: 'var(--admin-size-supporting)',
            fontWeight: 'var(--admin-weight-normal)',
            color: 'var(--admin-text-tertiary)',
            lineHeight: 1,
          }}
        >
          Orders
        </span>
        <span style={{ fontSize: 'var(--admin-size-micro)', color: accentColor, lineHeight: 1 }}>
          Last 30 days
        </span>
      </div>
      <span
        style={{
          fontSize: 'var(--admin-size-page-title)',
          fontWeight: 'var(--admin-weight-semibold)',
          color: 'var(--admin-text-primary)',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {totalOrders.toLocaleString()}
      </span>

      <div
        className="w-full"
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1px',
          height: `${barAreaHeight}px`,
        }}
        aria-label={`Daily order count over the last 30 days, peak ${dailyMax}`}
      >
        {dailyCounts.map((count, i) => {
          const h = count === 0 ? 2 : Math.max(4, (count / dailyMax) * barAreaHeight);
          return (
            <span
              key={i}
              title={`${count} order${count === 1 ? '' : 's'}`}
              style={{
                flex: 1,
                height: `${h}px`,
                backgroundColor: count === 0 ? 'var(--admin-border-subtle)' : accentColor,
                borderRadius: '1px',
                transition: 'height 200ms ease',
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap items-center" style={{ gap: 'var(--admin-space-md)', marginTop: 'var(--admin-space-xs)' }}>
        <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: accentColor, fontWeight: 'var(--admin-weight-semibold)' }}>{pendingOrders}</span>{' '}
          pending
        </span>
        <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: accentColor, fontWeight: 'var(--admin-weight-semibold)' }}>{deliveredOrders}</span>{' '}
          delivered
        </span>
      </div>
    </div>
  );
}
