import type { OverviewProductPerformanceItem } from '../../../types/overview.types';
import { formatOverviewCurrency } from '../../../utils/overview/currency';
import OverviewSection from '../shared/OverviewSection';

type Props = {
  data: OverviewProductPerformanceItem[];
};

export default function ProductPerformance({ data }: Props) {
  return (
    <OverviewSection
      title="Product performance"
      description="Products from delivered online orders, grouped by product ID."
    >
      <div
        className="overflow-hidden rounded-xl border"
        style={{
          borderColor: 'var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-lg, 12px)',
          background: 'var(--admin-surface)',
        }}
      >
        {data.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm overview-text-muted">
            No delivered-order product activity in this period.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-solid overview-border px-4 py-3 text-xs font-semibold overview-text-muted">
              <span>Product</span>
              <span className="text-right">Units</span>
              <span className="text-right">Value</span>
            </div>

            {data.slice(0, 10).map((product) => (
              <div
                key={product.productId}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-solid overview-border px-4 py-3 last:border-0"
              >
                <span className="min-w-0 truncate text-sm font-medium">
                  {product.productName}
                </span>
                <span className="text-right text-sm tabular-nums">
                  {product.unitsSold}
                </span>
                <span className="text-right text-sm tabular-nums">
                  {formatOverviewCurrency(product.recordedValue)}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </OverviewSection>
  );
}
