/**
 * The sound engine.
 *
 * Every cue is synthesised at runtime. No audio files means no extra requests
 * and nothing to cache, on a site whose whole premise is eight dependencies and
 * nothing fetched at runtime.
 *
 * What makes a synthesised cue sound designed rather than like a test tone is
 * never the waveform. It is the layering:
 *
 *   - several partials at once, the high ones dying first, which is what every
 *     struck physical object does and what a lone oscillator can never imply;
 *   - a filtered noise transient at the onset — the sound of contact, the part
 *     your ear uses to decide what the thing is made of;
 *   - a short convolution tail, so a cue sits in a room instead of arriving
 *     with no space around it;
 *   - a little randomness in pitch, so a cue that fires repeatedly does not
 *     turn into a machine gun.
 *
 * The context is never created before a real user gesture: constructing one
 * earlier gets it suspended and logs a warning in Chrome, and a hover is not a
 * gesture. Until then every cue is silently dropped.
 */

interface Engine {
  ctx: AudioContext;
  /** Master volume, driven by the dock control. */
  master: GainNode;
  dry: GainNode;
  wet: GainNode;
  noise: AudioBuffer;
}

let engine: Engine | null = null;
let unlocked = false;
let volume = 0;

/** White noise, reused by every transient; half a second is plenty. */
function makeNoise(ctx: AudioContext): AudioBuffer {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.5), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/**
 * A small room, as an impulse response: decaying noise, different per channel
 * so the tail has width. The first few samples ramp in, which keeps the tail
 * behind the cue instead of smearing its attack.
 */
function makeRoom(ctx: AudioContext): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * 0.34);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      const t = i / length;
      data[i] = (Math.random() * 2 - 1) * (1 - t) ** 4.5 * Math.min(1, i / 48);
    }
  }
  return buffer;
}

function build(): Engine | null {
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;

  let ctx: AudioContext;
  try {
    ctx = new Ctor();
  } catch {
    return null;
  }

  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);

  const dry = ctx.createGain();
  dry.connect(master);

  const room = ctx.createConvolver();
  room.buffer = makeRoom(ctx);
  const wet = ctx.createGain();
  wet.gain.value = 0.9;
  wet.connect(room).connect(master);

  return { ctx, master, dry, wet, noise: makeNoise(ctx) };
}

function active(): Engine | null {
  if (!unlocked || volume <= 0) return null;
  engine ??= build();
  if (engine && engine.ctx.state === "suspended") void engine.ctx.resume();
  return engine;
}

/**
 * Called from the first pointer or key event anywhere on the page. Browsers
 * refuse to start an AudioContext outside a gesture, and a suspended one that
 * resumes late clips the cue it was resumed for.
 */
export function unlockAudio(): void {
  if (unlocked) return;
  unlocked = true;
  active();
}

export function setMasterVolume(next: number): void {
  volume = next;
  if (!engine) return;
  // A short ramp rather than a jump: stepping a gain instantly is an audible
  // click on anything still ringing.
  engine.master.gain.setTargetAtTime(next, engine.ctx.currentTime, 0.015);
}

// ── Voices ──────────────────────────────────────────────────────────────────

/** ±`spread` around 1, for detuning repeats so they do not sound stamped out. */
const vary = (spread: number) => 1 + (Math.random() * 2 - 1) * spread;

/**
 * One mode of a struck object: a sine that fades in over 2ms — instant enough
 * to read as a transient, slow enough not to click — then decays away.
 */
function partial(
  e: Engine,
  out: AudioNode,
  o: {
    at: number;
    freq: number;
    gain: number;
    decay: number;
    bendTo?: number;
    bendIn?: number;
  }
): void {
  const osc = e.ctx.createOscillator();
  osc.frequency.setValueAtTime(o.freq, o.at);
  if (o.bendTo) {
    osc.frequency.exponentialRampToValueAtTime(o.bendTo, o.at + (o.bendIn ?? o.decay));
  }

  const gain = e.ctx.createGain();
  gain.gain.setValueAtTime(0.0001, o.at);
  gain.gain.exponentialRampToValueAtTime(o.gain, o.at + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, o.at + o.decay);

  osc.connect(gain).connect(out);
  osc.start(o.at);
  osc.stop(o.at + o.decay + 0.02);
}

