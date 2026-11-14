import { useMemo } from 'react';
import AccentButton from './AccentButton';
import CategoryForm from '../settings/categories/CategoryForm';
import CategoryRow from '../settings/categories/CategoryRow';
import { useAdminCategories } from '../settings/categories/useAdminCategories';
import type { CategoriesProps, Storefront } from '../settings/categories/types';

export default function AdminCategories({ accessToken, adminRole, assignedStorefront }: CategoriesProps) {
  const c = useAdminCategories({ accessToken, adminRole, assignedStorefront });

  const sortedCategories = useMemo(() => {
    return [...c.categories].sort((a, b) => a.sort_order - b.sort_order);
  }, [c.categories]);


  return (
    <section className="mb-8" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-md)' }}>
      {/* Header row */}
      <div className="flex flex-col" style={{ gap: 'var(--admin-space-xs)' }}>
        <div className="flex items-center justify-between" style={{ gap: 'var(--admin-space-md)' }}>
          <h2
            style={{
              fontSize: 'var(--admin-size-heading-2)',
              fontWeight: 'var(--admin-weight-semibold)',
              color: 'var(--admin-text-primary)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Categories
          </h2>
          <AccentButton
            variant="dark"
            shape="pill"
            onClick={() => c.openEditor({ kind: 'new-category' })}
            ariaLabel="Add category"
          >
            + Category
          </AccentButton>
        </div>
        <p
          style={{
            fontSize: 'var(--admin-size-supporting)',
            color: 'var(--admin-text-secondary)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Manage product categories and subcategories per storefront.
        </p>
      </div>

      {c.isSuperAdmin && !assignedStorefront && (
        <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)', maxWidth: '280px' }}>
          <span className="admin-type-supporting text-xs text-[var(--admin-text-secondary)]">Storefront</span>
          <select
            value={c.storefront}
            onChange={(e) => c.setStorefront(e.target.value as Storefront)}
            className="border border-solid border-[var(--admin-border-strong)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
          >
            <option value="yotaabo">Yotaabo</option>
            <option value="poshies">Poshies</option>
          </select>
        </label>
      )}

      {c.error && <p className="text-sm" style={{ color: 'var(--admin-status-red)' }}>{c.error}</p>}
      {c.notice && <p className="text-sm" style={{ color: 'var(--admin-status-green)' }}>{c.notice}</p>}

      {/* Floating category form — driven by c.editor */}
      {c.editor && (() => {
        const ed = c.editor;

        // Find the category this form relates to (for edit or subcategory editors)
        const categoryIdForEdit =
          ed.kind === 'edit-category'
            ? ed.id
            : ed.kind === 'edit-subcategory' || ed.kind === 'new-subcategory'
              ? ed.categoryId
              : null;

        const editingCategory = categoryIdForEdit
          ? c.categories.find((cat) => cat.id === categoryIdForEdit) ?? null
          : null;

        // Position count: for new category, current total + 1 (new one goes to end)
        // For edit category, count of same-group categories
        const totalPositions =
          ed.kind === 'new-category'
            ? c.categories.length + 1
            : editingCategory
              ? c.categories.filter((cat) => cat.is_active === editingCategory.is_active).length
              : c.categories.length;

        // Initial sort order: for new category, end of list; for edit, current sort
        const initialSortOrder =
          ed.kind === 'new-category'
            ? c.categories.length + 1
            : editingCategory?.sort_order ?? 1;

        return (
          <CategoryForm
            editor={ed}
            category={editingCategory}
            totalPositions={totalPositions}
            initialSortOrder={initialSortOrder}
            isSaving={c.isSaving}
            onSubmit={c.submitEditor}
            onCancel={c.closeEditor}
          />
        );
      })()}

      {c.isLoading ? (
        <p
          style={{
            paddingBlock: 'var(--admin-space-lg)',
            textAlign: 'center',
            fontSize: 'var(--admin-size-supporting)',
            color: 'var(--admin-text-tertiary)',
          }}
        >
          Loading categories…
        </p>
      ) : sortedCategories.length === 0 ? (
        <p
          style={{
            paddingBlock: 'var(--admin-space-md)',
            paddingInline: 'var(--admin-space-md)',
            textAlign: 'center',
            fontSize: 'var(--admin-size-supporting)',
            color: 'var(--admin-text-tertiary)',
            borderRadius: 'var(--ds-radius-lg)',
            borderWidth: '1px',
            borderStyle: 'dashed',
            borderColor: 'var(--admin-border-subtle)',
            margin: 0,
          }}
        >
          No categories yet.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-md)' }}>
          {sortedCategories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onChangeStatus={c.changeStatus}
              onEditCategory={c.editCategory}
              onMoveToPosition={c.moveCategoryToPosition}
              groupPosition={sortedCategories.findIndex((cat) => cat.id === category.id) + 1}
              groupSize={sortedCategories.length}
            />
          ))}
        </div>
      )}
    </section>
  );
}
