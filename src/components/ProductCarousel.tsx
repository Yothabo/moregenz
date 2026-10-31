import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductModal from './ProductModal';
import ProductCardSkeleton from './ProductCardSkeleton';
import { getCategoryTheme } from '../utils/categoryTheme';
import type { ProductCategory } from '../hooks/useProducts';

type CarouselProduct = {
  id: string;
  name: string;
  price: string;
  category: ProductCategory;
  description?: string | null;
  image_url?: string | null;
};

type ProductCarouselProps = {
  title: string;
  description?: string;
  products: CarouselProduct[];
  placeholderColor: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  themeColor: string;
  isDark: boolean;
  isLoading?: boolean;
  error?: string | null;
  viewAllHref: string;
  useProductTheme?: boolean;
};

export default function ProductCarousel({
  title,
  description,
  products,
  placeholderColor,
  bgColor,
  textColor,
  accentColor,
  themeColor,
  isDark,
  isLoading = false,
  error = null,
  viewAllHref,
  useProductTheme = false,
}: ProductCarouselProps) {
  const [selectedProduct, setSelectedProduct] =
    useState<CarouselProduct | null>(null);

  const visibleProducts = products.slice(0, 5);

  const selectedTheme = selectedProduct && useProductTheme
    ? getCategoryTheme(selectedProduct.category)
    : null;
  const selectedPlaceholder = selectedTheme?.placeholderColor ?? placeholderColor;
  const selectedAccent = selectedTheme?.accentColor ?? accentColor;

  return (
    <section
      className="yotaabo-product-carousel relative w-full select-none pt-2 pb-12"
      style={{
        '--swiper-theme-color': themeColor,
        WebkitTapHighlightColor: 'transparent',
      } as CSSProperties}
      aria-label={`${title} product collection`}
    >
      <div className="flex items-baseline justify-between px-6 sm:px-10 lg:px-12">
        <h3 className={`font-heading text-3xl italic ${accentColor}`}>
          {title}
        </h3>

        <Link
          to={viewAllHref}
          className={`shrink-0 cursor-pointer font-heading text-sm italic tracking-wide ${accentColor} opacity-70 transition-opacity hover:opacity-100`}
        >
          View more
        </Link>
      </div>

      {description && (
        <p className="mt-2 px-6 font-heading text-base leading-relaxed text-black/60 sm:px-10 lg:px-12">
          {description}
        </p>
      )}

      {error && !visibleProducts.length && !isLoading ? (
        <p
          role="alert"
          className="px-6 py-10 text-sm text-[#4d4d4d]/60 sm:px-10 lg:px-12"
        >
          Products could not be loaded. Please try again shortly.
        </p>
      ) : !isLoading && visibleProducts.length === 0 ? (
        <p className="px-6 py-10 text-sm text-[#4d4d4d]/60 sm:px-10 lg:px-12">
          No active products in this collection yet.
        </p>
      ) : (
        <Swiper
          modules={[A11y, Keyboard, Navigation, Pagination]}
          className="yotaabo-product-swiper mt-6"
          slidesPerView={2.15}
          slidesPerGroup={1}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 3.15,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4.15,
              spaceBetween: 24,
            },
          }}
          navigation={!isLoading && visibleProducts.length > 2}
          pagination={
            !isLoading && visibleProducts.length > 1
              ? { clickable: true }
              : false
          }
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          grabCursor
          watchOverflow
          loop={false}
          a11y={{
            prevSlideMessage: 'Previous products',
            nextSlideMessage: 'Next products',
          }}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))
            : visibleProducts.map((product) => {
                const productTheme = getCategoryTheme(product.category);
                const cardPlaceholder = useProductTheme
                  ? productTheme.placeholderColor
                  : placeholderColor;
                const cardAccent = useProductTheme
                  ? productTheme.accentColor
                  : accentColor;

                return (
                  <SwiperSlide key={product.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      aria-label={`View ${product.name}`}
                      className="flex w-full cursor-pointer flex-col text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4"
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        userSelect: 'none',
                      }}
                    >
                      <div
                        className={`aspect-[4/5] w-full overflow-hidden ${cardPlaceholder}`}
                      >
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                            }}
                            className="h-full w-full object-contain p-4"
                          />
                        )}
                      </div>

                      <div className="mt-1 flex min-w-0 flex-col pt-3 pl-3">
                        <h4
                          className={`truncate font-heading text-base ${textColor}`}
                          style={{ lineHeight: '1', margin: 0, padding: 0 }}
                        >
                          {product.name}
                        </h4>

                        <p
                          className={`mt-1 font-heading text-base tracking-wide ${cardAccent}`}
                          style={{ lineHeight: '1', margin: 0, padding: 0 }}
                        >
                          {product.price}
                        </p>
                      </div>
                    </button>
                  </SwiperSlide>
                );
              })}

          {!isLoading && visibleProducts.length > 0 && (
            <SwiperSlide key="view-more">
              <Link
                to={viewAllHref}
                aria-label={`View more ${title} products`}
                className="group flex w-full flex-col text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <div
                  className={`flex aspect-[4/5] w-full items-center justify-center ${placeholderColor} transition-opacity group-hover:opacity-80`}
                >
                  <span className={`font-heading text-lg italic ${accentColor}`}>
                    View more <span aria-hidden="true">→</span>
                  </span>
                </div>

                <div className="mt-1 flex min-w-0 flex-col pt-3 pl-3">
                  <h4
                    className={`font-heading text-base ${textColor}`}
                    style={{ lineHeight: '1', margin: 0, padding: 0 }}
                  >
                    Explore collection
                  </h4>
                </div>
              </Link>
            </SwiperSlide>
          )}
        </Swiper>
      )}

      <ProductModal
        product={
          selectedProduct
            ? {
                ...selectedProduct,
                placeholderColor: selectedPlaceholder,
              }
            : null
        }
        bgColor={bgColor}
        placeholderColor={selectedPlaceholder}
        accentColor={selectedAccent}
        isDark={isDark}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
