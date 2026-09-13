/**
 * Sound and haptics for deliberate interactions.
 *
 * Every cue is synthesised with the Web Audio API rather than loaded as a file:
 * no extra requests, no assets to cache, a few hundred bytes of code. The
 * `AudioContext` is created on the first cue, which is always inside a click
 * handler — browsers refuse to start one before a user gesture.
 *
 * Sound is off until the visitor turns it on. Unannounced audio on a portfolio
 * someone opened from a CV is a good way to have them close the tab; the dock
 * carries a toggle so it is discoverable instead. Haptics need no permission and
 * make no noise, so they are on by default and simply do nothing on iOS, which
 * has never supported the Vibration API.
 */

const STORAGE_KEY = "sound";

/** Cues, tuned to be short and quiet enough to feel like texture, not alerts. */
type Cue = "tick" | "pop" | "swoosh";

let context: AudioContext | null = null;
let enabled: boolean | null = null;
const listeners = new Set<() => void>();

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isSoundEnabled(): boolean {
  if (enabled === null) {
    try {
      enabled = window.localStorage.getItem(STORAGE_KEY) === "on";
    } catch {
      // Private mode, or storage blocked entirely.
      enabled = false;
    }
  }
  return enabled;
}

/** The server has no localStorage, so SSR always renders the off state. */
export function isSoundEnabledOnServer(): boolean {
  return false;
}

export function subscribeToSound(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function setSoundEnabled(next: boolean): void {
  enabled = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Preference just will not survive the session.
  }
  for (const listener of listeners) listener();
}

function getContext(): AudioContext | null {
  if (context) return context;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  try {
    context = new Ctor();
  } catch {
    return null;
  }
  return context;
}

/** Frequency sweep and length for each cue, in hertz and seconds. */
const CUES: Record<Cue, { from: number; to: number; seconds: number; gain: number }> = {
  tick: { from: 880, to: 760, seconds: 0.05, gain: 0.05 },
  pop: { from: 520, to: 900, seconds: 0.1, gain: 0.06 },
  swoosh: { from: 1100, to: 260, seconds: 0.42, gain: 0.05 },
};

function play(cue: Cue): void {
  if (!isSoundEnabled()) return;

  const ctx = getContext();
  if (!ctx) return;
  // Browsers suspend the context when it is created outside a gesture, and
  // after the tab has been backgrounded.
  if (ctx.state === "suspended") void ctx.resume();

  const { from, to, seconds, gain } = CUES[cue];
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(from, now);
  oscillator.frequency.exponentialRampToValueAtTime(to, now + seconds);

  // A short attack and an exponential decay: a square envelope would click.
  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(0.0001, now);
  envelope.gain.exponentialRampToValueAtTime(gain, now + 0.012);
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + seconds);

  oscillator.connect(envelope).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + seconds + 0.02);
}

/** No-ops where the Vibration API is missing, which includes every iPhone. */
function vibrate(pattern: number | number[]): void {
  if (prefersReducedMotion()) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // Some browsers throw when the page is not visible.
  }
}

/** A light cue for navigation and small toggles. */
export function feedbackTick(): void {
  play("tick");
  vibrate(8);
}

/** A brighter cue for a state change the visitor can see, like the theme. */
export function feedbackPop(): void {
  play("pop");
  vibrate(12);
}

/** The long one, for the portrait toss. */
export function feedbackSwoosh(): void {
  play("swoosh");
  vibrate([10, 60, 18]);
}
