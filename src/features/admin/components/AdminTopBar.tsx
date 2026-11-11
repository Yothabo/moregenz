import { FiArrowLeft, FiBell, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import AccentButton from './AccentButton';
import type { AdminTheme } from '../hooks/useAdminTheme';

type AdminTopBarProps = {
  email: string;
  onLogout: () => void;
  onBack?: () => void;
  onNotificationsClick?: () => void;
  isNotificationsActive?: boolean;
  adminTheme?: AdminTheme;
  onToggleTheme?: () => void;
};

export default function AdminTopBar({
  email,
  onLogout,
  onBack,
  onNotificationsClick,
  isNotificationsActive = false,
  adminTheme = 'light',
  onToggleTheme,
}: AdminTopBarProps) {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur"
      style={{ backgroundColor: 'var(--admin-surface, var(--admin-surface))' }}
    >
      <div
        className={`admin-topbar-inner mx-auto flex items-center ${
          onBack ? 'justify-between' : 'justify-end'
        }`}
      >
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to overview"
            className="inline-flex min-h-11 shrink-0 items-center justify-center border-0 bg-transparent px-2 opacity-70 transition-opacity hover:opacity-100"
            style={{ color: 'var(--admin-text-secondary, rgba(77,77,77,0.60))' }}
          >
            <FiArrowLeft size={15} aria-hidden="true" />
          </button>
        )}
        <div
          className="flex shrink-0 items-center"
          style={{ gap: 'var(--admin-space-xs, 8px)' }}
        >
          <AccentButton
            variant={isNotificationsActive ? 'dark' : 'neutral'}
            shape="circle"
            ariaLabel="Notifications"
            onClick={onNotificationsClick}
          >
            <FiBell size={18} aria-hidden="true" />
          </AccentButton>
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${adminTheme === 'light' ? 'dark' : 'light'} mode`}
              aria-pressed={adminTheme === 'dark'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--admin-border-strong)',
                backgroundColor: 'var(--admin-surface-subtle)',
                color: 'var(--admin-text-primary)',
                cursor: 'pointer',
                transition: 'background-color 200ms ease, transform 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--admin-surface)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--admin-surface-subtle)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.94)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: adminTheme === 'light' ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              >
                {adminTheme === 'light' ? (
                  <FiSun size={18} aria-hidden="true" />
                ) : (
                  <FiMoon size={18} aria-hidden="true" />
                )}
              </span>
            </button>
          )}
          <AccentButton
            variant="dark"
            shape="circle"
            ariaLabel="Log out"
            onClick={onLogout}
          >
            <FiLogOut size={18} aria-hidden="true" />
          </AccentButton>
        </div>
      </div>
    </header>
  );
}
