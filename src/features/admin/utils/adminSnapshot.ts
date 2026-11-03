type Snapshot<T> = {
  userId: string;
  savedAt: number;
  data: T;
};

const SNAPSHOT_MAX_AGE_MS = 10 * 60 * 1000;

export function adminSnapshotKey(
  storageKey: string,
  userId: string
): string {
  return `${storageKey}:${userId}`;
}

export function readAdminSnapshot<T>(
  storageKey: string,
  userId: string,
  validate: (value: unknown) => value is T
): T | null {
  const key = adminSnapshotKey(storageKey, userId);

  try {
    const raw = sessionStorage.getItem(key);

    if (!raw) return null;

    const snapshot: unknown = JSON.parse(raw);

    if (!snapshot || typeof snapshot !== 'object') {
      sessionStorage.removeItem(key);
      return null;
    }

    const candidate = snapshot as Partial<Snapshot<unknown>>;

    if (
      typeof candidate.userId !== 'string' ||
      typeof candidate.savedAt !== 'number' ||
      !('data' in candidate)
    ) {
      sessionStorage.removeItem(key);
      return null;
    }

    const age = Date.now() - candidate.savedAt;

    if (
      candidate.userId !== userId ||
      !Number.isFinite(candidate.savedAt) ||
      age < 0 ||
      age > SNAPSHOT_MAX_AGE_MS ||
      !validate(candidate.data)
    ) {
      sessionStorage.removeItem(key);
      return null;
    }

    return candidate.data;
  } catch {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Storage may be unavailable.
    }

    return null;
  }
}

export function writeAdminSnapshot<T>(
  storageKey: string,
  userId: string,
  data: T
): void {
  try {
    const snapshot: Snapshot<T> = {
      userId,
      savedAt: Date.now(),
      data,
    };

    sessionStorage.setItem(
      adminSnapshotKey(storageKey, userId),
      JSON.stringify(snapshot)
    );
  } catch {
    // The dashboard must remain usable if storage is unavailable.
  }
}
