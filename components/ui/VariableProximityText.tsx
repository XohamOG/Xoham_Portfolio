"use client";

import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";

type VariableProximityTextProps = {
  text: string;
  className?: string;
  maxDistance?: number;
};

export default function VariableProximityText({
  text,
  className = "",
  maxDistance = 140,
}: VariableProximityTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const characters = useMemo(() => Array.from(text), [text]);

  const resetCharacters = () => {
    charRefs.current.forEach((charRef) => {
      if (!charRef) {
        return;
      }

      charRef.style.transform = "translateY(0px) scale(1)";
      charRef.style.fontWeight = "400";
      charRef.style.letterSpacing = "0px";
    });
  };

  const updateCharacters = (clientX: number, clientY: number) => {
    charRefs.current.forEach((charRef) => {
      if (!charRef) {
        return;
      }

      const rect = charRef.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(centerX - clientX, centerY - clientY);
      const influence = Math.max(0, 1 - distance / maxDistance);

      const scale = 1 + influence * 0.28;
      const lift = influence * -5;
      const weight = Math.round(400 + influence * 300);
      const spacing = influence * 0.4;

      charRef.style.transform = `translateY(${lift}px) scale(${scale})`;
      charRef.style.fontWeight = `${weight}`;
      charRef.style.letterSpacing = `${spacing}px`;
    });
  };

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={className}
      onMouseMove={(event) => updateCharacters(event.clientX, event.clientY)}
      onMouseLeave={resetCharacters}
      onTouchStart={resetCharacters}
      aria-label={text}
    >
      {characters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(el) => {
            charRefs.current[index] = el;
          }}
          style={{
            display: "inline-block",
            transition:
              "transform 90ms linear, font-weight 90ms linear, letter-spacing 90ms linear",
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
