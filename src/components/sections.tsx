import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { FAQ } from "@/data/products";
import { ECOSYSTEM, SITE, whatsappLink } from "@/lib/site";
import { ButtonLink } from "./Button";
import { CloudTechLogo, CloudTechMark, ProductMark } from "./Logo";
import { SectionHeading } from "./SectionHeading";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-12 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-14 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-6">
          <p className="kicker flex items-center gap-2.5">
            <CloudTechMark tone="brass" className="h-4 w-4" />
            The official CloudTech Collection
          </p>
          <h1 id="hero-title" className="mt-6 font-serif text-[2.6rem] leading-[1.08] font-medium tracking-[-0.015em] text-ink min-[400px]:text-[2.9rem] sm:text-[3.3rem] xl:text-[3.6rem]">
            Wear the brand. Carry the <span className="text-brass-accent">idea.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-[1.1875rem]">
            Polos, tees, caps, journals and gift kits carrying the CloudTech logo, for the people who work with us, learn with us and build with us.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#collection" arrow>
              Explore the collection
            </ButtonLink>
            <ButtonLink href="/#corporate-orders" variant="secondary">
              Corporate orders
            </ButtonLink>
          </div>
          <p className="mt-5 text-[0.875rem] text-subtle">No checkout: send a request and we confirm price, payment and delivery with you.</p>
        </div>

        <div className="lg:col-span-6">
          <figure className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_24px_60px_-30px_rgba(23,23,23,0.35)]">
            <div className="relative aspect-[16/10]">
              <Image
                src="/products/collection-flatlay.jpg"
                alt="The CloudTech Collection: navy polo, white tee, cap, hardcover journal, pen, bottle and presentation box, all with the CloudTech logo"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-3.5 text-[0.875rem]">
              <span className="font-medium text-ink">The Signature Collection</span>
              <span className="text-subtle">2026 edition</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "1", title: "Choose your pieces", body: "Add items to your order request, with sizes and quantities." },
  { n: "2", title: "We confirm with you", body: "CloudTech contacts you with availability, the final price and delivery." },
  { n: "3", title: "Pay and receive", body: "You pay only once you've agreed. We deliver within Nigeria." },
];

