"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

export default function TiltCard({ children, className = "", maxTilt = 6 }: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 130,
    damping: 22,
    mass: 0.5,
  });
  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 130,
    damping: 22,
    mass: 0.5,
  });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const percentX = (event.clientX - rect.left) / rect.width;
    const percentY = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - percentY) * maxTilt);
    rotateY.set((percentX - 0.5) * maxTilt);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      {children}
    </motion.div>
  );
}
