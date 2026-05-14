import { motion } from "framer-motion";
import { AUTHORS, INSTITUTION, DEPARTMENT, PAPER_TITLE, FUTURE_WORK } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

export default function ResearchTeam() {
  return (
    <section id="team" className="py-36 px-6 lg:px-12 bg-bg relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-primary font-body tracking-[0.35em] uppercase mb-5">
          The Team
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading font-800 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.06]
                     tracking-tight text-fg mb-3 max-w-3xl"
        >
          {DEPARTMENT}
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          className="font-body text-fg-muted text-lg mb-5"
        >
          {INSTITUTION}
        </motion.p>
        <div className="h-px w-24 bg-primary mb-20" />

        {/* Author cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {AUTHORS.map((author, i) => (
            <motion.div
              key={i}
              variants={fadeUp} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`relative rounded-2xl p-8 border overflow-hidden group
                          hover:scale-[1.02] transition-transform duration-500
                          ${author.isPI
                            ? "border-primary/50 bg-gradient-to-br from-primary/10 to-bg-card"
                            : "border-border-c bg-bg-card"
                          }`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                   style={{ background: author.isPI
                     ? "radial-gradient(400px at 50% 0%, rgba(8,145,178,0.12), transparent)"
                     : "radial-gradient(400px at 50% 0%, rgba(8,145,178,0.06), transparent)"
                   }} />

              <div className="relative">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center
                                  font-heading font-800 text-lg mb-6
                                  ${author.isPI
                                    ? "bg-primary text-white"
                                    : "bg-border-c/40 text-fg-muted"
                                  }`}>
                  {author.initials}
                </div>

                {/* PI badge */}
                {author.isPI && (
                  <span className="inline-block text-[10px] text-primary font-body uppercase
                                   tracking-widest px-2 py-0.5 rounded-full border border-primary/30
                                   bg-primary/10 mb-3">
                    Principal Investigator
                  </span>
                )}

                <h3 className="font-heading font-700 text-lg text-fg mb-1">{author.name}</h3>
                <p className="font-body text-fg-muted text-sm mb-3">{author.role}</p>
                <a
                  href={`mailto:${author.email}`}
                  className="font-body text-xs text-fg-muted hover:text-secondary transition-colors"
                >
                  {author.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Paper citation */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl border border-border-c bg-bg-card p-8 lg:p-10 mb-10"
        >
          <p className="font-body text-fg-muted text-[10px] uppercase tracking-[0.3em] mb-4">Research Paper</p>
          <p className="font-heading font-600 text-fg text-xl leading-relaxed">{PAPER_TITLE}</p>
        </motion.div>

        {/* Future work */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          className="rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/5 to-bg-card/50 p-8 lg:p-10"
        >
          <p className="font-body text-fg-muted text-[10px] uppercase tracking-[0.3em] mb-4">Future Work</p>
          <p className="font-body text-fg text-lg leading-relaxed max-w-3xl">{FUTURE_WORK}</p>
          <p className="font-body text-[10px] text-fg-muted mt-4 uppercase tracking-widest">
            — Verbatim from conclusions section of the paper
          </p>
        </motion.div>
      </div>
    </section>
  );
}
