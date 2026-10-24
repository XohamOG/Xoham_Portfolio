'use client';

import React, { useRef, useState, useCallback } from 'react';
import styles from './ScrollToTop.module.css';

interface ScrollToTopProps {
  label?: string;
  showSignature?: boolean;
  onClick?: () => void;
}

export default function ScrollToTop({
  label = 'BACK TO TOP',
  showSignature = true,
  onClick,
}: ScrollToTopProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    buttonRef.current.style.setProperty('--mouse-x', `${x}px`);
    buttonRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);

    if (onClick) {
      onClick();
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [onClick]);

  return (
    <div className={styles.wrapper}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        className={`${styles.button} ${isHovered ? styles.hovered : ''} ${isClicked ? styles.clicked : ''}`}
        aria-label="Scroll to top of page"
      >
        {/* Specular Radial Light Beam following cursor */}
        <div className={styles.specularBeam} aria-hidden="true" />

        {/* Shiny specular glass gleam overlay */}
        <div className={styles.specularGleam} aria-hidden="true" />

        {/* Click ripple wave */}
        {isClicked && <div className={styles.clickRipple} aria-hidden="true" />}

        <div className={styles.content}>
          {/* Circular Arrow Badge */}
          <div className={styles.arrowBadge}>
            <svg
              className={styles.arrowIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
            <div className={styles.arrowPulse} aria-hidden="true" />
          </div>

          {/* Button Text */}
          <span className={styles.label}>{label}</span>

          {/* Minimalist keyboard shortcut or icon indicator */}
          <span className={styles.badgeIndicator} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </span>
        </div>
      </button>

      {/* Subtle Portfolio Signature */}
      {showSignature && (
        <div className={styles.signature}>
          <span>xoham.xyz</span>
          <span className={styles.dot} aria-hidden="true">•</span>
          <span>Designed &amp; Built by Soham Patil</span>
          <span className={styles.dot} aria-hidden="true">•</span>
          <span>2026</span>
        </div>
      )}
    </div>
  );
}
