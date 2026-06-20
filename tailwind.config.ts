import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary palette for the GlucoSense aesthetic
        navy:       "#083D77",
        "navy-deep":"#051E3E",
        cream:      "#FEF6E4",   // warm golden — complement to navy blue
        "cream-alt":"#F5E8C8",  // slightly deeper warm gold for hover states
        snow:       "#FAFAF8",
        // Single accent — taste-skill: max 1 accent
        accent:     "#DA4167",
        "accent-hover": "#C4364F",
        // Data highlight only (numbers, metrics)
        gold:       "#F4D35E",
        // Tertiary — very sparingly
        coral:      "#F78764",
        // Semantic
        "text-dark": "#083D77",
        "text-inv":  "#FAFAF8",
        "muted-dark":"rgba(8,61,119,0.45)",
        "muted-inv": "rgba(250,250,248,0.45)",
        "border-dark":"rgba(8,61,119,0.1)",
        "border-inv": "rgba(250,250,248,0.1)",
      },
      // Semantic solid text colors — ZERO opacity games
      // dt-* = dark-theme text (for navy #083D77 backgrounds)
      // lt-* = light-theme text (for beige #EBEBD3 backgrounds)
      "dt": {
        h: "#FAFAF8",    // heading    (contrast 14:1)
        b: "#C2DCE8",    // body       (contrast 9:1)
        l: "#8BBCCE",    // label      (contrast 5.8:1)
        m: "#6AA0B8",    // muted      (contrast 4.5:1)
        d: "#1E4A60",    // border/divider
      },
      "lt": {
        h: "#083D77",    // heading    (contrast 8.5:1)
        b: "#1E5478",    // body       (contrast 6.8:1)
        l: "#345E7A",    // label      (contrast 5.2:1)
        m: "#3A6080",    // muted      (contrast 4.6:1)
        d: "#B0C8D8",    // border/divider
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body:    ["DM Sans", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      // Taste-skill: tracking-tighter for headlines
      letterSpacing: {
        display: "-0.04em",
        title:   "-0.03em",
        tight:   "-0.02em",
        label:   "0.18em",
      },
      animation: {
        "blink":     "blink 1.4s ease-in-out infinite",
        "float":     "float 6s ease-in-out infinite",
        "marquee":   "marquee 28s linear infinite",
        "marquee-rev":"marquee-rev 28s linear infinite",
        "ring-1":    "ring-expand 3.2s ease-out infinite",
        "ring-2":    "ring-expand 3.2s ease-out 0.8s infinite",
        "ring-3":    "ring-expand 3.2s ease-out 1.6s infinite",
      },
      keyframes: {
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.15" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        "ring-expand": {
          "0%":   { transform: "scale(0.6)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to:   { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
