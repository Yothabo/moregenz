import { useProducts, getFeaturedProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import ProductCarousel from './ProductCarousel';

export default function Hero() {
  const { products, isLoading, error } = useProducts();

  const featuredProducts = getFeaturedProducts(products, 5).map((product) => ({
    ...product,
    price: formatPrice(product.price),
  }));

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex w-full select-none flex-col bg-white pt-16 pb-12"
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        userSelect: 'none',
      }}
    >
      {/* Hero Wordmark */}
      <div className="relative mb-12 flex w-full items-center justify-center px-6">
        <div className="w-full max-w-[1120px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: '100%',
              height: '25vh',
            }}
          >
            <text
              x="50"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              textLength="100"
              lengthAdjust="spacingAndGlyphs"
              style={{
                fontFamily: '"Anton", sans-serif',
                fontWeight: 400,
              }}
              className="fill-[#8aa89b]"
              fontSize="100"
            >
              yotaabo
            </text>
          </svg>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <p className="font-accent text-[clamp(50px,10vw,130px)] tracking-[0.02em] text-black">
            Be Remembered
          </p>
        </div>
      </div>

      {/* Featured products */}
      <div className="w-full">
        <ProductCarousel
          title="Trending"
          description="The scents our community loves most."
          products={featuredProducts}
          placeholderColor="bg-[#f5f5f5]"
          bgColor="bg-white"
          textColor="text-black"
          accentColor="text-[#8aa89b]"
          themeColor="#8aa89b"
          isDark={false}
          isLoading={isLoading}
          error={error}
          viewAllHref="/catalog"
          useProductTheme
        />
      </div>
    </section>
  );
}
