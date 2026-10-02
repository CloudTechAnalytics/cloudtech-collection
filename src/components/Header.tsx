"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";
import { buttonClass } from "./Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-[border-color,box-shadow] duration-300 ${scrolled || open ? "border-b border-line shadow-[0_1px_24px_-16px_rgba(7,27,51,0.4)]" : "border-b border-transparent"}`}>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="CloudTech Collection home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={active(n.href) ? "page" : undefined}
                  className={`relative py-2 text-[0.85rem] font-medium tracking-[0.02em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-500 ${active(n.href) ? "text-navy after:scale-x-100" : "text-muted after:scale-x-0 hover:text-navy hover:after:scale-x-100"}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/request" className={buttonClass("primary", "px-5 py-3 max-sm:hidden")}>
            Request an Order
          </Link>
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-page py-6">
            <ul>
              {NAV.map((n) => (
                <li key={n.href} className="border-b border-line">
                  <Link href={n.href} onClick={() => setOpen(false)} className={`block py-4 font-serif text-[1.7rem] ${active(n.href) ? "text-navy" : "text-navy/70"}`}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/request" onClick={() => setOpen(false)} className={buttonClass("primary", "mt-8 w-full")}>
              Request an Order
            </Link>
            <p className="mt-8 text-[0.8rem] tracking-[0.1em] text-subtle uppercase">An official CloudTech Analytics initiative</p>
          </nav>
        </div>
      )}
    </header>
  );
}
