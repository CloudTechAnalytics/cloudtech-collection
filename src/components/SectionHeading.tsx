import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  light,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className={`eyebrow ${light ? "text-gold!" : ""}`}>{eyebrow}</p>}
      <span className={`gold-rule mt-4 ${align === "center" ? "mx-auto" : ""}`} />
      <h2 className={`display mt-5 text-[2.5rem] sm:text-[3.2rem] ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {children && <div className={`mt-5 text-[1.05rem] leading-relaxed ${light ? "text-white/75" : "text-muted"}`}>{children}</div>}
    </div>
  );
}
