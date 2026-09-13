"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AnimatePresence,
  m,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { feedbackArm, feedbackStep } from "@/lib/feedback";
import { EASE } from "@/lib/motion";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

/**
 * Resting icon width, by how much screen there is to spend.
 *
 * Nine icons and two separators at 40px came to 380px — wider than a 375px
 * phone, so the résumé button and the language switcher were already cut off
 * by the bezel before anyone touched anything. The tiers below fit the row on
 * every phone still in use, down to the 320pt ones.
 *
 * The buttons inside stay 48px and overflow their slot, so the touch targets
 * do not shrink with the icons — only the spacing between their centres does.
 */
const BASE_WIDTH = { wide: 40, roomy: 34, tight: 30 } as const;

/** How far a lifted icon grows and rises under a finger. */
const TOUCH_SCALE = 1.5;
const TOUCH_LIFT = 16;
/** Tighter than the mouse falloff: a fingertip is a blunter instrument. */
const TOUCH_DISTANCE = 90;

/** How long a finger stays put before the dock takes the gesture over. */
const HOLD_MS = 220;
/** Movement under this is still a press; over it, the visitor meant to scroll. */
const SLOP = 12;

const dockVariants = cva(
  "relative mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

interface DockContextValue {
  /** Cursor position. Drives width, which is what pushes neighbours aside. */
  mouseX: MotionValue<number>;
  /** Finger position. Drives transform only, so the dock never changes size. */
  touchX: MotionValue<number>;
  magnification: number;
  distance: number;
  baseWidth: number;
}

const DockContext = createContext<DockContextValue | null>(null);

/** Matches at build time as `false`, which is the narrow layout. */
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

interface Slot {
  center: number;
  label: string;
}

/**
 * The dock.
 *
 * Two magnifications, because a cursor and a thumb are not the same instrument.
 *
 * A mouse gets the macOS behaviour this component was written for: the icon
 * under the pointer grows in *width*, and its neighbours are pushed aside to
 * make room. That needs room to push into, which a desktop has.
 *
 * A phone does not. The same effect there grew the dock past the edges of the
 * screen and took the outermost icons with it — and because a tap also fires a
 * synthetic `mousemove` with no `mouseleave` after it, the dock stayed that way
 * until the page was reloaded. So touch magnifies with `transform` instead:
 * the icon under the finger lifts and scales, the layout never moves, and
 * nothing can be pushed out of view because nothing is pushed at all.
 *
 * Touch also gets a gesture rather than a tap. Hold still for a moment and the
 * dock says so — a sound and a buzz — then follows your finger along the row,
 * naming each icon as it passes, and activates whichever one you let go over.
 * A plain quick tap still works exactly as before; the hold is the addition,
 * not the toll.
 */
const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);
    const touchX = useMotionValue(Infinity);
    const wide = useMediaQuery("(min-width: 640px)");
    const roomy = useMediaQuery("(min-width: 360px)");
    const baseWidth = wide
      ? BASE_WIDTH.wide
      : roomy
        ? BASE_WIDTH.roomy
        : BASE_WIDTH.tight;

    const [armed, setArmed] = useState(false);
    const [label, setLabel] = useState("");
    const [labelX, setLabelX] = useState(0);

    const root = useRef<HTMLDivElement | null>(null);
    const hold = useRef<ReturnType<typeof setTimeout> | null>(null);
    const origin = useRef({ x: 0, y: 0 });
    const latest = useRef(0);
    const slots = useRef<Slot[]>([]);
    const focused = useRef(-1);
    const isArmed = useRef(false);

    const cancelHold = () => {
      if (hold.current) clearTimeout(hold.current);
      hold.current = null;
    };

    /**
     * Icon centres, measured once when the gesture starts.
     *
     * Safe to cache for the whole gesture precisely because touch magnifies
     * with a transform: the boxes these come from never move. Measuring rather
     * than hit-testing also keeps the focus honest — a lifted icon overlaps its
     * neighbours, so `elementFromPoint` would keep returning the one already
     * chosen and the row would feel sticky.
     */
    const measure = () => {
      const el = root.current;
      if (!el) return;
      const icons = [...el.querySelectorAll<HTMLElement>("[data-dock-icon]")];
      slots.current = icons
        .map((icon) => {
          const box = icon.getBoundingClientRect();
          const action = icon.querySelector<HTMLElement>("[aria-label]");
          return {
            width: box.width,
            center: box.left + box.width / 2,
            label: action?.getAttribute("aria-label") ?? "",
          };
        })
        // The ⌘K icon is display:none below `sm` and must not be a target.
        .filter((slot) => slot.width > 0)
        .map(({ center, label: name }) => ({ center, label: name }));
    };

    const focus = (x: number, silent = false) => {
      if (slots.current.length === 0) return;
      let best = 0;
      let nearest = Infinity;
      slots.current.forEach((slot, index) => {
        const d = Math.abs(x - slot.center);
        if (d < nearest) {
          nearest = d;
          best = index;
        }
      });
      if (best === focused.current) return;
      focused.current = best;
      const slot = slots.current[best];
      setLabel(slot.label);
      const box = root.current?.getBoundingClientRect();
      if (box) setLabelX(slot.center - box.left);
      if (silent) return;
      // Pitched by position, so the row reads left-to-right in the ear too.
      feedbackStep(
        slots.current.length > 1 ? best / (slots.current.length - 1) : 0
      );
    };

    const release = () => {
      cancelHold();
      isArmed.current = false;
      focused.current = -1;
      setArmed(false);
      touchX.set(Infinity);
    };

    const onPointerDown = (event: React.PointerEvent) => {
      if (event.pointerType === "mouse") return;
      origin.current = { x: event.clientX, y: event.clientY };
      latest.current = event.clientX;
      cancelHold();
      hold.current = setTimeout(() => {
        measure();
        if (slots.current.length === 0) return;
        isArmed.current = true;
        setArmed(true);
        touchX.set(latest.current);
        focused.current = -1;
        // The arm cue goes first and goes alone. Haptics are rate limited to
        // 40ms so two patterns cannot blur into one buzz, and the tick for the
        // icon the finger happens to be resting on was landing first and
        // swallowing the one announcement this gesture exists to make.
        feedbackArm();
        focus(latest.current, true);
      }, HOLD_MS);
    };

    const onPointerMove = (event: React.PointerEvent) => {
      // `clientX`, not `pageX`: the icon boxes below are measured in viewport
      // coordinates, and a dock wider than a narrow screen makes the document
      // horizontally scrollable, at which point the two stop agreeing.
      if (event.pointerType === "mouse") {
        mouseX.set(event.clientX);
        return;
      }
      latest.current = event.clientX;
      if (isArmed.current) {
        touchX.set(event.clientX);
        focus(event.clientX);
        return;
      }
      const dx = event.clientX - origin.current.x;
      const dy = event.clientY - origin.current.y;
      if (Math.hypot(dx, dy) > SLOP) cancelHold();
    };

    const onPointerUp = (event: React.PointerEvent) => {
      if (event.pointerType === "mouse") return;
      if (isArmed.current) {
        const under = document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest<HTMLElement>("[data-dock-icon]");
        const started = (event.target as Element | null)?.closest?.(
          "[data-dock-icon]"
        );
        // Letting go over a different icon than the one first touched fires no
        // native click on either — the browser targets their common ancestor —
        // so that is the only case this has to activate by hand.
        if (under && under !== started) {
          under.querySelector<HTMLElement>("a[href], button")?.click();
        }
      }
      release();
    };

    return (
      <DockContext.Provider
        value={{ mouseX, touchX, magnification, distance, baseWidth }}
      >
        <m.div
          ref={(node) => {
            root.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          onPointerMove={onPointerMove}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") mouseX.set(Infinity);
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={release}
          // A long press is a text-selection gesture and a context-menu gesture
          // before it is ours; both have to be turned off or the row is fighting
          // a callout bubble halfway through the hold.
          onContextMenu={(event) => {
            if (isArmed.current) event.preventDefault();
          }}
          data-armed={armed ? "" : undefined}
          className={cn(
            dockVariants({ className }),
            "select-none touch-none [-webkit-touch-callout:none]"
          )}
        >
          {children}
          {/* The name of whatever the finger is over. Icons are not labels, and
              a gesture that activates on release has to say what it is about to
              activate while there is still time to slide off it. */}
          <AnimatePresence>
            {armed && label && (
              <div
                aria-hidden="true"
                data-dock-label=""
                className="pointer-events-none absolute bottom-full left-0 mb-3"
                style={{ transform: `translateX(${labelX}px)` }}
              >
                <m.span
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.24, ease: EASE.state }}
                  className="block -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground elevate-2"
                >
                  {label}
                </m.span>
              </div>
            )}
          </AnimatePresence>
        </m.div>
      </DockContext.Provider>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dock = useContext(DockContext);
  const idle = useMotionValue(Infinity);

  const mouseX = dock?.mouseX ?? idle;
  const touchX = dock?.touchX ?? idle;
  const magnification = dock?.magnification ?? DEFAULT_MAGNIFICATION;
  const distance = dock?.distance ?? DEFAULT_DISTANCE;
  const baseWidth = dock?.baseWidth ?? BASE_WIDTH.wide;

  const offset = (pointer: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return pointer - bounds.x - bounds.width / 2;
  };

  // Slightly heavier and better damped than the magicui default, which
  // overshoots twice before settling and reads as a wobble rather than as the
  // icons being pushed aside.
  const spring = { mass: 0.18, stiffness: 170, damping: 18 };

  const mouseOffset = useTransform(mouseX, offset);
  const width = useSpring(
    useTransform(
      mouseOffset,
      [-distance, 0, distance],
      [baseWidth, magnification, baseWidth]
    ),
    spring
  );

  const touchOffset = useTransform(touchX, offset);
  const scale = useSpring(
    useTransform(
      touchOffset,
      [-TOUCH_DISTANCE, 0, TOUCH_DISTANCE],
      [1, TOUCH_SCALE, 1]
    ),
    spring
  );
  const lift = useSpring(
    useTransform(
      touchOffset,
      [-TOUCH_DISTANCE, 0, TOUCH_DISTANCE],
      [0, -TOUCH_LIFT, 0]
    ),
    spring
  );

  return (
    <m.div
      ref={ref}
      data-dock-icon=""
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        // The press lands on the icon you actually touched: `:active` reaches
        // this wrapper from the button inside it.
        "transition-transform duration-240 ease-state active:scale-[0.88] active:duration-100",
        className
      )}
    >
      {/* The lift lives on its own element so that `active:scale` above keeps
          working: framer writes `transform` inline, and an inline transform
          beats the class that would otherwise shrink the icon on press. */}
      <m.span
        style={{ scale, y: lift }}
        className="flex origin-bottom items-center justify-center"
      >
        {children}
      </m.span>
    </m.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
