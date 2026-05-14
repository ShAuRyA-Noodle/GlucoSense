import { HARDWARE, IOT_STACK } from "@/lib/data";

const specs = [
  { label: "Antenna",    value: "Flexible + AMC" },
  { label: "Substrate",  value: HARDWARE.antennaSubstrate },
  { label: "Simulation", value: HARDWARE.simulationTool },
  { label: "Phantom",    value: `${HARDWARE.phantomLayers}-Layer Tissue` },
  { label: "Edge Device",value: HARDWARE.iotDevice },
];

export default function SystemInfo() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {specs.map((s, i) => (
        <div key={i} className="bg-white border border-[#A5F3FC] rounded-xl p-4 hover:shadow-sm transition-shadow">
          <p className="text-[10px] text-[#64748B] font-body uppercase tracking-widest mb-1">{s.label}</p>
          <p className="font-heading font-600 text-sm text-[#0891B2]">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
