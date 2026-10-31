/**
 * Admin layout spacing tokens.
 * Everyday spacing follows a 4px base scale.
 */

export const spacing = {
  none: '0px',
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '64px',
} as const;

/** Exceptional layout dimensions, separate from everyday spacing. */
export const layoutSpacing = {
  pageGutter: '16px',
  pageGutterWide: '40px',
  pageBottom: '128px',
  pageBottomWide: '144px',
  contentWidth: '1120px',
  contentWidthWide: '1280px',
  pageHeaderOffset: '65px',
} as const;

/** CSS variables consumed by Admin-only styles. */
export const adminSpacingVariables = {
  '--admin-space-none': spacing.none,
  '--admin-space-xxs': spacing.xxs,
  '--admin-space-xs': spacing.xs,
  '--admin-space-sm': spacing.sm,
  '--admin-space-md': spacing.md,
  '--admin-space-lg': spacing.lg,
  '--admin-space-xl': spacing.xl,
  '--admin-space-2xl': spacing['2xl'],
  '--admin-space-3xl': spacing['3xl'],
  '--admin-space-4xl': spacing['4xl'],
  '--admin-space-5xl': spacing['5xl'],
  '--admin-layout-page-gutter': layoutSpacing.pageGutter,
  '--admin-layout-page-gutter-wide': layoutSpacing.pageGutterWide,
  '--admin-layout-page-bottom': layoutSpacing.pageBottom,
  '--admin-layout-page-bottom-wide': layoutSpacing.pageBottomWide,
  '--admin-layout-content-width': layoutSpacing.contentWidth,
  '--admin-layout-content-width-wide': layoutSpacing.contentWidthWide,
  '--admin-layout-page-header-offset': layoutSpacing.pageHeaderOffset,
} as const;

export const borderRadius = {
  default: '0px',
  large: '8px',
  extraLarge: '12px',
  circular: '50%',
} as const;

export const shadows = {
  dropdown: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  mobileNavigation: '0 8px 35px rgba(0, 0, 0, 0.14)',
  modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

export const borders = {
  subtle: '1px solid rgba(77, 77, 77, 0.10)',
  standard: '1px solid rgba(0, 0, 0, 0.10)',
  focus: '2px solid #929BA5',
} as const;
