import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { wrap } from "@/lib/ui";

export const metadata: Metadata = { title: "Shop wigs, frontals and closures", description: "Premium wigs, frontals and closures from The Hair Arena, Abuja. Order on WhatsApp. Worldwide delivery." };

export default function Shop() {
  return (
    <section className={`${wrap} py-10`}>
      <h1 className="rule text-4xl font-extrabold md:text-5xl">Shop</h1>
      <p className="mt-3 max-w-xl text-ink/75">Tap a wig to see details, pick a length and order on WhatsApp.</p>
      <ShopGrid />
    </section>
  );
}
