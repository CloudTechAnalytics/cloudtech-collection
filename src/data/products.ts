/**
 * The CloudTech Collection catalogue.
 *
 * Prices are whole naira (null shows "Price on request"). Photos live in /public/products and are
 * produced by scripts/brand_photos.py, which puts the CloudTech logo on the AI Studio product photos.
 */
export type Category = "Apparel" | "Stationery" | "Accessories" | "Kits";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  /** One line under the name on cards. */
  subtitle: string;
  description: string;
  details: string[];
  specifications: Record<string, string>;
  /** Whole naira. null = price on request. */
  price: number | null;
  images: { src: string; alt: string }[];
  sizes?: string[];
  colour?: { name: string; hex: string };
  /** Text shown on the back, for pieces that have it. */
  backTreatment?: string;
  badge?: string;
  available: boolean;
  featured: boolean;
};

const SIZES = ["S", "M", "L", "XL", "XXL", "3XL"];

export const PRODUCTS: Product[] = [
  {
    id: "ct-polo",
    slug: "signature-polo",
    name: "CloudTech Signature Polo",
    category: "Apparel",
    subtitle: "Navy piqué polo with the embroidered CloudTech logo",
    description:
      "The piece the collection is built around. A structured navy piqué polo with the CloudTech Analytics logo embroidered on the left chest and gold piping at the collar: smart enough for a client meeting, comfortable enough for a long conference day.",
    details: [
      "CloudTech Analytics logo embroidered on the left chest in gold and cream thread",
      "Gold piping on the collar",
      "Three-button placket with tonal buttons",
      "Ribbed collar and cuffs that keep their shape",
    ],
    specifications: {
      Material: "Cotton piqué",
      Colour: "Deep corporate navy",
      Embroidery: "Gold and cream thread, left chest",
      Fit: "Regular, true to size",
      Care: "Wash cold, inside out; dry in shade",
    },
    price: 38500,
    images: [
      { src: "/products/signature-polo.jpg", alt: "Navy CloudTech Signature Polo with the embroidered CloudTech logo" },
      { src: "/products/collection-flatlay.jpg", alt: "The polo with the rest of the CloudTech Collection" },
    ],
    sizes: SIZES,
    colour: { name: "Deep corporate navy", hex: "#071B33" },
    badge: "Signature",
    available: true,
    featured: true,
  },
  {
    id: "ct-tee",
    slug: "essential-tee",
    name: "CloudTech Essential Tee",
    category: "Apparel",
    subtitle: "Heavyweight white tee with the CloudTech logo",
    description:
      "A clean, heavyweight white T-shirt carrying the CloudTech Analytics logo, with the line that sums up the work printed across the upper back: Data. Insights. Better Decisions.",
    details: ["Heavyweight cotton jersey", "CloudTech Analytics logo on the chest", "Back print: Data. Insights. Better Decisions.", "Ribbed crew neck"],
    specifications: {
      Material: "Cotton jersey, heavyweight",
      Colour: "White",
      Print: "Front logo; back line \"Data. Insights. Better Decisions.\"",
      Fit: "Relaxed",
      Care: "Wash cold; low tumble dry",
    },
    price: 22000,
    images: [
      { src: "/products/essential-tee.jpg", alt: "White CloudTech Essential Tee with the CloudTech logo" },
      { src: "/products/collection-flatlay.jpg", alt: "The tee with the rest of the CloudTech Collection" },
    ],
    sizes: SIZES.slice(0, 5),
    colour: { name: "White", hex: "#FFFFFF" },
    backTreatment: "Data. Insights. Better Decisions.",
    available: true,
    featured: true,
  },
  {
    id: "ct-cap",
    slug: "executive-cap",
    name: "CloudTech Executive Cap",
    category: "Accessories",
    subtitle: "Structured navy cap with the embroidered CloudTech mark",
    description: "A structured six-panel navy cap with the CloudTech mark embroidered on the front in gold and cream, and a metal CloudTech tag on the strap.",
    details: ["Structured six-panel crown", "CloudTech mark embroidered on the front", "Adjustable strap with metal CloudTech tag", "Pre-curved visor"],
    specifications: {
      Fabric: "Cotton twill",
      Colour: "Navy",
      Embroidery: "Raised CloudTech mark, gold and cream",
      Size: "One size, adjustable",
    },
    price: 18500,
    images: [
      { src: "/products/executive-cap.jpg", alt: "Navy CloudTech Executive Cap with the embroidered CloudTech mark" },
      { src: "/products/collection-flatlay.jpg", alt: "The cap with the rest of the CloudTech Collection" },
    ],
    available: true,
    featured: true,
  },
  {
    id: "ct-journal",
    slug: "hardcover-journal",
    name: "CloudTech Hardcover Journal",
    category: "Stationery",
    subtitle: "Navy hardcover with gold foil: Ideas. Analysis. Impact.",
    description:
      "A dark navy hardcover journal with \"Ideas. Analysis. Impact.\" and the CloudTech Analytics logo in gold foil, a navy elastic closure and a gold ribbon marker. For strategy sessions, workshops and planning.",
    details: ["Gold foil cover text and CloudTech logo", "Navy leather-feel hardcover", "Elastic closure and gold ribbon marker", "Dotted cream pages"],
    specifications: {
      Format: "A5",
      Cover: "Navy leather-feel hardcover, gold foil",
      Pages: "Dotted, cream",
      Extras: "Elastic closure, ribbon marker",
    },
    price: 14000,
    images: [
      { src: "/products/journal-and-pen.jpg", alt: "Navy CloudTech Hardcover Journal with gold foil and the Executive Pen" },
      { src: "/products/collection-flatlay.jpg", alt: "The journal with the rest of the CloudTech Collection" },
    ],
    available: true,
    featured: true,
  },
  {
    id: "ct-pen",
    slug: "executive-pen",
    name: "CloudTech Executive Pen",
    category: "Stationery",
    subtitle: "Navy metal pen with gold accents",
    description: "A weighted navy metal pen with a gold clip, rings and tip. Made for signing, sketching and the boardroom table.",
    details: ["Navy metal barrel", "Gold-tone clip, rings and tip", "Twist mechanism", "Black ink, refillable"],
    specifications: {
      Body: "Metal, navy finish",
      Fittings: "Gold tone",
      Mechanism: "Twist",
      Ink: "Black, refillable",
    },
    price: 9500,
    images: [
      { src: "/products/executive-pen.jpg", alt: "Navy and gold CloudTech Executive Pen" },
      { src: "/products/journal-and-pen.jpg", alt: "The pen beside the CloudTech Hardcover Journal" },
    ],
    available: true,
    featured: true,
  },
  {
    id: "ct-bottle",
    slug: "thermal-bottle",
    name: "CloudTech Thermal Bottle",
    category: "Accessories",
    subtitle: "Matte navy insulated bottle with a gold cap band",
    description: "A matte navy, double-walled steel bottle with a gold cap band and the CloudTech mark, for long desk days and travel.",
    details: ["Double-walled, vacuum insulated", "Matte navy finish with gold cap band", "CloudTech mark in gold", "Leak-proof cap"],
    specifications: {
      Capacity: "500 ml",
      Material: "Stainless steel",
      Finish: "Matte navy, gold band",
    },
    price: 24000,
    images: [
      { src: "/products/thermal-bottle.jpg", alt: "Matte navy CloudTech Thermal Bottle with the gold CloudTech mark" },
      { src: "/products/collection-flatlay.jpg", alt: "The bottle with the rest of the CloudTech Collection" },
    ],
    available: true,
    featured: true,
  },
  {
    id: "ct-kit",
    slug: "corporate-kit",
    name: "The CloudTech Corporate Kit",
    category: "Kits",
    subtitle: "The full coordinated set in a navy presentation box",
    description:
      "For new team members, client partnerships, conference delegations and board members: the Signature Polo, Executive Cap, Hardcover Journal, Executive Pen, Thermal Bottle, lanyard and ID card, presented in a navy rigid gift box with the CloudTech Collection logo in gold foil.",
    details: [
      "CloudTech Signature Polo (sized per person)",
      "CloudTech Executive Cap",
      "CloudTech Hardcover Journal",
      "CloudTech Executive Pen",
      "CloudTech Thermal Bottle",
      "Woven CloudTech lanyard and ID card",
      "Navy rigid gift box with fitted insert",
    ],
    specifications: {
      Box: "Navy rigid box, gold foil lid, fitted insert",
      Contents: "7 pieces",
      Personalisation: "Names on ID cards; co-branded cards on request",
      "Ideal for": "New starters, VIP clients, conferences, board meetings",
    },
    price: 98000,
    images: [
      { src: "/products/corporate-kit.jpg", alt: "The CloudTech Corporate Kit in its navy gift box" },
      { src: "/products/collection-flatlay.jpg", alt: "The pieces of the CloudTech Collection" },
    ],
    sizes: [...SIZES, "Mixed sizes (team order)"],
    badge: "Corporate Kit",
    available: true,
    featured: true,
  },
];

