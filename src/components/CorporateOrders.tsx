"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CORPORATE_OPTIONS } from "@/data/products";
import { submitRequest } from "@/lib/supabase";
import { SITE, whatsappLink } from "@/lib/site";
import { buttonClass } from "./Button";
import { Confirmation, FieldShell, FormError, inputCls } from "./RequestForms";
import { SectionHeading } from "./SectionHeading";

const TIERS = [
  { label: "10 – 25 items (small team or board)", min: 10 },
  { label: "25 – 50 items (department or retreat)", min: 25 },
  { label: "50 – 100 items (conference or delegation)", min: 50 },
  { label: "100 – 250 items (company-wide)", min: 100 },
  { label: "250+ items (large event)", min: 250 },
];

const POSSIBLE = ["10+ Signature Polos for a team", "Event T-shirts", "Branded notebooks and pens", "Conference kits", "Corporate gift boxes", "Customised merchandise", "Academy and student kits"];

const STEPS = ["Tell us what you need, how many and by when.", "We reply with options, mockups where useful, and a quotation.", "Once you approve, we produce and deliver."];

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
    <section id="corporate-orders" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            title={
              <>
                Merchandise for your <span className="text-brass-accent">team or event.</span>
              </>
            }
            intro="We provide branded merchandise for corporate teams, conferences, workshops, communities and special events."
          />
          <ul className="mt-8 space-y-3 text-[0.95rem] text-ink-soft">
            {POSSIBLE.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <Check aria-hidden className="h-4 w-4 shrink-0 text-brass-dark" strokeWidth={2} /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-line pt-8">
            <h3 className="font-serif text-[1.25rem] text-ink">How it works</h3>
            <ol className="mt-4 space-y-3">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-baseline gap-4 text-[0.95rem] text-muted">
                  <span className="w-3 shrink-0 font-serif text-[1.2rem] text-brass-accent">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[0.9rem] text-muted">
              Prefer to talk?{" "}
              <a href={whatsappLink("Hello CloudTech, I'd like to discuss a corporate order from the CloudTech Collection.")} target="_blank" rel="noopener noreferrer" className="font-medium text-brass-dark underline decoration-brass/40 underline-offset-2 hover:decoration-brass">
                WhatsApp us
              </a>{" "}
              or email{" "}
              <a href={`mailto:${SITE.email}`} className="font-medium break-all text-brass-dark underline decoration-brass/40 underline-offset-2 hover:decoration-brass">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {done ? (
            <div className="rounded-2xl border border-line bg-paper p-6 sm:p-10">
              <Confirmation reference={done.ref} title="Corporate request received" lines={[["Organisation", done.org], ["Quantity", done.tier], ["Products", `${products.length} selected`]]} />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submit(new FormData(e.currentTarget));
              }}
              className="space-y-5 rounded-2xl border border-line bg-paper p-6 sm:p-8"
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
                <legend className="mb-2 text-[0.875rem] font-medium text-ink">Products you&apos;re interested in</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CORPORATE_OPTIONS.map((o) => {
                    const on = products.includes(o);
                    return (
                      <label key={o} className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[0.9rem] transition-colors ${on ? "border-brass bg-brass-pale/40 text-ink" : "border-line-strong text-ink-soft hover:border-ink/30"}`}>
                        <input type="checkbox" checked={on} onChange={() => setProducts(on ? products.filter((x) => x !== o) : [...products, o])} className="h-4 w-4 accent-[#8C6A2C]" />
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
              {error && <FormError>{error}</FormError>}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <button type="submit" disabled={busy} className={buttonClass("primary")}>
                  {busy ? "Sending…" : "Request a corporate order"}
                </button>
                <p className="text-[0.85rem] text-muted">No commitment and no payment now. We&apos;ll reply with options and a quotation.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
