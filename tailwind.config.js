/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        showcase: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        gallery: {
          bg: 'var(--color-gallery-bg)',
          surface: 'var(--color-gallery-surface)',
          elevated: 'var(--color-gallery-elevated)',
          line: 'var(--color-gallery-line)',
          ink: 'var(--color-gallery-ink)',
        },
        shell: {
          muted: 'var(--color-shell-muted)',
          subtle: 'var(--color-shell-subtle)',
        },
      },
      boxShadow: {
        soft: '0 22px 60px -28px rgba(28, 25, 23, 0.12)',
        card: '0 1px 3px rgba(28, 25, 23, 0.06)',
        softDark: '0 22px 60px -28px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
