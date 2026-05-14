import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/shared/CountUp";
import { PROBLEM_QUOTES, STATS } from "@/lib/data";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function Problem() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: "left",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section id="problem" className="py-36 px-6 lg:px-12 relative bg-bg-mid overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-critical/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Label + heading */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-primary font-body tracking-[0.35em] uppercase mb-5"
        >
          The Problem
        </motion.p>

        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading font-800 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.06]
                     tracking-tight text-fg mb-5 max-w-3xl"
        >
          Diabetes is a global crisis.
          <span className="block text-fg-muted font-400 text-[0.6em] tracking-normal mt-3">
            And the most common way to manage it still hurts.
          </span>
        </motion.h2>

        {/* Accent line */}
        <div ref={lineRef} className="h-px w-24 bg-primary mb-20" />

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-c rounded-2xl overflow-hidden mb-20">
          {[
            {
              end: 828, suffix: "M",
              label: "diabetics worldwide",
              sub: "Source: Saeedi et al., Diabetes Res. Clin. Pract., 2019",
              color: "text-secondary",
            },
            {
              end: 212, suffix: "M",
              label: "diabetics in India",
              sub: "Roughly a quarter of all diabetics globally are Indian",
              color: "text-primary",
            },
            {
              end: 25, suffix: "%",
              label: "of global burden",
              sub: "India bears the highest regional diabetes burden in the world",
              color: "text-accent",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-bg-card px-10 py-12 group hover:bg-[#0f2536] transition-colors duration-500"
            >
              <p className={`font-heading font-900 text-[4rem] leading-none mb-3 ${s.color} tabular-nums`}>
                <CountUp end={s.end} suffix={s.suffix} duration={2.5} />
              </p>
              <p className="font-body font-600 text-fg text-lg mb-2">{s.label}</p>
              <p className="font-body text-fg-muted text-xs leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {PROBLEM_QUOTES.map((q, i) => (
            <motion.div
              key={i}
              variants={fadeUp} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative rounded-2xl border border-border-c bg-bg-card
                         p-8 lg:p-10 overflow-hidden group
                         hover:border-opacity-60 transition-all duration-500"
              style={{ "--accent": q.accentColor } as React.CSSProperties}
            >
              {/* Left accent bar */}
              <div
                className="absolute top-0 left-0 w-[3px] h-full rounded-full opacity-70"
                style={{ background: q.accentColor }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                style={{ background: `radial-gradient(800px at 0% 50%, ${q.accentColor}10, transparent 70%)` }}
              />

              <div className="relative pl-2">
                <p
                  className="font-heading text-[5rem] leading-none font-900 mb-3 -mt-4"
                  style={{ color: q.accentColor, opacity: 0.35 }}
                >
                  "
                </p>
                <p className="font-body text-fg leading-[1.7] text-[0.98rem] mb-5">
                  {q.quote}
                </p>
                <p className="text-[10px] text-fg-muted font-body uppercase tracking-[0.25em]">
                  {q.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
