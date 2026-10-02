import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/* Same buttons as www.cloudtechanalytics.com. */
type Variant = "primary" | "secondary" | "light" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[0.9375rem] font-semibold transition-colors duration-300 disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "min-h-12 px-6 py-3 bg-brass-button text-on-brass shadow-[0_1px_2px_rgba(23,23,23,0.12)] hover:bg-brass-button-hover",
  secondary: "min-h-12 px-6 py-3 border border-line-strong bg-paper text-ink hover:border-ink/40",
  // For always-dark sections, so fixed colours in both themes.
  light: "min-h-12 px-6 py-3 bg-cream text-night hover:bg-cream-deep",
  // Compact bordered button for toolbars.
  outline: "px-4 py-2 text-[0.875rem] border border-line-strong bg-paper text-ink hover:border-ink/40",
  ghost: "py-2 text-ink underline decoration-line-strong underline-offset-4 hover:text-brass-dark hover:decoration-brass",
};

export const buttonClass = (variant: Variant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`;

export function ButtonLink({ href, children, variant = "primary", arrow, className = "" }: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string }) {
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
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
