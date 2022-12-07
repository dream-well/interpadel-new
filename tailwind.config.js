/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#0A0A0A",
        "dark": "#1D1829",
        "green": "#C2FF00",
        "grey-dark": "#1F2024",
        "grey": "#4A4654",
        "grey-light": "#2C303A",
        "grey7": "#77747F",
        "light": "#F4F3F4"
      },
    },
  },
  plugins: [],
}