import { FiArrowLeft, FiLogOut } from 'react-icons/fi';

type AdminTopBarProps = {
  email: string;
  onLogout: () => void;
  onBack?: () => void;
};

export default function AdminTopBar({ email, onLogout, onBack }: AdminTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#4d4d4d]/10 bg-white/95 backdrop-blur">
      <div className={`admin-topbar-inner mx-auto flex items-center ${onBack ? "justify-between" : "justify-end"}`}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to overview"
            className="inline-flex min-h-11 shrink-0 items-center justify-center border-0 bg-transparent px-2 text-[#4d4d4d]/70 transition-colors hover:text-[#4d4d4d]"
          >
            <FiArrowLeft size={15} aria-hidden="true" />
          </button>
        )}
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
