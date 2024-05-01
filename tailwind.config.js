/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6741d9",
        primaryLight: "#7950f2",
      },
    },
  },
  plugins: [],
};
