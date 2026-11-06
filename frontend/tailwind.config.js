/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lambo: {
          gold: '#d4af37',
          'gold-light': '#e6be43',
          'gold-dark': '#c5a045',
          dark: '#070707',
          'dark-light': '#0a0a0a',
        }
      },
      fontFamily: {
        'barlow': ['"Barlow Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
