import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fredoka, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xoham.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Soham Patil Portfolio",
    template: "%s | Soham Patil Portfolio",
  },
  description:
    "Official portfolio and interactive creative space of Soham Patil (Xoham) - Creative Developer, Full-Stack Engineer, and Interactive UI Craftsman building high-performance web experiences.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  keywords: [
    "Soham Patil",
    "Soham",
    "Xoham",
    "Portfolio",
    "Creative Developer",
    "Full Stack Developer",
    "Interactive UI",
    "Next.js",
    "React",
    "Frontend Engineer",
    "TypeScript",
  ],
  authors: [{ name: "Soham Patil", url: "https://github.com/XohamOG" }],
  creator: "Soham Patil",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Soham Patil Portfolio",
    description:
      "Official portfolio and interactive creative space of Soham Patil (Xoham) - Creative Developer & Full-Stack Engineer.",
    url: baseUrl,
    siteName: "Soham Patil Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 708,
        height: 708,
        alt: "Soham Patil Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Patil Portfolio",
    description:
      "Official portfolio and interactive creative space of Soham Patil (Xoham) - Creative Developer & Full-Stack Engineer.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${fredoka.variable} ${outfit.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

