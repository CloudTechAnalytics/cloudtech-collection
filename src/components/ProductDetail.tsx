"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import { ProductImage } from "./ProductImage";
import { Options, Quantity } from "./Fields";
import { RequestForm } from "./RequestForm";
import { buttonClass } from "./Button";

export function Gallery({ product }: { product: Product }) {
  const [i, setI] = useState(0);
  const img = product.images[i] ?? product.images[0];
  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <div key={i} className="absolute inset-0 animate-[fade_0.6s_ease-out]">
          <ProductImage image={img} priority sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>
      {product.images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3" role="group" aria-label="Product views">
          {product.images.map((im, j) => (
            <button
              key={j}
              type="button"
              onClick={() => setI(j)}
              aria-label={`Show view ${j + 1}: ${im.alt}`}
              aria-pressed={i === j}
              className={`relative aspect-[4/5] overflow-hidden bg-mist transition-[outline-color] outline outline-1 -outline-offset-1 ${i === j ? "outline-navy" : "outline-transparent hover:outline-line-strong"}`}
            >
              <ProductImage image={im} sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function OrderPanel({ product }: { product: Product }) {
  const sized = (product.sizes?.length ?? 0) > 1;
  const [size, setSize] = useState(sized ? "" : (product.sizes?.[0] ?? ""));
  const [variant, setVariant] = useState(product.variants?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);

  // The phone-only sticky bar appears once the main button has scrolled out of view.
  useEffect(() => {
    const el = document.getElementById("request-button");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const start = () => {
    if (sized && !size) {
      setNeed(true);
      document.getElementById("size-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setOpen(true);
    setTimeout(() => panel.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  if (!product.available)
    return (
      <div className="mt-8 border border-line bg-mist p-6">
        <p className="eyebrow">Coming soon</p>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">The Academy Collection isn&apos;t available to order yet. Tell us you&apos;re interested and we&apos;ll let you know when it is.</p>
        <Link href={`/request?kind=general`} className={buttonClass("outline", "mt-5")}>
          Register interest
        </Link>
      </div>
    );

  return (
    <>
      <div className="mt-8 space-y-6">
        {product.variants && product.variants.length > 1 && <Options label="Finish" options={product.variants} value={variant} onChange={setVariant} />}
        {sized && (
          <div id="size-picker">
            <Options label="Size" options={product.sizes!} value={size} onChange={(s) => (setSize(s), setNeed(false))} />
            {need && <p className="mt-2 text-[0.88rem] text-danger">Choose a size first.</p>}
          </div>
        )}
        <Quantity value={qty} onChange={setQty} />
      </div>
      <button id="request-button" type="button" onClick={start} className={buttonClass("primary", "mt-8 w-full sm:w-auto sm:min-w-72")}>
        Request This Item
      </button>
      <p className="mt-4 text-[0.88rem] text-muted">No payment now. We&apos;ll contact you to confirm availability, payment and delivery.</p>

      {open && (
        <div ref={panel} id="request" className="mt-10 scroll-mt-28 border-t border-line pt-10">
          <p className="eyebrow">Request this item</p>
          <h2 className="display mt-3 text-[2.2rem] text-navy">{product.name}</h2>
          <p className="mt-2 text-[0.95rem] text-muted">
            {[variant, size && `Size ${size}`, `Quantity ${qty}`].filter(Boolean).join(" · ")} · {formatPrice(product.price)}
          </p>
          <div className="mt-8">
            <RequestForm kind={product.slug === "corporate-kit" ? "kit" : "item"} item={{ product: product.name, slug: product.slug, quantity: qty, size: size || undefined, variant: variant || undefined }} />
          </div>
        </div>
      )}

      {/* Phones: keep the request button in reach. */}
      {!open && (
        <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 sm:hidden ${showBar ? "translate-y-0" : "translate-y-full"}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-serif text-[1.15rem] font-semibold text-navy">{product.name}</p>
              <p className="text-[0.8rem] text-muted">{formatPrice(product.price)}</p>
            </div>
            <button type="button" onClick={start} className={buttonClass("primary", "shrink-0 px-4 py-3")}>
              Request
            </button>
          </div>
        </div>
      )}
    </>
  );
}
