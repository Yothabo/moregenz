/**
 * Canonical Admin typography contract.
 * Font size, line height and weight are defined together.
 */

export const adminTypographyTokens = {
  family: {
    heading: "'Roboto', Arial, sans-serif",
    body: "'Roboto', Arial, sans-serif",
  },

  styles: {
    display: {
      fontSize: '36px',
      lineHeight: '44px',
      fontWeight: 700,
    },
    pageTitle: {
      fontSize: '30px',
      lineHeight: '36px',
      fontWeight: 700,
    },
    heading1: {
      fontSize: '24px',
      lineHeight: '30px',
      fontWeight: 600,
    },
    heading2: {
      fontSize: '20px',
      lineHeight: '26px',
      fontWeight: 600,
    },
    heading3: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 600,
    },
    bodyLarge: {
      fontSize: '16px',
      lineHeight: '25px',
      fontWeight: 400,
    },
    body: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 400,
    },
    bodySmall: {
      fontSize: '13px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    label: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
    },
    caption: {
      fontSize: '11px',
      lineHeight: '16px',
      fontWeight: 400,
    },
    micro: {
      fontSize: '10px',
      lineHeight: '14px',
      fontWeight: 500,
    },
  },
} as const;

/**
 * Greeting typography — hero line for the overview page.
 * Uses clamp() so it scales fluidly between mobile and desktop.
 * Change these three strings to restyle the greeting app-wide.
 */
export const greetingTokens = {
  fontSize: 'clamp(1.125rem, 3vw + 0.5rem, 1.875rem)',
  lineHeight: 'clamp(1.75rem, 3vw + 0.875rem, 2.625rem)',
  fontWeight: 100,
} as const;

/**
 * Backwards-compatible interface for existing Admin styles.
 * Values are derived from the canonical typography contract.
 */
export const adminTypography = {
  heading: adminTypographyTokens.family.heading,
  body: adminTypographyTokens.family.body,

  size: {
    pageTitle: adminTypographyTokens.styles.pageTitle.fontSize,
    sectionTitle: adminTypographyTokens.styles.heading1.fontSize,
    cardTitle: adminTypographyTokens.styles.heading3.fontSize,
    subsectionTitle: adminTypographyTokens.styles.heading3.fontSize,
    body: adminTypographyTokens.styles.body.fontSize,
    supporting: adminTypographyTokens.styles.bodySmall.fontSize,
    micro: adminTypographyTokens.styles.caption.fontSize,
  },

  weight: {
    thin: 100,
    extraLight: 200,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    heading: 1.25,
    body: 22 / 14,
    compact: 20 / 13,
  },
} as const;
