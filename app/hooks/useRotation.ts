"use client";
// hooks/useRotation.ts
import { useState, useRef, useCallback } from "react";

export interface RotationState {
  x: number; // radians
  y: number;
  z: number;
}

export function useRotation(initial: RotationState = { x: 0.4, y: 0.6, z: 0 }) {
  const [rotation, setRotation] = useState<RotationState>(initial);
  const dragging = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !lastPos.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setRotation(r => ({
      ...r,
      y: r.y + dx * 0.01,
      x: r.x + dy * 0.01,
    }));
  }, []);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
    lastPos.current = null;
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    const t = e.touches[0];
    lastPos.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current || !lastPos.current) return;
    const t = e.touches[0];
    const dx = t.clientX - lastPos.current.x;
    const dy = t.clientY - lastPos.current.y;
    lastPos.current = { x: t.clientX, y: t.clientY };
    setRotation(r => ({
      ...r,
      y: r.y + dx * 0.01,
      x: r.x + dy * 0.01,
    }));
  }, []);

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
    lastPos.current = null;
  }, []);

  const setAxis = useCallback((axis: keyof RotationState, deg: number) => {
    setRotation(r => ({ ...r, [axis]: deg * Math.PI / 180 }));
  }, []);

  const reset = useCallback(() => setRotation(initial), [initial]);

  return {
    rotation,
    setAxis,
    reset,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
