/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    './screens/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
],
  
  theme: {
   colors: { ...colors, 'algo-green-1': '#24ae9c' },
  },
  plugins: [],
}

