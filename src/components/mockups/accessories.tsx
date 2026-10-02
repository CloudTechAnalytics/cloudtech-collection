/** Accessories, each drawn in its own local space with its top-left at (0, 0). */
import { useId, type ReactNode } from "react";
import { CREAM, GOLD, GOLD_DEEP, GOLD_LIGHT, Lockup, Mark, NAVY, PALETTES, Wordmark, type PaletteName } from "./parts";

const goldStops = (
  <>
    <stop offset="0%" stopColor="#8E6E33" />
    <stop offset="35%" stopColor={GOLD_LIGHT} />
    <stop offset="60%" stopColor={GOLD} />
    <stop offset="100%" stopColor="#7A5C24" />
  </>
);

/** Structured six-panel cap, 600 x 420, seen from the front or the side. */
export function Cap({ view = "front", palette = "navy" }: { view?: "front" | "side"; palette?: PaletteName }) {
  const id = useId();
  const p = PALETTES[palette];
  if (view === "side")
    return (
      <g filter="url(#soft-shadow)">
        <defs>
          <radialGradient id={`${id}-c`} cx="40%" cy="30%" r="80%">
            <stop offset="0%" stopColor={p.light} />
            <stop offset="70%" stopColor={p.base} />
            <stop offset="100%" stopColor={p.shade} />
          </radialGradient>
        </defs>
        <path d="M120 300 C110 150 200 70 320 70 C430 70 500 160 492 300 Z" fill={`url(#${id}-c)`} />
        <path d="M480 286 C540 290 600 310 600 330 C560 344 500 336 470 318 Z" fill={p.shade} />
        <path d="M300 72 C330 140 340 230 330 300" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M200 100 C220 160 220 240 210 300" fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="5 4" />
        <circle cx="318" cy="70" r="9" fill={p.base} stroke="#000" strokeOpacity="0.3" />
        <circle cx="400" cy="140" r="5" fill={p.shade} />
        <path d="M120 290 C150 280 190 280 210 296 L208 312 C180 300 150 302 122 312 Z" fill={GOLD} opacity="0.9" />
        <rect x="150" y="286" width="24" height="18" rx="3" fill={GOLD_DEEP} />
        <Mark x={360} y={200} size={60} gold={p.mark} soft={p.markSoft} stitched />
      </g>
    );
  return (
    <g filter="url(#soft-shadow)">
      <defs>
        <radialGradient id={`${id}-c`} cx="45%" cy="30%" r="75%">
          <stop offset="0%" stopColor={p.light} />
          <stop offset="65%" stopColor={p.base} />
          <stop offset="100%" stopColor={p.shade} />
        </radialGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.shade} />
          <stop offset="40%" stopColor={p.light} />
          <stop offset="75%" stopColor={p.base} />
          <stop offset="100%" stopColor={p.shade} />
        </linearGradient>
      </defs>
      <path d="M96 300 C96 178 186 104 300 104 C414 104 504 178 504 300 Z" fill={`url(#${id}-c)`} />
      <g fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="2" strokeDasharray="5 4">
        <path d="M300 106 C300 170 300 240 300 300" />
        <path d="M296 108 C232 150 204 220 198 300" />
        <path d="M304 108 C368 150 396 220 402 300" />
      </g>
      <circle cx="300" cy="104" r="10" fill={p.base} stroke="#000" strokeOpacity="0.35" />
      {[218, 382].map((cx) => (
        <circle key={cx} cx={cx} cy={176} r="5" fill={p.shade} stroke={GOLD} strokeOpacity="0.6" />
      ))}
      <Mark x={260} y={178} size={80} gold={p.mark} soft={p.markSoft} stitched />
      {/* peaked brim pointing at the camera, seen from slightly above */}
      <path d="M90 292 Q300 318 510 292 Q500 390 300 452 Q100 390 90 292 Z" fill={`url(#${id}-b)`} />
      <path d="M90 292 Q300 318 510 292 Q508 312 498 326 Q300 350 102 326 Q92 312 90 292 Z" fill="#000" opacity="0.3" />
      <path d="M118 360 Q300 420 482 360" fill="none" stroke="#000" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="5 4" />
      <path d="M100 340 Q140 400 300 446 Q460 400 500 340" fill="none" stroke={GOLD} strokeWidth="2.5" opacity="0.85" />
    </g>
  );
}

