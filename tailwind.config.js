/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        craft: {
          50: '#f7f7f6',
          100: '#e8e8e6',
          200: '#d1d1cd',
          300: '#b0afa8',
          400: '#88867d',
          500: '#6d6b62',
          600: '#57554c',
          700: '#47453e',
          800: '#3c3a35',
          900: '#242422',
          950: '#1a1a1a',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e4ef',
          200: '#b3c9df',
          300: '#87a7c7',
          400: '#5b82a8',
          500: '#3f6489',
          600: '#324f6e',
          700: '#2a425c',
          800: '#1e3348',
          900: '#132536',
          950: '#0c1824',
        },
        forest: {
          400: '#52b788',
          500: '#40916c',
          600: '#2d6a4f',
          700: '#1b4332',
        },
        gold: {
          400: '#d4af37',
          500: '#b8960c',
          600: '#9a7d0a',
        },
        tech: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6,182,212,0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(45,106,79,0.12), transparent)',
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
