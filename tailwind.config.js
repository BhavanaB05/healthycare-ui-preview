/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#7fffd4',
          primaryHover: '#47ba87',
          secondary: '#64bfa4',
          card: '#daf6ee',
          cardAlt: '#b3ffe0',
          accent: '#8fcab7',
          soft: '#8fcab7',
          teal: '#47ba87',
          tealLight: '#64bfa4',
          mint: '#b3ffe0',
          aqua: '#7fffd4',
        },
        risk: {
          low: '#8fcab7',
          moderate: '#64bfa4',
          high: '#47ba87',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(71, 186, 135, 0.12)',
        'card': '0 1px 3px rgba(71, 186, 135, 0.08), 0 8px 24px rgba(71, 186, 135, 0.06)',
        'card-hover': '0 4px 12px rgba(71, 186, 135, 0.12), 0 12px 32px rgba(71, 186, 135, 0.08)',
      },
      fontSize: {
        'clinical': ['13px', { lineHeight: '1.4' }],
        'clinical-sm': ['11px', { lineHeight: '1.35' }],
      },
    },
  },
  plugins: [],
}
