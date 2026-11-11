import { formatRand } from '../shared/formatRand';
import WidgetCard from '../shared/WidgetCard';
import type { TopCustomer } from '../placeholderInsights';

type TopCustomersWidgetProps = {
  customers: TopCustomer[];
};

export default function TopCustomersWidget({ customers }: TopCustomersWidgetProps) {
  return (
    <WidgetCard title="Top customers" description="Highest lifetime spend.">
      <ul className="flex flex-col" style={{ gap: 'var(--admin-space-xs)', listStyle: 'none', padding: 0, margin: 0 }}>
        {customers.map((customer) => (
          <li key={customer.phone} className="flex items-center justify-between" style={{ gap: 'var(--admin-space-sm)' }}>
            <div className="flex flex-col" style={{ minWidth: 0, gap: '0px' }}>
              <span style={{ fontSize: 'var(--admin-size-caption)', color: 'var(--admin-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{customer.name}</span>
              <span style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{customer.orders} orders</span>
            </div>
            <span style={{ fontSize: 'var(--admin-size-caption)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{formatRand(customer.lifetimeValue)}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
