/**
 * Radius and elevation tokens.
 */

export const radiusTokens = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const;

export const elevationShadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  xl: '0 16px 40px rgba(0, 0, 0, 0.16)',

  darkXs: '0 1px 2px rgba(0, 0, 0, 0.18)',
  darkSm: '0 2px 4px rgba(0, 0, 0, 0.22)',
  darkMd: '0 4px 12px rgba(0, 0, 0, 0.26)',
  darkLg: '0 8px 24px rgba(0, 0, 0, 0.30)',
  darkXl: '0 16px 40px rgba(0, 0, 0, 0.36)',
} as const;
