/**
 * Garments drawn flat, front-lit, in their own 600 x 680 space. Each takes a palette so the same
 * shape serves the navy polo, the white tee and the Academy pieces.
 */
import { useId, type ReactNode } from "react";
import { GOLD, Lockup, Mark, PALETTES, Shade, type PaletteName } from "./parts";

const BODY =
  "M232 74 C204 86 176 96 146 108 L36 252 Q66 280 104 296 L160 236 C163 362 161 484 166 612 Q300 630 434 612 C439 484 437 362 440 236 L496 296 Q534 280 564 252 L454 108 C424 96 396 86 368 74 Q300 112 232 74 Z";

/** Fold and drape lines that make a flat garment read as fabric. */
function Drape({ dark }: { dark: boolean }) {
  const c = dark ? "#000" : "#5A6B80";
  return (
    <g fill="none" stroke={c} strokeLinecap="round">
      <path d="M190 300 C200 400 196 500 204 600" strokeOpacity={dark ? 0.22 : 0.1} strokeWidth="10" />
      <path d="M408 300 C400 420 404 520 396 602" strokeOpacity={dark ? 0.18 : 0.08} strokeWidth="12" />
      <path d="M300 420 C288 480 312 540 300 604" strokeOpacity={dark ? 0.1 : 0.05} strokeWidth="16" />
      <path d="M150 128 C170 170 166 210 160 236" strokeOpacity={dark ? 0.25 : 0.12} strokeWidth="6" />
      <path d="M450 128 C430 170 434 210 440 236" strokeOpacity={dark ? 0.25 : 0.12} strokeWidth="6" />
    </g>
  );
}

