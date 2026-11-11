import type { CSSProperties } from 'react';

type BlockProps = {
  height: string;
  width?: string;
  radius?: string;
  tone?: 'subtle' | 'strong' | 'accent' | 'dark' | 'light';
  className?: string;
  style?: CSSProperties;
};

/**
 * A raw skeleton block — no text, no icons, just a div with explicit
 * height, width, background and radius. All values come from tokens
 * or from the caller. Colors come from --admin-* variables (real
 * variables on the admin-scope element) with safe fallbacks.
 */
export function Block({
  height,
  width = '100%',
  radius = 'var(--ds-radius-md, 0.375rem)',
  tone = 'subtle',
  className = '',
  style,
}: BlockProps) {
  const bg: Record<string, string> = {
    subtle: 'var(--admin-surface-subtle, var(--admin-surface-subtle))',
    strong: 'var(--admin-border-subtle, rgba(0,0,0,0.1))',
    accent: 'var(--admin-accent, var(--admin-text-primary))',
    dark: 'var(--admin-text-primary, #2a2a2a)',
    light: 'var(--admin-surface, var(--admin-surface))',
  };

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height,
        width,
        borderRadius: radius,
        backgroundColor: bg[tone],
        ...style,
      }}
    />
  );
}

type CardProps = {
  children: React.ReactNode;
  height: string;
  variant?: 'default' | 'dark';
  className?: string;
};

/**
 * Raw card chrome — explicit height, token background, token border, no padding.
 * The height drives the layout; inner blocks are positioned by the caller.
 */
export function Card({ children, height, variant = 'default', className = '' }: CardProps) {
  const isDark = variant === 'dark';
  return (
    <div
      className={`flex min-w-0 flex-col overflow-hidden border ${className}`}
      style={{
        height,
        borderRadius: 'var(--ds-radius-xl, 0.75rem)',
        borderColor: isDark
          ? 'var(--admin-border-strong, rgba(0,0,0,0.2))'
          : 'var(--admin-border-subtle, rgba(0,0,0,0.1))',
        backgroundColor: isDark
          ? 'var(--admin-text-primary, #2a2a2a)'
          : 'var(--admin-surface, var(--admin-surface))',
      }}
    >
      {children}
    </div>
  );
}
