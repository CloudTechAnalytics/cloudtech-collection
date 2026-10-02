/**
 * Shared pieces for the product mockups: the CloudTech mark, the wordmark, and colour palettes.
 * Everything is plain SVG so it renders on the server, stays sharp at any size, and can be
 * replaced by a real product photo per image (see src/data/products.ts).
 */
import type { ReactNode } from "react";

export const NAVY = "#071B33";
export const NAVY_2 = "#0B2A4A";
export const GOLD = "#C6A15B";
export const GOLD_DEEP = "#9A7A3C";
export const GOLD_LIGHT = "#E2C68A";
export const CREAM = "#EDE3CC";

/** Fabric / material palette: base, shadow, highlight. */
export type Palette = { base: string; shade: string; light: string; ink: string; mark: string; markSoft: string };

export const PALETTES = {
  navy: { base: "#0E2E52", shade: "#061629", light: "#1C4673", ink: "#F3ECDC", mark: GOLD, markSoft: "#E9DFC9" },
  white: { base: "#FBFBFC", shade: "#D9DEE6", light: "#FFFFFF", ink: NAVY, mark: GOLD, markSoft: NAVY_2 },
  academy: { base: "#16416E", shade: "#0A2341", light: "#2A5B8E", ink: "#F6EFE0", mark: GOLD, markSoft: "#F6EFE0" },
  stone: { base: "#EEE7D8", shade: "#CFC4AE", light: "#F8F3E8", ink: NAVY, mark: GOLD, markSoft: NAVY_2 },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof PALETTES;

/**
 * The CloudTech mark: one gold square and a corner of four, drawn at `size` (width) with its top
 * left at (x, y). `stitched` adds an embroidery edge.
 */
export function Mark({
  x,
  y,
  size,
  gold = GOLD,
  soft = "#E9DFC9",
  stitched = false,
  opacity = 1,
}: {
  x: number;
  y: number;
  size: number;
  gold?: string;
  soft?: string;
  stitched?: boolean;
  opacity?: number;
}) {
  const s = size / 682; // the mark is drawn on a 682 x 682 grid
  const stroke = stitched ? { stroke: "#00000033", strokeWidth: 10, strokeDasharray: "14 10" } : {};
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <rect width="170" height="170" rx="30" fill={gold} {...stroke} />
      <g fill={soft} {...stroke}>
        <rect x="256" width="170" height="170" rx="30" />
        <rect x="512" width="170" height="170" rx="30" />
        <rect y="256" width="170" height="170" rx="30" />
        <rect y="512" width="170" height="170" rx="30" />
        <rect x="256" y="256" width="426" height="426" rx="44" />
      </g>
    </g>
  );
}

/** "CloudTech" with "ANALYTICS" (or another line) underneath, left-aligned at (x, y = baseline of the first line). */
export function Wordmark({
  x,
  y,
  size,
  color,
  sub = "ANALYTICS",
  subColor,
  anchor = "start",
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  sub?: string;
  subColor?: string;
  anchor?: "start" | "middle";
}) {
  return (
    <g>
      <text x={x} y={y} textAnchor={anchor} fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight={700} fontSize={size} fill={color} letterSpacing={-0.01 * size}>
        CloudTech
      </text>
      {sub && (
        <text
          x={anchor === "middle" ? x : x + size * 0.04}
          y={y + size * 0.62}
          textAnchor={anchor}
          fontFamily="Inter, Arial, sans-serif"
          fontWeight={600}
          fontSize={size * 0.32}
          fill={subColor ?? color}
          letterSpacing={size * 0.14}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** Mark beside a wordmark, as on a chest logo or a cover. */
export function Lockup({ x, y, size, gold = GOLD, soft, text, sub = "ANALYTICS", stitched }: { x: number; y: number; size: number; gold?: string; soft: string; text: string; sub?: string; stitched?: boolean }) {
  return (
    <g>
      <Mark x={x} y={y} size={size} gold={gold} soft={soft} stitched={stitched} />
      <Wordmark x={x + size * 1.22} y={y + size * 0.58} size={size * 0.68} color={text} sub={sub} subColor={gold} />
    </g>
  );
}

/** Light studio backdrop with a soft floor shadow, in a 4:5 frame by default. */
export function Studio({
  children,
  width = 800,
  height = 1000,
  tone = "light",
  label,
  className,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
  tone?: "light" | "warm" | "navy";
  label: string;
  className?: string;
}) {
  const id = `st-${tone}-${width}-${height}`;
  const bg =
    tone === "navy" ? ["#0D2B4C", "#061426"] : tone === "warm" ? ["#FBF8F2", "#ECE5D6"] : ["#FFFFFF", "#E7EBF1"];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor={bg[0]} />
          <stop offset="100%" stopColor={bg[1]} />
        </radialGradient>
        <radialGradient id="floor-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B1B2E" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#0B1B2E" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0B1B2E" stopOpacity="0" />
        </radialGradient>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
          <feOffset dy="18" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.22" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="pique" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.8" cy="1.8" r="1.1" fill="#000" opacity="0.09" />
          <circle cx="5.3" cy="5.3" r="1.1" fill="#fff" opacity="0.05" />
        </pattern>
        <pattern id="jersey" width="4" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 0 L2 6 L4 0" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="0.8" />
        </pattern>
        <pattern id="leather" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r="1.4" fill="#000" opacity="0.12" />
          <circle cx="6.5" cy="7" r="1" fill="#fff" opacity="0.04" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${id}-bg)`} />
      {children}
    </svg>
  );
}

export const FloorShadow = ({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) => <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#floor-shadow)" />;

/** Horizontal light: dark at the edges, bright just left of centre, like a softbox from the front left. */
export function Shade({ id, p, vertical = false }: { id: string; p: Palette; vertical?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
      <stop offset="0%" stopColor={p.shade} />
      <stop offset="18%" stopColor={p.base} />
      <stop offset="42%" stopColor={p.light} />
      <stop offset="70%" stopColor={p.base} />
      <stop offset="100%" stopColor={p.shade} />
    </linearGradient>
  );
}
