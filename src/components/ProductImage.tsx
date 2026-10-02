import Image from "next/image";
import type { ProductImage as Img } from "@/data/products";
import { Mockup, type MockupKey } from "./mockups/Mockup";

/** A product image that fills its box: the real photo when `src` is set, otherwise the drawn studio mockup. */
export function ProductImage({ image, sizes = "(min-width: 1024px) 33vw, 100vw", priority }: { image: Img; sizes?: string; priority?: boolean }) {
  if (image.src) return <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />;
  const m = image as Extract<Img, { mockup: MockupKey }>;
  return <Mockup spec={{ mockup: m.mockup, palette: m.palette, view: m.view, label: m.alt }} className="absolute inset-0 h-full w-full" />;
}
