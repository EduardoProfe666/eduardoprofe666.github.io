/**
 * Sound and haptics: the preference store, the vibration patterns, and the one
 * listener that gives every link and button on the page a voice.
 *
 * The synthesis itself lives in `sound.ts`. This file decides *when*.
 */

import {
  setMasterVolume,
  soundCoin,
  soundChord,
  soundHover,
  soundNote,
  soundPop,
  soundStep,
  soundSweep,
  soundTap,
  soundToggle,
  unlockAudio,
} from "@/lib/sound";

const STORAGE_KEY = "sound";

export interface SoundPrefs {
  /** 0 to 1. */
  readonly volume: number;
  readonly muted: boolean;
}

/**
 * On, and quiet. Every cue is mixed to be texture rather than an alert, and
 * nothing can play before the visitor's first click anyway — browsers will not
 * start an AudioContext without a gesture — so nobody is ambushed by opening
 * the page.
 */
const DEFAULT: SoundPrefs = Object.freeze({ volume: 0.55, muted: false });

let prefs: SoundPrefs | null = null;
const listeners = new Set<() => void>();

function read(): SoundPrefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return DEFAULT;
    const { volume, muted } = parsed as Partial<SoundPrefs>;
    return Object.freeze({
      volume: typeof volume === "number" ? Math.min(1, Math.max(0, volume)) : DEFAULT.volume,
      muted: typeof muted === "boolean" ? muted : DEFAULT.muted,
    });
  } catch {
    // Private mode, storage blocked, or something else wrote the key.
    return DEFAULT;
  }
}

/**
 * Stable reference per state, because React compares snapshots by identity.
 * Deliberately free of side effects: React calls this during render.
 */
export function getSoundPrefs(): SoundPrefs {
  prefs ??= read();
  return prefs;
}

/** The server has no localStorage, so it renders the default. */
export function getServerSoundPrefs(): SoundPrefs {
  return DEFAULT;
}

export function subscribeToSound(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function level(p: SoundPrefs): number {
  return p.muted ? 0 : p.volume;
}

function commit(next: SoundPrefs): void {
  prefs = Object.freeze(next);
  setMasterVolume(level(prefs));
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // The preference just will not survive the session.
  }
  for (const listener of listeners) listener();
}

/** Setting a volume also unmutes: reaching for the slider says what you want. */
export function setVolume(volume: number): void {
  const clamped = Math.min(1, Math.max(0, volume));
  commit({ volume: clamped, muted: clamped === 0 });
}

export function setMuted(muted: boolean): void {
  const current = getSoundPrefs();
  // Unmuting a slider someone dragged to zero has to land somewhere audible.
  commit({ volume: !muted && current.volume === 0 ? DEFAULT.volume : current.volume, muted });
}

export function isSoundOn(): boolean {
  return level(getSoundPrefs()) > 0;
}

// ── Haptics ─────────────────────────────────────────────────────────────────

/**
 * Vibration is a separate sense from sound and gets its own rules. It is not
 * tied to the volume control: muting the page in a quiet room is not a request
 * to lose the tactile confirmation that a tap registered, and a phone with the
 * ringer off still buzzes.
 *
 * Patterns are milliseconds, alternating buzz and pause. They stay short —
 * anything over about 20ms stops reading as a tap and starts reading as an
 * alert — and there is deliberately no hover pattern, because hover is a mouse
 * idea and a phone that buzzed at everything your finger slid past would be
 * unusable.
 *
 * iOS has never shipped the Vibration API, so all of this is a no-op there.
 */
const HAPTICS = {
  tap: 8,
  toggle: [10, 40, 14],
  step: 4,
  sweep: [6, 30, 10],
  /** Flick, two slowing spins, then the landing. */
  coin: [14, 110, 9, 150, 7, 1740, 24],
  /** One tap per note, so the hand feels the same roll the ear does. */
  filter: [7, 48, 7, 48, 7, 48, 7],
} as const;

let lastBuzz = 0;

function vibrate(pattern: number | readonly number[]): void {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  // Somebody who has asked the system to calm down should not be poked.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // A backgrounded tab is not allowed to vibrate, and throws in some browsers.
  if (document.visibilityState !== "visible") return;

  const now = performance.now();
  if (now - lastBuzz < 40) return;
  lastBuzz = now;

  try {
    navigator.vibrate(pattern as number | number[]);
  } catch {
    // Not supported after all.
  }
}

