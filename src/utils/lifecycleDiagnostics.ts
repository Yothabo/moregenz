export function recordLifecycleEvent(
  event: string,
  details: Record<string, unknown> = {},
) {
  const navigation = performance.getEntriesByType(
    'navigation',
  )[0] as PerformanceNavigationTiming | undefined;

  const record = {
    event,
    timestamp: new Date().toISOString(),
    navigationType: navigation?.type ?? 'unknown',
    visibilityState: document.visibilityState,
    wasDiscarded:
      'wasDiscarded' in document
        ? (document as Document & { wasDiscarded: boolean }).wasDiscarded
        : 'unsupported',
    ...details,
  };

  console.info('[Yotaabo lifecycle]', record);

  try {
    const key = 'yotaabo-lifecycle-diagnostics';
    const previous = JSON.parse(sessionStorage.getItem(key) || '[]');
    const records = Array.isArray(previous) ? previous : [];

    records.push(record);
    sessionStorage.setItem(key, JSON.stringify(records.slice(-30)));
  } catch {
    // Diagnostics must never interrupt the application.
  }
}
