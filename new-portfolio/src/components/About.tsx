"use client";

import React from "react";
import FoldText from "./FoldText";
import styles from "./About.module.css";

export default function About() {
  const bioSummary =
    "Tech enthusiast and lifelong learner focused on building reliable systems through backend engineering, full-stack development, and rapid prototyping across AI, blockchain, and real-world product workflows.";

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        {/* Section Header */}
        <div className={styles.headerBlock}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>[ 01 // OVERVIEW ]</span>
          </div>
          <h2 className={styles.heading}>
            ABOUT ME <span className={styles.headingAccent}>.</span>
          </h2>
        </div>

        {/* Unfolding Bio Summary Card */}
        <div className={styles.bioCard}>
          <div className={styles.cardGlow} aria-hidden="true" />
          <div className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </div>
          <div className={styles.foldWrapper}>
            <FoldText
              text={bioSummary}
              foldStyle="paper"
              splitBy="word"
              hinge="top"
              trigger="scroll"
              foldAngle={92}
              duration={0.65}
              stagger={0.03}
              staggerFrom="start"
              ease="power3.out"
              hoverRefold={true}
              refoldRadius={130}
              refoldAngle={35}
              perspective={800}
              creaseShading={0.45}
              fontSize="clamp(1.35rem, 2.6vw, 2.1rem)"
              fontWeight={600}
              color="#ffffff"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
