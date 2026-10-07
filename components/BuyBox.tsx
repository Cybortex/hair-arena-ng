"use client";
import { useState } from "react";
import { SITE, naira, waLink, type Product } from "@/lib/site";
import { btn, btnLine } from "@/lib/ui";

export default function BuyBox({ p }: { p: Product }) {
  const [vi, setVi] = useState(0);
  const v = p.variants?.[vi];
  const sold = p.status === "sold-out";
  const sale = p.status === "sale" && !!p.salePrice;
  const price = v ? v.price : sale ? p.salePrice! : p.price;
  const msg = sold
    ? `Hello Hair Arena, is the ${p.name} coming back in stock?`
    : `Hello Hair Arena, I'd like to order the ${p.name}${v ? ` (${v.label})` : ""} at ${naira(price)}.`;
  return (
    <aside className="rounded-2xl border border-line bg-white p-5 lg:sticky lg:top-24">
      <p className="text-3xl font-bold">{naira(price)}</p>
      {sale && <p className="text-sm"><s className="text-ink/50">{naira(p.price)}</s> <b className="text-magenta">Sale: save {Math.round((1 - p.salePrice! / p.price) * 100)}%</b></p>}
      {p.variants && (
        <label className="mt-4 block text-sm font-medium">Length
          <select value={vi} onChange={(e) => setVi(+e.target.value)} className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-3 text-base">
            {p.variants.map((x, i) => <option key={x.label} value={i}>{x.label} · {naira(x.price)}</option>)}
          </select>
        </label>
      )}
      <p className={`mt-4 font-semibold ${sold ? "text-red-700" : "text-emerald-700"}`}>{sold ? "Sold out" : "In stock"}</p>
      <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className={`${btn} mt-3 w-full`}>{sold ? "Ask when it's back" : "Order on WhatsApp"}</a>
      <a href={`tel:${SITE.phone.tel}`} className={`${btnLine} mt-2 w-full`}>Call {SITE.phone.label}</a>
      <ul className="mt-4 grid gap-1 text-sm text-ink/75"><li>Worldwide delivery available</li><li>Order by WhatsApp or DM</li><li>Wholesale and dropshipping available</li></ul>
    </aside>
  );
}
