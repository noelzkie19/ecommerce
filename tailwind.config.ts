import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom spacing scale for consistent paddings and margins
      spacing: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "48px",
      },
      colors: {
        brand: {
          DEFAULT: "#f97316", // orange-500
          light: "#fb923c", // orange-400
          dark: "#ea580c", // orange-600
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
        },
        surface: {
          DEFAULT: "#111827", // gray-900 — sidebar/dark bg
          hover: "#1f2937", // gray-800
          border: "#374151", // gray-700
          deep: "#030712", // gray-950
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
