import Link from "next/link";
import { SITE } from "@/lib/site";

// Mobile-only action bar.
export default function StickyBar() {
  const c = "py-3 text-center font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 divide-x divide-blush/20 border-t border-pink bg-ink pb-[env(safe-area-inset-bottom)] text-blush md:hidden">
      <a href={`tel:${SITE.phone.tel}`} className={c}>Call</a>
      <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className={c}>WhatsApp</a>
      <Link href="/shop" className={`${c} bg-yellow text-ink`}>Shop</Link>
    </div>
  );
}
