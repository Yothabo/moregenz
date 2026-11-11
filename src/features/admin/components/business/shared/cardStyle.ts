import type { CSSProperties } from 'react';

/**
 * Shared card chrome — matches StatsRow and StorePerformanceCard.
 * Grey fill, grid pattern, strong border, large radius.
 */
export const BUSINESS_CARD_STYLE: CSSProperties = {
  minHeight: '200px',
  borderRadius: 'var(--ds-radius-lg)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--admin-border-strong)',
  backgroundColor: 'var(--admin-surface)',
  backgroundImage: [
    'linear-gradient(to bottom, var(--admin-surface) 0%, transparent 30%)',
    'linear-gradient(to top, var(--admin-surface) 0%, transparent 30%)',
    'linear-gradient(to right, color-mix(in srgb, var(--admin-border-strong) 8%, transparent) 1px, transparent 1px)',
    'linear-gradient(to bottom, color-mix(in srgb, var(--admin-border-strong) 8%, transparent) 1px, transparent 1px)',
  ].join(','),
  backgroundSize: [
    '100% 100%',
    '100% 100%',
    'var(--admin-card-grid-size) var(--admin-card-grid-size)',
    'var(--admin-card-grid-size) var(--admin-card-grid-size)',
  ].join(','),
  backgroundRepeat: 'no-repeat, no-repeat, repeat, repeat',
  padding: 'var(--admin-space-md)',
};
