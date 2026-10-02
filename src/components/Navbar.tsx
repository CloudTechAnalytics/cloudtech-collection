"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "./Logo";
import { useRequestList } from "./RequestList";

const LINKS = [
  { label: "Collection", href: "/#collection" },
  { label: "Corporate Kit", href: "/#corporate-kit" },
  { label: "Academy", href: "/#academy" },
  { label: "Our Story", href: "/#story" },
  { label: "Ecosystem", href: "/#ecosystem" },
];

export function Navbar() {
  const { count, open } = useRequestList();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-200 ${scrolled ? "border-line bg-mist/95 py-3 shadow-[0_1px_12px_-8px_rgba(7,27,51,0.35)] backdrop-blur-md" : "border-line/50 bg-mist py-4 md:py-5"}`}>
      <div className="container-page flex items-center justify-between gap-4">
        <Link href="/" aria-label="CloudTech Collection home" className="shrink-0">
          <Logo size={34} />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[0.88rem] font-medium text-slate-700 lg:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap decoration-gold underline-offset-8 transition-colors hover:text-navy hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/#corporate-orders" className="hidden items-center border border-navy/20 px-4 py-2 text-[0.7rem] font-semibold tracking-[0.1em] whitespace-nowrap text-navy uppercase transition-colors hover:border-gold hover:bg-white md:inline-flex">
            Corporate Orders
          </Link>
          <button
            type="button"
            onClick={open}
            aria-label={`Request Order: ${count} item${count === 1 ? "" : "s"} in your list`}
            className="relative inline-flex items-center gap-2 bg-navy px-3.5 py-2 text-[0.7rem] font-semibold tracking-[0.1em] whitespace-nowrap text-white uppercase shadow-sm hover:bg-navy-2 sm:px-4"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-gold" />
            <span className="max-[380px]:hidden">Request Order</span>
            {count > 0 && <span className="rounded-full bg-gold px-1.5 text-[0.7rem] font-bold text-navy tabular-nums">{count}</span>}
          </button>
          <button type="button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? "Close menu" : "Open menu"} className="p-2 text-slate-700 hover:text-navy lg:hidden">
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menu && (
        <nav aria-label="Mobile" className="mt-3 border-t border-line bg-white px-5 py-5 shadow-lg lg:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMenu(false)} className="block border-b border-line py-3 font-serif text-[1.35rem] text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#corporate-orders" onClick={() => setMenu(false)} className="mt-5 block border border-navy/30 py-3 text-center text-[0.72rem] font-semibold tracking-[0.1em] text-navy uppercase">
            Corporate / Bulk Orders
          </Link>
        </nav>
      )}
    </header>
  );
}
