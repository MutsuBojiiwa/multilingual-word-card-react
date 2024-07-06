/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          light: '#ACBFE6',
          DEFAULT: '#6688CC',
          dark: '#3B5D8F',
        },
        base: '#E5EBF4',
        secondary: '#F2B825',
        error: '#EA4E4E',
      },
      // height: {
      //   'header': '4rem',
      //   'main': 'calc(100vh - 4rem)',
      // },
      width: {
        'main': '1200px',
      },
      maxWidth: {
        'main': '1200px',
      },
      spacing: {
        '1/2-minus-80': 'calc(50% - 80px)',
      },
    },
  },
  plugins: [],
}

