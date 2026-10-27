import { MotionSection } from "@/components/shared/motion-section";

export function Heading({ index, label, title, sub }: { index: string; label: string; title: string; sub?: string }) {
  return (
    <MotionSection className="mb-12 max-w-3xl">
      <p className="mb-3 font-mono text-sm text-accent-400">
        <span className="text-slate-600">{index} ·</span> {label}
      </p>
      <h2 className="heading-lg text-slate-100">{title}</h2>
      {sub ? <p className="body-md mt-4">{sub}</p> : null}
    </MotionSection>
  );
}
