/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // container: {
    //   center: true,
    //   padding: {
    //     xxs: "1rem",
    //     xs: "1rem",
    //     sm: "2rem",
    //     md: "2rem",
    //     lg: "2rem",
    //     xl: "3rem",
    //     "2xl": "6rem",
    //   },
    //   screens: {
    //     xxs: "576px",
    //     xs: "728px",
    //     sm: "992px",
    //     md: "1200px",
    //     lg: "1400px",
    //     xl: "1600px",
    //     "2xl": "1850px",
    //   },
    // },
    screens: {
      xxs: "576px",
      xs: "728px",
      sm: "992px",
      md: "1200px",
      lg: "1400px",
      xl: "1600px",
      "2xl": "1850px",
    },
    extend: {
      fontFamily: {
        gotham: ["GothamSSm", "sans-serif"],
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
