/** @type {import('tailwindcss').Config} */
const colors = require('./colors');
module.exports = {
  content: [
    './screens/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './App.tsx',
  ],
  theme: {
    extend: {
      colors: { ...colors, 'algo-green-1': '#24ae9c' },
    },
  },
  plugins: [],
};
