/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
        // Shared spacing tokens
        'gap-xs': '4px',
        'gap-sm': '8px',
        'gap-md': '12px',
        'gap-lg': '16px',
        'gap-xl': '24px',
        'gap-2xl': '32px',
        'gap-3xl': '48px',
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
