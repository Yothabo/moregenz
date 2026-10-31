/**
 * Yotaabo Design System
 * Existing Admin typography inventory.
 */

export const fontFamilies = {
  body: "'Manrope', sans-serif",
  heading: "'Cormorant Garamond', serif",
  accent: "'Allura', cursive",
  display: "'Anton', sans-serif",
  secondaryDisplay: "'Big Shoulders Display', sans-serif",
} as const;

export const fontSizes = {
  nine: '9px',
  ten: '10px',
  eleven: '11px',
  twelve: '12px',
  fourteen: '14px',
  fifteen: '15px',
  sixteen: '16px',
  eighteen: '18px',
  twenty: '20px',
  twentyFour: '24px',
  thirty: '30px',
  thirtyTwo: '32px',
  thirtySix: '36px',
  decorative: 'clamp(50px, 10vw, 130px)',
  wordmark: '100px',
} as const;

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeights = {
  tight: 1.1,
  snug: 1.2,
  compact: 1.3,
  normal: 1.5,
  body: 1.7,
} as const;
