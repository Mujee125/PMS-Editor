/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        "bay-tavern": ["BayTavernS-Regular", "sans-serif"],
        "bay-tavern-plain": ["BayTavernPlain-Regular", "sans-serif"],
        copper: ["CooperHewitt-Book", "sans-serif"],
        roboto: ["Roboto-Regular", "sans-serif"],
        raleway: ["Raleway-Regular", "sans-serif"],
        corsiva: ["Monotype-Corsiva", "sans-serif"],
        primary: ["arial", "sans-serif"],
        paypalRegular: [
          "PayPal-Open-Regular",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        paypalBold: [
          "PayPal-Open-Bold",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        CuriousBlue: {
          100: "#d3e6fa",
          200: "#bdd9f7",
          300: "#a7cdf5",
          400: "#91c0f2",
          500: "#7bb3ef",
          600: "#65a7ed",
          700: "#4f9aea",
          800: "#398ee8",
          900: "#2381e5",
        },
        Downriver: {
          100: "#e6effc",
          200: "#b4cff5",
          300: "#81afef",
          400: "#4f8fe9",
          500: "#1d6fe2",
          600: "#1657b0",
          700: "#103e7e",
          800: "#0a254b",
          900: "#003087",
        },
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-border-once": {
          "0%": { borderColor: "transparent" },
          "50%": { borderColor: "#2684ff" },
          "100%": { borderColor: "#e6e0d9" },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "pulse-border-once": "pulse-border-once 1s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
