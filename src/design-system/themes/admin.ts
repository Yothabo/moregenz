import type { CSSProperties } from 'react';

import { primitives } from '../tokens/primitives';
import { adminTypographyTokens } from '../tokens/adminTypography';
import { spacing } from '../tokens/spacing';
import { elevationShadows, radiusTokens } from '../tokens/elevation';

const n = primitives.neutral;
const a = primitives.accent;
const status = primitives.status;

/**
 * Semantic tokens.
 * Components consume these names, never primitive hex values.
 */

const light = {
  colorBg: n.white,
  colorBgSurface: n.white,
  colorBgSurfaceSecondary: n.gray50,
  colorBgSurfaceSecondaryHover: n.gray100,

  colorBgFillPrimary: a.orange500,
  colorBgFillPrimaryHover: a.orange600,
  colorBgFillPrimaryActive: a.orange700,
  colorBgFillDisabled: n.gray100,

  colorTextPrimary: n.gray700,
  colorTextSecondary: n.gray500,
  colorTextTertiary: n.gray400,
  colorTextPrimaryDisabled: n.gray400,
  colorTextAccent: a.orange600,
  colorTextOnAccent: n.white,

  colorBorderPrimary: n.gray200,
  colorBorderSecondary: n.gray100,
  colorBorderTertiaryDefault: n.gray50,

  colorIconPrimary: n.gray700,
  colorIconSecondary: n.gray500,
  colorIconSecondaryHover: n.gray700,
  colorIconDisabled: n.gray300,

  colorFocusRing: a.orange600,

  colorStatusSuccess: status.success.light,
  colorBgStatusSuccess: status.success.backgroundLight,
  colorStatusWarning: status.warning.light,
  colorBgStatusWarning: status.warning.backgroundLight,
  colorStatusDanger: status.danger.light,
  colorBgStatusDanger: status.danger.backgroundLight,
} as const;

const dark = {
  colorBg: n.gray800,
  colorBgSurface: n.gray700,
  colorBgSurfaceSecondary: n.gray600,
  colorBgSurfaceSecondaryHover: n.gray500,

  colorBgFillPrimary: a.orange500,
  colorBgFillPrimaryHover: a.orange600,
  colorBgFillPrimaryActive: a.orange700,
  colorBgFillDisabled: n.gray600,

  colorTextPrimary: n.gray50,
  colorTextSecondary: n.gray200,
  colorTextTertiary: n.gray300,
  colorTextPrimaryDisabled: n.gray300,
  colorTextAccent: a.orange300,
  colorTextOnAccent: n.white,

  colorBorderPrimary: n.gray500,
  colorBorderSecondary: n.gray600,
  colorBorderTertiaryDefault: n.gray700,

  colorIconPrimary: n.gray50,
  colorIconSecondary: n.gray200,
  colorIconSecondaryHover: n.white,
  colorIconDisabled: n.gray400,

  colorFocusRing: a.orange300,

  colorStatusSuccess: status.success.dark,
  colorBgStatusSuccess: status.success.backgroundDark,
  colorStatusWarning: status.warning.dark,
  colorBgStatusWarning: status.warning.backgroundDark,
  colorStatusDanger: status.danger.dark,
  colorBgStatusDanger: status.danger.backgroundDark,
} as const;

export const adminThemes = {
  light,
  dark,
} as const;

export type AdminThemeMode = keyof typeof adminThemes;

function toKebabCase(value: string): string {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * Converts the active TypeScript theme into runtime CSS variables.
 * The same semantic variable names are available to Tailwind and CSS.
 */
export function getAdminThemeCssVariables(
  mode: AdminThemeMode,
): CSSProperties {
  const theme = adminThemes[mode];
  const variables: Record<string, string> = {};

  Object.entries(theme).forEach(([key, value]) => {
    variables[`--ds-${toKebabCase(key)}`] = value;
  });

  Object.entries(adminTypographyTokens.styles).forEach(([name, style]) => {
    const tokenName = toKebabCase(name);

    variables[`--ds-font-size-${tokenName}`] = style.fontSize;
    variables[`--ds-line-height-${tokenName}`] = style.lineHeight;
    variables[`--ds-font-weight-${tokenName}`] = String(style.fontWeight);
  });

  variables['--ds-font-family-heading'] = adminTypographyTokens.family.heading;
  variables['--ds-font-family-body'] = adminTypographyTokens.family.body;

  const spacingVariables: Record<string, string> = {
    '1': spacing.xxs,
    '2': spacing.xs,
    '3': spacing.sm,
    '4': spacing.md,
    '5': spacing.lg,
    '6': spacing.xl,
    '8': spacing['2xl'],
    '10': spacing['3xl'],
    '12': spacing['4xl'],
    '16': spacing['5xl'],
  };

  Object.entries(spacingVariables).forEach(([key, value]) => {
    variables[`--ds-space-${key}`] = value;
  });

  Object.entries(radiusTokens).forEach(([key, value]) => {
    variables[`--ds-radius-${key}`] = value;
  });

  Object.entries(elevationShadows).forEach(([key, value]) => {
    variables[`--ds-shadow-${key}`] = value;
  });

  return variables as CSSProperties;
}
