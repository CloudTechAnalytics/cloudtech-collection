import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections";
import { RequestListProvider } from "@/components/RequestList";
import { SITE } from "@/lib/site";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

// The same type system as www.cloudtechanalytics.com: Playfair Display headlines, Inter for everything else.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    locale: "en_GB",
    images: [{ url: "/products/collection-flatlay.jpg", width: 1376, height: 768, alt: "The CloudTech Collection" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#F8F5EF", colorScheme: "light dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The theme script may add "dark" to <html> before React loads.
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-lg focus:bg-night focus:px-4 focus:py-2 focus:text-cream">
          Skip to main content
        </a>
        <RequestListProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </RequestListProvider>
      </body>
    </html>
  );
}
