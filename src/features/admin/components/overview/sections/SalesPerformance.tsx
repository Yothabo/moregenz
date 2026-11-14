import type { OverviewSalesPerformance } from '../../../types/overview.types';
import { formatOverviewCurrency } from '../../../utils/overview/currency';
import OverviewMetric from '../shared/OverviewMetric';
import OverviewSection from '../shared/OverviewSection';

type Props = {
  data: OverviewSalesPerformance;
};

export default function SalesPerformance({ data }: Props) {
  const maximum = Math.max(
    ...data.dailySales.map((point) => point.value),
    0,
  );

  return (
    <OverviewSection
      title="Sales performance"
      description="Recorded sales activity from delivered online orders. Delivery does not confirm payment."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <OverviewMetric
          label="Recorded sales value"
          value={formatOverviewCurrency(data.recordedSalesValue)}
          description="Delivered online orders only"
        />
        <OverviewMetric
          label="Delivered orders"
          value={data.deliveredOrders}
          description="Within selected period"
        />
      </div>

      <div
        className="flex flex-col rounded-xl border p-4"
        style={{
          borderColor: 'var(--admin-border-subtle)',
          borderRadius: 'var(--admin-radius-lg, 12px)',
          background: 'var(--admin-surface)',
          gap: 'var(--admin-space-md)',
        }}
      >
        <h3
          className="text-sm font-semibold"
          style={{ color: 'var(--admin-text-primary)' }}
        >
          Daily recorded sales
        </h3>

        {data.dailySales.length === 0 ? (
          <p className="py-6 text-center text-sm overview-text-muted">
            No delivered-order sales recorded in this period.
          </p>
        ) : (
          <div className="flex items-end gap-2 overflow-x-auto pb-2">
            {data.dailySales.map((point) => (
              <div
                key={point.date}
                className="flex min-w-12 flex-1 flex-col items-center gap-2"
                title={`${point.date}: ${formatOverviewCurrency(point.value)}`}
              >
                <span className="text-[10px] overview-text-muted">
                  {formatOverviewCurrency(point.value)}
                </span>
                <div
                  className="flex h-28 w-full items-end overflow-hidden rounded-sm"
                  style={{ background: 'var(--admin-surface-subtle)' }}
                >
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${maximum > 0 ? Math.max(4, (point.value / maximum) * 100) : 0}%`,
                      background: 'var(--admin-color-text-primary, #404040)',
                    }}
                  />
                </div>
                <span className="text-[10px] overview-text-muted">
                  {point.label.slice(5)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </OverviewSection>
  );
}
