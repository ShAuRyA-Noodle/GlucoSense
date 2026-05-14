import { motion } from "framer-motion";
import { HARDWARE, IOT_STACK, PRIOR_WORK } from "@/lib/data";
import ImageSlot from "@/components/shared/ImageSlot";

// Light bg: #EBEBD3  lt-h=#083D77  lt-b=#1E5478  lt-l=#345E7A  lt-m=#3A6080
// Cards: bg-white for contrast

const SPECS = [
  { label: "Antenna Substrate",  value: HARDWARE.antennaSubstrate, desc: "High-frequency laminate for microwave antenna fabrication" },
  { label: "Antenna Type",        value: "Flexible + AMC",          desc: "Artificial Magnetic Conductor backing for improved gain" },
  { label: "Simulation Tool",     value: HARDWARE.simulationTool,   desc: "EM simulation environment for tissue phantom modelling" },
  { label: "Tissue Phantom",      value: `${HARDWARE.phantomLayers}-Layer`, desc: "Simulates skin, fat, and muscle/blood tissue layers" },
  { label: "Edge Device",         value: HARDWARE.iotDevice,        desc: "Real-time IoT prediction on wearable hardware" },
  { label: "Signal Measured",     value: "S-Parameters",            desc: "Scattering parameters captured vs. microwave frequency" },
];

export default function Technology() {
  return (
    <section id="technology" className="section-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none"
           style={{ background: "rgba(218,65,103,0.05)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-36">
        <p className="font-mono text-[11px] tracking-label uppercase text-accent mb-6">Hardware</p>

        {/* Heading + antenna image */}
        <div className="lg:grid lg:grid-cols-[55fr_45fr] gap-12 mb-20 items-end">
          <div>
            <h2 className="font-heading font-900 text-[clamp(2.6rem,6vw,5.5rem)]
                           tracking-title leading-[1.02] text-[#083D77] mb-5 max-w-3xl">
              Built on flexible substrate.
              <span className="block font-400 text-[0.48em] tracking-[-0.01em] text-[#345E7A] mt-3">
                Deployed on Raspberry Pi edge hardware.
              </span>
            </h2>
            <div className="h-[2px] w-16 bg-accent rounded-full" />
          </div>
          <ImageSlot src="/assets/antenna-closeup.png"
            alt="Flexible microwave antenna on Rogers R5880 substrate"
            className="w-full aspect-video rounded-2xl mt-10 lg:mt-0"
            variant="light" label="Flexible antenna close-up" />
        </div>

        {/* Spec cards — white on beige */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-3 mb-16">
          {SPECS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className={`bg-white border border-[#B0C8D8] rounded-2xl p-7 lg:p-8
                          hover:shadow-[0_4px_24px_rgba(8,61,119,0.1)] transition-shadow duration-400
                          group ${i === 0 ? "lg:row-span-2 flex flex-col justify-end" : ""}`}>
              {i === 0 && (
                <div className="mb-6">
                  <div className="relative w-full aspect-video rounded-xl mb-4 overflow-hidden border border-[#B0C8D8] bg-[#083D77]/5">
                    <img
                      src="/assets/r5880.png"
                      alt="Rogers R5880 flexible antenna close-up"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051E3E]/65 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="font-heading font-900 text-[2rem] text-[#FAFAF8] leading-none">R5880</p>
                      <p className="font-mono text-[9px] text-[#F4D35E] uppercase tracking-label mt-1">Rogers substrate</p>
                    </div>
                  </div>
                </div>
              )}
              <p className="font-mono text-[10px] text-[#3A6080] uppercase tracking-label mb-2">{s.label}</p>
              <p className="font-heading font-800 text-[#083D77] text-xl mb-2 group-hover:text-accent transition-colors duration-300 tracking-tight">
                {s.value}
              </p>
              <p className="font-body text-[#1E5478] text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* IoT Stack */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-[#B0C8D8] rounded-2xl p-8 lg:p-12 mb-16 shadow-[0_2px_20px_rgba(8,61,119,0.05)]">
          <p className="font-heading font-700 text-[#083D77] text-xl mb-2">IoT Integration Stack</p>
          <p className="font-body text-[#345E7A] text-sm mb-8">As cited in the paper</p>
          <div className="grid md:grid-cols-3 gap-5">
            {IOT_STACK.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-[#B0C8D8] bg-[#EBEBD3]/50">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 animate-blink"
                     style={{ backgroundColor: i === 0 ? "#DA4167" : i === 1 ? "#F4D35E" : "#F78764",
                              animationDelay: `${i * 0.5}s` }} />
                <div>
                  <p className="font-heading font-700 text-[#083D77] text-base mb-1">{item.tech}</p>
                  <p className="font-body text-[#1E5478] text-sm">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Prior work */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="font-heading font-700 text-[#083D77] text-xl mb-2">Prior Art Comparison</p>
          <p className="font-mono text-[10px] text-[#3A6080] uppercase tracking-label mb-8">From literature review</p>
          <div className="bg-white border border-[#B0C8D8] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(8,61,119,0.05)]">
            {PRIOR_WORK.map((w, i) => (
              <div key={i}
                className={`flex flex-wrap items-center gap-4 justify-between px-7 py-5
                            ${i < PRIOR_WORK.length - 1 ? "border-b border-[#B0C8D8]" : ""}
                            hover:bg-[#EBEBD3]/40 transition-colors`}>
                <span className="font-body font-500 text-[#083D77] text-sm flex-1">{w.tech}</span>
                <span className="font-mono text-[#3A6080] text-sm">{w.frequency}</span>
                <span className="font-heading font-700 text-accent text-sm min-w-[200px] text-right">{w.metric}</span>
                <span className="font-mono text-[#3A6080] text-xs min-w-[140px] text-right">{w.source}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
