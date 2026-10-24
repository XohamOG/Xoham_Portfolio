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
    </div>
  );
}
