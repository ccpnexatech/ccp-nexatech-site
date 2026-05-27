import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-brand-600/15 text-brand-300 border border-brand-500/25 rounded-full px-3 py-1 text-xs",
        accent:
          "bg-accent-500/15 text-accent-300 border border-accent-500/25 rounded-full px-3 py-1 text-xs",
        surface:
          "bg-surface-700/80 text-slate-300 border border-surface-500/40 rounded-full px-3 py-1 text-xs",
        outline:
          "border border-surface-500/60 text-slate-400 rounded-full px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
