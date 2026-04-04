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
          bg: '#09090b',
          surface: '#0c0c0f',
          elevated: '#141418',
          line: '#27272a',
          muted: '#a1a1aa',
          ink: '#fafafa',
        },
      },
      backgroundImage: {
        'mesh':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(56,189,248,0.08), transparent 45%), radial-gradient(ellipse 50% 35% at 0% 100%, rgba(99,102,241,0.06), transparent 50%)',
        'dot-grid':
          'radial-gradient(circle, rgba(250,250,250,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 80px -20px rgba(99, 102, 241, 0.35)',
        panel: '0 24px 80px -24px rgba(0, 0, 0, 0.65)',
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
