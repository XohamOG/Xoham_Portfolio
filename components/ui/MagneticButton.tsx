"use client";

import type { ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  variant = "light",
  className = "",
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (event.clientX - centerX) * 0.25;
    const offsetY = (event.clientY - centerY) * 0.25;

    x.set(offsetX);
    y.set(offsetY);
  };

  const handleLeave = () => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`brutal-btn inline-flex min-w-[150px] items-center justify-center px-5 py-3 text-center font-display text-2xl leading-none sm:min-w-[180px] sm:px-6 sm:text-3xl ${
        variant === "dark" ? "bg-black text-white" : "bg-white text-black"
      } ${className}`}
    >
      {children}
    </motion.a>
  );
}
