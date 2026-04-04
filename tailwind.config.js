/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gallery: {
          bg: '#f7f5f3',
          surface: '#ffffff',
          elevated: '#fafaf9',
          line: '#e7e5e4',
          muted: '#78716c',
          ink: '#1c1917',
        },
      },
      boxShadow: {
        soft: '0 22px 60px -28px rgba(28, 25, 23, 0.12)',
        card: '0 1px 3px rgba(28, 25, 23, 0.06)',
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
