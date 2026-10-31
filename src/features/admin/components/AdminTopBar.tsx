import { FiLogOut } from 'react-icons/fi';

type AdminTopBarProps = {
  email: string;
  onLogout: () => void;
};

export default function AdminTopBar({ email, onLogout }: AdminTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#4d4d4d]/10 bg-white/95 backdrop-blur">
      <div className="admin-topbar-inner mx-auto flex items-center justify-between">
        <p className="admin-type-micro min-w-0 truncate font-semibold uppercase tracking-[0.16em] text-[#4d4d4d]/45">
          Signed in as {email || 'Admin'}
        </p>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 border-0 bg-transparent px-2 admin-type-body font-medium text-[#4d4d4d]/70 transition-colors hover:text-[#4d4d4d]"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
