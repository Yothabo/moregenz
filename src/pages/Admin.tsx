import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import AdminProductForm, { AdminProduct } from '../components/AdminProductForm';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import ConfirmModal from '../components/ConfirmModal';
import OrderDetailsModal from '../components/OrderDetailsModal';
import AdminProductDetailsModal from '../components/AdminProductDetailsModal';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiEye, FiEyeOff, FiSearch, FiRotateCcw, FiX } from 'react-icons/fi';
import MenuIcon from '../components/MenuIcon';
import { formatPrice } from '../utils/formatPrice';
import { getCategoryTheme } from '../utils/categoryTheme';
import toast from 'react-hot-toast';

type AdminRow = AdminProduct & { id: string; created_at: string };
type Tab = 'products' | 'orders' | 'settings';
type CategoryFilter = 'All' | 'His' | 'Hers' | 'Spaces' | 'Hidden';
type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled';
type OrderFilter = 'All' | 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled';

type OrderItem = { name: string; price: number; qty: number };

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  subtotal: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export default function Admin() {
  const navigate = useNavigate();

  // Auth
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

  // Data
  const [products, setProducts] = useState<AdminRow[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AdminRow | null>(null);

  // UI state
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<AdminRow | null>(null);
  const [menuHovered, setMenuHovered] = useState(false);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderPage, setOrderPage] = useState(1);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [confirmDeleteOrder, setConfirmDeleteOrder] = useState<Order | null>(null);
  const ITEMS_PER_PAGE = 20;
  const ORDERS_PER_PAGE = 20;

  // ============ AUTH ============
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      checkAdmin(session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkAdmin(session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function checkAdmin(session: any) {
    setIsChecking(true);
    if (!session) {
      setIsAdmin(false);
      setIsChecking(false);
      return;
    }
    for (let attempt = 0; attempt < 3; attempt++) {
      const { data, error } = await supabase
        .from('admins').select('id').eq('id', session.user.id).maybeSingle();
      if (data) { setIsAdmin(true); setIsChecking(false); return; }
      if (error) await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      else { setIsAdmin(false); setIsChecking(false); return; }
    }
    setIsAdmin(false);
    setIsChecking(false);
  }

  useEffect(() => {
    if (!isAdmin) return;
    loadProducts();
    loadOrders();
  }, [isAdmin]);

  async function loadProducts() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products').select('*')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true });
    if (error) toast.error(error.message);
    else setProducts(data ?? []);
    setIsLoading(false);
  }

  async function ordersApi(method: 'GET' | 'PATCH' | 'DELETE', body?: Record<string, string>) {
    const { data: { session: currentSession }, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !currentSession?.access_token) {
      throw new Error('Your admin session has expired. Please sign in again.');
    }

    const response = await fetch('/api/orders', {
      method,
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'The order request failed.');
    }

    return data;
  }

  async function loadOrders() {
    setIsLoadingOrders(true);
    try {
      const data = await ordersApi('GET');
      setOrders(data.orders ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to load orders.');
    } finally {
      setIsLoadingOrders(false);
    }
  }

  async function handleOrderStatusChange(order: Order, newStatus: OrderStatus) {
    try {
      await ordersApi('PATCH', { id: order.id, status: newStatus });
      toast.success(`Order ${order.order_number} → ${newStatus}`);
      setViewingOrder(null);
      await loadOrders();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update order.');
    }
  }

  async function handleDeleteOrder(order: Order) {
    try {
      await ordersApi('DELETE', { id: order.id });
      toast.success(`Order ${order.order_number} deleted`);
      setConfirmDeleteOrder(null);
      setViewingOrder(null);
      await loadOrders();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete order.');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError(
        error.message.toLowerCase().includes('invalid login')
          ? 'The email or password you entered is incorrect.'
          : error.message
      );
    }
    setIsLoggingIn(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }

  async function handleDelete(product: AdminRow) {
    const { error } = await supabase
      .from('products').update({ is_active: false }).eq('id', product.id);
    if (error) toast.error(error.message);
    else {
      toast.success(`${product.name} hidden`);
      setConfirmDelete(null);
      setViewingProduct(null); // close the details modal too
      loadProducts();
    }
  }

  async function handleReactivate(product: AdminRow) {
    const { error } = await supabase
      .from('products').update({ is_active: true }).eq('id', product.id);
    if (error) toast.error(error.message);
    else {
      toast.success(`${product.name} reactivated`);
      setViewingProduct(null); // close the details modal too
      loadProducts();
    }
  }

  // ============ FILTERING ============
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (categoryFilter === 'Hidden') {
          if (p.is_active) return false;
        } else if (categoryFilter !== 'All' && p.category !== categoryFilter) {
          return false;
        }
        if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, categoryFilter, searchQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      active: products.filter((p) => p.is_active).length,
      hidden: products.filter((p) => !p.is_active).length,
    };
  }, [products]);

  // Order filtering
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderFilter !== 'All' && o.status !== orderFilter.toLowerCase()) return false;
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        const match =
          o.order_number.toLowerCase().includes(q) ||
          o.customer_name.toLowerCase().includes(q) ||
          o.customer_phone.includes(orderSearch);
        if (!match) return false;
      }
      return true;
    });
  }, [orders, orderFilter, orderSearch]);

  const totalOrderPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const start = (orderPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [filteredOrders, orderPage]);

  const orderStats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      confirmed: orders.filter((o) => o.status === 'confirmed').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };
  }, [orders]);

  // ============ LOGIN ============
  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-[1120px]">
          <div className="relative flex w-full items-center justify-center">
            <div className="w-full">
              <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '25vh' }}>
                <text x="50" y="50%" dominantBaseline="middle" textAnchor="middle" textLength="100" lengthAdjust="spacingAndGlyphs" style={{ fontFamily: '"Anton", sans-serif', fontWeight: 400 }} className="fill-[#8aa89b]" fontSize="100">yotaabo</text>
              </svg>
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <p className="font-accent text-[clamp(50px,10vw,130px)] tracking-[0.02em] text-[#4d4d4d]">Be Remembered</p>
            </div>
          </div>
        </div>

        <div className="mt-16 w-full max-w-sm">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f5] px-4 py-3.5">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full border-0 bg-transparent text-sm font-medium text-black outline-none ring-0 placeholder:text-[#4d4d4d]/50 focus:outline-none focus:ring-0" />
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f5] px-4 py-3.5">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border-0 bg-transparent text-sm font-medium text-black outline-none ring-0 placeholder:text-[#4d4d4d]/50 focus:outline-none focus:ring-0" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 text-[#4d4d4d]/50 outline-none transition-colors hover:text-[#4d4d4d]" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <div className="mt-2 flex justify-end">
              <button type="button" onClick={() => setIsForgotMode(true)} className="border-0 bg-transparent p-0 text-sm text-[#4d4d4d]/60 hover:text-[#4d4d4d]">Forgot password?</button>
            </div>
            <button type="submit" disabled={isLoggingIn} className="mt-4 flex h-12 w-full items-center justify-between border border-solid border-[#4d4d4d] bg-[#4d4d4d] px-5 text-xs font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-transparent hover:text-[#4d4d4d] disabled:opacity-50">
              <span>{isLoggingIn ? 'Signing in...' : 'Sign In'}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </form>
          <p className="mt-8 text-center text-xs text-[#4d4d4d]/40">
            <Link to="/" className="hover:text-[#4d4d4d]">← Back to site</Link>
          </p>
        </div>

        <ForgotPasswordModal isOpen={isForgotMode} onClose={() => setIsForgotMode(false)} initialEmail={email} />

        {loginError && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/40 p-4 backdrop-blur-sm" onClick={() => setLoginError(null)}>
            <div className="relative w-full max-w-sm bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="font-heading text-2xl italic text-[#4d4d4d]">Login Failed</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4d4d4d]/70">{loginError}</p>
              <button onClick={() => setLoginError(null)} className="mt-6 flex h-11 w-full items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] text-xs font-semibold text-white hover:bg-transparent hover:text-[#4d4d4d]">Try Again</button>
            </div>
          </div>
        )}
      </main>
    );
  }

  if (!isChecking && isAdmin === false) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-heading text-3xl italic text-[#4d4d4d]">Access Denied</h1>
          <p className="mt-2 text-sm text-[#4d4d4d]/60">This account is not authorized for admin access.</p>
          <button onClick={handleLogout} className="mt-6 h-11 w-full border border-solid border-[#4d4d4d] bg-[#4d4d4d] text-xs font-semibold text-white hover:bg-transparent hover:text-[#4d4d4d]">Log Out</button>
        </div>
      </main>
    );
  }

  if (isChecking || isAdmin === null || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="font-heading text-lg text-[#4d4d4d]/60">Loading...</p>
      </main>
    );
  }

  // ============ DASHBOARD ============
  return (
    <main className="min-h-screen bg-white">
      {/* TOP NAV BAR */}
      <header className="sticky top-0 z-40 border-b border-[#4d4d4d]/10 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-10">
<nav className="hidden items-center gap-8 md:flex">
              {(['products', 'orders', 'settings'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-0 bg-transparent p-0 font-heading text-lg italic transition-colors ${
                    activeTab === tab ? 'font-semibold text-[#4d4d4d]' : 'text-[#4d4d4d]/50 hover:text-[#4d4d4d]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-[#4d4d4d]/40 sm:inline">{session.user.email}</span>
            <button
              onClick={handleLogout}
              className="hidden items-center gap-2 border-0 bg-transparent text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] md:flex"
            >
              <FiLogOut size={14} /> Logout
            </button>
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onMouseEnter={() => setMenuHovered(true)}
              onMouseLeave={() => setMenuHovered(false)}
              className="inline-flex h-11 w-11 items-center justify-center border-0 bg-transparent p-0 text-[#4d4d4d] outline-none transition-colors hover:text-[#777770] md:hidden"
              aria-label="Toggle menu"
            >
              <MenuIcon isOpen={isMobileMenuOpen} isHovered={menuHovered} size={29} />
            </button>
          </div>
        </div>

        {/* Mobile menu — top-down dropdown */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay (transparent, closes menu on outside click) */}
            <div
              className="fixed inset-0 z-30 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute right-4 top-full z-40 mt-1 w-56 bg-white shadow-xl ring-1 ring-black/5 md:hidden">
              {/* Admin name header */}
              <div className="border-b border-[#4d4d4d]/10 px-4 py-3">
                <p className="font-heading text-sm italic text-[#4d4d4d]">
                  Signed in as {session.user.email.split('@')[0]}
                </p>
              </div>
              {/* Nav tabs */}
              <nav className="flex flex-col">
                {(['products', 'orders', 'settings'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
                    className={`w-full border-0 bg-transparent px-4 py-2.5 text-left text-sm font-medium capitalize transition-colors hover:bg-[#f5f5f5] ${
                      activeTab === tab ? 'text-[#4d4d4d] font-semibold' : 'text-[#4d4d4d]/60'
                    }`}
                    style={{ WebkitAppearance: 'none', appearance: 'none' }}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
              {/* Logout */}
              <div className="border-t border-[#4d4d4d]/10">
                <button
                  type="button"
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="flex w-full items-center gap-2 border-0 bg-transparent px-4 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                  style={{ WebkitAppearance: 'none', appearance: 'none' }}
                >
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      <div className="mx-auto max-w-[1120px] px-6 py-12 sm:px-10 lg:py-16">
        {/* ============ PRODUCTS TAB ============ */}
        {activeTab === 'products' && (
          <>
            {/* Stats row */}
            <div>
              <p className="text-sm font-medium text-[#4d4d4d]/60">
                {stats.total} total · {stats.active} active · {stats.hidden} hidden
              </p>
            </div>

            {/* Full-width search + add row */}
            <div className="mt-10 flex items-center gap-3">
              {/* Search - grey background, rounded like login inputs */}
              <div className="flex flex-1 items-center gap-3 border border-black/10 bg-[#f5f5f5] px-5 py-3.5">
                <FiSearch size={16} className="text-[#4d4d4d]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products"
                  className="w-full border-0 bg-transparent text-sm font-medium text-[#4d4d4d] outline-none placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0"
                />
              </div>

              {/* Add product - full text, smaller */}
              <button
                onClick={() => { setEditing(null); setFormOpen(true); }}
                className="inline-flex h-[50px] shrink-0 items-center gap-2 border border-solid border-[#4d4d4d] bg-[#4d4d4d] px-6 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d]"
              >
                <FiPlus size={14} /> Add Product
              </button>
            </div>

            {/* Category filters — flat, no border */}
            <div className="mt-8 flex flex-wrap gap-6" style={{ fontFamily: 'var(--font-body)' }}>
              {(['All', 'His', 'Hers', 'Spaces', 'Hidden'] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`border-0 bg-transparent px-0 py-1 text-sm font-medium transition-colors ${
                    categoryFilter === cat
                      ? 'text-[#4d4d4d] underline underline-offset-4 decoration-1'
                      : 'text-[#4d4d4d]/40 hover:text-[#4d4d4d]'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product list */}
            <div className="mt-8">
              {filteredProducts.length === 0 ? (
                <p className="py-16 text-center text-sm text-[#4d4d4d]/40">No products match your filters.</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {paginatedProducts.map((product) => {
                    const theme = getCategoryTheme(product.category);
                    const isActive = product.is_active;

                    return (
                      <div
                        key={product.id}
                        className={`flex items-stretch border border-[#4d4d4d]/10 bg-[#f5f5f5] transition-colors hover:bg-[#ebebeb] ${
                          !isActive ? 'opacity-60' : ''
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                                                {/* Image */}
                        <div
                          className={`shrink-0 w-24 sm:w-28 overflow-hidden border-r border-[#4d4d4d]/10 ${isActive ? theme.placeholderColor : 'bg-gray-300'}`}
                        >
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="h-full w-full object-contain p-1.5"
                            />
                          )}
                        </div>

                        {/* Details column */}
                        <div className="flex flex-1 min-w-0 flex-col justify-between p-3">
                          <div
                            className="cursor-pointer"
                            onClick={() => setViewingProduct(product)}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p
                                className="truncate text-base font-medium text-[#4d4d4d]/70"
                                style={{ lineHeight: '1.1', margin: 0, padding: 0 }}
                              >
                                {product.name}
                              </p>
                              <span
                                className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider ${
                                  isActive ? 'text-[#4d4d4d]/40' : 'text-red-500'
                                }`}
                              >
                                {isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between gap-2 sm:gap-3">
                              <p
                                className={`font-heading text-lg font-semibold ${theme.accentColor}`}
                                style={{ lineHeight: '1', margin: 0, padding: 0 }}
                              >
                                {formatPrice(product.price)}
                              </p>
                              <p
                                className="truncate text-[10px] uppercase tracking-wider text-[#4d4d4d]/40 font-semibold text-right"
                                style={{ lineHeight: '1', margin: 0, padding: 0 }}
                              >
                                {product.category} · {product.subcategory}
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pagination footer */}
            <div className="mt-12 flex items-center justify-between border-t border-[#4d4d4d]/10 pt-6">
              <p className="text-sm font-medium text-[#4d4d4d]/50">
                Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-0 bg-transparent px-2 py-1 text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ←
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .map((page, index, arr) => {
                      const prevPage = arr[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;
                      return (
                        <span key={page} className="flex items-center gap-1">
                          {showEllipsis && <span className="text-sm text-[#4d4d4d]/40">…</span>}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-[32px] border-0 bg-transparent px-2 py-1 text-sm font-medium transition-colors ${
                              page === currentPage
                                ? 'text-[#4d4d4d] underline underline-offset-4 decoration-1'
                                : 'text-[#4d4d4d]/40 hover:text-[#4d4d4d]'
                            }`}
                          >
                            {page}
                          </button>
                        </span>
                      );
                    })}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-0 bg-transparent px-2 py-1 text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============ ORDERS TAB ============ */}
        {activeTab === 'orders' && (
          <>
            {/* Stats row */}
            <div>
              <p className="text-sm font-medium text-[#4d4d4d]/60">
                {orderStats.total} total · {orderStats.pending} pending · {orderStats.confirmed} confirmed · {orderStats.delivered} delivered · {orderStats.cancelled} cancelled
              </p>
            </div>

            {/* Search */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex flex-1 items-center gap-3 border border-black/10 bg-[#f5f5f5] px-5 py-3.5">
                <FiSearch size={16} className="text-[#4d4d4d]/40" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search orders by number, name, or phone"
                  className="w-full border-0 bg-transparent text-sm font-medium text-[#4d4d4d] outline-none placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            {/* Status filters */}
            <div className="mt-8 flex flex-wrap gap-6">
              {(['All', 'Pending', 'Confirmed', 'Delivered', 'Cancelled'] as OrderFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => { setOrderFilter(f); setOrderPage(1); }}
                  className={`border-0 bg-transparent px-0 py-1 text-sm font-medium transition-colors ${
                    orderFilter === f
                      ? 'text-[#4d4d4d] underline underline-offset-4 decoration-1'
                      : 'text-[#4d4d4d]/40 hover:text-[#4d4d4d]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Order list */}
            <div className="mt-8">
              {isLoadingOrders ? (
                <p className="py-16 text-center text-sm text-[#4d4d4d]/40">Loading orders...</p>
              ) : filteredOrders.length === 0 ? (
                <p className="py-16 text-center text-sm text-[#4d4d4d]/40">No orders match your filters.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {paginatedOrders.map((order) => {
                    const statusColor =
                      order.status === 'pending' ? 'text-[#d97706]'
                      : order.status === 'confirmed' ? 'text-[#8aa89b]'
                      : order.status === 'delivered' ? 'text-[#4d4d4d]/60'
                      : 'text-red-500';
                    const statusLabel = order.status.charAt(0).toUpperCase() + order.status.slice(1);
                    return (
                      <div
                        key={order.id}
                        onClick={() => setViewingOrder(order)}
                        className="cursor-pointer border border-[#4d4d4d]/10 bg-[#f5f5f5] p-4 transition-colors hover:bg-[#ebebeb]"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-heading text-lg font-semibold text-[#4d4d4d]">
                              {order.order_number}
                            </p>
                            <p className="mt-0.5 text-sm text-[#4d4d4d]/60">
                              {order.customer_name} · {order.customer_phone}
                            </p>
                          </div>
                          <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider ${statusColor}`}>
                            {statusLabel}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="truncate text-[10px] uppercase tracking-wider text-[#4d4d4d]/40 font-semibold">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · WhatsApp order
                          </span>
                          <span className="font-heading text-lg font-semibold text-[#8aa89b]">
                            {formatPrice(order.subtotal)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-between border-t border-[#4d4d4d]/10 pt-6">
              <p className="text-sm font-medium text-[#4d4d4d]/50">
                Showing {Math.min((orderPage - 1) * ORDERS_PER_PAGE + 1, filteredOrders.length)}–{Math.min(orderPage * ORDERS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length}
              </p>

              {totalOrderPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setOrderPage((p) => Math.max(1, p - 1))}
                    disabled={orderPage === 1}
                    className="border-0 bg-transparent px-2 py-1 text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalOrderPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setOrderPage(page)}
                      className={`min-w-[32px] border-0 bg-transparent px-2 py-1 text-sm font-medium transition-colors ${
                        page === orderPage
                          ? 'text-[#4d4d4d] underline underline-offset-4 decoration-1'
                          : 'text-[#4d4d4d]/40 hover:text-[#4d4d4d]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setOrderPage((p) => Math.min(totalOrderPages, p + 1))}
                    disabled={orderPage === totalOrderPages}
                    className="border-0 bg-transparent px-2 py-1 text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============ SETTINGS TAB ============ */}
        {activeTab === 'settings' && (
          <div className="py-20 text-center">
            <h1 className="font-heading text-4xl italic text-[#4d4d4d]">Settings</h1>
            <p className="mt-3 text-sm text-[#4d4d4d]/50">
              Account and store settings will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Product Details Modal (Admin-specific) */}
      <AdminProductDetailsModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onEdit={(p) => { setViewingProduct(null); setEditing(p); setFormOpen(true); }}
        onHide={(p) => setConfirmDelete(p)}
        onShow={(p) => { handleReactivate(p); setViewingProduct(null); }}
        onDelete={(p) => {
          setViewingProduct(null);
          setConfirmDelete(p);
        }}
      />

      {/* Modals */}
      <AdminProductForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSaved={loadProducts}
        productToEdit={editing}
      />

      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Hide product?"
        message={confirmDelete ? `"${confirmDelete.name}" will be hidden from the site. You can reactivate it later.` : ''}
        confirmText="Hide"
        cancelText="Cancel"
        variant="grey"
        onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />

      <OrderDetailsModal
        order={viewingOrder}
        onClose={() => setViewingOrder(null)}
        onStatusChange={handleOrderStatusChange}
        onDelete={(o) => { setViewingOrder(null); setConfirmDeleteOrder(o); }}
      />

      <ConfirmModal
        isOpen={!!confirmDeleteOrder}
        title="Delete order permanently?"
        message={confirmDeleteOrder ? `Order ${confirmDeleteOrder.order_number} will be permanently removed. This cannot be undone.` : ''}
        confirmText="Delete"
        cancelText="Cancel"
        variant="grey"
        onConfirm={() => confirmDeleteOrder && handleDeleteOrder(confirmDeleteOrder)}
        onCancel={() => setConfirmDeleteOrder(null)}
      />
    </main>
  );
}
