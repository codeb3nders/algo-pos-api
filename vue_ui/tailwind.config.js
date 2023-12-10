/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      "algo-green-1": "#70c0bd",
      "algo-orange-1" : "#f60"
    }
  },
  plugins: [require('flowbite/plugin')]
}
