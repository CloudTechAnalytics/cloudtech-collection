import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { RequestForm } from "@/components/RequestForm";
import { Reveal } from "@/components/Reveal";
import { Mockup } from "@/components/mockups/Mockup";

export const metadata: Metadata = {
  title: "Corporate Orders",
  description: "Branded CloudTech merchandise for corporate teams, conferences, workshops, communities and special events: polos, kits, notebooks and gift boxes.",
};

const STEPS = [
  { t: "Tell us what you need", b: "Products, quantities, dates and any customisation such as names or an event logo." },
  { t: "We send options and a quotation", b: "Usually within two working days, with samples or mockups where useful." },
  { t: "Confirm, produce, deliver", b: "Once you approve, we produce and deliver to your office or venue." },
];

export default function CorporatePage() {
  return (
    <>
      <PageIntro eyebrow="Corporate & bulk orders" title="Need CloudTech merchandise for your team or event?" tone="navy">
        We provide branded merchandise for corporate teams, conferences, workshops, communities and special events.
      </PageIntro>

      <section className="bg-white py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="display text-[2.3rem] text-navy">What we can provide</h2>
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {["10+ polos", "Event T-shirts", "Branded notebooks", "Conference kits", "Corporate gift boxes", "Lanyards and ID cards", "Customised merchandise", "Academy / student kits"].map((o) => (
                <li key={o} className="flex items-center gap-3 border-b border-line py-2.5 text-[0.98rem] text-ink">
                  <span aria-hidden className="h-px w-3 bg-gold" /> {o}
                </li>
              ))}
            </ul>
            <ol className="mt-12 space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.t} className="flex gap-5">
                  <span className="font-serif text-[2rem] leading-none text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-navy">{s.t}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-muted">{s.b}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120} className="relative aspect-[4/5] overflow-hidden">
            <Mockup spec={{ mockup: "kit", label: "A CloudTech corporate kit" }} className="absolute inset-0 h-full w-full" />
          </Reveal>
        </div>
      </section>

      <section id="request" className="scroll-mt-20 border-t border-line bg-mist py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Request a corporate order</p>
          <span className="gold-rule mt-4" />
          <h2 className="display mt-5 text-[2.6rem] text-navy">Tell us about your order</h2>
          <p className="mt-3 text-muted">No commitment and no payment now. We&apos;ll reply with options, timing and a quotation.</p>
          <div className="mt-10 border border-line bg-white p-6 sm:p-10">
            <RequestForm kind="corporate" />
          </div>
        </div>
      </section>
    </>
  );
}
