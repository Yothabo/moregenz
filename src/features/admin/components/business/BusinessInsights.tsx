import PortfolioStorePerformance from './sections/PortfolioStorePerformance';
import PortfolioProductIntelligence from './sections/PortfolioProductIntelligence';
import StoreCatalogue from './sections/StoreCatalogue';
import StoreCustomers from './sections/StoreCustomers';

type BusinessInsightsProps = {
  activeFilter?: string;
};

export default function BusinessInsights({ activeFilter = 'all' }: BusinessInsightsProps) {
  const isPortfolio = activeFilter !== 'yotaabo' && activeFilter !== 'poshies';

  return (
    <section className="flex w-full flex-col" style={{ gap: 'var(--admin-space-xl)' }}>
      {isPortfolio ? (
        <>
          <PortfolioStorePerformance />
          <PortfolioProductIntelligence />
        </>
      ) : (
        <>
          <StoreCatalogue filter={activeFilter} />
          <StoreCustomers filter={activeFilter} />
        </>
      )}
    </section>
  );
}
