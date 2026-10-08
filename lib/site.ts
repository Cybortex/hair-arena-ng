export const SITE = {
  name: "The Hair Arena Ng",
  short: "Hair Arena",
  tagline: "Home of Quality Weaves & Wigs",
  slogan: "Premium feel. Natural look. Durable and long lasting.",
  address: "Area 2, Abuja", // TODO: confirm the full store address (a post mentions 2 Wukari Street, Area 2)
  phone: { label: "0807 548 5997", tel: "+2348075485997" },
  wa: "https://wa.me/2348075485997",
  email: "hairarenanigeria@gmail.com",
  handle: "@HairArenaNg",
  ig: "", x: "", fb: "", // TODO: add profile URLs (links hide while empty)
  map: "https://www.google.com/maps/search/?api=1&query=Area+2+Abuja",
  embed: "https://www.google.com/maps?q=Area+2+Abuja&output=embed",
};

// Shows a bar above the header. Leave "" to hide. Never leave an expired promo here.
export const ANNOUNCEMENT = "";

export const waLink = (msg: string) => `${SITE.wa}?text=${encodeURIComponent(msg)}`;
export const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const NAV = [
  { href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { href: "/gallery", label: "Gallery" },
  { href: "/revamp", label: "Revamp" }, { href: "/team", label: "Team" }, { href: "/contact", label: "Contact" },
];

export type Status = "in-stock" | "sold-out" | "sale";
export type Product = {
  slug: string; name: string; category: "wigs" | "frontals-closures"; status: Status;
  price: number; salePrice?: number; blurb: string; specs: [string, string][];
  variants?: { label: string; price: number }[]; images: number;
};
// SAMPLE DATA from their posts. Owner replaces with real stock and statuses.
// images: /public/images/product-<slug>-1.jpg ... -<images>.jpg
export const PRODUCTS: Product[] = [
  { slug: "vietnamese-bouncy-wig", name: "Vietnamese Bouncy Wig, 16 inches", category: "wigs", status: "in-stock", price: 310000, images: 3,
    blurb: "Bundles made into a wig, with a natural look.",
    specs: [["Hair type", "Vietnamese bouncy"], ["Weight", "240 grams"], ["Length", "16 inches"], ["Lace", "5x5 Swiss lace"], ["Colour", "As seen"], ["Made as", "Bundles made into wig"]] },
  { slug: "burmese-curl-wig", name: "Burmese Curl Wig with 5x5 Closure", category: "wigs", status: "sale", price: 330000, salePrice: 300000, images: 3, // SAMPLE sale price for the demo only
    blurb: "A classy, full Burmese curl wig paired with a 5x5 closure.",
    specs: [["Hair type", "Burmese curl"], ["Closure", "5x5"], ["Colour", "As seen"]] },
  { slug: "piano-pixie-curl-wig", name: "SDD Piano Pixie Curl, 16 inches", category: "wigs", status: "in-stock", price: 170000, images: 3,
    blurb: "16 inch bundles paired with a 4x4 closure.",
    specs: [["Hair type", "SDD Piano Pixie curl"], ["Length", "16 inches"], ["Closure", "4x4"]] },
  { slug: "hd-lagos-frontal", name: "HD Lagos Hairline Frontal", category: "frontals-closures", status: "in-stock", price: 200000, images: 2,
    blurb: "Comes exactly as pictured. No plucking needed.",
    specs: [["Type", "Frontal only"], ["Hairline", "HD Lagos hairline"], ["Plucking", "Not needed"]],
    variants: [{ label: "12 inches", price: 200000 }, { label: "16 inches", price: 240000 }, { label: "20 inches", price: 250000 }, { label: "24 inches", price: 300000 }] },
  { slug: "premium-human-hair-wig", name: "Premium Human Hair Wig", category: "wigs", status: "sold-out", price: 450000, images: 2,
    blurb: "Available in two colours and 1B when in stock.",
    specs: [["Hair type", "Human hair"], ["Colours", "Two colours and 1B"]] },
  { slug: "copper-blunt-bob", name: "Copper Blunt Cut Bob Wig", category: "wigs", status: "sale", price: 150000, salePrice: 130000, images: 2,
    blurb: "Sleek ginger copper blunt cut bob wig with rich salon luster. On discount sale.",
    specs: [["Hair type", "Straight human hair"], ["Style", "Blunt cut bob"], ["Colour", "Copper ginger"], ["Closure", "Lace closure"]] },
  { slug: "auburn-wholesale-bundles", name: "Auburn Luxury Bundles & Closure Set", category: "frontals-closures", status: "in-stock", price: 180000, images: 2,
    blurb: "Silky premium auburn straight bundles paired with matching HD lace closure.",
    specs: [["Hair type", "Vietnamese straight bundles"], ["Lace", "HD closure"], ["Colour", "Auburn copper"], ["Grade", "Pure raw human hair"]] },
];

export const SERVICES = [
  { slug: "revamp", name: "Wig Laundry & Revamp", blurb: "Detangling, laundry, oil and vitamin infusion, deep conditioning, colour revitalisation and styling.", from: "From ₦10,000" },
  { slug: "ventilation", name: "Closure & Frontal Ventilation", blurb: "Made to order: a new closure or frontal." },
  { slug: "repair", name: "Closure & Frontal Repair", blurb: "Bring yours in and we'll repair it." },
  { slug: "wigging", name: "Wigging & Re-wigging", blurb: "Have a wig made, or re-made." },
];
export const REVAMP = {
  price: 10000,
  includes: ["Detangling", "Laundry", "Oil & vitamin infusion", "Deep conditioning", "Color revitalization", "Professional styling"],
  note: "Extra fees apply for closure repair.",
};

// Add team members. image: /public/images/team-<slug>.jpg. The group photo shows either way.
export const TEAM: { slug: string; name: string; role: string }[] = [];
