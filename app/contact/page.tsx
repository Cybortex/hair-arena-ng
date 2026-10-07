import type { Metadata } from "next";
import { SITE, waLink } from "@/lib/site";
import { btn, btnDark, btnLine, card, wrap } from "@/lib/ui";

export const metadata: Metadata = { title: "Contact", description: "Call, WhatsApp or visit The Hair Arena in Area 2, Abuja. Worldwide delivery." };

export default function Contact() {
  return (
    <section className={`${wrap} py-10`}>
      <h1 className="rule text-4xl font-extrabold md:text-5xl">Contact</h1>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`tel:${SITE.phone.tel}`} className={btn}>Call {SITE.phone.label}</a>
        <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className={btnDark}>WhatsApp</a>
        <a href={`mailto:${SITE.email}`} className={btnLine}>Email us</a>
        {SITE.ig && <a href={SITE.ig} target="_blank" rel="noopener noreferrer" className={btnLine}>Instagram</a>}
        {SITE.fb && <a href={SITE.fb} target="_blank" rel="noopener noreferrer" className={btnLine}>Facebook</a>}
      </div>
      <p className="mt-3 text-ink/70">Find us on Instagram, X and Facebook as {SITE.handle}.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="grid content-start gap-6">
          <div><h2 className="text-2xl font-bold">Store</h2><p className="mt-1 text-lg">{SITE.address}</p><a href={SITE.map} target="_blank" rel="noopener noreferrer" className={`${btnDark} mt-3`}>Get directions</a></div>
          <div className={`${card} p-5`}><h2 className="text-2xl font-bold">Wholesale &amp; dropshipping</h2><p className="mt-1 text-ink/75">Selling hair? We supply wholesale, dropshipping and retail. Worldwide delivery available.</p>
            <a href={waLink("Hello Hair Arena, I'd like to ask about wholesale/dropshipping.")} target="_blank" rel="noopener noreferrer" className={`${btn} mt-3`}>Ask about trade orders</a></div>
        </div>
        <iframe title="Map to The Hair Arena" src={SITE.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-square w-full rounded-2xl border border-line md:aspect-auto md:min-h-96" />
      </div>
    </section>
  );
}
