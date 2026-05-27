import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-300"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 w-full rounded-xl border border-surface-600/60 bg-surface-800/60 px-4 text-sm text-slate-100 placeholder:text-slate-500",
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
Input.displayName = "Input";

export { Input };
