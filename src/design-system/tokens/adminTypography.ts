export const adminTypography = {
  heading: "'Roboto', sans-serif",
  body: "'Roboto', sans-serif",

  size: {
    pageTitle: "clamp(1.375rem, 1.8vw, 1.5rem)",
    sectionTitle: "clamp(1.0625rem, 1.3vw, 1.125rem)",
    cardTitle: "0.875rem",
    subsectionTitle: "0.875rem",
    body: "0.875rem",
    supporting: "0.75rem",
    micro: "0.625rem",
  },

  weight: {
    normal: 400,
    medium: 500,
    semibold: 600,
  },

  lineHeight: {
    tight: 1.1,
    heading: 1.2,
    body: 1.5,
    compact: 1.35,
  },
} as const;
