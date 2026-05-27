import { Badge } from "@/components/ui/badge";
import { MotionSection } from "./motion-section";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  gradient?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  gradient = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {label && (
        <MotionSection delay={0}>
          <Badge variant="default">{label}</Badge>
        </MotionSection>
      )}
      <MotionSection delay={0.08}>
        <h2
          className={cn(
            "heading-lg max-w-3xl",
            gradient && "text-gradient"
          )}
        >
          {title}
        </h2>
      </MotionSection>
      {description && (
        <MotionSection delay={0.14}>
          <p
            className={cn(
              "body-lg max-w-2xl",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </MotionSection>
      )}
    </div>
  );
}
