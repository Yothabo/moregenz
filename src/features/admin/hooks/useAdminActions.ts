import type { AdminRow, Order, OrderStatus } from '../types/admin.types';

type Args = {
  hideProduct: (product: AdminRow) => Promise<boolean>;
  deleteProduct: (product: AdminRow) => Promise<boolean>;
  reactivateProduct: (product: AdminRow) => Promise<boolean>;
  changeOrderStatus: (order: Order, status: OrderStatus) => Promise<boolean>;
  deleteOrder: (order: Order) => Promise<boolean>;
  loadActivities: () => Promise<void>;
  setters: {
    setConfirmDelete: (v: AdminRow | null) => void;
    setConfirmPermanentDelete: (v: AdminRow | null) => void;
    setIsHidingProduct: (v: boolean) => void;
    isHidingProductRef: { current: boolean };
    setIsDeletingProduct: (v: boolean) => void;
    isDeletingProductRef: { current: boolean };
    setViewingProduct: (v: AdminRow | null) => void;
    setViewingOrder: (v: Order | null) => void;
    setConfirmDeleteOrder: (v: Order | null) => void;
    setCurrentPage: (v: number) => void;
    setActiveTab: (v: string) => void;
  };
};

export function useAdminActions({
  hideProduct,
  deleteProduct,
  reactivateProduct,
  changeOrderStatus,
  deleteOrder,
  loadActivities,
  setters,
}: Args) {
  async function handleHideProduct(product: AdminRow) {
    if (setters.isHidingProductRef.current) return;
    setters.isHidingProductRef.current = true;
    setters.setIsHidingProduct(true);
    try {
      const success = await hideProduct(product);
      if (success) {
        setters.setConfirmDelete(null);
        setters.setViewingProduct(null);
        void loadActivities();
      }
    } finally {
      setters.isHidingProductRef.current = false;
      setters.setIsHidingProduct(false);
    }
  }

  async function handlePermanentDeleteProduct(product: AdminRow) {
    if (setters.isDeletingProductRef.current) return;
    setters.isDeletingProductRef.current = true;
    setters.setIsDeletingProduct(true);
    try {
      const success = await deleteProduct(product);
      if (success) {
        setters.setConfirmPermanentDelete(null);
        setters.setViewingProduct(null);
        void loadActivities();
      }
    } finally {
      setters.isDeletingProductRef.current = false;
      setters.setIsDeletingProduct(false);
    }
  }

  async function handleReactivateProduct(product: AdminRow) {
    const success = await reactivateProduct(product);
    if (success) {
      setters.setViewingProduct(null);
      void loadActivities();
    }
  }

  async function handleOrderStatusChange(order: Order, newStatus: OrderStatus) {
    const success = await changeOrderStatus(order, newStatus);
    if (success) {
      setters.setViewingOrder(null);
      void loadActivities();
    }
  }

  async function handleDeleteOrder(order: Order) {
    const success = await deleteOrder(order);
    if (success) {
      setters.setConfirmDeleteOrder(null);
      setters.setViewingOrder(null);
      void loadActivities();
    }
  }

  function handleOverviewSearch() {
    setters.setCurrentPage(1);
    setters.setActiveTab('products');
  }

  function handleViewOrders() {
    setters.setActiveTab('orders');
  }

  return {
    handleHideProduct,
    handlePermanentDeleteProduct,
    handleReactivateProduct,
    handleOrderStatusChange,
    handleDeleteOrder,
    handleOverviewSearch,
    handleViewOrders,
  };
}
