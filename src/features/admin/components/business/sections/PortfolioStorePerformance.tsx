import Section from '../shared/Section';
import StoreComparisonWidget from '../widgets/StoreComparisonWidget';
import RevenueByCategoryWidget from '../widgets/RevenueByCategoryWidget';
import { PLACEHOLDER_PORTFOLIO } from '../placeholderInsights';

export default function PortfolioStorePerformance() {
  const data = PLACEHOLDER_PORTFOLIO;
  return (
    <Section
      title="Store performance"
      description="Which store is winning and where the revenue comes from."
    >
      <StoreComparisonWidget stores={data.storeComparison} />
      <RevenueByCategoryWidget mode="portfolio" stores={data.categoryRevenueByStore} />
    </Section>
  );
}
