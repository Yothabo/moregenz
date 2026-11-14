import { Block, Card } from './skeleton/SkeletonBlock';

export default function OrderStatusCard() {
  return (
    <Card height="260px" className="h-full">
      <div className="flex items-center justify-between gap-ds-3 p-ds-4">
        <Block height="14px" width="40%" tone="strong" />
        <Block height="14px" width="60px" tone="strong" />
      </div>
      <div className="px-ds-4">
        <Block height="40px" width="45%" tone="strong" />
      </div>
      <div className="px-ds-4">
        <Block height="8px" width="100%" radius="9999px" tone="strong" />
      </div>
      <div className="mt-auto grid grid-cols-2 gap-ds-3 border-t p-ds-4" style={{ borderColor: 'var(--admin-border-subtle, rgba(0,0,0,0.1))' }}>
        {[0,1,2,3].map((i) => (
          <div key={i} className="flex items-center gap-ds-2">
            <Block height="32px" width="32px" radius="0.375rem" tone="strong" />
            <div className="flex flex-1 flex-col gap-ds-1">
              <Block height="8px" width="100%" tone="strong" />
              <Block height="12px" width="50%" tone="strong" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
