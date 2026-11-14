import type { TimeRange } from '../types/admin.types';

export function inTimeRange(dateStr: string, range: TimeRange): boolean {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const now = new Date();

  const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 1);
  const startOfYear = (d: Date) => new Date(d.getFullYear(), 0, 1);
  const endOfYear = (d: Date) => new Date(d.getFullYear() + 1, 0, 1);

  switch (range) {
    case 'this-month': {
      return date >= startOfMonth(now) && date < endOfMonth(now);
    }
    case 'last-month': {
      const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return date >= startOfMonth(lm) && date < endOfMonth(lm);
    }
    case 'last-quarter': {
      const currentQuarterMonth = Math.floor(now.getMonth() / 3) * 3;
      const lastQuarterStart = new Date(now.getFullYear(), currentQuarterMonth - 3, 1);
      const lastQuarterEnd = new Date(now.getFullYear(), currentQuarterMonth, 1);
      return date >= lastQuarterStart && date < lastQuarterEnd;
    }
    case 'ytd': {
      return date >= startOfYear(now) && date < now;
    }
    case 'this-year': {
      return date >= startOfYear(now) && date < endOfYear(now);
    }
    case 'last-year': {
      const ly = new Date(now.getFullYear() - 1, 0, 1);
      return date >= startOfYear(ly) && date < endOfYear(ly);
    }
    case 'all':
    default:
      return true;
  }
}

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  'this-month': 'This month',
  'last-month': 'Last month',
  'last-quarter': 'Last quarter',
  'ytd': 'YTD',
  'this-year': 'This year',
  'last-year': 'Last year',
  'all': 'All time',
};