/** A filtered noise burst: the contact, the air, the texture. */
function noise(
  e: Engine,
  out: AudioNode,
  o: {
    at: number;
    gain: number;
    decay: number;
    freq: number;
    to?: number;
    q?: number;
    type?: BiquadFilterType;
    attack?: number;
  }
): void {
  const source = e.ctx.createBufferSource();
  source.buffer = e.noise;
  source.loop = true;

  const filter = e.ctx.createBiquadFilter();
  filter.type = o.type ?? "bandpass";
  filter.Q.value = o.q ?? 1;
  filter.frequency.setValueAtTime(o.freq, o.at);
  if (o.to) filter.frequency.exponentialRampToValueAtTime(o.to, o.at + o.decay);

  const gain = e.ctx.createGain();
  gain.gain.setValueAtTime(0.0001, o.at);
  gain.gain.exponentialRampToValueAtTime(o.gain, o.at + (o.attack ?? 0.003));
  gain.gain.exponentialRampToValueAtTime(0.0001, o.at + o.decay);

  source.connect(filter).connect(gain).connect(out);
  // A random offset into the buffer, so two hits never share the same noise.
  source.start(o.at, Math.random() * 0.4);
  source.stop(o.at + o.decay + 0.02);
}

/**
 * A per-cue output that splits into the dry path and the room, then takes
 * itself out of the graph once the cue has rung out.
 */
function tap(e: Engine, room: number, lifetime: number): GainNode {
  const out = e.ctx.createGain();
  out.connect(e.dry);
  if (room > 0) {
    const send = e.ctx.createGain();
    send.gain.value = room;
    out.connect(send).connect(e.wet);
  }
  window.setTimeout(() => out.disconnect(), (lifetime + 0.5) * 1000);
  return out;
}

// ── Cues ────────────────────────────────────────────────────────────────────

/**
 * Hover. Fires constantly, so it has to sit right at the edge of noticing:
 * a single narrow noise blip with a whisper of pitch on top.
 */
export function soundHover(): void {
  const e = active();
  if (!e) return;
  const t = e.ctx.currentTime;
  const out = tap(e, 0.08, 0.1);
  const freq = 2500 * vary(0.09);
  noise(e, out, { at: t, gain: 0.012, decay: 0.022, freq, q: 4.5 });
  partial(e, out, { at: t, freq: freq * 1.42, gain: 0.007, decay: 0.038 });
}

/** Press. The everyday click: a wooden knock with three modes. */
export function soundTap(): void {
  const e = active();
  if (!e) return;
  const t = e.ctx.currentTime;
  const out = tap(e, 0.16, 0.2);
  const base = 860 * vary(0.035);
  noise(e, out, { at: t, gain: 0.05, decay: 0.016, freq: 1500, type: "highpass" });
  partial(e, out, { at: t, freq: base, gain: 0.07, decay: 0.085 });
  partial(e, out, { at: t, freq: base * 2.02, gain: 0.026, decay: 0.045 });
  partial(e, out, { at: t, freq: base * 3.06, gain: 0.011, decay: 0.026 });
}

/** A visible state changed — the theme, the name behind the title. */
export function soundPop(): void {
  const e = active();
  if (!e) return;
  const t = e.ctx.currentTime;
  const out = tap(e, 0.3, 0.4);
  noise(e, out, { at: t, gain: 0.03, decay: 0.018, freq: 900, type: "highpass" });
  partial(e, out, { at: t, freq: 380, gain: 0.09, decay: 0.24, bendTo: 720, bendIn: 0.09 });
  partial(e, out, { at: t, freq: 762, gain: 0.03, decay: 0.13, bendTo: 1442, bendIn: 0.09 });
}

/** Sound switched on or off: two bells, up to confirm, down to dismiss. */
export function soundToggle(on: boolean): void {
  const e = active();
  if (!e) return;
  const t = e.ctx.currentTime;
  const out = tap(e, 0.28, 0.5);
  const notes = on ? [659.3, 987.8] : [880, 587.3];
  notes.forEach((freq, i) => {
    const at = t + i * 0.072;
    partial(e, out, { at, freq, gain: 0.075, decay: 0.2 });
    partial(e, out, { at, freq: freq * 2.01, gain: 0.02, decay: 0.1 });
  });
}

/**
 * One volume step. The pitch tracks the level, so the slider is audible as
 * well as visible — you can set it with your eyes shut.
 */
export function soundStep(level: number): void {
  const e = active();
  if (!e) return;
  const t = e.ctx.currentTime;
  const out = tap(e, 0.12, 0.15);
  const freq = 440 + level * 580;
  noise(e, out, { at: t, gain: 0.02, decay: 0.012, freq: 3200, type: "highpass" });
  partial(e, out, { at: t, freq, gain: 0.06, decay: 0.075 });
  partial(e, out, { at: t, freq: freq * 2, gain: 0.017, decay: 0.04 });
}

/** Something opened or closed, or the page flew back to the top. */
export function soundSweep(up: boolean): void {
  const e = active();
  if (!e) return;
  const t = e.ctx.currentTime;
  const out = tap(e, 0.22, 0.3);
  const [from, to] = up ? [480, 2300] : [2100, 430];
  noise(e, out, { at: t, gain: 0.03, decay: 0.17, freq: from, to, q: 1.3, attack: 0.05 });
  partial(e, out, {
    at: t,
    freq: up ? 620 : 1180,
    gain: 0.016,
    decay: 0.15,
    bendTo: up ? 1180 : 620,
    bendIn: 0.13,
  });
}

