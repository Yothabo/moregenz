import Section from '../shared/Section';
import TopCustomersWidget from '../widgets/TopCustomersWidget';
import StoreMetricsWidget from '../widgets/StoreMetricsWidget';
import { PLACEHOLDER_YOTAABO, PLACEHOLDER_POSHIES } from '../placeholderInsights';

type StoreCustomersProps = {
  filter: string;
};

export default function StoreCustomers({ filter }: StoreCustomersProps) {
  const data = filter === 'yotaabo' ? PLACEHOLDER_YOTAABO : PLACEHOLDER_POSHIES;
  return (
    <Section
      title="Customers"
      description="Who buys, who returns, and how the store is growing."
    >
      <TopCustomersWidget customers={data.topCustomers} />
      <StoreMetricsWidget
        averageOrderValue={data.customerInsights.averageOrderValue}
        repeatRate={data.customerInsights.repeatRate}
        totalCustomers={data.customerInsights.totalCustomers}
        revenueGrowthPercent={data.momentum.revenueGrowthPercent}
      />
    </Section>
  );
}
