"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { projects, type ProjectCategory } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import BrutalCard from "@/components/ui/BrutalCard";

const TiltCard = dynamic(() => import("@/components/ui/TiltCard"), {
  ssr: false,
});

type ProjectFilter = "All" | ProjectCategory;

const filters: ProjectFilter[] = ["All", "Web", "Mobile", "API"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const rootElement = document.documentElement;

    const syncTheme = () => {
      setIsDarkTheme(rootElement.getAttribute("data-theme") === "dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(rootElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const getProjectThumbnail = (imagePath: string) => {
    if (!isDarkTheme || !imagePath.endsWith(".svg")) {
      return imagePath;
    }

    return imagePath.replace(/\.svg$/i, "-dark.svg");
  };

  return (
    <section id="projects" className="py-24">
      <div className="section-shell">
        <SectionHeading
          title="Projects"
          subtitle="Projects from transport-tech, forensic ML, social-impact platforms, and blockchain healthcare systems."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`brutal-btn px-4 py-2 text-sm font-semibold uppercase tracking-[0.09em] ${
                  isActive ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 22, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <TiltCard className="h-full" maxTilt={5}>
                    <BrutalCard
                      className="flex h-full flex-col overflow-hidden p-0"
                      tilt={index % 2 === 0 ? -1 : 1}
                    >
                      <div className="relative h-48 border-b-[4px] border-black bg-white">
                        <Image
                          src={getProjectThumbnail(project.image)}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-4xl leading-none">{project.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed">{project.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span key={tech} className="stamp-tag px-2 py-1 text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto flex gap-2 pt-5">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="brutal-btn flex-1 bg-black px-3 py-2 text-center text-sm font-medium text-white"
                          >
                            Live ↗
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="brutal-btn flex-1 bg-white px-3 py-2 text-center text-sm font-medium"
                          >
                            GitHub
                          </a>
                        </div>
                      </div>
                    </BrutalCard>
                  </TiltCard>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
