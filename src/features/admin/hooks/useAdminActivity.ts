import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { supabase } from '../../../utils/supabase';
import toast from 'react-hot-toast';

export type AdminActivity = {
  id: string;
  event_type: string;
  entity_type: 'product' | 'order';
  entity_id: string | null;
  description: string;
  actor_email: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export function useAdminActivity(
  isAdmin: boolean | null,
  userId: string | null
) {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  const adminRef = useRef(isAdmin);
  const userIdRef = useRef(userId);
  const generationRef = useRef(0);
  const previousScopeRef = useRef({ isAdmin, userId });

  if (
    previousScopeRef.current.isAdmin !== isAdmin ||
    previousScopeRef.current.userId !== userId
  ) {
    generationRef.current += 1;
    previousScopeRef.current = { isAdmin, userId };
  }

  adminRef.current = isAdmin;
  userIdRef.current = userId;

  const loadActivities = useCallback(async () => {
    if (isAdmin !== true || !userId) return;

    const requestGeneration = generationRef.current;
    const requestUserId = userId;

    const isCurrentRequest = () =>
      requestGeneration === generationRef.current &&
      adminRef.current === true &&
      userIdRef.current === requestUserId;

    setIsLoadingActivities(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (
        sessionError ||
        !session?.access_token ||
        session.user.id !== requestUserId
      ) {
        throw new Error(
          'Your admin session has expired. Please sign in again.'
        );
      }

      const response = await fetch('/api/activity', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to load activities.');
      }

      if (!isCurrentRequest()) return;

      setActivities(
        Array.isArray(data.activities) ? data.activities : []
      );
    } catch (error) {
      if (isCurrentRequest()) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Unable to load activities.'
        );
      }
    } finally {
      if (isCurrentRequest()) {
        setIsLoadingActivities(false);
      }
    }
  }, [isAdmin, userId]);

  useLayoutEffect(() => {
    if (isAdmin !== true || !userId) {
      setActivities([]);
      setIsLoadingActivities(false);
      return;
    }

    setActivities([]);
    setIsLoadingActivities(true);

    void loadActivities();

    const interval = window.setInterval(() => {
      void loadActivities();
    }, 30000);

    return () => window.clearInterval(interval);
  }, [isAdmin, userId, loadActivities]);

  return {
    activities,
    isLoadingActivities,
    loadActivities,
  };
}
