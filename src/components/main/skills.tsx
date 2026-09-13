"use client";

import { m } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { SKILL_ICONS } from "@/data/skill-icons.generated";
import { ALL_SKILLS, SKILL_GROUPS, type SkillGroupId } from "@/data/skills";
import { useTranslation } from "@/i18n/store";
import { feedbackFilter, feedbackNote, feedbackSkillHover } from "@/lib/feedback";
import { cn } from "@/lib/utils";

/**
 * How far the cursor's pull reaches, in pixels.
 *
 * Tiles sit about 105px apart. The profile this gives, squared:
 *
 *   under the cursor   1.00      two tiles out   0.09
 *   next to it         0.42      three out       0.01
 *   diagonal           0.26      beyond 300px    0
 *
 * Which is the point — at 200 only nine tiles moved and it read as one tile
 * reacting. At 300 about twenty-five are in play, each by a different amount,
 * and the grid deforms in a ring around the pointer instead.
 */
const REACH = 300;

/**
 * How close a tile has to be before it is the one you are on. An orthogonal
 * neighbour reaches 0.42, so this cannot be mistaken for one.
 */
const SOUNDS_AT = 0.55;

/**
 * The spring every tile rides, one per tile.
 *
 * Same family as the dock's, a little stiffer because these are chasing a
 * moving cursor rather than settling once. Damping sits just under critical
 * (zeta about 0.69), so a tile overshoots its mark by a hair and comes back —
 * which is the difference between a grid that responds and a grid that
 * computes.
 */
const STIFFNESS = 300;
const DAMPING = 24;

type Category = SkillGroupId | "all";

/**
 * Four notes taken from the tiles a category actually holds, spread across it
 * and sorted so the roll always rises — the indices climb in grid order but the
 * scale wraps every fifteen tiles, and without the sort a group straddling the
 * wrap would drop an octave in the middle of its own chord.
 */
function chordFor(category: Category): number[] {
  const members = ALL_SKILLS.reduce<number[]>((out, skill, index) => {
    if (category === "all" || skill.group === category) out.push(index);
    return out;
  }, []);
  if (members.length === 0) return [];
  const picks = [0, 0.34, 0.67, 1].map(
    (t) => members[Math.round(t * (members.length - 1))]
  );
  return [...new Set(picks)].sort((a, b) => (a % 15) - (b % 15));
}

const CATEGORIES: readonly Category[] = ["all", ...SKILL_GROUPS.map((g) => g.id)];

/** Spelled out rather than built from a template, so the keys are checked. */
const LABEL = {
  all: "skills.all",
  languages: "skills.group.languages",
  frontend: "skills.group.frontend",
  backend: "skills.group.backend",
  cloud: "skills.group.cloud",
  ai: "skills.group.ai",
} as const;

/**
 * The skills grid.
 *
 * Three things going on, and they are all the same idea — the grid should feel
 * like a surface with objects on it rather than a list of logos:
 *
 *   1. It deforms around the cursor. Every tile knows how far it is from the
 *      pointer and rises in proportion, so about twenty of them are in play at
 *      once and the grid dips into a ring rather than one tile popping.
 *      Measured once, then one layout read and a batch of writes per frame.
 *   2. Filtering dims instead of removing. Nothing reflows, nothing jumps, and
 *      you keep seeing the whole stack — the filter highlights a part of it
 *      rather than hiding the rest.
 *   3. It plays. Each tile is a note in C major pentatonic, climbing in reading
 *      order, so running across the grid plays a rising line and no two tiles
 *      can sound wrong together. Brushing past a tile strikes it softly and
 *      pressing it strikes it properly — the same instrument, two dynamics.
 */
