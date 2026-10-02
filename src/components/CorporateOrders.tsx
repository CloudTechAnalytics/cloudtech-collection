"use client";

import { useState } from "react";
import { Building2, Check, Send, Users } from "lucide-react";
import { CORPORATE_OPTIONS } from "@/data/products";
import { submitRequest } from "@/lib/supabase";
import { SITE, whatsappLink } from "@/lib/site";
import { Confirmation, FieldShell, inputCls } from "./RequestForms";

const TIERS = [
  { label: "10 – 25 items (small team or board)", min: 10 },
  { label: "25 – 50 items (department or retreat)", min: 25 },
  { label: "50 – 100 items (conference or delegation)", min: 50 },
  { label: "100 – 250 items (company-wide)", min: 100 },
  { label: "250+ items (large event)", min: 250 },
];

const POSSIBLE = ["10+ Signature Polos for a team", "Event T-shirts", "Branded notebooks and pens", "Conference kits", "Corporate gift boxes", "Customised merchandise", "Academy and student kits"];

export function CorporateOrders() {
  const [products, setProducts] = useState<string[]>(["Signature Polos (10+)", "Corporate Kits (boxed)"]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ ref: string; org: string; tier: string } | null>(null);

  const submit = async (f: FormData) => {
    if (f.get("website")) return;
    if (!products.length) return setError("Tick at least one product you're interested in.");
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const tier = TIERS.find((t) => t.label === v("tier")) ?? TIERS[0];
    setBusy(true);
    setError(null);
    try {
      const ref = await submitRequest({
        kind: "corporate",
        name: v("name"),
        organization: v("organization"),
        email: v("email"),
        phone: v("phone"),
        quantity: tier.min,
        products,
        event_date: v("event_date"),
        location: v("location"),
        message: `Quantity: ${tier.label}.\n\n${v("message")}`,
      });
      setDone({ ref, org: v("organization"), tier: tier.label });
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't send your request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="corporate-orders" className="scroll-mt-20 border-b border-line bg-white py-20 md:py-28">
      <div className="container-page">
        <div className="mb-12 max-w-3xl">
          <p className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
            <Building2 className="h-4 w-4" /> Corporate and bulk orders
          </p>
          <h2 className="mt-2 font-serif text-[2.3rem] font-medium tracking-tight text-navy sm:text-[3rem]">Need CloudTech merchandise for your team or event?</h2>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">We provide branded merchandise for corporate teams, conferences, workshops, communities and special events.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="border border-line bg-mist p-6">
              <h3 className="mb-3 font-serif text-[1.35rem] font-semibold text-navy">What you can request</h3>
              <ul className="space-y-2.5 text-[0.88rem] text-slate-700">
                {POSSIBLE.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <Check className="h-3.5 w-3.5 shrink-0 text-gold" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-gold/30 bg-navy p-6 text-white">
              <p className="mb-2 flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.16em] text-gold uppercase">
                <Users className="h-4 w-4" /> How it works
              </p>
              <ol className="list-decimal space-y-1.5 pl-4 text-[0.85rem] leading-relaxed text-white/80">
                <li>Tell us what you need, how many and by when.</li>
                <li>We reply with options, mockups where useful, and a quotation.</li>
                <li>Once you approve, we produce and deliver.</li>
              </ol>
              <p className="mt-4 text-[0.8rem] text-white/60">
                Prefer to talk?{" "}
                <a href={whatsappLink("Hello CloudTech, I'd like to discuss a corporate order from the CloudTech Collection.")} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">
                  WhatsApp us
                </a>{" "}
                or email <a href={`mailto:${SITE.email}`} className="break-all text-gold underline underline-offset-4">{SITE.email}</a>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {done ? (
              <div className="border-2 border-gold bg-mist p-6 sm:p-10">
                <Confirmation reference={done.ref} title="Corporate request received" lines={[["Organisation", done.org], ["Quantity", done.tier], ["Products", `${products.length} selected`]]} />
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void submit(new FormData(e.currentTarget));
                }}
                className="space-y-5 border border-line bg-mist p-6 shadow-sm sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldShell label="Full name">
                    <input name="name" required minLength={2} maxLength={120} autoComplete="name" className={inputCls} />
                  </FieldShell>
                  <FieldShell label="Organisation">
                    <input name="organization" required maxLength={160} autoComplete="organization" className={inputCls} />
                  </FieldShell>
                  <FieldShell label="Work email">
                    <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputCls} />
                  </FieldShell>
                  <FieldShell label="Phone / WhatsApp">
                    <input name="phone" type="tel" required minLength={7} maxLength={40} autoComplete="tel" className={inputCls} />
                  </FieldShell>
                  <FieldShell label="Number of items">
                    <select name="tier" className={inputCls}>
                      {TIERS.map((t) => (
                        <option key={t.label}>{t.label}</option>
                      ))}
                    </select>
                  </FieldShell>
                  <FieldShell label="Event or delivery date" optional>
                    <input name="event_date" type="date" className={inputCls} />
                  </FieldShell>
                </div>
                <fieldset>
                  <legend className="mb-2 text-[0.7rem] font-semibold tracking-[0.1em] text-navy uppercase">
                    Products interested in <span className="text-gold-deep">*</span>
                  </legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {CORPORATE_OPTIONS.map((o) => {
                      const on = products.includes(o);
                      return (
                        <label key={o} className={`flex cursor-pointer items-center gap-2.5 border px-3 py-2.5 text-[0.85rem] transition-colors ${on ? "border-navy bg-white" : "border-line bg-white/60 hover:border-line-strong"}`}>
                          <input type="checkbox" checked={on} onChange={() => setProducts(on ? products.filter((x) => x !== o) : [...products, o])} className="h-4 w-4 accent-[#071B33]" />
                          {o}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <FieldShell label="Delivery location">
                  <input name="location" required maxLength={200} placeholder="City, state" className={inputCls} />
                </FieldShell>
                <FieldShell label="Message">
                  <textarea name="message" required rows={4} maxLength={3800} placeholder="The occasion, who it's for, sizes, names for ID cards, event logo or co-branding, budget and timing." className={inputCls} />
                </FieldShell>
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </div>
                {error && <p className="border border-danger/30 bg-danger/5 px-3 py-2 text-[0.85rem] text-danger">{error}</p>}
                <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 bg-navy px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-navy-2 disabled:opacity-60 sm:w-auto">
                  <Send className="h-4 w-4 text-gold" /> {busy ? "Sending…" : "Request a Corporate Order"}
                </button>
                <p className="text-[0.78rem] text-muted">No commitment and no payment now. We&apos;ll reply with options and a quotation.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
