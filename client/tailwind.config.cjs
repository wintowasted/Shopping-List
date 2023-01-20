/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "search": "url('./src/assets/searchIcon.svg')",
      },
      backgroundSize: {
        "sm": "20px",
      }
    },
  },
  plugins: [],
}
