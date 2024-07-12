/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB200',
        secondary: '#EB5B00',
        tertiary: '#E4003A',
        quaternary: '#B60071',
      }
    },
  },
  plugins: [],
}