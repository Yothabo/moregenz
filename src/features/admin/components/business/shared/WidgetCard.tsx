import type { ReactNode } from 'react';
import { BUSINESS_CARD_STYLE } from './cardStyle';

type WidgetCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function WidgetCard({ title, description, children }: WidgetCardProps) {
  return (
    <div className="admin-card-bg relative flex flex-col" style={BUSINESS_CARD_STYLE}>
      <h3
        style={{
          fontSize: 'var(--admin-size-heading-3)',
          fontWeight: 'var(--admin-weight-semibold)',
          color: 'var(--admin-text-primary)',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 'var(--admin-size-micro)',
          color: 'var(--admin-text-tertiary)',
          lineHeight: 1.4,
          margin: 0,
          marginTop: 'var(--admin-space-xxs)',
        }}
      >
        {description}
      </p>
      <div style={{ marginTop: 'var(--admin-space-md)' }}>{children}</div>
    </div>
  );
}
