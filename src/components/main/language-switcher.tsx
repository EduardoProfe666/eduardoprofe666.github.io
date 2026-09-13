"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/provider";
import { locales } from "@/i18n/index";
import type { Locale } from "@/i18n/types";
import { buttonVariants } from "@/components/common/button";
import { feedbackTick } from "@/lib/feedback";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { US, ES, FR, DE, IT } from "country-flag-icons/react/3x2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FLAG_COMPONENTS: Record<string, React.FC<any>> = {
  en: US,
  es: ES,
  fr: FR,
  de: DE,
  it: IT,
};

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closePanel();
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closePanel();
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function closePanel() {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  }

  function handleSelect(code: Locale) {
    if (code === locale) {
      closePanel();
      return;
    }
    feedbackTick();
    setLocale(code);
    closePanel();
  }

  const CurrentFlag = FLAG_COMPONENTS[locale];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-12 cursor-pointer"
        )}
        onClick={() => {
          feedbackTick();
          if (isOpen) closePanel();
          else setIsOpen(true);
        }}
        aria-label={t("nav.language")}
        aria-expanded={isOpen}
      >
        {CurrentFlag && (
          <CurrentFlag className="size-5" />
        )}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className={cn(
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56",
            // Same glass as the dock it grows out of, and scaled from its
            // bottom edge so it reads as unfolding from the button.
            "material overflow-hidden rounded-2xl origin-bottom",
            "transition-all duration-200 ease-glide",
            isClosing
              ? "translate-y-1 scale-95 opacity-0"
              : "animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-200 ease-glide"
          )}
          role="listbox"
          aria-label="Select language"
        >
          <div className="p-1.5">
            {locales.map((loc, index) => {
              const isActive = loc.code === locale;
              const FlagIcon = FLAG_COMPONENTS[loc.code];
              return (
                <button
                  key={loc.code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(loc.code as Locale)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
                    "transition-[transform,background-color,color] duration-300 ease-glide active:scale-[0.98] active:duration-100",
                    "group cursor-pointer",
                    // The rows cascade in behind the panel. The delay was
                    // already here but had no animation to delay.
                    !isClosing && "animate-in fade-in slide-in-from-bottom-1 duration-300 ease-glide",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted/60 active:bg-muted/80"
                  )}
                  style={{
                    animationDelay: `${40 + index * 35}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  {FlagIcon && (
                    <FlagIcon className="size-5 flex-shrink-0 rounded-[2px] shadow-sm transition-transform duration-400 ease-spring group-hover:scale-110" />
                  )}
                  <div className="flex-1 text-left transition-transform duration-400 ease-glide group-hover:translate-x-0.5">
                    <span className="text-sm font-semibold leading-tight">
                      {loc.nativeName}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1.5">
                      ({loc.name})
                    </span>
                  </div>
                  <div
                    className={cn(
                      "transition-all duration-400 ease-spring",
                      isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    )}
                  >
                    <Check className="size-4 text-foreground/70" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
