import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motion } from "framer-motion";
import { PIPELINE_STEPS } from "@/lib/data";

const TAG_COLORS: Record<string, string> = {
  Hardware:     "bg-primary/15 text-secondary border-primary/20",
  Processing:   "bg-accent/15 text-[#34d399] border-accent/20",
  Preprocessing:"bg-warning/15 text-warning border-warning/20",
  "Deep Learning": "bg-[#8B5CF6]/15 text-[#a78bfa] border-[#8B5CF6]/20",
  Optimisation: "bg-secondary/15 text-secondary border-secondary/20",
  "ML Model":   "bg-primary/15 text-primary border-primary/20",
  "IoT Edge":   "bg-accent/15 text-accent border-accent/20",
};

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    // Animate cards in first (before pin kicks in)
    const cards = track.querySelectorAll<HTMLElement>(".pipe-card");

    const ctx = gsap.context(() => {
      // Horizontal scroll + pin
      const totalWidth = track.scrollWidth - section.clientWidth;

      const scrollTween = gsap.to(track, {
        x: () => `-${track.scrollWidth - window.innerWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Cards fade in as they enter the viewport (during horizontal scroll)
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.92,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: `top+=${i * 120} top`,
            containerAnimation: scrollTween,
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-mid"
      style={{ height: "100vh" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[300px] bg-primary/5 blur-[120px]" />
      </div>

      {/* Header — fixed inside pinned section */}
      <div ref={headerRef} className="relative z-10 pt-24 pb-10 px-6 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-primary font-body tracking-[0.35em] uppercase mb-4"
        >
          The Pipeline
        </motion.p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-800 text-[clamp(2rem,4vw,3.5rem)] leading-[1.08]
                       tracking-tight text-fg"
          >
            From antenna to prediction.
            <span className="block text-fg-muted font-400 text-[0.55em] tracking-normal mt-1">
              7 stages · Real-time · Raspberry Pi edge deployment
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-fg-muted/50 text-xs font-body tracking-widest hidden lg:block"
          >
            ← SCROLL →
          </motion.p>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute bottom-0 left-0 flex items-end gap-5 px-16 pb-16"
        style={{ width: "max-content" }}
      >
        {PIPELINE_STEPS.map((step, i) => (
          <div
            key={step.step}
            className="pipe-card relative flex-shrink-0 w-[300px] lg:w-[320px]
                       border border-border-c rounded-2xl p-7 bg-bg-card
                       hover:border-primary/40 transition-colors duration-500 group"
            style={{ height: "260px" }}
          >
            {/* Step counter */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-heading font-900 text-[3rem] leading-none text-border-c">
                {String(step.step).padStart(2, "0")}
              </span>
              <span className={`text-[10px] px-2.5 py-1 rounded-full border font-body font-500 uppercase tracking-wider
                               ${TAG_COLORS[step.tag] ?? "bg-border-c/30 text-fg-muted border-border-c"}`}>
                {step.tag}
              </span>
            </div>

            <h3 className="font-heading font-700 text-[1.1rem] text-fg mb-3 leading-tight">
              {step.label}
            </h3>
            <p className="font-body text-fg-muted text-sm leading-[1.7]">
              {step.description}
            </p>

            {/* Connector line (not on last) */}
            {i < PIPELINE_STEPS.length - 1 && (
              <div className="absolute -right-[13px] top-1/2 -translate-y-1/2 z-10 flex items-center gap-1">
                <div className="w-3.5 h-px bg-border-c" />
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-border-c" />
              </div>
            )}

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                            bg-gradient-to-br from-primary/5 to-transparent" />
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-20" />
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {PIPELINE_STEPS.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-border-c" />
        ))}
      </div>
    </section>
  );
}
