/**
 * Legacy compatibility adapter.
 * Existing Admin code can continue using this shape while the
 * semantic theme tokens become the canonical source of truth.
 */

import { adminThemes } from '../themes/admin';
import { primitives } from './primitives';
import { elevationShadows } from './elevation';

export const adminColors = {
  accent: {
    primary: primitives.accent.orange500,
    hover: primitives.accent.orange600,
    onAccent: primitives.neutral.white,
  },

  themes: {
    light: {
      background: adminThemes.light.colorBg,
      surface: adminThemes.light.colorBgSurface,
      surfaceSubtle: adminThemes.light.colorBgSurfaceSecondary,
      surfaceRaised: adminThemes.light.colorBgSurface,
      text: adminThemes.light.colorTextPrimary,
      textSecondary: adminThemes.light.colorTextSecondary,
      textMuted: adminThemes.light.colorTextTertiary,
      textDisabled: adminThemes.light.colorTextPrimaryDisabled,
      border: adminThemes.light.colorBorderSecondary,
      borderStrong: adminThemes.light.colorBorderPrimary,
      hover: adminThemes.light.colorBgSurfaceSecondaryHover,
      accentText: adminThemes.light.colorTextAccent,
      focus: adminThemes.light.colorFocusRing,
      shadow: elevationShadows.sm,
    },

    dark: {
      background: adminThemes.dark.colorBg,
      surface: adminThemes.dark.colorBgSurface,
      surfaceSubtle: adminThemes.dark.colorBgSurfaceSecondary,
      surfaceRaised: adminThemes.dark.colorBgSurface,
      text: adminThemes.dark.colorTextPrimary,
      textSecondary: adminThemes.dark.colorTextSecondary,
      textMuted: adminThemes.dark.colorTextTertiary,
      textDisabled: adminThemes.dark.colorTextPrimaryDisabled,
      border: adminThemes.dark.colorBorderSecondary,
      borderStrong: adminThemes.dark.colorBorderPrimary,
      hover: adminThemes.dark.colorBgSurfaceSecondaryHover,
      accentText: adminThemes.dark.colorTextAccent,
      focus: adminThemes.dark.colorFocusRing,
      shadow: elevationShadows.darkSm,
    },
  },
} as const;

export type AdminTheme = keyof typeof adminColors.themes;
