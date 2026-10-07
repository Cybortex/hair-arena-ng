import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyBox from "@/components/BuyBox";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { PRODUCTS } from "@/lib/site";
import { wrap } from "@/lib/ui";

export function generateStaticParams() { return PRODUCTS.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.blurb } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.blurb,
    offers: { "@type": "Offer", priceCurrency: "NGN", price: p.status === "sale" && p.salePrice ? p.salePrice : p.price,
      availability: p.status === "sold-out" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock" } };
  return (
    <article className={`${wrap} py-8`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm"><Link href="/shop" className="text-magenta underline underline-offset-4">Shop</Link> / {p.name}</nav>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_320px]">
        <ProductGallery slug={p.slug} name={p.name} n={p.images} />
        <div>
          <h1 className="text-3xl font-extrabold md:text-4xl">{p.name}</h1>
          <p className="mt-2 text-ink/75">{p.blurb}</p>
          <h2 className="mt-6 text-lg font-bold">About this item</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">{p.specs.map(([k, v]) => <li key={k}><b>{k}:</b> {v}</li>)}</ul>
        </div>
        <BuyBox p={p} />
      </div>
      <section className="mt-14"><h2 className="rule text-2xl font-extrabold">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">{PRODUCTS.filter((x) => x.slug !== slug).slice(0, 4).map((x) => <ProductCard key={x.slug} p={x} />)}</div>
      </section>
    </article>
  );
}
