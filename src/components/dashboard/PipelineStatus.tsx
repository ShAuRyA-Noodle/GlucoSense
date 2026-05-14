import { PIPELINE_STEPS } from "@/lib/data";

const TAG_COLORS: Record<string, string> = {
  Hardware:        "bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]",
  Processing:      "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  Preprocessing:   "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  "Deep Learning": "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
  Optimisation:    "bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]",
  "ML Model":      "bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]",
  "IoT Edge":      "bg-[#F0FDF4] text-[#059669] border-[#A7F3D0]",
};

export default function PipelineStatus() {
  return (
    <div className="bg-white border border-[#A5F3FC] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-heading font-700 text-[#134E4A] text-base">ML Pipeline</p>
          <p className="font-body text-xs text-[#64748B] mt-0.5">From Fig. 1 flowchart — Kaur, Manik, Gupta, Punj, Upadhyay, Kaur (Thapar Institute)</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-blink" />
          <span className="font-body text-xs text-[#64748B]">Simulation Mode</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-stretch gap-2 min-w-max">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.step} className="flex items-center gap-2">
              <div className="flex flex-col items-center bg-[#F0FDFA] border border-[#A5F3FC]
                              rounded-xl px-4 py-3 min-w-[120px] hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] text-[#64748B] font-body">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-body uppercase tracking-wide
                                   ${TAG_COLORS[step.tag] ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>
                    {step.tag}
                  </span>
                </div>
                <span className="font-heading font-600 text-xs text-[#134E4A] text-center leading-tight">
                  {step.label}
                </span>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-[#A5F3FC]">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
