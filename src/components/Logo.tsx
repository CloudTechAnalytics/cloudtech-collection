import { Mark } from "./mockups/parts";

/** CloudTech Collection lockup. `tone="light"` for navy backgrounds. */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const ink = tone === "light" ? "#FFFFFF" : "#071B33";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden>
        <Mark x={2} y={2} size={36} soft={tone === "light" ? "#E9DFC9" : "#0B2A4A"} />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.45rem] font-semibold tracking-[-0.01em]" style={{ color: ink }}>
          CloudTech
        </span>
        <span className="mt-0.5 text-[0.56rem] font-semibold tracking-[0.34em] text-gold">COLLECTION</span>
      </span>
    </span>
  );
}
