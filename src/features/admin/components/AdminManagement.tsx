import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import AdminInviteForm from './AdminInviteForm';
import AdminList, { type AdminRecord } from './AdminList';

type AdminManagementProps = {
  accessToken: string;
};

export default function AdminManagement({
  accessToken,
}: AdminManagementProps) {
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'super_admin' | 'store_admin'>(
    'store_admin',
  );
  const [storeSlug, setStoreSlug] = useState<'yotaabo' | 'poshies'>(
    'yotaabo',
  );
  const [loadError, setLoadError] = useState('');

  const loadAdmins = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');

    try {
      const response = await fetch('/api/admins', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to load administrators.');
      }

      setAdmins(Array.isArray(data?.admins) ? data.admins : []);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : 'Unable to load administrators.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadAdmins();
  }, [loadAdmins]);

  const handleInvite = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error('Enter an email address.');
      return;
    }

    setIsInviting(true);

    try {
      const response = await fetch('/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: normalizedEmail,
          role,
          storeSlug: role === 'store_admin' ? storeSlug : null,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send invitation.');
      }

      toast.success('Administrator invitation sent.');
      setEmail('');
      await loadAdmins();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Unable to send invitation.',
      );
    } finally {
      setIsInviting(false);
    }
  };

  const handleDeleteAdmin = async (admin: AdminRecord) => {
    const confirmed = window.confirm(
      `Permanently delete ${admin.email}? This removes their administrator access and Supabase Auth account. This action cannot be undone.`,
    );

    if (!confirmed) return;

    setActionLoadingId(admin.id);

    try {
      const response = await fetch('/api/admin-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ adminId: admin.id }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to delete administrator.');
      }

      if (data?.authUserCleanupPending) {
        toast.error(
          data.warning ||
          'Administrator access was removed, but Supabase Auth cleanup needs attention.',
        );
      } else {
        toast.success('Administrator deleted.');
      }

      await loadAdmins();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Unable to delete administrator.',
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleInvitationAction = async (
    admin: AdminRecord,
    action: 'resend' | 'revoke',
  ) => {
    if (action === 'revoke') {
      const confirmed = window.confirm(
        `Revoke the pending invitation for ${admin.email}? They will no longer be able to use that invitation link.`,
      );

      if (!confirmed) return;
    }

    setActionLoadingId(admin.id);

    try {
      const response = await fetch(`/api/admin-invitations-${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          adminId: admin.id,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `Unable to ${action} the administrator invitation.`,
        );
      }

      toast.success(
        action === 'resend'
          ? 'A new invitation has been sent.'
          : 'Invitation revoked.',
      );

      await loadAdmins();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Unable to ${action} the invitation.`,
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminInviteForm
        email={email}
        setEmail={setEmail}
        role={role}
        setRole={setRole}
        storeSlug={storeSlug}
        setStoreSlug={setStoreSlug}
        isInviting={isInviting}
        onSubmit={handleInvite}
      />

      <AdminList
        admins={admins}
        isLoading={isLoading}
        loadError={loadError}
        onRefresh={() => void loadAdmins()}
        onResend={(admin) => void handleInvitationAction(admin, 'resend')}
        onRevoke={(admin) => void handleInvitationAction(admin, 'revoke')}
        onDelete={(admin) => void handleDeleteAdmin(admin)}
        actionLoadingId={actionLoadingId}
      />
    </div>
  );
}
