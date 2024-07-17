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
        secondary: '#da9b66',
        tertiary: '#B83280',
        quaternary: '#F9F9F9',
      }
    },
  },
  plugins: [],
}