/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- Semantic, theme-aware tokens (backed by CSS vars in index.css) ----
        // Channels are space-separated RGB so Tailwind's <alpha-value> works.
        base: "rgb(var(--c-base) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        surface2: "rgb(var(--c-surface-2) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        fg: "rgb(var(--c-fg) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        "accent-bright": "rgb(var(--c-accent-bright) / <alpha-value>)",
        success: "rgb(var(--c-success) / <alpha-value>)",
        alert: "rgb(var(--c-alert) / <alpha-value>)",
        star: "rgb(var(--c-star) / <alpha-value>)",

        // ---- Legacy aliases (re-pointed to the new B&W + electric-blue system) ----
        // Existing markup (~100 files) uses these; re-pointing them means the whole
        // app adopts the new look without touching every component. Purple/gold-glow
        // cosmic theme → sharp monochrome + electric blue.
        space: "rgb(var(--c-base) / <alpha-value>)",
        neutron: "rgb(var(--c-fg) / <alpha-value>)",
        cosmic: "rgb(var(--c-accent) / <alpha-value>)",
        nebula: "rgb(var(--c-accent) / <alpha-value>)",
        solar: "rgb(var(--c-star) / <alpha-value>)",
      },
      fontFamily: {
        // Per the redesign brief: characterful variable serif for display, a
        // clean neutral grotesque for body/UI, IBM Plex Mono for equations.
        // Atkinson Hyperlegible powers the readable-text accessibility option.
        display: ['"Fraunces"', "Georgia", "serif"],
        brand: ['"Fraunces"', "serif"],
        body: ['"Hanken Grotesk"', "sans-serif"],
        readable: ['"Atkinson Hyperlegible"', '"Hanken Grotesk"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      borderRadius: {
        // Sharper corners than the old soft cosmic cards.
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        // Sharp, chunky elevation (Duolingo-style) — no colored glow haze.
        glow: "0 4px 0 rgb(var(--c-shadow) / 0.9), 0 10px 24px rgb(0 0 0 / 0.35)",
        "glow-gold": "0 4px 0 rgb(var(--c-shadow) / 0.9), 0 10px 24px rgb(0 0 0 / 0.25)",
        card: "0 1px 0 rgb(var(--c-line) / 0.08), 0 8px 24px rgb(0 0 0 / 0.28)",
        press: "0 2px 0 rgb(var(--c-shadow) / 0.9)",
      },
    },
  },
  plugins: [],
};
