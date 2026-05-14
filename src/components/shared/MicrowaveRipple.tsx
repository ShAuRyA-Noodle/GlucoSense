import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Scientifically accurate: expanding microwave rings from antenna center,
// glucose molecules (polar ellipses) rotate to align with the EM field.
// Based on paper: "glucose molecules are polar in nature and thus in presence
// of an electric field they tend to align themselves in the direction of
// electric field"

const MOLECULE_POSITIONS = [
  { x: 220, y: 150 }, { x: 295, y: 185 }, { x: 170, y: 215 },
  { x: 330, y: 265 }, { x: 148, y: 290 }, { x: 270, y: 330 },
  { x: 210, y: 370 }, { x: 350, y: 340 }, { x: 138, y: 168 },
  { x: 370, y: 168 }, { x: 192, y: 122 }, { x: 315, y: 122 },
  { x: 385, y: 255 }, { x: 128, y: 345 }, { x: 255, y: 415 },
];

interface Props {
  className?: string;
  size?: number;
}

export default function MicrowaveRipple({ className = "", size = 520 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const moleculesRef = useRef<SVGGElement[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;
    const ctx = gsap.context(() => {
      // Molecules continuously align to EM field (rotation cycle)
      moleculesRef.current.forEach((mol, i) => {
        if (!mol) return;
        gsap.to(mol, {
          rotation: 180,
          duration: 3 + (i % 4) * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.18,
          transformOrigin: "50% 50%",
        });
        // Opacity pulse — simulates signal interaction
        gsap.to(mol, {
          opacity: 0.9,
          duration: 1.5 + (i % 3) * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.1,
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size} ${size}`}
      className={`w-full h-full select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glow-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0891B2" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-soft">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Ambient glow */}
      <circle cx={cx} cy={cy} r="160" fill="url(#glow-center)" />

      {/* Expanding rings — CSS animation for perf */}
      {[55, 90, 125, 160].map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          stroke="#0891B2"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          className={`animate-ring-${i + 1}`}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* Glucose molecules — polar ellipses that rotate */}
      {MOLECULE_POSITIONS.map((pos, i) => (
        <g
          key={i}
          ref={(el) => { if (el) moleculesRef.current[i] = el; }}
          style={{ transformOrigin: `${pos.x}px ${pos.y}px`, opacity: 0.4 }}
        >
          {/* Elongated polar molecule body */}
          <ellipse
            cx={pos.x}
            cy={pos.y}
            rx="7"
            ry="3"
            fill="#059669"
            opacity="0.7"
          />
          {/* Positive end */}
          <circle cx={pos.x + 6} cy={pos.y} r="2" fill="#22D3EE" opacity="0.9" />
          {/* Negative end */}
          <circle cx={pos.x - 6} cy={pos.y} r="2" fill="#0891B2" opacity="0.6" />
        </g>
      ))}

      {/* Antenna — center sensor */}
      <circle cx={cx} cy={cy} r="28" fill="#0891B2" opacity="0.08" filter="url(#blur-soft)" />
      <circle cx={cx} cy={cy} r="16" fill="#0D1F30" stroke="#0891B2" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="8"  fill="#0891B2" opacity="0.6" />
      <circle cx={cx} cy={cy} r="4"  fill="#22D3EE" />
      {/* Antenna pulse dot */}
      <circle cx={cx} cy={cy} r="4" fill="#22D3EE" className="animate-ring-1" style={{ transformOrigin: `${cx}px ${cy}px` }} />

      {/* Labels */}
      <text x={cx} y={size - 18} textAnchor="middle" fill="#1E3A4A" fontSize="10"
        fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="4">
        S-PARAMETER MEASUREMENT
      </text>
      <text x={cx} y={size - 6} textAnchor="middle" fill="#0891B2" fontSize="8"
        fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="2" opacity="0.6">
        MICROWAVE ANTENNA SENSOR
      </text>
    </svg>
  );
}
