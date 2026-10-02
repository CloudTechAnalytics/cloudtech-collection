"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export const inputCls =
  "w-full rounded-[2px] border border-line-strong bg-mist px-3 py-2.5 text-[0.95rem] text-ink placeholder:text-subtle/80 focus:border-gold focus:bg-white focus:outline-none";

export function FieldShell({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.7rem] font-semibold tracking-[0.1em] text-navy uppercase">
        {label}
        {optional ? <span className="ml-1 font-normal tracking-normal text-subtle normal-case">(optional)</span> : <span className="text-gold-deep"> *</span>}
      </span>
      {children}
    </label>
  );
}

/** Name, email, phone and delivery location, plus a hidden field that catches spam bots. */
export function ContactFields({ organization }: { organization?: "required" | "optional" }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell label="Full name">
          <input name="name" required minLength={2} maxLength={120} autoComplete="name" className={inputCls} />
        </FieldShell>
        {organization && (
          <FieldShell label="Organisation" optional={organization === "optional"}>
            <input name="organization" required={organization === "required"} maxLength={160} autoComplete="organization" className={inputCls} />
          </FieldShell>
        )}
        <FieldShell label="Email">
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputCls} />
        </FieldShell>
        <FieldShell label="Phone / WhatsApp">
          <input name="phone" type="tel" required minLength={7} maxLength={40} autoComplete="tel" placeholder="0803 000 0000" className={inputCls} />
        </FieldShell>
        <FieldShell label="Delivery location">
          <input name="location" required maxLength={200} autoComplete="address-level2" placeholder="City, state" className={inputCls} />
        </FieldShell>
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
    </>
  );
}

/** Shown once a request is saved, with its real reference. */
export function Confirmation({ reference, title, lines, onClose, closeLabel = "Return to the collection" }: { reference: string; title: string; lines: [string, string][]; onClose?: () => void; closeLabel?: string }) {
  return (
    <div className="py-6 text-center" role="status" aria-live="polite">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-navy text-gold">
        <Check className="h-7 w-7" />
      </div>
      <p className="mt-4 text-[0.7rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">Request received</p>
      <h3 className="mt-1 font-serif text-[1.9rem] font-semibold text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-[0.9rem] text-muted">We&apos;ll contact you to confirm availability, payment and delivery. Nothing is charged until you agree.</p>
      <dl className="mx-auto mt-6 max-w-sm space-y-2 border border-line bg-mist p-4 text-left font-mono text-[0.8rem]">
        <div className="flex justify-between gap-4 border-b border-line pb-2">
          <dt className="text-subtle">Reference</dt>
          <dd className="font-bold text-navy">{reference}</dd>
        </div>
        {lines.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-subtle">{k}</dt>
            <dd className="text-right text-navy">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-[0.82rem] text-muted">
        Questions?{" "}
        <a href={whatsappLink(`Hello CloudTech, about my Collection request ${reference}.`)} target="_blank" rel="noopener noreferrer" className="font-medium text-navy underline decoration-gold underline-offset-4">
          WhatsApp us
        </a>{" "}
        or email{" "}
        <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`CloudTech Collection ${reference}`)}`} className="break-all font-medium text-navy underline decoration-gold underline-offset-4">
          {SITE.email}
        </a>
      </p>
      {onClose && (
        <button type="button" onClick={onClose} className="mt-7 bg-navy px-6 py-3 text-[0.72rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-navy-2">
          {closeLabel}
        </button>
      )}
    </div>
  );
}
