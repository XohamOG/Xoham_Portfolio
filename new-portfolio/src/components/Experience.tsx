'use client';

import React from 'react';
import BorderGlow from './BorderGlow';
import FoldText from './FoldText';
import styles from './Experience.module.css';

interface ExperienceItem {
  id: string;
  company: string;
  period: string;
  role: string;
  highlights: string[];
  tech: string[];
  theme: 'cerulean' | 'pink';
  glowColor: string;
  colors: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'vesit-cv-backend',
    company: 'VESIT',
    period: 'May 2025 – Jul 2025',
    role: 'Computer Vision & Backend Intern',
    highlights: [
      'Developed backend services using Python and REST APIs for computer-vision workflows.',
      'Built ETL pipelines for automated data ingestion and high-throughput processing.',
      'Improved system reliability with modular service design and efficient data workflows.'
    ],
    tech: ['Python', 'OpenCV', 'REST APIs', 'ETL Pipelines', 'Docker'],
    theme: 'cerulean',
    glowColor: '196 95 65',
    colors: ['#007BA7', '#00d2ff', '#ffffff']
  },
  {
    id: 'vesit-blockchain',
    company: 'VESIT',
    period: 'Nov 2024 – Jan 2025',
    role: 'Blockchain Software Engineering Intern',
    highlights: [
      'Built distributed backend systems using Node.js and Hyperledger Fabric.',
      'Designed and deployed REST APIs in containerized environments with Docker.',
      'Debugged distributed components in Linux environments to improve stability.'
    ],
    tech: ['Hyperledger Fabric', 'Node.js', 'Docker', 'REST APIs', 'Linux'],
    theme: 'cerulean',
    glowColor: '210 90 68',
    colors: ['#007BA7', '#38bdf8', '#818cf8']
  },
  {
    id: '7x-hackathon-winner',
    company: 'Hackathons',
    period: '2024 – Present',
    role: '7x Hackathon Winner',
    highlights: [
      'Won 7 hackathons by building production-ready systems using AI, agentic workflows, and blockchain.',
      'Developed solutions across sustainability, fintech, and healthcare aligned with UN SDGs.',
      'Collaborated in cross-functional teams with rapid prototyping, debugging, and deployment.'
    ],
    tech: ['Agentic AI', 'Solidity', 'Machine Learning', 'Full-Stack', 'Rapid Prototyping'],
    theme: 'pink',
    glowColor: '330 95 65',
    colors: ['#FF2D95', '#fb7185', '#ffffff']
  }
];

export default function Experience() {
  return (
    <section id="experience" className={styles.experienceSection}>
      {/* Target for achievements anchor */}
      <div id="achievements" style={{ position: 'absolute', top: 0, left: 0 }} aria-hidden="true" />

      <div className={styles.experienceContainer}>
        {/* Section Header */}
        <div className={styles.headerBlock}>
          <h2 className={styles.heading}>
            <FoldText
              text="EXPERIENCE & ACHIEVEMENTS"
              foldStyle="paper"
              splitBy="char"
              hinge="top"
              trigger="scroll"
              foldAngle={92}
              duration={0.7}
              stagger={0.035}
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

        {/* 3 BorderGlow Cards */}
        <div className={styles.cardsGrid}>
          {EXPERIENCES.map((item) => {
            const isPink = item.theme === 'pink';

            return (
              <BorderGlow
                key={item.id}
                edgeSensitivity={28}
                glowColor={item.glowColor}
                backgroundColor="#0e0e11"
                borderRadius={20}
                glowRadius={34}
                glowIntensity={1.05}
                coneSpread={24}
                colors={item.colors}
                fillOpacity={0.04}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardHeaderRow}>
                      <span className={styles.companyName}>
                        <span
                          className={
                            isPink ? styles.statusDotPink : styles.statusDotCerulean
                          }
                          aria-hidden="true"
                        />
                        {item.company}
                      </span>
                      <span
                        className={`${styles.cardPeriod} ${
                          isPink ? styles.cardPeriodPink : styles.cardPeriodCerulean
                        }`}
                      >
                        {item.period}
                      </span>
                    </div>

                    <h3 className={styles.roleTitle}>{item.role}</h3>

                    <ul className={styles.highlightsList}>
                      {item.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className={`${styles.highlightItem} ${
                            isPink
                              ? styles.highlightItemPink
                              : styles.highlightItemCerulean
                          }`}
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.techPills}>
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className={`${styles.techPill} ${
                            isPink ? styles.techPillPink : styles.techPillCerulean
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}
