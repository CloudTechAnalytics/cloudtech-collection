"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Eye, Gift, Plus, ShieldCheck } from "lucide-react";
import { CATEGORIES, PRODUCTS, findProduct, formatPrice, type Product } from "@/data/products";
import { ProductModal } from "./ProductView";
import { useRequestList } from "./RequestList";

/** The Signature Collection: filterable grid, pop-up details, quick add to the Order Request list. */
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
    <section id="collection" className="scroll-mt-20 border-b border-line bg-white py-20 md:py-28">
      <div className="container-page">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
              <span className="h-px w-6 bg-gold" /> Official release
            </p>
            <h2 className="mt-2 font-serif text-[2.3rem] font-medium tracking-tight text-navy sm:text-[3rem]">The Signature Collection</h2>
            <p className="mt-2 max-w-xl text-[1rem] text-muted">
              Designed around the CloudTech identity, for team members, partners and clients who wear the brand into pitches, meetings and conferences.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 border border-line bg-mist p-1" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`px-3.5 py-1.5 text-[0.78rem] font-medium whitespace-nowrap transition-colors ${cat === c ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-line hover:text-navy"}`}
              >
                {c === "All" ? "All Pieces" : c}
              </button>
            ))}
          </div>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.id}>
              <article className="group flex h-full flex-col overflow-hidden border border-line bg-mist transition-all duration-300 hover:border-gold/60 hover:shadow-lg">
                <button type="button" onClick={() => setSelected(p)} className="relative aspect-[4/3] overflow-hidden border-b border-line bg-white text-left" aria-label={`View ${p.name}`}>
                  <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  {p.badge && <span className="absolute top-3 left-3 border border-gold/30 bg-navy px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.1em] text-white uppercase">{p.badge}</span>}
                  <span className="absolute inset-0 flex items-center justify-center bg-navy/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 text-[0.78rem] font-semibold text-navy shadow-md">
                      <Eye className="h-3.5 w-3.5 text-gold" /> View details
                    </span>
                  </span>
                </button>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-[0.72rem]">
                      <span className="font-medium tracking-[0.14em] text-gold-deep uppercase">{p.category}</span>
                      {p.category === "Apparel" && p.sizes && p.sizes.length > 1 && <span className="font-mono text-subtle">Sizes {p.sizes[0]}–{p.sizes[p.sizes.length - 1].split(" ")[0]}</span>}
                    </div>
                    <h3 className="font-serif text-[1.45rem] leading-tight font-semibold tracking-tight text-navy">
                      <button type="button" onClick={() => setSelected(p)} className="text-left hover:text-navy-3">
                        {p.name}
                      </button>
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[0.82rem] leading-relaxed text-muted">{p.subtitle}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <div>
                      <span className="block text-[0.62rem] font-medium tracking-[0.14em] text-subtle uppercase">Price</span>
                      <span className="font-serif text-[1.3rem] font-bold text-navy tabular-nums">{formatPrice(p.price)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setSelected(p)} className="inline-flex items-center gap-1 border border-line-strong px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.1em] text-navy uppercase transition-colors hover:border-navy hover:bg-navy hover:text-white">
                        Details <ArrowUpRight className="h-3 w-3 text-gold" />
                      </button>
                      <button type="button" onClick={() => quickAdd(p)} aria-label={`Add ${p.name} to your Order Request list`} title="Add to Order Request" className="bg-navy p-1.5 text-white shadow-sm hover:bg-navy-2">
                        <Plus className="h-4 w-4 text-gold" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border border-line bg-mist p-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-[1.3rem] font-semibold text-navy">Need items co-branded or personalised for your company?</h3>
            <p className="mt-0.5 text-[0.85rem] text-muted">We can add names, event logos and co-branding for teams, conferences and client gifts.</p>
          </div>
          <a href="#corporate-orders" className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.1em] whitespace-nowrap text-navy uppercase underline decoration-gold underline-offset-4 hover:text-gold-deep">
            Ask about customisation <ArrowUpRight className="h-3.5 w-3.5" />
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
    <section id="corporate-kit" className="relative scroll-mt-20 overflow-hidden bg-navy py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#C6A15B_1px,transparent_1px),linear-gradient(90deg,#C6A15B_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="container-page relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
            <span className="h-px w-8 bg-gold" /> Coordinated set <span className="h-px w-8 bg-gold" />
          </p>
          <h2 className="mt-3 font-serif text-[2.3rem] font-medium tracking-tight sm:text-[3.2rem]">The CloudTech Corporate Kit</h2>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-white/75">For meetings, conferences, client engagements and the people representing CloudTech every day.</p>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="border border-gold/30 bg-navy-2 p-2.5 shadow-2xl sm:p-4">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={kit.images[0].src} alt={kit.images[0].alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="mt-3.5 flex items-center justify-between border-t border-white/10 px-1 pt-3 text-[0.78rem] text-white/75">
                <span className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-gold" /> <span className="font-medium text-white">Seven-piece set</span>
                </span>
                <span className="font-mono text-gold tabular-nums">{formatPrice(kit.price)} per kit</span>
              </div>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-[0.78rem] text-white/60">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Names on ID cards and co-branding available for team orders
            </p>
          </div>
          <div>
            <h3 className="font-serif text-[1.8rem] font-semibold">Made to make an impression</h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-white/75">
              Every piece carries the CloudTech identity, packed in a navy gift box with a fitted insert: a considered welcome for new team members, key clients and conference
              delegations.
            </p>
            <ul className="mt-6 space-y-3.5">
              {KIT_CONTENTS.map((k) => (
                <li key={k.title} className="flex gap-3.5">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold bg-gold/20">
                    <Check className="h-2.5 w-2.5 text-gold" />
                  </span>
                  <span>
                    <span className="block text-[0.9rem] font-semibold tracking-wide">{k.title}</span>
                    <span className="text-[0.8rem] text-white/60">{k.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center">
              <button type="button" onClick={() => setOpen(true)} className="group inline-flex items-center justify-center gap-2.5 bg-gold px-6 py-3.5 whitespace-nowrap text-[0.75rem] font-semibold tracking-[0.12em] text-navy uppercase shadow-sm hover:bg-[#d4b273]">
                Request Corporate Kit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-[0.8rem] text-white/60">No upfront payment. We&apos;ll come back to you with a quotation.</span>
            </div>
          </div>
        </div>
      </div>
      <ProductModal product={open ? kit : null} onClose={() => setOpen(false)} />
    </section>
  );
}
