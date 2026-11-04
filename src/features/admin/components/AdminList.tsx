export type AdminRecord = {
  id: string;
  email: string;
  role: 'super_admin' | 'store_admin';
  store_id: string | null;
  store_name: string | null;
  store_slug: string | null;
  is_active: boolean;
  created_at: string;
};

type AdminListProps = {
  admins: AdminRecord[];
  isLoading: boolean;
  loadError: string;
  onRefresh: () => void;
};

export default function AdminList({
  admins,
  isLoading,
  loadError,
  onRefresh,
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
          {admins.map((item) => (
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
                    item.is_active
                      ? 'bg-[#e8f2e9] text-[#397447]'
                      : 'bg-[#fceaea] text-[#b33b3b]'
                  }`}
                >
                  {item.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-xs text-[#4d4d4d]/40">
                Added{' '}
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString()
                  : 'Unknown'}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
