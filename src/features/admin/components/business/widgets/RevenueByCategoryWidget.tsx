import { formatRand } from '../shared/formatRand';
import WidgetCard from '../shared/WidgetCard';
import type { CategoryRevenue, StoreCategoryBreakdown } from '../placeholderInsights';

type PerStoreProps = {
  mode: 'portfolio';
  stores: StoreCategoryBreakdown[];
};

type SingleStoreProps = {
  mode: 'store';
  categories: CategoryRevenue[];
};

type RevenueByCategoryWidgetProps = PerStoreProps | SingleStoreProps;

function Chart({
  categories,
  description,
  chartHeight,
  barLabelSize,
  barGap,
}: {
  categories: CategoryRevenue[];
  description: string;
  chartHeight: number;
  barLabelSize: string;
  barGap: string;
}) {
  const total = categories.reduce((s, c) => s + c.revenue, 0);
  const maxCat = Math.max(1, ...categories.map((c) => c.revenue));

  return (
    <div className="flex flex-col" style={{ gap: 'var(--admin-space-sm)' }}>
      <div className="flex items-baseline justify-between" style={{ gap: 'var(--admin-space-xs)' }}>
        <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)' }}>
          {description}
        </span>
        <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
          {formatRand(total)} total
        </span>
      </div>
      <div style={{ position: 'relative', height: `${chartHeight}px`, width: '100%' }}>
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
          <div
            key={pct}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: `${pct * 100}%`,
              height: '1px',
              borderTop: pct === 0 ? '1px solid var(--admin-border-strong)' : '1px dashed var(--admin-border-subtle)',
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-end" style={{ gap: barGap, paddingBottom: '1px' }}>
          {categories.map((cat) => {
            const heightPct = (cat.revenue / maxCat) * 100;
            return (
              <div key={cat.category} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                <span style={{ fontSize: barLabelSize, fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums', marginBottom: '2px' }}>
                  {formatRand(cat.revenue)}
                </span>
                <div
                  style={{
                    width: '100%',
                    height: `${heightPct}%`,
                    backgroundColor: cat.color,
                    borderRadius: 'var(--ds-radius-sm) var(--ds-radius-sm) 0 0',
                    minHeight: cat.revenue > 0 ? '2px' : '0px',
                    transition: 'height 300ms ease',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex" style={{ gap: barGap }}>
        {categories.map((cat) => (
          <span key={cat.category} style={{ flex: 1, fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-secondary)', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {cat.category}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RevenueByCategoryWidget(props: RevenueByCategoryWidgetProps) {
  if (props.mode === 'portfolio') {
    return (
      <WidgetCard title="Revenue by category" description="Category revenue per store.">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--admin-space-lg)' }}>
          {props.stores.map((store) => (
            <div key={store.store} className="flex flex-col" style={{ gap: 'var(--admin-space-sm)' }}>
              <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: store.color }}>
                {store.store}
              </span>
              <Chart
                categories={store.categories}
                description=""
                chartHeight={140}
                barLabelSize="9px"
                barGap="var(--admin-space-xs)"
              />
            </div>
          ))}
        </div>
      </WidgetCard>
    );
  }

  const sorted = [...props.categories].sort((a, b) => b.revenue - a.revenue);
  return (
    <WidgetCard title="Revenue by category" description="Which categories drive revenue.">
      <Chart
        categories={sorted}
        description=""
        chartHeight={160}
        barLabelSize="10px"
        barGap="var(--admin-space-sm)"
      />
    </WidgetCard>
  );
}
