import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      blue: {
        400: "#1AB4F0",
        800: "#0B5F9E",
        900: "#084B8A",
      },
      gray: {
        100: "#E6E6E6",
        200: "#CCCCCC",
        800: "#333333",
        900: "#141414",
      },
      pink: {
        500: "#E91E63",
        800: "#AD1457",
      },
    },
  },
  plugins: [],
};
export default config;
