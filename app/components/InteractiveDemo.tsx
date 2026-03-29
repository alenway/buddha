"use client";
// components/InteractiveDemo.tsx
import BoxRenderer from "./BoxRenderer";
import RotationControls from "./RotationControls";
import MeasurementsPanel from "./MeasurementsPanel";
import FaceLegend from "./FaceLegend";
import { useRotation } from "../hooks/useRotation";

export default function InteractiveDemo() {
  const { rotation, setAxis, reset, dragHandlers } = useRotation({
    x: 0.4,
    y: 0.6,
    z: 0,
  });

  return (
    <div className="bg-paper-2 border border-paper-3 p-6 my-8">
      <p className="font-mono text-[10px] tracking-[.15em] uppercase text-accent mb-4">
        Live Demo — Full 3D Rotation
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Canvas */}
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

        {/* Controls + legend */}
        <div className="space-y-6">
          <RotationControls
            rotation={rotation}
            onAxisChange={setAxis}
            onReset={reset}
          />
          <div className="border-t border-paper-3 pt-4">
            <FaceLegend />
          </div>
        </div>

        {/* Measurements */}
        <div>
          <MeasurementsPanel
            rotation={rotation}
            realW={40}
            realD={40}
            realH={40}
            unit="mm"
          />
        </div>
      </div>
    </div>
  );
}
