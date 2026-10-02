"use client";

import { useState } from "react";
import { ArrowUpRight, Bell, BookOpen, Check, Code, Compass, ShoppingBag, Sparkles, Terminal } from "lucide-react";
import { ACADEMY_ITEMS, type AcademyItem } from "@/data/products";
import { ECOSYSTEM } from "@/lib/site";
import { submitRequest } from "@/lib/supabase";

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

  return (
    <section id="academy" className="scroll-mt-20 border-b border-line bg-mist py-20 md:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.2em] uppercase">
              <span className="text-gold-deep">CloudTech Academy</span>
              <span className="text-line-strong">/</span>
              <span className="text-slate-700">Coming soon</span>
            </p>
            <h2 className="mt-3 font-serif text-[2.3rem] font-medium tracking-tight text-navy sm:text-[3rem]">For Data People.</h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted">
              CloudTech Academy is built to make practical data education more accessible. The Academy Collection brings that same identity into the real world: everyday
              pieces for learners, analysts and builders.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <p className="text-[0.7rem] font-bold tracking-[0.2em] text-gold-deep uppercase">The Academy line</p>
            <p className="font-serif text-[1.5rem] font-medium text-navy italic">&ldquo;Learn. Build. Prove It.&rdquo;</p>
            <a href={ECOSYSTEM[1].href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.1em] text-navy uppercase underline decoration-gold underline-offset-4 hover:text-gold-deep">
              Explore CloudTech Academy <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <ul className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMY_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.id} className="group flex flex-col justify-between border border-line bg-white p-6 transition-all hover:border-gold/50 hover:shadow-md">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="bg-navy p-2 text-gold">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="border border-amber-200/70 bg-amber-50 px-2 py-0.5 font-mono text-[0.68rem] font-medium tracking-[0.1em] text-amber-800 uppercase">Coming soon</span>
                  </div>
                  <p className="mb-1 text-[0.68rem] font-medium tracking-[0.12em] text-subtle uppercase">{item.category}</p>
                  <h3 className="font-serif text-[1.3rem] font-semibold text-navy">{item.name}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{item.description}</p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5 text-[0.8rem]">
                  <span className="font-serif text-gold-deep italic">{item.tagline}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setInterest(item.name);
                      document.getElementById("academy-notify")?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="text-[0.75rem] font-semibold text-slate-700 hover:text-navy hover:underline"
                  >
                    Notify me
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div id="academy-notify" className="scroll-mt-28 border border-gold/40 bg-navy p-8 text-white shadow-xl sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-navy-2 p-2.5 text-gold">
              <Bell className="h-5 w-5" />
            </span>
            <h3 className="mt-3 font-serif text-[1.9rem] font-medium">Be the first to know when the Academy Collection launches</h3>
            <p className="mx-auto mt-2 mb-6 max-w-xl text-[0.9rem] text-white/70">Leave your name and email and we&apos;ll tell you when it&apos;s ready. Nothing else.</p>
            {done ? (
              <p className="mx-auto flex max-w-md items-center justify-center gap-3 border border-gold bg-navy-2 p-4 text-[0.9rem]" role="status">
                <Check className="h-5 w-5 shrink-0 text-gold" /> You&apos;re on the list. We&apos;ll email you on launch day.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void join(new FormData(e.currentTarget));
                }}
                className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <label className="sr-only" htmlFor="wl-name">
                  Your name
                </label>
                <input id="wl-name" name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Your name" className="w-full border border-white/20 bg-navy-2 px-4 py-3 text-[0.9rem] text-white placeholder:text-white/50 focus:border-gold focus:outline-none sm:w-44" />
                <label className="sr-only" htmlFor="wl-email">
                  Email
                </label>
                <input id="wl-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="Your email" className="w-full flex-1 border border-white/20 bg-navy-2 px-4 py-3 text-[0.9rem] text-white placeholder:text-white/50 focus:border-gold focus:outline-none" />
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <button type="submit" disabled={busy} className="bg-gold px-6 py-3 text-[0.72rem] font-semibold tracking-[0.12em] whitespace-nowrap text-navy uppercase hover:bg-[#d4b273] disabled:opacity-60">
                  {busy ? "Joining…" : "Join the list"}
                </button>
              </form>
            )}
            {error && <p className="mt-3 text-[0.85rem] text-red-300">{error}</p>}
            <p className="mt-4 text-[0.75rem] text-white/50">
              Interested in: <span className="text-gold">{interest}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
