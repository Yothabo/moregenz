import { useState, useEffect, useRef } from 'react';
import { FiTrash2, FiCheck, FiX, FiMessageCircle } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';
import Modal from './Modal';
import MenuIcon from './MenuIcon';

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

type OrderDetailsModalProps = {
  order: Order | null;
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
  onClose,
  onStatusChange,
  onDelete,
}: OrderDetailsModalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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

  return (
    <Modal isOpen={!!order} onClose={onClose} maxWidth="max-w-2xl">
      <div className="relative">
        {/* Floating menu */}
        <div className="absolute right-4 top-4 z-20" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
            className="flex h-10 w-10 items-center justify-center border-0 bg-white/80 text-[#4d4d4d] backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Order options"
            style={{ WebkitAppearance: 'none', appearance: 'none' }}
          >
            <MenuIcon isOpen={isMenuOpen} isHovered={menuHovered} size={22} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-64 bg-white shadow-xl ring-1 ring-black/5">
              {/* Order info */}
              <div className="border-b border-[#4d4d4d]/10 px-4 py-3">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Order
                </p>
                <p className="mt-1 font-heading text-sm font-semibold text-[#4d4d4d]">
                  {order.order_number}
                </p>
                <p className="mt-1 text-[10px] text-[#4d4d4d]/50">{formattedDate}</p>
                <span className={`mt-1 inline-block text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
              </div>

              {/* Contact customer */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open(`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`, '_blank');
                }}
                className="flex w-full items-center gap-3 border-0 border-b border-[#4d4d4d]/10 bg-transparent px-4 py-3 text-left font-heading text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5]"
              >
                <FiMessageCircle size={14} /> Contact on WhatsApp
              </button>

              {/* Status transitions */}
              {order.status === 'pending' && (
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); onStatusChange(order, 'confirmed'); }}
                  className="flex w-full items-center gap-3 border-0 border-b border-[#4d4d4d]/10 bg-transparent px-4 py-3 text-left font-heading text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5]"
                >
                  <FiCheck size={14} /> Confirm order
                </button>
              )}
              {order.status === 'confirmed' && (
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); onStatusChange(order, 'delivered'); }}
                  className="flex w-full items-center gap-3 border-0 border-b border-[#4d4d4d]/10 bg-transparent px-4 py-3 text-left font-heading text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5]"
                >
                  <FiCheck size={14} /> Mark delivered
                </button>
              )}
              {(order.status === 'pending' || order.status === 'confirmed') && (
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); onStatusChange(order, 'cancelled'); }}
                  className="flex w-full items-center gap-3 border-0 border-b border-[#4d4d4d]/10 bg-transparent px-4 py-3 text-left font-heading text-sm text-red-500 transition-colors hover:bg-red-50"
                >
                  <FiX size={14} /> Cancel order
                </button>
              )}
              <button
                type="button"
                onClick={() => { setIsMenuOpen(false); onDelete(order); }}
                className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left font-heading text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                <FiTrash2 size={14} /> Delete permanently
              </button>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {/* Order header */}
          <div className="pr-12">
            <h2 className="font-heading text-2xl italic text-[#4d4d4d]">
              Order Details
            </h2>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
              {order.order_number}
            </p>
          </div>

          {/* Customer */}
          <div className="mt-6 flex flex-col gap-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
              Customer
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Name
                </span>
                <div className="w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  {order.customer_name}
                </div>
              </div>
              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Phone
                </span>
                <div className="w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  {order.customer_phone}
                </div>
              </div>
            </div>

            <div>
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                Order date
              </span>
              <div className="w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                {formattedDate}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mt-6">
            <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
              Items
            </h3>
            <div className="divide-y divide-[#4d4d4d]/10 border-y border-[#4d4d4d]/10">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-heading text-base text-[#4d4d4d]">{item.name}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#4d4d4d]/40">
                      Qty {item.qty} · {formatPrice(item.price)} each
                    </p>
                  </div>
                  <p className="font-heading text-base font-semibold text-[#8aa89b]">
                    {formatPrice(item.price * item.qty)}
                  </p>
                </div>
              ))}
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

          {/* Close */}
          <div className="mt-6 flex">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center border-0 bg-[#f5f5f5] font-heading text-base text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
