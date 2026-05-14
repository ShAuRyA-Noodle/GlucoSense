import { motion } from "framer-motion";
import { HARDWARE, IOT_STACK, PRIOR_WORK } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const SPEC_CARDS = [
  { label: "Antenna Substrate", value: HARDWARE.antennaSubstrate, desc: "High-frequency laminate for microwave antenna fabrication", accent: "#0891B2" },
  { label: "Antenna Type",      value: "Flexible + AMC",           desc: HARDWARE.antennaType, accent: "#22D3EE" },
  { label: "Simulation Tool",   value: HARDWARE.simulationTool,    desc: "Electromagnetic simulation environment for phantom design", accent: "#059669" },
  { label: "Tissue Phantom",    value: `${HARDWARE.phantomLayers}-Layer`,  desc: "Simulates skin, fat, and muscle/blood tissue layers in CST", accent: "#8B5CF6" },
  { label: "Deployment",        value: HARDWARE.iotDevice,          desc: HARDWARE.iotDescription, accent: "#F59E0B" },
  { label: "Signal Measured",   value: "S-Parameters",              desc: "Scattering parameters captured vs. microwave frequency", accent: "#0891B2" },
];

export default function Technology() {
  return (
    <section id="technology" className="py-36 px-6 lg:px-12 bg-bg-mid relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-primary font-body tracking-[0.35em] uppercase mb-5">
          Hardware &amp; Technology
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading font-800 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.06]
                     tracking-tight text-fg mb-5 max-w-3xl"
        >
          Built on flexible substrate.
          <span className="block text-fg-muted font-400 text-[0.55em] tracking-normal mt-3">
            Deployed on Raspberry Pi edge hardware.
          </span>
        </motion.h2>
        <div className="h-px w-24 bg-accent mb-20" />

        {/* Spec cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SPEC_CARDS.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative rounded-2xl border border-border-c bg-bg-card p-7
                         hover:border-primary/30 transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                   style={{ background: `radial-gradient(400px at 100% 0%, ${card.accent}10, transparent)` }} />

              <p className="text-[10px] text-fg-muted font-body uppercase tracking-[0.25em] mb-2">
                {card.label}
              </p>
              <p className="font-heading font-700 text-lg mb-3" style={{ color: card.accent }}>
                {card.value}
              </p>
              <p className="font-body text-fg-muted text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* IoT Stack */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl border border-border-c bg-bg-card p-8 lg:p-10 mb-16"
        >
          <p className="font-heading font-700 text-fg text-xl mb-6">IoT Integration Stack</p>
          <p className="font-body text-fg-muted text-sm mb-8 max-w-xl">
            Existing technologies for IoT-based glucose monitoring — as cited in the paper.
          </p>
          <div className="flex flex-wrap gap-6">
            {IOT_STACK.map((item, i) => (
              <div key={i} className="flex items-start gap-4 flex-1 min-w-[200px]">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-blink" />
                <div>
                  <p className="font-heading font-700 text-fg">{item.tech}</p>
                  <p className="font-body text-fg-muted text-sm mt-0.5">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Prior work comparison */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <p className="font-heading font-700 text-fg text-xl mb-2">Prior Art Comparison</p>
          <p className="font-body text-fg-muted text-sm mb-8 uppercase tracking-widest text-xs">
            From literature review section of the paper
          </p>
          <div className="rounded-2xl border border-border-c overflow-hidden bg-bg-card">
            {PRIOR_WORK.map((w, i) => (
              <div
                key={i}
                className={`flex flex-wrap items-center justify-between gap-4 px-7 py-5
                            ${i < PRIOR_WORK.length - 1 ? "border-b border-border-c/50" : ""}
                            hover:bg-[#0f2536] transition-colors`}
              >
                <span className="font-body font-500 text-fg text-sm flex-1">{w.tech}</span>
                <span className="font-body text-fg-muted text-sm font-mono">{w.frequency}</span>
                <span className="font-heading font-600 text-secondary text-sm min-w-[200px] text-right">
                  {w.metric}
                </span>
                <span className="font-body text-fg-muted text-xs min-w-[140px] text-right opacity-60">
                  {w.source}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
