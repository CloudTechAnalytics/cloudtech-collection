export const SITE = {
  name: "CloudTech Collection",
  parent: "CloudTech Analytics",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://collection.cloudtechanalytics.com").replace(/\/$/, ""),
  email: "cloudtechanalytics.consultant@gmail.com",
  /** Same WhatsApp line as the CloudTech Analytics website. */
  whatsapp: "2349115591877",
  tagline: "Wear the brand. Carry the idea.",
  description:
    "The official CloudTech Collection: premium merchandise for the people building, using and growing with CloudTech Analytics.",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/corporate", label: "Corporate Orders" },
  { href: "/academy", label: "Academy Collection" },
  { href: "/about", label: "About" },
] as const;

export const ECOSYSTEM = [
  {
    name: "CloudTech Analytics",
    line: "Data. Analytics. AI. Digital Solutions.",
    body: "The core consulting practice: data platforms, business intelligence, AI and digital products for growing organisations.",
    href: "https://www.cloudtechanalytics.com",
  },
  {
    name: "CloudTech Academy",
    line: "Practical learning for Data People.",
    body: "Free, practical courses in data, analytics and technology, with badges and projects learners can prove.",
    href: "https://academy.cloudtechanalytics.com",
  },
  {
    name: "The Counsel",
    line: "Legal Practice Management.",
    body: "Matters, clients, hearings, documents and billing in one place for modern law firms.",
    href: "https://thecounsels.org",
  },
  {
    name: "The Manifest",
    line: "Logistics & Freight Management.",
    body: "Shipments, documentation and freight operations, tracked end to end.",
    href: "https://the-manifest-test.vercel.app",
  },
] as const;

export const whatsappLink = (text?: string) => `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
