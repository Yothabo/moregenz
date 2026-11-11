import { Block, Card } from './skeleton/SkeletonBlock';

export default function DarkPanelCard() {
  return (
    <Card height="100%" variant="dark" className="h-full">
      <div className="flex items-start justify-between gap-ds-3 p-ds-4">
        <Block height="14px" width="50%" tone="subtle" />
        <Block height="24px" width="48px" radius="9999px" tone="subtle" />
      </div>
      <ul className="flex flex-1 flex-col gap-ds-3 p-ds-4 pt-0">
        {[0,1,2,3,4].map((i) => (
          <li key={i} className="flex items-center gap-ds-3">
            <Block height="32px" width="32px" radius="0.375rem" tone="subtle" />
            <div className="flex flex-1 flex-col gap-ds-1">
              <Block height="10px" width="70%" tone="subtle" />
              <Block height="8px" width="40%" tone="subtle" />
            </div>
            <Block height="20px" width="20px" radius="9999px" tone="subtle" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
