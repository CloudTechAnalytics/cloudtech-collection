import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url }, ...PRODUCTS.map((p) => ({ url: `${SITE.url}/collection/${p.slug}` }))];
}
