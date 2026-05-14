import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { PHYSICS_STEPS } from "@/lib/data";
import ImageSlot from "@/components/shared/ImageSlot";

// Dark bg: #083D77  dt-h=#FAFAF8  dt-b=#C2DCE8  dt-l=#8BBCCE  dt-m=#6AA0B8

export default function Physics() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef   = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll(".physics-step");
      if (steps) {
        gsap.from(steps, {
          clipPath: "inset(0 0 100% 0)", y: 20, duration: 0.85, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: stepsRef.current, start: "top 80%", once: true },
        });
      }
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          x: -60, opacity: 0, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 80%", once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="physics" ref={sectionRef} className="section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,#0D4D8A,#083D77_60%,#051E3E_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
           style={{ background: "rgba(218,65,103,0.06)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-36">
        <p className="font-mono text-[11px] tracking-label uppercase text-accent mb-6">The Science</p>

        <div className="lg:grid lg:grid-cols-[45fr_55fr] gap-16 lg:gap-20">

          {/* Left: sticky quote + image */}
          <div ref={quoteRef} className="mb-16 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-heading font-900 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] tracking-title text-[#FAFAF8] mb-8">
              How microwave sensing
              <span className="block text-accent">measures glucose.</span>
            </h2>
            <p className="font-body text-[#C2DCE8] text-[1.0625rem] leading-[1.75] mb-10">
              Glucose molecules are polar. A microwave field forces them to align,
              and that alignment measurably shifts the signal.
            </p>
            <div className="border-l-2 border-[#F4D35E]/60 pl-6 mb-10">
              <p className="font-heading font-600 text-[#C2DCE8] text-[1.05rem] leading-[1.7] italic">
                "This characteristic implies that the microwave sensor is ideally adapted
                for the non-invasive assessment of biological parameters, such as BGL."
              </p>
              <p className="font-mono text-[9px] text-[#6AA0B8] uppercase tracking-label mt-4">
                Verbatim · paper methodology section
              </p>
            </div>
            <div className="mb-10 inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-white/15 bg-white/8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F4D35E] animate-blink" />
              <span className="font-mono text-[10px] text-[#8BBCCE] uppercase tracking-label">
                Modeled via Debye's equation
              </span>
            </div>
            <ImageSlot
              src="/assets/physics-visual.png"
              alt="Microwave electromagnetic field interacting with polar glucose molecules"
              className="w-full aspect-video rounded-2xl" variant="dark"
              label="Microwave field visualization" />
          </div>

          {/* Right: numbered steps */}
          <div ref={stepsRef}>
            {PHYSICS_STEPS.map((step, i) => (
              <div key={i}
                className="physics-step border-b border-white/10 py-8 lg:py-10 group hover:border-accent/40 transition-colors duration-400">
                <div className="flex gap-6 items-start">
                  <span className="font-mono font-700 text-[11px] tracking-label text-[#6AA0B8]
                                   group-hover:text-accent/80 transition-colors duration-300 pt-1 flex-shrink-0">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-heading font-700 text-[1.2rem] text-[#FAFAF8]
                                   group-hover:text-accent transition-colors duration-300 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="font-body text-[#C2DCE8] text-[0.9375rem] leading-[1.75]">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
