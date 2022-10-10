/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    container: {
      lg : '1024px',
      center: true,
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
