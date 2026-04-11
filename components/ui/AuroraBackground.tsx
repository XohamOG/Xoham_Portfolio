"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion();

  const blocks = [
    { top: "8%", left: "5%", width: 120, height: 320, rotate: -18, duration: 11 },
    { top: "20%", left: "45%", width: 90, height: 260, rotate: 9, duration: 14 },
    { top: "10%", left: "78%", width: 70, height: 290, rotate: -6, duration: 12 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
      {blocks.map((block, index) => (
        <motion.div
          key={index}
          className="absolute border-[3px] border-black bg-black"
          style={{
            top: block.top,
            left: block.left,
            width: block.width,
            height: block.height,
            rotate: `${block.rotate}deg`,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -10, 0],
                  x: [0, 6, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: block.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }
          }
        />
      ))}
    </div>
  );
}
