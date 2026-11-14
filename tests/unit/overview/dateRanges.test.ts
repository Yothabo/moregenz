import { describe, expect, it } from 'vitest';
import {
  getOverviewDateKey,
  getOverviewDateRange,
  isWithinOverviewRange,
} from '../../../src/features/admin/utils/overview/dateRanges';

const NOW = new Date('2026-11-13T12:00:00+02:00');

describe('Overview date ranges', () => {
  it('creates separate ranges for non-consecutive selected dates', () => {
    const range = getOverviewDateRange(
      {
        type: 'dates',
        dates: ['2026-11-07', '2026-11-13'],
      },
      undefined,
      NOW,
    );

    expect(range.ranges).toHaveLength(2);

    expect(
      isWithinOverviewRange('2026-11-07T12:00:00+02:00', range),
    ).toBe(true);

    expect(
      isWithinOverviewRange('2026-11-10T12:00:00+02:00', range),
    ).toBe(false);

    expect(
      isWithinOverviewRange('2026-11-13T12:00:00+02:00', range),
    ).toBe(true);
  });

  it('removes duplicate and invalid selected dates', () => {
    const range = getOverviewDateRange(
      {
        type: 'dates',
        dates: [
          '2026-11-07',
          '2026-11-07',
          '2026-02-30',
          'invalid',
        ],
      },
      undefined,
      NOW,
    );

    expect(range.ranges).toHaveLength(1);
    expect(
      isWithinOverviewRange('2026-11-07T12:00:00+02:00', range),
    ).toBe(true);
  });

  it('preserves selected dates before the store creation timestamp', () => {
    const storeCreatedAt = '2026-11-03T23:24:11.989Z';

    const range = getOverviewDateRange(
      {
        type: 'dates',
        dates: ['2026-11-04', '2026-11-07'],
      },
      storeCreatedAt,
      NOW,
    );

    expect(range.ranges).toHaveLength(2);
    expect(range.ranges?.[0].start.toISOString()).toBe(
      '2026-11-03T22:00:00.000Z',
    );

    expect(
      isWithinOverviewRange('2026-11-04T01:00:00+02:00', range),
    ).toBe(true);
  });

  it('excludes selected dates after the current Johannesburg date', () => {
    const range = getOverviewDateRange(
      {
        type: 'dates',
        dates: ['2026-11-13', '2026-11-14'],
      },
      undefined,
      NOW,
    );

    expect(range.ranges).toHaveLength(1);

    expect(
      isWithinOverviewRange('2026-11-13T23:00:00+02:00', range),
    ).toBe(true);

    expect(
      isWithinOverviewRange('2026-11-14T10:00:00+02:00', range),
    ).toBe(false);
  });

  it('treats an empty selection as no date restriction', () => {
    const range = getOverviewDateRange(
      { type: 'dates', dates: [] },
      undefined,
      NOW,
    );

    expect(range.start).toBeNull();
    expect(range.ranges).toBeUndefined();

    expect(
      isWithinOverviewRange('2020-01-01T12:00:00+02:00', range),
    ).toBe(true);

    expect(
      isWithinOverviewRange('2026-11-13T12:00:00+02:00', range),
    ).toBe(true);

    expect(
      isWithinOverviewRange('2026-11-14T10:00:00+02:00', range),
    ).toBe(false);
  });

  it('uses Johannesburg local dates when generating date keys', () => {
    expect(
      getOverviewDateKey('2026-11-12T22:30:00Z'),
    ).toBe('2026-11-13');
  });

  it('uses Johannesburg midnight and end-of-day boundaries', () => {
    const range = getOverviewDateRange(
      {
        type: 'dates',
        dates: ['2026-11-13'],
      },
      undefined,
      NOW,
    );

    expect(range.ranges?.[0].start.toISOString()).toBe(
      '2026-11-12T22:00:00.000Z',
    );

    expect(range.ranges?.[0].end.toISOString()).toBe(
      '2026-11-13T21:59:59.999Z',
    );
  });

  it('matches no orders when every selected date is invalid', () => {
    const range = getOverviewDateRange(
      {
        type: 'dates',
        dates: ['invalid', '2026-02-30'],
      },
      undefined,
      NOW,
    );

    expect(range.ranges).toEqual([]);

    expect(
      isWithinOverviewRange('2026-11-13T12:00:00+02:00', range),
    ).toBe(false);
  });

  it('matches no orders when every selected date is in the future', () => {
    const range = getOverviewDateRange(
      {
        type: 'dates',
        dates: ['2026-11-14', '2026-11-15'],
      },
      undefined,
      NOW,
    );

    expect(range.ranges).toEqual([]);

    expect(
      isWithinOverviewRange('2026-11-13T12:00:00+02:00', range),
    ).toBe(false);
  });

});
