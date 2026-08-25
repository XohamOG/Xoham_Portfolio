"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

export default function PageReveal() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isElectric, setIsElectric] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // The splash screen stays up for ~1.4 seconds total to let the sequence finish incredibly fast
    const t = setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    return () => clearTimeout(t);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#060010]/40 backdrop-blur-md overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Pure CSS SVG Filter for Electricity / Glitch */}
          <svg className="hidden">
            <defs>
              <filter id="electricity">
                <feTurbulence type="fractalNoise" baseFrequency="0.01 0.6" numOctaves="3" result="noise">
                  <animate attributeName="baseFrequency" values="0.01 0.6; 0.05 0.8; 0.01 0.6" dur="0.08s" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Removed big blur circles to keep it clean */}

          {/* Third-party TypeAnimation for reverse typing */}
          <div 
            className={`flex font-display font-black tracking-widest relative items-center justify-center h-full w-full z-10 text-8xl md:text-[10rem] lg:text-[13rem] transition-all duration-75 ${
              isElectric 
                ? 'text-[#0ff] drop-shadow-[0_0_40px_rgba(0,255,255,0.9)] scale-110' 
                : 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]'
            }`}
            style={isElectric ? { filter: 'url(#electricity)' } : {}}
          >
            <TypeAnimation
              sequence={[
                'Xoham',    // Starts written
                300,        // Wait 0.3 seconds
                'X',        // Reverse types down to X instantly
                () => setIsElectric(true), // Trigger electricity
                500,        // Wait 0.5 seconds before parent unmounts
              ]}
              wrapper="span"
              cursor={false}
              speed={90}
              deletionSpeed={90}
              className="text-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
