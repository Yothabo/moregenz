import { useState, useEffect, useRef } from 'react';
import { FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import MenuIcon from './MenuIcon';
import { formatPrice } from '../utils/formatPrice';
import { getCategoryTheme } from '../utils/categoryTheme';
import Modal from './Modal';

type AdminRow = {
  id: string;
  name: string;
  price: number;
  category: 'His' | 'Hers' | 'Spaces';
  subcategory: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

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
        {/* Floating three-dots menu */}
        <div className="absolute right-4 top-4 z-20" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
            className="flex h-10 w-10 items-center justify-center border-0 bg-white/80 text-[#4d4d4d] backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Product options"
            style={{ WebkitAppearance: 'none', appearance: 'none' }}
          >
            <MenuIcon isOpen={isMenuOpen} isHovered={menuHovered} size={22} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-44 bg-white shadow-xl ring-1 ring-black/5">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (product.is_active) onHide(product);
                  else onShow(product);
                }}
                className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left font-heading text-sm text-[#4d4d4d] transition-colors hover:bg-[#f5f5f5]"
                style={{ WebkitAppearance: 'none', appearance: 'none' }}
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
                className="flex w-full items-center gap-3 border-0 border-t border-[#4d4d4d]/10 bg-transparent px-4 py-3 text-left font-heading text-sm text-red-500 transition-colors hover:bg-red-50"
                style={{ WebkitAppearance: 'none', appearance: 'none' }}
              >
                <FiTrash2 size={14} /> Delete permanently
              </button>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {/* Image */}
          <div
            className={`h-48 w-full overflow-hidden ${
              product.is_active ? theme.placeholderColor : 'bg-gray-300'
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

          {/* Read-only fields */}
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                Name
              </span>
              <div className="w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                {product.name}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Price (R)
                </span>
                <div className="w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Category
                </span>
                <div className="w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  {product.category}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Subcategory
                </span>
                <div className="w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d]">
                  {product.subcategory}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                  Status
                </span>
                <div className={`w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base ${
                  product.is_active ? 'text-[#4d4d4d]' : 'text-red-500'
                }`}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>

            <div>
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">
                Description
              </span>
              <div className="w-full bg-[#f5f5f5] px-4 py-3 font-heading text-base leading-[1.4] text-[#4d4d4d]">
                {product.description || 'No description for this product.'}
              </div>
            </div>
          </div>

          {/* Bottom actions — Cancel (secondary) + Edit (primary), using exact modal button classes */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 flex-1 items-center justify-center border-0 bg-[#f5f5f5] font-heading text-base text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => { onClose(); onEdit(product); }}
              className="flex h-12 flex-1 items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] font-heading text-base text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d]"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
