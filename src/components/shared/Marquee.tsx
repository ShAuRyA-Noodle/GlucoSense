// Kinetic marquee strip
// Fade technique: positioned gradient divs with EXACT background colors
// mask-image was showing dark navy at edges (transparent = see-through to body bg)

interface Props {
  variant?: "dark" | "light";
  reverse?: boolean;
}

const ITEMS = [
  "Non-invasive Glucose Monitoring",
  "Microwave S-Parameters",
  "CatBoost AUC 0.97",
  "Rogers R5880",
  "Random Forest 97.2%",
  "Raspberry Pi IoT",
  "Debye's Model",
  "LSTM Feature Extraction",
  "828M Diabetics Worldwide",
  "Thapar Institute",
  "3-Layer Tissue Phantom",
  "80:20 Train-Test Split",
];

// Exact bg colors must match section backgrounds precisely
const BG = {
  dark:  "#051E3E",   // navy-deep
  light: "#FEF6E4",   // warm golden — must match section-light exactly
} as const;

export default function Marquee({ variant = "dark", reverse = false }: Props) {
  const isDark = variant === "dark";
  const bg     = BG[variant];
  const trackClass = reverse ? "animate-marquee-rev" : "animate-marquee";

  const renderItems = () =>
    [...ITEMS, ...ITEMS].map((item, i) => (
      <span key={`${item}-${i}`} className="inline-flex items-center gap-5 px-5">
        <span className={`font-mono font-500 text-[10.5px] tracking-[0.2em] uppercase
          ${isDark ? "text-white/45" : "text-[#083D77]/65"}`}>
          {item}
        </span>
        <span
          className="h-1 w-8 rounded-full flex-shrink-0"
          style={{
            backgroundColor: i % 3 === 0 ? "#DA4167" : i % 3 === 1 ? "#F4D35E" : "#F78764",
            opacity: isDark ? 0.52 : 0.7,
          }}
        />
      </span>
    ));

  return (
    <div
      className={`relative overflow-hidden border-y
        ${isDark
          ? "border-white/[0.06]"
          : "border-navy/[0.1]"
        }`}
      style={{ backgroundColor: bg }}
    >
      {/* Left fade — exact bg color, no alpha leak */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${bg} 30%, transparent 100%)` }}
      />
      {/* Right fade — exact bg color */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${bg} 30%, transparent 100%)` }}
      />

      <div className="group relative h-[52px] overflow-hidden">
        <div
          className={`marquee-track absolute left-0 top-1/2 flex w-max -translate-y-1/2 whitespace-nowrap
            will-change-transform ${trackClass}
            group-hover:[animation-play-state:paused]`}
          aria-label="Research highlights ticker"
          style={{ animationDuration: "24s" }}
        >
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
