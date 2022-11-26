/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'neutral': {
          50: "#FAFCFA",
          100: "#F5F7F5",
          200: "#E5E7E5",
          300: "#D4D6D4",
          400: "#A3A7A3",
          500: "#737773",
          600: "#525452",
          700: "#3e4836",
          800: "#232820",
          900: "#1a1c18",
        },
      },
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}
