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
        900: "#2c3e50",
        800: "#34495e",
      },
      neutral: {
        200: "#d1d5db",
        400: "#bdc3c7",
      },
    },
    extend: {},
  },
  plugins: [],
};
