"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Download, LogOut, Mail, MessageCircle, RefreshCw } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Field } from "@/components/Fields";
import { buttonClass } from "@/components/Button";

type Status = "new" | "contacted" | "confirmed" | "fulfilled" | "closed";
type Req = {
  id: string;
  reference: string;
  kind: "item" | "corporate" | "kit" | "general";
  status: Status;
  name: string;
  email: string;
  phone: string;
  organization: string;
  items: { product: string; quantity: number; size?: string; variant?: string }[];
  products: string[];
  quantity: number | null;
  event_date: string | null;
  location: string;
  message: string;
  admin_note: string;
  created_at: string;
};

const STATUSES: Status[] = ["new", "contacted", "confirmed", "fulfilled", "closed"];
const KIND_LABEL = { item: "Item", general: "Order", corporate: "Corporate", kit: "Corporate Kit" } as const;
const when = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const waNumber = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return d.startsWith("0") ? `234${d.slice(1)}` : d;
};

function SignIn({ onDone }: { onDone: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    const { error } = await supabase().auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    setBusy(false);
    if (error) setError(error.message === "Invalid login credentials" ? "That email and password don't match." : error.message);
    else onDone();
  };
  return (
    <section className="container-page max-w-md py-20">
      <p className="eyebrow">CloudTech Collection</p>
      <h1 className="display mt-4 text-[2.6rem] text-navy">Requests</h1>
      <p className="mt-3 text-muted">Sign in with your CloudTech Academy admin account.</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Password" name="password" type="password" required autoComplete="current-password" />
        {error && <p className="text-[0.92rem] text-danger">{error}</p>}
        <button type="submit" disabled={busy} className={buttonClass("primary", "w-full")}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </section>
  );
}

