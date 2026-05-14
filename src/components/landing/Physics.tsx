import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PHYSICS_STEPS } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

// SVG diagram showing EM field + molecule alignment
function PhysicsDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto" fill="none">
      {/* EM wave (sine) */}
      <path
        d="M 10 100 C 30 60, 60 60, 80 100 C 100 140, 130 140, 150 100 C 170 60, 200 60, 220 100 C 240 140, 270 140, 290 100 C 310 60, 340 60, 360 100"
        stroke="#0891B2"
        strokeWidth="2"
        strokeDasharray="0"
        opacity="0.8"
      />
      {/* Field direction arrow */}
      <line x1="10" y1="100" x2="380" y2="100" stroke="#1E3A4A" strokeWidth="1" strokeDasharray="4 4" />

      {/* Molecules — elongated polar */}
      {[80, 150, 220, 290].map((x, i) => (
        <g key={i} transform={`translate(${x}, 100)`}>
          {/* Aligned state */}
          <ellipse cx="0" cy="0" rx="12" ry="5" fill="#059669" opacity="0.7"
            transform="rotate(0)" />
          <circle cx="11" cy="0" r="3" fill="#22D3EE" opacity="0.9" />
          <circle cx="-11" cy="0" r="3" fill="#0891B2" opacity="0.7" />
        </g>
      ))}

      {/* Labels */}
      <text x="200" y="24" textAnchor="middle" fill="#0891B2" fontSize="9"
        fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="2">
        MICROWAVE EM FIELD →
      </text>
      <text x="200" y="186" textAnchor="middle" fill="#059669" fontSize="9"
        fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="2">
        POLAR GLUCOSE MOLECULES ALIGN
      </text>
    </svg>
  );
}

export default function Physics() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".physics-card");
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: i * 0.12,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
      });
    });
  }, []);

  return (
    <section id="physics" ref={containerRef}
      className="py-36 px-6 lg:px-12 relative bg-bg overflow-hidden">

      {/* BG glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]
                      bg-primary/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-primary font-body tracking-[0.35em] uppercase mb-5">
          The Science
        </motion.p>

        <div className="lg:flex items-end justify-between gap-12 mb-6">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-heading font-800 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.06]
                       tracking-tight text-fg max-w-2xl"
          >
            How microwave sensing
            <span className="block text-primary">measures glucose.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="font-body text-fg-muted text-lg max-w-md leading-relaxed mt-4 lg:mt-0"
          >
            Glucose molecules are polar. A microwave field makes them align —
            and that alignment measurably changes the signal.
          </motion.p>
        </div>

        {/* Diagram */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
          className="py-10 mb-16 border border-border-c/40 rounded-2xl bg-bg-card/40 backdrop-blur"
        >
          <PhysicsDiagram />
          <p className="text-center text-[10px] text-fg-muted font-body tracking-widest uppercase mt-4">
            Microwave EM field forces polar glucose molecules to align → S-parameters shift
          </p>
        </motion.div>

        {/* 4 step cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {PHYSICS_STEPS.map((step, i) => (
            <div
              key={i}
              className="physics-card relative rounded-2xl border border-border-c bg-bg-card
                         p-8 lg:p-10 overflow-hidden group
                         hover:border-primary/30 transition-colors duration-500"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                style={{ background: `radial-gradient(600px at 50% -20%, ${step.color}10, transparent)` }}
              />

              <div className="relative">
                <span
                  className="block font-heading font-900 text-[5rem] leading-none mb-4 -mt-2"
                  style={{ color: step.color, opacity: 0.2 }}
                >
                  {step.number}
                </span>
                <h3 className="font-heading font-700 text-xl text-fg mb-3">{step.title}</h3>
                <p className="font-body text-fg-muted text-sm leading-[1.8]">{step.body}</p>
              </div>

              {/* Step accent dot */}
              <div
                className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: step.color, opacity: 0.5 }}
              />
            </div>
          ))}
        </div>

        {/* Key quote */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
          className="mt-10 p-8 lg:p-12 rounded-2xl
                     border border-primary/20 bg-gradient-to-r from-primary/8 via-bg-card/60 to-accent/8"
        >
          <p className="font-heading font-600 text-[clamp(1.1rem,2.5vw,1.5rem)] text-fg leading-[1.6] max-w-4xl">
            "This characteristic implies that the microwave sensor is{" "}
            <span className="text-secondary">ideally adapted for the non-invasive assessment</span>{" "}
            of biological parameters, such as BGL."
          </p>
          <p className="font-body text-[10px] text-fg-muted mt-5 uppercase tracking-[0.3em]">
            — Verbatim from the paper, on microwave sensing for glucose monitoring
          </p>
        </motion.div>
      </div>
    </section>
  );
}
