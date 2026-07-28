/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mechanik: {
          noir: '#0A0A0B',
          /* Toned-down brand red (2026-07-28 restyle) - was a flat #EF4444.
             DEFAULT/light-text: darkened, AA-safe shade for text-on-light-background
             AND white-text-on-fill contexts (buttons) - 6.47:1 against white.
             dark-text: original brighter shade, reserved for text/accents that sit on
             fixed-dark backgrounds (hero scrim, loading screen) - 5.26:1 on mechanik-noir. */
          red: {
            DEFAULT: '#B91C1C',
            'light-text': '#B91C1C',
            'dark-text': '#EF4444',
          },
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
