import type { Metadata } from "next";
import { PRODUCTS, type Line } from "@/data/products";
import { PageIntro } from "@/components/PageIntro";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "The Collection",
  description: "The Signature Collection, the Corporate Kit and the coming Academy Collection: premium CloudTech merchandise, available to request.",
};

const GROUPS: { line: Line; title: string; intro: string }[] = [
  { line: "signature", title: "The Signature Collection", intro: "Designed around the CloudTech identity." },
  { line: "corporate", title: "For teams and events", intro: "Kits and essentials for the people representing CloudTech every day." },
  { line: "academy", title: "The Academy Collection", intro: "For Data People. Coming soon." },
];

export default function CollectionPage() {
  return (
    <>
      <PageIntro eyebrow="The official CloudTech Collection" title="The Collection">
        Every piece carries the CloudTech identity: navy, white and a careful touch of gold. Choose a piece and request it; we&apos;ll confirm availability, payment and
        delivery with you directly.
      </PageIntro>
      {GROUPS.map((g, gi) => {
        const items = PRODUCTS.filter((p) => p.line === g.line);
        return (
          <section key={g.line} className={`py-16 sm:py-20 ${gi % 2 ? "bg-mist" : "bg-white"}`} aria-labelledby={`g-${g.line}`}>
            <div className="container-page">
              <Reveal className="flex flex-col gap-2 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 id={`g-${g.line}`} className="display text-[2.3rem] text-navy sm:text-[2.8rem]">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-muted">{g.intro}</p>
                </div>
                <p className="text-[0.8rem] tracking-[0.12em] text-subtle uppercase">
                  {items.length} {items.length === 1 ? "piece" : "pieces"}
                </p>
              </Reveal>
              <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 min-[480px]:grid-cols-2 lg:grid-cols-3">
                {items.map((p, i) => (
                  <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
                    <ProductCard product={p} priority={gi === 0 && i < 3} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
      <section className="bg-navy py-16 text-white">
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="display max-w-xl text-[2rem]">Ordering for a team or an event?</p>
          <ButtonLink href="/corporate" variant="gold" arrow>
            Corporate Orders
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
