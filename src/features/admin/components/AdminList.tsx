export type AdminRecord = {
  id: string;
  email: string;
  role: 'super_admin' | 'store_admin';
  store_id: string | null;
  store_name: string | null;
  store_slug: string | null;
  is_active: boolean;
  created_at: string;
  invitation_id: string | null;
  invitation_status: 'pending' | 'accepted' | 'expired' | 'revoked' | null;
  invitation_created_at: string | null;
  invitation_expires_at: string | null;
};

type AdminListProps = {
  admins: AdminRecord[];
  isLoading: boolean;
  loadError: string;
  onRefresh: () => void;
  onResend: (admin: AdminRecord) => void;
  onRevoke: (admin: AdminRecord) => void;
  onDelete: (admin: AdminRecord) => void;
  actionLoadingId: string | null;
};

export default function AdminList({
  admins,
  isLoading,
  loadError,
  onRefresh,
  onResend,
  onRevoke,
  onDelete,
  actionLoadingId,
}: AdminListProps) {
  return (
    <section className="border border-[#4d4d4d]/10 bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="admin-type-section-title text-[#4d4d4d]">
            Administrators
          </h3>
          <p className="admin-type-supporting mt-1 text-sm text-[#4d4d4d]/60">
            Accounts with access to your administration system.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          aria-label="Refresh administrators"
          className="border border-[#4d4d4d]/20 px-3 py-2 text-xs font-medium text-[#4d4d4d] hover:bg-[#f5f5f5] disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {isLoading ? (
        <p className="py-6 text-center text-sm text-[#4d4d4d]/50">
          Loading administrators...
        </p>
      ) : loadError ? (
        <div className="py-4">
          <p className="text-sm text-red-600">{loadError}</p>
          <button
            type="button"
            onClick={onRefresh}
            className="mt-3 text-sm font-medium text-[#4d4d4d] underline"
          >
            Try again
          </button>
        </div>
      ) : admins.length === 0 ? (
        <p className="py-6 text-center text-sm text-[#4d4d4d]/50">
          No administrator accounts found.
        </p>
      ) : (
        <div className="divide-y divide-[#4d4d4d]/10">
          {admins.map((item) => {
            const status = item.is_active
              ? 'active'
              : item.invitation_status === 'pending' &&
                  item.invitation_expires_at &&
                  new Date(item.invitation_expires_at).getTime() <= Date.now()
                ? 'expired'
                : item.invitation_status || 'inactive';

            const isActionLoading = actionLoadingId === item.id;
            const canManageInvitation =
              !item.is_active &&
              ['pending', 'expired'].includes(status);

            const statusStyles: Record<string, string> = {
              active: 'bg-[#e8f2e9] text-[#397447]',
              pending: 'bg-[#fff4df] text-[#9a6818]',
              expired: 'bg-[#fceaea] text-[#b33b3b]',
              revoked: 'bg-[#fceaea] text-[#b33b3b]',
              accepted: 'bg-[#e8f2e9] text-[#397447]',
              inactive: 'bg-[#f5f5f5] text-[#4d4d4d]/60',
            };

            const statusLabels: Record<string, string> = {
              active: 'Active',
              pending: 'Pending',
              expired: 'Expired',
              revoked: 'Revoked',
              accepted: 'Accepted',
              inactive: 'Inactive',
            };

            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-all text-sm font-medium text-[#4d4d4d]">
                      {item.email}
                    </p>
                    <p className="mt-1 text-xs text-[#4d4d4d]/50">
                      {item.role === 'super_admin'
                        ? 'Super Admin'
                        : 'Store Admin'}
                      {item.role === 'store_admin' && item.store_name
                        ? ` · ${item.store_name}`
                        : ''}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 px-2 py-1 text-[10px] font-medium ${
                      statusStyles[status] || statusStyles.inactive
                    }`}
                  >
                    {statusLabels[status] || 'Inactive'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#4d4d4d]/40">
                      Added{' '}
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : 'Unknown'}
                    </p>

                    {item.invitation_expires_at &&
                      !item.is_active &&
                      item.invitation_status === 'pending' && (
                        <p className="mt-1 text-xs text-[#4d4d4d]/50">
                          Invitation expires{' '}
                          {new Date(
                            item.invitation_expires_at,
                          ).toLocaleString()}
                        </p>
                      )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {canManageInvitation && (
                      <>
                        <button
                          type="button"
                          onClick={() => onResend(item)}
                          disabled={isActionLoading}
                          className="text-xs font-medium text-[#4d4d4d] underline disabled:opacity-50"
                        >
                          {isActionLoading ? 'Please wait...' : 'Resend invitation'}
                        </button>

                        {status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => onRevoke(item)}
                            disabled={isActionLoading}
                            className="text-xs font-medium text-[#b33b3b] underline disabled:opacity-50"
                          >
                            Revoke
                          </button>
                        )}
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      disabled={isActionLoading}
                      className="text-xs font-medium text-[#b33b3b] underline disabled:opacity-50"
                    >
                      {isActionLoading ? 'Please wait...' : 'Delete administrator'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
