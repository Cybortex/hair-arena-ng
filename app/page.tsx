import Link from "next/link";
import Photo from "@/components/Photo";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, SERVICES, SITE } from "@/lib/site";
import { btn, btnDark, btnLine, card, wrap } from "@/lib/ui";

const steps = ["Pick a wig on the shop, or screenshot any hair from our page.", "Send it to us on WhatsApp or DM.", "We confirm your order and ship. Worldwide delivery available."];

export default function Home() {
  return (
    <>
      <section className="bg-magenta text-white">
        <div className={`${wrap} grid items-center gap-10 py-10 md:grid-cols-2 md:py-16`}>
          <div>
            <p className="font-script text-2xl text-yellow">{SITE.tagline}</p>
            <h1 className="mt-2 text-5xl leading-[1.05] font-extrabold md:text-7xl">Premium wigs with a natural look, <span className="text-yellow">built to last.</span></h1>
            <p className="mt-5 max-w-md text-lg text-white/90">Wigs, closure and frontal ventilation and repair, and revamp services. Delivered worldwide from Area 2, Abuja.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link href="/shop" className={btn}>Shop wigs</Link><a href={SITE.wa} target="_blank" rel="noopener noreferrer" className={btnLine}>Order on WhatsApp</a></div>
          </div>
          <div className="mx-auto flex w-full max-w-sm flex-col items-center">
            <div className="relative aspect-square w-full max-w-[340px] overflow-hidden rounded-3xl border-4 border-pink shadow-2xl">
              <Photo src="hero-wig.jpg" alt="Premium styled human hair wig crafted by The Hair Arena" priority sizes="(min-width:768px) 340px, 90vw" className="size-full" />
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-full border border-pink/40 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              <span className="size-2 rounded-full bg-yellow" />
              <span>100% Raw Human Hair · Abuja Showroom</span>
            </div>
          </div>
        </div>
      </section>

      <div className={`${wrap} flex flex-wrap gap-x-8 gap-y-1 border-b border-line py-5 text-sm text-ink/75`}>
        <span>Worldwide delivery</span><span>Wholesale · Dropshipping · Retail</span><span>{SITE.address}</span>
      </div>

      <section className={`${wrap} reveal py-14`}>
        <div className="flex items-end justify-between gap-4"><h2 className="rule text-4xl font-extrabold">New in the shop</h2><Link href="/shop" className="text-magenta underline underline-offset-4">See all</Link></div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="reveal bg-ink text-blush">
        <div className={`${wrap} py-14`}>
          <h2 className="rule text-4xl font-extrabold">Revamp, repair and ventilation</h2>
          <p className="mt-3 max-w-xl text-blush/80">Don&apos;t throw your old wig away. Bring it to us and get it looking new.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link key={s.slug} href="/revamp" className="rounded-2xl border border-pink/50 p-5 transition hover:border-yellow">
                <h3 className="text-xl font-bold">{s.name}</h3><p className="mt-2 text-sm text-blush/75">{s.blurb}</p>
                {"from" in s && <p className="mt-3 font-semibold text-yellow">{s.from}</p>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${wrap} reveal py-14`}>
        <h2 className="rule text-4xl font-extrabold">How to order</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => <li key={s} className={`${card} p-5`}><span className="text-4xl font-extrabold text-pink">{i + 1}</span><p className="mt-2">{s}</p></li>)}
        </ol>
      </section>

      <section className={`${wrap} reveal pb-14`}>
        <h2 className="rule text-4xl font-extrabold">Our work</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => <Photo key={n} src={`gallery-${n}.jpg`} alt={`Hair Arena wig styling, ventilation and revamp showcase example ${n}`} sizes="(min-width:768px) 33vw, 50vw" className="aspect-square rounded-xl border border-line" />)}
        </div>
        <Link href="/gallery" className={`${btnDark} mt-6`}>See the gallery</Link>
      </section>

      <section className="bg-pink text-ink">
        <div className={`${wrap} flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between`}>
          <div><h2 className="text-3xl font-extrabold">Wholesale, dropshipping and retail</h2><p className="mt-1">Selling hair? Message us for trade orders.</p></div>
          <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className={btnDark}>Ask about trade orders</a>
        </div>
      </section>

      <section className="bg-magenta py-14 text-center text-white">
        <h2 className="font-script text-4xl md:text-5xl">{SITE.slogan}</h2>
        <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/shop" className={btn}>Shop wigs</Link><a href={`tel:${SITE.phone.tel}`} className={btnLine}>Call {SITE.phone.label}</a></div>
      </section>
    </>
  );
}
