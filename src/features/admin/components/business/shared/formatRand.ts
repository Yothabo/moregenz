/**
 * Format a number as South African Rand currency.
 * Uses "k" suffix for values >= 1000 for compact chart labels.
 */
export function formatRand(value: number): string {
  if (Math.abs(value) >= 1000) {
    return `R ${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return `R ${Math.round(value).toLocaleString('en-ZA')}`;
}
