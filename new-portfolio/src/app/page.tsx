import CursorWave from "@/components/CursorWave";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative", backgroundColor: "#060608" }}>
      <CursorWave
        shape="mixed"
        colorMode="multicolor"
        cellSize={42}
        influenceRadiusVmin={24}
        attackTime={0.2}
        releaseTime={0.58}
        idleScale={0.11}
        minPeakScale={0.75}
        maxPeakScale={1.6}
        burstSpeed={820}
        burstThickness={120}
        backgroundColor="#060608"
        idleAlpha={0.24}
        ambientWave={true}
        waveSpin={0.06}
        displacementFactor={0.09}
      >
        <Hero />
      </CursorWave>
    </main>
  );
}
