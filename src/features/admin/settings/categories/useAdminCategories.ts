import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Category, Editor, Storefront, Subcategory } from './types';

type Args = {
  accessToken: string;
  adminRole: string;
  assignedStorefront: Storefront | null;
};

export function useAdminCategories({ accessToken, adminRole, assignedStorefront }: Args) {
  const isSuperAdmin = adminRole === 'super_admin';
  const [storefront, setStorefront] = useState<Storefront>(assignedStorefront ?? 'yotaabo');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editor, setEditor] = useState<Editor | null>(null);
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState('0');

  useEffect(() => {
    if (assignedStorefront) setStorefront(assignedStorefront);
  }, [assignedStorefront]);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/categories?storefront=${storefront}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to load categories');
      const data = await response.json();
      setCategories(Array.isArray(data.categories) ? data.categories : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
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

  async function submitEditor(payload: {
    name: string;
    sort_order: number;
    note: string;
    newSubcategories: { tempId: string; name: string }[];
    existingSubcategories: { tempId: string; id: string; name: string }[];
  }) {
    if (!editor) return;
    setIsSaving(true);
    setError('');
    setNotice('');

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      // For new-subcategory or edit-subcategory editors, we're editing a single subcategory
      if (editor.kind === 'new-subcategory' || editor.kind === 'edit-subcategory') {
        const isEdit = editor.kind === 'edit-subcategory';
        const response = await fetch('/api/categories/subcategories', {
          method: isEdit ? 'PATCH' : 'POST',
          headers,
          body: JSON.stringify({
            ...(isEdit ? { id: editor.id } : {}),
            category_id: editor.categoryId,
            name: payload.name,
          }),
        });
        if (!response.ok) throw new Error('Failed to save subcategory');
        setNotice('Saved successfully');
        closeEditor();
        await loadCategories();
        return;
      }

      // Category creation or editing
      if (editor.kind === 'new-category') {
        // 1. Create the category (hidden pending super admin)
        const catResponse = await fetch('/api/categories', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: payload.name,
            sort_order: payload.sort_order,
            storefront,
            is_active: false,
            note: payload.note,
          }),
        });
        if (!catResponse.ok) throw new Error('Failed to create category');
        const catData = await catResponse.json();
        const newCategoryId = catData.category?.id ?? catData.id;
        if (!newCategoryId) throw new Error('Category created but no ID returned');

        // 2. Create each new subcategory
        for (const sub of payload.newSubcategories) {
          const subResponse = await fetch('/api/categories/subcategories', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              category_id: newCategoryId,
              name: sub.name,
            }),
          });
          if (!subResponse.ok) throw new Error(`Failed to add subcategory "${sub.name}"`);
        }

        setNotice('Request submitted');
        closeEditor();
        await loadCategories();
        return;
      }

      if (editor.kind === 'edit-category') {
        // 1. Update the category name + sort_order
        const catResponse = await fetch('/api/categories', {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            id: editor.id,
            name: payload.name,
            sort_order: payload.sort_order,
          }),
        });
        if (!catResponse.ok) throw new Error('Failed to update category');

        // 2. Update each existing subcategory (rename)
        const original = categories.find((c) => c.id === editor.id);
        for (const sub of payload.existingSubcategories) {
          const originalSub = original?.subcategories.find((s) => s.id === sub.id);
          if (originalSub && originalSub.name !== sub.name) {
            const subResponse = await fetch('/api/categories/subcategories', {
              method: 'PATCH',
              headers,
              body: JSON.stringify({ id: sub.id, name: sub.name }),
            });
            if (!subResponse.ok) throw new Error('Failed to update subcategory');
          }
        }

        setNotice('Saved successfully');
        closeEditor();
        await loadCategories();
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  }

  async function changeStatus(
    kind: 'category' | 'subcategory',
    id: string,
    isActive: boolean,
    categoryId?: string,
  ) {
    setError('');
    setNotice('');
    try {
      const url = kind === 'category' ? '/api/categories' : '/api/categories/subcategories';
      const body: Record<string, unknown> = { id, is_active: !isActive };
      if (categoryId) body.category_id = categoryId;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to update');
      setNotice('Updated');
      await loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    }
  }

  async function moveCategoryToPosition(category: Category, targetPosition: number) {
    setError('');
    setNotice('');

    // Get categories in the same group (active vs inactive), sorted by sort_order
    const sameGroup = categories
      .filter((c) => c.is_active === category.is_active)
      .sort((a, b) => a.sort_order - b.sort_order);

    const currentIndex = sameGroup.findIndex((c) => c.id === category.id);
    if (currentIndex === -1) return;

    const targetIndex = targetPosition - 1; // 1-based → 0-based
    if (targetIndex === currentIndex) return;
    if (targetIndex < 0 || targetIndex >= sameGroup.length) return;

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      // Reorder the array locally: remove the category and insert at target
      const reordered = [...sameGroup];
      const [moved] = reordered.splice(currentIndex, 1);
      reordered.splice(targetIndex, 0, moved);

      // Now assign sequential sort_order values (starting from the group's min sort_order)
      const baseSortOrder = Math.min(...sameGroup.map((c) => c.sort_order));

      // Send PATCH for every category whose sort_order changed
      for (let i = 0; i < reordered.length; i++) {
        const newSortOrder = baseSortOrder + i;
        if (reordered[i].sort_order !== newSortOrder) {
          const response = await fetch('/api/categories', {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ id: reordered[i].id, sort_order: newSortOrder }),
          });
          if (!response.ok) throw new Error('Failed to reorder');
        }
      }

      setNotice('Order updated');
      await loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder');
    }
  }

  function editCategory(category: Category) {
    openEditor({ kind: 'edit-category', id: category.id }, category.name, category.sort_order);
  }

  function editSubcategory(categoryId: string, subcategory: Subcategory) {
    openEditor(
      { kind: 'edit-subcategory', id: subcategory.id, categoryId },
      subcategory.name,
      subcategory.sort_order,
    );
  }

  return {
    isSuperAdmin,
    storefront, setStorefront,
    categories, isLoading, isSaving,
    error, notice,
    editor,
    name, setName,
    sortOrder, setSortOrder,
    openEditor, closeEditor, submitEditor, changeStatus,
    moveCategoryToPosition,
    editCategory, editSubcategory,
  };
}
