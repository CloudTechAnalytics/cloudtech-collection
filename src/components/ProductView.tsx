"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, X } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { submitRequest } from "@/lib/supabase";
import { buttonClass } from "./Button";
import { useRequestList } from "./RequestList";
import { Confirmation, ContactFields, FieldShell, FormError, inputCls } from "./RequestForms";
import { CloudTechMark } from "./Logo";

function Gallery({ product }: { product: Product }) {
  const [i, setI] = useState(0);
  const [emblem, setEmblem] = useState(false);
  const img = product.images[i] ?? product.images[0];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-sand">
        {emblem ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-night p-6 text-center">
            <CloudTechMark tone="reversed" className="h-24 w-24" />
            <p className="mt-5 font-serif text-[1.2rem] text-cream">The CloudTech mark</p>
            <p className="mt-1 text-[0.875rem] text-cream/65">One gold square and four light squares, on every piece</p>
          </div>
        ) : (
          <Image key={img.src} src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="animate-[fade_0.5s_ease-out] object-cover" priority />
        )}
        <button
          type="button"
          onClick={() => setEmblem(!emblem)}
          className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-paper/95 px-3 py-2 text-[0.8rem] font-medium text-ink shadow-sm hover:bg-paper"
        >
          <CloudTechMark className="h-3.5 w-3.5" /> {emblem ? "View product" : "Inspect the logo"}
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
              className={`relative h-16 w-20 overflow-hidden rounded-lg border-2 bg-sand ${i === j && !emblem ? "border-brass" : "border-transparent hover:border-line-strong"}`}
            >
              <Image src={im.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <p className="rounded-xl border border-line bg-ivory p-4 text-[0.875rem] leading-relaxed text-muted">
        <span className="mb-0.5 block font-medium text-ink">An official CloudTech Analytics piece</span>
        Every item carries the CloudTech logo and is made to order for the people who represent CloudTech.
      </p>
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
            <button type="button" onClick={() => setMode("details")} className="mb-1 text-[0.875rem] text-muted underline underline-offset-2 hover:text-ink">
              ← Back to details
            </button>
            <h3 className="font-serif text-[1.9rem] text-ink">{kit ? "Request the Corporate Kit" : "Request This Item"}</h3>
          </div>
          <div className="text-right">
            <div className="text-[0.8rem] text-subtle">Estimated total</div>
            <div className="text-[1.25rem] font-semibold text-ink tabular-nums">{total === null ? "To be confirmed" : formatPrice(total)}</div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 rounded-xl border border-line bg-ivory p-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-sand">
              <Image src={product.images[0].src} alt="" fill sizes="48px" className="object-cover" />
            </div>
            <div className="text-[0.875rem]">
              <div className="font-medium text-ink">{product.name}</div>
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
          {error && <FormError>{error}</FormError>}
          <button type="submit" disabled={busy} className={buttonClass("primary", "w-full")}>
            {busy ? "Sending…" : "Submit Request"}
          </button>
          <p className="text-center text-[0.8rem] text-muted">No payment now. We&apos;ll contact you to confirm availability, payment and delivery.</p>
        </form>
      </div>
    );

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
      <Gallery product={product} />
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <span className="text-[0.75rem] font-medium tracking-[0.16em] text-brass-dark uppercase">{product.category}</span>
          {product.badge && <span className="rounded-full border border-brass/40 px-2.5 py-0.5 text-[0.75rem] font-medium text-brass-dark">{product.badge}</span>}
        </div>
        <h2 className="mt-3 font-serif text-[2rem] leading-tight tracking-[-0.01em] text-ink sm:text-[2.3rem]">{product.name}</h2>
        <p className="mt-2 text-[1.5rem] font-semibold text-ink tabular-nums">{formatPrice(product.price)}</p>
        <p className="mt-4 text-[0.975rem] leading-relaxed text-muted">{product.description}</p>
        {product.backTreatment && <p className="mt-3 border-l-2 border-brass pl-3 font-serif text-[1.1rem] text-ink">Back: &ldquo;{product.backTreatment}&rdquo;</p>}

        {product.colour && (
          <p className="mt-5 flex items-center gap-2 text-[0.9rem] text-muted">
            <span className="h-4 w-4 rounded-full border border-line-strong" style={{ background: product.colour.hex }} /> {product.colour.name}
          </p>
        )}

        {sized && (
          <fieldset className="mt-6">
            <legend className="text-[0.875rem] font-medium text-ink">Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes!.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={`min-w-11 rounded-lg border px-3 py-2 text-[0.875rem] transition-colors ${size === s ? "border-ink bg-ink text-ivory" : "border-line-strong text-ink hover:border-ink/40"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center rounded-lg border border-line-strong" role="group" aria-label="Quantity">
            <button type="button" aria-label="Fewer" disabled={qty <= 1} onClick={() => setQty(qty - 1)} className="p-3 text-ink disabled:opacity-30">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center tabular-nums">{qty}</span>
            <button type="button" aria-label="More" onClick={() => setQty(Math.min(500, qty + 1))} className="p-3 text-ink">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {total !== null && qty > 1 && <span className="text-[0.9rem] text-muted">Estimated {formatPrice(total)}</span>}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              add(product.slug, qty, size);
              toast(`Added ${product.name}${qty > 1 ? ` (${qty})` : ""} to your Order Request list.`);
              onClose?.();
            }}
            className={buttonClass("secondary")}
          >
            <ShoppingBag aria-hidden className="h-4 w-4" strokeWidth={1.75} /> Add to Order Request
          </button>
          <button type="button" onClick={() => setMode("form")} className={buttonClass("primary")}>
            {kit ? "Request Corporate Kit" : "Request This Item"} <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          </button>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[0.85rem] text-muted">
          <ShieldCheck aria-hidden className="h-4 w-4 text-brass-dark" strokeWidth={1.75} /> No payment now. We confirm availability, payment and delivery with you.
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <h3 className="font-serif text-[1.2rem] text-ink">{kit ? "What's in the box" : "Details"}</h3>
          <ul className="mt-3 space-y-2 text-[0.925rem] text-ink-soft">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-brass" />
                {d}
              </li>
            ))}
          </ul>
          <dl className="mt-5 divide-y divide-line border-y border-line text-[0.9rem]">
            {Object.entries(product.specifications).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2.5">
                <dt className="text-subtle">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          {onClose && (
            <Link href={`/collection/${product.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:text-brass-dark hover:decoration-brass">
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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-night/60 p-3 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={product.name} className="relative w-full max-w-5xl animate-[fade_0.2s_ease-out] rounded-2xl border border-line bg-paper text-ink shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-paper/90 text-muted hover:bg-sand hover:text-ink">
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <div className="max-h-[92vh] overflow-y-auto p-5 sm:p-8">
          <ProductView key={product.slug} product={product} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
