import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import toast from 'react-hot-toast';
import { ADMIN_STORAGE_KEYS } from '../constants/admin.constants';
import type { AdminRow } from '../types/admin.types';

export function useAdminProducts(isAdmin: boolean | null) {
  const adminRef = useRef(isAdmin);
  const adminGenerationRef = useRef(0);
  const previousAdminRef = useRef(isAdmin);

  if (previousAdminRef.current !== isAdmin) {
    adminGenerationRef.current += 1;
    previousAdminRef.current = isAdmin;
  }

  adminRef.current = isAdmin;
  const [products, setProducts] = useState<AdminRow[]>(() => {
    try {
      const cached = sessionStorage.getItem(
        ADMIN_STORAGE_KEYS.productsCache
      );
      const parsed = cached ? JSON.parse(cached) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem(
        ADMIN_STORAGE_KEYS.productsCache
      );
    } catch {
      return true;
    }
  });

  const [hasLoadedProducts, setHasLoadedProducts] = useState(false);

  const productsApi = useCallback(
    async (
      method: 'GET' | 'PATCH',
      body?: Record<string, string | boolean>,
      adminScope = false
    ) => {
      const {
        data: { session: currentSession },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !currentSession?.access_token) {
        throw new Error(
          'Your admin session has expired. Please sign in again.'
        );
      }

      const url = adminScope
        ? '/api/products?scope=admin'
        : '/api/products';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
          Accept: 'application/json',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The product request failed.');
      }

      return data;
    },
    []
  );

  const loadProducts = useCallback(async () => {
    const requestGeneration = adminGenerationRef.current;
    setIsLoading(true);
    try {
      const data = await productsApi('GET', undefined, true);
      const latestProducts = data.products ?? [];

      setProducts(latestProducts);

      try {
        sessionStorage.setItem(
          ADMIN_STORAGE_KEYS.productsCache,
          JSON.stringify(latestProducts)
        );
      } catch {
        // The dashboard remains usable when browser storage is unavailable.
      }
    } catch (error) {
      if (
        adminRef.current &&
        requestGeneration === adminGenerationRef.current
      ) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Unable to load products.'
        );
      }
    } finally {
      if (
        requestGeneration === adminGenerationRef.current &&
        adminRef.current
      ) {
        setIsLoading(false);
        setHasLoadedProducts(true);
      }
    }
  }, [productsApi]);

  const hideProduct = useCallback(
    async (product: AdminRow): Promise<boolean> => {
      try {
        await productsApi('PATCH', {
          action: 'set-status',
          id: product.id,
          is_active: false,
        });

        toast.success(`${product.name} hidden`);
        await loadProducts();
        return true;
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Unable to hide product.'
        );
        return false;
      }
    },
    [loadProducts, productsApi]
  );

  const reactivateProduct = useCallback(
    async (product: AdminRow): Promise<boolean> => {
      try {
        await productsApi('PATCH', {
          action: 'set-status',
          id: product.id,
          is_active: true,
        });

        toast.success(`${product.name} reactivated`);
        await loadProducts();
        return true;
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Unable to reactivate product.'
        );
        return false;
      }
    },
    [loadProducts, productsApi]
  );

  useEffect(() => {
    if (!isAdmin) {
      setIsLoading(false);
      setHasLoadedProducts(false);
      return;
    }

    void loadProducts();
  }, [isAdmin, loadProducts]);

  return {
    products,
    isLoading,
    hasLoadedProducts,
    loadProducts,
    hideProduct,
    reactivateProduct,
  };
}
