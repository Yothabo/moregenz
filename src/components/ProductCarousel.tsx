import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductModal from './ProductModal';

type Product = {
  name: string;
  price: string;
  description?: string;
  image_url?: string | null;
};

type ProductCarouselProps = {
  title: string;
  products: Product[];
  placeholderColor: string;
  bgColor: string;
  overlayColor: string;
  textColor: string;
  accentColor: string;
  isDark: boolean;
  category: string;
};

export default function ProductCarousel({
  title,
  products,
  placeholderColor,
  bgColor,
  overlayColor,
  textColor,
  accentColor,
  isDark,
  category
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }
    const ratio = scrollLeft / maxScroll;
    const index = Math.round(ratio * (products.length - 1));
    setActiveIndex(index);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [products.length]);

  const isAtEnd = activeIndex >= products.length - 1;

  return (
    <div
      className="relative w-full select-none pt-2 pb-12"
      style={{ WebkitTapHighlightColor: 'transparent', WebkitTouchCallout: 'none', userSelect: 'none' }}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between px-6">
        <h3 className={`font-heading text-3xl italic ${accentColor}`}>{title}</h3>
        {!isAtEnd && (
          <Link to={`/catalog?category=${category}`} className={`cursor-pointer font-heading text-sm italic tracking-wide ${accentColor} opacity-70 transition-opacity hover:opacity-100`}>
            View All
          </Link>
        )}
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="mt-8 flex gap-4 snap-x snap-mandatory overflow-x-auto px-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ WebkitTapHighlightColor: 'transparent', WebkitTouchCallout: 'none', userSelect: 'none' }}
      >
        {products.map((product) => (
          <div
            key={product.name}
            onClick={() => setSelectedProduct(product)}
            className="flex w-[45%] shrink-0 snap-start flex-col cursor-pointer outline-none focus:outline-none"
            style={{ WebkitTapHighlightColor: 'transparent', WebkitTouchCallout: 'none', userSelect: 'none' }}
          >
            <div className={`aspect-[4/5] w-full overflow-hidden ${placeholderColor}`}>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-contain p-4"
                />
              )}
            </div>

            <div className="mt-1 flex flex-col pt-3 pl-3">
              <h4
                className={`font-heading text-base ${textColor}`}
                style={{ lineHeight: '1', margin: 0, padding: 0 }}
              >
                {product.name}
              </h4>
              <p
                className={`mt-1 font-heading text-base tracking-wide ${accentColor}`}
                style={{ lineHeight: '1', margin: 0, padding: 0 }}
              >
                {product.price}
              </p>
            </div>
          </div>
        ))}

        {/* Final View More Card */}
        <Link to={`/catalog?category=${category}`} className="flex w-[45%] shrink-0 snap-start flex-col items-center justify-center pb-12">
          <span className={`font-heading text-2xl italic ${accentColor}`}>View More</span>
        </Link>
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {products.map((_, i) => (
          <span
            key={i}
            className={`h-1 w-1 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? `${accentColor.replace('text-', 'bg-')} w-4`
                : isDark ? 'bg-white/30' : 'bg-black/20'
            }`}
          />
        ))}
      </div>

      {/* Shared Modal */}
      <ProductModal
        product={selectedProduct ? {
          ...selectedProduct,
          placeholderColor: placeholderColor
        } : null}
        bgColor={bgColor}
        placeholderColor={placeholderColor}
        accentColor={accentColor}
        isDark={isDark}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
