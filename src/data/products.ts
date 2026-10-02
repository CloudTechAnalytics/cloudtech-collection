/**
 * The CloudTech Collection catalogue.
 *
 * To add a product, add an entry to PRODUCTS. To change a price, edit `price` (whole naira; null shows
 * "Price on request"). To use a real photo instead of a drawn mockup, give the image a `src`
 * (put the file in /public/products) and keep the `alt`.
 */
import type { MockupKey } from "@/components/mockups/Mockup";
import type { PaletteName } from "@/components/mockups/parts";

export type ProductImage = { alt: string } & ({ src: string; mockup?: never } | { mockup: MockupKey; palette?: PaletteName; view?: string; src?: never });

export type Category = "apparel" | "accessories" | "stationery" | "kits";
export type Line = "signature" | "corporate" | "academy";

export type Product = {
  id: string;
  slug: string;
  name: string;
  line: Line;
  category: Category;
  /** One line for cards. */
  tagline: string;
  description: string;
  details: string[];
  /** Whole naira. null = price on request (to be confirmed). */
  price: number | null;
  images: ProductImage[];
  sizes?: string[];
  variants?: string[];
  /** false = not yet orderable (e.g. the Academy collection). */
  available: boolean;
  featured: boolean;
};

const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];

export const PRODUCTS: Product[] = [
  {
    id: "ct-polo",
    slug: "signature-polo",
    name: "CloudTech Signature Polo",
    line: "signature",
    category: "apparel",
    tagline: "Navy piqué polo with the embroidered CloudTech mark.",
    description:
      "The piece the collection is built around. A structured navy piqué polo with the CloudTech Analytics logo embroidered on the left chest and fine gold piping at the collar and sleeves: smart enough for a client meeting, comfortable enough for a long conference day.",
    details: ["Navy cotton piqué", "Embroidered CloudTech Analytics logo, left chest", "Gold piping at the collar and cuffs", "Three-button placket, ribbed cuffs"],
    price: null,
    images: [
      { mockup: "polo", palette: "navy", alt: "Navy CloudTech Signature Polo, front" },
      { mockup: "embroidery", palette: "navy", alt: "Close-up of the gold embroidered CloudTech mark" },
      { mockup: "polo", palette: "navy", view: "back", alt: "Navy CloudTech Signature Polo, back" },
    ],
    sizes: APPAREL_SIZES,
    variants: ["Navy with gold piping", "Navy, no piping"],
    available: true,
    featured: true,
  },
  {
    id: "ct-tee",
    slug: "essential-tee",
    name: "CloudTech Essential Tee",
    line: "signature",
    category: "apparel",
    tagline: "Heavyweight white tee with a quiet chest logo.",
    description:
      "A clean, heavyweight white T-shirt with the CloudTech Analytics logo placed subtly on the chest. The optional back print carries the line that sums up the work: Data. Insights. Better Decisions.",
    details: ["Heavyweight white cotton jersey", "CloudTech Analytics logo, left chest", "Optional back print: Data. Insights. Better Decisions."],
    price: null,
    images: [
      { mockup: "tee", palette: "white", alt: "White CloudTech Essential Tee, front" },
      { mockup: "tee", palette: "white", view: "back", alt: "White CloudTech Essential Tee, back print" },
    ],
    sizes: APPAREL_SIZES,
    variants: ["With back print", "Front logo only"],
    available: true,
    featured: true,
  },
  {
    id: "ct-cap",
    slug: "executive-cap",
    name: "CloudTech Executive Cap",
    line: "signature",
    category: "accessories",
    tagline: "Structured navy cap, embroidered in gold and cream.",
    description: "A structured six-panel navy cap with the CloudTech mark embroidered in gold and cream. Minimal, clean, and finished with a brass strap buckle.",
    details: ["Structured six-panel navy cotton twill", "Gold and cream embroidered mark", "Adjustable strap with brass buckle"],
    price: null,
    images: [
      { mockup: "cap", palette: "navy", view: "side", alt: "Navy CloudTech Executive Cap, side" },
      { mockup: "cap", palette: "navy", alt: "Navy CloudTech Executive Cap, front" },
    ],
    sizes: ["One size, adjustable"],
    available: true,
    featured: true,
  },
  {
    id: "ct-journal",
    slug: "hardcover-journal",
    name: "CloudTech Hardcover Journal",
    line: "signature",
    category: "stationery",
    tagline: "Navy hardcover with gold foil, band and page marker.",
    description:
      "A dark navy hardcover journal with the CloudTech Analytics logo in gold foil, a gold elastic band and a gold ribbon marker. The cover carries three words: Ideas. Analysis. Impact.",
    details: ["A5 navy hardcover, leather-grain finish", "Gold foil logo and cover text", "Gold elastic closure and ribbon marker", "Dotted cream pages"],
    price: null,
    images: [
      { mockup: "journal", palette: "navy", alt: "Navy CloudTech Hardcover Journal with gold foil" },
      { mockup: "journal", palette: "navy", view: "open", alt: "The journal open on dotted pages" },
    ],
    available: true,
    featured: true,
  },
  {
    id: "ct-pen",
    slug: "executive-pen",
    name: "CloudTech Executive Pen",
    line: "signature",
    category: "stationery",
    tagline: "Navy metal pen with gold accents.",
    description: "A weighted navy metal pen with gold clip, rings and tip, and CLOUDTECH printed subtly along the barrel. Writes smoothly; looks right on a boardroom table.",
    details: ["Navy lacquered metal barrel", "Gold-tone clip, rings and tip", "Twist mechanism, black ink", "CLOUDTECH printed on the barrel"],
    price: null,
    images: [
      { mockup: "pen", alt: "Navy and gold CloudTech Executive Pen" },
      { mockup: "pen", view: "detail", alt: "The pen's gold clip and printed barrel" },
    ],
    available: true,
    featured: true,
  },
  {
    id: "ct-bottle",
    slug: "thermal-bottle",
    name: "CloudTech Thermal Bottle",
    line: "signature",
    category: "accessories",
    tagline: "Matte navy vacuum bottle with a gold band.",
    description: "A matte navy, double-walled steel bottle with a gold band, the CloudTech logo, and a quiet line of text: Data. Insights. Better Decisions.",
    details: ["Double-walled stainless steel, 500 ml", "Matte navy finish with gold band", "Keeps drinks cold or hot for hours"],
    price: null,
    images: [{ mockup: "bottle", palette: "navy", alt: "Matte navy CloudTech Thermal Bottle" }],
    available: true,
    featured: true,
  },
  {
    id: "ct-mug",
    slug: "studio-mug",
    name: "CloudTech Studio Mug",
    line: "signature",
    category: "accessories",
    tagline: "White ceramic mug with a gold rim.",
    description: "A heavy white ceramic mug with a fine gold rim and the CloudTech mark. For desks, studios and long analysis sessions.",
    details: ["White ceramic, 350 ml", "Gold rim", "CloudTech mark"],
    price: null,
    images: [{ mockup: "mug", palette: "white", alt: "White CloudTech Studio Mug with gold rim" }],
    available: true,
    featured: false,
  },
  {
    id: "ct-lanyard",
    slug: "lanyard-and-card",
    name: "CloudTech Lanyard & ID Card",
    line: "corporate",
    category: "accessories",
    tagline: "Navy woven lanyard with a printed ID card.",
    description: "A navy woven lanyard printed in gold, with a metal clip and a white ID card holder. Personalised cards are available for teams and events.",
    details: ["Navy woven lanyard, gold print", "Metal clip", "Printed ID card, personalised for teams"],
    price: null,
    images: [
      { mockup: "lanyard", alt: "Navy CloudTech lanyard with ID card" },
      { mockup: "idcard", alt: "CloudTech ID card" },
    ],
    available: true,
    featured: false,
  },
  {
    id: "ct-kit",
    slug: "corporate-kit",
    name: "The CloudTech Corporate Kit",
    line: "corporate",
    category: "kits",
    tagline: "Polo, cap, journal, pen, bottle, lanyard and ID card, boxed.",
    description:
      "A coordinated set for the people representing CloudTech every day: the Signature Polo, Executive Cap, Hardcover Journal, Executive Pen, Thermal Bottle, lanyard and ID card, presented in a navy rigid gift box with a gold band.",
    details: ["Signature Polo and Executive Cap", "Hardcover Journal and Executive Pen", "Thermal Bottle", "Lanyard and personalised ID card", "Navy rigid gift box with gold band"],
    price: null,
    images: [
      { mockup: "kit", alt: "The CloudTech Corporate Kit arranged around its gift box" },
      { mockup: "giftbox", alt: "Navy CloudTech gift box with gold band" },
    ],
    sizes: APPAREL_SIZES,
    available: true,
    featured: false,
  },

  // The Academy Collection: shown as Coming Soon until `available` is set to true.
  {
    id: "ac-tee",
    slug: "academy-tee",
    name: "Academy Tee",
    line: "academy",
    category: "apparel",
    tagline: "DATA PEOPLE on a deep-blue tee.",
    description: "For CloudTech Academy learners and the data community: a deep-blue tee with DATA PEOPLE and Learn. Build. Prove It.",
    details: ["Deep-blue cotton jersey", "DATA PEOPLE front print"],
    price: null,
    images: [{ mockup: "tee", palette: "academy", view: "academy", alt: "Academy Tee with DATA PEOPLE print" }],
    sizes: APPAREL_SIZES,
    available: false,
    featured: false,
  },
  {
    id: "ac-hoodie",
    slug: "academy-hoodie",
    name: "Academy Hoodie",
    line: "academy",
    category: "apparel",
    tagline: "The study-session hoodie.",
    description: "A heavyweight deep-blue hoodie with DATA PEOPLE across the chest, for late study sessions and community meet-ups.",
    details: ["Heavyweight brushed fleece", "DATA PEOPLE front print", "Gold-tipped drawcords"],
    price: null,
    images: [{ mockup: "hoodie", palette: "academy", alt: "Academy Hoodie with DATA PEOPLE print" }],
    sizes: APPAREL_SIZES,
    available: false,
    featured: false,
  },
  {
    id: "ac-notebook",
    slug: "academy-notebook",
    name: "Academy Notebook",
    line: "academy",
    category: "stationery",
    tagline: "Learn. Build. Prove It.",
    description: "A deep-blue notebook for course notes, SQL scribbles and project plans.",
    details: ["A5 softcover", "Dotted pages"],
    price: null,
    images: [{ mockup: "journal", palette: "academy", alt: "Academy Notebook" }],
    available: false,
    featured: false,
  },
  {
    id: "ac-cap",
    slug: "academy-cap",
    name: "Academy Cap",
    line: "academy",
    category: "accessories",
    tagline: "Deep-blue cap with the CloudTech mark.",
    description: "A relaxed deep-blue cap with the CloudTech mark.",
    details: ["Unstructured cotton twill", "Embroidered mark"],
    price: null,
    images: [{ mockup: "cap", palette: "academy", view: "side", alt: "Academy Cap" }],
    available: false,
    featured: false,
  },
  {
    id: "ac-stickers",
    slug: "data-people-stickers",
    name: "Data People Stickers",
    line: "academy",
    category: "accessories",
    tagline: "For laptops and water bottles.",
    description: "A sheet of vinyl stickers: DATA PEOPLE, the CloudTech mark, Learn. Build. Prove It., and a little SQL.",
    details: ["Matte vinyl, weatherproof"],
    price: null,
    images: [{ mockup: "stickers", alt: "Data People sticker set" }],
    available: false,
    featured: false,
  },
  {
    id: "ac-tote",
    slug: "academy-tote",
    name: "Academy Tote",
    line: "academy",
    category: "accessories",
    tagline: "For Data People.",
    description: "A natural canvas tote printed with For Data People.",
    details: ["Heavy natural canvas", "Navy and gold print"],
    price: null,
    images: [{ mockup: "tote", alt: "Academy Tote bag" }],
    available: false,
    featured: false,
  },
];

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const SIGNATURE = PRODUCTS.filter((p) => p.line === "signature");
export const ORDERABLE = PRODUCTS.filter((p) => p.available);
export const ACADEMY = PRODUCTS.filter((p) => p.line === "academy");

export const formatPrice = (price: number | null) => (price === null ? "Price on request" : `₦${price.toLocaleString("en-NG")}`);

/** What can be requested in a corporate order. */
export const CORPORATE_OPTIONS = [
  "Signature Polos",
  "Event T-shirts",
  "Caps",
  "Branded notebooks / journals",
  "Pens",
  "Bottles and mugs",
  "Lanyards and ID cards",
  "Corporate Kits (boxed)",
  "Corporate gift boxes",
  "Customised merchandise",
  "Academy / student kits",
];
