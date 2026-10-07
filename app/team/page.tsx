import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { SITE, TEAM } from "@/lib/site";
import { btn, card, wrap } from "@/lib/ui";

export const metadata: Metadata = { title: "Meet the Team" };

export default function Team() {
  return (
    <section className={`${wrap} py-10`}>
      <h1 className="rule text-4xl font-extrabold md:text-5xl">Meet the Hair Arena team</h1>
      <p className="mt-3 max-w-xl text-lg text-ink/75">The hands behind every wig, closure and revamp.</p>
      <Photo src="team-photo.jpg" alt="The Hair Arena team members in Area 2, Abuja" priority sizes="(min-width:1152px) 1112px, 100vw" className="mt-8 aspect-[16/9] rounded-3xl border-4 border-pink" />
      {TEAM.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => <div key={m.slug} className={`${card} overflow-hidden`}><Photo src={`team-${m.slug}.jpg`} alt={`${m.name}, ${m.role} at The Hair Arena`} sizes="(min-width:1024px) 25vw, 50vw" className="aspect-[4/5]" /><div className="p-4"><h2 className="text-xl font-bold">{m.name}</h2><p className="text-ink/70">{m.role}</p></div></div>)}
        </div>
      )}
      <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className={`${btn} mt-8`}>Chat with our team</a>
    </section>
  );
}
