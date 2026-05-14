import { motion } from "framer-motion";
import { AUTHORS, INSTITUTION, DEPARTMENT, PAPER_TITLE, FUTURE_WORK } from "@/lib/data";
import ImageSlot from "@/components/shared/ImageSlot";

// Dark bg: #083D77  dt-h=#FAFAF8  dt-b=#C2DCE8  dt-l=#8BBCCE  dt-m=#6AA0B8

export default function ResearchTeam() {
  return (
    <section id="team" className="section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#0D4D8A,#083D77_50%,#051E3E_100%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
           style={{ background: "rgba(218,65,103,0.06)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-36">
        <p className="font-mono text-[11px] tracking-label uppercase text-accent mb-6">The Team</p>
        <h2 className="font-heading font-900 text-[clamp(2.6rem,6vw,5.5rem)] tracking-title leading-[1.02] text-[#FAFAF8] mb-3 max-w-3xl">
          {DEPARTMENT}
        </h2>
        <p className="font-body text-[#C2DCE8] text-lg mb-5">{INSTITUTION}</p>
        <div className="h-[2px] w-16 bg-accent rounded-full mb-20" />

        {/* Institution image + authors */}
        <div className="lg:grid lg:grid-cols-[45fr_55fr] gap-12 mb-16">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <ImageSlot src="/assets/thapar-institute.png"
              alt="Thapar Institute of Engineering and Technology, Patiala"
              className="w-full aspect-[4/3] rounded-2xl mb-6" variant="dark"
              label="Thapar Institute campus" />
            <p className="font-body text-[#C2DCE8] text-sm leading-relaxed">
              Department of Electronics and Communication Engineering at
              Thapar Institute of Engineering and Technology, Patiala, India.
            </p>
          </motion.div>

          <div className="space-y-4">
            {AUTHORS.filter(a => a.isPI).map((a) => (
              <motion.div key={a.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl border border-accent/35 bg-accent/8 p-7 overflow-hidden group
                           hover:border-accent/55 transition-colors duration-500">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                                bg-[radial-gradient(500px_at_50%_-50%,rgba(218,65,103,0.1),transparent)]" />
                <div className="relative flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center
                                  font-heading font-900 text-xl text-[#FAFAF8] flex-shrink-0">
                    {a.initials}
                  </div>
                  <div>
                    <span className="inline-block font-mono text-[10px] text-accent/80 uppercase tracking-label
                                     px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10 mb-2">
                      Principal Investigator
                    </span>
                    <h3 className="font-heading font-800 text-[1.5rem] text-[#FAFAF8] tracking-tight leading-none mb-1">
                      {a.name}
                    </h3>
                    <p className="font-body text-[#C2DCE8] text-sm mb-1">{a.role}</p>
                    <a href={`mailto:${a.email}`}
                      className="font-mono text-xs text-[#8BBCCE] hover:text-accent transition-colors">
                      {a.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}

            {AUTHORS.filter(a => !a.isPI).map((a, i) => (
              <motion.div key={a.name}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/15 bg-white/6 p-6
                           hover:border-white/25 transition-colors duration-400 group overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                bg-[radial-gradient(300px_at_0%_0%,rgba(250,250,248,0.05),transparent)]" />
                <div className="relative flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/12 border border-white/15
                                  flex items-center justify-center font-heading font-800 text-base text-[#C2DCE8] flex-shrink-0">
                    {a.initials}
                  </div>
                  <div>
                    <h3 className="font-heading font-700 text-[#FAFAF8] text-lg tracking-tight leading-none mb-1">
                      {a.name}
                    </h3>
                    <p className="font-body text-[#C2DCE8] text-sm mb-0.5">{a.role}</p>
                    <a href={`mailto:${a.email}`}
                      className="font-mono text-[10px] text-[#8BBCCE] hover:text-accent/80 transition-colors">
                      {a.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Paper citation */}
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="border border-white/15 rounded-2xl p-8 lg:p-10 mb-8">
          <p className="font-mono text-[10px] text-[#8BBCCE] uppercase tracking-label mb-4">Research Paper</p>
          <p className="font-heading font-600 text-[#FAFAF8] text-xl leading-relaxed">{PAPER_TITLE}</p>
        </motion.div>

        {/* Future work */}
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="border-l-2 border-[#F4D35E]/60 pl-8">
          <p className="font-mono text-[10px] text-[#F4D35E]/80 uppercase tracking-label mb-4">Future Work</p>
          <p className="font-body text-[#C2DCE8] text-[1.0625rem] leading-[1.75] max-w-3xl">{FUTURE_WORK}</p>
          <p className="font-mono text-[9px] text-[#6AA0B8] uppercase tracking-label mt-4">
            Verbatim from conclusions section
          </p>
        </motion.div>
      </div>
    </section>
  );
}
