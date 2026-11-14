import { describe, expect, it } from 'vitest';
import {
  getOverviewQuickActionDates,
  isOverviewQuickActionActive,
} from '../../../src/features/admin/utils/overview/quickActions';

const date = (value: string) => new Date(value);

describe('Overview quick-action dates', () => {
  it('generates seven inclusive days across a year boundary', () => {
    const dates = getOverviewQuickActionDates(
      '7-days',
      date('2026-01-02T12:00:00+02:00'),
    );

    expect(dates).toHaveLength(7);
    expect(dates[0]).toBe('2025-12-27');
    expect(dates[6]).toBe('2026-01-02');
  });

  it('selects the previous completed month across a year boundary', () => {
    const dates = getOverviewQuickActionDates(
      'month',
      date('2026-01-15T12:00:00+02:00'),
    );

    expect(dates).toHaveLength(31);
    expect(dates[0]).toBe('2025-12-01');
    expect(dates[30]).toBe('2025-12-31');
  });

  it('handles February in a leap year', () => {
    const dates = getOverviewQuickActionDates(
      'month',
      date('2024-03-15T12:00:00+02:00'),
    );

    expect(dates).toHaveLength(29);
    expect(dates[0]).toBe('2024-02-01');
    expect(dates[28]).toBe('2024-02-29');
  });

  it('handles February in a non-leap year', () => {
    const dates = getOverviewQuickActionDates(
      'month',
      date('2025-03-15T12:00:00+02:00'),
    );

    expect(dates).toHaveLength(28);
    expect(dates[0]).toBe('2025-02-01');
    expect(dates[27]).toBe('2025-02-28');
  });

  it('generates the previous three completed months across a year boundary', () => {
    const dates = getOverviewQuickActionDates(
      '3-months',
      date('2026-01-15T12:00:00+02:00'),
    );

    expect(dates).toHaveLength(92);
    expect(dates[0]).toBe('2025-10-01');
    expect(dates[91]).toBe('2025-12-31');
  });

  it.each([
    ['2026-01-15T12:00:00+02:00', '2025-10-01', '2025-12-31'],
    ['2026-04-15T12:00:00+02:00', '2026-01-01', '2026-03-31'],
    ['2026-07-15T12:00:00+02:00', '2026-04-01', '2026-06-30'],
    ['2026-10-15T12:00:00+02:00', '2026-07-01', '2026-09-30'],
  ])('generates the previous completed quarter for %s', (now, first, last) => {
    const dates = getOverviewQuickActionDates('quarter', date(now));

    expect(dates[0]).toBe(first);
    expect(dates[dates.length - 1]).toBe(last);
  });

  it('generates six completed months across a year boundary', () => {
    const dates = getOverviewQuickActionDates(
      '6-months',
      date('2026-01-15T12:00:00+02:00'),
    );

    expect(dates).toHaveLength(184);
    expect(dates[0]).toBe('2025-07-01');
    expect(dates[183]).toBe('2025-12-31');
  });

  it('uses the Johannesburg current date and never includes future dates', () => {
    const dates = getOverviewQuickActionDates(
      '7-days',
      date('2026-11-12T22:30:00Z'),
    );

    expect(dates).toHaveLength(7);
    expect(dates[0]).toBe('2026-11-07');
    expect(dates[6]).toBe('2026-11-13');
    expect(dates.some((value) => value > '2026-11-13')).toBe(false);
  });

  it('does not activate for an unknown action', () => {
    expect(
      getOverviewQuickActionDates('unknown', date('2026-11-13T12:00:00+02:00')),
    ).toEqual([]);
  });

  it('activates only when selected dates exactly match the action', () => {
    const now = date('2026-11-13T12:00:00+02:00');
    const expected = getOverviewQuickActionDates('7-days', now);

    expect(isOverviewQuickActionActive('7-days', expected, now)).toBe(true);
    expect(
      isOverviewQuickActionActive('7-days', expected.slice(1), now),
    ).toBe(false);
    expect(
      isOverviewQuickActionActive('7-days', [...expected, '2026-11-13'], now),
    ).toBe(true);
    expect(
      isOverviewQuickActionActive('7-days', [...expected, '2026-11-14'], now),
    ).toBe(false);
  });
});
