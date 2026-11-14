import { ADMIN_STORAGE_KEYS } from '../../constants/admin.constants';
import type {
  OverviewDatePreset,
  OverviewDateSelection,
} from '../../types/overview.types';

const STORAGE_VERSION = 1;

const PRESETS: OverviewDatePreset[] = [
  'today',
  'yesterday',
  'last-7-days',
  'last-30-days',
  'this-month',
  'last-month',
  'this-year',
  'last-year',
  'all-time',
];

function isValidDateKey(value: unknown): value is string {
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isValidSelection(
  value: unknown
): value is OverviewDateSelection {
  if (!value || typeof value !== 'object') return false;

  const selection = value as Record<string, unknown>;

  if (selection.type === 'dates') {
    return (
      Array.isArray(selection.dates) &&
      selection.dates.every(isValidDateKey)
    );
  }

  return (
    selection.type === 'preset' &&
    typeof selection.preset === 'string' &&
    PRESETS.includes(selection.preset as OverviewDatePreset)
  );
}

function storageKey(userId: string): string {
  return `${ADMIN_STORAGE_KEYS.overviewDateFilter}:${userId}`;
}

export function readOverviewDateSelection(
  userId: string
): OverviewDateSelection {
  const emptySelection: OverviewDateSelection = {
    type: 'dates',
    dates: [],
  };

  if (!userId) return emptySelection;

  try {
    const raw = sessionStorage.getItem(storageKey(userId));

    if (!raw) return emptySelection;

    const saved: unknown = JSON.parse(raw);

    if (!saved || typeof saved !== 'object') {
      sessionStorage.removeItem(storageKey(userId));
      return emptySelection;
    }

    const record = saved as Record<string, unknown>;

    if (
      record.version !== STORAGE_VERSION ||
      record.userId !== userId ||
      !isValidSelection(record.selection)
    ) {
      sessionStorage.removeItem(storageKey(userId));
      return emptySelection;
    }

    if (record.selection.type === 'dates') {
      return {
        type: 'dates',
        dates: [...new Set(record.selection.dates)].sort(),
      };
    }

    return record.selection;
  } catch {
    return emptySelection;
  }
}

export function writeOverviewDateSelection(
  userId: string,
  selection: OverviewDateSelection
): void {
  if (!userId || !isValidSelection(selection)) return;

  try {
    const normalized: OverviewDateSelection =
      selection.type === 'dates'
        ? {
            type: 'dates',
            dates: [...new Set(selection.dates)].sort(),
          }
        : selection;

    sessionStorage.setItem(
      storageKey(userId),
      JSON.stringify({
        version: STORAGE_VERSION,
        userId,
        selection: normalized,
      })
    );
  } catch {
    // The Overview remains usable if browser storage is unavailable.
  }
}
