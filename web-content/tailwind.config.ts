import type { Config } from "tailwindcss";
import img from "../../public/assets/images/bgImg.svg"

const config: Config = {
  // important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cs-bg": "url('../public/assets/images/bgImg.svg')",
      },
      fontFamily: {
        sans: ['var(--font-metropolis)']
      },
      colors: {
        cs: {
          "red": "#D11C1C",

          "purple-400": "#843DE7",
          "purple-500": "#7133CF",
          "purple-650": "#5E29B7",

          "error-50": "#FCF3F2",
          "error-500": "#DE524C",
          "error-600": "#CB3A32",


          "modal-100": "#404040D9",

          "success-bg": "#D9F9E7",

          "grey-50": "#FAFAFA",
          "grey-55": "#DFDFDF",
          "grey-60": "#E1C6FF",
          "grey-60-light": "#FAF0FF",
          "grey-100": "#5E5E5E",
          "grey-150": "#CACACA",
          "grey-200": "#B4B4B4",
          "grey-300": "#9F9F9F",
          "grey-400": "#898989",
          "grey-500": "#747474",
          "grey-700": "#494949",
          "grey-800": "#333333",
          "grey-dark": "#080808",

          "black-100": "#101010",
          "black-200": "#1E1E1E",

        }
      },
      boxShadow: {
        "1xl": "0 4px 4px -4px rgb(0 0 0 / 0.15)",
      },
      flex: {
        "2": '1 1 25%',
        "3": "1 1 50%",
        "4": "1 1 100%",
        "5": "1 1 65%",
        "6": "1 1 35%"
      }
    },
  },
  plugins: [],
};
export default config;
