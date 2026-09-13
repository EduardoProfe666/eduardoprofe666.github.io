"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DATA } from "@/data/resume";
import { EASE } from "@/lib/motion";
import { feedbackPop } from "@/lib/feedback";
import { useTranslation } from "@/i18n/store";

/** How long the confirmation stays before the button goes back to asking. */
const REVERT_MS = 2200;

/**
 * The async Clipboard API is the right one, and it refuses in more situations
 * than you would guess — an insecure origin, a denied permission, or simply a
 * document that does not currently have focus. `execCommand` is deprecated and
 * still works in every one of those, so it stays as the net underneath.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fall through.
  }

  try {
    const field = document.createElement("textarea");
    field.value = text;
    // Off-screen rather than hidden: a display:none field cannot be selected.
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:-9999px;opacity:0";
    document.body.append(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  } catch {
    return false;
  }
}

const MailIcon = DATA.contact.social.Email.icon;

/**
 * Copies the address instead of firing a `mailto:`.
 *
 * On a desktop with no mail client configured — which is most of them now —
 * `mailto:` does nothing at all, and the visitor walks away without the
 * address they came for. Copying always works, and the dock still carries a
 * real mail link for people who want one.
 *
 * Falls back to `mailto:` if the clipboard is unavailable, which is what this
 * button used to do anyway.
 */
export function ContactCta() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(async () => {
    if (!(await writeToClipboard(DATA.contact.email))) {
      // Nothing could hold the address, so hand the visitor off to their mail
      // client instead. Never silently: a contact button that does nothing at
      // all is the worst thing on the page.
      window.location.href = DATA.contact.social.Email.url;
      return;
    }
    feedbackPop();
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), REVERT_MS);
  }, []);

  return (
    <button
      type="button"
      data-sfx="none"
      onClick={copy}
      title={DATA.contact.email}
      className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-all duration-400 ease-state hover:bg-foreground/90 hover:elevate-3 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-95 active:duration-100"
    >
      <span className="relative grid size-4 place-items-center">
        <AnimatePresence initial={false}>
          <m.span
            key={copied ? "done" : "mail"}
            initial={{ scale: 0.3, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.3, opacity: 0, rotate: 25 }}
            transition={{ type: "spring", stiffness: 620, damping: 20, mass: 0.5 }}
            className="col-start-1 row-start-1 inline-flex"
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <MailIcon className="size-4 transition-transform duration-400 ease-spring group-hover/cta:rotate-12 group-hover/cta:scale-110" />
            )}
          </m.span>
        </AnimatePresence>
      </span>

      {/* Both labels share one grid cell, so the button is already as wide as
          the longer of them and never jumps mid-swap. */}
      <span className="grid">
        <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {t("contact.cta")}
        </span>
        <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {t("contact.copied")}
        </span>
        {/* No `mode="wait"`: the two labels live in the same grid cell, so
            they can cross-fade in place. Waiting would make the new label's
            appearance depend on the old one finishing its exit. */}
        <AnimatePresence initial={false}>
          <m.span
            key={copied ? "done" : "idle"}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE.state }}
            className="col-start-1 row-start-1 whitespace-nowrap"
          >
            {copied ? t("contact.copied") : t("contact.cta")}
          </m.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
