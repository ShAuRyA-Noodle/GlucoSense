import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PIPELINE_STEPS } from "@/lib/data";

// Light bg: #EBEBD3  lt-h=#083D77  lt-b=#1E5478  lt-l=#345E7A  lt-m=#3A6080
// Cards: bg-white — high contrast on beige

const TAG_COLORS: Record<string, string> = {
  Hardware:        "bg-[#EFF6FA] text-[#083D77] border-[#B0C8D8]",
  Processing:      "bg-[#F0FAF2] text-[#1A5E2A] border-[#A5D6B0]",
  Preprocessing:   "bg-[#FFF9EC] text-[#7A4E00] border-[#F4D35E]",
  "Deep Learning": "bg-[#F3F0FF] text-[#4A2C90] border-[#C4B5F5]",
  Optimisation:    "bg-[#EDFAF6] text-[#0A5944] border-[#A0D8CC]",
  "ML Model":      "bg-[#EFF6FA] text-[#083D77] border-[#B0C8D8]",
  "IoT Edge":      "bg-[#F0FAF2] text-[#1A5E2A] border-[#A5D6B0]",
};

const STAGE_GRADIENTS: Record<number, string> = {
  1: "radial-gradient(ellipse at 50% 120%, #DA4167 -30%, #083D77 60%, #051E3E 100%)",
  2: "linear-gradient(135deg, #051E3E 0%, #0A2E5A 40%, #0D4473 100%)",
  3: "linear-gradient(120deg, #052040 0%, #0B3A5A 50%, #073320 100%)",
  4: "radial-gradient(ellipse at 20% 80%, #1A0A4A 0%, #051E3E 50%, #0A1A3A 100%)",
  5: "linear-gradient(135deg, #051E3E 0%, #0A2F1A 50%, #0D3A0D 100%)",
  6: "radial-gradient(ellipse at 80% 20%, #3D0A1F 0%, #051E3E 60%, #0A0D1F 100%)",
  7: "linear-gradient(135deg, #051E3E 0%, #0F1A3A 40%, #1A1040 100%)",
};

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => `-${track.scrollWidth - window.innerWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section, pin: true, scrub: 0.8,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true, anticipatePin: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pipeline" ref={sectionRef} className="section-light relative overflow-hidden" style={{ height: "100vh" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(218,65,103,0.04),transparent)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-24 pb-8">
        <p className="font-mono text-[11px] tracking-label uppercase text-accent mb-5">The Pipeline</p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <h2 className="font-heading font-900 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.04] tracking-title text-[#083D77]">
            From antenna to prediction.
            <span className="block font-400 text-[0.48em] tracking-[-0.01em] text-[#345E7A] mt-2">
              7 stages · Real-time · Raspberry Pi edge
            </span>
          </h2>
          <p className="font-mono text-[10px] text-[#3A6080] tracking-label uppercase hidden lg:block pb-3">
            drag or scroll to explore
          </p>
        </div>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="absolute bottom-0 left-0 flex items-end gap-4 px-16 pb-16 will-change-transform"
           style={{ width: "max-content" }}>
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step.step}
            className="flex-shrink-0 w-[280px] lg:w-[300px] rounded-2xl overflow-hidden
                       border border-[#B0C8D8] bg-white hover:shadow-[0_8px_32px_rgba(8,61,119,0.12)]
                       transition-shadow duration-500 group"
            style={{ height: "340px" }}>
            {/* Image area */}
            <div className="relative h-[170px] overflow-hidden" style={{ background: STAGE_GRADIENTS[step.step] }}>
              <img
                src={`/pipeline/stage-${step.step}.png`}
                alt={`Stage ${step.step}: ${step.label}`}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051E3E]/72 via-[#051E3E]/18 to-[#051E3E]/40" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(244,211,94,0.18),transparent_55%)] opacity-80" />
              <span className="absolute top-4 left-5 font-mono font-700 text-[10px] tracking-label uppercase text-white/25">
                Stage {String(step.step).padStart(2, "0")}
              </span>
              <div className="absolute bottom-3 right-3">
                <span className="font-mono text-[8px] text-white/20 tracking-widest uppercase">
                  /pipeline/stage-{step.step}.png
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-[170px]">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading font-800 text-[1.0625rem] text-[#083D77] leading-tight tracking-tight">
                  {step.label}
                </h3>
                <span className="font-mono text-[9px] text-[#3A6080] ml-2 mt-0.5 flex-shrink-0">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              <p className="font-body text-[#1E5478] text-[0.8125rem] leading-[1.65] flex-1">
                {step.description}
              </p>
              <div className="mt-3 h-px w-8 bg-accent/30 group-hover:w-16 group-hover:bg-accent/60 transition-all duration-500 rounded-full" />
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-24" />
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {PIPELINE_STEPS.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-[#345E7A]/40" />
        ))}
      </div>
    </section>
  );
}
