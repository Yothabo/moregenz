import type { CSSProperties, ReactNode } from 'react';
import { adminTypography, adminTypographyTokens, greetingTokens } from '../../../design-system/tokens/adminTypography';
import { adminColors } from '../../../design-system/tokens/adminColors';
import { getAdminThemeCssVariables } from '../../../design-system/themes/admin';
import { colors, adminSpacingVariables } from '../../../design-system/tokens';
import type { AdminTheme } from '../hooks/useAdminTheme';

type AdminThemeShellProps = {
  adminTheme: AdminTheme;
  children: ReactNode;
};

export default function AdminThemeShell({ adminTheme, children }: AdminThemeShellProps) {
  const themeColors = adminColors.themes[adminTheme];

  return (
    <main
      className="admin-scope min-h-screen bg-[var(--admin-bg)]"
      data-theme={adminTheme}
      style={
        {
          ...getAdminThemeCssVariables(adminTheme),
          '--admin-bg': themeColors.background,
          '--admin-surface': themeColors.surface,
          '--admin-surface-subtle': themeColors.surfaceSubtle,
          '--admin-surface-raised': themeColors.surfaceRaised,
          '--admin-text-primary': themeColors.text,
          '--admin-text-secondary': themeColors.textSecondary,
          '--admin-text-supporting': themeColors.textSecondary,
          '--admin-text-muted': themeColors.textMuted,
          '--admin-text-disabled': themeColors.textDisabled,
          '--admin-border-subtle': themeColors.border,
          '--admin-border-strong': themeColors.borderStrong,
          // HARDCODED — category header background.
          // Why: `mixHex()` produced an invalid value when used inside a CSS custom
          // property (empty string), and even a plain string variable failed to
          // apply after the first render cycle. A direct hex literal here is the
          // only form that reliably paints the header row in both themes.
          // Light: #E2E2E2 (grey header on white card)
          // Dark:  #3A3A3A (lighter grey header on #404040 card)
          '--admin-category-header-bg': adminTheme === 'dark' ? '#3A3A3A' : '#E2E2E2',

          '--admin-hover': themeColors.hover,
          '--admin-accent': adminColors.accent.primary,
          '--admin-accent-hover': adminColors.accent.hover,
          '--admin-accent-text': themeColors.accentText,
          '--admin-on-accent': adminColors.accent.onAccent,
          '--admin-focus': themeColors.focus,
          '--admin-shadow': themeColors.shadow,
          '--admin-charcoal-40':
            adminTheme === 'dark' ? 'rgba(244, 241, 236, 0.4)' : colors.opacity.charcoal40,
          '--admin-charcoal-50':
            adminTheme === 'dark' ? 'rgba(244, 241, 236, 0.5)' : colors.opacity.charcoal50,
          '--admin-charcoal-70':
            adminTheme === 'dark' ? 'rgba(244, 241, 236, 0.7)' : colors.opacity.charcoal70,
          '--admin-card-order-media-surface': themeColors.surfaceSubtle,
          '--admin-status-amber': colors.statusPalette.amber,
          '--admin-status-green': colors.statusPalette.green,
          '--admin-status-red': colors.statusPalette.red,

          ...adminSpacingVariables,

          '--admin-font-heading': adminTypography.heading,
          '--admin-font-body': adminTypography.body,

          '--admin-greeting-size': greetingTokens.fontSize,
          '--admin-greeting-line': greetingTokens.lineHeight,
          '--admin-greeting-weight': greetingTokens.fontWeight,
          '--admin-size-display': adminTypographyTokens.styles.display.fontSize,
          '--admin-line-display': adminTypographyTokens.styles.display.lineHeight,
          '--admin-weight-display': adminTypographyTokens.styles.display.fontWeight,
          '--admin-size-page-title': adminTypography.size.pageTitle,
          '--admin-size-section-title': adminTypography.size.sectionTitle,
          '--admin-size-card-title': adminTypography.size.cardTitle,
          '--admin-size-subsection-title': adminTypography.size.subsectionTitle,
          '--admin-size-body': adminTypography.size.body,
          '--admin-size-supporting': adminTypography.size.supporting,
          '--admin-size-micro': adminTypography.size.micro,

          '--admin-weight-thin': adminTypography.weight.thin,
          '--admin-weight-extra-light': adminTypography.weight.extraLight,
          '--admin-weight-normal': adminTypography.weight.normal,
          '--admin-weight-medium': adminTypography.weight.medium,
          '--admin-weight-semibold': adminTypography.weight.semibold,

          '--admin-line-tight': adminTypography.lineHeight.tight,
          '--admin-line-heading': adminTypography.lineHeight.heading,
          '--admin-line-body': adminTypography.lineHeight.body,
          '--admin-line-compact': adminTypography.lineHeight.compact,
        } as CSSProperties
      }
    >
      {children}
    </main>
  );
}
