"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type MobileMotionProviderProps = {
  children: ReactNode;
};

export default function MobileMotionProvider({ children }: MobileMotionProviderProps) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const update = () => {
      setIsMobile(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return <MotionConfig reducedMotion={isMobile ? "always" : "never"}>{children}</MotionConfig>;
}
