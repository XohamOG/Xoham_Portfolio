"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageReveal() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[95] bg-black"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.77, 0, 0.175, 1] }
      }
      aria-hidden="true"
    />
  );
}
