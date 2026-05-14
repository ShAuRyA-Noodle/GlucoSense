import { Link } from "react-router-dom";
import SystemInfo      from "@/components/dashboard/SystemInfo";
import PipelineStatus  from "@/components/dashboard/PipelineStatus";
import ModelComparison from "@/components/dashboard/ModelComparison";
import { PAPER_TITLE, INSTITUTION, ML_MODELS, CONCLUSIONS } from "@/lib/data";

export default function Dashboard() {
  const best = ML_MODELS.find((m) => m.highlight === "highest-auc")!;
  const bestAcc = ML_MODELS.find((m) => m.highlight === "highest-accuracy")!;

  return (
    <div className="dashboard-root min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-[#A5F3FC]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="font-heading font-700 text-[#134E4A] text-sm tracking-wide">
              GlucoSense Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#64748B] font-body hidden md:block">
              Raspberry Pi — Simulation Mode
            </span>
            <Link
              to="/"
              className="text-sm font-body text-[#0891B2] hover:text-[#0891B2]/70 transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="font-heading font-800 text-2xl text-[#134E4A] mb-1">
            Research Dashboard
          </h1>
          <p className="font-body text-sm text-[#64748B]">{PAPER_TITLE}</p>
          <p className="font-body text-xs text-[#64748B]/60 mt-0.5">{INSTITUTION}</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Best AUC",      value: `${best.auc}`,    sub: `${best.name}`,     color: "#0891B2" },
            { label: "Best Accuracy", value: `${bestAcc.accuracy}%`, sub: `${bestAcc.name}`, color: "#22C55E" },
            { label: "Models Tested", value: "5",               sub: "LR, RF, XGB, CB, TN", color: "#8B5CF6" },
            { label: "Train/Test",    value: "80/20",           sub: "Split ratio",       color: "#F59E0B" },
          ].map((kpi, i) => (
            <div key={i} className="bg-white border border-[#A5F3FC] rounded-xl p-5 hover:shadow-sm transition-shadow">
              <p className="text-[10px] text-[#64748B] font-body uppercase tracking-widest mb-2">{kpi.label}</p>
              <p className="font-heading font-800 text-[2rem] leading-none mb-1" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
              <p className="font-body text-xs text-[#64748B]">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* System info strip */}
        <SystemInfo />

        {/* Pipeline */}
        <PipelineStatus />

        {/* Charts */}
        <ModelComparison />

        {/* Conclusions */}
        <div className="bg-white border border-[#A5F3FC] rounded-2xl p-6">
          <p className="font-heading font-700 text-[#134E4A] mb-4">Key Conclusions</p>
          <p className="font-body text-xs text-[#64748B] mb-6 uppercase tracking-widest">
            Verbatim from paper conclusions section
          </p>
          <div className="space-y-4">
            {Object.entries(CONCLUSIONS).map(([key, val]) => (
              <div key={key} className="flex gap-4 border-b border-[#E0F0F8] pb-4 last:border-0 last:pb-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2] mt-2 flex-shrink-0" />
                <p className="font-body text-sm text-[#134E4A] leading-relaxed">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="font-body text-xs text-[#64748B]/40 text-center pb-4">
          All data sourced exclusively from the research paper. No synthetic or simulated metrics.
        </p>
      </main>
    </div>
  );
}
