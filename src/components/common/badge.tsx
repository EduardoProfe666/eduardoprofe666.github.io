import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // `focus:` never fired here — a <div> is not focusable — so the ring it asked
  // for was dead weight. Interactive badges are wrapped in a link, which the
  // page's own focus style already covers.
  "inline-flex select-none items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-[transform,background-color,color,box-shadow] duration-240 ease-state",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground elevate-1 hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground elevate-1 hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
