"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/lib/site";

const TABS = [["all", "All"], ["wigs", "Wigs"], ["frontals-closures", "Frontals & Closures"]] as const;

export default function ShopGrid() {
  const [tab, setTab] = useState<string>("all");
  const [stock, setStock] = useState(false);
  const list = PRODUCTS.filter((p) => (tab === "all" || p.category === tab) && (!stock || p.status !== "sold-out"));
  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div role="tablist" aria-label="Category" className="flex flex-wrap gap-2">
          {TABS.map(([id, label]) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
              className={`rounded-full border-2 px-4 py-2 font-medium ${tab === id ? "border-ink bg-ink text-blush" : "border-pink bg-white"}`}>{label}</button>
          ))}
        </div>
        <label className="ml-auto flex items-center gap-2"><input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} className="size-5 accent-magenta" />In stock only</label>
      </div>
      <p className="mt-4 text-sm text-ink/70">{list.length} items</p>
      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
    </>
  );
}
