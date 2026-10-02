import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] px-6 py-3.5 text-[0.8rem] font-semibold tracking-[0.1em] uppercase transition-[background-color,color,border-color] duration-300 disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-2",
  gold: "bg-gold text-navy hover:bg-[#d4b273]",
  outline: "border border-navy/25 text-navy hover:border-navy",
  "outline-light": "border border-white/35 text-white hover:border-gold hover:text-gold",
  ghost: "px-0 py-1 text-navy hover:text-gold-deep",
};

export const buttonClass = (variant: Variant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </>
  );
  return /^https?:/.test(href) ? (
    <a href={href} className={buttonClass(variant, className)} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={buttonClass(variant, className)}>
      {inner}
    </Link>
  );
}
