import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { gsap, SplitText } from "@/lib/gsap";
import MicrowaveRipple from "@/components/shared/MicrowaveRipple";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Badge slides down
      tl.from(badgeRef.current, { y: -30, opacity: 0, duration: 0.7 }, 0.3);

      // Heading words fly up
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "lines,words" });
        tl.from(
          split.words,
          { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.04 },
          0.5
        );
      }

      // Sub paragraph
      if (subRef.current) {
        const splitSub = new SplitText(subRef.current, { type: "lines" });
        tl.from(
          splitSub.lines,
          { y: 40, opacity: 0, duration: 0.8, stagger: 0.07 },
          "-=0.5"
        );
      }

      // Stats + CTA
      tl.from(statsRef.current, { y: 30, opacity: 0, duration: 0.7 }, "-=0.4");
      tl.from(ctaRef.current, { y: 30, opacity: 0, duration: 0.7 }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#071a2a] via-bg to-bg" />
      <div className="absolute top-1/2 left-[55%] -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-accent/3 blur-[100px] pointer-events-none" />

      {/* Noise grain */}
      <div className="noise absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20
                      grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-6 items-center min-h-screen">

        {/* ── Left col ──────────────────────────────── */}
        <div className="flex flex-col">
          {/* Research badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full
                                          border border-primary/30 bg-primary/8 backdrop-blur mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-live animate-blink" />
            <span className="text-[11px] text-secondary font-body tracking-[0.2em] uppercase font-500">
              Thapar Institute · Research Paper
            </span>
          </div>

          {/* Main heading */}
          <h1 ref={headingRef}
              className="font-heading font-900 leading-[1.02] tracking-[-0.02em] text-fg
                         text-[clamp(3rem,7vw,6rem)] mb-8 overflow-hidden">
            No needles.
            <br />
            <span className="text-primary">No pain.</span>
            <br />
            <span className="font-300 text-[0.6em] text-fg-muted tracking-normal">
              Non-invasive glucose
              <br className="hidden lg:block" /> monitoring.
            </span>
          </h1>

          {/* Sub — verbatim from abstract */}
          <p ref={subRef}
             className="font-body text-[1.05rem] leading-[1.75] text-fg-muted max-w-[480px] mb-10">
            A microwave-based antenna sensor combined with machine learning delivers{" "}
            <span className="text-fg font-500">
              a safe, quick, and comfortable alternative
            </span>{" "}
            for people with diabetes to regularly check their blood sugar levels —
            directly from the research paper.
          </p>

          {/* Stats row */}
          <div ref={statsRef} className="flex items-center gap-8 mb-12">
            {[
              { val: "828M",  label: "diabetics worldwide", color: "text-secondary" },
              { val: "212M",  label: "in India",            color: "text-primary"   },
              { val: "0.97",  label: "CatBoost AUC",        color: "text-accent"    },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className={`font-heading font-800 text-[2.2rem] leading-none ${s.color}`}>
                  {s.val}
                </span>
                <span className="text-[11px] text-fg-muted font-body mt-1 uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={() => document.querySelector("#pipeline")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3 px-7 py-3.5 bg-primary rounded-full font-body font-600
                         text-white hover:bg-secondary hover:text-bg transition-all duration-400
                         hover:shadow-[0_0_40px_rgba(8,145,178,0.4)] active:scale-95"
            >
              See How It Works
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-7 py-3.5 border border-border-c rounded-full font-body
                         text-fg-muted hover:border-primary/50 hover:text-secondary transition-all duration-400"
            >
              Live Dashboard
            </Link>
          </div>
        </div>

        {/* ── Right col — animated visualization ───── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[520px] mx-auto aspect-square"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-[-10%] rounded-full bg-primary/4 blur-3xl" />
          <MicrowaveRipple />

          {/* Floating label */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="absolute top-[15%] right-[-5%] glass rounded-xl px-4 py-3 text-right"
          >
            <p className="text-[10px] text-fg-muted font-body uppercase tracking-wider">Signal type</p>
            <p className="text-sm text-secondary font-heading font-600">Microwave S-Params</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="absolute bottom-[20%] left-[-5%] glass rounded-xl px-4 py-3"
          >
            <p className="text-[10px] text-fg-muted font-body uppercase tracking-wider">Substrate</p>
            <p className="text-sm text-accent font-heading font-600">Rogers R5880</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-fg-muted font-body tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-14 overflow-hidden rounded-full">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-primary to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
