"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  m,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { createContext, useContext, useRef } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextValue | null>(null);

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

    return (
      <DockContext.Provider value={{ mouseX, magnification, distance }}>
        <m.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(dockVariants({ className }))}
        >
          {children}
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
  const fallbackMouseX = useMotionValue(Infinity);

  const mouseX = dock?.mouseX ?? fallbackMouseX;
  const magnification = dock?.magnification ?? DEFAULT_MAGNIFICATION;
  const distance = dock?.distance ?? DEFAULT_DISTANCE;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

    // Slightly heavier and better damped than the magicui default, which
  // overshoots twice before settling and reads as a wobble rather than as the
  // icons being pushed aside.
  const width = useSpring(widthSync, {
    mass: 0.18,
    stiffness: 170,
    damping: 18,
  });

  return (
    <m.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        // The press lands on the icon you actually touched: `:active` reaches
        // this wrapper from the button inside it.
        "transition-transform duration-200 ease-glide active:scale-[0.88] active:duration-100",
        className
      )}
    >
      {children}
    </m.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
