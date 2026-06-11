import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#064417",
        leaf: "#064417",
        ink: "#1a1a1a"
      },
      boxShadow: {
        soft: "0 14px 34px rgba(26, 77, 46, 0.11)"
      },
      maxWidth: {
        "1440": "1440px",
        "1600": "1600px",
        "8xl": "1600px"
      }
    }
  },
  plugins: []
};

export default config;
