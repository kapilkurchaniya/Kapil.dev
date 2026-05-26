import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050713",
        panel: "rgba(13, 18, 38, 0.68)",
        line: "rgba(255, 255, 255, 0.12)"
      },
      boxShadow: {
        glow: "0 0 60px rgba(45, 212, 191, 0.22)",
        violet: "0 0 80px rgba(168, 85, 247, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
