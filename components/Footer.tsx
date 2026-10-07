import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  const a = "underline-offset-4 hover:underline";
  return (
    <footer className="border-t-4 border-pink bg-ink text-blush">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="text-3xl font-extrabold">{SITE.short}</p>
          <p className="mt-1 text-pink">{SITE.tagline}</p>
          <p className="mt-4 text-blush/85">{SITE.address}</p>
          <p className="text-blush/60">Wholesale · Dropshipping · Retail · Worldwide delivery</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2">{NAV.map((n) => <Link key={n.href} href={n.href} className={a}>{n.label}</Link>)}</nav>
        <div className="grid content-start gap-2">
          <a href={`tel:${SITE.phone.tel}`} className={a}>{SITE.phone.label}</a>
          <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className={a}>WhatsApp</a>
          <a href={`mailto:${SITE.email}`} className={a}>{SITE.email}</a>
          {SITE.ig ? <a href={SITE.ig} target="_blank" rel="noopener noreferrer" className={a}>Instagram {SITE.handle}</a> : <span className="text-blush/60">{SITE.handle} on Instagram, X and Facebook</span>}
          {SITE.fb && <a href={SITE.fb} target="_blank" rel="noopener noreferrer" className={a}>Facebook</a>}
          {SITE.x && <a href={SITE.x} target="_blank" rel="noopener noreferrer" className={a}>X</a>}
        </div>
      </div>
      <p className="border-t border-blush/15 px-5 py-4 text-center text-sm text-blush/60">© {new Date().getFullYear()} {SITE.name}</p>
    </footer>
  );
}
