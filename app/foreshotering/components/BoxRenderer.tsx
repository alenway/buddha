"use client";
// components/BoxRenderer.tsx
import { useEffect, useRef } from "react";
import {
  buildBoxFaces,
  combinedRotation,
  projectFaces,
  sortFaces,
} from "../../lib/math3d";
import type { RotationState } from "../../hooks/useRotation";

interface Props {
  rotation: RotationState;
  width: number;
  height: number;
  // box half-sizes in "units" (before scale)
  hw: number;
  hd: number;
  hh: number;
  showLabels?: boolean;
  className?: string;
  dragHandlers?: React.HTMLAttributes<HTMLCanvasElement>;
}

// Lighten or darken a hex color by a brightness factor
function applyBrightness(hex: string, brightness: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const f = Math.max(0.2, Math.min(1, brightness));
  return `rgb(${Math.round(r * f)},${Math.round(g * f)},${Math.round(b * f)})`;
}

export default function BoxRenderer({
  rotation,
  width,
  height,
  hw,
  hd,
  hh,
  showLabels = true,
  className = "",
  dragHandlers = {},
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const scale = Math.min(width, height) * 0.35;
    const cx = width / 2;
    const cy = height / 2;

    const rotMat = combinedRotation(rotation.x, rotation.y, rotation.z);
    const faceDefs = buildBoxFaces(hw, hd, hh);
    const faces = projectFaces(faceDefs, rotMat, scale, cx, cy);
    const sorted = sortFaces(faces);

    // Draw faces
    for (const face of sorted) {
      if (!face.visible) continue;
      const pts = face.projected;
      if (pts.length < 3) continue;

      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();

      // Fill with lighting-adjusted color
      ctx.fillStyle = applyBrightness(face.color, face.opacity);
      ctx.fill();

      // Stroke edge
      ctx.strokeStyle = applyBrightness(face.color, face.opacity * 0.55);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Face label in center
      if (showLabels) {
        const mx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
        const my = pts.reduce((s, p) => s + p[1], 0) / pts.length;

        ctx.save();
        ctx.font = `bold ${Math.round(scale * 0.13)}px 'DM Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Text shadow for readability
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillText(face.label, mx + 1, my + 1);
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.fillText(face.label, mx, my);
        ctx.restore();
      }
    }

    // Draw edges over faces (thin dark outline for all visible edges)
    ctx.save();
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 0.5;
    for (const face of sorted) {
      if (!face.visible) continue;
      const pts = face.projected;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }, [rotation, width, height, hw, hd, hh, showLabels]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height, cursor: "grab" }}
      className={`touch-none select-none ${className}`}
      {...dragHandlers}
    />
  );
}
