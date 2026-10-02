import type { Metadata } from "next";
import { findProduct } from "@/data/products";
import type { RequestKind } from "@/lib/supabase";
import { SITE, whatsappLink } from "@/lib/site";
import { PageIntro } from "@/components/PageIntro";
import { RequestForm } from "@/components/RequestForm";

export const metadata: Metadata = {
  title: "Request an Order",
  description: "Request pieces from the CloudTech Collection. We'll contact you to confirm availability, payment and delivery.",
};

const TITLES: Record<RequestKind, [string, string]> = {
  general: ["Request an Order", "Choose the pieces you'd like. There's no payment now: we'll contact you to confirm availability, payment and delivery."],
  item: ["Request an Order", "We'll contact you to confirm availability, payment and delivery."],
  kit: ["Request the Corporate Kit", "Polo, cap, journal, pen, bottle, lanyard and ID card in a navy gift box. Tell us how many and who they're for, and we'll come back with a quotation."],
  corporate: ["Corporate Orders", "Tell us what your team or event needs and we'll reply with options and a quotation."],
};

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ kind?: string; item?: string }> }) {
  const sp = await searchParams;
  const kind: RequestKind = sp.kind === "kit" || sp.kind === "corporate" ? sp.kind : "general";
  const pre = sp.item ? findProduct(sp.item) : undefined;
  const [title, intro] = TITLES[kind];
  return (
    <>
      <PageIntro eyebrow="CloudTech Collection" title={title} tone="mist">
        {intro}
      </PageIntro>
      <section id="request" className="scroll-mt-20 bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-3xl">
            <RequestForm kind={kind} initialItems={pre?.available ? [{ slug: pre.slug, product: pre.name, quantity: 1 }] : undefined} />
          </div>
          <aside className="h-fit border border-line bg-mist p-6 text-[0.94rem] leading-relaxed text-muted">
            <p className="font-semibold text-navy">How requests work</p>
            <ol className="mt-3 list-decimal space-y-2 pl-4">
              <li>Send your request. You&apos;ll get a reference straight away.</li>
              <li>We confirm availability, the price and delivery with you by email or WhatsApp.</li>
              <li>You pay, and we deliver.</li>
            </ol>
            <p className="mt-6 font-semibold text-navy">Prefer to talk?</p>
            <p className="mt-2">
              <a href={whatsappLink("Hello CloudTech, I'd like to order from the CloudTech Collection.")} target="_blank" rel="noopener noreferrer" className="text-navy underline decoration-gold underline-offset-4">
                WhatsApp us
              </a>{" "}
              or email{" "}
              <a href={`mailto:${SITE.email}`} className="break-all text-navy underline decoration-gold underline-offset-4">
                {SITE.email}
              </a>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
