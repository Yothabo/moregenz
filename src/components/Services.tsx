import ProductCarousel from './ProductCarousel';

export default function Services() {
  const categories = [
    {
      id: 'his',
      title: 'His',
      topText: 'REFINED. GROUNDED. REMEMBERED.',
      description:
        'Crafted for presence. Distinctive scents for the modern man, refined in character, grounded in confidence, and made to be remembered.',
      bgColor: 'bg-white',
      textColor: 'text-[#4d4d4d]',
      textFill: 'fill-[#8aa89b]',
      accentColor: 'text-[#4d4d4d]',
      placeholderColor: 'bg-[#8aa89b]',
      overlayColor: '#000000',
      hasImage: true,
      imageSrc: '/images/hisimage.webp',
      isDark: false,
      collectionTitle: 'His Collection',
      products: [
        { name: 'Noir Oud', price: 'R 890' },
        { name: 'Cedar & Smoke', price: 'R 750' },
        { name: 'Midnight Leather', price: 'R 920' },
        { name: 'Vetiver Storm', price: 'R 810' },
        { name: 'Black Amber', price: 'R 850' },
        { name: 'Smoked Rose', price: 'R 880' },
      ],
    },
    {
      id: 'hers',
      title: 'Hers',
      topText: 'ELEGANCE IN EVERY NOTE',
      description:
        'Fragrances crafted to complement elegance and individuality, whether soft and floral or bold and warm.',
      bgColor: 'bg-white',
      textColor: 'text-[#4d4d4d]',
      textFill: 'fill-[#ff1493]',
      accentColor: 'text-[#4d4d4d]',
      placeholderColor: 'bg-[#ff1493]',
      overlayColor: '#f2e9d8',
      hasImage: true,
      imageSrc: '/images/herimage.webp',
      isDark: false,
      collectionTitle: 'Her Collection',
      products: [
        { name: 'Rose Éternelle', price: 'R 950' },
        { name: 'Velvet Peony', price: 'R 880' },
        { name: 'White Jasmine', price: 'R 910' },
        { name: 'Amber Blush', price: 'R 840' },
        { name: 'Silk & Vanilla', price: 'R 890' },
        { name: 'Fleur de Nuit', price: 'R 970' },
      ],
    },
    {
      id: 'spaces',
      title: 'Spaces',
      topText: 'SCENTS FOR EVERY ROOM',
      description:
        'Extend your signature into every space. Ambient scents for the home and car, quietly shaping the atmosphere wherever you go.',
      bgColor: 'bg-white',
      textColor: 'text-[#4d4d4d]',
      textFill: 'fill-[#c8ad8d]',
      accentColor: 'text-[#4d4d4d]',
      placeholderColor: 'bg-[#c8ad8d]',
      overlayColor: '#e8dec9',
      hasImage: false,
      isDark: false,
      collectionTitle: 'Collections',
      products: [
        { name: 'Amber Room', price: 'R 450' },
        { name: 'Linen & Cedar', price: 'R 420' },
        { name: 'Cashmere Wood', price: 'R 480' },
        { name: 'Smoked Fig', price: 'R 460' },
        { name: 'Velvet Rose', price: 'R 440' },
        { name: 'Sandalwood Haze', price: 'R 490' },
      ],
    },
    {
      id: 'about',
      title: 'about',
      topText: 'THE STORY BEHIND THE SCENT',
      description:
        'Born from a simple, enduring belief: fragrance is not merely something you wear, but a reflection of who you are. We curate distinctive scents that speak quietly yet linger long, carefully designed to become an unforgettable part of how you are remembered.',
      bgColor: 'bg-white',
      textColor: 'text-[#4d4d4d]',
      textFill: 'fill-[#8aa89b]',
      accentColor: 'text-[#4d4d4d]',
      hasImage: false,
    },
  ];

  return (
    <section id="services" className="w-full bg-white">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col w-full">
          <div
            className={`relative grid min-h-[100svh] w-full grid-rows-[auto_1fr_auto] overflow-hidden ${category.bgColor} ${category.textColor} px-6 py-12 sm:px-12 lg:px-20 lg:py-16`}
          >
            {/* Top Center Text */}
            {category.topText && (
              <div className="relative z-20 flex h-8 w-full items-center justify-center text-center sm:h-auto">
                <h2 className="whitespace-nowrap font-heading text-sm font-medium uppercase tracking-[0.2em] sm:text-2xl">
                  {category.topText}
                </h2>
              </div>
            )}

            {/* Main Content Area */}
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Giant Background Word (Stretched) */}
              <div
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
                style={{ height: '45vh', margin: 'auto' }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                >
                  <text
                    x="50"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    textLength="100"
                    lengthAdjust="spacingAndGlyphs"
                    style={{ fontFamily: '"Anton", sans-serif', fontWeight: 400 }}
                    className={category.textFill}
                    fontSize="100"
                  >
                    {category.title}
                  </text>
                </svg>
              </div>

              {/* Decorative Script Text */}
              <div className="pointer-events-none absolute inset-0 z-20">
                {category.id === 'about' ? (
                  /* About: Bottom-Right, not rotated */
                  <div className="absolute bottom-20 right-6 sm:bottom-32 sm:right-12">
                    <span className={`whitespace-nowrap font-accent text-[clamp(80px,12vw,160px)] font-normal leading-[0.7] tracking-normal ${category.accentColor}`}>
                      yotaabo
                    </span>
                  </div>
                ) : (
                  /* Other sections: Rotated on the left */
                  <>
                    <div className="flex flex-col items-center justify-center w-full h-full lg:hidden">
                      <span className={`absolute left-6 top-1/2 origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap font-accent text-[clamp(80px,12vw,120px)] font-normal leading-[0.7] tracking-normal ${category.accentColor}`}>
                        For
                      </span>
                    </div>
                    <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 items-center justify-center">
                      <span className={`origin-left -rotate-90 whitespace-nowrap font-accent text-[clamp(100px,16vw,200px)] font-normal leading-[0.7] tracking-normal ${category.accentColor}`}>
                        For
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Image Overlay */}
              {category.hasImage && (
                <img
                  src={category.imageSrc || "/images/hisimage.webp"}
                  alt={`${category.title} fragrance`}
                  className="pointer-events-none absolute bottom-[15%] right-0 z-40 h-[35vh] w-auto object-contain object-right-bottom drop-shadow-2xl sm:bottom-[20%]"
                />
              )}
            </div>

            {/* Bottom Area — Paragraph */}
            <div className="relative z-20 flex w-full pt-4">
              <div className="max-w-[420px]">
                <p className="font-heading text-lg leading-[1.6]">
                  {category.description}
                </p>
              </div>
            </div>
          </div>

          {/* Product Carousel */}
          {category.products && (
            <div className={`w-full ${category.bgColor}`}>
              <ProductCarousel
                title={category.collectionTitle}
                products={category.products}
                placeholderColor={category.placeholderColor}
                bgColor={category.bgColor}
                overlayColor={category.overlayColor}
                textColor={category.textColor}
                accentColor={category.accentColor}
                isDark={category.isDark}
                category={category.id === 'his' ? 'His' : category.id === 'hers' ? 'Hers' : 'Spaces'}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
