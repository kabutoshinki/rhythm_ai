import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        "primary-orange": "#FF5722",
        mainBg: "#040506",
        searchBg: "#100f14",
        textColor: "#b1b1b1",
        primary: "#100f14",
        collectionBg: "rgba(0,0,0,.4)",
      },

      boxShadow: {
        primaryShadow: "0px 3px 20px rgba(0,0,0,0.4)",
      },
      screens: {
        xs: "336px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
