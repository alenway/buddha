"use client";
// components/Calculator.tsx
import { useState } from "react";
import BoxRenderer from "./BoxRenderer";
import { useRotation } from "../../hooks/useRotation";
import { combinedRotation, computeMeasurements } from "../../lib/math3d";

const UNITS = ["mm", "cm", "m", "in", "ft", "px"] as const;
type Unit = (typeof UNITS)[number];

interface Results {
  frontW: number;
  frontH: number;
  sideW: number;
  topH: number;
  cosY: number;
  sinY: number;
  cosX: number;
  sinX: number;
  pythW: number;
  pythH: number;
  unit: Unit;
  name: string;
  angleY: number;
  angleX: number;
}

export default function Calculator() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState<Unit>("mm");
  const [W, setW] = useState("40");
  const [D, setD] = useState("40");
  const [H, setH] = useState("40");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");

  const { rotation, setAxis, reset, dragHandlers } = useRotation({
    x: 0.3,
    y: 0.5,
    z: 0,
  });

  const angleYDeg = (rotation.y * 180) / Math.PI;
  const angleXDeg = (rotation.x * 180) / Math.PI;

  function calculate() {
    const w = parseFloat(W),
      d = parseFloat(D),
      h = parseFloat(H);
    if (!w || !d || !h || w <= 0 || d <= 0 || h <= 0) {
      setError("Please enter positive values for all three dimensions.");
      return;
    }
    setError("");
    const rotMat = combinedRotation(rotation.x, rotation.y, rotation.z);
    const m = computeMeasurements(rotMat, w, d, h, angleXDeg, angleYDeg);
    const ryRad = rotation.y;
    const rxRad = rotation.x;
    const cosY = Math.abs(Math.cos(ryRad));
    const sinY = Math.abs(Math.sin(ryRad));
    const cosX = Math.abs(Math.cos(rxRad));
    const sinX = Math.abs(Math.sin(rxRad));
    setResults({
      frontW: m.frontFaceWidth,
      frontH: m.frontFaceHeight,
      sideW: m.sideFaceWidth,
      topH: m.topFaceHeight,
      cosY,
      sinY,
      cosX,
      sinX,
      pythW: Math.sqrt(m.frontFaceWidth ** 2 + m.sideFaceWidth ** 2),
      pythH: Math.sqrt(m.frontFaceHeight ** 2 + m.topFaceHeight ** 2),
      unit,
      name: name || "Object",
      angleY: angleYDeg,
      angleX: angleXDeg,
    });
  }

  const fmt = (n: number) => n.toFixed(2);
  const normDeg = (r: number) => {
    const d = ((r * 180) / Math.PI) % 360;
    return Math.round(((d % 360) + 360) % 360);
  };

  return (
    <div className="bg-ink text-paper-2 p-8 rounded-sm">
      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-[.2em] uppercase text-accent mb-1">
          Interactive Tool
        </p>
        <h2 className="font-serif text-3xl text-paper leading-tight mb-2">
          Foreshortening Calculator
        </h2>
        <p className="text-[14px] text-paper-3/70 max-w-lg">
          Drag the cube to any orientation, enter real dimensions, and get
          precise foreshortening measurements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3D Preview */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <p className="font-mono text-[10px] tracking-[.15em] uppercase text-paper-3/50 mb-3 self-start">
            Drag to rotate freely
          </p>
          <BoxRenderer
            rotation={rotation}
            width={260}
            height={260}
            hw={0.9}
            hd={0.9}
            hh={0.9}
            showLabels={true}
            className="rounded border border-white/8"
            dragHandlers={dragHandlers}
          />
          <div className="w-full mt-4 space-y-2">
            {(["y", "x", "z"] as const).map((axis, i) => {
              const colors = ["#3b82f6", "#10b981", "#ef4444"];
              const labels = ["Y (left/right)", "X (up/down)", "Z (spin)"];
              return (
                <div key={axis} className="flex items-center gap-2">
                  <span
                    className="font-mono text-[10px] w-20 shrink-0"
                    style={{ color: colors[i] }}
                  >
                    {labels[i]}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={normDeg(rotation[axis])}
                    onChange={(e) => setAxis(axis, Number(e.target.value))}
                    className="flex-1 h-0.5"
                    style={{ accentColor: colors[i] }}
                  />
                  <span className="font-mono text-[11px] text-paper-3/70 w-9 text-right">
                    {normDeg(rotation[axis])}°
                  </span>
                </div>
              );
            })}
            <button
              onClick={reset}
              className="w-full mt-2 font-mono text-[10px] uppercase tracking-[.12em] py-1.5 border border-white/15 text-paper-3/60 hover:border-white/30 hover:text-paper-2 transition-colors rounded-sm"
            >
              Reset rotation
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-paper-3/50 block mb-1">
              Object name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Phone, Box..."
              className="w-full bg-white/7 border border-white/15 text-paper-2 font-mono text-sm px-3 py-2.5 outline-none focus:border-accent rounded-sm placeholder:text-white/20"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-paper-3/50 block mb-1">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="w-full bg-white/7 border border-white/15 text-paper-2 font-mono text-sm px-3 py-2.5 outline-none focus:border-accent rounded-sm"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {[
            {
              label: "Real Width (left → right)",
              val: W,
              set: setW,
              placeholder: "40",
            },
            {
              label: "Real Depth (front → back)",
              val: D,
              set: setD,
              placeholder: "40",
            },
            {
              label: "Real Height (top → bottom)",
              val: H,
              set: setH,
              placeholder: "40",
            },
          ].map(({ label, val, set, placeholder }) => (
            <div key={label}>
              <label className="font-mono text-[10px] tracking-[.15em] uppercase text-paper-3/50 block mb-1">
                {label}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 bg-white/7 border border-white/15 text-paper-2 font-mono text-sm px-3 py-2.5 outline-none focus:border-accent rounded-sm"
                />
                <span className="font-mono text-[11px] text-paper-3/40 w-6">
                  {unit}
                </span>
              </div>
            </div>
          ))}

          {error && (
            <p className="font-mono text-[11px] text-red-400">{error}</p>
          )}

          <button
            onClick={calculate}
            className="w-full bg-accent hover:bg-accent-dark text-white font-mono text-[12px] uppercase tracking-[.15em] py-3 transition-colors rounded-sm mt-2"
          >
            Calculate →
          </button>
        </div>

        {/* Results */}
        <div>
          {!results ? (
            <div className="h-full flex items-center justify-center border border-white/8 rounded-sm">
              <p className="font-mono text-[11px] text-paper-3/20 tracking-widest text-center px-4">
                Enter dimensions
                <br />
                and press Calculate
              </p>
            </div>
          ) : (
            <div className="border border-white/10 rounded-sm p-4 space-y-0">
              <div className="font-mono text-[10px] tracking-[.2em] uppercase text-paper-3/40 pb-3 border-b border-white/8 mb-1">
                {results.name} — results
              </div>

              {[
                {
                  label: "Visible width (front face)",
                  formula: `${fmt(parseFloat(W))} × cos(Y)`,
                  value: fmt(results.frontW),
                  color: "#3b82f6",
                  max: parseFloat(W),
                },
                {
                  label: "Side depth into view",
                  formula: `${fmt(parseFloat(D))} × sin(Y)`,
                  value: fmt(results.sideW),
                  color: "#ec4899",
                  max: parseFloat(D),
                },
                {
                  label: "Visible height (front face)",
                  formula: `${fmt(parseFloat(H))} × cos(X)`,
                  value: fmt(results.frontH),
                  color: "#10b981",
                  max: parseFloat(H),
                },
                {
                  label: "Top depth into view",
                  formula: `${fmt(parseFloat(D))} × sin(X)`,
                  value: fmt(results.topH),
                  color: "#f59e0b",
                  max: parseFloat(D),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="py-2.5 border-b border-white/6 last:border-0"
                >
                  <div className="flex justify-between items-baseline gap-2">
                    <div className="min-w-0">
                      <span className="text-[11px] text-paper-3/60 block">
                        {row.label}
                      </span>
                      <span className="font-mono text-[10px] text-paper-3/30">
                        {row.formula}
                      </span>
                      <div className="h-0.5 bg-white/8 mt-1.5 rounded-full overflow-hidden w-24">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (row.max > 0 ? parseFloat(row.value) / row.max : 0) * 100).toFixed(0)}%`,
                            background: row.color,
                          }}
                        />
                      </div>
                    </div>
                    <span
                      className="font-mono text-sm font-medium whitespace-nowrap"
                      style={{ color: row.color }}
                    >
                      {row.value} {results.unit}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-3 mt-1">
                <div className="font-mono text-[10px] tracking-[.15em] uppercase text-paper-3/30 mb-2">
                  Ratios
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>
                    <span className="text-paper-3/40">cos(Y) </span>
                    <span className="text-[#3b82f6]">
                      {results.cosY.toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span className="text-paper-3/40">sin(Y) </span>
                    <span className="text-[#ec4899]">
                      {results.sinY.toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span className="text-paper-3/40">cos(X) </span>
                    <span className="text-[#10b981]">
                      {results.cosX.toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span className="text-paper-3/40">sin(X) </span>
                    <span className="text-[#f59e0b]">
                      {results.sinX.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-2 bg-white/4 rounded-sm px-3 py-2 font-mono text-[10px] leading-relaxed">
                <span className="text-paper-3/30 block mb-1">Pythagoras:</span>
                <span style={{ color: "#3b82f6" }}>{fmt(results.frontW)}</span>²
                + <span style={{ color: "#ec4899" }}>{fmt(results.sideW)}</span>
                ² ={" "}
                <span style={{ color: "#EF9F27" }}>{fmt(results.pythW)}</span>{" "}
                {results.unit}
                <br />
                <span style={{ color: "#10b981" }}>{fmt(results.frontH)}</span>²
                + <span style={{ color: "#f59e0b" }}>{fmt(results.topH)}</span>²
                = <span style={{ color: "#EF9F27" }}>{fmt(results.pythH)}</span>{" "}
                {results.unit}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
