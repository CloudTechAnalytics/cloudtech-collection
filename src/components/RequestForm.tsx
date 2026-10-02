"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { CORPORATE_OPTIONS, ORDERABLE, findProduct } from "@/data/products";
import { submitRequest, type RequestItem, type RequestKind } from "@/lib/supabase";
import { SITE, whatsappLink } from "@/lib/site";
import { Field, Quantity, Select, TextArea } from "./Fields";
import { buttonClass } from "./Button";

const CONFIRM = "We'll contact you to confirm availability, payment and delivery.";

function Success({ reference, kind }: { reference: string; kind: RequestKind }) {
  return (
    <div className="border border-line bg-mist p-7 sm:p-9" role="status" aria-live="polite">
      <CheckCircle2 aria-hidden className="h-8 w-8 text-gold-deep" />
      <h3 className="display mt-4 text-[2.1rem] text-navy">Thank you. Your request is in.</h3>
      <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{kind === "corporate" || kind === "kit" ? "We'll be in touch within two working days with options, timing and a quotation." : CONFIRM}</p>
      <p className="mt-6 text-[0.78rem] font-semibold tracking-[0.14em] text-navy uppercase">Your reference</p>
      <p className="mt-1 font-mono text-[1.35rem] tracking-[0.06em] text-navy">{reference}</p>
      <p className="mt-6 text-[0.9rem] text-muted">
        Questions in the meantime? Email{" "}
        <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`CloudTech Collection ${reference}`)}`} className="font-medium text-navy underline decoration-gold underline-offset-4">
          {SITE.email}
        </a>{" "}
        or{" "}
        <a href={whatsappLink(`Hello CloudTech, about my Collection request ${reference}.`)} target="_blank" rel="noopener noreferrer" className="font-medium text-navy underline decoration-gold underline-offset-4">
          message us on WhatsApp
        </a>
        .
      </p>
      <Link href="/collection" className={buttonClass("outline", "mt-8")}>
        Back to the collection
      </Link>
    </div>
  );
}

/** Items chosen in a general request: product, size and quantity per line. */
function ItemLines({ items, onChange }: { items: RequestItem[]; onChange: (items: RequestItem[]) => void }) {
  const update = (i: number, patch: Partial<RequestItem>) => onChange(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  return (
    <fieldset className="space-y-4">
      <legend className="text-[0.78rem] font-semibold tracking-[0.08em] text-navy uppercase">
        Items <span className="text-gold-deep">*</span>
      </legend>
      {items.map((it, i) => {
        const p = findProduct(it.slug ?? "");
        return (
          <div key={i} className="grid gap-4 border border-line p-4 sm:grid-cols-[1fr_9rem_auto] sm:items-end">
            <Select label="Item" required value={it.slug} onChange={(e) => update(i, { slug: e.target.value, product: findProduct(e.target.value)?.name ?? "", size: undefined, variant: undefined })}>
              {ORDERABLE.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.name}
                </option>
              ))}
            </Select>
            {p?.sizes && p.sizes.length > 1 ? (
              <Select label="Size" required value={it.size ?? ""} onChange={(e) => update(i, { size: e.target.value })}>
                <option value="" disabled>
                  Choose
                </option>
                {p.sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            ) : (
              <div className="hidden sm:block" />
            )}
            <div className="flex items-end gap-3">
              <Quantity value={it.quantity} onChange={(n) => update(i, { quantity: n })} label="Qty" />
              {items.length > 1 && (
                <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="mb-3 text-subtle hover:text-danger" aria-label={`Remove ${it.product}`}>
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        );
      })}
      {items.length < 10 && (
        <button
          type="button"
          onClick={() => onChange([...items, { slug: ORDERABLE[0].slug, product: ORDERABLE[0].name, quantity: 1 }])}
          className="inline-flex items-center gap-2 text-[0.85rem] font-semibold tracking-[0.06em] text-navy uppercase hover:text-gold-deep"
        >
          <Plus className="h-4 w-4" /> Add another item
        </button>
      )}
    </fieldset>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

/**
 * The order / corporate request form.
 *   item:      one product, chosen on its page (size, variant, quantity passed in)
 *   general:   one or more items, chosen here
 *   corporate: bulk and event orders
 *   kit:       the boxed Corporate Kit
 */
export function RequestForm({ kind, item, initialItems }: { kind: RequestKind; item?: RequestItem; initialItems?: RequestItem[] }) {
  const [items, setItems] = useState<RequestItem[]>(initialItems?.length ? initialItems : [{ slug: ORDERABLE[0].slug, product: ORDERABLE[0].name, quantity: 1 }]);
  const [products, setProducts] = useState<string[]>(kind === "kit" ? ["Corporate Kits (boxed)"] : []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  if (reference) return <Success reference={reference} kind={kind} />;

  const bulk = kind === "corporate" || kind === "kit";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // filled only by bots
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (kind === "general" && items.some((it) => findProduct(it.slug ?? "")?.sizes && (findProduct(it.slug ?? "")?.sizes?.length ?? 0) > 1 && !it.size)) {
      setError("Choose a size for each clothing item.");
      return;
    }
    if (kind === "corporate" && products.length === 0) {
      setError("Tick at least one product you're interested in.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const ref = await submitRequest({
        kind,
        name: v("name"),
        email: v("email"),
        phone: v("phone"),
        organization: v("organization"),
        items: kind === "item" && item ? [item] : kind === "general" ? items : [],
        products,
        quantity: bulk ? Number(v("quantity")) || null : null,
        event_date: v("event_date"),
        location: v("location"),
        message: v("message"),
      });
      setReference(ref);
      window.scrollTo({ top: (document.getElementById("request")?.offsetTop ?? 120) - 100, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't send your request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6" noValidate={false}>
      {kind === "general" && <ItemLines items={items} onChange={setItems} />}

      <Grid>
        <Field label="Full name" name="name" required autoComplete="name" maxLength={120} />
        {bulk && <Field label="Organisation" name="organization" required={kind === "corporate"} autoComplete="organization" maxLength={160} />}
        <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={200} />
        <Field label="Phone / WhatsApp" name="phone" type="tel" required={!bulk} autoComplete="tel" maxLength={40} placeholder="0803 000 0000" />
        {bulk && <Field label={kind === "kit" ? "Number of kits" : "Number of items"} name="quantity" type="number" inputMode="numeric" min={1} max={100000} required placeholder={kind === "kit" ? "e.g. 12" : "e.g. 50"} />}
        {bulk && <Field label="Event or delivery date" name="event_date" type="date" />}
        <Field label="Delivery location" name="location" required={!bulk} autoComplete="address-level2" maxLength={200} placeholder="City, state" />
      </Grid>

      {kind === "corporate" && (
        <fieldset>
          <legend className="text-[0.78rem] font-semibold tracking-[0.08em] text-navy uppercase">
            Products interested in <span className="text-gold-deep">*</span>
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CORPORATE_OPTIONS.map((o) => (
              <label key={o} className={`flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-[0.92rem] transition-colors ${products.includes(o) ? "border-navy bg-mist" : "border-line hover:border-line-strong"}`}>
                <input type="checkbox" className="h-4 w-4 accent-[#071B33]" checked={products.includes(o)} onChange={(e) => setProducts(e.target.checked ? [...products, o] : products.filter((x) => x !== o))} />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <TextArea
        label={bulk ? "Tell us about it" : "Additional notes"}
        name="message"
        required={kind === "corporate"}
        maxLength={4000}
        placeholder={
          kind === "kit"
            ? "Who the kits are for, the size mix for polos (e.g. 4 M, 6 L, 2 XL), and any names for ID cards."
            : kind === "corporate"
              ? "The occasion, the people it's for, customisation (names, event logos), and any budget or timing."
              : "Anything we should know: gift wrapping, a delivery window, a name for an ID card."
        }
      />

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite">{error && <p className="border border-danger/30 bg-danger/5 px-4 py-3 text-[0.92rem] text-danger">{error}</p>}</div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[0.88rem] leading-relaxed text-muted">{bulk ? "No payment now. We'll come back to you with options and a quotation." : `No payment now. ${CONFIRM}`}</p>
        <button type="submit" disabled={busy} className={buttonClass("primary", "shrink-0")}>
          {busy ? "Sending…" : kind === "item" ? "Request This Item" : kind === "kit" ? "Request Corporate Kit" : kind === "corporate" ? "Request a Corporate Order" : "Send Request"}
        </button>
      </div>
    </form>
  );
}
