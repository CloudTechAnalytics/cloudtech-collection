import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/collection", "/corporate", "/academy", "/about", "/request"];
  return [...pages.map((p) => ({ url: `${SITE.url}${p}` })), ...PRODUCTS.map((p) => ({ url: `${SITE.url}/collection/${p.slug}` }))];
}
