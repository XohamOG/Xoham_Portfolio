"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import styles from "./InteractiveTitle.module.css";

export default function InteractiveTitle() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic 3D tilt coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end tactile feel
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Tilt transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const trailingLetters = ["O", "H", "A", "M"];

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Editorial Status Tag above Title */}
      <div className={styles.hudHeader}>
        <motion.div
          className={styles.statusPill}
          animate={{
            borderColor: isHovered
              ? "rgba(255, 177, 25, 0.45)"
              : "rgba(235, 241, 246, 0.12)",
            backgroundColor: isHovered
              ? "rgba(255, 177, 25, 0.08)"
              : "rgba(235, 241, 246, 0.03)",
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className={`${styles.hudDot} ${isHovered ? styles.hudDotActive : ""}`}
          />
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.span
                key="alias"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={styles.hudTextActive}
              >
                ALIAS ENGAGED {"//"} [ ZŌ • HÆM ]
              </motion.span>
            ) : (
              <motion.span
                key="origin"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={styles.hudText}
              >
                IDENTITY {"//"} [ SŌ • HƏM ]
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Main Kinetic 3D Title */}
      <motion.div
        className={styles.titleCard}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className={styles.wordmark}>
          {/* Morphing Leading Letter: 'S' ➔ 'X' */}
          <div className={styles.firstLetterSlot}>
            <AnimatePresence mode="wait" initial={false}>
              {!isHovered ? (
                <motion.span
                  key="letter-s"
                  className={styles.letterS}
                  initial={{ rotateY: 90, opacity: 0, filter: "blur(6px)" }}
                  animate={{ rotateY: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ rotateY: -90, opacity: 0, filter: "blur(8px)" }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                >
                  S
                </motion.span>
              ) : (
                <motion.span
                  key="letter-x"
                  className={styles.letterX}
                  initial={{
                    rotateY: -90,
                    scale: 0.8,
                    opacity: 0,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    rotateY: 90,
                    scale: 0.8,
                    opacity: 0,
                    filter: "blur(6px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  X
                  {/* Subtle Marigold spark flare behind X */}
                  <span className={styles.xGlowAura} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Trailing Letters: 'O', 'H', 'A', 'M' */}
          <div className={styles.trailingLetters}>
            {trailingLetters.map((char, index) => (
              <motion.span
                key={char}
                className={styles.letter}
                animate={{
                  y: isHovered ? [0, -4, 0] : 0,
                  color: isHovered ? "var(--ice-silver-bright)" : "var(--ice-silver)",
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Dynamic Specular Sheen line across the title */}
        <motion.div
          className={styles.sheenLine}
          style={{ left: sheenX }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Sub-text editorial prompt */}
      <motion.div
        className={styles.interactionCue}
        animate={{
          opacity: isHovered ? 0.9 : 0.45,
          color: isHovered ? "var(--marigold)" : "var(--ice-silver-muted)",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className={styles.cueBracket}>[</span>
        <span className={styles.cueText}>
          {isHovered ? "TRANSMUTATION ACTIVE" : "HOVER GLYPH TO REVEAL ALIAS"}
        </span>
        <span className={styles.cueBracket}>]</span>
      </motion.div>
    </div>
  );
}
