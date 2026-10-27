"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: "primary" | "ghost"; size?: "sm" | "md" | "lg" };

export const Button = React.forwardRef<HTMLButtonElement, Props>(({ asChild, variant = "primary", size = "md", className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-50",
        variant === "primary" ? "bg-ink text-paper hover:bg-accent hover:text-accent-ink" : "border border-ink/25 text-ink hover:border-ink",
        size === "sm" ? "h-9 px-4 text-sm" : size === "lg" ? "h-12 px-7 text-base" : "h-11 px-6 text-sm",
        className,
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
