import type { ReactNode } from 'react';

type OverviewSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function OverviewSection({
  title,
  description,
  children,
}: OverviewSectionProps) {
  return (
    <section
      className="flex w-full flex-col"
      style={{ gap: 'var(--admin-space-md)' }}
    >
      <div className="flex flex-col" style={{ gap: '4px' }}>
        <h2
          className="text-base font-semibold"
          style={{ color: 'var(--admin-text-primary)' }}
        >
          {title}
        </h2>

        {description && (
          <p
            className="text-xs"
            style={{ color: 'var(--admin-text-secondary)' }}
          >
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
