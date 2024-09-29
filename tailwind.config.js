/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        node: "#00C4B4",
        edge: "#FF00FF",
        visited: "#FF6666",
        selected: "#FF9900",
        path: "#FFFF00",
      },
    },
  },
  plugins: [],
};
