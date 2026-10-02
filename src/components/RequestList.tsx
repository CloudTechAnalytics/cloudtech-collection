"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { PRODUCTS, findProduct, formatPrice } from "@/data/products";
import { submitRequest } from "@/lib/supabase";
import { ContactFields, Confirmation, FieldShell, inputCls } from "./RequestForms";

export type ListItem = { slug: string; quantity: number; size?: string };

type Ctx = {
  items: ListItem[];
  count: number;
  add: (slug: string, quantity: number, size?: string) => void;
  update: (slug: string, size: string | undefined, quantity: number) => void;
  remove: (slug: string, size?: string) => void;
  clear: () => void;
  open: () => void;
  toast: (message: string) => void;
};

const RequestListContext = createContext<Ctx | null>(null);
const KEY = "ct-collection-request-list";

/*
 * The list lives in a tiny store kept in sync with localStorage, read through useSyncExternalStore.
 * The server (and the first render in the browser) sees an empty list, so the HTML always matches.
 */
const EMPTY: ListItem[] = [];
let current: ListItem[] | null = null;
const listeners = new Set<() => void>();
function read(): ListItem[] {
  if (current) return current;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]") as ListItem[];
    // Drop anything no longer in the catalogue.
    current = Array.isArray(saved) ? saved.filter((i) => findProduct(i.slug)?.available) : [];
  } catch {
    current = [];
  }
  return current;
}
function write(next: ListItem[]) {
  current = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: the list still works for this visit */
  }
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => (listeners.add(l), () => void listeners.delete(l));

export function useRequestList() {
  const ctx = useContext(RequestListContext);
  if (!ctx) throw new Error("useRequestList outside RequestListProvider");
  return ctx;
}

/** The Order Request list: like a basket, but sending it asks CloudTech to confirm price, payment and delivery. */
export function RequestListProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  const setItems = useCallback((fn: (prev: ListItem[]) => ListItem[]) => write(fn(read())), []);
  const [drawer, setDrawer] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const toast = useCallback((m: string) => {
    setMessage(m);
    window.setTimeout(() => setMessage((cur) => (cur === m ? null : cur)), 3500);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      add: (slug, quantity, size) =>
        setItems((prev) => {
          const i = prev.findIndex((x) => x.slug === slug && x.size === size);
          if (i < 0) return [...prev, { slug, quantity, size }];
          return prev.map((x, j) => (j === i ? { ...x, quantity: Math.min(500, x.quantity + quantity) } : x));
        }),
      update: (slug, size, quantity) => setItems((prev) => prev.map((x) => (x.slug === slug && x.size === size ? { ...x, quantity: Math.max(1, Math.min(500, quantity)) } : x))),
      remove: (slug, size) => setItems((prev) => prev.filter((x) => !(x.slug === slug && x.size === size))),
      clear: () => setItems(() => []),
      open: () => setDrawer(true),
      toast,
    }),
    [items, toast, setItems],
  );

  return (
    <RequestListContext.Provider value={value}>
      {children}
      {drawer && <Drawer onClose={() => setDrawer(false)} />}
      {message && (
        <div role="status" className="fixed right-4 bottom-4 left-4 z-[60] flex items-center gap-3 border border-gold/50 bg-navy px-4 py-3 text-[0.85rem] text-white shadow-xl sm:left-auto sm:max-w-md">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
            <Check className="h-3 w-3" />
          </span>
          <span className="flex-1">{message}</span>
          <button type="button" onClick={() => (setMessage(null), setDrawer(true))} className="font-semibold text-gold hover:underline">
            View list
          </button>
        </div>
      )}
    </RequestListContext.Provider>
  );
}

