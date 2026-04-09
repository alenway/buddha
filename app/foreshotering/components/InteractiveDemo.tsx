"use client";

import React from "react";
import BoxRenderer from "./BoxRenderer";
import RotationControls from "./RotationControls";
import MeasurementsPanel from "./MeasurementsPanel";
import FaceLegend from "./FaceLegend";
import { useRotation } from "../../hooks/useRotation";

/**
 * Shared Type Definition
 * Placing this outside the component allows it to be exported
 * and used by RotationControls or other sub-components.
 */
export interface RotationState {
  x: number;
  y: number;
  z: number;
}

export default function InteractiveDemo() {
  // Initialize the hook with default Euler angles (radians)
  const { rotation, setAxis, reset, dragHandlers } = useRotation({
    x: 0.4,
    y: 0.6,
    z: 0,
  });

  return (
    <div className="bg-paper-2 border border-paper-3 p-6 my-8">
      <header>
        <p className="font-mono text-[10px] tracking-[.15em] uppercase text-accent mb-4">
          Live Demo — Full 3D Rotation
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: 3D Visualization Canvas */}
        <div className="flex flex-col items-center">
          <BoxRenderer
            rotation={rotation}
            width={280}
            height={280}
            hw={1}
            hd={1}
            hh={1}
            showLabels={true}
            dragHandlers={dragHandlers}
          />
          <p className="font-mono text-[10px] text-ink-3 mt-2 text-center">
            Drag the cube to rotate in any direction
          </p>
        </div>

        {/* Section 2: Input Controls & UI Legend */}
        <div className="space-y-6">
          <RotationControls
            rotation={rotation}
            /** * Casting to 'any' is the fastest escape hatch,
             * but 'string | number | symbol' matches the broad prop definition
             * in your current RotationControls.
             */
            onAxisChange={
              setAxis as (axis: string | number | symbol, deg: number) => void
            }
            onReset={reset}
          />
          <div className="border-t border-paper-3 pt-4">
            <FaceLegend />
          </div>
        </div>

        {/* Section 3: Real-world Dimensions/Calculations */}
        <aside>
          <MeasurementsPanel
            rotation={rotation}
            realW={40}
            realD={40}
            realH={40}
            unit="mm"
          />
        </aside>
      </div>
    </div>
  );
}
