import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080A",
        card: "#111216",
        border: "#2A2B31",
        muted: "#A4A7B1",
        accent: "#67E8F9",
        success: "#22C55E",
        danger: "#EF4444"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(103,232,249,0.25), 0 12px 36px rgba(0,0,0,0.45)"
      }
    }
  },
  plugins: []
};

export default config;
