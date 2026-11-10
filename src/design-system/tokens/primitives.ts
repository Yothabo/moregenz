/**
 * SIMATU DESIGN SYSTEM
 * Primitive palette. Raw colour values belong here only.
 */

export const primitives = {
  neutral: {
    white: '#FFFFFF',
    gray50: '#F5F5F5',
    gray100: '#E5E5E5',
    gray200: '#D4D4D4',
    gray300: '#A3A3A3',
    gray400: '#737373',
    gray500: '#525252',
    gray600: '#404040',
    gray700: '#262626',
    gray800: '#171717',
    gray900: '#0A0A0A',
  },

  accent: {
    orange300: '#F58A5B',
    orange500: '#C4471D',
    orange600: '#A93D1A',
    orange700: '#8F3417',
  },

  status: {
    success: {
      light: '#15803D',
      dark: '#4ADE80',
      backgroundLight: '#DCFCE7',
      backgroundDark: '#14532D',
    },
    warning: {
      light: '#B45309',
      dark: '#FBBF24',
      backgroundLight: '#FEF3C7',
      backgroundDark: '#78350F',
    },
    danger: {
      light: '#B91C1C',
      dark: '#F87171',
      backgroundLight: '#FEE2E2',
      backgroundDark: '#7F1D1D',
    },
  },
} as const;
