export default function StatsHeader() {
  return (
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
        Store at a glance
      </h2>
      <p
        style={{
          fontSize: 'var(--admin-size-supporting)',
          fontWeight: 'var(--admin-weight-normal)',
          color: 'var(--admin-text-secondary)',
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        A quick summary of orders and products across the current scope.
      </p>
    </div>
  );
}
