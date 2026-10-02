"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Send, ShieldCheck, ShoppingBag, Sparkles, X } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { submitRequest } from "@/lib/supabase";
import { useRequestList } from "./RequestList";
import { Confirmation, ContactFields, FieldShell, inputCls } from "./RequestForms";
import { Mark } from "./Logo";

function Gallery({ product }: { product: Product }) {
  const [i, setI] = useState(0);
  const [emblem, setEmblem] = useState(false);
  const img = product.images[i] ?? product.images[0];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-mist">
        {emblem ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy p-6 text-center">
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="relative border border-gold/40 bg-navy-2 p-7 shadow-inner">
              <Mark size={84} tone="dark" />
            </div>
            <p className="relative mt-4 text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">The CloudTech mark</p>
            <p className="relative mt-1 text-[0.8rem] text-white/70">One gold square and four light squares, on every piece</p>
          </div>
        ) : (
          <Image key={img.src} src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="animate-[fade_0.5s_ease-out] object-cover" priority />
        )}
        <button
          type="button"
          onClick={() => setEmblem(!emblem)}
          className="absolute right-3 bottom-3 flex items-center gap-1.5 border border-gold/40 bg-navy px-3 py-1.5 text-[0.72rem] font-medium text-white shadow-md hover:bg-navy-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-gold" /> {emblem ? "View product" : "Inspect the logo"}
        </button>
      </div>
      {product.images.length > 1 && (
        <div className="flex gap-3" role="group" aria-label="Product views">
          {product.images.map((im, j) => (
            <button
              key={im.src}
              type="button"
              onClick={() => (setI(j), setEmblem(false))}
              aria-label={`View ${j + 1}: ${im.alt}`}
              aria-pressed={i === j && !emblem}
              className={`relative h-16 w-20 overflow-hidden border bg-mist ${i === j && !emblem ? "border-navy ring-1 ring-navy" : "border-line hover:border-line-strong"}`}
            >
              <Image src={im.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="border border-line bg-mist p-4 text-[0.82rem] text-muted">
        <span className="mb-1 block font-semibold text-navy">An official CloudTech Analytics piece</span>
        Every item carries the CloudTech logo and is made to order for the people who represent CloudTech.
      </div>
    </div>
  );
}

/** The full product view: used in the pop-up on the home page and on /collection/[slug]. */
export function ProductView({ product, onClose }: { product: Product; onClose?: () => void }) {
  const { add, toast } = useRequestList();
  const sized = (product.sizes?.length ?? 0) > 1;
  const [size, setSize] = useState(sized ? product.sizes![Math.min(1, product.sizes!.length - 1)] : product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [mode, setMode] = useState<"details" | "form" | "done">("details");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ref, setRef] = useState<{ ref: string; name: string; location: string } | null>(null);
  const kit = product.category === "Kits";
  const total = product.price === null ? null : product.price * qty;

  const submit = async (f: FormData) => {
    if (f.get("website")) return;
    const v = (k: string) => String(f.get(k) ?? "").trim();
    setBusy(true);
    setError(null);
    try {
      const r = await submitRequest({
        kind: kit ? "kit" : "item",
        name: v("name"),
        email: v("email"),
        phone: v("phone"),
        organization: v("organization"),
        location: v("location"),
        message: v("message"),
        quantity: kit ? qty : null,
        items: [{ product: product.name, slug: product.slug, quantity: qty, size }],
        products: kit ? ["Corporate Kits (boxed)"] : [],
      });
      setRef({ ref: r, name: v("name").split(" ")[0], location: v("location") });
      setMode("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't send your request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (mode === "done" && ref)
    return (
      <Confirmation
        reference={ref.ref}
        title={`Thank you, ${ref.name}`}
        lines={[
          ["Item", `${product.name}${size ? ` · ${size}` : ""}`],
          ["Quantity", String(qty)],
          ["Delivery", ref.location],
          ["Estimated total", total === null ? "To be confirmed" : formatPrice(total)],
        ]}
        onClose={onClose}
      />
    );

  if (mode === "form")
    return (
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <button type="button" onClick={() => setMode("details")} className="mb-1 text-[0.8rem] text-muted underline hover:text-navy">
              ← Back to details
            </button>
            <h3 className="font-serif text-[1.9rem] font-semibold text-navy">{kit ? "Request the Corporate Kit" : "Request This Item"}</h3>
          </div>
          <div className="text-right">
            <div className="text-[0.72rem] text-subtle">Estimated total</div>
            <div className="font-serif text-[1.4rem] font-bold text-navy tabular-nums">{total === null ? "To be confirmed" : formatPrice(total)}</div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 border border-line bg-mist p-3">
            <div className="relative h-12 w-12 overflow-hidden border border-line bg-white">
              <Image src={product.images[0].src} alt="" fill sizes="48px" className="object-cover" />
            </div>
            <div className="text-[0.82rem]">
              <div className="font-semibold text-navy">{product.name}</div>
              <div className="text-muted">
                Quantity {qty}
                {size ? ` · Size ${size}` : ""}
              </div>
            </div>
          </div>
          <ContactFields organization={kit ? "optional" : undefined} />
          <FieldShell label="Notes" optional>
            <textarea
              name="message"
              rows={2}
              maxLength={4000}
              placeholder={kit ? "Who the kits are for, the polo size mix, names for ID cards…" : "Delivery timing, gift wrapping, company invoice details…"}
              className={inputCls}
            />
          </FieldShell>
          {error && <p className="border border-danger/30 bg-danger/5 px-3 py-2 text-[0.85rem] text-danger">{error}</p>}
          <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 bg-navy px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-navy-2 disabled:opacity-60">
            <Send className="h-4 w-4 text-gold" /> {busy ? "Sending…" : "Submit Request"}
          </button>
          <p className="text-center text-[0.78rem] text-muted">No payment now. We&apos;ll contact you to confirm availability, payment and delivery.</p>
        </form>
      </div>
    );

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
      <Gallery product={product} />
      <div className="flex flex-col">
        <div className="flex items-center gap-3 text-[0.72rem]">
          <span className="font-semibold tracking-[0.2em] text-gold-deep uppercase">{product.category}</span>
          {product.badge && <span className="border border-gold/40 bg-navy px-2 py-0.5 font-semibold tracking-[0.1em] text-white uppercase">{product.badge}</span>}
        </div>
        <h2 className="mt-2 font-serif text-[2rem] leading-tight font-semibold text-navy sm:text-[2.3rem]">{product.name}</h2>
        <p className="mt-2 font-serif text-[1.6rem] font-bold text-navy tabular-nums">{formatPrice(product.price)}</p>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{product.description}</p>
        {product.backTreatment && (
          <p className="mt-3 border-l-2 border-gold pl-3 font-serif text-[1.1rem] text-navy italic">Back: &ldquo;{product.backTreatment}&rdquo;</p>
        )}

        {product.colour && (
          <p className="mt-5 flex items-center gap-2 text-[0.85rem] text-muted">
            <span className="h-4 w-4 rounded-full border border-line-strong" style={{ background: product.colour.hex }} /> {product.colour.name}
          </p>
        )}

        {sized && (
          <fieldset className="mt-5">
            <legend className="text-[0.7rem] font-semibold tracking-[0.1em] text-navy uppercase">Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes!.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={`min-w-11 border px-3 py-2 text-[0.82rem] ${size === s ? "border-navy bg-navy text-white" : "border-line-strong text-navy hover:border-navy"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center border border-line-strong" role="group" aria-label="Quantity">
            <button type="button" aria-label="Fewer" disabled={qty <= 1} onClick={() => setQty(qty - 1)} className="p-3 text-navy disabled:opacity-30">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-mono">{qty}</span>
            <button type="button" aria-label="More" onClick={() => setQty(Math.min(500, qty + 1))} className="p-3 text-navy">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {total !== null && qty > 1 && <span className="text-[0.85rem] text-muted">Estimated {formatPrice(total)}</span>}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              add(product.slug, qty, size);
              toast(`Added ${product.name}${qty > 1 ? ` (${qty})` : ""} to your Order Request list.`);
              onClose?.();
            }}
            className="flex items-center justify-center gap-2 border border-navy px-5 py-3.5 text-[0.72rem] font-semibold tracking-[0.12em] text-navy uppercase hover:bg-mist"
          >
            <ShoppingBag className="h-4 w-4 text-gold" /> Add to Order Request
          </button>
          <button type="button" onClick={() => setMode("form")} className="group flex items-center justify-center gap-2 bg-navy px-5 py-3.5 text-[0.72rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-navy-2">
            {kit ? "Request Corporate Kit" : "Request This Item"} <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[0.78rem] text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" /> No payment now. We confirm availability, payment and delivery with you.
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <h3 className="text-[0.7rem] font-semibold tracking-[0.16em] text-navy uppercase">{kit ? "What's in the box" : "Details"}</h3>
          <ul className="mt-3 space-y-1.5 text-[0.88rem] text-ink">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                {d}
              </li>
            ))}
          </ul>
          <dl className="mt-5 divide-y divide-line border-y border-line text-[0.85rem]">
            {Object.entries(product.specifications).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2">
                <dt className="text-subtle">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          {onClose && (
            <Link href={`/collection/${product.slug}`} className="mt-4 inline-block text-[0.75rem] font-semibold tracking-[0.1em] text-navy uppercase underline decoration-gold underline-offset-4">
              Open the product page
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/** The product view in a pop-up. */
export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/70 p-3 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={product.name} className="relative w-full max-w-5xl animate-[fade_0.2s_ease-out] border border-line bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 text-muted hover:bg-mist hover:text-navy">
          <X className="h-5 w-5" />
        </button>
        <div className="max-h-[92vh] overflow-y-auto p-5 sm:p-8">
          <ProductView key={product.slug} product={product} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
