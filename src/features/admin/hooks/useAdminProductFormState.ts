import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { AdminProduct } from '../components/AdminProductForm';
import type { AdminRow } from '../types/admin.types';

export function useAdminProductFormState(isAdmin: boolean | null, userId: string | null | undefined) {
  const formUserId = isAdmin === true ? userId ?? null : null;

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [formStateReady, setFormStateReady] = useState(false);
  const restoredFormScopeRef = useRef<string | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<AdminRow | null>(null);
  const [confirmPermanentDelete, setConfirmPermanentDelete] = useState<AdminRow | null>(null);
  const [isHidingProduct, setIsHidingProduct] = useState(false);
  const isHidingProductRef = useRef(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const isDeletingProductRef = useRef(false);
  const [viewingProduct, setViewingProduct] = useState<AdminRow | null>(null);

  useLayoutEffect(() => {
    if (!formUserId) {
      restoredFormScopeRef.current = null;
      setFormOpen(false);
      setEditing(null);
      setFormStateReady(false);
      setConfirmDelete(null);
      setConfirmPermanentDelete(null);
      setIsDeletingProduct(false);
      setViewingProduct(null);
      return;
    }

    setFormStateReady(false);
    try {
      const formOpenKey = `yotaabo-admin-product-form-open:${formUserId}`;
      const editingKey = `yotaabo-admin-product-editing:${formUserId}`;
      const savedOpen = sessionStorage.getItem(formOpenKey) === 'true';
      const savedEditing = sessionStorage.getItem(editingKey);
      let restoredEditing: AdminProduct | null = null;
      if (savedEditing) {
        try {
          restoredEditing = JSON.parse(savedEditing) as AdminProduct;
        } catch {
          sessionStorage.removeItem(editingKey);
        }
      }
      setFormOpen(savedOpen);
      setEditing(restoredEditing);
    } catch {
      setFormOpen(false);
      setEditing(null);
    }
    restoredFormScopeRef.current = formUserId;
    setFormStateReady(true);
  }, [formUserId]);

  useEffect(() => {
    if (!formUserId || !formStateReady || restoredFormScopeRef.current !== formUserId) return;
    try {
      const formOpenKey = `yotaabo-admin-product-form-open:${formUserId}`;
      const editingKey = `yotaabo-admin-product-editing:${formUserId}`;
      if (formOpen) {
        sessionStorage.setItem(formOpenKey, 'true');
        if (editing) sessionStorage.setItem(editingKey, JSON.stringify(editing));
        else sessionStorage.removeItem(editingKey);
      } else {
        sessionStorage.removeItem(formOpenKey);
        sessionStorage.removeItem(editingKey);
      }
    } catch {
      // Storage may be unavailable; the admin form remains usable.
    }
  }, [formUserId, formStateReady, formOpen, editing]);

  return {
    formOpen,
    setFormOpen,
    editing,
    setEditing,
    confirmDelete,
    setConfirmDelete,
    confirmPermanentDelete,
    setConfirmPermanentDelete,
    isHidingProduct,
    setIsHidingProduct,
    isHidingProductRef,
    isDeletingProduct,
    setIsDeletingProduct,
    isDeletingProductRef,
    viewingProduct,
    setViewingProduct,
  };
}
