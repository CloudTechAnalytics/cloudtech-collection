import type { ReactNode } from "react";

/** Section title and intro, set as on www.cloudtechanalytics.com. */
export function SectionHeading({ title, intro, tone = "default", className = "" }: { title: ReactNode; intro?: ReactNode; tone?: "default" | "night"; className?: string }) {
  const night = tone === "night";
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 className={`font-serif text-[2.1rem] leading-[1.1] tracking-[-0.015em] sm:text-[2.6rem] lg:text-[3.1rem] ${night ? "text-cream" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 max-w-2xl text-[1.0625rem] leading-relaxed ${night ? "text-cream/70" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}
