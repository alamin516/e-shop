/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        carSellerTheme: {
          primary: "#005DA8",
          secondary: "#cb1112",
          accent : "#1FB2A6",
          neutral : "#FFFFFF",
          "base-100" : "#2A303C",
        },
      },
      "dark",
      "light"
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