function Garment({ palette, texture, children, hem = true }: { palette: PaletteName; texture: "pique" | "jersey"; children?: ReactNode; hem?: boolean }) {
  const id = useId();
  const p = PALETTES[palette];
  const dark = palette !== "white" && palette !== "stone";
  return (
    <g filter="url(#soft-shadow)">
      <defs>
        <Shade id={`${id}-b`} p={p} />
        <linearGradient id={`${id}-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity={dark ? 0.06 : 0.3} />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity={dark ? 0.25 : 0.06} />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <path d={BODY} />
        </clipPath>
      </defs>
      <path d={BODY} fill={`url(#${id}-b)`} />
      <g clipPath={`url(#${id}-c)`}>
        <rect width="600" height="680" fill={`url(#${texture})`} />
        <rect width="600" height="680" fill={`url(#${id}-v)`} />
        <Drape dark={dark} />
        {hem && <path d="M164 592 Q300 610 436 592" fill="none" stroke={dark ? "#000" : "#8795A8"} strokeOpacity={dark ? 0.3 : 0.25} strokeWidth="2" strokeDasharray="5 4" />}
        {/* sleeve hems */}
        <path d="M48 238 L112 284" stroke={dark ? "#000" : "#8795A8"} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M552 238 L488 284" stroke={dark ? "#000" : "#8795A8"} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="5 4" />
      </g>
      {children}
    </g>
  );
}

/** Embroidered chest logo for the wearer's left (viewer's right). */
function ChestLogo({ palette, x = 352, y = 188, size = 30 }: { palette: PaletteName; x?: number; y?: number; size?: number }) {
  const p = PALETTES[palette];
  return <Lockup x={x} y={y} size={size} gold={p.mark} soft={p.markSoft} text={p.ink} stitched />;
}

export function Polo({ palette = "navy", view = "front", piping = true }: { palette?: PaletteName; view?: "front" | "back"; piping?: boolean }) {
  const p = PALETTES[palette];
  const dark = palette !== "white";
  const edge = dark ? "#000" : "#8795A8";
  if (view === "back")
    return (
      <Garment palette={palette} texture="pique">
        <path d="M232 74 Q300 92 368 74 L372 96 Q300 116 228 96 Z" fill={p.shade} />
        {piping && <path d="M230 96 Q300 116 370 96" fill="none" stroke={GOLD} strokeWidth="2.5" />}
        <Mark x={286} y={128} size={28} gold={p.mark} soft={p.markSoft} stitched />
      </Garment>
    );
  return (
    <Garment palette={palette} texture="pique">
      {/* back of the collar */}
      <path d="M232 74 Q300 96 368 74 L376 92 Q300 118 224 92 Z" fill={p.shade} />
      {/* placket */}
      <rect x="286" y="104" width="28" height="150" rx="3" fill={p.base} stroke={edge} strokeOpacity="0.35" />
      {[140, 186, 230].map((cy) => (
        <g key={cy}>
          <circle cx="300" cy={cy} r="5.5" fill={dark ? "#20456E" : "#F1F3F6"} stroke={edge} strokeOpacity="0.5" />
          <circle cx="298.5" cy={cy - 1} r="1" fill={edge} opacity="0.5" />
          <circle cx="301.5" cy={cy + 1} r="1" fill={edge} opacity="0.5" />
        </g>
      ))}
      {/* collar flaps */}
      <path d="M232 74 C250 96 276 112 300 112 L276 178 C252 150 230 118 218 90 Z" fill={p.light} stroke={edge} strokeOpacity="0.3" />
      <path d="M368 74 C350 96 324 112 300 112 L324 178 C348 150 370 118 382 90 Z" fill={p.base} stroke={edge} strokeOpacity="0.3" />
      {piping && (
        <g fill="none" stroke={GOLD} strokeWidth="2.5">
          <path d="M222 92 C234 120 254 152 276 176" />
          <path d="M378 92 C366 120 346 152 324 176" />
          <path d="M44 246 L108 290" />
          <path d="M556 246 L492 290" />
        </g>
      )}
      {/* ribbed cuffs */}
      <path d="M36 252 Q66 280 104 296 L112 284 Q74 268 48 238 Z" fill={p.shade} opacity="0.6" />
      <path d="M564 252 Q534 280 496 296 L488 284 Q526 268 552 238 Z" fill={p.shade} opacity="0.6" />
      <ChestLogo palette={palette} />
    </Garment>
  );
}

export function Tee({ palette = "white", view = "front", backText = "Data. Insights. Better Decisions.", sub }: { palette?: PaletteName; view?: "front" | "back"; backText?: string; sub?: string }) {
  const p = PALETTES[palette];
  const dark = palette !== "white" && palette !== "stone";
  if (view === "back")
    return (
      <Garment palette={palette} texture="jersey">
        <path d="M236 74 Q300 92 364 74" fill="none" stroke={dark ? "#000" : "#8795A8"} strokeOpacity="0.35" strokeWidth="7" />
        <Mark x={284} y={150} size={32} gold={p.mark} soft={p.markSoft} />
        <text x="300" y="232" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontWeight={600} fontSize="27" fill={p.ink}>
          {backText}
        </text>
        <line x1="268" y1="252" x2="332" y2="252" stroke={GOLD} strokeWidth="1.6" />
      </Garment>
    );
  return (
    <Garment palette={palette} texture="jersey">
      <path d="M232 74 Q300 112 368 74 L372 86 Q300 128 228 86 Z" fill={dark ? p.shade : "#E6EAF0"} />
      <path d="M228 86 Q300 128 372 86" fill="none" stroke={dark ? "#000" : "#8795A8"} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 3" />
      {sub ? (
        <g>
          <Mark x={276} y={170} size={48} gold={p.mark} soft={p.markSoft} />
          <text x="300" y="262" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={700} fontSize="25" letterSpacing="4" fill={p.ink}>
            {sub}
          </text>
          <text x="300" y="290" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="19" fill={GOLD}>
            Learn. Build. Prove It.
          </text>
        </g>
      ) : (
        <ChestLogo palette={palette} x={350} y={176} size={26} />
      )}
    </Garment>
  );
}

const HOODIE_BODY =
  "M226 92 C196 100 170 110 146 122 L52 382 Q80 402 116 408 L168 252 C170 380 168 500 172 640 Q300 660 428 640 C432 500 430 380 432 252 L484 408 Q520 402 548 382 L454 122 C430 110 404 100 374 92 Z";

export function Hoodie({ palette = "academy" }: { palette?: PaletteName }) {
  const id = useId();
  const p = PALETTES[palette];
  return (
    <g filter="url(#soft-shadow)">
      <defs>
        <Shade id={`${id}-b`} p={p} />
        <clipPath id={`${id}-c`}>
          <path d={HOODIE_BODY} />
        </clipPath>
      </defs>
      <path d={HOODIE_BODY} fill={`url(#${id}-b)`} />
      <g clipPath={`url(#${id}-c)`}>
        <rect width="600" height="700" fill="url(#jersey)" />
        <rect x="160" y="600" width="280" height="44" fill="#000" opacity="0.18" />
        <path d="M60 360 L120 392 M540 360 L480 392" stroke="#000" strokeOpacity="0.3" strokeWidth="16" />
        <Drape dark />
      </g>
      {/* hood */}
      <path d="M220 96 C214 40 252 8 300 8 C348 8 386 40 380 96 C356 128 244 128 220 96 Z" fill={p.shade} />
      <path d="M240 98 C238 54 266 30 300 30 C334 30 362 54 360 98 C340 116 260 116 240 98 Z" fill="#061426" opacity="0.65" />
      <path d="M286 112 L282 196 M314 112 L318 196" stroke={p.markSoft} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="282" cy="200" r="4" fill={GOLD} />
      <circle cx="318" cy="200" r="4" fill={GOLD} />
      {/* pocket */}
      <path d="M210 470 L390 470 L420 580 L180 580 Z" fill="#000" opacity="0.14" />
      <path d="M210 470 L390 470 L420 580 L180 580 Z" fill="none" stroke="#000" strokeOpacity="0.3" strokeDasharray="5 4" />
      <Mark x={276} y={238} size={48} gold={p.mark} soft={p.markSoft} />
      <text x="300" y="332" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={700} fontSize="25" letterSpacing="4" fill={p.ink}>
        DATA PEOPLE
      </text>
      <text x="300" y="362" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="19" fill={GOLD}>
        CloudTech Academy
      </text>
    </g>
  );
}

/** A close-up of the stitched chest logo on the fabric, filling a 800 x 1000 frame. */
export function EmbroideryDetail({ palette = "navy", text = "CloudTech" }: { palette?: PaletteName; text?: string }) {
  const id = useId();
  const p = PALETTES[palette];
  const dark = palette !== "white" && palette !== "stone";
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-f`} cx="40%" cy="35%" r="80%">
          <stop offset="0%" stopColor={p.light} />
          <stop offset="65%" stopColor={p.base} />
          <stop offset="100%" stopColor={p.shade} />
        </radialGradient>
        <pattern id={`${id}-weave`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.2" fill="#000" opacity={dark ? 0.16 : 0.07} />
          <circle cx="9" cy="9" r="2.2" fill="#fff" opacity={dark ? 0.05 : 0.5} />
        </pattern>
        <linearGradient id={`${id}-thread`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F1D79D" />
          <stop offset="50%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#8E6E33" />
        </linearGradient>
        <pattern id={`${id}-satin`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="10" height="10" fill={`url(#${id}-thread)`} />
          <line x1="0" y1="0" x2="0" y2="10" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="800" height="1000" fill={`url(#${id}-f)`} />
      <rect width="800" height="1000" fill={`url(#${id}-weave)`} />
      <path d="M-20 820 C200 760 520 900 820 800" fill="none" stroke="#000" strokeOpacity={dark ? 0.25 : 0.08} strokeWidth="60" />
      <g transform="translate(170 300) scale(0.68)" filter="url(#soft-shadow)">
        <rect width="170" height="170" rx="30" fill={`url(#${id}-satin)`} />
        <g fill={dark ? "#E9DFC9" : "#163A60"}>
          <rect x="256" width="170" height="170" rx="30" />
          <rect x="512" width="170" height="170" rx="30" />
          <rect y="256" width="170" height="170" rx="30" />
          <rect y="512" width="170" height="170" rx="30" />
          <rect x="256" y="256" width="426" height="426" rx="44" />
        </g>
        <g fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="4" strokeDasharray="10 7">
          <rect x="8" y="8" width="154" height="154" rx="24" />
          <rect x="264" y="264" width="410" height="410" rx="38" />
        </g>
      </g>
      <text x="400" y="830" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight={700} fontSize="92" fill={`url(#${id}-thread)`}>
        {text}
      </text>
    </g>
  );
}
