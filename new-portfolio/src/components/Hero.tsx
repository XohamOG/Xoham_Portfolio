"use client";

import React from "react";
import { motion } from "framer-motion";
import InteractiveTitle from "./InteractiveTitle";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.heroSection}>
      {/* Editorial top tag */}
      <motion.div
        className={styles.editorialTop}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.tagBracket}>[</span>
        <span className={styles.tagText}>
          CREATIVE TECHNOLOGIST &bull; INTERFACE ARCHITECT
        </span>
        <span className={styles.tagBracket}>]</span>
      </motion.div>

      {/* Hero Centerpiece: Just SOHAM with interactive transmutation to XOHAM */}
      <motion.div
        className={styles.centerpiece}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <InteractiveTitle />
      </motion.div>

      {/* Hero Bottom Bar / Technical HUD */}
      <motion.div
        className={styles.bottomHud}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.hudColLeft}>
          <span className={styles.hudLabel}>EXPERTISE</span>
          <span className={styles.hudValue}>
            WEB3 ARCHITECTURE / BESPOKE INTERACTION
          </span>
        </div>

        <div className={styles.hudColCenter}>
          <div className={styles.scrollIndicator}>
            <span className={styles.scrollLine} />
            <span className={styles.scrollText}>SCROLL</span>
          </div>
        </div>

        <div className={styles.hudColRight}>
          <span className={styles.hudLabel}>LOCATION & TIME</span>
          <span className={styles.hudValue}>IST +05:30 {"//"} REMOTE & GLOBAL</span>
        </div>
      </motion.div>
    </section>
  );
}
