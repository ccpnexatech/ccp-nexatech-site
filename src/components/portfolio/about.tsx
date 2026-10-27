"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { useLocale } from "next-intl";
import { PROFILE, langOf, pick } from "@/content/profile";
import { MotionSection } from "@/components/shared/motion-section";
import { Heading } from "./heading";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function About() {
  const lang = langOf(useLocale());
  return (
    <section id="sobre" className="section-padding">
      <div className="container-site">
        <Heading index="01" label={lang === "pt" ? "sobre mim" : "about me"} title={lang === "pt" ? "Do processo ao produto." : "From process to product."} />
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <MotionSection className="space-y-5">
            {PROFILE.about.map((p, i) => <p key={i} className="body-lg">{pick(p, lang)}</p>)}
            <p className="inline-block rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">{pick(PROFILE.availability, lang)}</p>
          </MotionSection>
          <div className="grid grid-cols-2 gap-4">
            {PROFILE.stats.map((s, i) => (
              <MotionSection key={i} delay={i * 0.08} className="surface-card rounded-3xl p-6 hover:-translate-y-1 transition-transform">
                <div className={`text-5xl font-extrabold ${i % 2 ? "text-accent-400" : "text-brand-400"}`}><Counter to={s.value} suffix={s.suffix} /></div>
                <p className="mt-2 text-sm text-slate-400">{pick(s.label, lang)}</p>
              </MotionSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
