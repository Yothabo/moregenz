import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTouchSelection } from './utils/useTouchSelection';
import { CartProvider } from './context/CartContext';
import useStorefront from './hooks/useStorefront';
import MetaTags from './components/MetaTags';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import NotFound from './pages/NotFound';
import ViewCatalog from './pages/ViewCatalog';
import Admin from './pages/Admin';
import UpdatePassword from './pages/UpdatePassword';
import CartPage from './pages/CartPage';
import DesignSystemTest from './pages/DesignSystemTest';

function AppToaster() {
  const { primaryAccent } = useStorefront();

  return (
    <Toaster
      position="top-right"
      containerStyle={{ top: 90, right: 20 }}
      toastOptions={{
        style: {
          background: primaryAccent,
          color: "#fff",
          borderRadius: 0,
          fontFamily: "inherit",
          fontSize: "14px",
          border: 'none'
        },
        success: {
          iconTheme: {
            primary: '#ffffff',
            secondary: primaryAccent,
          },
        },
      }}
    />
  );
}

function LegacyPoshiesRedirect() {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/porschs(?=\/|$)/, '/poshies');

  return (
    <Navigate
      to={{
        pathname,
        search: location.search,
        hash: location.hash,
      }}
      replace
    />
  );
}

export default function App() {
  useTouchSelection();
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToHash />
        <MetaTags />
        <Routes>
          {/* Temporary redirect until the store-selection landing page is built. */}
          <Route path="/" element={<Navigate to="/yotaabo" replace />} />

          {/* Yotaabo storefront */}
          <Route path="/yotaabo" element={<Home />} />
          <Route path="/yotaabo/about" element={<About />} />
          <Route path="/yotaabo/services" element={<ServicesPage />} />
          <Route path="/yotaabo/catalog" element={<ViewCatalog />} />
          <Route path="/yotaabo/cart" element={<CartPage />} />
          <Route path="/yotaabo/*" element={<NotFound />} />

          {/* Poshies storefront */}
          <Route path="/poshies" element={<Home />} />
          <Route path="/poshies/about" element={<About />} />
          <Route path="/poshies/services" element={<ServicesPage />} />
          <Route path="/poshies/catalog" element={<ViewCatalog />} />
          <Route path="/poshies/cart" element={<CartPage />} />
          <Route path="/poshies/*" element={<NotFound />} />

          {/* Legacy Poshies URLs */}
          <Route path="/porschs" element={<LegacyPoshiesRedirect />} />
          <Route path="/porschs/*" element={<LegacyPoshiesRedirect />} />

          {/* Shared operational routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/test" element={<DesignSystemTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AppToaster />
      </CartProvider>
    </BrowserRouter>
  );
}
