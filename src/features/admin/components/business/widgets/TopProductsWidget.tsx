import { formatRand } from '../shared/formatRand';
import WidgetCard from '../shared/WidgetCard';
import type { TopProduct } from '../placeholderInsights';

type TopProductsWidgetProps = {
  products: TopProduct[];
  description?: string;
};

export default function TopProductsWidget({
  products,
  description = 'Best sellers, ranked by revenue.',
}: TopProductsWidgetProps) {
  return (
    <WidgetCard title="Top products" description={description}>
      <ol className="flex flex-col" style={{ gap: 'var(--admin-space-xs)', listStyle: 'none', padding: 0, margin: 0 }}>
        {products.map((product) => (
          <li key={product.rank} className="flex items-center justify-between" style={{ gap: 'var(--admin-space-sm)' }}>
            <div className="flex items-center" style={{ gap: 'var(--admin-space-xs)', minWidth: 0 }}>
              <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums', minWidth: '14px' }}>{product.rank}.</span>
              <span style={{ fontSize: 'var(--admin-size-caption)', color: 'var(--admin-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</span>
            </div>
            <div className="flex items-baseline" style={{ gap: 'var(--admin-space-xs)', flexShrink: 0 }}>
              <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{product.units}u</span>
              <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{formatRand(product.revenue)}</span>
            </div>
          </li>
        ))}
      </ol>
    </WidgetCard>
  );
}
