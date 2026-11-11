import { Block, Card } from './skeleton/SkeletonBlock';

export default function QuickLinksCard() {
  return (
    <Card height="260px" className="h-full">
      <div className="p-ds-4">
        <Block height="14px" width="40%" tone="strong" />
      </div>
      <ul className="flex flex-col gap-ds-2 p-ds-4 pt-0">
        {[0,1,2,3].map((i) => (
          <li key={i} className="flex items-center justify-between gap-ds-2">
            <Block height="14px" width="55%" tone="strong" />
            <Block height="20px" width="20px" radius="0.375rem" tone="strong" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