/** Hardcover journal, 400 x 520 (front) or an open spread, 760 x 520. */
export function Journal({ view = "front", palette = "navy", lines = ["Ideas.", "Analysis.", "Impact."], sub = "ANALYTICS" }: { view?: "front" | "open"; palette?: PaletteName; lines?: string[]; sub?: string }) {
  const id = useId();
  const p = PALETTES[palette];
  if (view === "open")
    return (
      <g filter="url(#soft-shadow)">
        <defs>
          <linearGradient id={`${id}-pl`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F7F2E6" />
            <stop offset="88%" stopColor="#F3ECDC" />
            <stop offset="100%" stopColor="#D9CFB9" />
          </linearGradient>
          <linearGradient id={`${id}-pr`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D9CFB9" />
            <stop offset="12%" stopColor="#F3ECDC" />
            <stop offset="100%" stopColor="#F7F2E6" />
          </linearGradient>
          <pattern id={`${id}-dots`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.3" fill="#9AA6B5" opacity="0.6" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="760" height="520" rx="14" fill={p.shade} />
        <rect x="14" y="12" width="366" height="496" rx="6" fill={`url(#${id}-pl)`} />
        <rect x="380" y="12" width="366" height="496" rx="6" fill={`url(#${id}-pr)`} />
        <rect x="44" y="50" width="306" height="420" fill={`url(#${id}-dots)`} />
        <rect x="410" y="50" width="306" height="420" fill={`url(#${id}-dots)`} />
        <Mark x={420} y={40} size={22} gold={GOLD} soft={NAVY} opacity={0.9} />
        <text x="60" y="110" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="26" fill={NAVY} opacity="0.85">
          Q3 review: what changed?
        </text>
        <path d="M60 140 C120 150 200 132 300 142" stroke={NAVY} strokeOpacity="0.5" strokeWidth="1.6" fill="none" />
        {/* elastic band and ribbon */}
        <rect x="700" y="0" width="12" height="520" fill={GOLD} />
        <path d="M376 0 L384 0 L392 560 L372 572 L368 560 Z" fill={GOLD_DEEP} />
      </g>
    );
  return (
    <g filter="url(#soft-shadow)">
      <defs>
        <linearGradient id={`${id}-cv`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.light} />
          <stop offset="55%" stopColor={p.base} />
          <stop offset="100%" stopColor={p.shade} />
        </linearGradient>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          {goldStops}
        </linearGradient>
      </defs>
      {/* page block showing at the right edge */}
      <rect x="18" y="10" width="384" height="504" rx="10" fill="#E9E1CF" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1="396" y1={22 + i * 62} x2="400" y2={22 + i * 62} stroke="#C8BDA5" />
      ))}
      <rect x="0" y="0" width="390" height="510" rx="12" fill={`url(#${id}-cv)`} />
      <rect x="0" y="0" width="390" height="510" rx="12" fill="url(#leather)" />
      <rect x="0" y="0" width="26" height="510" rx="10" fill="#000" opacity="0.22" />
      <line x1="30" y1="6" x2="30" y2="504" stroke="#fff" strokeOpacity="0.07" strokeWidth="2" />
      {/* debossed gold foil */}
      <Mark x={70} y={78} size={52} gold={`url(#${id}-g)`} soft={`url(#${id}-g)`} />
      <Wordmark x={70} y={182} size={34} color={`url(#${id}-g)`} sub={sub} />
      <line x1="70" y1="238" x2="128" y2="238" stroke={GOLD} strokeWidth="1.5" />
      {lines.map((l, i) => (
        <text key={l} x="70" y={322 + i * 46} fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="40" fontWeight={500} fill={`url(#${id}-g)`}>
          {l}
        </text>
      ))}
      {/* elastic band */}
      <rect x="330" y="0" width="13" height="510" fill={`url(#${id}-g)`} />
      <rect x="330" y="0" width="13" height="510" fill="#000" opacity="0.08" />
      {/* ribbon marker */}
      <path d="M190 506 L206 506 L210 570 L198 560 L186 572 Z" fill={GOLD_DEEP} />
    </g>
  );
}

