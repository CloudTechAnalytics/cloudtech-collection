import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { PRODUCTS, findProduct, formatPrice } from "@/data/products";
import { Gallery, OrderPanel } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = findProduct((await params).slug);
  return p ? { title: p.name, description: `${p.tagline} ${p.description}`.slice(0, 160) } : { title: "Not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  const more = PRODUCTS.filter((p) => p.id !== product.id && p.line === product.line).slice(0, 3);
  const lineLabel = product.line === "academy" ? "The Academy Collection" : product.line === "corporate" ? "For teams and events" : "The Signature Collection";

  return (
    <>
      <div className="container-page pt-8">
        <Link href="/collection" className="inline-flex items-center gap-1 text-[0.8rem] font-medium tracking-[0.06em] text-muted uppercase hover:text-navy">
          <ChevronLeft aria-hidden className="h-4 w-4" /> The Collection
        </Link>
      </div>
      <section className="container-page grid gap-10 pt-6 pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Gallery product={product} />
        <div className="lg:pt-6">
          <p className="eyebrow">{lineLabel}</p>
          <h1 className="display mt-4 text-[2.8rem] text-navy sm:text-[3.5rem]">{product.name}</h1>
          <p className="mt-4 text-[1.2rem] font-medium text-navy">{formatPrice(product.price)}</p>
          <span className="gold-rule mt-6" />
          <p className="mt-6 text-[1.04rem] leading-relaxed text-muted">{product.description}</p>
          <ul className="mt-6 space-y-2 text-[0.95rem] text-ink">
            {product.details.map((d) => (
              <li key={d} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                {d}
              </li>
            ))}
          </ul>
          <OrderPanel product={product} />
        </div>
      </section>
      {more.length > 0 && (
        <section className="border-t border-line bg-mist py-20">
          <div className="container-page">
            <h2 className="display text-[2.3rem] text-navy">From the same collection</h2>
            <ul className="mt-10 grid gap-x-8 gap-y-12 min-[480px]:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
