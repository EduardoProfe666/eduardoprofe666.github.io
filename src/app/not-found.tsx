"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Home } from "lucide-react";
import { useTranslation } from "@/i18n/provider";
import { EASE } from "@/lib/motion";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center min-h-[80dvh] text-center px-6 gap-6 select-none">
      {/* 404 + emoji */}
      <div className="relative">
        <m.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE.soft }}
        >
          <span className="block text-[11rem] sm:text-[15rem] font-black leading-none tracking-tighter text-foreground/[0.04]">
            404
          </span>
        </m.div>
        <m.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.25,
            duration: 0.5,
            ease: EASE.spring,
          }}
        >
          <m.span
            className="text-7xl sm:text-8xl cursor-default"
            animate={{ rotate: [0, -5, 5, -3, 0] }}
            transition={{
              delay: 1,
              duration: 0.6,
              ease: EASE.soft,
            }}
          >
            🫠
          </m.span>
        </m.div>
      </div>

      {/* Text */}
      <m.div
        initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.2, duration: 0.4, ease: EASE.soft }}
        className="space-y-2 max-w-md -mt-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
          {t("notFound.title")}
        </h1>
        <p className="text-muted-foreground text-pretty leading-relaxed text-sm sm:text-base">
          {t("notFound.description")}
        </p>
      </m.div>

      {/* CTA */}
      <m.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: EASE.soft }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3 text-sm font-medium hover:bg-foreground/90 hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-240 ease-state"
        >
          <Home className="size-4 group-hover:scale-110 transition-transform duration-240 ease-state" />
          {t("notFound.cta")}
        </Link>
      </m.div>
    </main>
  );
}