/** Executive pen, drawn horizontally in 640 x 80, rotated by the caller. */
export function Pen() {
  const id = useId();
  return (
    <g filter="url(#soft-shadow)">
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2B5583" />
          <stop offset="30%" stopColor="#5D84AE" />
          <stop offset="55%" stopColor="#0E2E52" />
          <stop offset="100%" stopColor="#041020" />
        </linearGradient>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          {goldStops}
        </linearGradient>
      </defs>
      <path d="M40 30 L80 22 L80 58 L40 50 Z" fill={`url(#${id}-g)`} />
      <path d="M0 40 L40 30 L40 50 Z" fill="#3B3B3B" />
      <rect x="80" y="18" width="250" height="44" rx="6" fill={`url(#${id}-b)`} />
      <rect x="330" y="16" width="14" height="48" rx="3" fill={`url(#${id}-g)`} />
      <rect x="344" y="16" width="270" height="48" rx="22" fill={`url(#${id}-b)`} />
      <rect x="604" y="22" width="30" height="36" rx="14" fill={`url(#${id}-g)`} />
      {/* clip */}
      <path d="M400 10 L590 10 C600 10 604 16 604 22 L604 26 L410 26 C402 26 398 18 400 10 Z" fill={`url(#${id}-g)`} />
      <text x="200" y="46" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="12" fontWeight={600} letterSpacing="4" fill={GOLD} opacity="0.9">
        CLOUDTECH
      </text>
      <Mark x={128} y={33} size={14} gold={GOLD} soft="#CBB993" opacity={0.9} />
    </g>
  );
}

/** Matte vacuum bottle, 220 x 640. */
export function Bottle({ palette = "navy" }: { palette?: PaletteName }) {
  const id = useId();
  const p = PALETTES[palette];
  return (
    <g filter="url(#soft-shadow)">
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.shade} />
          <stop offset="22%" stopColor={p.light} />
          <stop offset="34%" stopColor={p.base} />
          <stop offset="82%" stopColor={p.shade} />
          <stop offset="100%" stopColor="#020A14" />
        </linearGradient>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          {goldStops}
        </linearGradient>
      </defs>
      <rect x="40" y="0" width="140" height="96" rx="18" fill={`url(#${id}-b)`} />
      <rect x="36" y="80" width="148" height="20" rx="4" fill={`url(#${id}-g)`} />
      <path d="M36 100 L184 100 C206 130 220 150 220 190 L220 600 C220 624 204 640 180 640 L40 640 C16 640 0 624 0 600 L0 190 C0 150 14 130 36 100 Z" fill={`url(#${id}-b)`} />
      <rect x="44" y="160" width="10" height="440" rx="5" fill="#fff" opacity="0.1" />
      <Mark x={80} y={250} size={60} gold={p.mark} soft={p.markSoft} />
      <Wordmark x={110} y={360} size={24} color={p.ink} anchor="middle" sub="ANALYTICS" subColor={GOLD} />
      <text x="110" y="540" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="15" fill={p.ink} opacity="0.75">
        Data. Insights.
      </text>
      <text x="110" y="560" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="15" fill={p.ink} opacity="0.75">
        Better Decisions.
      </text>
    </g>
  );
}

/** Ceramic mug, 340 x 300 including the handle. */
export function Mug({ palette = "white" }: { palette?: PaletteName }) {
  const id = useId();
  const p = PALETTES[palette];
  const dark = palette !== "white";
  return (
    <g filter="url(#soft-shadow)">
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.shade} />
          <stop offset="30%" stopColor={p.light} />
          <stop offset="80%" stopColor={p.base} />
          <stop offset="100%" stopColor={p.shade} />
        </linearGradient>
      </defs>
      <path d="M250 70 C330 70 336 210 252 220" fill="none" stroke={p.shade} strokeWidth="30" />
      <path d="M250 70 C330 70 336 210 252 220" fill="none" stroke={`url(#${id}-b)`} strokeWidth="22" />
      <path d="M0 24 L264 24 L256 270 C256 286 244 298 228 298 L36 298 C20 298 8 286 8 270 Z" fill={`url(#${id}-b)`} />
      <ellipse cx="132" cy="24" rx="132" ry="16" fill={dark ? "#04101F" : "#D7DCE4"} />
      <ellipse cx="132" cy="26" rx="120" ry="11" fill={dark ? "#020A14" : "#3B2A1A"} opacity={dark ? 1 : 0.85} />
      <rect x="0" y="22" width="264" height="5" fill={GOLD} opacity="0.85" />
      <Mark x={102} y={110} size={60} gold={p.mark} soft={dark ? p.markSoft : NAVY} />
    </g>
  );
}

