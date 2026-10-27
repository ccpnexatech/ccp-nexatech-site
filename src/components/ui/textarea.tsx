import * as React from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; error?: string }

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, error, id, ...props }, ref) => {
  const tid = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");
  const errId = error ? `${tid}-erro` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={tid} className="text-sm font-semibold">{label}</label>}
      <textarea id={tid} ref={ref} aria-invalid={!!error} aria-describedby={errId}
        className={cn("w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted", error && "border-accent", className)} {...props} />
      {error && <span id={errId} className="text-sm text-accent">{error}</span>}
    </div>
  );
});
Textarea.displayName = "Textarea";
