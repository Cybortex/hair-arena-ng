import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { REVAMP, SERVICES, naira, waLink } from "@/lib/site";
import { btn, card, wrap } from "@/lib/ui";

export const metadata: Metadata = { title: "Wig Revamp, Ventilation & Repair", description: "Wig laundry and revamp, closure and frontal ventilation and repair, wigging and re-wigging in Area 2, Abuja." };

export default function Revamp() {
  return (
    <section className={`${wrap} py-10`}>
      <h1 className="rule text-4xl font-extrabold md:text-5xl">Revamp, repair and ventilation</h1>
      <p className="mt-3 max-w-xl text-ink/75">Don&apos;t throw your old wig away. Bring it to us and get it looking brand new.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className={`${card} p-6`}>
          <h2 className="text-2xl font-bold">Wig Laundry &amp; Revamp</h2>
          <p className="mt-1 text-4xl font-extrabold text-magenta">{naira(REVAMP.price)}</p>
          <ul className="mt-4 grid gap-1">{REVAMP.includes.map((i) => <li key={i} className="border-b border-line py-1.5"><span className="mr-2 text-magenta">✓</span>{i}</li>)}</ul>
          <p className="mt-3 text-sm text-ink/70">{REVAMP.note}</p>
          <a href={waLink("Hello Hair Arena, I'd like to revamp my wig.")} target="_blank" rel="noopener noreferrer" className={`${btn} mt-5 w-full`}>Send us your wig</a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Photo src="revamp-before.jpg" alt="Client wig before laundry and revamp treatment showing worn texture" sizes="(min-width:768px) 25vw, 50vw" className="aspect-square rounded-2xl border border-line" />
          <Photo src="revamp-after.jpg" alt="Restored wig after professional revamp, detangling, oil infusion and styling" sizes="(min-width:768px) 25vw, 50vw" className="aspect-square rounded-2xl border border-line" />
          <p className="text-center text-sm text-ink/60">Before</p><p className="text-center text-sm text-ink/60">After</p>
        </div>
      </div>
      <h2 className="rule mt-14 text-3xl font-extrabold">More services</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {SERVICES.slice(1).map((s) => (
          <div key={s.slug} className={`${card} overflow-hidden`}>
            <Photo src={`service-${s.slug}.jpg`} alt={`The Hair Arena ${s.name} service`} sizes="(min-width:640px) 33vw, 100vw" className="aspect-[4/3]" />
            <div className="p-4"><h3 className="text-xl font-bold">{s.name}</h3><p className="mt-1 text-ink/75">{s.blurb}</p>
              <a href={waLink(`Hello Hair Arena, I'd like to enquire about ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-magenta underline underline-offset-4">Enquire on WhatsApp</a></div>
          </div>
        ))}
      </div>
    </section>
  );
}
