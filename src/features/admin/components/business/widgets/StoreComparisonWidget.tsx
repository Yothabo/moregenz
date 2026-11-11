import { formatRand } from '../shared/formatRand';
import WidgetCard from '../shared/WidgetCard';
import type { StoreComparison } from '../placeholderInsights';

type StoreComparisonWidgetProps = {
  stores: StoreComparison[];
};

export default function StoreComparisonWidget({ stores }: StoreComparisonWidgetProps) {
  const totalRevenue = stores.reduce((s, x) => s + x.revenue, 0);
  return (
    <WidgetCard title="Store comparison" description="Revenue share and AOV per store.">
      <div className="grid grid-cols-2" style={{ gap: 'var(--admin-space-md)' }}>
        {stores.map((store) => {
          const sharePct = totalRevenue > 0 ? Math.round((store.revenue / totalRevenue) * 100) : 0;
          return (
            <div key={store.store} className="flex flex-col" style={{ gap: 'var(--admin-space-xs)' }}>
              <div className="flex items-baseline justify-between" style={{ gap: 'var(--admin-space-xs)' }}>
                <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: store.color }}>{store.store}</span>
                <span style={{ fontSize: 'var(--admin-size-caption)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums', fontWeight: 'var(--admin-weight-semibold)' }}>{formatRand(store.revenue)}</span>
              </div>
              <div style={{ height: '6px', borderRadius: 'var(--ds-radius-full)', backgroundColor: 'var(--admin-border-subtle)', overflow: 'hidden' }}>
                <div style={{ width: `${sharePct}%`, height: '100%', backgroundColor: store.color, borderRadius: 'var(--ds-radius-full)' }} />
              </div>
              <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
                {store.orders} orders · AOV {formatRand(store.averageOrderValue)}
              </span>
              <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
                {sharePct}% of portfolio
              </span>
            </div>
          );
        })}
      </div>
    </WidgetCard>
  );
}