/** Lanyard loop with a printed ribbon, metal hook and an ID card hanging from it. 360 x 760. */
export function Lanyard({ name = "Your Name", role = "CloudTech Analytics" }: { name?: string; role?: string }) {
  const id = useId();
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-m`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8A93A0" />
          <stop offset="50%" stopColor="#E9EDF2" />
          <stop offset="100%" stopColor="#6D7684" />
        </linearGradient>
        <path id={`${id}-l`} d="M150 380 C60 300 40 120 110 30 C150 -14 210 -14 250 30 C320 120 300 300 210 380" />
      </defs>
      <use href={`#${id}-l`} fill="none" stroke="#061426" strokeWidth="44" opacity="0.18" transform="translate(0 14)" />
      <use href={`#${id}-l`} fill="none" stroke={NAVY} strokeWidth="38" />
      <use href={`#${id}-l`} fill="none" stroke={GOLD} strokeWidth="38" strokeDasharray="1 0" opacity="0" />
      <text fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight={700} letterSpacing="5" fill={GOLD}>
        <textPath href={`#${id}-l`} startOffset="4%">
          CLOUDTECH · DATA · INSIGHTS · CLOUDTECH · DATA · INSIGHTS · CLOUDTECH
        </textPath>
      </text>
      <rect x="160" y="370" width="40" height="34" rx="6" fill={`url(#${id}-m)`} />
      <path d="M180 404 L180 430" stroke={`url(#${id}-m)`} strokeWidth="8" />
      <g transform="translate(60 426)">
        <IdCard name={name} role={role} />
      </g>
    </g>
  );
}

/** Staff ID card, 240 x 340. */
export function IdCard({ name = "Your Name", role = "CloudTech Analytics" }: { name?: string; role?: string }) {
  return (
    <g filter="url(#soft-shadow)">
      <rect width="240" height="340" rx="16" fill="#FFFFFF" />
      <rect width="240" height="340" rx="16" fill="none" stroke="#DDE3EA" />
      <path d="M0 16 C0 7 7 0 16 0 L224 0 C233 0 240 7 240 16 L240 96 L0 96 Z" fill={NAVY} />
      <rect x="96" y="12" width="48" height="8" rx="4" fill="#E9EDF2" />
      <Lockup x={26} y={42} size={30} soft="#E9DFC9" text="#F6EFE0" />
      <circle cx="120" cy="164" r="44" fill="#E9EDF2" />
      <circle cx="120" cy="152" r="17" fill="#B8C2CF" />
      <path d="M88 196 C94 172 146 172 152 196" fill="#B8C2CF" />
      <text x="120" y="240" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight={700} fontSize="24" fill={NAVY}>
        {name}
      </text>
      <text x="120" y="262" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="11" letterSpacing="2" fill="#5B6878">
        {role.toUpperCase()}
      </text>
      <line x1="40" y1="290" x2="200" y2="290" stroke={GOLD} strokeWidth="1.5" />
      <rect x="40" y="304" width="160" height="10" rx="2" fill="#E3E8EF" />
    </g>
  );
}

