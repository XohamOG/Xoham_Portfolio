"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import InfiniteLogoStrip from "@/components/ui/InfiniteLogoStrip";

const skillGroups = [
  { title: "Frontend", items: skills.frontend },
  { title: "Backend", items: skills.backend },
  { title: "DevOps / Tools", items: skills.devops },
];

const getTilt = (index: number) => ((index * 37) % 5) - 2;

export default function Skills() {
  return (
    <section id="skills" className="bg-lined-paper py-24">
      <div className="section-shell">
        <SectionHeading
          title="Skills"
          subtitle="Stack used across hackathons, internships, and production-oriented builds in backend, full-stack, and blockchain systems."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              className="brutal-card bg-white p-5"
              style={{
                ["--card-tilt" as string]: `${groupIndex % 2 === 0 ? -1 : 1}deg`,
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: groupIndex * 0.08 }}
            >
              <h3 className="font-display text-4xl leading-none">{group.title}</h3>
              <div className="section-divider my-4" />

              <div className="flex flex-wrap gap-3">
                {group.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    className="stamp-tag inline-flex px-3 py-2 text-sm font-medium"
                    style={{ rotate: `${getTilt(itemIndex + groupIndex)}deg` }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      type: "spring",
                      stiffness: 210,
                      damping: 16,
                      delay: itemIndex * 0.08,
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <InfiniteLogoStrip />
      </div>
    </section>
  );
}
