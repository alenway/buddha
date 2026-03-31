"use client";
// components/FaceLegend.tsx

const FACES = [
  { label: "Front", color: "#3b82f6", desc: "Faces you at 0°" },
  { label: "Back", color: "#8b5cf6", desc: "Hidden at 0°" },
  { label: "Top", color: "#10b981", desc: "Visible when tilted down" },
  { label: "Bottom", color: "#f59e0b", desc: "Visible when tilted up" },
  { label: "Right", color: "#ef4444", desc: "Visible when rotated left" },
  { label: "Left", color: "#ec4899", desc: "Visible when rotated right" },
];

export default function FaceLegend() {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[.15em] uppercase text-ink-3 mb-3">
        Face Colour Key
      </div>
      <div className="grid grid-cols-2 gap-2">
        {FACES.map((f) => (
          <div key={f.label} className="flex items-start gap-2">
            <span
              className="w-3 h-3 rounded-sm flex-shrink-0 mt-0.5 border border-black/10"
              style={{ background: f.color }}
            />
            <div>
              <span className="font-mono text-[11px] font-medium text-ink block">
                {f.label}
              </span>
              <span className="text-[10px] text-ink-3">{f.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
