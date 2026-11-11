import { FiArrowUpRight, FiPlus, FiSearch, FiShoppingBag } from 'react-icons/fi';

type QuickActionsProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onAddProduct: () => void;
  onViewOrders?: () => void;
};

export default function QuickActionsCard({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onAddProduct,
  onViewOrders,
}: QuickActionsProps) {
  return (
    <section className="flex h-full flex-col gap-ds-3 rounded-ds-xl border border-design-border-secondary bg-design-surface p-ds-4 shadow-ds-xs sm:p-ds-5">
      <div className="flex items-center gap-ds-2 mb-ds-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-ds-md bg-design-surface-secondary text-design-icon-primary">
          <FiArrowUpRight size={18} aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-0">
          <h2 className="admin-font-heading text-ds-heading-3 text-design-text-primary">
            Quick actions
          </h2>
          <p className="admin-font-body text-ds-caption text-design-text-secondary">
            Get things done faster
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddProduct}
        className="flex min-h-12 items-center justify-between gap-ds-3 rounded-ds-md bg-design-fill-primary px-ds-3 text-left text-white transition-colors hover:bg-design-fill-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-design-focus-ring motion-reduce:transition-none mt-auto"
      >
        <span className="flex items-center gap-ds-2">
          <FiPlus size={17} aria-hidden="true" />
          <span className="text-ds-label font-medium">Add a product</span>
        </span>
        <FiArrowUpRight size={16} aria-hidden="true" />
      </button>

      <div className="flex min-h-11 items-center gap-ds-2 rounded-ds-md border border-design-border-primary bg-design-surface-secondary px-ds-3 transition-colors focus-within:border-design-focus-ring focus-within:ring-2 focus-within:ring-design-focus-ring">
        <FiSearch size={17} className="shrink-0 text-design-icon-secondary" aria-hidden="true" />
        <input
          type="search"
          aria-label="Search products"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          autoComplete="off"
          className="min-w-0 flex-1 border-0 bg-transparent py-ds-2 text-ds-body-sm text-design-text-primary outline-none placeholder:text-design-text-tertiary focus:border-0 focus:outline-none focus:ring-0"
        />
        <button
          type="button"
          onClick={onSearchFocus}
          aria-label="Open product search"
          className="flex size-8 shrink-0 items-center justify-center rounded-ds-sm text-design-icon-secondary transition-colors hover:bg-design-surface-secondary-hover hover:text-design-icon-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-design-focus-ring"
        >
          <FiArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={onViewOrders}
        disabled={!onViewOrders}
        className="flex min-h-11 items-center justify-between gap-ds-3 rounded-ds-md border border-design-border-secondary px-ds-3 text-left text-design-text-primary transition-colors hover:bg-design-surface-secondary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-design-focus-ring motion-reduce:transition-none"
      >
        <span className="flex items-center gap-ds-2">
          <FiShoppingBag size={17} className="text-design-icon-secondary" aria-hidden="true" />
          <span className="text-ds-label font-medium">Manage orders</span>
        </span>
        <FiArrowUpRight size={16} className="text-design-icon-secondary" aria-hidden="true" />
      </button>
    </section>
  );
}
