'use client';

import React from 'react';
import FlexCarousel, { CarouselItem } from './FlexCarousel';
import MobileGalleryCarousel from './MobileGalleryCarousel';
import FoldText from './FoldText';
import styles from './Gallery.module.css';

const GALLERY_ITEMS: CarouselItem[] = [
  { src: '/images/gallery/1.jpeg', alt: 'ETHGlobal New Delhi', title: 'ETHGlobal New Delhi' },
  { src: '/images/gallery/2.jpeg', alt: 'Hackathon Winners', title: 'Hackathon Winners' },
  { src: '/images/gallery/3.jpeg', alt: 'Team Sprint', title: 'Team Sprint' },
  { src: '/images/gallery/4.jpeg', alt: 'Project Presentation', title: 'Project Presentation' },
  { src: '/images/gallery/5.jpeg', alt: 'Hackathon Moments', title: 'Hackathon Moments' },
  { src: '/images/gallery/6.jpeg', alt: 'Stage Demo', title: 'Stage Demo' },
  { src: '/images/gallery/7.jpeg', alt: 'Winning Showcase', title: 'Winning Showcase' },
  { src: '/images/gallery/8.jpeg', alt: 'Team Celebration', title: 'Team Celebration' },
  { src: '/images/gallery/9.jpeg', alt: 'Hackathon Badges', title: 'Hackathon Badges' },
  { src: '/images/gallery/10.jpeg', alt: 'Hackathon Finals', title: 'Hackathon Finals' },
  { src: '/images/gallery/11.jpeg', alt: 'Victory Moment', title: 'Victory Moment' },
];

interface GalleryProps {
  customItems?: CarouselItem[];
}

export default function Gallery({ customItems }: GalleryProps) {
  const items = customItems && customItems.length > 0 ? customItems : GALLERY_ITEMS;

  return (
    <section id="gallery" className={styles.gallerySection}>
      {/* Background ambient lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.galleryContainer}>
        {/* Header Block */}
        <div className={styles.headerBlock}>
          <h2 className={styles.heading}>
            <FoldText
              text="GALLERY"
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

        {/* Desktop WebGL FlexCarousel */}
        <div className={styles.desktopGallery}>
          <div className={styles.carouselWrapper}>
            <FlexCarousel
              items={items}
              preset="liquid"
              intro="rise"
              fit="natural"
              cardHeight={0.62}
              gap={16}
              squeeze={0.2}
              focusOnClick={true}
              captions={true}
              captureWheel={true}
              autoplay={true}
              interval={3.8}
            />
          </div>
        </div>

        {/* Mobile Fast Native Touch Carousel */}
        <div className={styles.mobileGallery}>
          <MobileGalleryCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
