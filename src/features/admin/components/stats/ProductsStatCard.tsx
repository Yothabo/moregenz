import type { AdminRow } from '../../types/admin.types';

type ProductsStatCardProps = {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  products: AdminRow[];
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

export default function ProductsStatCard({
  totalProducts,
  activeProducts,
  inactiveProducts,
  products,
  accentColor,
}: ProductsStatCardProps) {
  // 8-week trend
  const weeks = 8;
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const startOfThisWeek = new Date();
  startOfThisWeek.setHours(0, 0, 0, 0);
  startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay());
  const weeklyCounts: number[] = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const start = new Date(startOfThisWeek.getTime() - i * weekMs);
    const end = new Date(start.getTime() + weekMs);
    const count = products.filter((p) => {
      const t = new Date(p.created_at).getTime();
      return t >= start.getTime() && t < end.getTime();
    }).length;
    weeklyCounts.push(count);
  }
  const weeklyMax = Math.max(1, ...weeklyCounts);
  const barAreaHeight = 32;

  const w = barAreaHeight * 4;
  const h = barAreaHeight;
  const n = weeklyCounts.length;
  const denom = Math.max(1, n - 1);
  const pts = weeklyCounts.map((v, i) => {
    const x = (i / denom) * w;
    const y = h - (v / weeklyMax) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const linePath = `M ${pts.join(' L ')}`;
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;

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
          Products
        </span>
        <span style={{ fontSize: 'var(--admin-size-micro)', color: accentColor, lineHeight: 1 }}>
          Last 8 weeks
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
        {totalProducts.toLocaleString()}
      </span>

      <div className="w-full" style={{ marginTop: 'auto', height: `${barAreaHeight}px` }}>
        <svg
          width="100%"
          height={barAreaHeight}
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          style={{ display: 'block' }}
          aria-label={`Products added per week over the last 8 weeks, peak ${weeklyMax}`}
        >
          <path d={areaPath} fill={accentColor} fillOpacity={0.15} />
          <path
            d={linePath}
            fill="none"
            stroke={accentColor}
            strokeWidth={1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray={1}
            style={{
              animation: 'admin-trend-draw 800ms ease-out forwards',
            }}
          />
          {weeklyCounts.map((v, i) => {
            const x = (i / denom) * w;
            const y = h - (v / weeklyMax) * (h - 4) - 2;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={1.5}
                fill={accentColor}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center" style={{ gap: 'var(--admin-space-md)', marginTop: 'var(--admin-space-xs)' }}>
        <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: accentColor, fontWeight: 'var(--admin-weight-semibold)' }}>{activeProducts}</span>{' '}
          live
        </span>
        <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: accentColor, fontWeight: 'var(--admin-weight-semibold)' }}>{inactiveProducts}</span>{' '}
          hidden
        </span>
      </div>
    </div>
  );
}
