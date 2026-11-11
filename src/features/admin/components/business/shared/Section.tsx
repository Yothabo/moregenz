import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  description: string;
  singleColumn?: boolean;
  children: ReactNode;
};

export default function Section({
  title,
  description,
  singleColumn = false,
  children,
}: SectionProps) {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--admin-space-md)' }}>
      <div className="flex flex-col" style={{ gap: 'var(--admin-space-xs)' }}>
        <h2
          style={{
            fontSize: 'var(--admin-greeting-size)',
            lineHeight: 'var(--admin-greeting-line)',
            fontWeight: 'var(--admin-greeting-weight)',
            color: 'var(--admin-text-primary)',
            margin: 0,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: 'var(--admin-size-supporting)',
            color: 'var(--admin-text-secondary)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
      <div
        className={singleColumn ? 'grid w-full grid-cols-1' : 'grid w-full grid-cols-1 lg:grid-cols-2'}
        style={{ gap: 'var(--admin-space-md)' }}
      >
        {children}
      </div>
    </div>
  );
}