export function Skills() {
  const { t, locale } = useTranslation();
  const [category, setCategory] = useState<Category>("all");
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const gridRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  /** Tile centres relative to the grid; only change on resize. */
  const geometry = useRef<{ el: HTMLElement; x: number; y: number }[]>([]);
  /** One spring per tile: where it is, how fast it is going, where it is headed. */
  const springs = useRef<{ at: number; v: number; to: number }[]>([]);
  const raf = useRef(0);
  const lastTime = useRef(0);
  /** True while the pointer is over the grid — keeps the loop alive when still. */
  const inside = useRef(false);
  /** Set by pointer movement, so targets are recomputed only when they changed. */
  const dirty = useRef(false);
  const pointer = useRef({ x: 0, y: 0 });
  /** Which tile the pointer is on, so the note fires once on arrival. */
  const sounding = useRef(-1);
  /** Read inside the loop, where the rendered `category` is not in scope. */
  const filter = useRef<Category>("all");
  const reduced = useRef(false);

  const measureTiles = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    geometry.current = [...grid.querySelectorAll<HTMLElement>("[data-skill]")].map(
      (el) => ({
        el,
        x: el.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + el.offsetHeight / 2,
      })
    );
    // Keep whatever each spring was already doing; a resize should not make the
    // grid flinch.
    springs.current = geometry.current.map(
      (_, i) => springs.current[i] ?? { at: 0, v: 0, to: 0 }
    );
  }, []);

  /**
   * Where every tile wants to be, given where the pointer is. Pure geometry —
   * the springs decide how fast anyone actually gets there.
   */
  const retarget = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const box = grid.getBoundingClientRect();
    const px = pointer.current.x - box.left;
    const py = pointer.current.y - box.top;

    let closest = -1;
    let best = 0;
    geometry.current.forEach((tile, index) => {
      const distance = Math.hypot(px - tile.x, py - tile.y);
      const raw = distance > REACH ? 0 : (1 - distance / REACH) ** 2;
      // Something you filtered out does not rise to meet you.
      const shown =
        filter.current === "all" || ALL_SKILLS[index]?.group === filter.current;
      springs.current[index].to = shown ? raw : 0;
      if (raw > best) {
        best = raw;
        closest = index;
      }
    });

    // The note fires off the target, not off the spring: you should hear the
    // tile the moment you cross into it, not once the animation has caught up.
    // Filtered-out tiles stay silent — they are not part of what you asked for.
    const muted =
      closest < 0 ||
      (filter.current !== "all" && ALL_SKILLS[closest]?.group !== filter.current);
    const on = best >= SOUNDS_AT && !muted ? closest : -1;
    if (on !== sounding.current) {
      sounding.current = on;
      if (on >= 0) feedbackSkillHover(on);
    }
  }, []);

  /**
   * The loop.
   *
   * It runs while the pointer is over the grid and keeps running afterwards
   * until every spring has stopped — which is the whole point. Mapping tiles
   * straight onto the cursor is exact and reads as machinery: there is no give
   * in it, and the instant you stop moving the events stop and everything
   * freezes mid-air. A spring has somewhere to be and takes its own time
   * getting there, so the grid keeps settling after your hand does.
   */
  const tick = useCallback(
    function tick(now: number) {
      // First frame after a pause has no meaningful delta, and a background tab
      // can hand back a whole second. Either would fire the springs across the
      // room.
      const dt = lastTime.current ? Math.min((now - lastTime.current) / 1000, 1 / 30) : 1 / 60;
      lastTime.current = now;

      if (dirty.current) {
        dirty.current = false;
        retarget();
      }

      let alive = false;
      for (let i = 0; i < springs.current.length; i++) {
        const s = springs.current[i];
        if (s.at === s.to && s.v === 0) continue;
        s.v += ((s.to - s.at) * STIFFNESS - s.v * DAMPING) * dt;
        s.at += s.v * dt;
        if (Math.abs(s.to - s.at) < 0.0015 && Math.abs(s.v) < 0.0015) {
          s.at = s.to;
          s.v = 0;
        } else {
          alive = true;
        }
        geometry.current[i]?.el.style.setProperty("--near", s.at.toFixed(4));
      }

      raf.current = alive || inside.current ? requestAnimationFrame(tick) : 0;
      if (!raf.current) lastTime.current = 0;
    },
    [retarget]
  );

  const start = useCallback(() => {
    if (raf.current) return;
    lastTime.current = 0;
    raf.current = requestAnimationFrame(tick);
  }, [tick]);

  /** Send everything home and let the loop carry it there. */
  const settle = useCallback(() => {
    inside.current = false;
    sounding.current = -1;
    for (const s of springs.current) s.to = 0;
    start();
  }, [start]);

  // A ref callback rather than an effect: it fires on mount and again whenever
  // the node changes, which is exactly when the geometry could be stale.
  const attachGrid = useCallback(
    (node: HTMLDivElement | null) => {
      gridRef.current = node;
      if (!node) return;
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      measureTiles();
      const observer = new ResizeObserver(measureTiles);
      observer.observe(node);
      // Scrolling never fires a pointer event, so the grid has to work out for
      // itself what just happened to it. If the cursor is still over the grid,
      // the grid moved underneath it and the ring should follow. If it is not,
      // the tiles were left lifted around a cursor that is no longer there.
      const onScroll = () => {
        if (!inside.current && !raf.current) return;
        const box = gridRef.current?.getBoundingClientRect();
        const { x, y } = pointer.current;
        const stillOver =
          box && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
        if (stillOver) {
          dirty.current = true;
          start();
        } else {
          settle();
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        if (raf.current) cancelAnimationFrame(raf.current);
        raf.current = 0;
      };
    },
    [measureTiles, settle, start]
  );

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || reduced.current) return;
      // The handler does almost nothing: record where the pointer is and note
      // that the targets are stale. The loop does the rest, on its own clock.
      pointer.current = { x: event.clientX, y: event.clientY };
      dirty.current = true;
      inside.current = true;
      start();
    },
    [start]
  );

  const handleLeave = settle;

  const pickCategory = useCallback((next: Category) => {
    setCategory(next);
    filter.current = next;
    sounding.current = -1;
    feedbackFilter(chordFor(next));
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-cat="${next}"]`);
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, []);

  // Keyed on the locale so the pill re-measures when the labels change width.
  const attachTabs = useCallback((node: HTMLDivElement | null) => {
    tabsRef.current = node;
    const el = node?.querySelector<HTMLElement>('[data-cat="all"]');
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Segmented control */}
      <div
        key={locale}
        ref={attachTabs}
        role="tablist"
        aria-label={t("skills.title")}
        className="relative -mx-1 flex snap-x gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <m.span
          aria-hidden="true"
          className="absolute inset-y-0 rounded-full bg-secondary"
          animate={{ x: pill.left, width: pill.width }}
          transition={{ type: "spring", stiffness: 480, damping: 34, mass: 0.7 }}
          style={{ left: 0 }}
        />
        {CATEGORIES.map((id) => {
          const active = id === category;
          return (
            <button
              key={id}
              data-cat={id}
              data-sfx="none"
              role="tab"
              aria-selected={active}
              onClick={() => pickCategory(id)}
              className={cn(
                "relative shrink-0 snap-start rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap",
                "transition-colors duration-240 ease-state",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(LABEL[id])}
            </button>
          );
        })}
      </div>

      {/* The grid */}
      <div
        ref={attachGrid}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="skill-grid relative grid grid-cols-4 gap-2 sm:grid-cols-6"
      >
        {ALL_SKILLS.map((skill, index) => {
          const icon = SKILL_ICONS[skill.slug];
          const name = skill.name ?? icon?.title ?? skill.slug;
          const dimmed = category !== "all" && skill.group !== category;
          return (
            <button
              key={skill.slug}
              data-skill=""
              data-sfx="none"
              type="button"
              aria-label={name}
              onClick={() => feedbackNote(index)}
              style={
                {
                  transitionDelay: `${Math.min(index, 12) * 12}ms`,
                  // Left unset for the monogram tiles, so the stylesheet's
                  // fallback takes over rather than resolving to nothing.
                  ...(icon && {
                    "--brand-light": icon.light,
                    "--brand-dark": icon.dark,
                  }),
                } as React.CSSProperties
              }
              className={cn(
                "skill-tile group/skill relative flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl",
                dimmed
                  ? "pointer-events-none opacity-25"
                  : "cursor-pointer opacity-100"
              )}
            >
              {icon ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="skill-mark size-6 sm:size-7"
                >
                  <path d={icon.path} />
                </svg>
              ) : (
                <span className="skill-mono text-sm font-bold tracking-tight">
                  {skill.mono}
                </span>
              )}
              {/* A monogram already says the name; repeating it underneath
                  gave the AWS tile "AWS" twice. */}
              {!skill.mono && (
                <span className="skill-name px-1 text-2xs leading-none">
                  {name}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
