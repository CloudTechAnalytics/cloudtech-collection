/**
 * The CloudTech logo, drawn exactly as public/brand/cloudtech-logo.svg on the main website:
 * one gold square (#C9A45C) and four light squares (#E4DACA, or #F8F5EF reversed on dark),
 * "CloudTech" in Playfair Display and a spaced line beneath in gold.
 */
export function Mark({ size = 32, tone = "light", className = "" }: { size?: number; tone?: "light" | "dark"; className?: string }) {
  const soft = tone === "dark" ? "#F8F5EF" : "#E4DACA";
  return (
    <svg viewBox="0 0 682 682" width={size} height={size} className={`shrink-0 ${className}`} aria-hidden>
      <rect width="170" height="170" rx="30" fill="#C9A45C" />
      <g fill={soft}>
        <rect x="256" width="170" height="170" rx="30" />
        <rect x="512" width="170" height="170" rx="30" />
        <rect y="256" width="170" height="170" rx="30" />
        <rect y="512" width="170" height="170" rx="30" />
        <rect x="256" y="256" width="426" height="426" rx="44" />
      </g>
    </svg>
  );
}

/** Mark + "CloudTech" + a spaced sub-line (COLLECTION by default). */
export function Logo({ tone = "light", sub = "COLLECTION", size = 34, className = "" }: { tone?: "light" | "dark"; sub?: string; size?: number; className?: string }) {
  const ink = tone === "dark" ? "#FFFFFF" : "#171717";
  const gold = tone === "dark" ? "#C9A45C" : "#8C6A2C";
  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap: size * 0.34 }}>
      <Mark size={size} tone={tone} />
      <span className="flex flex-col" style={{ lineHeight: 1 }}>
        <span className="font-logo font-bold tracking-[-0.01em]" style={{ color: ink, fontSize: size * 0.6 }}>
          CloudTech
        </span>
        <span className="font-semibold uppercase" style={{ color: gold, fontSize: size * 0.21, letterSpacing: "0.42em", marginTop: size * 0.1, marginLeft: size * 0.02 }}>
          {sub}
        </span>
      </span>
    </span>
  );
}
