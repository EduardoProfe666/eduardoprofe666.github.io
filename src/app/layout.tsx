import { BackToTop } from "@/components/main/back-to-top";
import { JsonLd } from "@/components/common/json-ld";
import { I18nProvider } from "@/i18n/provider";
import Navbar from "@/components/main/navbar";
import { ThemeProvider } from "@/components/main/theme-provider";
import { TooltipProvider } from "@/components/common/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = `${DATA.name} — Fullstack Team Lead & AI Engineer`;
const DESCRIPTION =
  "Fullstack Team Lead & AI Engineer with 4+ years of experience. Building scalable solutions with modern stacks, AI integration, and DevOps practices. Based in Havana, Cuba.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: TITLE,
    template: `%s | ${DATA.name}`,
  },
  description: DESCRIPTION,
  applicationName: "Eduardo González Portfolio",
  generator: "Next.js",
  creator: DATA.name,
  publisher: DATA.name,
  category: "technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: DATA.url,
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: `${DATA.name} — Fullstack Team Lead & AI Engineer Portfolio`,
        type: "image/png",
      },
    ],
    siteName: `${DATA.name}`,
    locale: "en_US",
    alternateLocale: ["es_ES", "fr_FR", "de_DE", "it_IT"],
    type: "profile",
    firstName: "Eduardo",
    lastName: "González",
    username: "EduardoProfe666",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    card: "summary_large_image",
    images: [
      {
        url: "/portfolio.png",
        alt: `${DATA.name} — Portfolio`,
        width: 1200,
        height: 630,
      },
    ],
    site: "@EduardoProfe666",
    creator: "@EduardoProfe666",
  },
  keywords: [
    DATA.name,
    "EduardoProfe666",
    "Eduardo González Martell",
    "Fullstack Developer",
    "Full Stack Engineer",
    "AI Engineer",
    "Artificial Intelligence",
    "Team Lead",
    "Tech Lead",
    "DevOps Engineer",
    "Cloud Infrastructure",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    ".NET",
    "Node.js",
    "Software Engineer",
    "Web Developer",
    "Mobile Developer",
    "React Native",
    "Portfolio",
    "Cuba",
    "Havana",
    "CUJAE",
    "Computer Engineering",
    "n8n",
    "AWS",
    "DigitalOcean",
  ],
  authors: [
    { name: DATA.name, url: DATA.url },
    { name: "EduardoProfe666", url: "https://github.com/EduardoProfe666" },
  ],
  alternates: {
    canonical: DATA.url,
    languages: {
      "en-US": DATA.url,
      "es-ES": DATA.url,
      "fr-FR": DATA.url,
      "de-DE": DATA.url,
      "it-IT": DATA.url,
    },
  },
  icons: {
    icon: "/portfolio.png",
    apple: "/portfolio.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="//cdn.simpleicons.org" />
        <link rel="dns-prefetch" href="//api.github.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="author" content={DATA.name} />
        <meta name="geo.region" content="CU-03" />
        <meta name="geo.placename" content="Havana" />
        <meta name="geo.position" content="23.1136;-82.3666" />
        <meta name="ICBM" content="23.1136, -82.3666" />
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md focus:text-sm focus:font-medium">
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light">
          <I18nProvider>
            <TooltipProvider delayDuration={100}>
              {children}
              <Navbar />
              <BackToTop />
            </TooltipProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
