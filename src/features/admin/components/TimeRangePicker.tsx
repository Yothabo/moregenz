import type { TimeRange } from '../types/admin.types';
import AccentButton from './AccentButton';

type TimeRangePickerProps = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
};

const OPTIONS: { id: TimeRange; label: string }[] = [
  { id: 'this-month', label: 'This month' },
  { id: 'last-month', label: 'Last month' },
  { id: 'last-quarter', label: 'Last quarter' },
  { id: 'ytd', label: 'YTD' },
  { id: 'this-year', label: 'This year' },
  { id: 'last-year', label: 'Last year' },
  { id: 'all', label: 'All' },
];

export default function TimeRangePicker({ value, onChange }: TimeRangePickerProps) {
  return (
    <div className="admin-filter-row flex items-center" style={{ gap: 'var(--admin-space-xs)', flexWrap: 'nowrap', overflowX: 'auto' }}>
      <div className="admin-segmented admin-filter-segmented" style={{ flexWrap: 'nowrap' }}>
        {OPTIONS.map((option, index) => {
          const isActive = value === option.id;
          const isFirst = index === 0;
          const isLast = index === OPTIONS.length - 1;
          const edgeClass = isFirst
            ? 'admin-segmented-left'
            : isLast
              ? 'admin-segmented-right'
              : '';
          return (
            <AccentButton
              key={option.id}
              variant={isActive ? 'active' : 'neutral'}
              shape="pill"
              onClick={() => onChange(option.id)}
              ariaLabel={`Time range: ${option.label}`}
              ariaCurrent={isActive ? 'true' : undefined}
              activeColor="var(--admin-text-primary)"
              className={edgeClass}
              style={{ borderRadius: 0, fontSize: 'var(--admin-size-caption)', whiteSpace: 'nowrap' }}
            >
              {option.label}
            </AccentButton>
          );
        })}
      </div>
    </div>
  );
}