export const CATEGORIES = ["All", "Apparel", "Stationery", "Accessories", "Kits"] as const;

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatPrice = (price: number | null) => (price === null ? "Price on request" : `₦${price.toLocaleString("en-NG")}`);

export type AcademyItem = { id: string; name: string; category: string; description: string; tagline: string; icon: "Terminal" | "Code" | "BookOpen" | "Compass" | "Sparkles" | "ShoppingBag" };

export const ACADEMY_ITEMS: AcademyItem[] = [
  { id: "acad-tee", name: "Learn. Build. Prove It. Tee", category: "Apparel", description: "A relaxed tee carrying the line that runs through every CloudTech Academy course.", tagline: "Learn. Build. Prove It.", icon: "Terminal" },
  { id: "acad-hoodie", name: "Data People Hoodie", category: "Apparel", description: "A heavyweight hoodie for late study sessions, project sprints and community meet-ups.", tagline: "Built for late-night queries.", icon: "Code" },
  { id: "acad-notebook", name: "Data Notebook", category: "Stationery", description: "Grid pages for sketching tables, joins, dashboards and project plans.", tagline: "Schema before code.", icon: "BookOpen" },
  { id: "acad-cap", name: "Academy Cap", category: "Accessories", description: "A relaxed cap with the CloudTech mark, for campus and tech events.", tagline: "Everyday uniform.", icon: "Compass" },
  { id: "acad-stickers", name: "Data People Stickers", category: "Accessories", description: "Matte vinyl stickers for laptops and bottles: DATA PEOPLE, the CloudTech mark and a little SQL.", tagline: "SELECT * FROM ideas;", icon: "Sparkles" },
  { id: "acad-tote", name: "Academy Tote", category: "Accessories", description: "A sturdy canvas tote with room for a laptop, charger, notebook and bottle.", tagline: "Carry your stack.", icon: "ShoppingBag" },
];

