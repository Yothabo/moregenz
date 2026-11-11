import { Block, Card } from './skeleton/SkeletonBlock';

export default function OrdersTimelineCard() {
  return (
    <Card height="260px" className="h-full">
      <div className="flex items-center justify-between gap-ds-3 p-ds-4">
        <Block height="14px" width="30%" tone="strong" />
        <Block height="20px" width="80px" radius="9999px" tone="strong" />
      </div>
      <div className="grid grid-cols-7 gap-ds-2 px-ds-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Block key={i} height="12px" width="100%" tone="strong" />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-ds-2 p-ds-4 pt-0">
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="grid grid-cols-7 gap-ds-2">
            {Array.from({ length: 7 }).map((_, col) => (
              <Block key={col} height="24px" width="100%" tone="strong" />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
