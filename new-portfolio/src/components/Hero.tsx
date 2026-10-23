"use client";

import React, { useState } from "react";
import GooeyNav, { GooeyNavItem } from "./GooeyNav";
import styles from "./Hero.module.css";

const NAV_ITEMS: GooeyNavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Gallery", href: "#gallery" },
];

export default function Hero() {
  const [activeNav, setActiveNav] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="home" className={styles.heroContainer}>
      {/* Top Floating GooeyNav */}
      <header className={styles.header}>
        <GooeyNav
          items={NAV_ITEMS}
          activeIndex={activeNav}
          onChange={(index) => setActiveNav(index)}
          theme="dark"
          color="#ffffff"
          activeTextColor="#0a0a0a"
          size="md"
          frame={true}
          gooeyness={0.65}
          wobble={0.8}
          hoverEffect={true}
        />
      </header>

      {/* Centerpiece Clean Cartoon Hero Title */}
      <div className={styles.centerStage}>
        {/* Interactive Title: SOHAM -> XOHAM with playful cartoon animations */}
        <div
          className={`${styles.titleWrapper} ${isHovered ? styles.isHovered : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered((prev) => !prev)}
          role="button"
          tabIndex={0}
          aria-label="Soham (also known as Xoham)"
        >
          {/* Subtle Ambient Breathing Halo */}
          <div className={styles.ambientHalo} aria-hidden="true" />

          {/* Gentle Twinkling Stars */}
          <div className={styles.sparkleCluster} aria-hidden="true">
            <span className={`${styles.sparkle} ${styles.sparkle1}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.sparkle2}`}>★</span>
            <span className={`${styles.sparkle} ${styles.sparkle3}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.sparkle4}`}>•</span>
          </div>

          <h1 className={styles.title}>
            {/* The 3D Morphing First Letter: S -> X */}
            <span className={styles.letterSlot}>
              <span className={styles.charS}>S</span>
              <span className={styles.charX}>X</span>
            </span>

            {/* The Rest of the Name: O H A M in crisp solid static WHITE */}
            <span className={styles.charGroup}>
              <span className={styles.tailChar}>O</span>
              <span className={styles.tailChar}>H</span>
              <span className={styles.tailChar}>A</span>
              <span className={styles.tailChar}>M</span>
            </span>
          </h1>

          {/* Minimalist Horizon Beam Accent */}
          <div className={styles.horizonBeam} aria-hidden="true" />
        </div>
      </div>

      {/* Bottom Minimal Clean Footer Cue */}
      <footer className={styles.footer}>
        <a href="#about" className={styles.scrollCue} aria-label="Scroll to About Me section">
          <span>SCROLL</span>
          <span className={styles.scrollLine} />
        </a>
      </footer>
    </section>
  );
}
