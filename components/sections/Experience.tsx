"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import BrutalCard from "@/components/ui/BrutalCard";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineClipRef = useRef<SVGRectElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current || !lineClipRef.current) {
      return;
    }

    const lineTween = gsap.to(lineClipRef.current, {
      attr: { height: 1200 },
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 72%",
        end: "bottom 78%",
        scrub: true,
      },
    });

    const revealTweens = gsap.utils.toArray<HTMLElement>(".timeline-reveal").map((element) =>
      gsap.fromTo(
        element,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        },
      ),
    );

    return () => {
      lineTween.scrollTrigger?.kill();
      lineTween.kill();
      revealTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [shouldReduceMotion]);

  return (
    <section id="experience" ref={sectionRef} className="py-24">
      <div className="section-shell">
        <SectionHeading
          title="Experience"
          subtitle="Timeline of internships and high-impact hackathon work focused on backend systems, blockchain, and applied AI builds."
        />

        <div className="relative mt-14 border-l-[3px] border-dashed border-black pl-7 md:border-none md:pl-0">
          <svg
            viewBox="0 0 40 1200"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-10 -translate-x-1/2 text-black md:block"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="timeline-clip">
                <rect ref={lineClipRef} x="0" y="0" width="40" height="0" />
              </clipPath>
            </defs>

            <path
              d="M20 0 L20 1200"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="11 11"
              fill="none"
              opacity="0.2"
            />

            <path
              d="M20 0 L20 1200"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="11 11"
              fill="none"
              clipPath="url(#timeline-clip)"
            />
          </svg>

          <div className="space-y-10 md:space-y-14">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={`${item.company}-${item.duration}`} className="relative grid gap-6 md:grid-cols-2 md:gap-12">
                  <div className={isLeft ? "" : "md:order-2"}>
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45 }}
                    >
                      <BrutalCard className="p-6" tilt={isLeft ? -1 : 1}>
                        <h3 className="timeline-reveal font-display text-4xl leading-none">{item.company}</h3>
                        <p className="timeline-reveal mt-2 text-sm uppercase tracking-[0.1em]">
                          {item.role} · {item.duration}
                        </p>
                        <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                          {item.highlights.map((highlight) => (
                            <li key={highlight} className="timeline-reveal flex gap-2">
                              <span aria-hidden="true">●</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </BrutalCard>
                    </motion.div>
                  </div>

                  <div className={isLeft ? "hidden md:block" : "hidden md:block md:order-1"} />

                  <span
                    className="absolute left-[-36px] top-8 h-4 w-4 rounded-full border-[3px] border-black bg-white md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
