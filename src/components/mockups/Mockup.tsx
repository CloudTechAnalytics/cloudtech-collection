/**
 * Renders one product mockup in a studio frame. Products refer to these by key in
 * src/data/products.ts; swap any image for a real photo by giving it a `src` instead.
 */
import { Bottle, Cap, GiftBox, IdCard, Journal, Lanyard, Mug, Pen, Stickers, Tote } from "./accessories";
import { EmbroideryDetail, Hoodie, Polo, Tee } from "./apparel";
import { FloorShadow, Studio, type PaletteName } from "./parts";

export type MockupKey =
  | "polo"
  | "tee"
  | "cap"
  | "journal"
  | "pen"
  | "bottle"
  | "mug"
  | "lanyard"
  | "idcard"
  | "giftbox"
  | "hoodie"
  | "tote"
  | "stickers"
  | "embroidery"
  | "hero"
  | "kit"
  | "academy-set";

export type MockupSpec = { mockup: MockupKey; palette?: PaletteName; view?: string; label: string };

/** Wide hero arrangement: the whole collection on a studio table, 1600 x 1000. */
function HeroScene() {
  return (
    <>
      <FloorShadow cx={800} cy={905} rx={760} ry={70} />
      {/* back row */}
      <g transform="translate(70 120) scale(0.92)">
        <Polo palette="navy" />
      </g>
      <g transform="translate(560 170) scale(0.78)">
        <Tee palette="white" />
      </g>
      <g transform="translate(1040 300) scale(0.9)">
        <Bottle />
      </g>
      <g transform="translate(1290 150) scale(0.86)">
        <Lanyard />
      </g>
      {/* front row */}
      <g transform="translate(380 640) scale(0.78)">
        <GiftBox label="CloudTech Collection" />
      </g>
      <g transform="translate(760 570) scale(0.62)">
        <Journal />
      </g>
      <g transform="translate(790 900) rotate(-14) scale(0.52)">
        <Pen />
      </g>
      <g transform="translate(40 700) scale(0.62)">
        <Cap view="side" />
      </g>
      <g transform="translate(1110 750) scale(0.62)">
        <Mug />
      </g>
    </>
  );
}

/** The corporate kit arranged around its gift box, 800 x 1000. */
function KitScene() {
  return (
    <>
      <FloorShadow cx={400} cy={905} rx={370} ry={48} />
      {/* back row: the polo hangs behind, bottle and lanyard beside it */}
      <g transform="translate(60 60) scale(0.66)">
        <Polo palette="navy" />
      </g>
      <g transform="translate(470 200) scale(0.62)">
        <Bottle />
      </g>
      <g transform="translate(600 170) scale(0.5)">
        <Lanyard />
      </g>
      {/* front row */}
      <g transform="translate(60 560) scale(0.86)">
        <GiftBox />
      </g>
      <g transform="translate(560 600) scale(0.46)">
        <Journal />
      </g>
      <g transform="translate(262 452) scale(0.38)">
        <Cap view="side" />
      </g>
      <g transform="translate(470 905) rotate(-12) scale(0.46)">
        <Pen />
      </g>
    </>
  );
}

function AcademyScene() {
  return (
    <>
      <FloorShadow cx={400} cy={910} rx={360} ry={50} />
      <g transform="translate(30 70) scale(0.78)">
        <Hoodie />
      </g>
      <g transform="translate(450 330) scale(0.7)">
        <Tote />
      </g>
      <g transform="translate(60 640) scale(0.55)">
        <Stickers />
      </g>
      <g transform="translate(470 700) scale(0.48)">
        <Journal palette="academy" lines={["Learn.", "Build.", "Prove It."]} sub="ACADEMY" />
      </g>
    </>
  );
}

