"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { CloudTechLogo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useRequestList } from "./RequestList";
import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Collection", href: "/#collection" },
  { label: "Corporate Kit", href: "/#corporate-kit" },
  { label: "Corporate orders", href: "/#corporate-orders" },
  { label: "Academy", href: "/#academy" },
  { label: "Our story", href: "/#story" },
];

/** Same header as www.cloudtechanalytics.com: sticky, clear at the top, ivory once you scroll. */
export function Navbar() {
  const { count, open } = useRequestList();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const label = `Request Order: ${count} item${count === 1 ? "" : "s"} in your list`;

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-500 ${
        menu ? "border-b border-line bg-ivory" : scrolled ? "border-b border-line bg-ivory/92 backdrop-blur-md" : "border-b border-transparent bg-ivory"
      }`}
    >
      <div className="container-page flex h-17 items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label="CloudTech Collection home" className="-m-1 shrink-0 p-1">
          <span className="lg:hidden">
            <CloudTechLogo size="sm" />
          </span>
          <span className="hidden lg:inline">
            <CloudTechLogo size="md" />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative py-2 text-[0.875rem] tracking-[0.01em] whitespace-nowrap text-muted transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brass after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={open}
            aria-label={label}
            className="inline-flex items-center gap-2 rounded-lg bg-brass-button px-3.5 py-2.5 text-[0.875rem] font-semibold whitespace-nowrap text-on-brass transition-colors hover:bg-brass-button-hover sm:px-5"
          >
            <ShoppingBag aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            <span className="max-[400px]:hidden">Order request</span>
            {count > 0 && <span className="min-w-5 rounded-full bg-on-brass px-1.5 text-center text-[0.75rem] font-bold text-brass-button tabular-nums">{count}</span>}
          </button>
          <button type="button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? "Close menu" : "Open menu"} className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden">
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 block h-[1.5px] bg-ink transition-all duration-300 ${menu ? "top-1/2 w-6 -translate-y-1/2 rotate-45" : "top-0 w-6"}`} />
              <span className={`absolute left-0 block h-[1.5px] transition-all duration-300 ${menu ? "top-1/2 w-6 -translate-y-1/2 -rotate-45 bg-ink" : "bottom-0 w-4 bg-brass"}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!menu} className="fixed inset-x-0 top-17 bottom-0 overflow-y-auto border-t border-line bg-ivory lg:hidden">
        <div className="container-page flex min-h-full flex-col pt-6 pb-10">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-b border-line">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setMenu(false)} className="block py-4 font-serif text-[1.9rem] leading-tight text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-10">
            <Link
              href="/#corporate-orders"
              onClick={() => setMenu(false)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brass-button px-6 py-3.5 text-[0.9375rem] font-semibold text-on-brass"
            >
              Corporate and bulk orders <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <a href={`mailto:${SITE.email}`} className="mt-4 block text-center text-[0.875rem] text-muted">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
