import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTouchSelection } from './utils/useTouchSelection';
import { CartProvider } from './context/CartContext';
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

export default function App() {
  useTouchSelection();
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToHash />
        <MetaTags />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/catalog" element={<ViewCatalog />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster
          position="top-right"
          containerStyle={{ top: 90, right: 20 }}
          toastOptions={{
            style: {
              background: "#8aa89b",
              color: "#fff",
              borderRadius: 0,
              fontFamily: "inherit",
              fontSize: "14px",
              border: 'none'
            },
            success: {
              iconTheme: {
                primary: '#ffffff',
                secondary: '#8aa89b',
              },
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  );
}
