type OverviewMetricProps = {
  label: string;
  value: string | number;
  description?: string;
};

export default function OverviewMetric({
  label,
  value,
  description,
}: OverviewMetricProps) {
  return (
    <article
      className="flex min-w-0 flex-col rounded-xl border p-4"
      style={{
        borderColor: 'var(--admin-border-subtle)',
        borderRadius: 'var(--admin-radius-lg, 12px)',
        background: 'var(--admin-surface)',
        gap: 'var(--admin-space-sm)',
      }}
    >
      <span
        className="text-xs font-medium"
        style={{ color: 'var(--admin-text-secondary)' }}
      >
        {label}
      </span>

      <strong
        className="text-2xl font-semibold"
        style={{
          color: 'var(--admin-text-primary)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </strong>

      {description && (
        <span
          className="text-xs"
          style={{ color: 'var(--admin-text-secondary)' }}
        >
          {description}
        </span>
      )}
    </article>
  );
}
