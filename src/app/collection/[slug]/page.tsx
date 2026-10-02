import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { PRODUCTS, findProduct } from "@/data/products";
import { ProductView } from "@/components/ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = findProduct((await params).slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.name,
    description: `${p.subtitle}. ${p.description}`.slice(0, 160),
    openGraph: { images: [{ url: p.images[0].src, alt: p.images[0].alt }] },
  };
}

/** A shareable page for each product; the home page shows the same view in a pop-up. */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  return (
    <section className="bg-white pt-28 pb-20 md:pt-32">
      <div className="container-page">
        <Link href="/#collection" className="mb-6 inline-flex items-center gap-1 text-[0.75rem] font-semibold tracking-[0.1em] text-muted uppercase hover:text-navy">
          <ChevronLeft className="h-4 w-4" /> The Signature Collection
        </Link>
        <ProductView product={product} />
      </div>
    </section>
  );
}
