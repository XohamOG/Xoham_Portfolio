"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ParticleText from "./ParticleText";
import styles from "./Hero.module.css";

export default function Hero() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [arcadeWarp, setArcadeWarp] = useState<"desktop" | "mobile" | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickTimestampsRef = useRef<number[]>([]);

  // Easter Egg: Spamming background of title screen >= 6 times in under 2.5 seconds unlocks arcade
  // Mobile (< 768px) -> Cyber 2048 Touch Edition
  // Desktop (>= 768px) -> Pac-Man Arcade
  useEffect(() => {
    const handleBackgroundClick = (e: MouseEvent) => {
      // Must be within the title screen / Hero section
      if (window.scrollY > window.innerHeight * 0.75) return;

      const target = e.target as HTMLElement;
      // Disallow clicking navigation bar links or buttons
      if (target.closest("button") || target.closest("a")) return;

      const now = Date.now();
      // Sliding Window: Keep only clicks that happened within the last 2500ms (2.5s)
      clickTimestampsRef.current = clickTimestampsRef.current.filter(
        (timestamp) => now - timestamp <= 2500
      );
      clickTimestampsRef.current.push(now);

      // Only unlock if 6 or more clicks occurred within the 2.5s window
      if (clickTimestampsRef.current.length >= 6) {
        clickTimestampsRef.current = [];
        const isMobile = window.innerWidth < 768;
        setArcadeWarp(isMobile ? "mobile" : "desktop");
        setTimeout(() => {
          router.push(isMobile ? "/cyber2048" : "/pacman");
        }, 600);
      }
    };

    window.addEventListener("click", handleBackgroundClick);
    return () => {
      window.removeEventListener("click", handleBackgroundClick);
    };
  }, [router]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 140);
  };

  const handleClickToggle = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <section id="home" className={styles.heroContainer}>
      {/* Easter Egg Arcade Warp Glitch Overlay */}
      {arcadeWarp && (
        <div className={styles.arcadeWarpOverlay} role="alert" aria-live="assertive">
          <div className={styles.arcadeWarpText}>
            <span className={styles.arcadeIcon}>
              {arcadeWarp === "mobile" ? "⚡" : "👾"}
            </span>
            <span>
              {arcadeWarp === "mobile"
                ? "CYBER 2048 UNLOCKED"
                : "PAC-MAN ARCADE UNLOCKED"}
            </span>
            <span className={styles.arcadeSub}>
              {arcadeWarp === "mobile"
                ? "INITIALIZING TOUCH ARCADE..."
                : "WARPING TO RETRO SYSTEM..."}
            </span>
          </div>
        </div>
      )}
      {/* Top Spacer to preserve vertical centering under floating navbar */}
      <div className={styles.headerSpacer} aria-hidden="true" />

      {/* Centerpiece Clean Cartoon Hero Title */}
      <div className={styles.centerStage}>
        {/* Interactive Title: SOHAM -> XOHAM with playful cartoon animations */}
        <div
          className={`${styles.titleWrapper} ${isHovered ? styles.isHovered : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClickToggle}
          role="button"
          tabIndex={0}
          aria-label="Soham (also known as Xoham)"
        >
          {/* Subtle Ambient Breathing Halo */}
          <div className={styles.ambientHalo} aria-hidden="true" />

          <h1 className={styles.title}>
            {/* The 3D Morphing First Letter: S -> X */}
            <span className={styles.letterSlot}>
              {/* Playful Twinkling Stars & Diamonds directly above X (only on hover) */}
              <span className={styles.sparkleCluster} aria-hidden="true">
                <span className={`${styles.sparkle} ${styles.sparkle1}`}>✦</span>
                <span className={`${styles.sparkle} ${styles.sparkle2}`}>★</span>
                <span className={`${styles.sparkle} ${styles.sparkle3}`}>✦</span>
                <span className={`${styles.sparkle} ${styles.sparkle4}`}>•</span>
              </span>

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
        </div>

        {/* Dynamic Interactive Role Subtitle with React Bits ParticleText */}
        <div
          className={`${styles.subtitleWrapper} ${isHovered ? styles.subtitleVisible : styles.subtitleHidden}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-hidden={!isHovered}
        >
          <div className={styles.particleContainer}>
            <ParticleText
              text="Software Engineer"
              particleSize={2.6}
              density={2.6}
              color="#ffffff"
              highlightColor="#FF2D95"
              highlightMode="motion"
              shape="circle"
              intro="gather"
              scatter={75}
              gatherDuration={1200}
              stagger={300}
              clickBurst={true}
              burstStrength={1}
              pointerRepel={32}
              repelRadius={85}
              idleDrift={0.2}
              trigger="mount"
              fontSize="clamp(1.25rem, 3vw, 2.3rem)"
              fontWeight={800}
              fontFamily="'Bricolage Grotesque', sans-serif"
              glow={true}
              active={isHovered}
            />
          </div>
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
