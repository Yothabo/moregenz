import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type * as React from 'react';

import { adminTypography } from '../design-system/tokens/adminTypography';
import {
  adminText,
  colors,
  adminSpacingVariables,
} from '../design-system/tokens';
import '../design-system/styles/admin-typography.css';
import '../design-system/styles/admin-spacing.css';

import AdminProductForm, {
  type AdminProduct,
} from '../components/AdminProductForm';
import { invalidateProductsCache } from '../hooks/useProducts';
import ConfirmModal from '../components/ConfirmModal';
import OrderDetailsModal from '../components/OrderDetailsModal';
import AdminProductDetailsModal from '../components/AdminProductDetailsModal';

import AdminLoginScreen from '../features/admin/components/AdminLoginScreen';
import AdminTopBar from '../features/admin/components/AdminTopBar';
import AdminBottomNavigation from '../features/admin/components/AdminBottomNavigation';
import AdminOverview from '../features/admin/components/AdminOverview';
import AdminActivities from '../features/admin/components/AdminActivities';
import AdminManagement from '../features/admin/components/AdminManagement';
import AdminProducts from '../features/admin/components/AdminProducts';
import AdminOrders from '../features/admin/components/AdminOrders';
import { useAdminAuth } from '../features/admin/hooks/useAdminAuth';
import { useAdminProducts } from '../features/admin/hooks/useAdminProducts';
import { useAdminOrders } from '../features/admin/hooks/useAdminOrders';
import { useAdminActivity } from '../features/admin/hooks/useAdminActivity';

import type {
  AdminRow,
  Tab,
  CategoryFilter,
  OrderStatus,
  OrderFilter,
  Order,
  Storefront,
} from '../features/admin/types/admin.types';

