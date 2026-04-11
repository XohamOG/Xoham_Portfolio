"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import VariableProximityText from "@/components/ui/VariableProximityText";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { amount: 0.7, once: true });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={headingRef}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={align === "center" ? "mx-auto text-center" : "text-left"}
    >
      <h2 className="font-display text-[clamp(2.2rem,6vw,4.2rem)] leading-[0.95]">
        <VariableProximityText text={title} />
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-[58ch] text-sm sm:text-base">
          <VariableProximityText text={subtitle} maxDistance={95} />
        </p>
      ) : null}

      <svg
        viewBox="0 0 320 34"
        className={`mt-2 h-5 text-black ${align === "center" ? "mx-auto" : ""}`}
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M4 18 C 42 10, 67 28, 101 18 C 137 7, 161 30, 200 18 C 228 10, 257 28, 316 16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}