function Drawer({ onClose }: { onClose: () => void }) {
  const { items, update, remove, clear, count } = useRequestList();
  const [step, setStep] = useState<"list" | "form" | "done">("list");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ ref: string; name: string; lines: number } | null>(null);
  const rows = items.map((i) => ({ ...i, product: findProduct(i.slug)! })).filter((r) => r.product);
  const total = rows.every((r) => r.product.price !== null) ? rows.reduce((n, r) => n + (r.product.price ?? 0) * r.quantity, 0) : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (f: FormData) => {
    if (f.get("website")) return;
    const v = (k: string) => String(f.get(k) ?? "").trim();
    setBusy(true);
    setError(null);
    try {
      const ref = await submitRequest({
        kind: "general",
        name: v("name"),
        email: v("email"),
        phone: v("phone"),
        location: v("location"),
        message: v("message"),
        items: rows.map((r) => ({ product: r.product.name, slug: r.slug, quantity: r.quantity, size: r.size })),
      });
      setDone({ ref, name: v("name").split(" ")[0], lines: rows.length });
      setStep("done");
      clear();
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't send your request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy/60 backdrop-blur-[2px]" onClick={onClose}>
      <aside role="dialog" aria-modal="true" aria-label="Order Request list" className="flex h-full w-full max-w-md animate-[slide-in_0.25s_ease-out] flex-col bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between border-b border-line bg-mist px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-[1.4rem] font-semibold text-navy">Order Request List</h2>
            {count > 0 && step !== "done" && <span className="rounded-full bg-navy px-2 py-0.5 font-mono text-[0.72rem] text-white">{count}</span>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 text-subtle hover:text-navy">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {step === "done" && done ? (
            <Confirmation reference={done.ref} title={`Thank you, ${done.name}`} lines={[["Items", `${done.lines} piece${done.lines === 1 ? "" : "s"}`]]} onClose={onClose} />
          ) : rows.length === 0 ? (
            <div className="py-14 text-center">
              <ShoppingBag className="mx-auto h-9 w-9 text-line-strong" />
              <p className="mt-4 font-serif text-[1.35rem] text-navy">Your list is empty</p>
              <p className="mt-1 text-[0.88rem] text-muted">Add pieces from the collection, then send one request for all of them.</p>
              <Link href="/#collection" onClick={onClose} className="mt-6 inline-block text-[0.78rem] font-semibold tracking-[0.12em] text-navy uppercase underline decoration-gold underline-offset-4">
                Browse the collection
              </Link>
            </div>
          ) : step === "list" ? (
            <ul className="divide-y divide-line">
              {rows.map((r) => (
                <li key={`${r.slug}-${r.size ?? ""}`} className="flex gap-3.5 py-4 first:pt-0">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-line bg-mist">
                    <Image src={r.product.images[0].src} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-[1.08rem] leading-tight font-semibold text-navy">{r.product.name}</p>
                    <p className="mt-0.5 text-[0.78rem] text-muted">
                      {r.size ? `Size ${r.size} · ` : ""}
                      {formatPrice(r.product.price)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border border-line-strong">
                        <button type="button" aria-label="Fewer" disabled={r.quantity <= 1} onClick={() => update(r.slug, r.size, r.quantity - 1)} className="p-1.5 text-navy disabled:opacity-30">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-[0.82rem]">{r.quantity}</span>
                        <button type="button" aria-label="More" onClick={() => update(r.slug, r.size, r.quantity + 1)} className="p-1.5 text-navy">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button type="button" onClick={() => remove(r.slug, r.size)} aria-label={`Remove ${r.product.name}`} className="p-1.5 text-subtle hover:text-danger">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submit(new FormData(e.currentTarget));
              }}
              className="space-y-4"
            >
              <button type="button" onClick={() => setStep("list")} className="text-[0.8rem] text-muted underline hover:text-navy">
                ← Back to your list
              </button>
              <h3 className="font-serif text-[1.4rem] font-semibold text-navy">Delivery and contact details</h3>
              <ContactFields />
              <FieldShell label="Notes" optional>
                <textarea name="message" rows={3} maxLength={4000} placeholder="Delivery window, company invoice details, names for ID cards…" className={inputCls} />
              </FieldShell>
              {error && <p className="border border-danger/30 bg-danger/5 px-3 py-2 text-[0.85rem] text-danger">{error}</p>}
              <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 bg-navy px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-navy-2 disabled:opacity-60">
                <Send className="h-4 w-4 text-gold" /> {busy ? "Sending…" : "Send Order Request"}
              </button>
              <p className="text-center text-[0.78rem] text-muted">No payment now. We&apos;ll contact you to confirm availability, payment and delivery.</p>
            </form>
          )}
        </div>

        {step === "list" && rows.length > 0 && (
          <footer className="border-t border-line bg-mist p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.75rem] tracking-[0.12em] text-muted uppercase">Estimated total</span>
              <span className="font-serif text-[1.5rem] font-bold text-navy tabular-nums">{total === null ? "To be confirmed" : formatPrice(total)}</span>
            </div>
            <p className="mt-1 text-[0.75rem] text-subtle">Final price and delivery confirmed by CloudTech before you pay.</p>
            <button type="button" onClick={() => setStep("form")} className="mt-4 flex w-full items-center justify-center gap-2 bg-navy px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-navy-2">
              Continue to details
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}

export const ORDERABLE = PRODUCTS.filter((p) => p.available);
