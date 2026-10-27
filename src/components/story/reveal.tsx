"use client";

import { motion } from "framer-motion";

/** Entrada editorial ao rolar. Com "reduzir movimento", o MotionConfig desliga a animação. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const M = as === "li" ? motion.li : motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}

export function SectionHead({ kicker, title, sub, id }: { kicker: string; title: string; sub?: string; id: string }) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="kicker">{kicker}</p>
      <h2 id={id} className="display mt-3 text-4xl md:text-6xl">{title}</h2>
      {sub && <p className="mt-4 max-w-prose2 text-lg text-muted">{sub}</p>}
    </Reveal>
  );
}
