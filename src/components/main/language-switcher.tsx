"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/provider";
import { locales } from "@/i18n/index";
import type { Locale } from "@/i18n/types";
import { buttonVariants } from "@/components/common/button";
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
        onClick={() => (isOpen ? closePanel() : setIsOpen(true))}
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
            "rounded-xl bg-background/95 backdrop-blur-xl",
            "border shadow-xl",
            "overflow-hidden",
            "transition-all duration-150 ease-out",
            isClosing
              ? "opacity-0 scale-95 translate-y-1"
              : "animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-200"
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
                    "transition-all duration-150 ease-out",
                    "group cursor-pointer",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted/50 active:bg-muted/70"
                  )}
                  style={{
                    animationDelay: `${index * 30}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  {FlagIcon && (
                    <FlagIcon className="size-5 group-hover:scale-110 transition-transform duration-150 flex-shrink-0" />
                  )}
                  <div className="flex-1 text-left group-hover:translate-x-0.5 transition-transform duration-150">
                    <span className="text-sm font-semibold leading-tight">
                      {loc.nativeName}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1.5">
                      ({loc.name})
                    </span>
                  </div>
                  <div
                    className={cn(
                      "transition-all duration-150",
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
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
