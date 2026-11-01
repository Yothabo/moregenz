import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import toast from 'react-hot-toast';
import type {
  Order,
  OrderStatus,
} from '../types/admin.types';

export function useAdminOrders(isAdmin: boolean | null) {
  const adminRef = useRef(isAdmin);
  const adminGenerationRef = useRef(0);
  const previousAdminRef = useRef(isAdmin);

  if (previousAdminRef.current !== isAdmin) {
    adminGenerationRef.current += 1;
    previousAdminRef.current = isAdmin;
  }

  adminRef.current = isAdmin;
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [hasLoadedOrders, setHasLoadedOrders] = useState(false);

  const ordersApi = useCallback(
    async (
      method: 'GET' | 'PATCH' | 'DELETE',
      body?: Record<string, string>
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

      const response = await fetch('/api/orders', {
        method,
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The order request failed.');
      }

      return data;
    },
    []
  );

  const loadOrders = useCallback(async () => {
    const requestGeneration = adminGenerationRef.current;
    setIsLoadingOrders(true);

    try {
      const data = await ordersApi('GET');
      setOrders(data.orders ?? []);
    } catch (error) {
      if (
        adminRef.current &&
        requestGeneration === adminGenerationRef.current
      ) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Unable to load orders.'
        );
      }
    } finally {
      if (
        requestGeneration === adminGenerationRef.current &&
        adminRef.current
      ) {
        setIsLoadingOrders(false);
        setHasLoadedOrders(true);
      }
    }
  }, [ordersApi]);

  const changeOrderStatus = useCallback(
    async (order: Order, newStatus: OrderStatus): Promise<boolean> => {
      try {
        await ordersApi('PATCH', {
          id: order.id,
          status: newStatus,
        });

        toast.success(`Order ${order.order_number} → ${newStatus}`);
        await loadOrders();
        return true;
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Unable to update order.'
        );
        return false;
      }
    },
    [loadOrders, ordersApi]
  );

  const deleteOrder = useCallback(
    async (order: Order): Promise<boolean> => {
      try {
        await ordersApi('DELETE', { id: order.id });

        toast.success(`Order ${order.order_number} deleted`);
        await loadOrders();
        return true;
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Unable to delete order.'
        );
        return false;
      }
    },
    [loadOrders, ordersApi]
  );

  useEffect(() => {
    if (!isAdmin) {
      setIsLoadingOrders(false);
      setHasLoadedOrders(false);
      return;
    }

    void loadOrders();
  }, [isAdmin, loadOrders]);

  return {
    orders,
    isLoadingOrders,
    hasLoadedOrders,
    loadOrders,
    changeOrderStatus,
    deleteOrder,
  };
}
