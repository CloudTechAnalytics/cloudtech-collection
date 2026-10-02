import type { Metadata } from "next";
import { ACADEMY } from "@/data/products";
import { ECOSYSTEM } from "@/lib/site";
import { ButtonLink } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Mockup } from "@/components/mockups/Mockup";

export const metadata: Metadata = {
  title: "The Academy Collection",
  description: "For Data People. Merchandise for the CloudTech Academy community: tees, hoodies, notebooks, caps, stickers and totes. Coming soon.",
};

export default function AcademyPage() {
  return (
    <>
      <section className="bg-[#FBF8F2]">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <p className="eyebrow">The Academy Collection</p>
              <span className="border border-gold-deep/40 px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.18em] text-gold-deep uppercase">Coming soon</span>
            </div>
            <span className="gold-rule mt-4" />
            <h1 className="display mt-6 text-[3.4rem] text-navy sm:text-[5rem]">For Data People.</h1>
            <p className="mt-3 font-serif text-[1.7rem] italic text-navy-3">Learn. Build. Prove It.</p>
            <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-muted">
              CloudTech Academy is built to make practical data education more accessible. The Academy Collection brings that same identity into the real world: for
              learners, study groups, campus communities and everyone who works with data.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={ECOSYSTEM[1].href} arrow>
                Explore CloudTech Academy
              </ButtonLink>
              <ButtonLink href="/request?kind=general" variant="outline">
                Register interest
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative aspect-[4/5] overflow-hidden">
            <Mockup spec={{ mockup: "academy-set", label: "The Academy Collection" }} className="absolute inset-0 h-full w-full" />
          </Reveal>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container-page">
          <h2 className="display text-[2.4rem] text-navy">The first pieces</h2>
          <p className="mt-2 text-muted">Slightly younger than the Signature Collection, and unmistakably CloudTech.</p>
          <ul className="mt-12 grid gap-x-8 gap-y-14 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {ACADEMY.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
