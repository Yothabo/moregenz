import AdminProductForm, { type AdminProduct } from './AdminProductForm';
import AdminConfirmModal from './AdminConfirmModal';
import AdminOrderDetailsModal from './AdminOrderDetailsModal';
import AdminProductDetailsModal from './AdminProductDetailsModal';
import { invalidateProductsCache } from '../../../hooks/useProducts';
import type { AdminRow, Order, OrderStatus } from '../types/admin.types';

type AdminModalsProps = {
  viewingProduct: AdminRow | null;
  setViewingProduct: (v: AdminRow | null) => void;
  setEditing: (v: AdminProduct | null) => void;
  setFormOpen: (v: boolean) => void;
  setConfirmDelete: (v: AdminRow | null) => void;
  setConfirmPermanentDelete: (v: AdminRow | null) => void;
  handleReactivateProduct: (p: AdminRow) => Promise<void>;

  formOpen: boolean;
  editing: AdminProduct | null;
  loadProducts: () => Promise<void>;
  loadActivities: () => Promise<void>;
  adminRole: 'super_admin' | 'store_admin' | null | undefined;
  adminStoreSlug: string | null | undefined;

  confirmDelete: AdminRow | null;
  isHidingProduct: boolean;
  handleHideProduct: (p: AdminRow) => Promise<void>;

  confirmPermanentDelete: AdminRow | null;
  isDeletingProduct: boolean;
  handlePermanentDeleteProduct: (p: AdminRow) => Promise<void>;

  viewingOrder: Order | null;
  setViewingOrder: (v: Order | null) => void;
  setConfirmDeleteOrder: (v: Order | null) => void;
  products: AdminRow[];
  handleOrderStatusChange: (o: Order, s: OrderStatus) => Promise<void>;

  confirmDeleteOrder: Order | null;
  handleDeleteOrder: (o: Order) => Promise<void>;
};

export default function AdminModals(props: AdminModalsProps) {
  return (
    <>
      <AdminProductDetailsModal
        product={props.viewingProduct}
        onClose={() => props.setViewingProduct(null)}
        onEdit={(product) => {
          props.setViewingProduct(null);
          props.setEditing(product);
          props.setFormOpen(true);
        }}
        onHide={props.setConfirmDelete}
        onShow={props.handleReactivateProduct}
        onDelete={(product) => {
          props.setViewingProduct(null);
          props.setConfirmPermanentDelete(product);
        }}
      />

      <AdminProductForm
        isOpen={props.formOpen}
        onClose={() => {
          props.setFormOpen(false);
          props.setEditing(null);
        }}
        onSaved={() => {
          invalidateProductsCache();
          void props.loadProducts();
          void props.loadActivities();
        }}
        productToEdit={props.editing}
        adminRole={props.adminRole ?? null}
        storeSlug={
          props.adminStoreSlug === 'yotaabo' || props.adminStoreSlug === 'poshies'
            ? props.adminStoreSlug
            : null
        }
      />

      <AdminConfirmModal
        isOpen={!!props.confirmDelete}
        title="Hide product?"
        message={
          props.confirmDelete
            ? `"${props.confirmDelete.name}" will be hidden from the site. You can reactivate it later.`
            : ''
        }
        confirmText="Hide"
        cancelText="Cancel"
        variant="grey"
        isLoading={props.isHidingProduct}
        onConfirm={() => {
          if (props.confirmDelete) void props.handleHideProduct(props.confirmDelete);
        }}
        onCancel={() => {
          if (!props.isHidingProduct) props.setConfirmDelete(null);
        }}
      />

      <AdminConfirmModal
        isOpen={!!props.confirmPermanentDelete}
        title="Delete product permanently?"
        message={
          props.confirmPermanentDelete
            ? `"${props.confirmPermanentDelete.name}" will be permanently deleted. This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="grey"
        isLoading={props.isDeletingProduct}
        onConfirm={() => {
          if (props.confirmPermanentDelete) void props.handlePermanentDeleteProduct(props.confirmPermanentDelete);
        }}
        onCancel={() => {
          if (!props.isDeletingProduct) props.setConfirmPermanentDelete(null);
        }}
      />

      <AdminOrderDetailsModal
        order={props.viewingOrder}
        products={props.products.filter(
          (product): product is AdminRow & { id: string } => typeof product.id === 'string',
        )}
        onClose={() => props.setViewingOrder(null)}
        onStatusChange={props.handleOrderStatusChange}
        onDelete={(order: Order) => {
          props.setViewingOrder(null);
          props.setConfirmDeleteOrder(order);
        }}
      />

      <AdminConfirmModal
        isOpen={!!props.confirmDeleteOrder}
        title="Delete order permanently?"
        message={
          props.confirmDeleteOrder
            ? `Order ${props.confirmDeleteOrder.order_number} will be permanently removed. This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="grey"
        onConfirm={() => {
          if (props.confirmDeleteOrder) void props.handleDeleteOrder(props.confirmDeleteOrder);
        }}
        onCancel={() => props.setConfirmDeleteOrder(null)}
      />
    </>
  );
}
