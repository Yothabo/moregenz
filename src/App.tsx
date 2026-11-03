import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
        </Routes>
        <AppToaster />
      </CartProvider>
    </BrowserRouter>
  );
}
