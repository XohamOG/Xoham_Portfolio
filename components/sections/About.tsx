"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { personalInfo } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import BrutalCard from "@/components/ui/BrutalCard";

type CounterProps = {
  value: number;
  suffix?: string;
};

function CountUp({ value, suffix = "" }: CounterProps) {
  const [current, setCurrent] = useState(0);
  const valueRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(valueRef, { amount: 0.85, once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (shouldReduceMotion) {
      setCurrent(value);
      return;
    }

    const start = performance.now();
    const duration = 1000;

    const updateCounter = (time: number) => {
      const elapsed = Math.min((time - start) / duration, 1);
      setCurrent(Math.floor(value * elapsed));
      if (elapsed < 1) {
        window.requestAnimationFrame(updateCounter);
      }
    };

    const animationId = window.requestAnimationFrame(updateCounter);
    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span ref={valueRef}>
      {current}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 6, suffix: "x", label: "Hackathons Won", tilt: -2 },
  { value: 2, suffix: "", label: "Internships", tilt: 1 },
  { value: 9, suffix: ".35", label: "CGPA (Sem 5)", tilt: -1 },
];

const PROFILE_IMAGE_CONFIG = {
  stageAspectRatio: "1 / 1",
  objectPosition: "center center",
} as const;

const PIXEL_TRANSITION_CONFIG = {
  tileColumns: 14,
  tileRows: 14,
  tileDelayModulo: 15,
  tileDelayStepMs: 16,
  tileAnimationMs: 360,
  hoverFadeMs: 450,
} as const;

export default function About() {
  const [isImageHover, setIsImageHover] = useState(false);
  const [tileAnimPhase, setTileAnimPhase] = useState<"idle" | "hover" | "exit">("idle");
  const [tileAnimSeed, setTileAnimSeed] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const tileAnimTimerRef = useRef<number | null>(null);
  const totalTileAnimMs =
    PIXEL_TRANSITION_CONFIG.tileAnimationMs +
    (PIXEL_TRANSITION_CONFIG.tileDelayModulo - 1) * PIXEL_TRANSITION_CONFIG.tileDelayStepMs;
  const pixelTiles = useMemo(
    () =>
      Array.from(
        {
          length:
            PIXEL_TRANSITION_CONFIG.tileColumns *
            PIXEL_TRANSITION_CONFIG.tileRows,
        },
        (_, index) => {
          const x = index % PIXEL_TRANSITION_CONFIG.tileColumns;
          const y = Math.floor(index / PIXEL_TRANSITION_CONFIG.tileColumns);

          return {
            key: `${x}-${y}`,
            x,
            y,
            delay:
              ((x * 11 + y * 7) % PIXEL_TRANSITION_CONFIG.tileDelayModulo) *
              PIXEL_TRANSITION_CONFIG.tileDelayStepMs,
          };
        },
      ),
    [],
  );

  useEffect(() => {
    return () => {
      if (tileAnimTimerRef.current !== null) {
        window.clearTimeout(tileAnimTimerRef.current);
      }
    };
  }, []);

  const playTileAnimation = (phase: "hover" | "exit") => {
    if (shouldReduceMotion) {
      setTileAnimPhase("idle");
      return;
    }

    if (tileAnimTimerRef.current !== null) {
      window.clearTimeout(tileAnimTimerRef.current);
    }

    setTileAnimPhase(phase);
    setTileAnimSeed((current) => current + 1);

    tileAnimTimerRef.current = window.setTimeout(() => {
      setTileAnimPhase("idle");
      tileAnimTimerRef.current = null;
    }, totalTileAnimMs);
  };

  const handleImageMouseEnter = () => {
    setIsImageHover(true);
    playTileAnimation("hover");
  };

  const handleImageMouseLeave = () => {
    setIsImageHover(false);
    playTileAnimation("exit");
  };

  return (
    <section id="about" className="py-24">
      <div className="section-shell">
        <SectionHeading
          title="About Me"
          subtitle="Computer science undergrad at VESIT, building practical software across backend systems, full-stack products, and emerging technologies."
        />

        <motion.div
          className="mt-10 grid items-start gap-8 md:grid-cols-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <BrutalCard className="mx-auto w-full max-w-md bg-white p-4" tilt={-2}>
            <div className="brutal-border bg-white p-2">
              <div
                className="profile-image-stage relative w-full overflow-hidden bg-white"
                data-phase={tileAnimPhase}
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
                style={{
                  aspectRatio: PROFILE_IMAGE_CONFIG.stageAspectRatio,
                }}
              >
                <Image
                  src="/images/soham-patil.jpeg"
                  alt="Soham Patil"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover"
                  style={{ objectPosition: PROFILE_IMAGE_CONFIG.objectPosition }}
                  quality={100}
                />

                <Image
                  src="/images/soham_patil_pixel.png"
                  alt="Soham Patil pixel portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="profile-pixel-image object-cover"
                  style={{
                    objectPosition: PROFILE_IMAGE_CONFIG.objectPosition,
                    opacity: isImageHover ? 1 : 0,
                    transition: shouldReduceMotion
                      ? "opacity 0ms"
                      : isImageHover
                        ? `opacity ${PIXEL_TRANSITION_CONFIG.hoverFadeMs}ms steps(6, end)`
                        : "opacity 0ms",
                  }}
                  loading="lazy"
                />

                <div
                  className="pixel-transition-grid"
                  style={{
                    ["--pixel-cols" as string]: PIXEL_TRANSITION_CONFIG.tileColumns,
                    ["--pixel-rows" as string]: PIXEL_TRANSITION_CONFIG.tileRows,
                  }}
                >
                  {pixelTiles.map((tile) => (
                    <span
                      key={`${tile.key}-${tileAnimSeed}`}
                      className="pixel-transition-tile"
                      style={{
                        backgroundImage: "url('/images/soham_patil_pixel.png')",
                        backgroundSize: `${PIXEL_TRANSITION_CONFIG.tileColumns * 100}% ${PIXEL_TRANSITION_CONFIG.tileRows * 100}%`,
                        backgroundPosition: `${(tile.x / (PIXEL_TRANSITION_CONFIG.tileColumns - 1)) * 100}% ${(tile.y / (PIXEL_TRANSITION_CONFIG.tileRows - 1)) * 100}%`,
                        ["--tile-delay" as string]:
                          tileAnimPhase !== "idle" && !shouldReduceMotion
                            ? `${tile.delay}ms`
                            : "0ms",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 px-1 font-display text-2xl">Pinned to the board in {personalInfo.location}</p>
          </BrutalCard>

          <BrutalCard className="p-6 md:p-8" tilt={1}>
            <p className="text-base leading-relaxed md:text-lg">{personalInfo.bio}</p>
            <div className="section-divider my-6" />
            <p className="text-sm uppercase tracking-[0.1em]">Current role</p>
            <p className="mt-1 font-display text-4xl leading-none">{personalInfo.role}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.1em]">Education</p>
            <p className="mt-1 text-base">B.E. Computer Science, VESIT (2023 - 2027)</p>
            <p className="mt-4 text-sm uppercase tracking-[0.1em]">Location</p>
            <p className="mt-1 text-base">{personalInfo.location}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.1em]">Email</p>
            <a href={`mailto:${personalInfo.email}`} className="link-underline mt-1 inline-block text-base">
              {personalInfo.email}
            </a>
          </BrutalCard>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <BrutalCard className="p-5 text-center" tilt={stat.tilt}>
                <p className="font-display text-6xl leading-none">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.11em]">{stat.label}</p>
              </BrutalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
