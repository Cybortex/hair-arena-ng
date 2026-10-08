# The Hair Arena Ng: Next.js + Tailwind v4 UI

UI only. No backend yet. Products live in `lib/site.ts`, and "Order on WhatsApp" opens WhatsApp with the product, option and price filled in.

## Setup

```bash
npx create-next-app@latest hairarena --ts --tailwind --app --eslint --no-src-dir --import-alias "@/*"
cd hairarena
```

Copy `app/`, `components/`, `lib/` and `public/images/` over the generated project (replace existing files). Tailwind v4 is configured in `app/globals.css`. Run `npm run dev`, then `npm run build`.

## Colours (estimated from their logo and posts; confirm with the owner)

| Token | Hex | Use |
|---|---|---|
| `magenta` | #9B1050 | Hero, closing band, links, sale |
| `pink` | #FF5FA8 | Borders, lines, trade strip (background only, never small text) |
| `yellow` | #FFD400 | Main buttons (dark text) |
| `ink` | #14090F | Text, footer, mobile bar |
| `blush` | #FFF5F9 | Page background |
| `line` | #F2D3E1 | Dividers, image placeholders |

Fonts: Outfit (headings and body), Kaushan Script for the tagline accents.

## Slogan and copy

"Premium feel. Natural look. Durable and long lasting." Services: premium wigs, closure and frontal ventilation and repair, laundry and revamp.

## Pages

- `/` Home: hero, new in the shop, revamp services, how to order, gallery teaser, trade strip, closing call to action.
- `/shop`: category tabs (All, Wigs, Frontals & Closures) and an "In stock only" filter.
- `/shop/[slug]`: Amazon-style product page: image gallery with thumbnails, title and "About this item" bullets, and a buy box with price, length selector, In stock / Sold out / Sale, Order on WhatsApp, Call, and delivery notes. Sold-out items show "Ask when it's back".
- `/gallery`, `/revamp`, `/team`, `/contact`.

## Managing products (for now)

Edit `PRODUCTS` in `lib/site.ts`:
- `status`: `"in-stock"`, `"sold-out"` or `"sale"` (a sale needs `salePrice`).
- `variants` adds a length selector with its own prices.
- `images` is how many photos the product has.
- The products and the sale price in the file are SAMPLE DATA from their posts. Replace them before launch. Do not show a sale price the owner hasn't set.

Set `ANNOUNCEMENT` in `lib/site.ts` for a promo bar. Leave it empty when there is no live promo.

The next phase moves products into Convex with an owner dashboard, so she can add products, change status and set sales from her phone.

## Images: exact filenames (public/images/)

Until a file exists, its slot shows a plain pink block, and it appears live when added. Names are case-sensitive.

| Filename | Size | Where |
|---|---|---|
| `logo.png` | 512x512, transparent | Header |
| `hero-wig.jpg` | 1200x1500 (4:5) | Home hero |
| `team-photo.jpg` | 1920x1080 (16:9) | Team page |
| `team-<slug>.jpg` | 800x1000 | Optional, per member added to `TEAM` |
| `gallery-1.jpg` to `gallery-12.jpg` | 1200 px wide, mixed shapes | Gallery (1 to 6 also on Home) |
| `revamp-before.jpg`, `revamp-after.jpg` | 1000x1000 | Revamp page |
| `service-ventilation.jpg`, `service-repair.jpg`, `service-wigging.jpg` | 1200x900 (4:3) | Revamp page |
| `product-vietnamese-bouncy-wig-1.jpg` to `-3.jpg` | 1000x1250 (4:5) | Product |
| `product-burmese-curl-wig-1.jpg` to `-3.jpg` | 1000x1250 | Product |
| `product-piano-pixie-curl-wig-1.jpg` to `-3.jpg` | 1000x1250 | Product |
| `product-hd-lagos-frontal-1.jpg` to `-2.jpg` | 1000x1250 | Product |
| `product-premium-human-hair-wig-1.jpg` to `-2.jpg` | 1000x1250 | Product |
| `product-copper-blunt-bob-1.jpg` to `-2.jpg` | 1000x1250 | Product |
| `product-auburn-wholesale-bundles-1.jpg` to `-2.jpg` | 1000x1250 | Product |

For each new product, use `product-<slug>-1.jpg`, `-2.jpg` and so on, matching the slug in `lib/site.ts`. The first image is the card and main image.

Also add `app/icon.png` (512x512) and `app/opengraph-image.jpg` (1200x630 for WhatsApp previews). Use only photos the owner has permission to share.

## TODO from the owner

- Real products, prices, stock status and photos.
- Full store address (a post mentions 2 Wukari Street, Area 2), opening hours, delivery rates.
- Instagram, X and Facebook profile URLs (`ig`, `x`, `fb` in `SITE`).
- Team names and photos, and any approved promo.

## Next phase

Convex backend and owner dashboard (add, edit, mark sold out, set sale, reorder photos, phone upload), click tracking on Order and Call buttons, and optional Paystack deposits.
