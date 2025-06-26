import Navbar from "@/components/main/navbar";
import { ThemeProvider } from "@/components/main/theme-provider";
import { TooltipProvider } from "@/components/common/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    images: "/portfolio.png",
    siteName: `${DATA.name}`,
    locale: "en_US",
    alternateLocale: [
      "en_US", // Estados Unidos
      "cu_CU", // Cuba
      "es_ES", // España
      "pt_BR", // Brasil
      "ar_AR", // Argentina
      "cl_CL", // Chile
      "co_CO", // Colombia
      "mx_MX", // México
      "pr_PR", // Puerto Rico
      "pa_PA", // Panamá
      "ca_CA", // Canadá
      "do_DO", // República Dominicana
    ],
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
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
  keywords: "EduardoProfe666",
  authors: {
    name: "EduardoProfe666",
    url: "https://github.com/EduardoProfe666",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/me.png" as="image" />
        <link rel="dns-prefetch" href="//cdn.simpleicons.org" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        {" "}
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={100}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
