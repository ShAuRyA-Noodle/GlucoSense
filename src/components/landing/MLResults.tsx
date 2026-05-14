import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  ResponsiveContainer, RadarChart, PolarGrid,
  PolarAngleAxis, Radar, Legend,
} from "recharts";
import { ML_MODELS, CONCLUSIONS } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

// Custom tooltip for charts
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg border border-border-c rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-fg-muted font-body mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-heading font-600 text-sm" style={{ color: p.color }}>
          {p.name}: <span className="text-fg">{p.value}{p.unit ?? "%"}</span>
        </p>
      ))}
    </div>
  );
};

export default function MLResults() {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!tableRef.current) return;
    const rows = tableRef.current.querySelectorAll("tbody tr");
    gsap.from(rows, {
      x: -40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: tableRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  const barData = ML_MODELS.map((m) => ({
    name:      m.shortName,
    Accuracy:  m.accuracy,
    Precision: m.precision,
    Recall:    m.recall,
    "F1-Score":m.f1,
    color:     m.color,
  }));

  const aucData = ML_MODELS.filter((m) => m.auc !== null).map((m) => ({
    name:  m.shortName,
    AUC:   m.auc!,
    color: m.color,
  }));

  const radarData = [
    { metric: "Accuracy",  ...Object.fromEntries(ML_MODELS.map((m) => [m.shortName, m.accuracy])) },
    { metric: "Precision", ...Object.fromEntries(ML_MODELS.map((m) => [m.shortName, m.precision])) },
    { metric: "Recall",    ...Object.fromEntries(ML_MODELS.map((m) => [m.shortName, m.recall])) },
    { metric: "F1-Score",  ...Object.fromEntries(ML_MODELS.map((m) => [m.shortName, m.f1])) },
  ];

  return (
    <section id="results" className="py-36 px-6 lg:px-12 bg-bg relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-primary font-body tracking-[0.35em] uppercase mb-5">
          Model Performance
        </motion.p>

        <div className="lg:flex lg:items-end lg:justify-between gap-12 mb-6">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-heading font-800 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.06]
                       tracking-tight text-fg max-w-2xl"
          >
            5 models. Real data.
            <span className="block text-primary">CatBoost wins AUC.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="font-body text-fg-muted text-base max-w-md leading-relaxed mt-4 lg:mt-0"
          >
            80:20 train-test split. All results from Table I and Table II of the paper.
            Every number is real and traceable.
          </motion.p>
        </div>

        {/* Accent line */}
        <div className="h-px w-24 bg-primary mb-16" />

        {/* Performance table */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-14 overflow-x-auto rounded-2xl border border-border-c bg-bg-card"
        >
          <table ref={tableRef} className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border-c">
                {["Model", "AUC", "Accuracy", "Precision", "Recall", "F1-Score"].map((h) => (
                  <th key={h} className="text-left py-5 px-5 text-[10px] text-fg-muted font-body uppercase tracking-[0.2em]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ML_MODELS.map((m, i) => (
                <tr
                  key={m.name}
                  className="border-b border-border-c/40 hover:bg-[#0f2536] transition-colors group"
                >
                  <td className="py-5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0"
                           style={{ backgroundColor: m.color }} />
                      <span className="font-body font-500 text-fg text-sm">{m.name}</span>
                    </div>
                    {m.note && (
                      <p className="text-[10px] text-fg-muted font-body mt-1 ml-5 hidden group-hover:block">
                        {m.note}
                      </p>
                    )}
                  </td>
                  <td className="py-5 px-5 font-body tabular-nums text-sm">
                    <span className={m.auc === 0.97 ? "text-primary font-700" : "text-fg-muted"}>
                      {m.auc ?? "—"}
                    </span>
                  </td>
                  <td className="py-5 px-5 font-body tabular-nums text-sm">
                    <span className={m.accuracy === 97.2 ? "text-live font-700" : "text-fg-muted"}>
                      {m.accuracy}%
                    </span>
                  </td>
                  <td className="py-5 px-5 text-fg-muted font-body tabular-nums text-sm">
                    {m.precision === 100 ? <span className="text-live font-600">100%</span> : `${m.precision}%`}
                  </td>
                  <td className="py-5 px-5 text-fg-muted font-body tabular-nums text-sm">
                    {m.recall === 100 ? <span className="text-[#a78bfa] font-600">100%</span> : `${m.recall}%`}
                  </td>
                  <td className="py-5 px-5 text-fg-muted font-body tabular-nums text-sm">
                    {m.f1}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-border-c font-body px-5 py-3 text-right">
            Source: Table I &amp; Table II — Kaur, Manik, Gupta, Punj, Upadhyay, Kaur. Thapar Institute.
          </p>
        </motion.div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          {/* Accuracy bar chart */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="border border-border-c rounded-2xl p-6 bg-bg-card"
          >
            <p className="font-heading font-600 text-fg text-sm mb-1">Model Accuracy (%)</p>
            <p className="font-body text-fg-muted text-xs mb-6">Table II — direct from paper</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barSize={28} barCategoryGap="35%">
                <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "Plus Jakarta Sans" }}
                  axisLine={false} tickLine={false} />
                <YAxis domain={[30, 105]} tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="Accuracy" radius={[4, 4, 0, 0]}>
                  {barData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* AUC chart */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="border border-border-c rounded-2xl p-6 bg-bg-card"
          >
            <p className="font-heading font-600 text-fg text-sm mb-1">AUC — Area Under ROC Curve</p>
            <p className="font-body text-fg-muted text-xs mb-6">Table I — TabNet AUC not reported in paper</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={aucData} barSize={32} barCategoryGap="40%">
                <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "Plus Jakarta Sans" }}
                  axisLine={false} tickLine={false} />
                <YAxis domain={[0.88, 1.0]} tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v) => v.toFixed(2)} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="bg-bg border border-border-c rounded-xl px-4 py-3">
                      <p className="text-xs text-fg-muted font-body mb-1">{label}</p>
                      <p className="font-heading font-600 text-primary text-sm">AUC: {payload[0].value}</p>
                    </div>
                  );
                }} />
                <Bar dataKey="AUC" radius={[4, 4, 0, 0]}>
                  {aucData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Conclusions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { val: "0.97",     label: "CatBoost AUC",          body: CONCLUSIONS.bestAUC,      color: "#0891B2" },
            { val: "97.2%",    label: "Random Forest Accuracy", body: CONCLUSIONS.bestAccuracy, color: "#22C55E" },
            { val: "Balanced", label: "XGBoost Trade-off",      body: CONCLUSIONS.xgboost,      color: "#F59E0B" },
            { val: "100%",     label: "TabNet Recall",          body: CONCLUSIONS.tabnet,       color: "#8B5CF6" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="border border-border-c rounded-2xl p-6 bg-bg-card
                         hover:border-opacity-60 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                   style={{ background: `radial-gradient(400px at 0% 0%, ${item.color}12, transparent)` }} />
              <p className="font-heading font-900 text-[2.5rem] leading-none mb-2" style={{ color: item.color }}>
                {item.val}
              </p>
              <p className="font-body font-600 text-fg text-sm mb-3">{item.label}</p>
              <p className="font-body text-fg-muted text-xs leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
