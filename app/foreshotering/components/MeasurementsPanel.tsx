"use client";
// components/MeasurementsPanel.tsx
import { combinedRotation, computeMeasurements } from "../../lib/math3d";
import type { RotationState } from "../../hooks/useRotation";

interface Props {
  rotation: RotationState;
  realW: number;
  realD: number;
  realH: number;
  unit: string;
}

function Bar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.round(Math.min(100, (value / max) * 100));
  return (
    <div className="h-1 bg-paper-3 rounded-full overflow-hidden mt-1">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

interface RowProps {
  label: string;
  formula: string;
  value: string;
  barValue: number;
  barMax: number;
  barColor: string;
  accent?: string;
}

function Row({
  label,
  formula,
  value,
  barValue,
  barMax,
  barColor,
  accent,
}: RowProps) {
  return (
    <div className="py-2.5 border-b border-paper-3 last:border-0">
      <div className="flex items-baseline justify-between gap-2">
        <div className="min-w-0">
          <span className="text-[12px] text-ink-2 block">{label}</span>
          <span className="font-mono text-[10px] text-ink-3">{formula}</span>
          <Bar value={barValue} max={barMax} color={barColor} />
        </div>
        <span
          className="font-mono text-[14px] font-medium whitespace-nowrap shrink-0"
          style={{ color: accent || "#0f0e0b" }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export default function MeasurementsPanel({
  rotation,
  realW,
  realD,
  realH,
  unit,
}: Props) {
  const rotMat = combinedRotation(rotation.x, rotation.y, rotation.z);
  const ryDeg = (rotation.y * 180) / Math.PI;
  const rxDeg = (rotation.x * 180) / Math.PI;
  const m = computeMeasurements(rotMat, realW, realD, realH, rxDeg, ryDeg);
  const fmt = (n: number) => n.toFixed(1);
  const absY = Math.abs(ryDeg % 360);
  const absX = Math.abs(rxDeg % 360);
  const normY = absY > 180 ? 360 - absY : absY;
  const normX = absX > 180 ? 360 - absX : absX;
  const dispY = Math.min(normY, 180 - normY > 0 ? normY : 180 - normY);
  const dispX = Math.min(normX, 180 - normX > 0 ? normX : 180 - normX);
  const effY = Math.min(dispY, 90);
  const effX = Math.min(dispX, 90);

  return (
    <div className="space-y-0">
      <div className="font-mono text-[10px] tracking-[.15em] uppercase text-ink-3 mb-3">
        Live Measurements
      </div>

      <Row
        label="Front face width"
        formula={`${fmt(realW)} × cos(${effY.toFixed(1)}°)`}
        value={`${fmt(m.frontFaceWidth)} ${unit}`}
        barValue={m.frontFaceWidth}
        barMax={realW}
        barColor="#3b82f6"
        accent="#1d4ed8"
      />
      <Row
        label="Side face depth (into view)"
        formula={`${fmt(realD)} × sin(${effY.toFixed(1)}°)`}
        value={`${fmt(m.sideFaceWidth)} ${unit}`}
        barValue={m.sideFaceWidth}
        barMax={realD}
        barColor="#ec4899"
        accent="#be185d"
      />
      <Row
        label="Front face height"
        formula={`${fmt(realH)} × cos(${effX.toFixed(1)}°)`}
        value={`${fmt(m.frontFaceHeight)} ${unit}`}
        barValue={m.frontFaceHeight}
        barMax={realH}
        barColor="#10b981"
        accent="#047857"
      />
      <Row
        label="Top face depth (into view)"
        formula={`${fmt(realD)} × sin(${effX.toFixed(1)}°)`}
        value={`${fmt(m.topFaceHeight)} ${unit}`}
        barValue={m.topFaceHeight}
        barMax={realD}
        barColor="#f59e0b"
        accent="#b45309"
      />

      <div className="pt-3 mt-1">
        <div className="font-mono text-[10px] tracking-[.15em] uppercase text-ink-3 mb-2">
          Pythagoras Check
        </div>
        <div className="bg-ink rounded px-3 py-2.5 font-mono text-[11px] leading-loose text-paper-2">
          <span className="text-[#5DCAA5]">{fmt(m.frontFaceWidth)}</span>² +{" "}
          <span className="text-[#ec4899]">{fmt(m.sideFaceWidth)}</span>² ={" "}
          <span className="text-[#EF9F27]">
            {fmt(Math.sqrt(m.frontFaceWidth ** 2 + m.sideFaceWidth ** 2))}
          </span>{" "}
          ≈ {fmt(realW)} {unit}
          <br />
          <span className="text-[#10b981]">{fmt(m.frontFaceHeight)}</span>² +{" "}
          <span className="text-[#f59e0b]">{fmt(m.topFaceHeight)}</span>² ={" "}
          <span className="text-[#EF9F27]">
            {fmt(Math.sqrt(m.frontFaceHeight ** 2 + m.topFaceHeight ** 2))}
          </span>{" "}
          ≈ {fmt(realH)} {unit}
        </div>
      </div>
    </div>
  );
}
