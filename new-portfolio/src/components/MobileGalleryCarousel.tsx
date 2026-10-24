"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { CarouselItem } from "./FlexCarousel";
import styles from "./MobileGalleryCarousel.module.css";

interface MobileGalleryCarouselProps {
  items: CarouselItem[];
}

export default function MobileGalleryCarousel({ items }: MobileGalleryCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<CarouselItem | null>(null);

  // Update active dot as user swipes
  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    // Estimated card width + gap (~82vw + 16px)
    const cardWidth = trackRef.current.children[0]?.clientWidth || clientWidth * 0.82;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(items.length - 1, index)));
  };

  const scrollTo = (index: number) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.children[0]?.clientWidth || 300;
    const gap = 16;
    trackRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, currentIndex - 1);
    scrollTo(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(items.length - 1, currentIndex + 1);
    scrollTo(nextIdx);
  };

  return (
    <div className={styles.mobileCarouselWrapper}>
      {/* Horizontal Swipe Track */}
      <div
        ref={trackRef}
        className={styles.swipeTrack}
        onScroll={handleScroll}
      >
        {items.map((item, idx) => (
          <div
            key={item.src + idx}
            className={styles.card}
            onClick={() => setSelectedPhoto(item)}
            role="button"
            tabIndex={0}
            aria-label={`View ${item.title || "Photo"}`}
          >
            <Image
              src={item.src}
              alt={item.alt || item.title || "Gallery photo"}
              fill
              sizes="(max-width: 768px) 85vw, 340px"
              className={styles.cardImage}
              loading={idx < 2 ? "eager" : "lazy"}
            />
            <div className={styles.cardCaption}>
              <span className={styles.cardTitle}>{item.title || "Captured Moment"}</span>
              <span className={styles.cardIndex}>
                {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Touch Controls & Active Pagination Dots */}
      <div className={styles.controlsRow}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={styles.navBtn}
          style={{ opacity: currentIndex === 0 ? 0.35 : 1 }}
          aria-label="Previous photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className={styles.dotsWrapper}>
          {items.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ""}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === items.length - 1}
          className={styles.navBtn}
          style={{ opacity: currentIndex === items.length - 1 ? 0.35 : 1 }}
          aria-label="Next photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Lightbox Preview Modal on tap */}
      {selectedPhoto && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className={styles.modalCloseBtn}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <div className={styles.modalImageWrapper}>
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt || selectedPhoto.title || "Photo preview"}
                width={700}
                height={850}
                className={styles.modalImage}
              />
            </div>
            <p className={styles.modalTitle}>{selectedPhoto.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
