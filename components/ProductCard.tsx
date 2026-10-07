import Link from "next/link";
import Photo from "./Photo";
import { naira, type Product } from "@/lib/site";

export default function ProductCard({ p }: { p: Product }) {
  const from = p.variants ? Math.min(...p.variants.map((v) => v.price)) : p.price;
  const sold = p.status === "sold-out";
  const sale = p.status === "sale" && p.salePrice;
  return (
    <Link href={`/shop/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Photo src={`product-${p.slug}-1.jpg`} alt={p.name} sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw" className={`aspect-[4/5] ${sold ? "opacity-60" : ""}`} />
        {sold && <span className="absolute top-2 left-2 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">Sold out</span>}
        {sale && <span className="absolute top-2 left-2 rounded-full bg-magenta px-3 py-1 text-xs font-semibold text-white">Sale</span>}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 font-semibold">{p.name}</h3>
        <p className="mt-1">
          {p.variants && "From "}
          {sale ? <><b className="text-magenta">{naira(p.salePrice!)}</b> <s className="text-ink/50">{naira(p.price)}</s></> : <b>{naira(from)}</b>}
        </p>
        <p className={`text-sm ${sold ? "text-red-700" : "text-emerald-700"}`}>{sold ? "Sold out" : "In stock"}</p>
      </div>
    </Link>
  );
}
