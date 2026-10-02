"use client";

import { useState } from "react";
import { ArrowUpRight, BookOpen, Check, Code, Compass, ShoppingBag, Sparkles, Terminal } from "lucide-react";
import { ACADEMY_ITEMS, type AcademyItem } from "@/data/products";
import { ECOSYSTEM } from "@/lib/site";
import { submitRequest } from "@/lib/supabase";
import { buttonClass } from "./Button";
import { ProductMark } from "./Logo";
import { SectionHeading } from "./SectionHeading";

const ICONS: Record<AcademyItem["icon"], typeof Terminal> = { Terminal, Code, BookOpen, Compass, Sparkles, ShoppingBag };

/** The Academy Collection: coming soon, with a waitlist that's saved as a request. */
export function Academy() {
  const [interest, setInterest] = useState("All Academy pieces");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const join = async (f: FormData) => {
    if (f.get("website")) return;
    setBusy(true);
    setError(null);
    try {
      await submitRequest({
        kind: "general",
        name: String(f.get("name") ?? "").trim(),
        email: String(f.get("email") ?? "").trim(),
        products: [`Academy waitlist: ${interest}`],
        message: `Academy Collection waitlist. Interested in: ${interest}.`,
      });
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't add you. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const field = "w-full rounded-lg border border-line-strong bg-paper px-3.5 py-3 text-[0.95rem] text-ink placeholder:text-subtle focus:border-brass focus:outline-none";

  return (
    <section id="academy" className="border-b border-line bg-paper py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <ProductMark product="academy" className="h-11 w-11" />
              <span className="leading-tight">
                <span className="block font-serif text-[1.15rem] font-semibold text-ink">CloudTech Academy</span>
                <span className="text-[0.7rem] font-medium tracking-[0.2em] text-brass-dark uppercase">Collection · coming soon</span>
              </span>
            </div>
            <SectionHeading
              title={
                <>
                  For <span className="text-brass-accent">Data People.</span>
                </>
              }
              intro="CloudTech Academy makes practical data education more accessible. The Academy Collection brings that identity into the real world: everyday pieces for learners, analysts and builders."
            />
          </div>
          <a href={ECOSYSTEM[1].href} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost", "self-start md:self-end")}>
            Explore CloudTech Academy <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMY_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.id} className="flex flex-col rounded-2xl border border-line bg-ivory p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brass-pale text-brass-dark">
                    <Icon aria-hidden className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </span>
                  <span className="rounded-full border border-brass/40 px-2.5 py-0.5 text-[0.75rem] font-medium text-brass-dark">Coming soon</span>
                </div>
                <p className="mt-5 text-[0.75rem] font-medium tracking-[0.16em] text-subtle uppercase">{item.category}</p>
                <h3 className="mt-1.5 font-serif text-[1.3rem] text-ink">{item.name}</h3>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">{item.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <span className="text-[0.85rem] text-brass-dark">{item.tagline}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setInterest(item.name);
                      document.getElementById("academy-notify")?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="shrink-0 rounded-lg px-2.5 py-1.5 text-[0.875rem] font-semibold text-ink hover:bg-sand"
                  >
                    Notify me
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div id="academy-notify" className="mt-10 rounded-2xl border border-line bg-ivory p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h3 className="font-serif text-[1.7rem] leading-tight text-ink">Be the first to know when it launches.</h3>
              <p className="mt-2 text-[0.95rem] text-muted">Leave your name and email and we&apos;ll tell you when it&apos;s ready. Nothing else.</p>
            </div>
            <div className="lg:col-span-7">
              {done ? (
                <p className="flex items-center gap-3 rounded-xl border border-brass/40 bg-brass-pale/50 p-4 text-[0.95rem] text-ink" role="status">
                  <Check aria-hidden className="h-5 w-5 shrink-0 text-brass-dark" /> You&apos;re on the list. We&apos;ll email you on launch day.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void join(new FormData(e.currentTarget));
                  }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <label className="sr-only" htmlFor="wl-name">
                    Your name
                  </label>
                  <input id="wl-name" name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Your name" className={`${field} sm:w-44`} />
                  <label className="sr-only" htmlFor="wl-email">
                    Email
                  </label>
                  <input id="wl-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="Your email" className={`${field} flex-1`} />
                  <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <button type="submit" disabled={busy} className={buttonClass("primary")}>
                    {busy ? "Joining…" : "Join the list"}
                  </button>
                </form>
              )}
              {error && <p className="mt-3 text-[0.875rem] text-danger">{error}</p>}
              <p className="mt-3 text-[0.85rem] text-subtle">
                Interested in: <span className="font-medium text-brass-dark">{interest}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
