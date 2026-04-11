"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import BrutalCard from "@/components/ui/BrutalCard";

export default function Achievements() {
  return (
    <section id="achievements" className="bg-lined-paper py-24">
      <div className="section-shell">
        <SectionHeading
          title="Achievements"
          subtitle="Highlights from hackathons, academics, and real systems shipped during internships and team builds."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
            >
              <BrutalCard className="h-full p-6" tilt={index % 2 === 0 ? -1 : 1}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em]">Highlight</p>
                <h3 className="mt-2 font-display text-4xl leading-none">{achievement.title}</h3>
                <p className="mt-4 text-sm leading-relaxed">{achievement.detail}</p>
              </BrutalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
