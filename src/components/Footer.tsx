import Link from "next/link";
import { ECOSYSTEM, SITE, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";

const LINKS = [
  { label: "Analytics", href: ECOSYSTEM[0].href },
  { label: "Academy", href: ECOSYSTEM[1].href },
  { label: "The Counsel", href: ECOSYSTEM[2].href },
  { label: "The Manifest", href: ECOSYSTEM[3].href },
  { label: "Collection", href: "/collection" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/request?kind=general" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cloudtech-analytics/" },
  { label: "X (Twitter)", href: "https://twitter.com/cloudtechanalytics" },
  { label: "Instagram", href: "https://instagram.com/jd_cta" },
  { label: "WhatsApp", href: whatsappLink("Hello CloudTech, I have a question about the CloudTech Collection.") },
  { label: "Email", href: `mailto:${SITE.email}` },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
            <span className="font-medium text-white">CloudTech Collection</span> is an official CloudTech Analytics initiative: premium merchandise for the people building, using
            and growing with CloudTech.
          </p>
          <span className="gold-rule mt-8" />
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-gold uppercase">CloudTech</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.92rem]">
              {LINKS.map((l) => (
                <li key={l.label}>
                  {/^https?:/.test(l.href) ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-white/75 transition-colors hover:text-gold">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-white/75 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-gold uppercase">Connect</p>
            <ul className="mt-5 space-y-3 text-[0.92rem]">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="text-white/75 transition-colors hover:text-gold">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-[0.8rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CloudTech Analytics. All rights reserved.</p>
          <p>CloudTech Collection · An official CloudTech Analytics initiative</p>
        </div>
      </div>
    </footer>
  );
}
