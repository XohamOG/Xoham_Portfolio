'use client';

import React, { useState } from 'react';
import HoloCard, { HoloPreset } from './HoloCard';
import SpecularButton from './SpecularButton';
import FoldText from './FoldText';
import styles from './Projects.module.css';

interface ProjectCardData {
  id: string;
  number: string;
  title: string;
  category: string;
  preset: HoloPreset;
  image: string;
  backImage: string;
  liveUrl?: string;
  githubUrl?: string;
}

const INITIAL_PROJECTS: ProjectCardData[] = [
  {
    id: 'project-1',
    number: '#001',
    title: 'InterviewPrep AI',
    category: 'AI // Mock Interview Platform',
    preset: 'bursts',
    image: '/images/project-cards/interviewprep-front.png',
    backImage: '/images/project-cards/interviewprep-back.png',
    liveUrl: 'https://gdg-techsprint-iota.vercel.app',
    githubUrl: 'https://github.com/XohamOG/GDG-Techsprint'
  },
  {
    id: 'project-2',
    number: '#002',
    title: 'NaviBus',
    category: 'Transit Tracking // Real-Time Systems',
    preset: 'shards',
    image: '/images/project-cards/navibus-front.png',
    backImage: '/images/project-cards/navibus-back.png',
    liveUrl: 'https://github.com/AadiSingh0805/NaviBus',
    githubUrl: 'https://github.com/AadiSingh0805/NaviBus'
  },
  {
    id: 'project-3',
    number: '#003',
    title: 'No Cap Lottery',
    category: 'Web3 // Decentralized Raffle',
    preset: 'gold',
    image: '/images/project-cards/nocap-lottery-front.png',
    backImage: '/images/project-cards/nocap-lottery-back.png',
    liveUrl: 'https://ethglobal.com/showcase/nocap-lottery-opx3z',
    githubUrl: 'https://github.com/XohamOG/NoCap-Lottery'
  },
  {
    id: 'project-4',
    number: '#004',
    title: 'GitHunters',
    category: 'Open Source // Bounty & Talent Network',
    preset: 'rainbow',
    image: '/images/project-cards/githunters-front.png',
    backImage: '/images/project-cards/githunters-back.png',
    liveUrl: 'https://hack-aura-mu.vercel.app/',
    githubUrl: 'https://github.com/ishapalkar/githunters-lisk'
  },
  {
    id: 'project-5',
    number: '#005',
    title: 'Forensodont',
    category: 'Computer Vision // Forensic Dentistry',
    preset: 'swirl',
    image: '/images/project-cards/forensodont-front.png',
    backImage: '/images/project-cards/forensodont-back.png',
    liveUrl: 'https://github.com/XohamOG/Forensodont',
    githubUrl: 'https://github.com/XohamOG/Forensodont'
  },
  {
    id: 'project-6',
    number: '#006',
    title: 'ArogyaSathi',
    category: 'HealthTech // Sustainable Care',
    preset: 'stars',
    image: '/images/project-cards/arogyasathi-front.png',
    backImage: '/images/project-cards/arogyasathi-back.png',
    liveUrl: 'https://github.com/vedaXD/Genesis-Hackathon',
    githubUrl: 'https://github.com/vedaXD/Genesis-Hackathon'
  },
  {
    id: 'project-7',
    number: '#007',
    title: 'Assetverse',
    category: 'Web3 // Real-World Asset Tokenization',
    preset: 'cosmos',
    image: '/images/project-cards/assetverse-front.png',
    backImage: '/images/project-cards/assetverse-back.png',
    liveUrl: 'https://youtu.be/C67kyK6rIkA',
    githubUrl: 'https://github.com/CMPN-CODECELL/Syrus7_FOMO'
  },
  {
    id: 'project-8',
    number: '#008',
    title: 'Healthcare Repository',
    category: 'Hyperledger Fabric // E-Card Healthcare',
    preset: 'glitter',
    image: '/images/project-cards/healthcare-front.png',
    backImage: '/images/project-cards/healthcare-back.png',
    liveUrl: 'https://github.com/XohamOG/fabric-samples/tree/health-rep',
    githubUrl: 'https://github.com/XohamOG/fabric-samples/tree/health-rep'
  },
  {
    id: 'project-9',
    number: '#009',
    title: 'OctaHive',
    category: 'AI Agents // Autonomous Trading',
    preset: 'bursts',
    image: '/images/project-cards/octahive-front.png',
    backImage: '/images/project-cards/octahive-back.png',
    liveUrl: 'https://devfolio.co/projects/hey-anna-c73d',
    githubUrl: 'https://github.com/vedaXD/ETHMumbai-2026'
  }
];

export default function Projects() {
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  return (
    <section id="projects" className={styles.projectsSection}>
      {/* Background ambient lighting */}
      <div className={styles.ambientGlowLeft} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />

      <div className={styles.projectsContainer}>
        {/* Section Header */}
        <div className={styles.headerBlock}>
          <h2 className={styles.heading}>
            <FoldText
              text="PROJECTS"
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

        {/* 3 - 3 - 3 Aligned Cards Deck */}
        <div className={styles.projectsGrid}>
          {INITIAL_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={`${styles.cardItem} ${idx >= 3 && !isExpandedMobile ? styles.extraMobileHidden : ""}`}
            >
              <HoloCard
                image={project.image}
                backImage={project.backImage}
                alt={project.title}
                preset={project.preset}
                width={335}
                radius={16}
                intensity={0.45}
                scale={1}
                edgeSparkle={0.35}
                frame={4}
                glare={0.25}
                tiltMax={18}
                hoverScale={1.06}
                idle={true}
                shadow={true}
              />

              {/* Specular Action Buttons */}
              <div className={styles.cardActions}>
                <SpecularButton
                  size="sm"
                  radius={12}
                  tint="#ffffff"
                  tintOpacity={0.06}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  intensity={1.1}
                  idleIntensity={0.12}
                  followMouse={true}
                  href={project.liveUrl || '#'}
                  target="_blank"
                  className={styles.actionBtn}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Live</span>
                </SpecularButton>

                <SpecularButton
                  size="sm"
                  radius={12}
                  tint="#ffffff"
                  tintOpacity={0.06}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  intensity={1.1}
                  idleIntensity={0.12}
                  followMouse={true}
                  href={project.githubUrl || '#'}
                  target="_blank"
                  className={styles.actionBtn}
                >
                  <svg
                    width="13"
                    height="13"
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
          ))}
        </div>

        {/* Mobile Pagination Show More / Show Less Button */}
        <div className={styles.mobilePaginationWrapper}>
          <button
            onClick={() => setIsExpandedMobile((prev) => !prev)}
            className={styles.showMoreBtn}
            aria-expanded={isExpandedMobile}
          >
            <span>
              {isExpandedMobile
                ? "Show Less"
                : `Show More Projects (${INITIAL_PROJECTS.length - 3} More)`}
            </span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transform: isExpandedMobile ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.28s ease",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
