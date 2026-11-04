import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lc-morado": "#4C1D95",
        "lc-morado-oscuro": "#3B0764",
        "lc-rosa": "#BE185D",
        "lc-rosa-suave": "#FCE7F3",
        "lc-blanco": "#FFFFFF",
        "lc-negro": "#1F1235",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        none: "0",
      },
    },
  },
  plugins: [],
};

export default config;
