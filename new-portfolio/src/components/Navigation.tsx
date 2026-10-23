"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { num: "01", label: "INDEX", href: "#hero", tag: "MAIN" },
    { num: "02", label: "SELECTED WORKS", href: "#works", tag: "CURATED" },
    { num: "03", label: "PHILOSOPHY & CRAFT", href: "#craft", tag: "ETHOS" },
    { num: "04", label: "LAB & EXPERIMENTS", href: "#lab", tag: "CREATIVE" },
    { num: "05", label: "TRANSMISSION", href: "#contact", tag: "REACH" },
  ];

  return (
    <>
      <header className={styles.header}>
        {/* Left: Minimal status & edition */}
        <div className={styles.statusBlock}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>
            AVAILABLE FOR SELECT WORK
          </span>
          <span className={styles.editionDivider}>{"//"}</span>
          <span className={styles.editionText}>EDITION 2026</span>
        </div>

        {/* Center: Subtle coordinate mark */}
        <div className={styles.centerSpec}>
          <span>28.6139° N, 77.2090° E</span>
        </div>

        {/* Right: 3-lines Menu Button */}
        <button
          className={`${styles.menuButton} ${isOpen ? styles.menuOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          <span className={styles.menuLabel}>{isOpen ? "CLOSE" : "MENU"}</span>
          <div className={styles.linesContainer}>
            <span className={`${styles.line} ${styles.line1}`} />
            <span className={`${styles.line} ${styles.line2}`} />
            <span className={`${styles.line} ${styles.line3}`} />
          </div>
        </button>
      </header>

      {/* Fullscreen Editorial Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background blur and ambient glow */}
            <div className={styles.overlayGlow} />

            <div className={styles.drawerContent}>
              {/* Menu Header with live time */}
              <div className={styles.drawerHeader}>
                <div className={styles.drawerMeta}>
                  <span className={styles.drawerMetaLabel}>LOC {"//"} IST (NEW DELHI)</span>
                  <span className={styles.drawerClock}>{currentTime || "00:00:00"}</span>
                </div>
                <div className={styles.drawerMeta}>
                  <span className={styles.drawerMetaLabel}>STATUS</span>
                  <span className={styles.drawerStatus}>OPEN PROTOCOL</span>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className={styles.navMenu}>
                {navLinks.map((item, idx) => (
                  <motion.a
                    key={item.num}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={styles.navItem}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + idx * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className={styles.itemNum}>{item.num}</span>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemTag}>[{item.tag}]</span>
                    <span className={styles.itemArrow}>→</span>
                  </motion.a>
                ))}
              </nav>

              {/* Footer Channels */}
              <div className={styles.drawerFooter}>
                <div className={styles.channelsGroup}>
                  <span className={styles.channelHeader}>CHANNELS</span>
                  <div className={styles.channelsLinks}>
                    <a
                      href="https://github.com/XohamOG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.channelLink}
                    >
                      GITHUB ↗
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.channelLink}
                    >
                      X / TWITTER ↗
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.channelLink}
                    >
                      LINKEDIN ↗
                    </a>
                    <a
                      href="mailto:contact@xoham.dev"
                      className={styles.channelLink}
                    >
                      EMAIL ↗
                    </a>
                  </div>
                </div>

                <div className={styles.brandSignature}>
                  <span>SOHAM {"//"} XOHAM</span>
                  <span className={styles.brandSub}>
                    ICE SILVER • DEEP AUBERGINE • MARIGOLD
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
