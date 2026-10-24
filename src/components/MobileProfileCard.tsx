"use client";

import React from "react";
import Image from "next/image";
import styles from "./MobileProfileCard.module.css";

interface MobileProfileCardProps {
  name?: string;
  role?: string;
  avatar?: string;
  status?: string;
  institution?: string;
}

export default function MobileProfileCard({
  name = "Soham Patil",
  role = "Software Engineer & Builder",
  avatar = "/images/soham-patil-removebg-preview.png",
  institution = "Student @ VESIT • Mumbai",
}: MobileProfileCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.glowOrb} aria-hidden="true" />

      {/* Avatar Chamber */}
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarInner}>
          <Image
            src={avatar}
            alt={name}
            width={160}
            height={160}
            priority
            className={styles.avatarImg}
          />
        </div>
      </div>

      {/* Identity Info */}
      <div className={styles.infoBlock}>
        <div className={styles.nameRow}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.verifiedIcon} title="Verified">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </span>
        </div>
        <p className={styles.role}>{role}</p>
        <span className={styles.subInfo}>{institution}</span>
      </div>

      {/* Focus Skill Tags */}
      <div className={styles.tagsRow}>
        <span className={`${styles.tag} ${styles.tagAccent}`}>Full-Stack</span>
        <span className={styles.tag}>Backend Systems</span>
        <span className={styles.tag}>AI & Web3</span>
        <span className={styles.tag}>Prototyping</span>
      </div>

      {/* Quick Actions */}
      <div className={styles.actionsRow}>
        <a
          href="https://github.com/XohamOG"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryBtn}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
        <a
          href="/Carwale_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondaryBtn}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <span>Resume</span>
        </a>
      </div>
    </div>
  );
}
