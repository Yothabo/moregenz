import type { OverviewStorePerformance } from '../../../types/overview.types';
import { formatOverviewCurrency } from '../../../utils/overview/currency';
import OverviewMetric from '../shared/OverviewMetric';
import OverviewSection from '../shared/OverviewSection';

type Props = {
  data: OverviewStorePerformance[];
};

export default function StoreComparison({ data }: Props) {
  if (data.length < 2) return null;

  return (
    <OverviewSection
      title="Store comparison"
      description="Same date range and delivered-order definitions for both storefronts."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {data.map((store) => (
          <div
            key={store.storefront}
            className="flex flex-col rounded-xl border p-4"
            style={{
              borderColor: 'var(--admin-border-subtle)',
              borderRadius: 'var(--admin-radius-lg, 12px)',
              background: 'var(--admin-surface)',
              gap: 'var(--admin-space-md)',
            }}
          >
            <h3 className="text-sm font-semibold">
              {store.storefront === 'yotaabo' ? 'Yotaabo' : 'Poshies'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <OverviewMetric label="Orders received" value={store.orders} />
              <OverviewMetric label="Delivered orders" value={store.deliveredOrders} />
              <OverviewMetric
                label="Recorded sales"
                value={formatOverviewCurrency(store.recordedSalesValue)}
              />
              <OverviewMetric label="Units sold" value={store.unitsSold} />
            </div>
          </div>
        ))}
      </div>
    </OverviewSection>
  );
}
