import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm Mariana's palette
        ivory: "#F4EDE0", // tortilla ivory
        char: "#141210", // charred black
        char2: "#221d18", // softer char for layered dark surfaces
        salsa: "#C1281E", // salsa red
        cilantro: "#3E6B36", // cilantro green
        lime: "#B7D34A", // lime
        steel: "#9AA1A6", // stainless steel
        masa: "#E7C98F", // warm corn / masa
        crema: "#FBF7EF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
    },
  },
  plugins: [],
};

export default config;
