import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  ResponsiveContainer, Legend,
} from "recharts";
import { ML_MODELS } from "@/lib/data";

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#A5F3FC] rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs text-[#64748B] font-body mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-heading font-600 text-xs" style={{ color: p.color ?? "#0891B2" }}>
          {p.name}: <span className="text-[#134E4A]">{p.value}%</span>
        </p>
      ))}
    </div>
  );
};

export default function ModelComparison() {
  const multiData = ML_MODELS.map((m) => ({
    name:      m.shortName,
    Accuracy:  m.accuracy,
    Precision: m.precision,
    Recall:    m.recall,
    F1:        m.f1,
    color:     m.color,
  }));

  const aucData = ML_MODELS.filter((m) => m.auc !== null).map((m) => ({
    name:  m.shortName,
    AUC:   m.auc!,
    color: m.color,
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Multi-metric chart */}
      <div className="bg-white border border-[#A5F3FC] rounded-2xl p-6">
        <p className="font-heading font-700 text-[#134E4A] text-sm mb-1">
          Performance Comparison
        </p>
        <p className="font-body text-xs text-[#64748B] mb-6">
          Table II — Accuracy / Precision / Recall / F1 for all 5 models
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={multiData} barSize={12} barGap={2} barCategoryGap="30%">
            <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 10, fontFamily: "Plus Jakarta Sans" }}
              axisLine={false} tickLine={false} />
            <YAxis domain={[0, 110]} tick={{ fill: "#64748B", fontSize: 10 }}
              axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, color: "#64748B" }} />
            <Bar dataKey="Accuracy"  fill="#0891B2" radius={[3,3,0,0]} />
            <Bar dataKey="Precision" fill="#059669" radius={[3,3,0,0]} />
            <Bar dataKey="Recall"    fill="#F59E0B" radius={[3,3,0,0]} />
            <Bar dataKey="F1"        fill="#8B5CF6" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AUC chart */}
      <div className="bg-white border border-[#A5F3FC] rounded-2xl p-6">
        <p className="font-heading font-700 text-[#134E4A] text-sm mb-1">
          AUC — Area Under ROC Curve
        </p>
        <p className="font-body text-xs text-[#64748B] mb-6">
          Table I — TabNet AUC not reported in paper
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={aucData} barSize={36} barCategoryGap="40%">
            <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 10, fontFamily: "Plus Jakarta Sans" }}
              axisLine={false} tickLine={false} />
            <YAxis domain={[0.86, 1.0]} tick={{ fill: "#64748B", fontSize: 10 }}
              axisLine={false} tickLine={false}
              tickFormatter={(v: number) => v.toFixed(2)} />
            <Tooltip content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="bg-white border border-[#A5F3FC] rounded-xl px-4 py-3 shadow-lg">
                  <p className="text-xs text-[#64748B] font-body mb-1">{label}</p>
                  <p className="font-heading font-700 text-sm text-[#0891B2]">AUC: {payload[0].value}</p>
                </div>
              );
            }} />
            <Bar dataKey="AUC" radius={[4,4,0,0]}>
              {aucData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