export default function Admin() {
  const {
    session,
    admin,
    isAdmin,
    isChecking,
    isLoggingIn,
    loginError,
  clearLoginError,
    login,
    logout,
  } = useAdminAuth();

  const {
    products,
    hasLoadedProducts,
    loadProducts,
    hideProduct,
    reactivateProduct,
    deleteProduct,
  } = useAdminProducts(isAdmin, session?.user.id ?? null);

  const {
    activities,
    isLoadingActivities,
    loadActivities,
  } = useAdminActivity(isAdmin, session?.user.id ?? null);

  const {
    orders,
    isLoadingOrders,
    hasLoadedOrders,
    loadOrders,
    changeOrderStatus,
    deleteOrder,
  } = useAdminOrders(isAdmin, session?.user.id ?? null);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginTransitionPending, setLoginTransitionPending] = useState(false);
  const [showLoginTransition, setShowLoginTransition] = useState(false);

  // Product form state
  const formUserId =
    isAdmin === true ? session?.user.id ?? null : null;

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [formStateReady, setFormStateReady] = useState(false);
  const restoredFormScopeRef = useRef<string | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<AdminRow | null>(null);
  const [confirmPermanentDelete, setConfirmPermanentDelete] =
    useState<AdminRow | null>(null);
  const [isHidingProduct, setIsHidingProduct] = useState(false);
  const isHidingProductRef = useRef(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const isDeletingProductRef = useRef(false);
  const [viewingProduct, setViewingProduct] = useState<AdminRow | null>(null);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [storefrontFilter, setStorefrontFilter] =
    useState<'all' | Storefront>('all');

  useEffect(() => {
    if (admin?.role === 'store_admin' && admin.storeSlug) {
      setStorefrontFilter(admin.storeSlug as Storefront);
    } else if (admin?.role === 'super_admin') {
      setStorefrontFilter('all');
    }
  }, [admin?.role, admin?.storeSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Order state
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderPage, setOrderPage] = useState(1);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [confirmDeleteOrder, setConfirmDeleteOrder] = useState<Order | null>(null);

  const ITEMS_PER_PAGE = 20;
  const ORDERS_PER_PAGE = 20;

  // Restore a product form only after this admin has been authorized.
  useLayoutEffect(() => {
    if (!formUserId) {
      restoredFormScopeRef.current = null;
      setFormOpen(false);
      setEditing(null);
      setFormStateReady(false);
      setConfirmDelete(null);
      setConfirmPermanentDelete(null);
      setIsDeletingProduct(false);
      setViewingProduct(null);
      return;
    }

    setFormStateReady(false);

    try {
      const formOpenKey =
        `yotaabo-admin-product-form-open:${formUserId}`;
      const editingKey =
        `yotaabo-admin-product-editing:${formUserId}`;

      const savedOpen = sessionStorage.getItem(formOpenKey) === 'true';
      const savedEditing = sessionStorage.getItem(editingKey);

      let restoredEditing: AdminProduct | null = null;

      if (savedEditing) {
        try {
          restoredEditing = JSON.parse(savedEditing) as AdminProduct;
        } catch {
          sessionStorage.removeItem(editingKey);
        }
      }

      setFormOpen(savedOpen);
      setEditing(restoredEditing);
    } catch {
      setFormOpen(false);
      setEditing(null);
    }

    restoredFormScopeRef.current = formUserId;
    setFormStateReady(true);
  }, [formUserId]);

  // Preserve the authorized admin's open form across browser reloads.
  useEffect(() => {
    if (
      !formUserId ||
      !formStateReady ||
      restoredFormScopeRef.current !== formUserId
    ) {
      return;
    }

    try {
      const formOpenKey =
        `yotaabo-admin-product-form-open:${formUserId}`;
      const editingKey =
        `yotaabo-admin-product-editing:${formUserId}`;

      if (formOpen) {
        sessionStorage.setItem(formOpenKey, 'true');

        if (editing) {
          sessionStorage.setItem(
            editingKey,
            JSON.stringify(editing),
          );
        } else {
          sessionStorage.removeItem(editingKey);
        }
      } else {
        sessionStorage.removeItem(formOpenKey);
        sessionStorage.removeItem(editingKey);
      }
    } catch {
      // Storage may be unavailable; the admin form remains usable.
    }
  }, [formUserId, formStateReady, formOpen, editing]);

  // Login
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginTransitionPending(true);

    const accepted = await login(email, password);

    if (!accepted) {
      setLoginTransitionPending(false);
    }
  }

  useEffect(() => {
    if (!loginTransitionPending || !session || isChecking) return;

    if (isAdmin === false) {
      setLoginTransitionPending(false);
      return;
    }

    if (
      isAdmin === true &&
      hasLoadedProducts &&
      hasLoadedOrders &&
      !isLoadingOrders
    ) {
      setShowLoginTransition(true);
    }
  }, [
    loginTransitionPending,
    session,
    isChecking,
    isAdmin,
    hasLoadedProducts,
    hasLoadedOrders,
    isLoadingOrders,
  ]);

  // Product actions
  async function handleHideProduct(product: AdminRow) {
    if (isHidingProductRef.current) return;

    isHidingProductRef.current = true;
    setIsHidingProduct(true);

    try {
      const success = await hideProduct(product);

      if (success) {
        setConfirmDelete(null);
        setViewingProduct(null);
        void loadActivities();
      }
    } finally {
      isHidingProductRef.current = false;
      setIsHidingProduct(false);
    }
  }

  async function handlePermanentDeleteProduct(product: AdminRow) {
    if (isDeletingProductRef.current) return;

    isDeletingProductRef.current = true;
    setIsDeletingProduct(true);

    try {
      const success = await deleteProduct(product);

      if (success) {
        setConfirmPermanentDelete(null);
        setViewingProduct(null);
        void loadActivities();
      }
    } finally {
      isDeletingProductRef.current = false;
      setIsDeletingProduct(false);
    }
  }

  async function handleReactivateProduct(product: AdminRow) {
    const success = await reactivateProduct(product);

    if (success) {
      setViewingProduct(null);
      void loadActivities();
    }
  }

  // Order actions
  async function handleOrderStatusChange(
    order: Order,
    newStatus: OrderStatus,
  ) {
    const success = await changeOrderStatus(order, newStatus);

    if (success) {
      setViewingOrder(null);
      void loadActivities();
    }
  }

  async function handleDeleteOrder(order: Order) {
    const success = await deleteOrder(order);

    if (success) {
      setConfirmDeleteOrder(null);
      setViewingOrder(null);
      void loadActivities();
    }
  }

  // Apply the shared storefront scope before tab-specific filtering.
  const storefrontProducts = useMemo(
    () =>
      storefrontFilter === 'all'
        ? products
        : products.filter((product) => product.storefront === storefrontFilter),
    [products, storefrontFilter],
  );

  const storefrontOrders = useMemo(
    () =>
      storefrontFilter === 'all'
        ? orders
        : orders.filter((order) => order.storefront === storefrontFilter),
    [orders, storefrontFilter],
  );

  // Product filtering
  const filteredProducts = useMemo(() => {
    return storefrontProducts
      .filter((product) => {
        if (categoryFilter === 'Hidden') {
          if (product.is_active) return false;
        } else if (
          categoryFilter !== 'All' &&
          product.category !== categoryFilter
        ) {
          return false;
        }

        if (
          searchQuery.trim() &&
          !product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [storefrontProducts, categoryFilter, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [storefrontFilter, categoryFilter, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Order filtering
  const filteredOrders = useMemo(() => {
    return storefrontOrders.filter((order) => {
      if (
        orderFilter !== 'All' &&
        order.status !== orderFilter.toLowerCase()
      ) {
        return false;
      }

      if (orderSearch.trim()) {
        const query = orderSearch.toLowerCase();

        const matches =
          order.order_number.toLowerCase().includes(query) ||
          order.customer_name.toLowerCase().includes(query) ||
          order.customer_phone.includes(orderSearch);

        if (!matches) return false;
      }

      return true;
    });
  }, [storefrontOrders, orderFilter, orderSearch]);

  useEffect(() => {
    setOrderPage(1);
  }, [storefrontFilter, orderFilter, orderSearch]);

  const totalOrderPages = Math.ceil(
    filteredOrders.length / ORDERS_PER_PAGE,
  );

  const paginatedOrders = useMemo(() => {
    const start = (orderPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [filteredOrders, orderPage]);

  // Dashboard statistics
  const stats = useMemo(
    () => ({
      total: storefrontProducts.length,
      active: storefrontProducts.filter((product) => product.is_active).length,
      hidden: storefrontProducts.filter((product) => !product.is_active).length,
    }),
    [storefrontProducts],
  );

  const orderStats = useMemo(
    () => ({
      total: storefrontOrders.length,
      pending: storefrontOrders.filter((order) => order.status === 'pending').length,
      confirmed: storefrontOrders.filter((order) => order.status === 'confirmed').length,
      delivered: storefrontOrders.filter((order) => order.status === 'delivered').length,
      cancelled: storefrontOrders.filter((order) => order.status === 'cancelled').length,
    }),
    [storefrontOrders],
  );

  if (
    !session ||
    isChecking ||
    isAdmin === null ||
    (isAdmin && (!hasLoadedProducts || !hasLoadedOrders)) ||
    loginTransitionPending
  ) {
    return (
      <AdminLoginScreen
        email={email}
        password={password}
        loginError={loginError}
        isLoggingIn={isLoggingIn}
        isResolving={
          Boolean(session) &&
          (isChecking ||
            isAdmin === null ||
            !hasLoadedProducts ||
            !hasLoadedOrders)
        }
        showAuthIndicator={
          Boolean(session) && !isChecking && isAdmin === true && !showLoginTransition
        }
        isTransitioning={showLoginTransition}
        onTransitionComplete={() => {
          setShowLoginTransition(false);
          setLoginTransitionPending(false);
        }}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
        onClearLoginError={clearLoginError}
      />
    );
  }

  if (!isChecking && isAdmin === false) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-heading text-3xl italic text-[#4d4d4d]">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-[#4d4d4d]/60">
            This account is not authorized for admin access.
          </p>
          <button
            type="button"
            onClick={logout}
            className="mt-6 h-11 w-full border border-solid border-[#4d4d4d] bg-[#4d4d4d] text-xs font-semibold text-white hover:bg-transparent hover:text-[#4d4d4d]"
          >
            Log Out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="admin-scope min-h-screen bg-white"
      style={
        {
          '--admin-text-primary': adminText.primary,
          '--admin-text-secondary': adminText.secondary,
          '--admin-text-supporting': adminText.supporting,
          '--admin-text-muted': adminText.muted,
          '--admin-text-disabled': adminText.disabled,
          '--admin-charcoal-40': colors.opacity.charcoal40,
          '--admin-charcoal-50': colors.opacity.charcoal50,
          '--admin-charcoal-70': colors.opacity.charcoal70,
          '--admin-surface': colors.neutral.surface,
          '--admin-card-order-media-surface': colors.neutral.grey300,
          '--admin-surface-subtle': colors.neutral.surfaceSubtle,
          '--admin-border-subtle': colors.opacity.charcoal10,
          '--admin-status-amber': colors.statusPalette.amber,
          '--admin-status-green': colors.statusPalette.green,
          '--admin-status-red': colors.statusPalette.red,

          ...adminSpacingVariables,

          '--admin-font-heading': adminTypography.heading,
          '--admin-font-body': adminTypography.body,

          '--admin-size-page-title': adminTypography.size.pageTitle,
          '--admin-size-section-title': adminTypography.size.sectionTitle,
          '--admin-size-card-title': adminTypography.size.cardTitle,
          '--admin-size-subsection-title': adminTypography.size.subsectionTitle,
          '--admin-size-body': adminTypography.size.body,
          '--admin-size-supporting': adminTypography.size.supporting,
          '--admin-size-micro': adminTypography.size.micro,

          '--admin-weight-normal': adminTypography.weight.normal,
          '--admin-weight-medium': adminTypography.weight.medium,
          '--admin-weight-semibold': adminTypography.weight.semibold,

          '--admin-line-tight': adminTypography.lineHeight.tight,
          '--admin-line-heading': adminTypography.lineHeight.heading,
          '--admin-line-body': adminTypography.lineHeight.body,
          '--admin-line-compact': adminTypography.lineHeight.compact,
        } as React.CSSProperties
      }
    >
      <AdminTopBar
        email={session?.user?.email?.split('@')[0] || 'Admin'}
        onLogout={logout}
        onBack={activeTab === 'activities' ? () => setActiveTab('overview') : undefined}
      />

      <div className="admin-page-shell mx-auto">
        {activeTab === 'overview' && (
          <AdminOverview
            email={session?.user?.email?.split('@')[0] || 'Admin'}
            searchQuery={searchQuery}
            onSearchChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
              setActiveTab('products');
            }}
            onSearchFocus={() => setActiveTab('products')}
            onAddProduct={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            stats={stats}
            orderStats={orderStats}
            activities={activities}
            isLoadingActivities={isLoadingActivities}
            onViewAllActivities={() => setActiveTab('activities')}
          />
        )}

        {activeTab === 'products' && (
          <AdminProducts
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
            filteredProducts={filteredProducts}
            paginatedProducts={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onSearchChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
            onCategoryChange={setCategoryFilter}
            onPageChange={setCurrentPage}
            onAddProduct={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            onSelectProduct={setViewingProduct}
          />
        )}

        {activeTab === 'orders' && (
          <AdminOrders
            orderSearch={orderSearch}
            orderFilter={orderFilter}
            filteredOrders={filteredOrders}
            paginatedOrders={paginatedOrders}
            isLoadingOrders={isLoadingOrders}
            orderPage={orderPage}
            totalOrderPages={totalOrderPages}
            onSearchChange={(value) => {
              setOrderSearch(value);
              setOrderPage(1);
            }}
            onFilterChange={(value) => {
              setOrderFilter(value);
              setOrderPage(1);
            }}
            onPageChange={setOrderPage}
            onSelectOrder={setViewingOrder}
          />
        )}

        {activeTab === 'activities' && (
          <AdminActivities
            activities={activities}
            isLoadingActivities={isLoadingActivities}
          />
        )}

        {activeTab === 'settings' && (
          <div>
            <div className="admin-section-header">
              <h1 className="admin-section-header-title admin-type-page-title text-[#4d4d4d]">
                Settings
              </h1>
            </div>

            <section className="mb-8 border border-[#4d4d4d]/10 bg-white p-5">
              <div className="mb-4">
                <h2 className="admin-type-section-title text-[#4d4d4d]">
                  Storefront
                </h2>
                <p className="admin-type-supporting mt-1 text-sm text-[#4d4d4d]/60">
                  Choose which storefront data appears across your dashboard.
                </p>
              </div>

              {admin?.role === 'super_admin' ? (
                <select
                  id="admin-storefront-filter"
                  value={storefrontFilter}
                  onChange={(event) => {
                    setStorefrontFilter(event.target.value as 'all' | Storefront);
                    setViewingProduct(null);
                    setViewingOrder(null);
                    setConfirmDelete(null);
                    setConfirmPermanentDelete(null);
                    setConfirmDeleteOrder(null);
                  }}
                  className="w-full rounded-none border border-solid border-[#4d4d4d]/20 bg-white px-3 py-3 text-sm text-[#4d4d4d] outline-none focus:border-[#4d4d4d]"
                >
                  <option value="all">All Storefronts</option>
                  <option value="yotaabo">Yotaabo</option>
                  <option value="poshies">Poshies</option>
                </select>
              ) : (
                <div className="border border-[#4d4d4d]/10 bg-[#f5f5f5] px-3 py-3 text-sm font-medium text-[#4d4d4d]">
                  {admin?.storeSlug === 'poshies' ? 'Poshies' : 'Yotaabo'}
                  <p className="mt-1 text-xs font-normal text-[#4d4d4d]/50">
                    Your account is assigned to this storefront.
                  </p>
                </div>
              )}
            </section>

            {admin?.role === 'super_admin' && session?.access_token && (
              <section className="space-y-4">
                <div>
                  <h2 className="admin-type-section-title text-[#4d4d4d]">
                    Admin Management
                  </h2>
                  <p className="admin-type-supporting mt-1 text-sm text-[#4d4d4d]/60">
                    Manage administrator access and storefront assignments.
                  </p>
                </div>

                <AdminManagement accessToken={session.access_token} />
              </section>
            )}
          </div>
        )}
      </div>

      <AdminBottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <AdminProductDetailsModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onEdit={(product) => {
          setViewingProduct(null);
          setEditing(product);
          setFormOpen(true);
        }}
        onHide={setConfirmDelete}
        onShow={handleReactivateProduct}
        onDelete={(product) => {
          setViewingProduct(null);
          setConfirmPermanentDelete(product);
        }}
      />

      <AdminProductForm
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSaved={() => {
          invalidateProductsCache();
          void loadProducts();
          void loadActivities();
        }}
        productToEdit={editing}
        adminRole={admin?.role ?? null}
        storeSlug={
          admin?.storeSlug === 'yotaabo' || admin?.storeSlug === 'poshies'
            ? admin.storeSlug
            : null
        }
      />

      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Hide product?"
        message={
          confirmDelete
            ? `"${confirmDelete.name}" will be hidden from the site. You can reactivate it later.`
            : ''
        }
        confirmText="Hide"
        cancelText="Cancel"
        variant="grey"
        isLoading={isHidingProduct}
        onConfirm={() => {
          if (confirmDelete) void handleHideProduct(confirmDelete);
        }}
        onCancel={() => {
          if (!isHidingProduct) setConfirmDelete(null);
        }}
      />

      <ConfirmModal
        isOpen={!!confirmPermanentDelete}
        title="Delete product permanently?"
        message={
          confirmPermanentDelete
            ? `"${confirmPermanentDelete.name}" will be permanently deleted. This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="grey"
        isLoading={isDeletingProduct}
        onConfirm={() => {
          if (confirmPermanentDelete) {
            void handlePermanentDeleteProduct(confirmPermanentDelete);
          }
        }}
        onCancel={() => {
          if (!isDeletingProduct) setConfirmPermanentDelete(null);
        }}
      />

      <OrderDetailsModal
        order={viewingOrder}
        products={products.filter(
          (product): product is AdminRow & { id: string } =>
            typeof product.id === 'string',
        )}
        onClose={() => setViewingOrder(null)}
        onStatusChange={handleOrderStatusChange}
        onDelete={(order) => {
          setViewingOrder(null);
          setConfirmDeleteOrder(order);
        }}
      />

      <ConfirmModal
        isOpen={!!confirmDeleteOrder}
        title="Delete order permanently?"
        message={
          confirmDeleteOrder
            ? `Order ${confirmDeleteOrder.order_number} will be permanently removed. This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="grey"
        onConfirm={() => {
          if (confirmDeleteOrder) void handleDeleteOrder(confirmDeleteOrder);
        }}
        onCancel={() => setConfirmDeleteOrder(null)}
      />
    </main>
  );
}
