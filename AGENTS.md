# Image Rules

Never generate, draw or source images. Use only real photos in public/images with the exact filenames in the guide. Missing images stay as the neutral placeholder.

## Strict Guidelines

1. **No Generated or Sourced Assets**:
   - Do not use AI image generation, image APIs, stock photos, hotlinked images, placeholder photo services, emoji standing in for photos, decorative SVG illustrations standing in for photos, or base64 art.
   - Do not run any image-generation tool, MCP, or script.

2. **Real Photos Only**:
   - Use ONLY real photos provided by the business in `public/images/`.
   - Never fill missing image slots with fake or temporary artwork.
   - All image slots must use the existing `Photo` component (`components/Photo.tsx`), which loads `/images/<exact filename>` and renders a neutral placeholder block (`bg-line`) when the photo file is absent.

3. **Exact Filenames**:
   - Keep every filename exactly as defined in `HAIR-ARENA-UI-GUIDE.md` and `lib/site.ts` (case-sensitive).
   - Never invent, alter, or rename filenames without documenting them in the guide.

4. **Image Verification**:
   - Run `npm run images:check` (`scripts/check-images.mjs`) to audit which images are present and which are missing.
   - Real photos must be `.jpg`, `.png`, or `.webp`, and under 500 KB each.

5. **Owner Dashboard & Convex Uploads**:
   - When the owner dashboard is implemented, all product and gallery photos must come directly from the owner's uploads via Convex file storage.
   - Accept only `jpg`, `png`, and `webp` files.
   - Validate file type and size on the server (max 5 MB).
   - Never auto-create, synthesize, or seed placeholder images.
