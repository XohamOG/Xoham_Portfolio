import CursorWave from "@/components/CursorWave";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import FloatingNavbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import StaggeredMenu, { StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/StaggeredMenu";

const MENU_ITEMS: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Go to Home section", link: "#home" },
  { label: "About", ariaLabel: "Go to About Me section", link: "#about" },
  { label: "Projects", ariaLabel: "Go to Projects section", link: "#projects" },
  { label: "Experience", ariaLabel: "Go to Experience and Achievements section", link: "#experience" },
  { label: "Gallery", ariaLabel: "Go to Gallery section", link: "#gallery" },
  { label: "Resume", ariaLabel: "View Resume PDF", link: "/Carwale_resume.pdf", target: "_blank", rel: "noopener noreferrer" },
];

const SOCIAL_ITEMS: StaggeredMenuSocialItem[] = [
  { label: "GitHub", link: "https://github.com/XohamOG" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/soham-patil-78044727b/" },
  { label: "Instagram", link: "https://www.instagram.com/xoham_/" },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative", backgroundColor: "#0a0a0a" }}>
      <LoadingScreen />
      <FloatingNavbar />
      <StaggeredMenu
        isFixed={true}
        position="right"
        logoUrl="/logo.png"
        items={MENU_ITEMS}
        socialItems={SOCIAL_ITEMS}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffffff"
        changeMenuColorOnOpen={true}
        colors={["#007BA7", "#FF2D95"]}
        accentColor="#FF2D95"
      />
      <CursorWave
        shape="mixed"
        colorMode="multicolor"
        cellSize={42}
        influenceRadiusVmin={26}
        attackTime={0.09}
        releaseTime={0.14}
        idleScale={0.13}
        minPeakScale={0.9}
        maxPeakScale={2.4}
        burstSpeed={920}
        burstThickness={140}
        backgroundColor="#0a0a0a"
        idleAlpha={0.3}
        ambientWave={true}
        waveSpin={0.08}
        displacementFactor={0.26}
      >
        <Hero />
      </CursorWave>
      <About />
      <Projects />
      <Experience />
      <Gallery />
    </main>
  );
}
