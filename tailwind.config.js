/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["Fredoka", "cursive"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
      backdropBlur: {
        sm: "4px",
      },
    },
  },
  plugins: [],
};
