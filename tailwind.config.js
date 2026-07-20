/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mechanik: {
          noir: '#0A0A0B',
          red: '#EF4444',
          yellow: '#FACC15',
          light: '#F9FAFB',
          /* secondary dark surface (cards, alternating sections) - was hardcoded
             inline as #111113 throughout home/booking/customer-zone/estimator */
          surface: '#111113',
        },
      },
    },
  },
  plugins: [],
}
