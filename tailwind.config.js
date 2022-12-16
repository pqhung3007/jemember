/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'neutral': {
          50: "#FAFFFA",
          100: "#F5F9F5",
          200: "#E5E9E5",
          300: "#D4D9D4",
          400: "#A3A9A3",
          500: "#738178",
          600: "#526152",
          700: "#3e4236",
          800: "#232620",
          900: "#1a1b18",
        },
      },
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}
