import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** The opening block of an inner page. */
export function PageIntro({ eyebrow, title, children, tone = "white" }: { eyebrow: string; title: ReactNode; children?: ReactNode; tone?: "white" | "navy" | "mist" }) {
  const navy = tone === "navy";
  return (
    <section className={navy ? "bg-navy text-white" : tone === "mist" ? "bg-mist" : "bg-white"}>
      <Reveal className="container-page py-16 sm:py-24">
        <p className={`eyebrow ${navy ? "text-gold!" : ""}`}>{eyebrow}</p>
        <span className="gold-rule mt-4" />
        <h1 className={`display mt-6 max-w-4xl text-[3rem] sm:text-[4.4rem] ${navy ? "text-white" : "text-navy"}`}>{title}</h1>
        {children && <div className={`mt-6 max-w-2xl text-[1.08rem] leading-relaxed ${navy ? "text-white/75" : "text-muted"}`}>{children}</div>}
      </Reveal>
    </section>
  );
}
