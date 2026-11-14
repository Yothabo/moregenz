const zarFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatOverviewCurrency(value: number): string {
  if (!Number.isFinite(value)) return 'Unavailable';

  return zarFormatter.format(value);
}

export function formatOverviewNumber(value: number): string {
  if (!Number.isFinite(value)) return 'Unavailable';

  return new Intl.NumberFormat('en-ZA').format(value);
}