/**
 * The coin toss behind the portrait, in four acts, timed against the 2.2s
 * animation in `avatar-flip.tsx`:
 *
 *   0.00s  the flick — a struck coin, which is inharmonic. The ratios below
 *          are plate modes, and they are the whole reason it reads as metal
 *          where a harmonic series would just sound like a flute.
 *   0.00s  the flight — bandpassed air that brightens on the way up and
 *          darkens on the way down, tremolo'd by an oscillator whose rate
 *          decays from 30Hz to 4Hz. That tremolo is the coin spinning: it
 *          slows on exactly the curve the CSS easing slows on.
 *   2.05s  the landing — into a felt top hat, so the metal is damped: a low
 *          thud and a much shorter ring than the flick.
 *   2.21s  the reveal — three bells, because it lands on a magician's hat and
 *          a magic trick deserves its chord.
 */
let coinOut: GainNode | null = null;

export function soundCoin(short = false): void {
  const e = active();
  if (!e) return;
  const t = e.ctx.currentTime;

  // A second toss cancels the first, so two tosses never ring over each other.
  if (coinOut) {
    coinOut.gain.setTargetAtTime(0, t, 0.02);
    coinOut = null;
  }

  const out = tap(e, 0.34, short ? 0.6 : 3.2);
  coinOut = out;

  const base = 1720 * vary(0.025);
  const MODES = [1, 1.73, 2.76, 4.11, 5.4];

  MODES.forEach((mode, i) => {
    partial(e, out, {
      at: t,
      freq: base * mode,
      gain: 0.055 / (i + 1.4),
      decay: 0.5 / (i * 0.55 + 1),
    });
  });
  noise(e, out, { at: t, gain: 0.05, decay: 0.032, freq: 3200, type: "highpass" });

  // Reduced motion swaps the faces with no spin, so there is no flight to score.
  if (short) return;

  const FLIGHT = 1.95;
  const air = e.ctx.createBufferSource();
  air.buffer = e.noise;
  air.loop = true;

  const band = e.ctx.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 1.1;
  band.frequency.setValueAtTime(700, t);
  band.frequency.exponentialRampToValueAtTime(2300, t + 0.4);
  band.frequency.exponentialRampToValueAtTime(760, t + FLIGHT);

  const spinDepth = e.ctx.createGain();
  // The flutter is deep while the coin is a blur and shallow once you can
  // almost read it. Left at full depth the troughs reach silence, and the
  // second half of the flight drops out entirely.
  spinDepth.gain.setValueAtTime(0.45, t);
  spinDepth.gain.linearRampToValueAtTime(0.16, t + FLIGHT);
  const spin = e.ctx.createOscillator();
  spin.frequency.setValueAtTime(30, t);
  spin.frequency.exponentialRampToValueAtTime(4, t + FLIGHT);

  const tremolo = e.ctx.createGain();
  tremolo.gain.value = 0.55;
  spin.connect(spinDepth).connect(tremolo.gain);

  const envelope = e.ctx.createGain();
  envelope.gain.setValueAtTime(0.0001, t);
  envelope.gain.exponentialRampToValueAtTime(0.055, t + 0.22);
  // Only down to a third, not to nothing: the coin has to still be audibly
  // spinning as it comes back down, or the landing arrives out of nowhere.
  envelope.gain.exponentialRampToValueAtTime(0.02, t + FLIGHT);

  air.connect(band).connect(tremolo).connect(envelope).connect(out);
  air.start(t, Math.random() * 0.3);
  air.stop(t + FLIGHT + 0.02);
  spin.start(t);
  spin.stop(t + FLIGHT + 0.02);

  const land = t + 2.05;
  partial(e, out, { at: land, freq: 128, gain: 0.075, decay: 0.28 });
  partial(e, out, { at: land, freq: 196, gain: 0.028, decay: 0.16 });
  noise(e, out, { at: land, gain: 0.05, decay: 0.1, freq: 420, q: 0.7, type: "lowpass" });
  MODES.slice(0, 3).forEach((mode, i) => {
    partial(e, out, {
      at: land + 0.012,
      freq: base * 0.62 * mode,
      gain: 0.02 / (i + 1.6),
      decay: 0.22 / (i + 1),
    });
  });

  // G5 · B5 · E6 — an E minor triad, which lands warm rather than triumphant.
  [784, 987.8, 1318.5].forEach((freq, i) => {
    const at = land + 0.16 + i * 0.078;
    partial(e, out, { at, freq, gain: 0.05, decay: 0.66 });
    partial(e, out, { at, freq: freq * 2.005, gain: 0.013, decay: 0.34 });
    partial(e, out, { at, freq: freq * 3.01, gain: 0.005, decay: 0.18 });
  });
}
