import { FiPlus } from 'react-icons/fi';
import AdminItemCard from '../../../components/AdminItemCard';
import AdminPageHeader from './AdminPageHeader';
import { formatPrice } from '../../../utils/formatPrice';
import { getCategoryTheme } from '../../../utils/categoryTheme';
import type {
  AdminRow,
  CategoryFilter,
} from '../types/admin.types';

type AdminProductsProps = {
  searchQuery: string;
  categoryFilter: CategoryFilter;
  filteredProducts: AdminRow[];
  paginatedProducts: AdminRow[];
  currentPage: number;
  totalPages: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: CategoryFilter) => void;
  onPageChange: (page: number) => void;
  onAddProduct: () => void;
  onSelectProduct: (product: AdminRow) => void;
};

export default function AdminProducts({
  searchQuery,
  categoryFilter,
  filteredProducts,
  paginatedProducts,
  currentPage,
  totalPages,
  onSearchChange,
  onCategoryChange,
  onPageChange,
  onAddProduct,
  onSelectProduct,
}: AdminProductsProps) {
  return (
    <>
      <AdminPageHeader
        title="Products"
        searchValue={searchQuery}
        searchPlaceholder="Search products"
        onSearchChange={onSearchChange}
        action={
          <button
            type="button"
            onClick={onAddProduct}
            className="admin-square-action inline-flex shrink-0 items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d]"
          >
            <FiPlus size={18} />
          </button>
        }
        filters={
          (['All', 'His', 'Hers', 'Spaces', 'Lounge', 'Hidden'] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`border-0 bg-transparent px-0 py-1 admin-type-body text-sm font-medium transition-colors ${
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

      <div className="admin-product-list-region">
        {filteredProducts.length === 0 ? (
          <p className="admin-empty-state admin-type-supporting text-center text-[#4d4d4d]/40">
            No products match your filters.
          </p>
        ) : (
          <div className="admin-product-list flex flex-col">
            {paginatedProducts.map((product) => {
              const theme = getCategoryTheme(product.category);
              const isActive = product.is_active;

              return (
                <AdminItemCard
                  key={product.id}
                  layout="product"
                  title={product.name}
                  status={isActive ? 'Active' : 'Inactive'}
                  price={formatPrice(product.price)}
                  meta={`${product.category} · ${product.subcategory}`}
                  onClick={() => onSelectProduct(product)}
                  ariaLabel={`View product ${product.name}`}
                  leftClassName={
                    isActive ? theme.placeholderColor : 'bg-gray-300'
                  }
                  leftContent={
                    product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain p-2"
                      />
                    ) : null
                  }
                  statusClassName={
                    isActive ? 'text-[#4d4d4d]/40' : 'text-red-500'
                  }
                  className={!isActive ? 'opacity-60' : ''}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-[#4d4d4d]/10 pt-6">
        <p className="admin-type-supporting text-sm font-medium text-[#4d4d4d]/50">
          Showing {Math.min((currentPage - 1) * 20 + 1, filteredProducts.length)}–{Math.min(currentPage * 20, filteredProducts.length)} of {filteredProducts.length}
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-0 bg-transparent px-2 py-1 admin-type-body text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 7) return true;
                if (page === 1 || page === totalPages) return true;
                return Math.abs(page - currentPage) <= 1;
              })
              .map((page, index, pages) => {
                const previousPage = pages[index - 1];
                const showEllipsis =
                  previousPage && page - previousPage > 1;

                return (
                  <span key={page} className="flex items-center gap-1">
                    {showEllipsis && (
                      <span className="admin-type-numeric text-sm text-[#4d4d4d]/40">
                        …
                      </span>
                    )}
                    <button
                      onClick={() => onPageChange(page)}
                      className={`min-w-[32px] border-0 bg-transparent px-2 py-1 admin-type-numeric text-sm font-medium transition-colors ${
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
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-0 bg-transparent px-2 py-1 admin-type-body text-sm font-medium text-[#4d4d4d]/60 transition-colors hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
