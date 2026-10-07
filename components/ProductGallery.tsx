"use client";
import { useState } from "react";
import Photo from "./Photo";

export default function ProductGallery({ slug, name, n }: { slug: string; name: string; n: number }) {
  const [i, setI] = useState(1);
  return (
    <div className="grid gap-3 md:grid-cols-[64px_1fr]">
      <div className="order-2 flex gap-2 md:order-1 md:flex-col">
        {Array.from({ length: n }, (_, k) => k + 1).map((k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Show image ${k}`} aria-current={i === k} className={`rounded-lg border-2 ${i === k ? "border-magenta" : "border-line"}`}>
            <Photo src={`product-${slug}-${k}.jpg`} alt="" sizes="64px" className="size-14 rounded-md md:size-16" />
          </button>
        ))}
      </div>
      <Photo key={i} src={`product-${slug}-${i}.jpg`} alt={`${name}, view ${i}`} priority sizes="(min-width:1024px) 40vw, 100vw" className="order-1 aspect-[4/5] rounded-2xl border border-line md:order-2" />
    </div>
  );
}
