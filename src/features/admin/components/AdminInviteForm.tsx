import type { FormEvent } from 'react';

type AdminInviteFormProps = {
  email: string;
  setEmail: (value: string) => void;
  role: 'super_admin' | 'store_admin';
  setRole: (value: 'super_admin' | 'store_admin') => void;
  storeSlug: 'yotaabo' | 'poshies';
  setStoreSlug: (value: 'yotaabo' | 'poshies') => void;
  isInviting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function AdminInviteForm({
  email,
  setEmail,
  role,
  setRole,
  storeSlug,
  setStoreSlug,
  isInviting,
  onSubmit,
}: AdminInviteFormProps) {
  return (
    <section className="border border-[#4d4d4d]/10 bg-white p-5">
      <div className="mb-5">
        <h3 className="admin-type-section-title text-[#4d4d4d]">
          Invite Administrator
        </h3>
        <p className="admin-type-supporting mt-1 text-sm text-[#4d4d4d]/60">
          Send an invitation to someone who needs access to the admin
          dashboard.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="new-admin-email"
            className="mb-2 block text-sm font-medium text-[#4d4d4d]"
          >
            Email address
          </label>
          <input
            id="new-admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@example.com"
            autoComplete="email"
            required
            maxLength={254}
            disabled={isInviting}
            className="w-full rounded-none border border-[#4d4d4d]/20 bg-white px-3 py-3 text-sm text-[#4d4d4d] outline-none focus:border-[#4d4d4d] disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="new-admin-role"
            className="mb-2 block text-sm font-medium text-[#4d4d4d]"
          >
            Administrator role
          </label>
          <select
            id="new-admin-role"
            value={role}
            onChange={(event) =>
              setRole(event.target.value as 'super_admin' | 'store_admin')
            }
            disabled={isInviting}
            className="w-full rounded-none border border-[#4d4d4d]/20 bg-white px-3 py-3 text-sm text-[#4d4d4d] outline-none focus:border-[#4d4d4d] disabled:opacity-50"
          >
            <option value="store_admin">Store Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        {role === 'store_admin' && (
          <div>
            <label
              htmlFor="new-admin-store"
              className="mb-2 block text-sm font-medium text-[#4d4d4d]"
            >
              Assign storefront
            </label>
            <select
              id="new-admin-store"
              value={storeSlug}
              onChange={(event) =>
                setStoreSlug(event.target.value as 'yotaabo' | 'poshies')
              }
              disabled={isInviting}
              className="w-full rounded-none border border-[#4d4d4d]/20 bg-white px-3 py-3 text-sm text-[#4d4d4d] outline-none focus:border-[#4d4d4d] disabled:opacity-50"
            >
              <option value="yotaabo">Yotaabo</option>
              <option value="poshies">Poshies</option>
            </select>
          </div>
        )}

        {role === 'super_admin' && (
          <p className="text-xs text-[#4d4d4d]/60">
            Super Admins have access to both storefronts and administrator
            management.
          </p>
        )}

        <button
          type="submit"
          disabled={isInviting || !email.trim()}
          className="w-full bg-[#4d4d4d] px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isInviting ? 'Sending invitation...' : 'Send invitation'}
        </button>
      </form>
    </section>
  );
}
