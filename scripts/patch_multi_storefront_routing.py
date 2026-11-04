from pathlib import Path
import sys

ROOT = Path.cwd()

changes = {}

def load(path):
    if path not in changes:
        file = ROOT / path
        if not file.is_file():
            raise RuntimeError(f"Missing file: {path}")
        changes[path] = file.read_text(encoding="utf-8")
    return changes[path]

def patch(path, old, new):
    content = load(path)
    count = content.count(old)
    if count != 1:
        raise RuntimeError(
            f"{path}: expected one match, found {count}. "
            "Nothing has been written."
        )
    changes[path] = content.replace(old, new, 1)

def patch_all(path, old, new, expected):
    content = load(path)
    count = content.count(old)
    if count != expected:
        raise RuntimeError(
            f"{path}: expected {expected} matches, found {count}. "
            "Nothing has been written."
        )
    changes[path] = content.replace(old, new)

def commit():
    for path, content in changes.items():
        file = ROOT / path
        backup = file.with_suffix(file.suffix + ".bak")

        if file.exists() and not backup.exists():
            backup.write_text(file.read_text(encoding="utf-8"), encoding="utf-8")

    for path, content in changes.items():
        (ROOT / path).write_text(content, encoding="utf-8")

    print(f"Updated {len(changes)} files.")
    print("Backups use the .bak extension.")

