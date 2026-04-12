import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import LenisProvider from "@/components/ui/LenisProvider";
import PageReveal from "@/components/ui/PageReveal";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import ClickSpark from "@/components/ui/ClickSpark";
import MobileMotionProvider from "@/components/ui/MobileMotionProvider";
import "@/styles/globals.css";
import { personalInfo } from "@/data/portfolio";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.role}`,
  description: personalInfo.bio,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${inter.variable} bg-dot-grid font-body antialiased`}
      >
        <MobileMotionProvider>
          <ClickSpark
            themeAwareColor
            sparkSize={11}
            sparkRadius={18}
            sparkCount={8}
            duration={420}
            disableOnMobile
          >
            <LenisProvider>
              <PageReveal />
              <ScrollProgressBar />
              <Navbar />
              {children}
            </LenisProvider>
          </ClickSpark>
        </MobileMotionProvider>
      </body>
    </html>
  );
}