function RequestRow({ r, onSaved }: { r: Req; onSaved: (r: Req) => void }) {
  const [open, setOpen] = useState(r.status === "new");
  const [note, setNote] = useState(r.admin_note);
  const [saving, setSaving] = useState(false);
  const save = async (patch: Partial<Req>) => {
    setSaving(true);
    const { data, error } = await supabase().from("collection_requests").update(patch).eq("id", r.id).select().single();
    setSaving(false);
    if (!error && data) onSaved(data as Req);
  };
  const summary =
    r.items.length > 0
      ? r.items.map((i) => `${i.quantity} × ${i.product}${i.size ? ` (${i.size})` : ""}${i.variant ? `, ${i.variant}` : ""}`).join("; ")
      : [r.quantity ? `${r.quantity} items` : "", r.products.join(", ")].filter(Boolean).join(" · ");
  const reply = encodeURIComponent(`Hello ${r.name.split(" ")[0]}, thank you for your CloudTech Collection request ${r.reference}.`);
  return (
    <li className="border border-line bg-white">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full flex-col gap-2 p-5 text-left sm:flex-row sm:items-center sm:justify-between">
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.85rem] text-navy">{r.reference}</span>
            <span className="border border-line px-2 py-0.5 text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">{KIND_LABEL[r.kind]}</span>
            {r.status === "new" && <span className="bg-gold px-2 py-0.5 text-[0.68rem] font-semibold tracking-[0.12em] text-navy uppercase">New</span>}
          </span>
          <span className="mt-1 block font-semibold text-navy">
            {r.name}
            {r.organization && <span className="font-normal text-muted"> · {r.organization}</span>}
          </span>
          <span className="block truncate text-[0.9rem] text-muted">{summary || "No items listed"}</span>
        </span>
        <span className="shrink-0 text-[0.82rem] text-subtle">{when(r.created_at)}</span>
      </button>
      {open && (
        <div className="grid gap-6 border-t border-line p-5 lg:grid-cols-[1fr_18rem]">
          <dl className="grid gap-x-6 gap-y-3 text-[0.94rem] sm:grid-cols-2">
            <div>
              <dt className="text-[0.75rem] tracking-[0.1em] text-subtle uppercase">Email</dt>
              <dd className="break-all">{r.email}</dd>
            </div>
            <div>
              <dt className="text-[0.75rem] tracking-[0.1em] text-subtle uppercase">Phone</dt>
              <dd>{r.phone || "Not given"}</dd>
            </div>
            <div>
              <dt className="text-[0.75rem] tracking-[0.1em] text-subtle uppercase">Delivery</dt>
              <dd>{r.location || "Not given"}</dd>
            </div>
            <div>
              <dt className="text-[0.75rem] tracking-[0.1em] text-subtle uppercase">Date needed</dt>
              <dd>{r.event_date ? new Date(r.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Not given"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[0.75rem] tracking-[0.1em] text-subtle uppercase">Request</dt>
              <dd>{summary || "None"}</dd>
            </div>
            {r.message && (
              <div className="sm:col-span-2">
                <dt className="text-[0.75rem] tracking-[0.1em] text-subtle uppercase">Message</dt>
                <dd className="whitespace-pre-wrap">{r.message}</dd>
              </div>
            )}
          </dl>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${r.email}?subject=${encodeURIComponent(`Your CloudTech Collection request ${r.reference}`)}&body=${reply}`} className={buttonClass("outline", "px-3 py-2")}>
                <Mail className="h-4 w-4" /> Email
              </a>
              {r.phone && (
                <a href={`https://wa.me/${waNumber(r.phone)}?text=${reply}`} target="_blank" rel="noopener noreferrer" className={buttonClass("outline", "px-3 py-2")}>
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              )}
            </div>
            <label className="block text-[0.75rem] font-semibold tracking-[0.1em] text-navy uppercase">
              Status
              <select value={r.status} disabled={saving} onChange={(e) => save({ status: e.target.value as Status })} className="mt-2 block w-full border border-line-strong bg-white px-3 py-2.5 text-[0.95rem] font-normal tracking-normal normal-case">
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-[0.75rem] font-semibold tracking-[0.1em] text-navy uppercase">
              Internal note
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="mt-2 block w-full border border-line-strong px-3 py-2 text-[0.95rem] font-normal tracking-normal normal-case" />
            </label>
            {note !== r.admin_note && (
              <button type="button" onClick={() => save({ admin_note: note })} disabled={saving} className={buttonClass("primary", "w-full px-3 py-2.5")}>
                Save note
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

function toCsv(rows: Req[]) {
  const head = ["reference", "created_at", "kind", "status", "name", "organization", "email", "phone", "items", "products", "quantity", "event_date", "location", "message"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [r.reference, r.created_at, r.kind, r.status, r.name, r.organization, r.email, r.phone, r.items.map((i) => `${i.quantity} x ${i.product}${i.size ? ` (${i.size})` : ""}`).join("; "), r.products.join("; "), r.quantity, r.event_date, r.location, r.message]
      .map(esc)
      .join(","),
  );
  return [head.join(","), ...lines].join("\n");
}

export function AdminRequests() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Req[] | null>(null);
  const [filter, setFilter] = useState<Status | "open" | "all">("open");

  const load = useCallback(async () => {
    const sb = supabase();
    const { data: admin } = await sb.rpc("is_admin");
    setIsAdmin(Boolean(admin));
    if (!admin) return;
    const { data } = await sb.from("collection_requests").select("*").order("created_at", { ascending: false }).limit(500);
    setRows((data ?? []) as Req[]);
  }, []);

  useEffect(() => {
    const sb = supabase();
    void sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) void load();
    });
    const { data } = sb.auth.onAuthStateChange((event, s) => {
      setSession(s);
      // Supabase advises not calling it from inside this callback directly.
      if (s && event === "SIGNED_IN") setTimeout(() => void load(), 0);
    });
    return () => data.subscription.unsubscribe();
  }, [load]);

  if (session === undefined) return <p className="container-page py-20 text-muted">Loading…</p>;
  if (!session) return <SignIn onDone={() => undefined} />;
  const signOut = () => void supabase().auth.signOut().then(() => (setRows(null), setIsAdmin(null)));
  if (isAdmin === false)
    return (
      <section className="container-page max-w-lg py-20">
        <h1 className="display text-[2.4rem] text-navy">Admins only</h1>
        <p className="mt-3 text-muted">{session.user.email} isn&apos;t a CloudTech admin account.</p>
        <button type="button" onClick={signOut} className={buttonClass("outline", "mt-6")}>
          Sign out
        </button>
      </section>
    );
  if (!rows) return <p className="container-page py-20 text-muted">Loading requests…</p>;

  const counts = Object.fromEntries(STATUSES.map((s) => [s, rows.filter((r) => r.status === s).length])) as Record<Status, number>;
  const open = rows.filter((r) => r.status !== "fulfilled" && r.status !== "closed");
  const shown = filter === "all" ? rows : filter === "open" ? open : rows.filter((r) => r.status === filter);
  const download = () => {
    const url = URL.createObjectURL(new Blob([toCsv(shown)], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `cloudtech-collection-requests-${new Date().toISOString().slice(0, 10)}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-mist">
      <div className="container-page py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">CloudTech Collection</p>
            <h1 className="display mt-3 text-[2.8rem] text-navy">Requests</h1>
            <p className="mt-1 text-muted">
              {counts.new} new · {open.length} open · {rows.length} in total
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => void load()} className={buttonClass("outline", "px-3 py-2")}>
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button type="button" onClick={download} disabled={!shown.length} className={buttonClass("outline", "px-3 py-2")}>
              <Download className="h-4 w-4" /> CSV
            </button>
            <button type="button" onClick={signOut} className={buttonClass("outline", "px-3 py-2")}>
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {(["open", ...STATUSES, "all"] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`border px-3 py-1.5 text-[0.8rem] font-medium capitalize ${filter === f ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-navy"}`}
            >
              {f} ({f === "all" ? rows.length : f === "open" ? open.length : counts[f]})
            </button>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="mt-10 text-muted">{rows.length ? "Nothing here." : "No requests yet. They'll appear here as soon as someone sends one."}</p>
        ) : (
          <ul className="mt-6 space-y-3">
            {shown.map((r) => (
              <RequestRow key={r.id} r={r} onSaved={(n) => setRows(rows.map((x) => (x.id === n.id ? n : x)))} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
