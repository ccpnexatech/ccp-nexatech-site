"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white hover:bg-brand-500 active:bg-brand-700 shadow-lg shadow-brand-600/20 hover:shadow-brand-500/30",
        secondary:
          "bg-surface-700 text-slate-100 border border-surface-500/60 hover:bg-surface-600 hover:border-surface-400/60",
        accent:
          "bg-accent-500 text-white hover:bg-accent-400 active:bg-accent-600 shadow-lg shadow-accent-500/20",
        ghost:
          "text-slate-300 hover:text-slate-100 hover:bg-surface-700/60",
        outline:
          "border border-brand-500/40 text-brand-300 hover:bg-brand-600/10 hover:border-brand-400/60",
        link:
          "text-brand-400 underline-offset-4 hover:underline hover:text-brand-300 p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-xl",
        md: "h-11 px-6 text-sm rounded-xl",
        lg: "h-12 px-8 text-base rounded-2xl",
        xl: "h-14 px-10 text-base rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
