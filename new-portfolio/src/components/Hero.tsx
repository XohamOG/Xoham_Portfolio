"use client";

import React, { useState } from "react";
import GooeyNav, { GooeyNavItem } from "./GooeyNav";
import styles from "./Hero.module.css";

const NAV_ITEMS: GooeyNavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Gallery", href: "#gallery" },
];

export default function Hero() {
  const [activeNav, setActiveNav] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className={styles.heroContainer}>
      {/* Top Floating GooeyNav */}
      <header className={styles.header}>
        <GooeyNav
          items={NAV_ITEMS}
          activeIndex={activeNav}
          onChange={(index) => setActiveNav(index)}
          theme="dark"
          color="#00f0ff"
          activeTextColor="#060608"
          size="md"
          frame={true}
          gooeyness={0.65}
          wobble={0.8}
          hoverEffect={true}
        />
      </header>

      {/* Centerpiece Minimal Hero Title */}
      <div className={styles.centerStage}>
        {/* Subtle Eyebrow Label */}
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span>[ 01 // IDENTITY ]</span>
        </div>

        {/* Interactive Title: SOHAM -> XOHAM (Hover turns S to Cyan X) */}
        <div
          className={`${styles.titleWrapper} ${isHovered ? styles.isHovered : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered((prev) => !prev)}
          role="button"
          tabIndex={0}
          aria-label="Soham (also known as Xoham)"
        >
          {/* Subtle Cyan Glow Aura Backdrop */}
          <div className={styles.cyanGlowBackdrop} />

          <h1 className={styles.title}>
            {/* The 3D Morphing First Letter: S -> X */}
            <span className={styles.letterSlot}>
              <span className={styles.charS}>S</span>
              <span className={styles.charX}>X</span>
            </span>

            {/* The Rest of the Name: O H A M */}
            <span className={styles.charGroup}>
              <span className={styles.tailChar}>O</span>
              <span className={styles.tailChar}>H</span>
              <span className={styles.tailChar}>A</span>
              <span className={styles.tailChar}>M</span>
            </span>
          </h1>
        </div>

        {/* Minimal Subtitle */}
        <p className={styles.subline}>
          Creative Developer <span className={styles.sublineHighlight}>&bull;</span> Designer
        </p>
      </div>

      {/* Bottom Minimal Footer Cue */}
      <footer className={styles.footer}>
        <span className={styles.footerSide}>PORTFOLIO // 2026</span>

        <div className={styles.scrollCue}>
          <span>SCROLL</span>
          <span className={styles.scrollLine} />
        </div>

        <span className={styles.footerSide}>AVAILABLE WORLDWIDE</span>
      </footer>
    </section>
  );
}
