import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ACADEMY, SIGNATURE, findProduct } from "@/data/products";
import { ECOSYSTEM } from "@/lib/site";
import { Mockup } from "../mockups/Mockup";
import { ProductCard } from "../ProductCard";
import { ButtonLink } from "../Button";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-page pt-12 pb-10 text-center sm:pt-20">
        <Reveal>
          <p className="eyebrow">The official CloudTech Collection</p>
          <h1 className="display mx-auto mt-6 max-w-4xl text-[3.1rem] text-navy sm:text-[4.6rem] lg:text-[5.6rem]">
            Wear the brand.
            <br />
            <span className="italic text-navy-3">Carry the idea.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[1.08rem] leading-relaxed text-muted sm:text-[1.18rem]">
            The official CloudTech Collection: premium merchandise for the people behind the work, the ideas and the impact.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/collection" arrow>
              Explore Collection
            </ButtonLink>
            <ButtonLink href="/corporate" variant="outline">
              Corporate Orders
            </ButtonLink>
          </div>
          <p className="mt-8 text-[0.74rem] font-medium tracking-[0.28em] text-subtle uppercase">
            CloudTech Analytics <span className="mx-2 text-gold">•</span> Academy <span className="mx-2 text-gold">•</span> Community
          </p>
        </Reveal>
      </div>
      <Reveal delay={150} className="container-page pb-6">
        <div className="relative aspect-[16/10] overflow-hidden bg-mist">
          <Mockup spec={{ mockup: "hero", label: "The CloudTech Collection: polo, tee, cap, journal, pen, bottle, mug, lanyard and gift box" }} className="absolute inset-0 h-full w-full" />
        </div>
      </Reveal>
    </section>
  );
}

export function Signature() {
  return (
    <section id="signature" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="The collection" title="The Signature Collection">
            Designed around the CloudTech identity.
          </SectionHeading>
          <ButtonLink href="/collection" variant="ghost" arrow>
            View all pieces
          </ButtonLink>
        </Reveal>
        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNATURE.filter((p) => p.featured).map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const KIT_ITEMS = ["Signature Polo", "Executive Cap", "Hardcover Journal", "Executive Pen", "Thermal Bottle", "Lanyard", "ID card", "Navy gift box"];

export function CorporateKit() {
  return (
    <section className="bg-navy py-24 text-white sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <Reveal className="relative aspect-[4/5] overflow-hidden">
          <Mockup spec={{ mockup: "kit", label: "The CloudTech Corporate Kit: polo, cap, journal, pen, bottle, lanyard and ID card with a navy gift box" }} className="absolute inset-0 h-full w-full" />
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading eyebrow="For teams" title="The CloudTech Corporate Kit" light>
            For meetings, conferences, client engagements and the people representing CloudTech every day.
          </SectionHeading>
          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.98rem] text-white/85">
            {KIT_ITEMS.map((k) => (
              <li key={k} className="flex items-center gap-3">
                <Check aria-hidden className="h-4 w-4 shrink-0 text-gold" /> {k}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/request?kind=kit" variant="gold" arrow>
              Request Corporate Kit
            </ButtonLink>
            <ButtonLink href={`/collection/${findProduct("corporate-kit")?.slug ?? "corporate-kit"}`} variant="outline-light">
              See what&apos;s inside
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AcademyTeaser() {
  return (
    <section className="bg-[#FBF8F2] py-24 sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <div className="flex items-center gap-3">
            <p className="eyebrow">The Academy Collection</p>
            <span className="border border-gold-deep/40 px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.18em] text-gold-deep uppercase">Coming soon</span>
          </div>
          <span className="gold-rule mt-4" />
          <h2 className="display mt-5 text-[3rem] text-navy sm:text-[4rem]">For Data People.</h2>
          <p className="mt-2 font-serif text-[1.5rem] italic text-navy-3">Learn. Build. Prove It.</p>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            CloudTech Academy is built to make practical data education more accessible. The Academy Collection brings that same identity into the real world.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {ACADEMY.map((p) => (
              <li key={p.id}>
                <Link href={`/collection/${p.slug}`} className="inline-block border border-navy/15 bg-white px-3.5 py-2 text-[0.88rem] text-navy transition-colors hover:border-navy">
                  {p.name.replace("Academy ", "")}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ECOSYSTEM[1].href} arrow>
              Explore CloudTech Academy
            </ButtonLink>
            <ButtonLink href="/academy" variant="outline">
              See the Academy Collection
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative aspect-[4/5] overflow-hidden">
          <Mockup spec={{ mockup: "academy-set", label: "The Academy Collection: hoodie, tote, notebook and stickers" }} className="absolute inset-0 h-full w-full" />
        </Reveal>
      </div>
    </section>
  );
}

export function BrandStory() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Reveal className="container-page max-w-3xl text-center">
        <p className="eyebrow">Our idea</p>
        <span className="gold-rule mx-auto mt-4" />
        <h2 className="display mt-6 text-[2.8rem] text-navy sm:text-[3.6rem]">More Than Merchandise</h2>
        <p className="mt-8 font-serif text-[1.55rem] leading-[1.45] text-navy sm:text-[1.8rem]">
          CloudTech Collection is an extension of the CloudTech brand, created for the people who work with us, learn with us, build with us and believe in what we&apos;re
          building.
        </p>
        <p className="mt-8 text-[1.05rem] leading-relaxed text-muted">
          This is not simply merchandise. It is a way to carry the CloudTech identity beyond the screen.
        </p>
      </Reveal>
    </section>
  );
}

export function Ecosystem() {
  return (
    <section className="border-t border-line bg-mist py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Part of something bigger" title="The CloudTech Ecosystem">
            CloudTech is a technology and data company first. The Collection is one part of a wider family of products and initiatives.
          </SectionHeading>
        </Reveal>
        <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((e, i) => (
            <Reveal as="li" key={e.name} delay={i * 80} className="bg-white">
              <a href={e.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-7 transition-colors hover:bg-[#FCFDFE]">
                <span className="font-serif text-[1.6rem] leading-tight font-semibold text-navy">{e.name}</span>
                <span className="mt-2 text-[0.82rem] font-semibold tracking-[0.04em] text-gold-deep">{e.line}</span>
                <span className="mt-4 text-[0.94rem] leading-relaxed text-muted">{e.body}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[0.75rem] font-semibold tracking-[0.16em] text-navy uppercase transition-colors group-hover:text-gold-deep">
                  Explore <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CorporateCta() {
  return (
    <section className="bg-navy-2 py-20 text-white">
      <Reveal className="container-page flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold!">Corporate & bulk</p>
          <h2 className="display mt-4 text-[2.4rem] sm:text-[3rem]">Need CloudTech merchandise for your team or event?</h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-white/75">
            Branded merchandise for corporate teams, conferences, workshops, communities and special events.
          </p>
        </div>
        <ButtonLink href="/corporate" variant="gold" arrow className="shrink-0">
          Request a Corporate Order
        </ButtonLink>
      </Reveal>
    </section>
  );
}
