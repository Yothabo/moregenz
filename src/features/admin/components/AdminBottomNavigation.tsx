import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiMoreHorizontal,
  FiSettings,
} from 'react-icons/fi';
import type { Tab } from '../types/admin.types';

type AdminBottomNavigationProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function AdminBottomNavigation({
  activeTab,
  onTabChange,
}: AdminBottomNavigationProps) {
  const tabs = [
    { tab: 'overview' as Tab, label: 'Overview', Icon: FiGrid },
    { tab: 'products' as Tab, label: 'Products', Icon: FiPackage },
    { tab: 'orders' as Tab, label: 'Orders', Icon: FiShoppingBag },
  ];

  return (
    <nav
      aria-label="Admin navigation"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))]"
    >
      <div className="relative mx-auto flex max-w-md items-center justify-around rounded-2xl border border-black/10 bg-white/95 px-2 py-2 shadow-[0_8px_35px_rgba(0,0,0,0.14)] backdrop-blur">
        {tabs.map(({ tab, label, Icon }) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            aria-current={activeTab === tab ? 'page' : undefined}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 admin-type-micro transition-colors ${
              activeTab === tab
                ? 'bg-[#4d4d4d] text-white'
                : 'text-[#4d4d4d]/60 hover:bg-[#f5f5f5] hover:text-[#4d4d4d]'
            }`}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}

        <div className="relative flex min-w-0 flex-1 justify-center">
          <button
            type="button"
            onClick={() =>
              onTabChange(activeTab === 'settings' ? 'overview' : 'settings')
            }
            aria-expanded={activeTab === 'settings'}
            className={`flex w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 admin-type-micro transition-colors ${
              activeTab === 'settings'
                ? 'bg-[#4d4d4d] text-white'
                : 'text-[#4d4d4d]/60 hover:bg-[#f5f5f5] hover:text-[#4d4d4d]'
            }`}
          >
            {activeTab === 'settings' ? (
              <FiSettings size={19} />
            ) : (
              <FiMoreHorizontal size={19} />
            )}
            <span>{activeTab === 'settings' ? 'Settings' : 'More'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
