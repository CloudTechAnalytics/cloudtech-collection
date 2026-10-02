import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Award, BarChart3, ChevronDown, Cpu, GraduationCap, HelpCircle, Layers, Mail, MapPin, MessageCircle, Scale, Sparkles, Truck } from "lucide-react";
import { FAQ } from "@/data/products";
import { ECOSYSTEM, SITE, whatsappLink } from "@/lib/site";
import { Logo, Mark } from "./Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <p className="mb-4 flex flex-wrap items-center gap-2.5 text-[0.72rem] font-medium tracking-[0.2em] text-muted uppercase">
            <Mark size={16} />
            <span>CloudTech Analytics</span>
            <span className="text-gold" aria-hidden>•</span>
            <span>Academy</span>
            <span className="text-gold" aria-hidden>•</span>
            <span>Community</span>
          </p>
          <h1 className="font-serif text-[2.9rem] leading-[1.06] font-medium tracking-tight text-navy sm:text-[3.6rem] lg:text-[4.3rem]">
            Wear the brand.
            <br />
            <span className="font-normal text-gold-deep italic">Carry the idea.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted sm:text-[1.15rem]">
            The official CloudTech Collection: premium merchandise for the people behind the work, the ideas and the impact. Made for boardrooms, keynotes and every day you
            represent the brand.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#collection" className="group inline-flex items-center gap-2.5 bg-navy px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-white uppercase shadow-sm hover:bg-navy-2">
              Explore Collection <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#corporate-orders" className="inline-flex items-center border border-line-strong bg-white px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-navy uppercase hover:border-gold">
              Corporate Orders
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[0.8rem] text-muted">
            <span>
              <strong className="font-semibold text-ink">Request, don&apos;t checkout:</strong> we confirm price, payment and delivery with you
            </span>
            <span className="hidden text-line-strong sm:inline">/</span>
            <span>
              <strong className="font-semibold text-ink">Teams and events:</strong> kits, co-branding and bulk orders
            </span>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative border border-line bg-white p-2 shadow-xl sm:p-3">
            <span aria-hidden className="pointer-events-none absolute -top-1 -right-1 h-8 w-8 border-t-2 border-r-2 border-gold" />
            <span aria-hidden className="pointer-events-none absolute -bottom-1 -left-1 h-8 w-8 border-b-2 border-l-2 border-gold" />
            <div className="relative aspect-[16/10] overflow-hidden bg-mist">
              <Image
                src="/products/collection-flatlay.jpg"
                alt="The CloudTech Collection: navy polo, white tee, cap, hardcover journal, pen, bottle and presentation box, all with the CloudTech logo"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 border-t border-line px-1 pt-3 text-[0.78rem] text-muted sm:justify-end">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="font-medium text-navy">The Signature Collection</span>
                <span className="hidden text-subtle sm:inline">· Navy, white and gold</span>
              </span>
              <span className="font-mono text-subtle tabular-nums">2026 Edition</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden max-w-xs border border-gold/30 bg-navy p-4 text-white shadow-lg sm:block">
            <p className="mb-2 flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.18em] text-white/70 uppercase">
              <Mark size={18} tone="dark" /> The official collection
            </p>
            <p className="font-serif text-[1rem] text-gold italic">&ldquo;Not simply merchandise. A way to carry the CloudTech identity beyond the screen.&rdquo;</p>
          </div>
        </div>
      </div>
      <div className="mt-14 flex justify-center">
        <a href="#collection" aria-label="Scroll to the Signature Collection" className="p-2">
          <ArrowDown className="h-4 w-4 animate-bounce text-gold motion-reduce:animate-none" />
        </a>
      </div>
    </section>
  );
}

const PILLARS = [
  { Icon: Cpu, title: "Technology first", body: "CloudTech is a technology, data and digital solutions company. The Collection carries that identity off the screen and into the room." },
  { Icon: Award, title: "Made to be worn", body: "Pieces chosen to look right in a client meeting, a pitch, a conference or on a university stage." },
  { Icon: Layers, title: "One ecosystem", body: "A common thread between CloudTech Analytics, CloudTech Academy learners, The Counsel and The Manifest." },
];

