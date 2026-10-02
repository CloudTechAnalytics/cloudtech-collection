import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/collection/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]">
          <ProductImage image={product.images[0]} priority={priority} />
        </div>
        {!product.available && (
          <span className="absolute top-4 left-4 border border-navy/15 bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-navy uppercase">
            Coming soon
          </span>
        )}
      </div>
      <h3 className="mt-5 font-serif text-[1.45rem] leading-tight font-semibold text-navy">{product.name}</h3>
      <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">{product.tagline}</p>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-[0.88rem] font-medium text-navy">{formatPrice(product.price)}</span>
        <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold-deep uppercase transition-colors group-hover:text-navy">View details</span>
      </div>
    </Link>
  );
}
