/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "index.html",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      primary: {
        800: "#34495e",
        900: "#2c3e50",
        950: "#192c3e",
      },
      neutral: {
        200: "#d1d5db",
        400: "#bdc3c7",
      },
      red: {
        500: "#f00",
      },
    },
    extend: {},
  },
  plugins: [],
};