export function BrandStory() {
  return (
    <section id="story" className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-navy py-20 text-white md:py-28">
      <span aria-hidden className="absolute top-0 left-1/2 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
          <Sparkles className="h-3.5 w-3.5" /> Our idea
        </p>
        <h2 className="mt-4 font-serif text-[2.5rem] font-medium tracking-tight sm:text-[3.6rem]">More Than Merchandise</h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-[1.05rem] leading-relaxed text-white/75 sm:text-[1.15rem]">
          <p>CloudTech Collection is an extension of the CloudTech brand, created for the people who work with us, learn with us, build with us and believe in what we&apos;re building.</p>
          <p className="font-serif text-[1.4rem] text-gold italic sm:text-[1.6rem]">
            This is not simply merchandise.
            <br className="hidden sm:inline" /> It is a way to carry the CloudTech identity beyond the screen.
          </p>
        </div>
        <div className="mt-14 grid gap-8 border border-gold/30 bg-navy-2 p-8 text-left sm:p-10 md:grid-cols-12 md:items-center">
          <div className="flex flex-col items-center justify-center border border-white/10 bg-navy p-6 md:col-span-4">
            <Mark size={96} tone="dark" />
            <span className="mt-4 font-mono text-[0.72rem] font-semibold tracking-[0.16em] text-gold uppercase">The CloudTech mark</span>
          </div>
          <div className="md:col-span-8">
            <h3 className="font-serif text-[1.7rem] font-semibold">One mark, on every piece</h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-white/75">
              The same CloudTech logo appears on our software, our Academy certificates and our work for clients. On the Collection it&apos;s embroidered in gold and cream
              on fabric, foiled on journals and boxes, and printed on the tee, so every piece is unmistakably CloudTech.
            </p>
            <div className="mt-6">
              <Logo tone="dark" sub="ANALYTICS" size={40} />
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
          {PILLARS.map(({ Icon, title, body }) => (
            <div key={title} className="border border-white/10 bg-navy-2/80 p-6">
              <span className="mb-4 flex h-8 w-8 items-center justify-center border border-gold/30 bg-navy text-gold">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="font-serif text-[1.25rem] font-semibold">{title}</h3>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-white/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ECO_ICONS = { "CloudTech Analytics": BarChart3, "CloudTech Academy": GraduationCap, "The Counsel": Scale, "The Manifest": Truck } as const;
const ECO_KIND = { "CloudTech Analytics": "Core practice", "CloudTech Academy": "Education and community", "The Counsel": "Legal technology", "The Manifest": "Logistics technology" } as const;

export function Ecosystem() {
  return (
    <section id="ecosystem" className="scroll-mt-20 border-b border-line bg-mist py-20 md:py-28">
      <div className="container-page">
        <div className="mb-14 max-w-3xl">
          <p className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
            <span className="h-px w-6 bg-gold" /> The parent brand and its products
          </p>
          <h2 className="mt-2 font-serif text-[2.3rem] font-medium tracking-tight text-navy sm:text-[3rem]">The CloudTech Ecosystem</h2>
          <p className="mt-3 text-[1rem] leading-relaxed text-muted">
            CloudTech is a technology, data, analytics and digital solutions company. The CloudTech Collection is one official initiative within it.
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((e) => {
            const Icon = ECO_ICONS[e.name];
            return (
              <li key={e.name}>
                <a href={e.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col justify-between border border-line bg-white p-6 transition-all hover:border-gold hover:shadow-md">
                  <div>
                    <span className="mb-4 flex h-10 w-10 items-center justify-center bg-navy text-gold transition-colors group-hover:bg-navy-2">
                      {e.name === "CloudTech Analytics" ? <Mark size={22} tone="dark" /> : <Icon className="h-5 w-5" />}
                    </span>
                    <p className="mb-1 text-[0.68rem] font-semibold tracking-[0.12em] text-subtle uppercase">{ECO_KIND[e.name]}</p>
                    <h3 className="font-serif text-[1.4rem] font-semibold text-navy">{e.name}</h3>
                    <p className="mt-1 mb-3 text-[0.8rem] font-medium text-gold-deep">{e.line}</p>
                    <p className="text-[0.82rem] leading-relaxed text-muted">{e.body}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-4 text-[0.72rem] font-semibold tracking-[0.1em] text-navy uppercase group-hover:text-gold-deep">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
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
    <section className="border-b border-line bg-white py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
            <HelpCircle className="h-4 w-4" /> How ordering works
          </p>
          <h2 className="mt-2 font-serif text-[2.2rem] font-medium tracking-tight text-navy sm:text-[2.7rem]">Questions, answered</h2>
          <p className="mt-2 text-[0.92rem] text-muted">How individual requests, corporate orders and delivery work.</p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2 font-serif text-[1.25rem] font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 pr-8 text-[0.92rem] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#051426] pt-16 pb-12 text-white">
      <div className="container-page">
        <div className="grid gap-10 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="dark" />
            <p className="mt-4 max-w-sm text-[0.85rem] leading-relaxed text-white/70">
              <strong className="font-semibold text-white">CloudTech Collection</strong> is an official CloudTech Analytics initiative: merchandise for the people building,
              using and growing with CloudTech.
            </p>
            <ul className="mt-5 space-y-2 text-[0.82rem] text-white/60">
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold" /> Lagos, Nigeria
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold" />
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5 text-gold" />
                <a href={whatsappLink("Hello CloudTech, I have a question about the CloudTech Collection.")} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp +234 911 559 1877
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="CloudTech ecosystem" className="md:col-span-3">
            <h2 className="mb-4 text-[0.72rem] font-semibold tracking-[0.16em] text-gold uppercase">CloudTech</h2>
            <ul className="space-y-2.5 text-[0.85rem] text-white/75">
              {ECOSYSTEM.map((e) => (
                <li key={e.name}>
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {e.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Collection" className="md:col-span-3">
            <h2 className="mb-4 text-[0.72rem] font-semibold tracking-[0.16em] text-gold uppercase">Collection</h2>
            <ul className="space-y-2.5 text-[0.85rem] text-white/75">
              {[
                ["The Signature Collection", "/#collection"],
                ["The Corporate Kit", "/#corporate-kit"],
                ["Academy Collection (coming soon)", "/#academy"],
                ["Corporate and bulk orders", "/#corporate-orders"],
                ["Our story", "/#story"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <h2 className="mb-4 text-[0.72rem] font-semibold tracking-[0.16em] text-gold uppercase">Follow</h2>
            <ul className="space-y-2.5 text-[0.85rem] text-white/75">
              {[
                ["LinkedIn", "https://www.linkedin.com/company/cloudtech-analytics/"],
                ["X (Twitter)", "https://twitter.com/cloudtechanalytics"],
                ["Instagram", "https://instagram.com/jd_cta"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-[0.78rem] text-white/50 sm:flex-row">
          <p>
            <span className="font-medium text-white/80">CloudTech Collection</span> · An official CloudTech Analytics initiative.
          </p>
          <p>© 2026 CloudTech Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
