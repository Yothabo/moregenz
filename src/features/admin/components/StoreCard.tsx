import { Block, Card } from './skeleton/SkeletonBlock';

export default function StoreCard() {
  return (
    <Card height="260px" className="h-full">
      <div className="flex items-start justify-between gap-ds-3 p-ds-4">
        <Block height="44px" width="44px" radius="9999px" tone="strong" />
        <Block height="20px" width="60px" radius="9999px" tone="strong" />
      </div>
      <div className="flex flex-col gap-ds-2 px-ds-4">
        <Block height="14px" width="70%" tone="strong" />
        <Block height="10px" width="45%" tone="strong" />
      </div>
      <div className="mt-auto flex flex-col gap-ds-2 border-t p-ds-4" style={{ borderColor: 'var(--admin-border-subtle, rgba(0,0,0,0.1))' }}>
        <Block height="10px" width="100%" tone="strong" />
        <Block height="10px" width="60%" tone="strong" />
      </div>
    </Card>
  );
}
