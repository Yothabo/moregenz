/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        design: {
          bg: 'var(--ds-color-bg)',
          surface: 'var(--ds-color-bg-surface)',
          'surface-secondary': 'var(--ds-color-bg-surface-secondary)',
          'surface-secondary-hover': 'var(--ds-color-bg-surface-secondary-hover)',
          'fill-primary': 'var(--ds-color-bg-fill-primary)',
          'fill-primary-hover': 'var(--ds-color-bg-fill-primary-hover)',
          'fill-primary-active': 'var(--ds-color-bg-fill-primary-active)',
          'fill-disabled': 'var(--ds-color-bg-fill-disabled)',
          'text-primary': 'var(--ds-color-text-primary)',
          'text-secondary': 'var(--ds-color-text-secondary)',
          'text-tertiary': 'var(--ds-color-text-tertiary)',
          'text-disabled': 'var(--ds-color-text-primary-disabled)',
          'text-accent': 'var(--ds-color-text-accent)',
          'border-primary': 'var(--ds-color-border-primary)',
          'border-secondary': 'var(--ds-color-border-secondary)',
          'border-tertiary': 'var(--ds-color-border-tertiary-default)',
          'icon-primary': 'var(--ds-color-icon-primary)',
          'icon-secondary': 'var(--ds-color-icon-secondary)',
          'icon-secondary-hover': 'var(--ds-color-icon-secondary-hover)',
          'icon-disabled': 'var(--ds-color-icon-disabled)',
          'focus-ring': 'var(--ds-color-focus-ring)',
          'status-success': 'var(--ds-color-status-success)',
          'status-warning': 'var(--ds-color-status-warning)',
          'status-danger': 'var(--ds-color-status-danger)',
        },
        ink: '#000000',
        paper: '#f5f5f2',
        silver: '#C2CBD3',
        muted: '#929BA5',
        // Design system
        brand: {
          grey: '#4d4d4d',        // primary dark
          subtle: '#f5f5f5',      // input/search background
          subtleHover: '#ebebeb', // hover state
          line: 'rgba(77, 77, 77, 0.10)', // hairline borders
          muted: 'rgba(77, 77, 77, 0.40)', // muted text
          dim: 'rgba(77, 77, 77, 0.60)', // secondary text
        },
        accent: {
          sage: '#8aa89b',        // brand green
          pink: '#ff1493',        // her
          cream: '#c8ad8d',       // spaces
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
        heading: ['Cormorant Garamond', 'serif'],
        accent: ['Allura', 'cursive'],
      },
      fontSize: {
        'ds-display': ['var(--ds-font-size-display)', {
          lineHeight: 'var(--ds-line-height-display)',
          fontWeight: 'var(--ds-font-weight-display)',
        }],
        'ds-page-title': ['var(--ds-font-size-page-title)', {
          lineHeight: 'var(--ds-line-height-page-title)',
          fontWeight: 'var(--ds-font-weight-page-title)',
        }],
        'ds-heading-1': ['var(--ds-font-size-heading-1)', {
          lineHeight: 'var(--ds-line-height-heading-1)',
          fontWeight: 'var(--ds-font-weight-heading-1)',
        }],
        'ds-heading-2': ['var(--ds-font-size-heading-2)', {
          lineHeight: 'var(--ds-line-height-heading-2)',
          fontWeight: 'var(--ds-font-weight-heading-2)',
        }],
        'ds-heading-3': ['var(--ds-font-size-heading-3)', {
          lineHeight: 'var(--ds-line-height-heading-3)',
          fontWeight: 'var(--ds-font-weight-heading-3)',
        }],
        'ds-body-lg': ['var(--ds-font-size-body-large)', {
          lineHeight: 'var(--ds-line-height-body-large)',
          fontWeight: 'var(--ds-font-weight-body-large)',
        }],
        'ds-body': ['var(--ds-font-size-body)', {
          lineHeight: 'var(--ds-line-height-body)',
          fontWeight: 'var(--ds-font-weight-body)',
        }],
        'ds-body-sm': ['var(--ds-font-size-body-small)', {
          lineHeight: 'var(--ds-line-height-body-small)',
          fontWeight: 'var(--ds-font-weight-body-small)',
        }],
        'ds-label': ['var(--ds-font-size-label)', {
          lineHeight: 'var(--ds-line-height-label)',
          fontWeight: 'var(--ds-font-weight-label)',
        }],
        'ds-caption': ['var(--ds-font-size-caption)', {
          lineHeight: 'var(--ds-line-height-caption)',
          fontWeight: 'var(--ds-font-weight-caption)',
        }],
        'ds-micro': ['var(--ds-font-size-micro)', {
          lineHeight: 'var(--ds-line-height-micro)',
          fontWeight: 'var(--ds-font-weight-micro)',
        }],
        // Type scale — used consistently across admin + site
        'label': ['10px', { lineHeight: '1', letterSpacing: '0.15em' }], // uppercase labels
        'micro': ['11px', { lineHeight: '1.2' }], // tiny metadata
        'meta': ['12px', { lineHeight: '1.4' }], // small metadata
        'body': ['14px', { lineHeight: '1.5' }], // standard body
        'body-lg': ['16px', { lineHeight: '1.5' }], // larger body
        'title-sm': ['18px', { lineHeight: '1.3' }], // small titles
        'title': ['24px', { lineHeight: '1.2' }], // modal titles
        'display': ['32px', { lineHeight: '1.1' }], // page titles
      },
      spacing: {
        'ds-1': 'var(--admin-space-xxs)',
        'ds-2': 'var(--admin-space-xs)',
        'ds-3': 'var(--admin-space-sm)',
        'ds-4': 'var(--admin-space-md)',
        'ds-5': 'var(--admin-space-lg)',
        'ds-6': 'var(--admin-space-xl)',
        'ds-8': 'var(--admin-space-2xl)',
        'ds-10': 'var(--admin-space-3xl)',
        'ds-12': 'var(--admin-space-4xl)',
        'ds-16': 'var(--admin-space-5xl)',
        // Shared spacing tokens
        'gap-xs': '4px',
        'gap-sm': '8px',
        'gap-md': '12px',
        'gap-lg': '16px',
        'gap-xl': '24px',
        'gap-2xl': '32px',
        'gap-3xl': '48px',
      },
      width: {
        'ds-1': 'var(--ds-space-1)',
        'ds-2': 'var(--ds-space-2)',
        'ds-3': 'var(--ds-space-3)',
        'ds-4': 'var(--ds-space-4)',
        'ds-5': 'var(--ds-space-5)',
        'ds-6': 'var(--ds-space-6)',
        'ds-8': 'var(--ds-space-8)',
        'ds-10': 'var(--ds-space-10)',
        'ds-12': 'var(--ds-space-12)',
        'ds-16': 'var(--ds-space-16)',
      },
      height: {
        'ds-1': 'var(--ds-space-1)',
        'ds-2': 'var(--ds-space-2)',
        'ds-3': 'var(--ds-space-3)',
        'ds-4': 'var(--ds-space-4)',
        'ds-5': 'var(--ds-space-5)',
        'ds-6': 'var(--ds-space-6)',
        'ds-8': 'var(--ds-space-8)',
        'ds-10': 'var(--ds-space-10)',
        'ds-12': 'var(--ds-space-12)',
        'ds-16': 'var(--ds-space-16)',
      },
      minWidth: {
        'ds-1': 'var(--ds-space-1)',
        'ds-2': 'var(--ds-space-2)',
        'ds-3': 'var(--ds-space-3)',
        'ds-4': 'var(--ds-space-4)',
        'ds-5': 'var(--ds-space-5)',
        'ds-6': 'var(--ds-space-6)',
        'ds-8': 'var(--ds-space-8)',
        'ds-10': 'var(--ds-space-10)',
        'ds-12': 'var(--ds-space-12)',
        'ds-16': 'var(--ds-space-16)',
      },
      minHeight: {
        'ds-1': 'var(--ds-space-1)',
        'ds-2': 'var(--ds-space-2)',
        'ds-3': 'var(--ds-space-3)',
        'ds-4': 'var(--ds-space-4)',
        'ds-5': 'var(--ds-space-5)',
        'ds-6': 'var(--ds-space-6)',
        'ds-8': 'var(--ds-space-8)',
        'ds-10': 'var(--ds-space-10)',
        'ds-12': 'var(--ds-space-12)',
        'ds-16': 'var(--ds-space-16)',
      },
      maxWidth: {
        'ds-1': 'var(--ds-space-1)',
        'ds-2': 'var(--ds-space-2)',
        'ds-3': 'var(--ds-space-3)',
        'ds-4': 'var(--ds-space-4)',
        'ds-5': 'var(--ds-space-5)',
        'ds-6': 'var(--ds-space-6)',
        'ds-8': 'var(--ds-space-8)',
        'ds-10': 'var(--ds-space-10)',
        'ds-12': 'var(--ds-space-12)',
        'ds-16': 'var(--ds-space-16)',
      },
      maxHeight: {
        'ds-1': 'var(--ds-space-1)',
        'ds-2': 'var(--ds-space-2)',
        'ds-3': 'var(--ds-space-3)',
        'ds-4': 'var(--ds-space-4)',
        'ds-5': 'var(--ds-space-5)',
        'ds-6': 'var(--ds-space-6)',
        'ds-8': 'var(--ds-space-8)',
        'ds-10': 'var(--ds-space-10)',
        'ds-12': 'var(--ds-space-12)',
        'ds-16': 'var(--ds-space-16)',
      },
      size: {
        'ds-1': 'var(--ds-space-1)',
        'ds-2': 'var(--ds-space-2)',
        'ds-3': 'var(--ds-space-3)',
        'ds-4': 'var(--ds-space-4)',
        'ds-5': 'var(--ds-space-5)',
        'ds-6': 'var(--ds-space-6)',
        'ds-8': 'var(--ds-space-8)',
        'ds-10': 'var(--ds-space-10)',
        'ds-12': 'var(--ds-space-12)',
        'ds-16': 'var(--ds-space-16)',
      },
      boxShadow: {
        'ds-none': 'var(--ds-shadow-none)',
        'ds-xs': 'var(--ds-shadow-xs)',
        'ds-sm': 'var(--ds-shadow-sm)',
        'ds-md': 'var(--ds-shadow-md)',
        'ds-lg': 'var(--ds-shadow-lg)',
        'ds-xl': 'var(--ds-shadow-xl)',
      },
      borderRadius: {
        'ds-none': 'var(--ds-radius-none)',
        'ds-sm': 'var(--ds-radius-sm)',
        'ds-md': 'var(--ds-radius-md)',
        'ds-lg': 'var(--ds-radius-lg)',
        'ds-xl': 'var(--ds-radius-xl)',
        'ds-full': 'var(--ds-radius-full)',
      },
      borderColor: {
        hairline: 'rgba(77, 77, 77, 0.10)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
