/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--color-paper)',
          light: 'var(--color-paper-light)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          dark: 'var(--color-muted-dark)',
        },
        blue: {
          DEFAULT: 'var(--color-blue)',
          studio: 'var(--color-blue)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border)',
          dark: 'var(--color-border-dark)',
        },
        dark: {
          surface: 'var(--color-dark-surface)',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'editorial': '0.08em',
        'kicker': '0.14em',
        'widest-editorial': '0.2em',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
