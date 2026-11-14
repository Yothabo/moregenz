import { Block, Card } from './skeleton/SkeletonBlock';

export default function RecentActivityCard() {
  return (
    <Card height="260px" className="h-full">
      <div className="flex items-center justify-between gap-ds-3 p-ds-4">
        <Block height="14px" width="40%" tone="strong" />
        <Block height="14px" width="60px" tone="strong" />
      </div>
      <ul className="flex flex-1 flex-col gap-ds-2 p-ds-4 pt-0">
        {[0,1,2,3].map((i) => (
          <li key={i} className="flex items-center gap-ds-3">
            <Block height="36px" width="36px" radius="0.375rem" tone="strong" />
            <div className="flex flex-1 flex-col gap-ds-1">
              <Block height="10px" width="75%" tone="strong" />
              <Block height="8px" width="35%" tone="strong" />
            </div>
            <Block height="10px" width="45px" tone="strong" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
