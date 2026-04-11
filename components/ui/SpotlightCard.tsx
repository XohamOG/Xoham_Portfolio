"use client";

import { useState, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        <span
          className="pointer-events-none absolute z-[1] h-40 w-40 rounded-full border-2 border-black/20 bg-white/40"
          style={{
            left: position.x - 80,
            top: position.y - 80,
          }}
        />
      ) : null}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
