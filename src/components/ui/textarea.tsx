import * as React from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-slate-300"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "min-h-32 w-full rounded-xl border border-surface-600/60 bg-surface-800/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 resize-y",
            "transition-all duration-200",
            "focus:outline-none focus:border-brand-500/60 focus:bg-surface-700/60 focus:ring-2 focus:ring-brand-500/20",
            error && "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-400">{error}</span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