/** How ordering works, laid out like the facts row on the main website. */
export function HowItWorks() {
  return (
    <section aria-label="How ordering works" className="border-y border-line bg-paper">
      <ol className="container-page grid gap-x-8 gap-y-8 py-10 md:grid-cols-3 lg:py-12">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="font-serif text-[2.2rem] leading-none font-medium text-brass-accent">{s.n}</span>
            <span>
              <span className="block font-semibold text-ink">{s.title}</span>
              <span className="mt-1 block text-[0.9rem] leading-snug text-muted">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

const PILLARS = [
  { title: "Technology first", body: "CloudTech is a technology, data and digital solutions company. The Collection carries that identity off the screen and into the room." },
  { title: "Made to be worn", body: "Pieces chosen to look right in a client meeting, a pitch, a conference or on a university stage." },
  { title: "One ecosystem", body: "A common thread between CloudTech Analytics, CloudTech Academy learners, The Counsel and The Manifest." },
];

export function BrandStory() {
  return (
    <section id="story" className="bg-night py-20 text-cream sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="night"
            title={
              <>
                More than <span className="text-brass-light">merchandise.</span>
              </>
            }
            intro="CloudTech Collection is an extension of the CloudTech brand, made for the people who work with us, learn with us, build with us and believe in what we're building."
          />
          <div className="mt-10 flex items-center gap-5 rounded-2xl border border-cream/12 bg-night-2 p-6">
            <CloudTechMark tone="reversed" className="h-16 w-16 shrink-0" />
            <p className="text-[0.95rem] leading-relaxed text-cream/70">
              The same logo appears on our software, our Academy certificates and our client work. Here it&apos;s embroidered, foiled and printed, so every piece is unmistakably CloudTech.
            </p>
          </div>
        </div>
        <ul className="divide-y divide-cream/12 border-y border-cream/12 lg:col-span-6 lg:col-start-7">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-4 py-8">
              <span className="font-serif text-[1.6rem] leading-none text-brass-light">0{i + 1}</span>
              <span>
                <h3 className="font-serif text-[1.5rem] text-cream">{p.title}</h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-cream/70">{p.body}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const ECO_MARK = { "CloudTech Analytics": null, "CloudTech Academy": "academy", "The Counsel": "counsel", "The Manifest": "manifest" } as const;

export function Ecosystem() {
  return (
    <section id="ecosystem" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading title="Part of the CloudTech family." intro="CloudTech is a technology, data and digital solutions company. The Collection is one official initiative within it." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((e) => {
            const mark = ECO_MARK[e.name];
            return (
              <li key={e.name}>
                <a href={e.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-brass/50">
                  {mark ? (
                    <ProductMark product={mark} className="h-11 w-11" />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-night">
                      <CloudTechMark tone="reversed" className="h-6 w-6" />
                    </span>
                  )}
                  <h3 className="mt-5 font-serif text-[1.35rem] text-ink">{e.name}</h3>
                  <p className="mt-1 text-[0.85rem] font-medium text-brass-dark">{e.line}</p>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">{e.body}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink group-hover:text-brass-dark">
                    Visit <ArrowUpRight aria-hidden className="h-4 w-4" />
                    <span className="sr-only">{e.name} (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <SectionHeading className="lg:col-span-4" title="Questions, answered." intro="How individual requests, corporate orders and delivery work." />
        <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-[1.25rem] text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus aria-hidden className="h-5 w-5 shrink-0 text-brass-dark group-open:hidden" strokeWidth={1.75} />
                <Minus aria-hidden className="hidden h-5 w-5 shrink-0 text-brass-dark group-open:block" strokeWidth={1.75} />
              </summary>
              <p className="pr-8 pb-4 text-[0.975rem] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ColumnTitle({ children }: { children: string }) {
  return <h2 className="mb-5 text-[0.875rem] font-medium text-cream/50">{children}</h2>;
}

const linkCls = "link-underline text-[0.9375rem] text-cream/75 transition-colors hover:text-cream";

function External({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-1.5`}>
      {children}
      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 text-brass-light" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

const COLLECTION_LINKS = [
  ["The Signature Collection", "/#collection"],
  ["The Corporate Kit", "/#corporate-kit"],
  ["Corporate and bulk orders", "/#corporate-orders"],
  ["Academy Collection", "/#academy"],
  ["Our story", "/#story"],
] as const;

const SOCIAL = [
  ["LinkedIn", "https://www.linkedin.com/company/cloudtech-analytics/"],
  ["X (Twitter)", "https://twitter.com/cloudtechanalytics"],
  ["Instagram", "https://instagram.com/jd_cta"],
] as const;

/** The same footer as www.cloudtechanalytics.com, with the Collection's links. */
export function Footer() {
  return (
    <footer className="bg-night text-cream">
      <div className="container-page pt-16 pb-10 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <CloudTechLogo tone="reversed" size="lg" />
            <p className="mt-7 max-w-sm text-[0.975rem] leading-relaxed text-cream/70">
              CloudTech Collection is an official CloudTech Analytics initiative: merchandise for the people building, using and growing with CloudTech.
            </p>
            <ul className="mt-7 space-y-2 text-[0.9375rem]">
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all text-cream hover:text-brass-light">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={whatsappLink("Hello CloudTech, I have a question about the CloudTech Collection.")} target="_blank" rel="noopener noreferrer" className="text-cream hover:text-brass-light">
                  +234 911 559 1877 <span className="text-cream/50">(WhatsApp)</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li className="text-cream/60">Lagos, Nigeria</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:pl-10">
            <nav aria-label="Collection">
              <ColumnTitle>Collection</ColumnTitle>
              <ul className="space-y-3.5">
                {COLLECTION_LINKS.map(([l, h]) => (
                  <li key={h}>
                    <Link href={h} className={linkCls}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="CloudTech">
              <ColumnTitle>CloudTech</ColumnTitle>
              <ul className="space-y-3.5">
                {ECOSYSTEM.map((e) => (
                  <li key={e.name}>
                    <External href={e.href}>{e.name}</External>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <ColumnTitle>Follow</ColumnTitle>
              <ul className="space-y-3.5">
                {SOCIAL.map(([l, h]) => (
                  <li key={h}>
                    <External href={h}>{l}</External>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/12 pt-8 text-[0.8125rem] text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CloudTech Analytics. All rights reserved.</p>
          <p>
            An official CloudTech Analytics initiative ·{" "}
            <Link href="/admin" className="text-cream/70 underline-offset-4 hover:text-brass-light hover:underline">
              Staff sign-in
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
