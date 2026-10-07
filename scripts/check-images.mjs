import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const imagesDir = path.join(rootDir, "public", "images");
const appDir = path.join(rootDir, "app");
const siteTsPath = path.join(rootDir, "lib", "site.ts");
const guidePath = path.join(rootDir, "HAIR-ARENA-UI-GUIDE.md");

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_FILE_SIZE_BYTES = 500 * 1024; // 500 KB

function getExpectedImages() {
  const expected = new Set();

  // 1. Static images from guide & pages
  expected.add("logo.png");
  expected.add("hero-wig.jpg");
  expected.add("team-photo.jpg");
  expected.add("revamp-before.jpg");
  expected.add("revamp-after.jpg");

  // Gallery: 1 to 12
  for (let i = 1; i <= 12; i++) {
    expected.add(`gallery-${i}.jpg`);
  }

  // 2. Services from site.ts (services rendered on revamp page)
  expected.add("service-ventilation.jpg");
  expected.add("service-repair.jpg");
  expected.add("service-wigging.jpg");

  // 3. Parse lib/site.ts for PRODUCTS and TEAM
  if (fs.existsSync(siteTsPath)) {
    const siteContent = fs.readFileSync(siteTsPath, "utf-8");

    // Match products
    const productRegex = /slug:\s*["']([^"']+)["'][\s\S]*?images:\s*(\d+)/g;
    let match;
    while ((match = productRegex.exec(siteContent)) !== null) {
      const slug = match[1];
      const count = parseInt(match[2], 10);
      for (let k = 1; k <= count; k++) {
        expected.add(`product-${slug}-${k}.jpg`);
      }
    }

    // Match team members if any
    const teamSection = siteContent.match(/export const TEAM[^=]*=\s*\[([\s\S]*?)\];/);
    if (teamSection && teamSection[1]) {
      const teamSlugRegex = /slug:\s*["']([^"']+)["']/g;
      let teamMatch;
      while ((teamMatch = teamSlugRegex.exec(teamSection[1])) !== null) {
        expected.add(`team-${teamMatch[1]}.jpg`);
      }
    }
  }

  return Array.from(expected).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

function checkAppMetadataImages() {
  const metadataImages = [
    { file: "icon.png", targetPath: path.join(appDir, "icon.png") },
    { file: "opengraph-image.jpg", targetPath: path.join(appDir, "opengraph-image.jpg") },
  ];

  console.log("\n=== App Metadata Images (app/) ===");
  for (const item of metadataImages) {
    if (fs.existsSync(item.targetPath)) {
      const stats = fs.statSync(item.targetPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`  [PRESENT] app/${item.file} (${sizeKB} KB)`);
    } else {
      console.log(`  [MISSING] app/${item.file} (optional / pending)`);
    }
  }
}

function runCheck() {
  console.log("==========================================");
  console.log("  The Hair Arena Ng - Image Audit");
  console.log("==========================================\n");

  if (!fs.existsSync(imagesDir)) {
    console.error(`Error: Directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const expectedList = getExpectedImages();
  const presentInDir = new Set(fs.readdirSync(imagesDir));

  const present = [];
  const missing = [];
  const warnings = [];

  for (const filename of expectedList) {
    const fullPath = path.join(imagesDir, filename);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const ext = path.extname(filename).toLowerCase();
      const sizeKB = (stats.size / 1024).toFixed(1);

      present.push({ filename, size: stats.size, sizeKB, ext });

      if (!ALLOWED_EXTENSIONS.has(ext)) {
        warnings.push(`[INVALID FORMAT] ${filename}: extension ${ext} is not allowed (must be jpg, png, or webp).`);
      }

      if (stats.size > MAX_FILE_SIZE_BYTES) {
        warnings.push(`[SIZE WARNING] ${filename}: ${sizeKB} KB exceeds 500 KB limit.`);
      }
    } else {
      missing.push(filename);
    }
  }

  // Check for any unlisted files in public/images
  const unexpected = [];
  for (const file of presentInDir) {
    if (file === ".gitkeep") continue;
    if (!expectedList.includes(file)) {
      const fullPath = path.join(imagesDir, file);
      const stats = fs.statSync(fullPath);
      const ext = path.extname(file).toLowerCase();
      const sizeKB = (stats.size / 1024).toFixed(1);
      unexpected.push({ file, sizeKB, ext });
      warnings.push(`[UNEXPECTED FILE] ${file}: Not listed in site.ts or guide.`);
    }
  }

  console.log(`Expected Images: ${expectedList.length}`);
  console.log(`Present:         ${present.length}`);
  console.log(`Missing:         ${missing.length}`);
  console.log(`Warnings:        ${warnings.length}\n`);

  if (present.length > 0) {
    console.log("--- Present Images ---");
    for (const p of present) {
      console.log(`  [OK] ${p.filename} (${p.sizeKB} KB)`);
    }
    console.log("");
  }

  if (missing.length > 0) {
    console.log("--- Missing Images (Slot shows neutral block) ---");
    for (const m of missing) {
      console.log(`  [MISSING] ${m}`);
    }
    console.log("");
  }

  if (unexpected.length > 0) {
    console.log("--- Unexpected Files in public/images ---");
    for (const u of unexpected) {
      console.log(`  [WARN] ${u.file} (${u.sizeKB} KB)`);
    }
    console.log("");
  }

  if (warnings.length > 0) {
    console.log("--- Warnings ---");
    for (const w of warnings) {
      console.warn(`  ${w}`);
    }
    console.log("");
  }

  checkAppMetadataImages();

  console.log("\n==========================================");
  console.log(
    missing.length === 0 && warnings.length === 0
      ? "All expected real photos are present and within limits!"
      : `Audit complete: ${missing.length} photos missing (rendered as neutral blocks), ${warnings.length} warning(s).`
  );
  console.log("==========================================");
}

runCheck();
