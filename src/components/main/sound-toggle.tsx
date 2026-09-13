"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/common/button";
import {
  feedbackPop,
  isSoundEnabled,
  isSoundEnabledOnServer,
  setSoundEnabled,
  subscribeToSound,
} from "@/lib/feedback";
import { useTranslation } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * Turns the interaction sounds on. Off until asked, so nobody opening the page
 * from a CV gets a surprise; the cue plays on the way in so the choice is
 * immediately audible.
 */
export function SoundToggle() {
  const { t } = useTranslation();
  const enabled = useSyncExternalStore(
    subscribeToSound,
    isSoundEnabled,
    isSoundEnabledOnServer
  );

  const label = enabled ? t("nav.soundOff") : t("nav.soundOn");

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={enabled}
      onClick={() => {
        setSoundEnabled(!enabled);
        // Play after enabling, so switching it on is confirmed by the sound.
        if (!enabled) feedbackPop();
      }}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "px-2 cursor-pointer text-neutral-800 dark:text-neutral-200 transition-transform duration-150 active:scale-90"
      )}
    >
      {enabled ? (
        <Volume2 className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <VolumeX className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
}
