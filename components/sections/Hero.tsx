"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";
import VariableProximityText from "@/components/ui/VariableProximityText";

const AuroraBackground = dynamic(() => import("@/components/ui/AuroraBackground"), {
  ssr: false,
});

const Cubes = dynamic(() => import("@/components/ui/Cubes"), {
  ssr: false,
});

const Ribbons = dynamic(() => import("@/components/ui/Ribbons"), {
  ssr: false,
});

const rotatingRoles = ["Backend Engineer", "Full-Stack Developer", "Blockchain Builder"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedRole, setTypedRole] = useState(rotatingRoles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const roleRef = useRef<HTMLParagraphElement>(null);
  const disableAnimations = shouldReduceMotion || isMobile;

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

  useEffect(() => {
    if (disableAnimations) {
      setTypedRole(rotatingRoles[0]);
      return;
    }

    const currentWord = rotatingRoles[wordIndex];
    const isAtEnd = typedRole === currentWord;
    const isAtStart = typedRole.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && !isAtEnd) {
          setTypedRole(currentWord.slice(0, typedRole.length + 1));
          return;
        }

        if (!isDeleting && isAtEnd) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !isAtStart) {
          setTypedRole(currentWord.slice(0, typedRole.length - 1));
          return;
        }

        if (isDeleting && isAtStart) {
          setIsDeleting(false);
          setWordIndex((current) => (current + 1) % rotatingRoles.length);
        }
      },
      isAtEnd ? 980 : isDeleting ? 45 : 82,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [disableAnimations, isDeleting, typedRole, wordIndex]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20 md:pt-24">
      {!isMobile ? <AuroraBackground /> : null}
      {!isMobile ? (
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <Ribbons />
        </div>
      ) : null}

      <div className="section-shell grid items-center gap-8 pb-14 md:grid-cols-5 md:gap-12 md:pb-16">
        <motion.div
          className="relative z-10 md:col-span-3"
          initial={disableAnimations ? false : { y: 34, opacity: 0 }}
          whileInView={disableAnimations ? undefined : { y: 0, opacity: 1 }}
          viewport={disableAnimations ? undefined : { once: true, amount: 0.45 }}
          transition={disableAnimations ? undefined : { duration: 0.45 }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em]">
            <VariableProximityText text="Welcome to my portfolio" maxDistance={120} />
          </p>

          <h1 className="font-display text-[clamp(3.8rem,10vw,6.3rem)] font-bold leading-[0.85]">
            <VariableProximityText text={personalInfo.name} maxDistance={170} />
          </h1>

          <p
            ref={roleRef}
            className="mt-4 min-h-[46px] border-l-[4px] border-black pl-4 font-display text-[clamp(1.9rem,7vw,3.6rem)] leading-[0.95]"
          >
            {typedRole}
            <span className="ml-1 inline-block h-[0.85em] w-[2px] animate-pulse bg-black align-middle" />
          </p>

          <p className="mt-6 max-w-[48ch] text-base leading-relaxed">
            <VariableProximityText text={personalInfo.bio} maxDistance={120} />
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.09em]">
            <span className="stamp-tag px-3 py-2">6x Hackathon Winner</span>
            <span className="stamp-tag px-3 py-2">B.E. CSE @ VESIT</span>
          </div>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <MagneticButton href="#projects" variant="dark" className="w-full sm:w-auto">
              View Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="light" className="w-full sm:w-auto">
              Contact Me
            </MagneticButton>
            <MagneticButton href={personalInfo.resumeUrl} variant="light" className="w-full sm:w-auto">
              Resume
            </MagneticButton>
          </div>

          <a href="#about" className="mt-10 hidden items-center gap-3 font-display text-2xl md:inline-flex">
            <svg viewBox="0 0 120 52" className="h-10 w-24 text-black" fill="none" aria-hidden="true">
              <path
                d="M4 10 C 28 2, 54 26, 62 22 C 70 18, 70 8, 70 8 C 70 8, 70 24, 84 28 C 95 31, 109 39, 114 49"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Scroll Down
          </a>
        </motion.div>

        {!isMobile ? (
          <motion.div
            className="relative md:col-span-2"
            initial={disableAnimations ? false : { y: 28, opacity: 0 }}
            whileInView={disableAnimations ? undefined : { y: 0, opacity: 1 }}
            viewport={disableAnimations ? undefined : { once: true, amount: 0.3 }}
            transition={disableAnimations ? undefined : { duration: 0.45, delay: 0.12 }}
          >
            <div
              className="brutal-border brutal-shadow flex h-[360px] w-full items-center justify-center overflow-hidden md:h-[520px]"
              style={{ transform: "rotate(1deg)", background: "var(--hero-cube-bg)" }}
            >
              <Cubes
                gridSize={8}
                maxAngle={52}
                radius={2.6}
                duration={{ enter: 0.22, leave: 0.34 }}
                borderStyle="2px dotted var(--cube-border-color)"
                faceColor="var(--cube-face-color)"
                autoAnimate
                rippleOnClick
                rippleSpeed={2.4}
              />
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
