/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mechanik: {
          bg: '#0A0A0B',
          red: '#EF4444',
          yellow: '#FACC15',
          gray: '#18181B',
          light: '#F4F4F5',
        },
      },
    },
  },
  plugins: [],
}
