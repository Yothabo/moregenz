import Section from '../shared/Section';
import TopProductsWidget from '../widgets/TopProductsWidget';
import PortfolioHealthWidget from '../widgets/PortfolioHealthWidget';
import { PLACEHOLDER_PORTFOLIO } from '../placeholderInsights';

export default function PortfolioProductIntelligence() {
  const data = PLACEHOLDER_PORTFOLIO;
  return (
    <Section
      title="Product intelligence"
      description="Best sellers and who keeps coming back."
      singleColumn
    >
      <TopProductsWidget
        products={data.topProducts}
        description="Best sellers across both stores."
      />
      <PortfolioHealthWidget
        revenueGrowthPercent={data.portfolioGrowth.revenueGrowthPercent}
        totalRevenue={data.portfolioGrowth.totalRevenue}
        totalOrders={data.portfolioGrowth.totalOrders}
        newCustomers={data.momentum.newCustomersThisMonth}
        returningCustomers={data.momentum.returningCustomersThisMonth}
      />
    </Section>
  );
}
