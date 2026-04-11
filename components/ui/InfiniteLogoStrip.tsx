import {
  SiDocker,
  SiFramer,
  SiGithub,
  SiGreensock,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const logos = [
  { label: "Next.js", icon: SiReact },
  { label: "TypeScript", icon: SiTypescript },
  { label: "Tailwind", icon: SiTailwindcss },
  { label: "GSAP", icon: SiGreensock },
  { label: "Framer", icon: SiFramer },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "Docker", icon: SiDocker },
  { label: "GitHub", icon: SiGithub },
];

export default function InfiniteLogoStrip() {
  const scrollingLogos = [...logos, ...logos];

  return (
    <div className="brutal-border mt-10 overflow-hidden bg-white py-2">
      <div className="marquee-track gap-4 px-4">
        {scrollingLogos.map((logo, index) => {
          const Icon = logo.icon;
          return (
            <span
              key={`${logo.label}-${index}`}
              className="brutal-border inline-flex min-w-[155px] items-center justify-center gap-2 bg-white px-3 py-2 text-sm font-medium"
            >
              <Icon className="h-4 w-4" />
              {logo.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
