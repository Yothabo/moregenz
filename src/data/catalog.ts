export type CatalogProduct = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: 'His' | 'Hers' | 'Spaces';
  subcategory: string;
  placeholderColor: string;
  textColor: string;
  accentColor: string;
  isDark: boolean;
};

export const CATALOG: CatalogProduct[] = [
  // ===== HIM - Eau de Parfum =====
  { id: 'him-edp-1', name: 'Noir Oud', price: 'R 890', description: 'A deep, resinous oud layered with black amber and smoky cedar.', category: 'His', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-edp-2', name: 'Cedar & Smoke', price: 'R 750', description: 'Dry cedarwood wrapped in birch smoke and a whisper of vetiver.', category: 'His', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-edp-3', name: 'Midnight Leather', price: 'R 920', description: 'Rich suede and leather, spiced with saffron and warmed by tonka bean.', category: 'His', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-edp-4', name: 'Black Amber', price: 'R 850', description: 'A warm, enveloping blend of amber, vanilla, and dark woods.', category: 'His', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-edp-5', name: 'Vetiver Storm', price: 'R 810', description: 'Earthy vetiver brightened with a burst of citrus and black pepper.', category: 'His', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },

  // ===== HIM - Roll-On =====
  { id: 'him-roll-1', name: 'Vetiver Storm Roll-On', price: 'R 320', description: 'A pocket-sized roll-on with earthy vetiver and a burst of citrus.', category: 'His', subcategory: 'Roll-On', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-roll-2', name: 'Smoked Rose Roll-On', price: 'R 340', description: 'Rose tempered with dark smoke — ideal for travel and touch-ups.', category: 'His', subcategory: 'Roll-On', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-roll-3', name: 'Noir Oud Roll-On', price: 'R 360', description: 'Concentrated oud in a convenient roll-on format.', category: 'His', subcategory: 'Roll-On', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-roll-4', name: 'Cedar & Smoke Roll-On', price: 'R 330', description: 'Smoky cedar in a portable, travel-friendly size.', category: 'His', subcategory: 'Roll-On', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-roll-5', name: 'Midnight Leather Roll-On', price: 'R 380', description: 'Suede and saffron in a convenient roll-on.', category: 'His', subcategory: 'Roll-On', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },

  // ===== HIM - Deodorant =====
  { id: 'him-deo-1', name: 'Black Amber Deodorant', price: 'R 280', description: 'Long-lasting natural deodorant with black amber and spice.', category: 'His', subcategory: 'Deodorant', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-deo-2', name: 'Cedar & Smoke Deodorant', price: 'R 280', description: 'A woody deodorant for all-day freshness.', category: 'His', subcategory: 'Deodorant', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-deo-3', name: 'Vetiver Storm Deodorant', price: 'R 290', description: 'Citrus and vetiver in a natural deodorant stick.', category: 'His', subcategory: 'Deodorant', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-deo-4', name: 'Midnight Leather Deodorant', price: 'R 290', description: 'Leather and saffron for a confident, grounded feel.', category: 'His', subcategory: 'Deodorant', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },
  { id: 'him-deo-5', name: 'Noir Oud Deodorant', price: 'R 310', description: 'Rich oud in a long-wearing deodorant format.', category: 'His', subcategory: 'Deodorant', placeholderColor: 'bg-[#8aa89b]', textColor: 'text-black', accentColor: 'text-[#8aa89b]', isDark: false },

  // ===== HER - Eau de Parfum =====
  { id: 'her-edp-1', name: 'Rose Éternelle', price: 'R 950', description: 'Bulgarian rose, soft and layered with white musk and pink pepper.', category: 'Hers', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-edp-2', name: 'Velvet Peony', price: 'R 880', description: 'Plush peony petals with a hint of raspberry and warm sandalwood.', category: 'Hers', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-edp-3', name: 'White Jasmine', price: 'R 910', description: 'Night-blooming jasmine with a clean, airy finish.', category: 'Hers', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-edp-4', name: 'Silk & Vanilla', price: 'R 890', description: 'A creamy blend of vanilla, silk musk, and soft amber.', category: 'Hers', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-edp-5', name: 'Fleur de Nuit', price: 'R 970', description: 'A floral evening fragrance — soft, romantic, memorable.', category: 'Hers', subcategory: 'Eau de Parfum', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },

  // ===== HER - Roll-On =====
  { id: 'her-roll-1', name: 'Silk & Vanilla Roll-On', price: 'R 350', description: 'A creamy roll-on pairing vanilla with a whisper of silk musk.', category: 'Hers', subcategory: 'Roll-On', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-roll-2', name: 'Fleur de Nuit Roll-On', price: 'R 370', description: 'A floral roll-on for evenings — soft, romantic, memorable.', category: 'Hers', subcategory: 'Roll-On', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-roll-3', name: 'Rose Éternelle Roll-On', price: 'R 360', description: 'Bulgarian rose in a travel-friendly roll-on.', category: 'Hers', subcategory: 'Roll-On', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-roll-4', name: 'Velvet Peony Roll-On', price: 'R 340', description: 'Peony and sandalwood in a portable format.', category: 'Hers', subcategory: 'Roll-On', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-roll-5', name: 'White Jasmine Roll-On', price: 'R 350', description: 'Airy jasmine in a convenient roll-on.', category: 'Hers', subcategory: 'Roll-On', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },

  // ===== HER - Deodorant =====
  { id: 'her-deo-1', name: 'Amber Blush Deodorant', price: 'R 290', description: 'A gentle deodorant with blush amber and a floral finish.', category: 'Hers', subcategory: 'Deodorant', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-deo-2', name: 'Rose Éternelle Deodorant', price: 'R 280', description: 'Rose-infused natural deodorant stick.', category: 'Hers', subcategory: 'Deodorant', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-deo-3', name: 'Velvet Peony Deodorant', price: 'R 280', description: 'A peony-scented deodorant for everyday wear.', category: 'Hers', subcategory: 'Deodorant', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-deo-4', name: 'White Jasmine Deodorant', price: 'R 290', description: 'Light, floral, and long-lasting.', category: 'Hers', subcategory: 'Deodorant', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },
  { id: 'her-deo-5', name: 'Silk & Vanilla Deodorant', price: 'R 300', description: 'Creamy vanilla in a soft, gentle formula.', category: 'Hers', subcategory: 'Deodorant', placeholderColor: 'bg-[#ff1493]', textColor: 'text-black', accentColor: 'text-[#ff1493]', isDark: false },

  // ===== SPACES - Home =====
  { id: 'sp-home-1', name: 'Amber Room Diffuser', price: 'R 450', description: 'A reed diffuser that keeps the room warm and inviting.', category: 'Spaces', subcategory: 'Home', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-home-2', name: 'Linen & Cedar Candle', price: 'R 420', description: 'A slow-burning candle that fills the home with a woody freshness.', category: 'Spaces', subcategory: 'Home', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-home-3', name: 'Cashmere Wood Spray', price: 'R 480', description: 'A room spray with soft cashmere and cedar.', category: 'Spaces', subcategory: 'Home', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-home-4', name: 'Smoked Fig Diffuser', price: 'R 460', description: 'A smoky, sweet fig diffuser for the home.', category: 'Spaces', subcategory: 'Home', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-home-5', name: 'Velvet Rose Candle', price: 'R 440', description: 'A romantic rose candle in a textured glass vessel.', category: 'Spaces', subcategory: 'Home', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },

  // ===== SPACES - Car =====
  { id: 'sp-car-1', name: 'Smoked Fig Car Clip', price: 'R 190', description: 'A sleek car vent clip with a smoky, leathery scent.', category: 'Spaces', subcategory: 'Car', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-car-2', name: 'Velvet Rose Car Air', price: 'R 210', description: 'A hanging air freshener with a rose-vanilla blend.', category: 'Spaces', subcategory: 'Car', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-car-3', name: 'Amber Room Car Clip', price: 'R 195', description: 'A warm amber scent for your car vent.', category: 'Spaces', subcategory: 'Car', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-car-4', name: 'Linen & Cedar Car Air', price: 'R 205', description: 'Crisp linen and cedar to keep your car smelling fresh.', category: 'Spaces', subcategory: 'Car', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-car-5', name: 'Cashmere Wood Car Clip', price: 'R 215', description: 'A soft cashmere and wood blend for a premium car interior.', category: 'Spaces', subcategory: 'Car', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },

  // ===== SPACES - Freshness =====
  { id: 'sp-fresh-1', name: 'Sandalwood Sheet Mist', price: 'R 380', description: 'A soft mist for linens — warm sandalwood and white tea.', category: 'Spaces', subcategory: 'Freshness', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-fresh-2', name: 'Linen Fresh Spray', price: 'R 360', description: 'A crisp, clean linen spray for everyday freshness.', category: 'Spaces', subcategory: 'Freshness', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-fresh-3', name: 'Amber Blush Fabric Mist', price: 'R 390', description: 'A warm amber mist for upholstery and fabrics.', category: 'Spaces', subcategory: 'Freshness', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-fresh-4', name: 'White Jasmine Sheet Spray', price: 'R 370', description: 'A soft floral freshness for your bedding.', category: 'Spaces', subcategory: 'Freshness', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
  { id: 'sp-fresh-5', name: 'Cedar & Smoke Fabric Mist', price: 'R 400', description: 'A deep, woody mist for couches and curtains.', category: 'Spaces', subcategory: 'Freshness', placeholderColor: 'bg-[#c8ad8d]', textColor: 'text-black', accentColor: 'text-[#c8ad8d]', isDark: false },
];
