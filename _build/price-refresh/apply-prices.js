/* Applies scraped prices to sttdata.js, then you regenerate the site.
   1. In Apify, after the price job runs, export the dataset as JSON ("Download" > JSON).
   2. Save it next to this file as  prices.json
   3. Run:  node apply-prices.js
   4. Regenerate:  cd ../..  &&  OUT=. node _build/sttgen.js
   5. Commit & push.

   prices.json is expected to be an array of objects like:
   [{ "slug": "espuma-classic-240ml", "priceGBP": 35.8, "priceEUR": 41.53 }, ...]
   Items with a null/empty price are skipped (keeps the existing value). */
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "sttdata.js");
const pricesPath = path.join(__dirname, "prices.json");

if (!fs.existsSync(pricesPath)) {
  console.error("Missing prices.json — export the Apify dataset as JSON and save it as prices.json here.");
  process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(pricesPath, "utf8"));
let src = fs.readFileSync(dataPath, "utf8");

let updated = 0, skipped = 0, missing = [];
for (const r of rows) {
  if (!r || !r.slug) continue;
  const gbp = r.priceGBP != null ? Number(r.priceGBP)
            : (r.priceEUR != null ? Number(r.priceEUR) / 1.16 : null);
  if (!gbp || isNaN(gbp)) { skipped++; continue; }
  // Find the product block by slug and replace its gbp:NUMBER
  const re = new RegExp(`(slug:"${r.slug}"[\\s\\S]*?gbp:)\\s*[0-9]+(?:\\.[0-9]+)?`);
  if (re.test(src)) {
    src = src.replace(re, `$1${gbp.toFixed(2)}`);
    updated++;
  } else {
    missing.push(r.slug);
  }
}

fs.writeFileSync(dataPath, src);
console.log(`Updated ${updated} prices, skipped ${skipped} (no price).`);
if (missing.length) console.log("Slugs not found in sttdata.js:", missing.join(", "));
console.log("Now regenerate:  cd ../..  &&  OUT=. node _build/sttgen.js");
