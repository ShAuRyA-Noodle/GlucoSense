import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:   "#0891B2",
        secondary: "#22D3EE",
        accent:    "#059669",
        bg:        "#0A0F1A",
        "bg-mid":  "#071520",
        "bg-card": "#0D1F30",
        "fg":      "#E2F8FF",
        "fg-muted":"#64748B",
        "border-c":"#1E3A4A",
        live:      "#22C55E",
        warning:   "#F59E0B",
        critical:  "#DC2626",
      },
      fontFamily: {
        heading: ["Figtree", "sans-serif"],
        body:    ["'Plus Jakarta Sans'", "sans-serif"],
      },
      animation: {
        "ring-1": "ring-expand 3s ease-out infinite",
        "ring-2": "ring-expand 3s ease-out 0.8s infinite",
        "ring-3": "ring-expand 3s ease-out 1.6s infinite",
        "ring-4": "ring-expand 3s ease-out 2.4s infinite",
        "blink":  "blink 1.5s ease-in-out infinite",
      },
      keyframes: {
        "ring-expand": {
          "0%":   { transform: "scale(0.5)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.2" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
