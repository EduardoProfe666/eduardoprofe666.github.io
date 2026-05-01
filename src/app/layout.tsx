import { BackToTop } from "@/components/main/back-to-top";
import { JsonLd } from "@/components/common/json-ld";
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
    default: `${DATA.name} — Fullstack Team Lead & AI Engineer`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  applicationName: `${DATA.name} Portfolio`,
  creator: DATA.name,
  publisher: DATA.name,
  category: "portfolio",
  openGraph: {
    title: `${DATA.name} — Fullstack Team Lead & AI Engineer`,
    description: DATA.description,
    url: DATA.url,
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: `${DATA.name} — Portfolio`,
        type: "image/png",
      },
    ],
    siteName: `${DATA.name} Portfolio`,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: `${DATA.name} — Fullstack Team Lead & AI Engineer`,
    description: DATA.description,
    card: "summary_large_image",
    images: ["/portfolio.png"],
    creator: "@EduardoProfe666",
  },
  keywords: [
    DATA.name,
    "EduardoProfe666",
    "Fullstack Developer",
    "AI Engineer",
    "Team Lead",
    "DevOps",
    "React",
    "Next.js",
    "TypeScript",
    "Software Engineer",
    "Portfolio",
    "Cuba",
    "CUJAE",
  ],
  authors: [
    {
      name: DATA.name,
      url: DATA.url,
    },
    {
      name: "EduardoProfe666",
      url: "https://github.com/EduardoProfe666",
    },
  ],
  alternates: {
    canonical: DATA.url,
  },
  other: {
    "google-site-verification": "",
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
        <link rel="icon" href="/portfolio.png" type="image/png" />
        <link rel="apple-touch-icon" href="/portfolio.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="//cdn.simpleicons.org" />
        <link rel="dns-prefetch" href="//api.github.com" />
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
          <TooltipProvider delayDuration={100}>
            {children}
            <Navbar />
            <BackToTop />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