def main():
    # Storefront configuration and path resolver.
    hook = """import { useLocation } from 'react-router-dom';

export type StorefrontCategory = 'His' | 'Hers' | 'Spaces';

const STOREFRONTS = {
  yotaabo: {
    name: 'Yotaabo',
    basePath: '/yotaabo',
    categoryOrder: ['His', 'Hers', 'Spaces'] as StorefrontCategory[],
  },
  porschs: {
    name: 'Porschs',
    basePath: '/porschs',
    categoryOrder: ['Hers', 'His', 'Spaces'] as StorefrontCategory[],
  },
} as const;

export default function useStorefront() {
  const { pathname } = useLocation();

  const store = pathname === '/porschs' || pathname.startsWith('/porschs/')
    ? STOREFRONTS.porschs
    : STOREFRONTS.yotaabo;

  const pathFor = (path = '') => {
    const cleanPath = path.replace(/^\\/+/, '');
    return cleanPath
      ? `${store.basePath}/${cleanPath}`
      : store.basePath;
  };

  return { ...store, pathFor };
}
"""
    changes["src/hooks/useStorefront.ts"] = hook

    # Application routes.
    patch(
        "src/App.tsx",
        "import { BrowserRouter, Route, Routes } from 'react-router-dom';",
        "import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';",
    )

    old_routes = """        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/catalog" element={<ViewCatalog />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/test" element={<DesignSystemTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>"""

    new_routes = """        <Routes>
          {/* Temporary redirect until the store-selection landing page is built. */}
          <Route path="/" element={<Navigate to="/yotaabo" replace />} />

          {/* Yotaabo storefront */}
          <Route path="/yotaabo" element={<Home />} />
          <Route path="/yotaabo/about" element={<About />} />
          <Route path="/yotaabo/services" element={<ServicesPage />} />
          <Route path="/yotaabo/catalog" element={<ViewCatalog />} />
          <Route path="/yotaabo/cart" element={<CartPage />} />
          <Route path="/yotaabo/*" element={<NotFound />} />

          {/* Porschs storefront */}
          <Route path="/porschs" element={<Home />} />
          <Route path="/porschs/about" element={<About />} />
          <Route path="/porschs/services" element={<ServicesPage />} />
          <Route path="/porschs/catalog" element={<ViewCatalog />} />
          <Route path="/porschs/cart" element={<CartPage />} />
          <Route path="/porschs/*" element={<NotFound />} />

          {/* Shared operational routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/test" element={<DesignSystemTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>"""

    patch("src/App.tsx", old_routes, new_routes)

    # Header navigation.
    patch(
        "src/components/Header.tsx",
        "import { useCart } from '../context/CartContext';",
        "import { useCart } from '../context/CartContext';\nimport useStorefront from '../hooks/useStorefront';",
    )

    patch(
        "src/components/Header.tsx",
        """const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Fragrances', to: '/services' },
  { label: 'Our story', to: '/about' },
];

""",
        "",
    )

    patch(
        "src/components/Header.tsx",
        """  const navigate = useNavigate();

  const closeMenu""",
        """  const navigate = useNavigate();
  const { pathFor } = useStorefront();

  const navLinks = [
    { label: 'Home', to: pathFor() },
    { label: 'Fragrances', to: pathFor('services') },
    { label: 'Our story', to: pathFor('about') },
  ];

  const closeMenu""",
    )

    patch_all(
        "src/components/Header.tsx",
        'to="/services"',
        "to={pathFor('services')}",
        2,
    )
    patch(
        "src/components/Header.tsx",
        'to="/cart"',
        "to={pathFor('cart')}",
    )

    # Hero storefront wordmark and catalogue link.
    patch(
        "src/components/Hero.tsx",
        "import ProductCarousel from './ProductCarousel';",
        "import ProductCarousel from './ProductCarousel';\nimport useStorefront from '../hooks/useStorefront';",
    )
    patch(
        "src/components/Hero.tsx",
        "  const { products, isLoading, error } = useProducts();",
        "  const { products, isLoading, error } = useProducts();\n  const { name: storeName, pathFor } = useStorefront();",
    )
    patch(
        "src/components/Hero.tsx",
        "              yotaabo\n            </text>",
        "              {storeName.toLowerCase()}\n            </text>",
    )
    patch(
        "src/components/Hero.tsx",
        'viewAllHref="/catalog"',
        "viewAllHref={pathFor('catalog')}",
    )

    # Store-specific category order and links.
    patch(
        "src/components/Services.tsx",
        "import ProductCarousel from './ProductCarousel';",
        "import ProductCarousel from './ProductCarousel';\nimport useStorefront from '../hooks/useStorefront';",
    )
    patch(
        "src/components/Services.tsx",
        "  const { products, isLoading, error } = useProducts();",
        "  const { products, isLoading, error } = useProducts();\n  const { categoryOrder, name: storeName, pathFor } = useStorefront();",
    )
    patch(
        "src/components/Services.tsx",
        """  return (
    <section id="services" className="w-full bg-white">
      {categories.map((category) => (""",
        """  const orderedCategories = [
    ...categories
      .filter((category) => category.productCategory)
      .sort(
        (a, b) =>
          categoryOrder.indexOf(a.productCategory!) -
          categoryOrder.indexOf(b.productCategory!)
      ),
    ...categories.filter((category) => !category.productCategory),
  ];

  return (
    <section id="services" className="w-full bg-white">
      {orderedCategories.map((category) => (""",
    )
    patch(
        "src/components/Services.tsx",
        "                      yotaabo\n                    </span>",
        "                      {storeName.toLowerCase()}\n                    </span>",
    )
    patch(
        "src/components/Services.tsx",
        "viewAllHref={`/catalog?category=${category.productCategory}`}",
        "viewAllHref={pathFor(`catalog?category=${category.productCategory}`)}",
    )

    # Catalogue ordering and copy.
    patch(
        "src/pages/ViewCatalog.tsx",
        "import { FiPlus, FiMinus } from 'react-icons/fi';",
        "import { FiPlus, FiMinus } from 'react-icons/fi';\nimport useStorefront from '../hooks/useStorefront';",
    )
    patch(
        "src/pages/ViewCatalog.tsx",
        "  const categories: Array<'His' | 'Hers' | 'Spaces'> = ['His', 'Hers', 'Spaces'];",
        "  const { categoryOrder, name: storeName } = useStorefront();\n  const categories = categoryOrder;",
    )
    patch(
        "src/pages/ViewCatalog.tsx",
        "The latest additions to the Yotaabo collection.",
        "The latest additions to the {storeName} collection.",
    )

    # About page identity and internal navigation.
    patch(
        "src/pages/About.tsx",
        "import Footer from '../components/Footer';",
        "import Footer from '../components/Footer';\nimport useStorefront from '../hooks/useStorefront';",
    )
    patch(
        "src/pages/About.tsx",
        "export default function About() {\n  return (",
        "export default function About() {\n  const { name: storeName, pathFor } = useStorefront();\n\n  return (",
    )
    patch(
        "src/pages/About.tsx",
        "About Yotaabo",
        "About {storeName}",
    )
    patch(
        "src/pages/About.tsx",
        "Yotaabo is about discovering fragrances that feel like you.",
        "{storeName} is about discovering fragrances that feel like you.",
    )
    patch(
        "src/pages/About.tsx",
        'to="/services"',
        "to={pathFor('services')}",
    )

    # Cart navigation stays inside the active storefront.
    patch(
        "src/pages/CartPage.tsx",
        "import CheckoutModal from '../components/CheckoutModal';",
        "import CheckoutModal from '../components/CheckoutModal';\nimport useStorefront from '../hooks/useStorefront';",
    )
    patch(
        "src/pages/CartPage.tsx",
        "export default function CartPage() {\n  const { cartItems",
        "export default function CartPage() {\n  const { pathFor } = useStorefront();\n  const { cartItems",
    )
    patch_all(
        "src/pages/CartPage.tsx",
        'to="/catalog"',
        "to={pathFor('catalog')}",
        2,
    )

    # Footer identity.
    patch(
        "src/components/Footer.tsx",
        "import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from 'react-icons/fa';",
        "import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from 'react-icons/fa';\nimport useStorefront from '../hooks/useStorefront';",
    )
    patch(
        "src/components/Footer.tsx",
        "export default function Footer() {\n  return (",
        "export default function Footer() {\n  const { name: storeName } = useStorefront();\n\n  return (",
    )
    patch(
        "src/components/Footer.tsx",
        "© {new Date().getFullYear()} yotaabo",
        "© {new Date().getFullYear()} {storeName.toLowerCase()}",
    )

    # Page metadata.
    patch(
        "src/components/MetaTags.tsx",
        "interface MetaTagsProps {",
        "import useStorefront from '../hooks/useStorefront';\n\ninterface MetaTagsProps {",
    )
    patch(
        "src/components/MetaTags.tsx",
        """export default function MetaTags({
  title = 'Yotaabo | Fragrance, With Intention',
  description = 'Discover fragrances that match your mood, define your style, and leave a lasting impression.',
  image = '/images/hisimage.webp',
  url = typeof window !== 'undefined' ? window.location.href : '/',
}: MetaTagsProps) {
  return (""",
        """export default function MetaTags({
  title,
  description = 'Discover fragrances that match your mood, define your style, and leave a lasting impression.',
  image = '/images/hisimage.webp',
  url = typeof window !== 'undefined' ? window.location.href : '/',
}: MetaTagsProps) {
  const { name: storeName } = useStorefront();
  const pageTitle = title ?? `${storeName} | Fragrance, With Intention`;

  return (""",
    )
    patch("src/components/MetaTags.tsx", "<title>{title}</title>", "<title>{pageTitle}</title>")
    patch(
        "src/components/MetaTags.tsx",
        '<meta property="og:title" content={title} />',
        '<meta property="og:title" content={pageTitle} />',
    )
    patch(
        "src/components/MetaTags.tsx",
        '<meta property="og:site_name" content="Yotaabo" />',
        '<meta property="og:site_name" content={storeName} />',
    )
    patch(
        "src/components/MetaTags.tsx",
        '<meta name="twitter:title" content={title} />',
        '<meta name="twitter:title" content={pageTitle} />',
    )

    # Not-found return link.
    patch(
        "src/pages/NotFound.tsx",
        "import Header from '../components/Header';",
        "import Header from '../components/Header';\nimport useStorefront from '../hooks/useStorefront';",
    )
    patch(
        "src/pages/NotFound.tsx",
        "export default function NotFound() {\n  return (",
        "export default function NotFound() {\n  const { pathFor } = useStorefront();\n\n  return (",
    )
    patch(
        "src/pages/NotFound.tsx",
        'to="/"',
        "to={pathFor()}",
    )

    commit()

if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"PATCH ABORTED: {error}", file=sys.stderr)
        print("No source files were written.", file=sys.stderr)
        sys.exit(1)
