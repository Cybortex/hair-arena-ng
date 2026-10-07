import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { SITE } from "@/lib/site";
import { btn, wrap } from "@/lib/ui";

export const metadata: Metadata = { title: "Gallery" };
const ratios = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

export default function Gallery() {
  return (
    <section className={`${wrap} py-10`}>
      <h1 className="rule text-4xl font-extrabold md:text-5xl">Gallery</h1>
      <p className="mt-3 max-w-xl text-ink/75">Real wigs, revamps and ventilation from our store.</p>
      <div className="mt-8 columns-2 gap-3 md:columns-3">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
          <Photo key={n} src={`gallery-${n}.jpg`} alt={`Hair Arena client wig styling, ventilation and revamp showcase ${n}`} sizes="(min-width:768px) 33vw, 50vw" className={`mb-3 break-inside-avoid rounded-xl border border-line ${ratios[n % ratios.length]}`} />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3"><Link href="/shop" className={btn}>Shop wigs</Link><a href={SITE.wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-magenta underline underline-offset-4 self-center">Send us a screenshot of the hair you want</a></div>
    </section>
  );
}
