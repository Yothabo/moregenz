import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import type { AdminRecord } from '../../components/AdminList';

type UseAdminManagementArgs = {
  accessToken: string;
};

export function useAdminManagement({ accessToken }: UseAdminManagementArgs) {
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [storeSlug, setStoreSlug] = useState<'yotaabo' | 'poshies'>('yotaabo');
  const [loadError, setLoadError] = useState('');

  const loadAdmins = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const response = await fetch('/api/admins', {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to load admins');
      const data = await response.json();
      setAdmins(Array.isArray(data.admins) ? data.admins : []);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load admins');
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadAdmins();
  }, [loadAdmins]);

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsInviting(true);
    try {
      const response = await fetch('/api/admins/invite', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, store_slug: storeSlug }),
      });
      if (!response.ok) throw new Error('Failed to invite');
      toast.success('Invitation sent');
      setEmail('');
      await loadAdmins();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to invite');
    } finally {
      setIsInviting(false);
    }
  };

  const handleDeleteAdmin = async (admin: AdminRecord) => {
    setActionLoadingId(admin.id);
    try {
      const response = await fetch(`/api/admins?id=${admin.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to delete admin');
      toast.success('Admin removed');
      await loadAdmins();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete admin');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleResend = async (admin: AdminRecord) => {
    setActionLoadingId(admin.id);
    try {
      const response = await fetch('/api/admins/invitations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: admin.id, action: 'resend' }),
      });
      if (!response.ok) throw new Error('Failed to resend');
      toast.success('Invitation resent');
      await loadAdmins();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to resend');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRevoke = async (admin: AdminRecord) => {
    setActionLoadingId(admin.id);
    try {
      const response = await fetch('/api/admins/invitations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: admin.id, action: 'revoke' }),
      });
      if (!response.ok) throw new Error('Failed to revoke');
      toast.success('Invitation revoked');
      await loadAdmins();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to revoke');
    } finally {
      setActionLoadingId(null);
    }
  };

  return {
    admins, isLoading, isInviting, actionLoadingId,
    email, setEmail,
    storeSlug, setStoreSlug,
    loadError,
    loadAdmins,
    handleInvite,
    handleDeleteAdmin,
    handleResend,
    handleRevoke,
  };
}
