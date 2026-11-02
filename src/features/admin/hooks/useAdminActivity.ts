import { useCallback, useEffect, useState } from 'react';
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

export function useAdminActivity(isAdmin: boolean | null) {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  const loadActivities = useCallback(async () => {
    if (!isAdmin) return;

    setIsLoadingActivities(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw new Error('Your admin session has expired. Please sign in again.');
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

      setActivities(data.activities ?? []);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Unable to load activities.'
      );
    } finally {
      setIsLoadingActivities(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) {
      setActivities([]);
      setIsLoadingActivities(false);
      return;
    }

    void loadActivities();

    const interval = window.setInterval(() => {
      void loadActivities();
    }, 30000);

    return () => window.clearInterval(interval);
  }, [isAdmin, loadActivities]);

  return {
    activities,
    isLoadingActivities,
    loadActivities,
  };
}
