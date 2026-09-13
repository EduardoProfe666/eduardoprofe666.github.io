"use client";

import { AnimatePresence, m } from "framer-motion";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { buttonVariants } from "@/components/common/button";
import {
  feedbackMute,
  feedbackStep,
  feedbackToggle,
  getServerSoundPrefs,
  getSoundPrefs,
  setMuted,
  setVolume,
  subscribeToSound,
} from "@/lib/feedback";
import { useTranslation } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/** Pixels. Tall enough to aim at, short enough to sit above the dock. */
const TRACK = 104;
/** Twenty stops: fine enough to feel continuous, coarse enough to hear steps. */
const STOPS = 20;
/** How long the panel waits after the last interaction before folding away. */
const IDLE_MS = 2600;
/** Grace period after the cursor leaves, so you can reach the slider. */
const LEAVE_MS = 260;

const snap = (value: number) =>
  Math.round(Math.min(1, Math.max(0, value)) * STOPS) / STOPS;

/**
 * The dock's sound control: click the speaker to mute, and the volume springs
 * out above it.
 *
 * It opens on its own the moment you unmute — the point of turning sound on is
 * usually to set how much of it you want — and it also opens on hover, on the
 * scroll wheel and on the arrow keys, then folds away once you stop. Every
 * step plays itself at its own pitch, so the slider is audible as well as
 * visible.
 */
export function SoundControl() {
  const { t } = useTranslation();
  const prefs = useSyncExternalStore(
    subscribeToSound,
    getSoundPrefs,
    getServerSoundPrefs
  );
  const [open, setOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragging = useRef(false);
  const lastStep = useRef(-1);
  const inside = useRef(false);

  const level = prefs.muted ? 0 : prefs.volume;
  const percent = Math.round(level * 100);

  const clearTimers = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  useEffect(() => clearTimers, []);

  /**
   * Opens, and arms the fold-away. The timer never closes the panel out from
   * under a cursor that is still on it — it is there for the times the panel
   * was opened by a click, the wheel or the arrow keys, when there may be no
   * pointer nearby at all.
   */
  const show = useCallback(() => {
    clearTimers();
    setOpen(true);
    idleTimer.current = setTimeout(() => {
      if (!inside.current && !dragging.current) setOpen(false);
    }, IDLE_MS);
  }, []);

  /** Only fires a cue when the value actually moved to a new stop. */
  const commit = useCallback(
    (next: number) => {
      const value = snap(next);
      if (value === lastStep.current) return;
      lastStep.current = value;
      setVolume(value);
      feedbackStep(value);
    },
    []
  );

  const fromPointer = useCallback(
    (clientY: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      commit(1 - (clientY - rect.top) / rect.height);
    },
    [commit]
  );

  const nudge = useCallback(
    (delta: number) => {
      show();
      commit(level + delta);
    },
    [commit, level, show]
  );

  // The wheel listener has to be non-passive to keep the page from scrolling
  // underneath, and React attaches wheel handlers as passive.
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      nudge(event.deltaY < 0 ? 1 / STOPS : -1 / STOPS);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [nudge]);

  const toggle = () => {
    const nextMuted = !prefs.muted;
    setMuted(nextMuted);
    lastStep.current = -1;
    if (nextMuted) {
      feedbackMute();
      clearTimers();
      setOpen(false);
    } else {
      feedbackToggle(true);
      show();
    }
  };

  const Icon = level === 0 ? VolumeX : level <= 0.5 ? Volume1 : Volume2;
  const bucket = level === 0 ? "off" : level <= 0.5 ? "low" : "high";
  const label = prefs.muted ? t("nav.soundOn") : t("nav.soundOff");

  return (
    // The whole control speaks for itself, so the page-wide hover and press
    // cues stay out of its way.
    <div
      ref={wrapRef}
      data-sfx="none"
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        inside.current = true;
        if (!prefs.muted) show();
      }}
      onPointerLeave={() => {
        inside.current = false;
        if (dragging.current) return;
        clearTimers();
        // A grace period, because reaching the slider means crossing the gap
        // between it and the button, which counts as leaving.
        leaveTimer.current = setTimeout(() => setOpen(false), LEAVE_MS);
      }}
    >
      <AnimatePresence>
        {open && (
          <m.div
            key="volume"
            initial={{ opacity: 0, scale: 0.55, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 8 }}
            transition={{ type: "spring", stiffness: 520, damping: 22, mass: 0.6 }}
            className="material material-dense absolute bottom-full left-1/2 z-50 mb-3 flex origin-bottom -translate-x-1/2 flex-col items-center gap-2 rounded-full px-2 py-2.5"
          >
            <span className="text-2xs font-semibold tabular-nums leading-none text-muted-foreground">
              {percent}
            </span>
            <div
              ref={trackRef}
              role="slider"
              tabIndex={0}
              aria-label={t("nav.volume")}
              aria-orientation="vertical"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              aria-valuetext={`${percent}%`}
              style={{ height: TRACK }}
              className="relative w-6 cursor-pointer touch-none overflow-hidden rounded-full bg-foreground/10 transition-colors duration-240 ease-state hover:bg-foreground/15"
              onPointerDown={(event) => {
                dragging.current = true;
                lastStep.current = -1;
                event.currentTarget.setPointerCapture(event.pointerId);
                show();
                fromPointer(event.clientY);
              }}
              onPointerMove={(event) => {
                if (dragging.current) fromPointer(event.clientY);
              }}
              onPointerUp={(event) => {
                dragging.current = false;
                event.currentTarget.releasePointerCapture(event.pointerId);
                show();
              }}
              onKeyDown={(event) => {
                const step =
                  event.key === "ArrowUp" || event.key === "ArrowRight"
                    ? 1 / STOPS
                    : event.key === "ArrowDown" || event.key === "ArrowLeft"
                      ? -1 / STOPS
                      : 0;
                if (step === 0) return;
                event.preventDefault();
                nudge(step);
              }}
            >
              <m.div
                className="absolute inset-x-0 bottom-0 h-full origin-bottom rounded-full bg-foreground"
                animate={{ scaleY: Math.max(level, 0.001) }}
                transition={{ type: "spring", stiffness: 430, damping: 24, mass: 0.7 }}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={label}
        title={label}
        aria-pressed={!prefs.muted}
        onClick={toggle}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "px-2 cursor-pointer text-foreground"
        )}
      >
        {/* Keyed on the bucket, so the icon springs when it changes rather than
            swapping between frames. */}
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={bucket}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 640, damping: 20, mass: 0.5 }}
            className="inline-flex"
          >
            <Icon className="size-4" />
          </m.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
