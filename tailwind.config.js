/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        scrollX: {
          "0%": { transform: "translateX(-100%)" }, // Left → Right
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        scrollX: "scrollX 20s linear infinite",
      },
    },
  },
  plugins: [],
};
