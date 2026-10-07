import type { Metadata, Viewport } from "next";
import { Outfit, Kaushan_Script } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { SITE } from "@/lib/site";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-outfit" });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--font-kaushan" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "The Hair Arena | Premium Wigs, Closures & Revamp in Abuja", template: "%s | Hair Arena" },
  description: "Premium wigs with a natural look, closure and frontal ventilation and repair, and wig revamp services in Area 2, Abuja. Worldwide delivery.",
};
export const viewport: Viewport = { viewportFit: "cover", themeColor: "#14090f" };

const ld = { "@context": "https://schema.org", "@type": "Store", name: SITE.name, telephone: SITE.phone.tel, email: SITE.email,
  address: { "@type": "PostalAddress", addressLocality: "Area 2, Abuja", addressCountry: "NG" }, sameAs: [SITE.ig, SITE.fb, SITE.x].filter(Boolean) };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${kaushan.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <ConvexClientProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <div className="h-14 md:hidden" aria-hidden />
          <StickyBar />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
