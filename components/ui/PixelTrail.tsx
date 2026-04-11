import type { CSSProperties } from "react";

export type TrailPoint = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
};

type PixelTrailProps = {
  points: TrailPoint[];
};

export default function PixelTrail({ points }: PixelTrailProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[78] hidden md:block" aria-hidden="true">
      {points.map((point) => (
        <span
          key={point.id}
          className="absolute block bg-black"
          style={
            {
              width: point.size,
              height: point.size,
              opacity: point.opacity,
              transform: `translate3d(${point.x}px, ${point.y}px, 0)`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
