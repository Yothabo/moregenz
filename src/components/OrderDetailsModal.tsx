import { useState, useEffect, useRef } from 'react';
import { FiTrash2, FiCheck, FiX, FiMenu } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { formatPrice } from '../utils/formatPrice';
import Modal from './Modal';
import CheckoutItemCard from './CheckoutItemCard';
import ProductModal from './ProductModal';
import { getCategoryTheme } from '../utils/categoryTheme';
import type { AdminProduct } from './AdminProductForm';

type OrderItem = {
  name: string;
  price: number;
  qty: number;
};

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  subtotal: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
};

type PreviewProduct = AdminProduct & { id: string };

type OrderDetailsModalProps = {
  order: Order | null;
  products: PreviewProduct[];
  onClose: () => void;
  onStatusChange: (order: Order, newStatus: Order['status']) => void;
  onDelete: (order: Order) => void;
};

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_COLORS: Record<Order['status'], string> = {
  pending: 'text-[#d97706]',
  confirmed: 'text-[#8aa89b]',
  delivered: 'text-[#4d4d4d]/60',
  cancelled: 'text-red-500',
};

export default function OrderDetailsModal({
  order,
  products,
  onClose,
  onStatusChange,
  onDelete,
}: OrderDetailsModalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PreviewProduct | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [order?.id]);

  if (!order) return null;

  const formattedDate = new Date(order.created_at).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const closeMenu = () => setIsMenuOpen(false);

  const actionClass =
    'flex min-h-12 w-full items-center gap-3 border-0 border-b border-[#4d4d4d]/10 bg-white px-4 py-3 text-left font-body text-sm text-[#4d4d4d]/80 transition-colors hover:bg-[#fafaf9] hover:text-[#4d4d4d]';

  return (
    <Modal isOpen={!!order} onClose={onClose} maxWidth="max-w-2xl" scrollable={false}>
      <div className="relative flex max-h-[85vh] flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-b border-[#4d4d4d]/10 bg-white px-6 py-4 sm:px-8">
          <h2 className="min-w-0 truncate font-heading text-2xl italic text-[#4d4d4d]">
            {order.customer_name}
          </h2>

<button
              type="button"
              onClick={onClose}
              aria-label="Close order details"
              className="flex h-10 w-10 items-center justify-center border-0 bg-transparent text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5]"
            >
              <FiX size={22} />
            </button>
        </div>

        {/* Scrollable order details */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Order number
                </span>
                <div className="w-full bg-[#fafaf9] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  {order.order_number}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Order date
                </span>
                <div className="w-full bg-[#fafaf9] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  {formattedDate}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="min-w-0">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Phone
                </span>
                <div className="w-full truncate bg-[#fafaf9] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  {order.customer_phone}
                </div>
              </div>

              <div className="min-w-0">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Status
                </span>
                <div className="w-full bg-[#fafaf9] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  <span className={STATUS_COLORS[order.status]}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mt-6">
            <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
              Items
            </h3>

            <div className="flex flex-col gap-2">
              {order.items.map((item, index) => {
                const matchedProduct = products.find(
                  (product) =>
                    product.name.trim().toLowerCase() ===
                    item.name.trim().toLowerCase(),
                );

                return (
                <CheckoutItemCard
                  key={`${order.id}-${index}`}
                  name={item.name}
                  onClick={
                    matchedProduct
                      ? () => setSelectedProduct(matchedProduct)
                      : undefined
                  }
                  leftContent={
                    <>
                      <span className="font-heading tabular-nums">{item.qty}</span>
                      {' × '}
                      <span className="font-heading tabular-nums">
                        {formatPrice(item.price)}
                      </span>
                    </>
                  }
                  rightContent={formatPrice(item.price * item.qty)}
                />
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                Subtotal
              </p>
              <p className="font-heading text-2xl font-semibold text-[#8aa89b]">
                {formatPrice(order.subtotal)}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky footer and upward-opening menu */}
        <div className="relative z-30 shrink-0 border-t border-[#4d4d4d]/10 bg-white px-6 py-4 sm:px-8">
          <div ref={menuRef} className="relative mx-auto w-full max-w-sm">
            {isMenuOpen && (
              <div
                role="menu"
                className="absolute bottom-full left-1/2 z-40 mb-2 w-64 -translate-x-1/2 border border-[#4d4d4d]/15 bg-white shadow-lg"
              >
                {order.status === 'pending' && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      closeMenu();
                      onStatusChange(order, 'confirmed');
                    }}
                    className={actionClass}
                  >
                    <FiCheck size={14} />
                    Confirm order
                  </button>
                )}

                {order.status === 'confirmed' && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      closeMenu();
                      onStatusChange(order, 'delivered');
                    }}
                    className={actionClass}
                  >
                    <FiCheck size={14} />
                    Mark delivered
                  </button>
                )}

                {(order.status === 'pending' || order.status === 'confirmed') && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      closeMenu();
                      onStatusChange(order, 'cancelled');
                    }}
                    className="flex min-h-12 w-full items-center gap-3 border-0 border-b border-[#4d4d4d]/10 bg-white px-4 py-3 text-left font-body text-sm text-red-500/80 transition-colors hover:bg-[#fafaf9] hover:text-red-600"
                  >
                    <FiX size={14} />
                    Unable to complete
                  </button>
                )}

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    closeMenu();
                    onDelete(order);
                  }}
                  className="flex min-h-12 w-full items-center gap-3 border-0 bg-white px-4 py-3 text-left font-body text-sm text-red-500/80 transition-colors hover:bg-[#fafaf9] hover:text-red-600"
                >
                  <FiTrash2 size={14} />
                  Delete permanently
                </button>
              </div>
            )}

            <div className="flex w-full items-stretch gap-2">
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 border-0 bg-[#f5f5f5] font-heading text-base text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]"
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
                aria-label="Order actions menu"
              >
                <FiMenu size={18} />
                Menu
              </button>

              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://wa.me/${order.customer_phone.replace(/\D/g, '')}`,
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
                className="flex h-12 w-12 shrink-0 items-center justify-center border-0 bg-[#f5f5f5] text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]"
                aria-label="Contact customer on WhatsApp"
              >
                <FaWhatsapp size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductModal
        product={
          selectedProduct
            ? {
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: String(selectedProduct.price),
                description: selectedProduct.description,
                image_url: selectedProduct.image_url,
              }
            : null
        }
        bgColor="bg-white"
        placeholderColor={
          selectedProduct
            ? getCategoryTheme(selectedProduct.category).placeholderColor
            : ''
        }
        accentColor={
          selectedProduct
            ? getCategoryTheme(selectedProduct.category).accentColor
            : 'text-[#8aa89b]'
        }
        isDark={false}
        mode="preview"
        onClose={() => setSelectedProduct(null)}
      />
    </Modal>
  );
}
