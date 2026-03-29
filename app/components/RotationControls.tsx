"use client";
// components/RotationControls.tsx
import type { RotationState } from "../hooks/useRotation";

interface Props {
  rotation: RotationState;
  onAxisChange: (axis: keyof RotationState, deg: number) => void;
  onReset: () => void;
}

const AXES: {
  key: keyof RotationState;
  label: string;
  color: string;
  desc: string;
}[] = [
  {
    key: "y",
    label: "Y axis",
    color: "#3b82f6",
    desc: "Left ↔ Right (foreshortens width & depth)",
  },
  {
    key: "x",
    label: "X axis",
    color: "#10b981",
    desc: "Up ↕ Down (foreshortens height & depth)",
  },
  {
    key: "z",
    label: "Z axis",
    color: "#ef4444",
    desc: "Spin in place (rotate around screen)",
  },
];

function radToDeg(r: number): number {
  return Math.round((r * 180) / Math.PI);
}

export default function RotationControls({
  rotation,
  onAxisChange,
  onReset,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] tracking-[.15em] uppercase text-ink-3">
          Rotation Controls
        </span>
        <button
          onClick={onReset}
          className="font-mono text-[10px] tracking-[.12em] uppercase px-3 py-1 border border-paper-3 text-ink-3 hover:border-ink hover:text-ink transition-colors"
        >
          Reset
        </button>
      </div>

      {AXES.map(({ key, label, color, desc }) => {
        const deg = radToDeg(rotation[key]);
        const normalized = ((deg % 360) + 360) % 360;
        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                  style={{ background: color }}
                />
                <span
                  className="font-mono text-[11px] font-medium"
                  style={{ color }}
                >
                  {label}
                </span>
              </div>
              <span className="font-mono text-sm font-medium text-ink">
                {normalized}°
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={normalized}
              onChange={(e) => onAxisChange(key, Number(e.target.value))}
              className="w-full h-1 rounded appearance-none cursor-pointer"
              style={{
                accentColor: color,
                background: `linear-gradient(to right, ${color} ${(normalized / 360) * 100}%, #e4dfd3 ${(normalized / 360) * 100}%)`,
              }}
            />
            <p className="text-[10px] text-ink-3 mt-1 font-mono">{desc}</p>
          </div>
        );
      })}

      <div className="mt-3 pt-3 border-t border-paper-3">
        <p className="text-[11px] text-ink-3 font-mono flex items-center gap-1.5">
          <span className="text-accent">↔</span>
          Drag the cube directly to rotate in any direction
        </p>
      </div>
    </div>
  );
}
