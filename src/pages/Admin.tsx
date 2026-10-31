import { useState, useEffect, useMemo } from 'react';
import type * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import AdminProductForm, { AdminProduct } from '../components/AdminProductForm';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import ConfirmModal from '../components/ConfirmModal';
import OrderDetailsModal from '../components/OrderDetailsModal';
import OrderItemCard from '../components/OrderItemCard';
import AdminProductDetailsModal from '../components/AdminProductDetailsModal';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiEye, FiEyeOff, FiSearch, FiRotateCcw, FiX, FiPackage, FiShoppingBag, FiGrid, FiMoreHorizontal, FiSettings } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';
import { getCategoryTheme } from '../utils/categoryTheme';
import toast from 'react-hot-toast';

type AdminRow = AdminProduct & { id: string; created_at: string };
type Tab = 'overview' | 'products' | 'orders' | 'settings';
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


type AdminPageHeaderProps = {
  title: string;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onSearchFocus?: () => void;
  action?: React.ReactNode;
  filters?: React.ReactNode;
};

function AdminPageHeader({
  title,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  onSearchFocus,
  action,
  filters,
}: AdminPageHeaderProps) {
  return (
    <div className="sticky top-[65px] z-30 -mx-4 bg-white px-4 pb-2 pt-1 sm:-mx-10 sm:px-10">
      <h1 className="mb-2 font-heading text-3xl italic leading-tight text-[#4d4d4d] sm:text-4xl">
        {title}
      </h1>

      {(searchPlaceholder || action) && (
        <div className="flex items-center gap-3">
          {searchPlaceholder && (
            <div className="flex h-[50px] min-w-0 flex-1 items-center gap-3 border border-black/10 bg-[#f5f5f5] px-4 sm:px-5">
              <FiSearch size={16} className="shrink-0 text-[#4d4d4d]/40" />
              <input
                type="text"
                value={searchValue ?? ''}
                onFocus={onSearchFocus}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="w-full min-w-0 border-0 bg-transparent font-heading text-sm font-medium text-[#4d4d4d] outline-none placeholder:font-heading placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0"
              />
            </div>
          )}
          {action}
        </div>
      )}

      {filters && (
        <div className="mt-5 flex flex-wrap gap-6">
          {filters}
        </div>
      )}
    </div>
  );
}

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
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingProduct, setViewingProduct] = useState<AdminRow | null>(null);
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

  async function productsApi(
    method: 'GET' | 'PATCH',
    body?: Record<string, string | boolean>,
    adminScope = false
  ) {
    const { data: { session: currentSession }, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !currentSession?.access_token) {
      throw new Error('Your admin session has expired. Please sign in again.');
    }

    const url = adminScope ? '/api/products?scope=admin' : '/api/products';
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`,
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'The product request failed.');
    }

    return data;
  }

  async function loadProducts() {
    setIsLoading(true);
    try {
      const data = await productsApi('GET', undefined, true);
      setProducts(data.products ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to load products.');
    } finally {
      setIsLoading(false);
    }
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
    try {
      await productsApi('PATCH', {
        action: 'set-status',
        id: product.id,
        is_active: false,
      });
      toast.success(`${product.name} hidden`);
      setConfirmDelete(null);
      setViewingProduct(null);
      await loadProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to hide product.');
    }
  }

  async function handleReactivate(product: AdminRow) {
    try {
      await productsApi('PATCH', {
        action: 'set-status',
        id: product.id,
        is_active: true,
      });
      toast.success(`${product.name} reactivated`);
      setViewingProduct(null);
      await loadProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to reactivate product.');
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

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter((p) => p.is_active).length,
    hidden: products.filter((p) => !p.is_active).length,
  }), [products]);

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
      {/* MINIMAL HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#4d4d4d]/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.16em] text-[#4d4d4d]/45">
            Signed in as {session?.user?.email?.split('@')[0] || 'Admin'}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 border-0 bg-transparent px-2 text-sm font-medium text-[#4d4d4d]/70 transition-colors hover:text-[#4d4d4d]"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1120px] px-4 pb-32 pt-2 sm:px-10 sm:pb-36 sm:pt-3 lg:pt-4 lg:pb-36">
        {/* ============ OVERVIEW TAB ============ */}
        {activeTab === 'overview' && (
          <section>
            <AdminPageHeader
              title="Overview"
              searchValue={searchQuery}
              searchPlaceholder="Search products"
              onSearchFocus={() => setActiveTab('products')}
              onSearchChange={(value) => {
                setSearchQuery(value);
                setCurrentPage(1);
                setActiveTab('products');
              }}
              action={
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setFormOpen(true);
                  }}
                  className="inline-flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] p-0 text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d]"
                >
                  <FiPlus size={18} />
                </button>
              }
            />

            <div className="mx-auto mt-3 grid w-full max-w-4xl grid-cols-2 gap-x-8 gap-y-6 border-t border-[#4d4d4d]/10 pt-6 sm:grid-cols-3 sm:gap-x-12">
              <div className="bg-[#f5f5f5] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#4d4d4d]/45">Total Products</p>
                <p className="mt-3 font-heading text-3xl text-[#4d4d4d] sm:text-4xl">{stats.total}</p>
              </div>

              <div className="bg-[#f5f5f5] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#4d4d4d]/45">Active Products</p>
                <p className="mt-3 font-heading text-3xl text-[#4d4d4d] sm:text-4xl">{stats.active}</p>
              </div>

              <div className="bg-[#f5f5f5] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#4d4d4d]/45">Total Orders</p>
                <p className="mt-3 font-heading text-3xl text-[#4d4d4d] sm:text-4xl">{orderStats.total}</p>
              </div>

              <div className="bg-[#f5f5f5] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#4d4d4d]/45">Pending Orders</p>
                <p className="mt-3 font-heading text-3xl text-[#4d4d4d] sm:text-4xl">{orderStats.pending}</p>
              </div>

              <div className="bg-[#f5f5f5] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#4d4d4d]/45">Confirmed Orders</p>
                <p className="mt-3 font-heading text-3xl text-[#4d4d4d] sm:text-4xl">{orderStats.confirmed}</p>
              </div>

              <div className="bg-[#f5f5f5] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#4d4d4d]/45">Delivered Orders</p>
                <p className="mt-3 font-heading text-3xl text-[#4d4d4d] sm:text-4xl">{orderStats.delivered}</p>
              </div>
            </div>
          </section>
        )}

        {/* ============ PRODUCTS TAB ============ */}
        {activeTab === 'products' && (
          <>
            <AdminPageHeader
              title="Products"
              searchValue={searchQuery}
              searchPlaceholder="Search products"
              onSearchChange={(value) => {
                setSearchQuery(value);
                setCurrentPage(1);
              }}
              action={
                <button
                  type="button"
                  onClick={() => { setEditing(null); setFormOpen(true); }}
                  className="inline-flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] p-0 text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d]"
                >
                  <FiPlus size={18} />
                </button>
              }
              filters={
                (['All', 'His', 'Hers', 'Spaces', 'Hidden'] as CategoryFilter[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`border-0 bg-transparent px-0 py-1 font-heading text-sm font-medium transition-colors ${
                      categoryFilter === cat
                        ? 'text-[#4d4d4d] underline underline-offset-4 decoration-1'
                        : 'text-[#4d4d4d]/40 hover:text-[#4d4d4d]'
                    }`}
                  >
                    {cat}
                  </button>
                ))
              }
            />

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
                        onClick={() => setViewingProduct(product)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setViewingProduct(product);
                          }
                        }}
                        className={`flex cursor-pointer items-stretch overflow-hidden font-heading border border-[#4d4d4d]/10 bg-white transition-colors hover:bg-[#fafafa] ${
                          !isActive ? 'opacity-60' : ''
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        {/* Fixed-size image container */}
                        <div
                          className={`relative h-24 w-24 shrink-0 overflow-hidden border-r border-[#4d4d4d]/10 sm:h-28 sm:w-28 ${
                            isActive ? theme.placeholderColor : 'bg-gray-300'
                          }`}
                        >
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-contain p-2"
                            />
                          )}
                        </div>

                        {/* Details column */}
                        <div className="flex min-w-0 flex-1 flex-col justify-center bg-[#f5f5f5] p-3 sm:p-4">
                          <div>
                            <div className="flex items-center justify-between gap-3">
                              <p
                                className="truncate text-sm font-medium leading-snug text-[#4d4d4d] sm:text-base"
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
                                className={`font-heading text-lg font-semibold sm:text-xl ${theme.accentColor}`}
                                style={{ lineHeight: '1', margin: 0, padding: 0 }}
                              >
                                {formatPrice(product.price)}
                              </p>
                              <p
                                className="max-w-[48%] truncate text-right text-[9px] font-semibold uppercase tracking-wider text-[#4d4d4d]/45 sm:text-[10px]"
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
              <p className="font-heading text-sm font-medium text-[#4d4d4d]/50">
                Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-0 bg-transparent px-2 py-1 font-heading text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
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
                          {showEllipsis && <span className="font-heading text-sm text-[#4d4d4d]/40">…</span>}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-[32px] border-0 bg-transparent px-2 py-1 font-heading text-sm font-medium transition-colors ${
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
                    className="border-0 bg-transparent px-2 py-1 font-heading text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
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
            <AdminPageHeader
              title="Orders"
              searchValue={orderSearch}
              searchPlaceholder="Search orders by number, name, or phone"
              onSearchChange={(value) => {
                setOrderSearch(value);
                setOrderPage(1);
              }}
              filters={
                (['All', 'Pending', 'Confirmed', 'Delivered', 'Cancelled'] as OrderFilter[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => { setOrderFilter(f); setOrderPage(1); }}
                    className={`border-0 bg-transparent px-0 py-1 font-heading text-sm font-medium transition-colors ${
                      orderFilter === f
                        ? 'text-[#4d4d4d] underline underline-offset-4 decoration-1'
                        : 'text-[#4d4d4d]/40 hover:text-[#4d4d4d]'
                    }`}
                  >
                    {f}
                  </button>
                ))
              }
            />

            {/* Order list */}
            <div className="mt-8">
              {isLoadingOrders ? (
                <p className="py-16 text-center text-sm text-[#4d4d4d]/40">Loading orders...</p>
              ) : filteredOrders.length === 0 ? (
                <p className="py-16 text-center text-sm text-[#4d4d4d]/40">No orders match your filters.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {paginatedOrders.map((order) => {
                    const totalQuantity = order.items.reduce(
                      (total, item) => total + item.qty,
                      0
                    );

                    return (
                      <OrderItemCard
                        key={order.id}
                        name={order.customer_name}
                        status={order.status}
                        leftContent={
                          <div className="flex w-full min-w-0 items-center justify-between gap-3 font-heading text-base lowercase leading-normal text-[#4d4d4d]/60">
                            <span className="truncate">
                              {new Date(order.created_at).toLocaleDateString('en-ZA', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="shrink-0 tabular-nums">
                              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                            </span>
                          </div>
                        }
                        rightContent={formatPrice(order.subtotal)}
                        onClick={() => setViewingOrder(order)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-between border-t border-[#4d4d4d]/10 pt-6">
              <p className="font-heading text-sm font-medium text-[#4d4d4d]/50">
                Showing {Math.min((orderPage - 1) * ORDERS_PER_PAGE + 1, filteredOrders.length)}–{Math.min(orderPage * ORDERS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length}
              </p>

              {totalOrderPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setOrderPage((p) => Math.max(1, p - 1))}
                    disabled={orderPage === 1}
                    className="border-0 bg-transparent px-2 py-1 font-heading text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalOrderPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setOrderPage(page)}
                      className={`min-w-[32px] border-0 bg-transparent px-2 py-1 font-heading text-sm font-medium transition-colors ${
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
                    className="border-0 bg-transparent px-2 py-1 font-heading text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
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
          <div>
            <AdminPageHeader title="Settings" />
            <div className="py-16 text-center">
              <p className="text-sm text-[#4d4d4d]/50">
                Account and store settings will appear here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING BOTTOM NAVIGATION */}
      <nav aria-label="Admin navigation" className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="relative mx-auto flex max-w-md items-center justify-around rounded-2xl border border-black/10 bg-white/95 px-2 py-2 shadow-[0_8px_35px_rgba(0,0,0,0.14)] backdrop-blur">
          {([
            { tab: 'overview' as Tab, label: 'Overview', Icon: FiGrid },
            { tab: 'products' as Tab, label: 'Products', Icon: FiPackage },
            { tab: 'orders' as Tab, label: 'Orders', Icon: FiShoppingBag },
          ]).map(({ tab, label, Icon }) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] transition-colors ${
                activeTab === tab ? 'bg-[#4d4d4d] text-white' : 'text-[#4d4d4d]/60 hover:bg-[#f5f5f5] hover:text-[#4d4d4d]'
              }`}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
          <div className="relative flex min-w-0 flex-1 justify-center">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'settings' ? 'overview' : 'settings')}
              aria-expanded={activeTab === 'settings'}
              className={`flex w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] transition-colors ${
                activeTab === 'settings' ? 'bg-[#4d4d4d] text-white' : 'text-[#4d4d4d]/60 hover:bg-[#f5f5f5] hover:text-[#4d4d4d]'
              }`}
            >
              {activeTab === 'settings' ? <FiSettings size={19} /> : <FiMoreHorizontal size={19} />}
              <span>{activeTab === 'settings' ? 'Settings' : 'More'}</span>
            </button>
          </div>
        </div>
      </nav>

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
        products={products.filter(
          (product): product is AdminRow & { id: string } =>
            typeof product.id === 'string',
        )}
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
