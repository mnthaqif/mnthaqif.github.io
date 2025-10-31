/** @type {import('tailwindcss').Config} */
const forms = require('@tailwindcss/forms')
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#4f46e5', light: '#6366f1', dark: '#4338ca' },
        accent: { DEFAULT: '#14b8a6' }
      }
    }
  },
  plugins: [forms]
}
