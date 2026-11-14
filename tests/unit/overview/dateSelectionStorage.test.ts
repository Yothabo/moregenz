import { beforeEach, describe, expect, it } from 'vitest';
import { ADMIN_STORAGE_KEYS } from '../../../src/features/admin/constants/admin.constants';
import {
  readOverviewDateSelection,
  writeOverviewDateSelection,
} from '../../../src/features/admin/utils/overview/dateSelectionStorage';
import type { OverviewDateSelection } from '../../../src/features/admin/types/overview.types';

const USER_A = 'admin-user-a';
const USER_B = 'admin-user-b';

const STORAGE_KEY = ADMIN_STORAGE_KEYS.overviewDateFilter;

describe('Overview date selection storage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('persists and restores the exact selected dates', () => {
    const selection: OverviewDateSelection = {
      type: 'dates',
      dates: ['2026-11-07', '2026-11-13', '2026-11-09'],
    };

    writeOverviewDateSelection(USER_A, selection);

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: ['2026-11-07', '2026-11-09', '2026-11-13'],
    });
  });

  it('normalizes duplicate dates and sorts them before saving', () => {
    writeOverviewDateSelection(USER_A, {
      type: 'dates',
      dates: [
        '2026-11-13',
        '2026-11-07',
        '2026-11-13',
        '2026-11-09',
      ],
    });

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: ['2026-11-07', '2026-11-09', '2026-11-13'],
    });
  });

  it('keeps selections isolated between admin users', () => {
    writeOverviewDateSelection(USER_A, {
      type: 'dates',
      dates: ['2026-11-07'],
    });

    writeOverviewDateSelection(USER_B, {
      type: 'dates',
      dates: ['2026-11-13'],
    });

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: ['2026-11-07'],
    });

    expect(readOverviewDateSelection(USER_B)).toEqual({
      type: 'dates',
      dates: ['2026-11-13'],
    });
  });

  it('persists an empty selection as unrestricted dates', () => {
    writeOverviewDateSelection(USER_A, {
      type: 'dates',
      dates: [],
    });

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: [],
    });
  });

  it('returns an unrestricted selection when no saved selection exists', () => {
    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: [],
    });
  });

  it('restores a valid preset selection', () => {
    const selection: OverviewDateSelection = {
      type: 'preset',
      preset: 'last-month',
    };

    writeOverviewDateSelection(USER_A, selection);

    expect(readOverviewDateSelection(USER_A)).toEqual(selection);
  });

  it('rejects impossible calendar dates in stored selections', () => {
    sessionStorage.setItem(
      `${STORAGE_KEY}:${USER_A}`,
      JSON.stringify({
        version: 1,
        userId: USER_A,
        selection: {
          type: 'dates',
          dates: ['2026-11-07', '2026-02-30'],
        },
      }),
    );

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: [],
    });
  });

  it('rejects selections containing incorrectly formatted dates', () => {
    sessionStorage.setItem(
      `${STORAGE_KEY}:${USER_A}`,
      JSON.stringify({
        version: 1,
        userId: USER_A,
        selection: {
          type: 'dates',
          dates: ['2026-11-07', 'not-a-date'],
        },
      }),
    );

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: [],
    });
  });

  it('rejects data saved for a different user', () => {
    sessionStorage.setItem(
      `${STORAGE_KEY}:${USER_A}`,
      JSON.stringify({
        version: 1,
        userId: USER_B,
        selection: {
          type: 'dates',
          dates: ['2026-11-07'],
        },
      }),
    );

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: [],
    });
  });

  it('rejects unsupported storage versions', () => {
    sessionStorage.setItem(
      `${STORAGE_KEY}:${USER_A}`,
      JSON.stringify({
        version: 99,
        userId: USER_A,
        selection: {
          type: 'dates',
          dates: ['2026-11-07'],
        },
      }),
    );

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: [],
    });
  });

  it('handles corrupted JSON without breaking the overview', () => {
    sessionStorage.setItem(
      `${STORAGE_KEY}:${USER_A}`,
      '{invalid-json',
    );

    expect(readOverviewDateSelection(USER_A)).toEqual({
      type: 'dates',
      dates: [],
    });
  });
});
