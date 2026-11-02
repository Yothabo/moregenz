import { FiSearch } from 'react-icons/fi';
import type { AdminPageHeaderProps } from '../types/admin.types';

export default function AdminPageHeader({
  title,
  eyebrow,
  description,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  onSearchFocus,
  action,
  filters,
}: AdminPageHeaderProps) {
  return (
    <div className="admin-section-header">
      <div>
        {eyebrow && (
          <p className="admin-type-supporting uppercase tracking-[0.12em] text-[#4d4d4d]/45">
            {eyebrow}
          </p>
        )}
        <h1 className="admin-section-header-title admin-type-page-title text-[#4d4d4d]">
          {title}
        </h1>
        {description && (
          <p className="admin-type-body text-[#4d4d4d]/65">
            {description}
          </p>
        )}
      </div>

      {(searchPlaceholder || action) && (
        <div className="admin-section-header-row flex w-full items-center">
          {searchPlaceholder && (
            <div className="admin-search-control flex min-w-0 flex-1 items-center border border-black/10 bg-[#f5f5f5]">
              <FiSearch size={16} className="shrink-0 text-[#4d4d4d]/40" />

              <input
                type="text"
                value={searchValue ?? ''}
                onFocus={onSearchFocus}
                onChange={(event) => onSearchChange?.(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="admin-type-body w-full min-w-0 border-0 bg-transparent text-[#4d4d4d] outline-none placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0"
              />
            </div>
          )}

          {action}
        </div>
      )}

      {filters && (
        <div className="admin-section-header-filters flex flex-wrap">
          {filters}
        </div>
      )}
    </div>
  );
}
