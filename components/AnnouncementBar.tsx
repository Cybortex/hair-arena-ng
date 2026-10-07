import { ANNOUNCEMENT } from "@/lib/site";
export default function AnnouncementBar() {
  if (!ANNOUNCEMENT) return null;
  return <p className="bg-yellow px-5 py-2 text-center text-sm font-semibold text-ink">{ANNOUNCEMENT}</p>;
}
