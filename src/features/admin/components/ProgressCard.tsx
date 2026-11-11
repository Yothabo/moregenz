import { Block, Card } from './skeleton/SkeletonBlock';

export default function ProgressCard() {
  return (
    <Card height="260px" className="h-full">
      <div className="flex items-center justify-between gap-ds-3 p-ds-4">
        <Block height="14px" width="40%" tone="strong" />
        <Block height="32px" width="32px" radius="0.375rem" tone="strong" />
      </div>
      <div className="px-ds-4">
        <Block height="32px" width="50%" tone="strong" />
      </div>
      <div className="mt-auto flex items-end gap-ds-2 p-ds-4">
        {[40, 70, 55, 90, 60, 100, 45].map((h, i) => (
          <Block key={i} height={`${h}px`} width="100%" tone="strong" />
        ))}
      </div>
    </Card>
  );
}
