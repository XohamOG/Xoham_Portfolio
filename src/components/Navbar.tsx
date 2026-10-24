"use client";

import React, { useState, useEffect } from "react";
import GooeyNav, { GooeyNavItem } from "./GooeyNav";
import styles from "./Navbar.module.css";

const NAV_ITEMS: GooeyNavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
];

const SECTIONS = ["home", "about", "projects", "experience", "gallery"];

export default function FloatingNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={styles.floatingNavWrapper} aria-label="Main Navigation">
      <GooeyNav
        items={NAV_ITEMS}
        activeIndex={activeIndex}
        onChange={(index) => setActiveIndex(index)}
        theme="dark"
        color="#ffffff"
        activeTextColor="#0a0a0a"
        size={isMobile ? "sm" : "md"}
        frame={true}
        gooeyness={0.65}
        wobble={0.8}
        hoverEffect={true}
      />
    </nav>
  );
}
