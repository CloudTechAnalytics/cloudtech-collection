"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Plus } from "lucide-react";
import { CATEGORIES, PRODUCTS, findProduct, formatPrice, type Product } from "@/data/products";
import { buttonClass } from "./Button";
import { ProductModal } from "./ProductView";
import { useRequestList } from "./RequestList";
import { SectionHeading } from "./SectionHeading";

/** The Signature Collection: filterable grid, pop-up details, quick add to the order request. */
export function SignatureCollection() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const { add, toast } = useRequestList();
  const shown = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  const quickAdd = (p: Product) => {
    const size = p.sizes && p.sizes.length > 1 ? p.sizes[Math.min(1, p.sizes.length - 1)] : p.sizes?.[0];
    add(p.slug, 1, size);
    toast(`Added ${p.name}${size && p.sizes!.length > 1 ? ` (size ${size})` : ""} to your Order Request list.`);
  };

  return (
    <section id="collection" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            title={
              <>
                The Signature <span className="text-brass-accent">Collection.</span>
              </>
            }
            intro="Designed around the CloudTech identity, for team members, partners and clients who wear the brand into pitches, meetings and conferences."
          />
          <div className="flex flex-wrap gap-2 lg:shrink-0 lg:flex-nowrap" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-[0.875rem] whitespace-nowrap transition-colors ${
                  cat === c ? "border-ink bg-ink text-ivory" : "border-line-strong text-ink hover:border-ink/40"
                }`}
              >
                {c === "All" ? "All pieces" : c}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-colors hover:border-brass/50">
                <button type="button" onClick={() => setSelected(p)} className="relative aspect-[4/3] overflow-hidden bg-sand text-left" aria-label={`View ${p.name}`}>
                  <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  {p.badge && <span className="absolute top-3 left-3 rounded-full bg-paper/95 px-3 py-1 text-[0.75rem] font-medium text-brass-dark">{p.badge}</span>}
                </button>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.75rem] font-medium tracking-[0.16em] text-brass-dark uppercase">{p.category}</p>
                  <h3 className="mt-2 font-serif text-[1.4rem] leading-tight text-ink">
                    <button type="button" onClick={() => setSelected(p)} className="text-left hover:text-brass-dark">
                      {p.name}
                    </button>
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-[0.9rem] leading-relaxed text-muted">{p.subtitle}</p>
                  {p.category === "Apparel" && p.sizes && p.sizes.length > 1 && (
                    <p className="mt-2 text-[0.8rem] text-subtle">
                      Sizes {p.sizes[0]} to {p.sizes[p.sizes.length - 1].split(" ")[0]}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="text-[1.15rem] font-semibold text-ink tabular-nums">{formatPrice(p.price)}</span>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setSelected(p)} className="rounded-lg px-3 py-2 text-[0.875rem] font-semibold text-ink hover:bg-sand">
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => quickAdd(p)}
                        aria-label={`Add ${p.name} to your Order Request list`}
                        title="Add to order request"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-brass-button text-on-brass transition-colors hover:bg-brass-button-hover"
                      >
                        <Plus aria-hidden className="h-4.5 w-4.5" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-paper p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <h3 className="font-serif text-[1.35rem] text-ink">Need pieces co-branded or personalised?</h3>
            <p className="mt-1 text-[0.95rem] text-muted">We can add names, event logos and co-branding for teams, conferences and client gifts.</p>
          </div>
          <a href="#corporate-orders" className={buttonClass("secondary")}>
            Ask about customisation
          </a>
        </div>
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

const KIT_CONTENTS = [
  { title: "CloudTech Signature Polo", desc: "Navy piqué with the embroidered CloudTech logo" },
  { title: "CloudTech Executive Cap", desc: "Structured six-panel, embroidered CloudTech mark" },
  { title: "CloudTech Hardcover Journal", desc: "Gold foil: Ideas. Analysis. Impact." },
  { title: "CloudTech Executive Pen", desc: "Navy metal with gold fittings" },
  { title: "CloudTech Thermal Bottle", desc: "Matte navy, insulated, gold cap band" },
  { title: "Lanyard and ID card", desc: "Woven CloudTech lanyard, personalised card" },
  { title: "Presentation gift box", desc: "Navy rigid box with fitted insert and gold foil lid" },
];

export function CorporateKit() {
  const kit = findProduct("corporate-kit")!;
  const [open, setOpen] = useState(false);
  return (
    <section id="corporate-kit" className="bg-night py-20 text-cream sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <figure className="overflow-hidden rounded-2xl border border-cream/12 bg-night-2">
          <div className="relative aspect-[4/3]">
            <Image src={kit.images[0].src} alt={kit.images[0].alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="flex items-center justify-between gap-4 border-t border-cream/12 px-5 py-3.5 text-[0.875rem]">
            <span className="font-medium text-cream">Seven-piece set</span>
            <span className="text-brass-light">{formatPrice(kit.price)} per kit</span>
          </figcaption>
        </figure>

        <div>
          <SectionHeading
            tone="night"
            title={
              <>
                The CloudTech <span className="text-brass-light">Corporate Kit.</span>
              </>
            }
            intro="Every piece carries the CloudTech identity, packed in a gift box with a fitted insert: a considered welcome for new team members, key clients and conference delegations."
          />
          <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {KIT_CONTENTS.map((k) => (
              <li key={k.title} className="flex gap-3">
                <Check aria-hidden className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brass-light" strokeWidth={2} />
                <span>
                  <span className="block text-[0.95rem] font-medium text-cream">{k.title}</span>
                  <span className="text-[0.85rem] text-cream/60">{k.desc}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button type="button" onClick={() => setOpen(true)} className={buttonClass("light")}>
              Request Corporate Kit <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            </button>
            <span className="text-[0.875rem] text-cream/60">No upfront payment. Names on ID cards and co-branding available.</span>
          </div>
        </div>
      </div>
      <ProductModal product={open ? kit : null} onClose={() => setOpen(false)} />
    </section>
  );
}
