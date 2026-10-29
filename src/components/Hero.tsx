import { Link } from 'react-router-dom';
import { useProducts, Product } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import { getCategoryTheme } from '../utils/categoryTheme';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useState } from 'react';
import ProductModal from './ProductModal';

export default function Hero() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, isLoading } = useProducts();

  // Trending = top 5 by add_to_cart_count, fallback to newest 5
  const trendingProducts = [...products]
    .sort((a, b) => {
      if (b.order_count !== a.order_count) {
        return b.order_count - a.order_count;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 5);

  return (
    <>
      <section
        id="home"
        aria-label="Hero"
        className="relative flex w-full select-none flex-col bg-white pt-16 pb-12"
        style={{ WebkitTapHighlightColor: 'transparent', WebkitTouchCallout: 'none', userSelect: 'none' }}
      >
        {/* Hero Wordmark & Overlay */}
        <div className="relative flex w-full items-center justify-center px-6 mb-12">
          <div className="w-full max-w-[1120px]">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ display: 'block', width: '100%', height: '25vh' }}
            >
              <text
                x="50"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                textLength="100"
                lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: '"Anton", sans-serif', fontWeight: 400 }}
                className="fill-[#8aa89b]"
                fontSize="100"
              >
                yotaabo
              </text>
            </svg>
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <p className="font-accent text-[clamp(50px,10vw,130px)] tracking-[0.02em] text-black">
              Be Remembered
            </p>
          </div>
        </div>

        {/* Trending Section */}
        <div className="w-full">
          {/* Left-aligned Header within the standard content container */}
          <div className="mx-auto max-w-[1120px] px-6 sm:px-10 lg:px-12">
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-3xl italic text-black">Trending</h2>
              <Link to="/catalog" className="cursor-pointer font-heading text-sm italic tracking-wide text-black opacity-70 transition-opacity hover:opacity-100">
                Explore Collection
              </Link>
            </div>
            <p className="mt-2 max-w-md font-heading text-base leading-relaxed text-black/60">
              The scents our community loves most.
            </p>
          </div>

          {/* Carousel - full width to the edges */}
          <div className="mt-8 flex gap-4 snap-x snap-mandatory overflow-x-auto pb-4 px-6 sm:px-10 lg:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex w-[45%] shrink-0 snap-start flex-col sm:w-[30%] lg:w-[22%]"
                >
                  <ProductCardSkeleton />
                </div>
              ))
            ) : trendingProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="flex w-[45%] shrink-0 snap-start flex-col cursor-pointer sm:w-[30%] lg:w-[22%]"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className={`aspect-[4/5] w-full ${getCategoryTheme(product.category).placeholderColor}`}></div>
                <div className="mt-1 flex flex-col pt-3 pl-3">
                  <h4
                    className="font-heading text-base text-black"
                    style={{ lineHeight: '1', margin: 0, padding: 0 }}
                  >
                    {product.name}
                  </h4>
                  <p
                    className={`mt-1 font-heading text-base tracking-wide ${getCategoryTheme(product.category).accentColor}`}
                    style={{ lineHeight: '1', margin: 0, padding: 0 }}
                  >
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </section>

      {/* Modal for Trending Products */}
      <ProductModal
        product={selectedProduct ? { ...selectedProduct, price: formatPrice(selectedProduct.price) } : null}
        bgColor="bg-white"
        placeholderColor={selectedProduct ? getCategoryTheme(selectedProduct.category).placeholderColor : 'bg-gray-200'}
        accentColor={selectedProduct ? getCategoryTheme(selectedProduct.category).accentColor : 'text-[#8aa89b]'}
        isDark={false}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
