import { useCallback, useEffect, useState } from 'react';

type Storefront = 'yotaabo' | 'poshies';

type Subcategory = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
  subcategories: Subcategory[];
};

type Editor =
  | { kind: 'new-category' }
  | { kind: 'new-subcategory'; categoryId: string }
  | { kind: 'edit-category'; id: string }
  | { kind: 'edit-subcategory'; id: string; categoryId: string };

type Props = {
  accessToken: string;
  adminRole: string;
  assignedStorefront: Storefront | null;
};

const inputClass =
  'w-full border border-[#4d4d4d]/20 bg-white px-3 py-3 text-sm text-[#4d4d4d] outline-none focus:border-[#4d4d4d]';

const buttonClass =
  'border border-[#4d4d4d]/20 px-3 py-2 text-xs font-medium text-[#4d4d4d] transition-colors hover:bg-[#4d4d4d]/5 disabled:opacity-50';

export default function AdminCategories({
  accessToken,
  adminRole,
  assignedStorefront,
}: Props) {
  const isSuperAdmin = adminRole === 'super_admin';
  const [storefront, setStorefront] = useState<Storefront>(
    assignedStorefront || 'yotaabo',
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editor, setEditor] = useState<Editor | null>(null);
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState('0');

  useEffect(() => {
    if (!isSuperAdmin && assignedStorefront) {
      setStorefront(assignedStorefront);
    }
  }, [isSuperAdmin, assignedStorefront]);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/categories?storefront=${storefront}&scope=admin`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to load categories.');
      }

      setCategories(data.categories || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load categories.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, storefront]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  function openEditor(nextEditor: Editor, currentName = '', currentSort = 0) {
    setEditor(nextEditor);
    setName(currentName);
    setSortOrder(String(currentSort));
    setError('');
    setNotice('');
  }

  function closeEditor() {
    setEditor(null);
    setName('');
    setSortOrder('0');
  }

  async function submitEditor(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedSortOrder = Number(sortOrder);

    if (!name.trim()) {
      setError('Enter a category name.');
      return;
    }

    if (!Number.isSafeInteger(parsedSortOrder)) {
      setError('Sort order must be a whole number.');
      return;
    }

    if (!editor) return;

    let method: 'POST' | 'PATCH' = 'POST';
    let body: Record<string, unknown> = {
      storefront,
      name: name.trim(),
      sort_order: parsedSortOrder,
    };

    if (editor.kind === 'new-category') {
      body.action = 'create-category';
    } else if (editor.kind === 'new-subcategory') {
      body.action = 'create-subcategory';
      body.category_id = editor.categoryId;
    } else if (editor.kind === 'edit-category') {
      method = 'PATCH';
      body.action = 'update-category';
      body.id = editor.id;
    } else {
      method = 'PATCH';
      body.action = 'update-subcategory';
      body.id = editor.id;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/categories', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to save changes.');
      }

      closeEditor();
      setNotice('Catalogue changes saved.');
      await loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save changes.');
    } finally {
      setIsSaving(false);
    }
  }

  async function changeStatus(
    entity: 'category' | 'subcategory',
    id: string,
    isActive: boolean,
  ) {
    setError('');
    setNotice('');

    try {
      const response = await fetch('/api/categories', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          action: 'set-status',
          storefront,
          entity,
          id,
          is_active: isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to update status.');
      }

      setNotice(`${entity === 'category' ? 'Category' : 'Subcategory'} ${isActive ? 'activated' : 'deactivated'}.`);
      await loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update status.');
    }
  }

  function editCategory(category: Category) {
    openEditor(
      { kind: 'edit-category', id: category.id },
      category.name,
      category.sort_order,
    );
  }

  function editSubcategory(categoryId: string, subcategory: Subcategory) {
    openEditor(
      { kind: 'edit-subcategory', id: subcategory.id, categoryId },
      subcategory.name,
      subcategory.sort_order,
    );
  }

  const editorTitle = editor
    ? editor.kind === 'new-category'
      ? 'New category'
      : editor.kind === 'new-subcategory'
        ? 'New subcategory'
        : editor.kind === 'edit-category'
          ? 'Edit category'
          : 'Edit subcategory'
    : '';

  return (
    <section className="mt-8 space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="admin-type-section-title text-[#4d4d4d]">
            Catalogue Categories
          </h2>
          <p className="admin-type-supporting mt-1 text-sm text-[#4d4d4d]/60">
            Manage the categories and subcategories shown on each storefront.
          </p>
        </div>

        {isSuperAdmin && (
          <select
            aria-label="Category storefront"
            value={storefront}
            onChange={(event) => {
              setStorefront(event.target.value as Storefront);
              closeEditor();
              setNotice('');
            }}
            className={`${inputClass} sm:max-w-48`}
          >
            <option value="yotaabo">Yotaabo</option>
            <option value="poshies">Poshies</option>
          </select>
        )}
      </div>

      {error && (
        <div role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {notice && (
        <div role="status" className="border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {notice}
        </div>
      )}

      {editor && (
        <form
          onSubmit={submitEditor}
          className="space-y-4 border border-[#4d4d4d]/15 bg-[#f8f8f8] p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-[#4d4d4d]">
              {editorTitle}
            </h3>
            <button type="button" onClick={closeEditor} className={buttonClass}>
              Cancel
            </button>
          </div>

          <label className="block space-y-1">
            <span className="text-xs font-medium text-[#4d4d4d]/70">Name</span>
            <input
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={120}
              required
              className={inputClass}
              placeholder="Enter a name"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-medium text-[#4d4d4d]/70">Display order</span>
            <input
              type="number"
              step="1"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              required
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#4d4d4d] px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => openEditor({ kind: 'new-category' })}
          className={buttonClass}
        >
          + Add category
        </button>
      </div>

      {isLoading ? (
        <p className="py-8 text-center text-sm text-[#4d4d4d]/60">
          Loading categories...
        </p>
      ) : categories.length === 0 ? (
        <div className="border border-dashed border-[#4d4d4d]/20 px-4 py-10 text-center">
          <p className="text-sm text-[#4d4d4d]/60">No categories found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((category) => (
            <article
              key={category.id}
              className="border border-[#4d4d4d]/15 bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#4d4d4d]">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#4d4d4d]/50">
                    Order: {category.sort_order} · {category.subcategories.length} subcategories
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs ${category.is_active ? 'text-green-700' : 'text-[#4d4d4d]/45'}`}>
                    {category.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    type="button"
                    onClick={() => editCategory(category)}
                    className={buttonClass}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void changeStatus('category', category.id, !category.is_active)}
                    className={buttonClass}
                  >
                    {category.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditor({
                      kind: 'new-subcategory',
                      categoryId: category.id,
                    })}
                    className={buttonClass}
                  >
                    + Subcategory
                  </button>
                </div>
              </div>

              {category.subcategories.length > 0 && (
                <div className="border-t border-[#4d4d4d]/10 bg-[#fafafa] px-4 py-2">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex flex-wrap items-center justify-between gap-2 border-b border-[#4d4d4d]/5 py-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm text-[#4d4d4d]">
                          {subcategory.name}
                        </p>
                        <p className="mt-1 text-xs text-[#4d4d4d]/45">
                          Order: {subcategory.sort_order} · {subcategory.is_active ? 'Active' : 'Inactive'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => editSubcategory(category.id, subcategory)}
                          className={buttonClass}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void changeStatus('subcategory', subcategory.id, !subcategory.is_active)}
                          className={buttonClass}
                        >
                          {subcategory.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
