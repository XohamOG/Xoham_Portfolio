"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { personalInfo } from "@/data/portfolio";
import VariableProximityText from "@/components/ui/VariableProximityText";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme =
      storedTheme === "dark" || storedTheme === "light"
        ? (storedTheme as "light" | "dark")
        : prefersDark
          ? "dark"
          : "light";

    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    setIsThemeReady(true);
  }, []);

  useEffect(() => {
    if (!isThemeReady) {
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme, isThemeReady]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-black bg-white">
        <div className="section-shell flex h-16 items-center justify-between">
          <Link href="#home" className="font-display text-3xl font-bold tracking-wide">
            <VariableProximityText text={personalInfo.name} maxDistance={120} />
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-7">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="link-underline text-sm font-medium uppercase tracking-[0.08em]">
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle dark theme"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-btn h-10 px-3 text-[0.65rem]"
              aria-label="Toggle dark theme"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((current) => !current)}
              className="brutal-border relative grid h-10 w-10 place-content-center bg-white"
            >
              <span
                className={`absolute block h-[3px] w-5 bg-black transition-transform duration-100 ${
                  isOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`absolute block h-[3px] w-5 bg-black transition-transform duration-100 ${
                  isOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white md:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          transition: "transform 0.12s steps(1, end)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div className="section-shell flex h-full flex-col justify-center gap-8 pt-20">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-display text-6xl leading-none"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
