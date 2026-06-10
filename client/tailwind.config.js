/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: "#0A0B14",
        cosmic: "#6B21D6",
        nebula: "#1E90FF",
        solar: "#FFB800",
        neutron: "#F0F4FF",
        success: "#22D3A0",
        alert: "#FF4757",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(107, 33, 214, 0.45)",
        "glow-gold": "0 0 24px rgba(255, 184, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
