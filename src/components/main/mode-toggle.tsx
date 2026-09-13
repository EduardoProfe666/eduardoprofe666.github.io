"use client";

import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { buttonVariants } from "@/components/common/button";
import { feedbackPop } from "@/lib/feedback";
import { useTranslation } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * Wires magicui's animated toggler to `next-themes` in controlled mode, so the
 * library stays the single owner of persistence and system-preference syncing
 * while the component owns the View Transition wipe.
 */
export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <AnimatedThemeToggler
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={(next) => {
        feedbackPop();
        setTheme(next);
      }}
      variant="circle"
      data-sfx="none"
      aria-label={t("nav.theme")}
      title={t("nav.theme")}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "px-2 cursor-pointer text-foreground"
      )}
    />
  );
}
