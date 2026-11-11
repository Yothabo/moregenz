import Section from '../shared/Section';
import TopProductsWidget from '../widgets/TopProductsWidget';
import RevenueByCategoryWidget from '../widgets/RevenueByCategoryWidget';
import { PLACEHOLDER_YOTAABO, PLACEHOLDER_POSHIES } from '../placeholderInsights';

type StoreCatalogueProps = {
  filter: string;
};

export default function StoreCatalogue({ filter }: StoreCatalogueProps) {
  const data = filter === 'yotaabo' ? PLACEHOLDER_YOTAABO : PLACEHOLDER_POSHIES;
  return (
    <Section
      title="Catalogue"
      description="Best sellers and where the revenue comes from."
    >
      <TopProductsWidget products={data.topProducts} description="Best sellers in this store." />
      <RevenueByCategoryWidget mode="store" categories={data.categoryRevenue} />
    </Section>
  );
}
