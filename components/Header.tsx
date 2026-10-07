import Link from "next/link";
import Photo from "./Photo";
import { NAV, SITE } from "@/lib/site";
import { btn, btnSm } from "@/lib/ui";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-blush/95 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-magenta">
          <Photo src="logo.png" alt="" fit="contain" className="h-9 w-9" sizes="36px" />Hair Arena
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="font-medium hover:text-magenta">{n.label}</Link>)}
          <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className={btn}>Order on WhatsApp</a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className={btnSm}>WhatsApp</a>
          <details className="relative">
            <summary className="cursor-pointer list-none p-2 text-xl" aria-label="Menu">☰</summary>
            <div className="absolute right-0 mt-2 grid w-48 gap-1 rounded-xl border border-line bg-blush p-3 shadow-lg">
              {NAV.map((n) => <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 hover:bg-line">{n.label}</Link>)}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
