import type { OverviewBusinessSummary } from '../../../types/overview.types';
import OverviewMetric from '../shared/OverviewMetric';
import OverviewSection from '../shared/OverviewSection';

type Props = {
  data: OverviewBusinessSummary;
};

export default function BusinessSummary({ data }: Props) {
  return (
    <OverviewSection
      title="Business summary"
      description="Current catalogue and order workload."
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <OverviewMetric
          label="Orders received"
          value={data.ordersReceived}
          description="Non-cancelled orders in period"
        />
        <OverviewMetric
          label="Outstanding orders"
          value={data.outstandingOrders}
          description="Pending and confirmed"
        />
        <OverviewMetric
          label="Total products"
          value={data.totalProducts}
          description="Current catalogue"
        />
        <OverviewMetric
          label="Active products"
          value={data.activeProducts}
          description={`${data.hiddenProducts} hidden`}
        />
      </div>
    </OverviewSection>
  );
}
