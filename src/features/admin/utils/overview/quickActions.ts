import { getOverviewDateKey } from './dateRanges';

function getDateKeysBetween(start: Date, end: Date): string[] {
  const dates: string[] = [];

  for (
    const date = new Date(start);
    date.getTime() <= end.getTime();
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    dates.push(date.toISOString().slice(0, 10));
  }

  return dates;
}

/**
 * Generates exact inclusive Johannesburg calendar dates for an Overview
 * quick action. All periods are calculated relative to the supplied instant.
 */
export function getOverviewQuickActionDates(
  action: string,
  now = new Date(),
): string[] {
  const currentDateKey = getOverviewDateKey(now);
  const currentYear = Number(currentDateKey.slice(0, 4));
  const currentMonth = Number(currentDateKey.slice(5, 7));

  let start: Date;
  let end: Date;

  switch (action) {
    case '7-days':
      end = new Date(`${currentDateKey}T00:00:00.000Z`);
      start = new Date(end);
      start.setUTCDate(start.getUTCDate() - 6);
      break;

    case 'month':
      start = new Date(Date.UTC(currentYear, currentMonth - 2, 1));
      end = new Date(Date.UTC(currentYear, currentMonth - 1, 0));
      break;

    case '3-months':
      start = new Date(Date.UTC(currentYear, currentMonth - 4, 1));
      end = new Date(Date.UTC(currentYear, currentMonth - 1, 0));
      break;

    case 'quarter': {
      const currentQuarterStart = Math.floor((currentMonth - 1) / 3) * 3;
      start = new Date(Date.UTC(currentYear, currentQuarterStart - 3, 1));
      end = new Date(Date.UTC(currentYear, currentQuarterStart, 0));
      break;
    }

    case '6-months':
      start = new Date(Date.UTC(currentYear, currentMonth - 7, 1));
      end = new Date(Date.UTC(currentYear, currentMonth - 1, 0));
      break;

    default:
      return [];
  }

  return getDateKeysBetween(start, end).filter(
    (dateKey) => dateKey <= currentDateKey,
  );
}

export function isOverviewQuickActionActive(
  action: string,
  selectedDates: string[],
  now = new Date(),
): boolean {
  const expectedDates = getOverviewQuickActionDates(action, now);
  const selected = [...new Set(selectedDates)].sort();

  if (
    expectedDates.length === 0 ||
    expectedDates.length !== selected.length
  ) {
    return false;
  }

  return expectedDates.every((date, index) => date === selected[index]);
}
