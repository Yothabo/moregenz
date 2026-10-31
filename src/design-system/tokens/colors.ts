/**
 * Yotaabo Design System
 * Baseline colour inventory from the existing Admin and shared styles.
 * Values are preserved for visual review, not yet final design decisions.
 */

export const colors = {
  neutral: {
    black: '#000000',
    charcoal: '#4d4d4d',
    charcoalHover: '#3a3a3a',
    white: '#ffffff',
    paper: '#f5f5f2',
    surface: '#f5f5f5',
    surfaceSubtle: '#fafafa',
    surfaceWarm: '#fafaf9',
    grey300: '#d1d5db',
    greyBorder: '#e5e5e5',
    greyBorderWarm: '#e5e5e1',
    greyBorderDark: '#dcdcd7',
    silver: '#C2CBD3',
    muted: '#929BA5',
  },

  category: {
    his: '#8aa89b',
    hers: '#ff1493',
    spaces: '#c8ad8d',
  },

  action: {
    primaryButton: '#3a3a3a',
    buttonText: '#ffffff',
    hover: '#4d4d4d',
    focus: '#929BA5',
    disabledBackground: '#e5e5e5',
    disabledText: '#929BA5',
  },
  statusPalette: {
    amber: '#F59E0B',
    green: '#16A34A',
    red: '#EF4444',
  },
  status: {
    pending: '#d97706',
    confirmed: '#8aa89b',
    delivered: '#4d4d4d',
    success: '#536d5a',
    error: '#a33b3b',
  },

  destructive: {
    default: '#ef4444',
    hover: '#dc2626',
    subtle: '#fef2f2',
  },

  interaction: {
    hover: '#f1f1ee',
    active: '#e5e5e1',
    pressed: '#dcdcd7',
  },

  opacity: {
    charcoal10: 'rgba(77, 77, 77, 0.10)',
    charcoal15: 'rgba(77, 77, 77, 0.15)',
    charcoal20: 'rgba(77, 77, 77, 0.20)',
    charcoal30: 'rgba(77, 77, 77, 0.30)',
    charcoal40: 'rgba(77, 77, 77, 0.40)',
    charcoal45: 'rgba(77, 77, 77, 0.45)',
    charcoal50: 'rgba(77, 77, 77, 0.50)',
    charcoal60: 'rgba(77, 77, 77, 0.60)',
    charcoal70: 'rgba(77, 77, 77, 0.70)',
    charcoal80: 'rgba(77, 77, 77, 0.80)',
    black05: 'rgba(0, 0, 0, 0.05)',
    black10: 'rgba(0, 0, 0, 0.10)',
    black14: 'rgba(0, 0, 0, 0.14)',
    white40: 'rgba(255, 255, 255, 0.40)',
    white80: 'rgba(255, 255, 255, 0.80)',
  },
} as const;


/**
 * Semantic Admin text hierarchy.
 * Values reference the existing neutral palette and opacity tokens.
 */
export const adminText = {
  primary: colors.neutral.charcoal,
  secondary: colors.opacity.charcoal80,
  supporting: colors.opacity.charcoal60,
  muted: colors.opacity.charcoal45,
  disabled: colors.opacity.charcoal30,
} as const;
