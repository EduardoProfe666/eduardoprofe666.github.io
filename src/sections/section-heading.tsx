import type { ReactNode } from "react";

/** The `#` that slides out on hover, shared by every section title. */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="group/heading relative w-fit cursor-default text-balance text-xl font-bold tracking-tight">
      <span className="inline-flex items-center">
        <span className="inline-block w-0 select-none overflow-hidden font-mono text-lg text-muted-foreground opacity-0 transition-all duration-400 ease-spring group-hover/heading:w-[1.2em] group-hover/heading:opacity-60">
          #
        </span>
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 origin-left rounded-full bg-foreground/25 transition-[width] duration-240 ease-state group-hover/heading:w-full" />
    </h2>
  );
}