/** Rigid gift box with a magnetic lid and a satin band, 560 x 380, closed. */
export function GiftBox({ label = "The Corporate Kit" }: { label?: string }) {
  const id = useId();
  return (
    <g filter="url(#soft-shadow)">
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A426F" />
          <stop offset="60%" stopColor="#0B2A4A" />
          <stop offset="100%" stopColor="#061629" />
        </linearGradient>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          {goldStops}
        </linearGradient>
      </defs>
      {/* front face */}
      <path d="M0 150 L560 150 L560 380 L0 380 Z" fill="#061629" />
      <path d="M0 150 L560 150 L560 170 L0 170 Z" fill="#000" opacity="0.25" />
      {/* lid, seen from slightly above */}
      <path d="M40 0 L520 0 L560 150 L0 150 Z" fill={`url(#${id}-top)`} />
      <path d="M40 0 L520 0 L560 150 L0 150 Z" fill="url(#leather)" opacity="0.6" />
      {/* satin band */}
      <path d="M372 0 L412 0 L432 150 L392 150 Z" fill={`url(#${id}-g)`} />
      <rect x="392" y="150" width="40" height="230" fill={`url(#${id}-g)`} />
      <rect x="392" y="150" width="40" height="230" fill="#000" opacity="0.18" />
      <Mark x={180} y={34} size={52} gold={`url(#${id}-g)`} soft="#E2D3B0" />
      <text x="206" y="124" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight={700} fontSize="30" fill="#EDE3CC">
        CloudTech
      </text>
      <text x="206" y="290" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="14" letterSpacing="6" fill={GOLD}>
        {label.toUpperCase()}
      </text>
      <line x1="150" y1="304" x2="262" y2="304" stroke={GOLD} strokeOpacity="0.5" />
    </g>
  );
}

/** Natural canvas tote, 420 x 560. */
export function Tote() {
  return (
    <g filter="url(#soft-shadow)">
      <path d="M120 120 C120 10 300 10 300 120" fill="none" stroke="#D6CBB3" strokeWidth="22" />
      <path d="M120 120 C120 10 300 10 300 120" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="22" transform="translate(3 4)" />
      <path d="M20 110 L400 110 L420 560 L0 560 Z" fill={CREAM} />
      <path d="M20 110 L400 110 L420 560 L0 560 Z" fill="url(#jersey)" />
      <path d="M20 110 L400 110 L404 130 L16 130 Z" fill="#000" opacity="0.06" />
      <Mark x={180} y={250} size={60} gold={GOLD} soft={NAVY} />
      <text x="210" y="380" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight={600} fontSize="44" fill={NAVY}>
        For Data People.
      </text>
      <text x="210" y="414" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="12" fontWeight={600} letterSpacing="5" fill={GOLD_DEEP}>
        CLOUDTECH ACADEMY
      </text>
    </g>
  );
}

/** A scatter of vinyl stickers, 640 x 520. */
export function Stickers() {
  const sticker = (x: number, y: number, r: number, body: ReactNode) => (
    <g transform={`translate(${x} ${y}) rotate(${r})`} filter="url(#soft-shadow)">
      {body}
    </g>
  );
  return (
    <g>
      {sticker(
        40,
        60,
        -8,
        <>
          <rect width="300" height="120" rx="60" fill="#FFFFFF" />
          <rect x="8" y="8" width="284" height="104" rx="52" fill={NAVY} />
          <text x="150" y="72" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize="30" letterSpacing="4" fill="#F6EFE0">
            DATA PEOPLE
          </text>
        </>,
      )}
      {sticker(
        380,
        30,
        10,
        <>
          <rect width="190" height="190" rx="40" fill="#FFFFFF" />
          <Mark x={30} y={30} size={130} gold={GOLD} soft={NAVY} />
        </>,
      )}
      {sticker(
        80,
        250,
        6,
        <>
          <circle cx="110" cy="110" r="110" fill="#FFFFFF" />
          <circle cx="110" cy="110" r="100" fill={GOLD} />
          <text x="110" y="100" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight={700} fontSize="30" fill={NAVY}>
            Learn. Build.
          </text>
          <text x="110" y="134" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight={700} fontSize="30" fill={NAVY}>
            Prove It.
          </text>
        </>,
      )}
      {sticker(
        330,
        300,
        -5,
        <>
          <rect width="280" height="110" rx="18" fill="#FFFFFF" />
          <rect x="8" y="8" width="264" height="94" rx="12" fill="#0B1220" />
          <text x="26" y="64" fontFamily="'Cascadia Code', Consolas, monospace" fontSize="21" fill="#9FD3A8">
            SELECT * FROM ideas;
          </text>
        </>,
      )}
    </g>
  );
}