export const CORPORATE_OPTIONS = [
  "Signature Polos (10+)",
  "Event T-shirts",
  "Executive Caps",
  "Hardcover Journals",
  "Executive Pens",
  "Thermal Bottles",
  "Corporate Kits (boxed)",
  "Lanyards and ID cards",
  "Academy / student kits",
  "Customised or co-branded items",
];

export const FAQ = [
  {
    q: "How do orders work if I don't pay online?",
    a: "Add pieces to your Order Request list or request a single item, and send it. You'll get a reference straight away. We then contact you by email or WhatsApp to confirm availability, the final price, payment and delivery. Nothing is charged until you agree.",
  },
  {
    q: "Can we order for a team, an event or as client gifts?",
    a: "Yes. Use the Corporate Orders form for bulk polos, event T-shirts, journals, Corporate Kits and gift boxes. Tell us about names for ID cards, an event logo or co-branding, and we'll reply with options and a quotation.",
  },
  {
    q: "Where do you deliver, and how long does it take?",
    a: "We deliver within Nigeria and can arrange delivery further afield. Timing depends on the items, the quantity and your location, so we confirm it with you before you pay.",
  },
  {
    q: "How do sizes run?",
    a: "The Signature Polo and Essential Tee come in standard sizes from S. If you're between sizes, size up for a relaxed fit, or ask us when we contact you to confirm your order.",
  },
];