function Item({ spec }: { spec: MockupSpec }) {
  const { mockup, palette, view } = spec;
  switch (mockup) {
    case "polo":
      return (
        <>
          <FloorShadow cx={400} cy={880} rx={300} ry={40} />
          <g transform="translate(70 160) scale(1.1)">
            <Polo palette={palette} view={view === "back" ? "back" : "front"} />
          </g>
        </>
      );
    case "tee":
      return (
        <>
          <FloorShadow cx={400} cy={880} rx={300} ry={40} />
          <g transform="translate(70 160) scale(1.1)">
            <Tee palette={palette} view={view === "back" ? "back" : "front"} sub={view === "academy" ? "DATA PEOPLE" : undefined} />
          </g>
        </>
      );
    case "hoodie":
      return (
        <>
          <FloorShadow cx={400} cy={900} rx={300} ry={40} />
          <g transform="translate(70 130) scale(1.1)">
            <Hoodie palette={palette} />
          </g>
        </>
      );
    case "cap":
      return (
        <>
          <FloorShadow cx={400} cy={700} rx={300} ry={40} />
          <g transform="translate(70 330) scale(1.1)">
            <Cap view={view === "side" ? "side" : "front"} palette={palette} />
          </g>
        </>
      );
    case "journal":
      return view === "open" ? (
        <>
          <FloorShadow cx={400} cy={770} rx={360} ry={40} />
          <g transform="translate(40 320) scale(0.95)">
            <Journal view="open" palette={palette} />
          </g>
        </>
      ) : (
        <>
          <FloorShadow cx={400} cy={860} rx={260} ry={40} />
          <g transform="translate(200 180) scale(1.05)">
            <Journal palette={palette} lines={palette === "academy" ? ["Learn.", "Build.", "Prove It."] : undefined} sub={palette === "academy" ? "ACADEMY" : undefined} />
          </g>
        </>
      );
    case "pen":
      return view === "detail" ? (
        <g transform="translate(32 450) scale(1.15)">
          <Pen />
        </g>
      ) : (
        <>
          <FloorShadow cx={400} cy={640} rx={330} ry={34} />
          <g transform="translate(110 640) rotate(-28) scale(1.05)">
            <Pen />
          </g>
        </>
      );
    case "bottle":
      return (
        <>
          <FloorShadow cx={400} cy={870} rx={180} ry={34} />
          <g transform="translate(290 190) scale(1.05)">
            <Bottle palette={palette} />
          </g>
        </>
      );
    case "mug":
      return (
        <>
          <FloorShadow cx={380} cy={720} rx={240} ry={36} />
          <g transform="translate(200 380) scale(1.15)">
            <Mug palette={palette} />
          </g>
        </>
      );
    case "lanyard":
      return (
        <>
          <FloorShadow cx={400} cy={900} rx={200} ry={30} />
          <g transform="translate(220 60) scale(1.1)">
            <Lanyard />
          </g>
        </>
      );
    case "idcard":
      return (
        <>
          <FloorShadow cx={400} cy={800} rx={200} ry={30} />
          <g transform="translate(220 230) scale(1.5)">
            <IdCard />
          </g>
        </>
      );
    case "giftbox":
      return (
        <>
          <FloorShadow cx={400} cy={760} rx={330} ry={44} />
          <g transform="translate(120 360)">
            <GiftBox />
          </g>
        </>
      );
    case "tote":
      return (
        <>
          <FloorShadow cx={400} cy={880} rx={260} ry={36} />
          <g transform="translate(190 250)">
            <Tote />
          </g>
        </>
      );
    case "stickers":
      return (
        <g transform="translate(80 260)">
          <Stickers />
        </g>
      );
    case "embroidery":
      return <EmbroideryDetail palette={palette} />;
    default:
      return null;
  }
}

export function Mockup({ spec, className = "h-full w-full" }: { spec: MockupSpec; className?: string }) {
  if (spec.mockup === "hero")
    return (
      <Studio width={1600} height={1000} label={spec.label} className={className}>
        <HeroScene />
      </Studio>
    );
  return (
    <Studio label={spec.label} className={className} tone={spec.mockup === "kit" || spec.mockup === "academy-set" ? "warm" : "light"}>
      {spec.mockup === "kit" ? <KitScene /> : spec.mockup === "academy-set" ? <AcademyScene /> : <Item spec={spec} />}
    </Studio>
  );
}
