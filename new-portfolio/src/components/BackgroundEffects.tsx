"use client";

import React, { useEffect, useState } from "react";
import styles from "./BackgroundEffects.module.css";

export default function BackgroundEffects() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 35 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to percentage for radial glow
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={styles.container} aria-hidden="true">
      {/* Dynamic ambient cursor glow */}
      <div
        className={styles.ambientGlow}
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(44, 20, 72, 0.45) 0%, rgba(255, 177, 25, 0.05) 30%, transparent 70%)`,
        }}
      />

      {/* Deep Aubergine fixed core gradient */}
      <div className={styles.coreGaze} />

      {/* Subtle technical grid lines */}
      <div className={styles.gridOverlay} />

      {/* Corner crosshairs */}
      <div className={`${styles.crosshair} ${styles.topRight}`}>+</div>
      <div className={`${styles.crosshair} ${styles.bottomLeft}`}>+</div>
      <div className={`${styles.crosshair} ${styles.bottomRight}`}>+</div>
    </div>
  );
}
