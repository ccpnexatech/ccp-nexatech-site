import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => {
  const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");
  const errId = error ? `${inputId}-erro` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-semibold">{label}</label>}
      <input id={inputId} ref={ref} aria-invalid={!!error} aria-describedby={errId}
        className={cn("h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink placeholder:text-muted", error && "border-accent", className)} {...props} />
      {error && <span id={errId} className="text-sm text-accent">{error}</span>}
    </div>
  );
});
Input.displayName = "Input";
