import { useState, useEffect, useRef } from 'react';
import { FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import MenuIcon from '../../../components/MenuIcon';
import { formatPrice } from '../../../utils/formatPrice';
import { getCategoryTheme } from '../../../utils/categoryTheme';
import Modal from '../../../components/Modal';
import type { AdminRow } from '../types/admin.types';

type AdminProductDetailsModalProps = {
  product: AdminRow | null;
  onClose: () => void;
  onEdit: (product: AdminRow) => void;
  onHide: (product: AdminRow) => void;
  onShow: (product: AdminRow) => void;
  onDelete: (product: AdminRow) => void;
};

export default function AdminProductDetailsModal({
  product,
  onClose,
  onEdit,
  onHide,
  onShow,
  onDelete,
}: AdminProductDetailsModalProps) {
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
  }, [product?.id]);

  if (!product) return null;

  const theme = getCategoryTheme(product.category);

  return (
    <Modal isOpen={!!product} onClose={onClose}>
      <div className="relative">
        <div className="absolute right-4 top-4 z-20" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
            className="flex h-10 w-10 items-center justify-center border-0 admin-color-primary backdrop-blur-sm transition-colors"
            aria-label="Product options"
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
              backgroundColor: 'color-mix(in srgb, var(--admin-surface) 80%, transparent)',
            }}
          >
            <MenuIcon isOpen={isMenuOpen} isHovered={menuHovered} size={22} />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 top-full z-30 mt-1 w-44 shadow-xl"
              style={{
                backgroundColor: 'var(--admin-surface)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--admin-border-subtle)',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (product.is_active) onHide(product);
                  else onShow(product);
                }}
                className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left admin-type-body text-sm admin-color-primary transition-colors"
                style={{ WebkitAppearance: 'none', appearance: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--admin-surface-subtle)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {product.is_active ? (
                  <><FiEyeOff size={14} /> Hide from store</>
                ) : (
                  <><FiEye size={14} /> Show in store</>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete(product);
                }}
                className="flex w-full items-center gap-3 border-0 border-t bg-transparent px-4 py-3 text-left admin-type-body text-sm transition-colors"
                style={{
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  borderTopColor: 'var(--admin-border-subtle)',
                  color: 'var(--admin-status-red)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--admin-status-red) 8%, transparent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <FiTrash2 size={14} /> Delete permanently
              </button>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div
            className={`h-48 w-full overflow-hidden ${
              product.is_active ? theme.placeholderColor : 'bg-[var(--admin-surface-subtle)]'
            }`}
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-contain p-6"
              />
            )}
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[var(--admin-charcoal-40)]">
                Name
              </span>
              <div className="w-full bg-[var(--admin-surface)] px-4 py-3 admin-type-body admin-color-primary">
                {product.name}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[var(--admin-charcoal-40)]">
                  Price (R)
                </span>
                <div className="w-full bg-[var(--admin-surface)] px-4 py-3 admin-type-body admin-color-primary">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[var(--admin-charcoal-40)]">
                  Category
                </span>
                <div className="w-full bg-[var(--admin-surface)] px-4 py-3 admin-type-body admin-color-primary">
                  {product.category}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[var(--admin-charcoal-40)]">
                  Supplier Cost (R)
                </span>
                <div className="w-full bg-[var(--admin-surface)] px-4 py-3 admin-type-body admin-color-primary">
                  {product.supplier_cost != null
                    ? formatPrice(product.supplier_cost)
                    : 'Not recorded'}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[var(--admin-charcoal-40)]">
                  SKU
                </span>
                <div className="w-full bg-[var(--admin-surface)] px-4 py-3 admin-type-body admin-color-primary">
                  {product.sku || 'Not assigned'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[var(--admin-charcoal-40)]">
                  Subcategory
                </span>
                <div className="w-full bg-[var(--admin-surface)] px-4 py-3 admin-type-body admin-color-primary">
                  {product.subcategory}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[var(--admin-charcoal-40)]">
                  Status
                </span>
                <div className={`w-full bg-[var(--admin-surface)] px-4 py-3 admin-type-body ${
                  product.is_active ? 'admin-color-primary' : 'text-[var(--admin-status-red)]'
                }`}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>

            <div>
              <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[var(--admin-charcoal-40)]">
                Description
              </span>
              <div className="w-full bg-[var(--admin-surface)] px-4 py-3 admin-type-body leading-[1.4] admin-color-primary">
                {product.description || 'No description for this product.'}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 flex-1 items-center justify-center border-0 bg-[var(--admin-surface)] admin-type-body admin-color-primary transition-colors"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--admin-surface-subtle)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--admin-surface)'; }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => { onClose(); onEdit(product); }}
              className="flex h-12 flex-1 items-center justify-center border border-solid admin-type-body text-white transition-colors"
              style={{
                backgroundColor: 'var(--admin-text-primary)',
                borderColor: 'var(--admin-text-primary)',
                color: 'var(--admin-bg)',
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