// ── Cues ────────────────────────────────────────────────────────────────────

let lastHover = 0;

/** Rate-limited: sweeping a cursor across a list must not become a drum roll. */
export function feedbackHover(): void {
  const now = performance.now();
  if (now - lastHover < 55) return;
  lastHover = now;
  soundHover();
}

export function feedbackTap(): void {
  soundTap();
  vibrate(HAPTICS.tap);
}

export function feedbackPop(): void {
  soundPop();
  vibrate(HAPTICS.toggle);
}

export function feedbackToggle(on: boolean): void {
  soundToggle(on);
  vibrate(HAPTICS.toggle);
}

/**
 * Muting confirms itself by touch only. Announcing that sound is off with a
 * sound would be absurd, and by the time a cue could start the master gain is
 * already on its way to zero anyway.
 */
export function feedbackMute(): void {
  vibrate(HAPTICS.toggle);
}

export function feedbackStep(levelValue: number): void {
  soundStep(levelValue);
  vibrate(HAPTICS.step);
}

export function feedbackSweep(up: boolean): void {
  soundSweep(up);
  vibrate(HAPTICS.sweep);
}

/** A note from the skills grid. Light on the haptics — you will press a lot. */
export function feedbackNote(index: number): void {
  soundNote(index);
  vibrate(HAPTICS.step);
}

/** Picking a category: the notes of the tiles it contains, rolled. */
export function feedbackFilter(indices: readonly number[]): void {
  soundChord(indices);
  vibrate(HAPTICS.filter);
}

/**
 * The same note, brushed rather than struck, for passing over a tile.
 *
 * No haptic: this fires from cursor movement, and a phone has no cursor to
 * move. It is also not rate-limited here — the grid only calls it when the
 * tile under the pointer actually changes, which is its own rate limit.
 */
export function feedbackSkillHover(index: number): void {
  soundNote(index, true);
}

export function feedbackCoin(short = false): void {
  soundCoin(short);
  vibrate(short ? HAPTICS.tap : HAPTICS.coin);
}

// ── The global listener ─────────────────────────────────────────────────────

/**
 * Anything you can click gets a hover and a press cue, wired once by
 * delegation instead of by threading a handler through thirty components —
 * which would also have meant every new link arriving silent by default.
 *
 * Elements that speak for themselves (the theme toggle, the portrait, the
 * volume control) mark themselves `data-sfx="none"` and play their own cue.
 */
const INTERACTIVE = 'a[href], button, [role="button"], summary';

export function installFeedback(): () => void {
  let hovered: Element | null = null;

  const target = (event: Event): Element | null => {
    const node = event.target;
    if (!(node instanceof Element)) return null;
    const el = node.closest(INTERACTIVE);
    return el && !el.closest('[data-sfx="none"]') ? el : null;
  };

  const onOver = (event: PointerEvent) => {
    // Touch fires a synthetic hover just before the tap; only mice mean it.
    if (event.pointerType !== "mouse") return;
    const el = target(event);
    // `pointerover` fires again for every child, so compare the resolved
    // ancestor rather than the node under the cursor.
    if (!el || el === hovered) return;
    hovered = el;
    feedbackHover();
  };

  const onOut = (event: PointerEvent) => {
    const to = event.relatedTarget;
    if (hovered && (!(to instanceof Node) || !hovered.contains(to))) hovered = null;
  };

  const onDown = (event: PointerEvent) => {
    unlockAudio();
    if (target(event)) feedbackTap();
  };

  const onKey = (event: KeyboardEvent) => {
    unlockAudio();
    // Only the keys that actually activate something.
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target instanceof Element && event.target.closest(INTERACTIVE)) {
      if (!event.target.closest('[data-sfx="none"]')) feedbackTap();
    }
  };

  // The stored volume has to reach the engine before the first cue does.
  setMasterVolume(level(getSoundPrefs()));

  document.addEventListener("pointerover", onOver);
  document.addEventListener("pointerout", onOut);
  document.addEventListener("pointerdown", onDown);
  document.addEventListener("keydown", onKey);

  return () => {
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointerout", onOut);
    document.removeEventListener("pointerdown", onDown);
    document.removeEventListener("keydown", onKey);
  };
}
