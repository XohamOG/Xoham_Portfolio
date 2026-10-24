"use client";

import React from "react";
import FoldText from "./FoldText";
import ReflectiveCard from "./ReflectiveCard";
import MobileProfileCard from "./MobileProfileCard";
import SpecularButton from "./SpecularButton";
import styles from "./About.module.css";

export default function About() {
  const bioSummary =
    "Tech enthusiast and lifelong learner focused on building reliable systems through backend engineering, full-stack development, and rapid prototyping across AI, blockchain, and real-world product workflows.";

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        {/* Section Header */}
        <div className={styles.headerBlock}>
          <h2 className={styles.heading}>
            <FoldText
              text="ABOUT ME"
              foldStyle="paper"
              splitBy="char"
              hinge="top"
              trigger="scroll"
              foldAngle={92}
              duration={0.7}
              stagger={0.045}
              staggerFrom="start"
              ease="power3.out"
              hoverRefold={true}
              refoldRadius={130}
              refoldAngle={45}
              perspective={600}
              creaseShading={0.65}
              fontSize="inherit"
              fontWeight="inherit"
              color="#ffffff"
            />
            <span className={styles.headingAccent}>.</span>
          </h2>
        </div>

        {/* Main Content Layout: Card on Left, Bio on Right */}
        <div className={styles.contentLayout}>
          <div className={styles.leftColumn}>
            {/* Desktop Reflective Card */}
            <div className={`${styles.cardContainer} ${styles.desktopCard}`}>
              <ReflectiveCard
                name="Soham Patil"
                role="Software Engineer"
                avatar="/images/soham-patil-removebg-preview.png"
                photoScale={1.3}
                photoY={30}
                badge="Verified"
                status="Available"
                statusColor="#22c55e"
                idValue="Student @ VESIT"
                theme="dark"
                tint="#ffffff"
                metalness={0.92}
                roughness={0.25}
                blurStrength={7}
                shine={1.2}
                glare={0.6}
                enableTilt={true}
                tiltStrength={14}
                width={350}
                height={530}
                radius={24}
              />
            </div>

            {/* Mobile-Optimized Profile Card */}
            <div className={styles.mobileCard}>
              <MobileProfileCard
                name="Soham Patil"
                role="Software Engineer & Builder"
                avatar="/images/soham-patil-removebg-preview.png"
                institution="Student @ VESIT • Mumbai"
              />
            </div>
          </div>

          <div className={styles.rightColumn}>
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
                  fontSize="clamp(1.25rem, 2.1vw, 1.85rem)"
                  fontWeight={600}
                  color="#ffffff"
                />
              </div>

              {/* Action Buttons: Resume & GitHub */}
              <div className={styles.bioActions}>
                <SpecularButton
                  size="md"
                  radius={14}
                  tint="#007BA7"
                  tintOpacity={0.16}
                  textColor="#ffffff"
                  lineColor="#00d2ff"
                  intensity={1}
                  idleIntensity={0.35}
                  followMouse={true}
                  href="/Carwale_resume.pdf"
                  target="_blank"
                  className={styles.bioActionBtn}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  <span>Resume</span>
                </SpecularButton>

                <SpecularButton
                  size="md"
                  radius={14}
                  tint="#ffffff"
                  tintOpacity={0.08}
                  textColor="#f4f4f5"
                  lineColor="#FF2D95"
                  intensity={0.95}
                  idleIntensity={0.3}
                  followMouse={true}
                  href="https://github.com/XohamOG"
                  target="_blank"
                  className={styles.bioActionBtn}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub</span>
                </SpecularButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
