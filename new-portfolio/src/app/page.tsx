import Navigation from "@/components/Navigation";
import BackgroundEffects from "@/components/BackgroundEffects";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Subtle organic film grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Dynamic ambient cursor glow & grid crosshairs */}
      <BackgroundEffects />

      {/* Minimalist Topbar with 3-lines menu & editorial drawer */}
      <Navigation />

      {/* Hero section with kinetic SOHAM ➔ XOHAM title */}
      <Hero />
    </main>
  );
}
