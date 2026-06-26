/* Generates apify-task-input.json for the St Tropez price-refresh job.
   Run:  node make-input.js   ->  writes apify-task-input.json
   Then paste that JSON into an "apify/web-scraper" task on your Apify account. */
const fs = require("fs");
const path = require("path");

// Map: St Tropez UK product slug  ->  our site slug (sttropeztan.es)
const PAIRS = [
  ["st-tropez-instant-glow-bronzing-mousse-200ml", "espuma-instant-glow-200ml"],
  ["st-tropez-self-tan-express-dark-whipped-mousse-200ml", "espuma-express-dark-whipped-200ml"],
  ["st-tropez-professional-ultra-dark-violet-mist-spray-solution-1l", "pro-ultra-dark-violet-1l"],
  ["st-tropez-professional-express-bronzing-mist-spray-solution-1l", "pro-express-1l"],
  ["st-tropez-professional-classic-bronzing-mist-spray-solution-1l", "pro-classic-1l"],
  ["st-tropez-self-tan-berry-sorbet-kit", "kit-berry-sorbet"],
  ["gradual-tan-classic-daily-firming-lotion-l-m", "gradual-classic-lm"],
  ["gradual-tan-tinted-daily-firming-lotion", "gradual-tinted"],
  ["gradual-tan-watermelon-firming-lotion", "gradual-watermelon"],
  ["st-tropez-award-winning-kit", "kit-award-winning"],
  ["st-tropez-classic-bronzing-mousse-120ml", "espuma-classic-120ml"],
  ["st-tropez-express-starter-kit", "kit-express-starter"],
  ["st-tropez-instant-glow-body-bronzer-light", "instant-glow-body-bronzer-light"],
  ["st-tropez-instant-glow-body-bronzer-medium", "instant-glow-body-bronzer-medium"],
  ["st-tropez-luxe-body-serum-200ml", "luxe-body-serum-200ml"],
  ["st-tropez-luxe-tan-creme-mousse-200ml", "espuma-luxe-creme-200ml"],
  ["st-tropez-luxe-tan-tonic-glow-drops-30ml", "luxe-tonic-glow-drops-30ml"],
  ["st-tropez-self-tan-classic-kit", "kit-self-tan-classic"],
  ["st-tropez-self-tan-dark-mousse-200ml", "espuma-dark-200ml"],
  ["st-tropez-self-tan-express-bronzing-mousse-100ml", "espuma-express-100ml"],
  ["st-tropez-self-tan-express-mist-200ml", "bruma-express-mist-200ml"],
  ["st-tropez-self-tan-purity-body-mousse-200ml", "espuma-purity-200ml"],
  ["st-tropez-self-tan-purity-gel-200ml", "gel-purity-200ml"],
  ["st-tropez-self-tan-purity-mini-kit", "kit-purity-mini"],
  ["st-tropez-tan-berry-sorbet-mousse-200ml", "espuma-berry-sorbet-200ml"],
  ["st-tropez-tan-body-polish-and-exfoliator-200ml", "body-polish-200ml"],
  ["st-tropez-tan-optimiser-body-moisturiser-200ml", "tan-optimiser-200ml"],
  ["st-tropez-tan-remover-mitt", "mitt-tan-remover"],
  ["st-tropez-tan-remover-mousse-200ml", "tan-remover-mousse-200ml"],
  ["st-tropez-ultimate-tan-body-essentials-kit", "kit-ultimate-body-essentials"],
  ["st-tropez-ultimate-tan-face-brush", "face-brush"],
  ["st-tropez-sunlit-skin-bronzing-tint-tan-30ml", "sunlit-skin-tint-tan-30ml"],
  ["st-tropez-self-tan-ultra-dark-violet-mousse-200ml", "espuma-ultra-dark-violet-200ml"],
  ["st-tropez-classic-bronzing-mousse-240ml", "espuma-classic-240ml"],
  ["st-tropez-express-bronzing-mousse-200ml", "espuma-express-200ml"],
  ["st-tropez-self-tan-purity-face-mist-80ml", "bruma-purity-face-80ml"],
  ["st-tropez-dual-sided-luxe-tanning-applicator-mitt", "mitt-dual-luxe"],
  ["gradual-tan-classic-daily-firming-lotion-m-d", "gradual-classic-md"]
];

const BASE = "https://sttropeztan.com/uk/product/";
const RATE = 1.16; // GBP -> EUR

const urlToSlug = {};
const startUrls = PAIRS.map(([uk, our]) => {
  const url = BASE + uk + "/";
  urlToSlug[url] = our;
  urlToSlug[url.replace(/\/$/, "")] = our;
  return { url, userData: { stage: "product", slug: our } };
});

// pageFunction runs on Apify "apify/web-scraper" (Puppeteer + jQuery).
const pageFunction = `async function pageFunction(context) {
  const { request, $, customData, enqueueRequest, log } = context;
  const url = request.url;
  const ud = request.userData || {};
  const RATE = ${RATE};

  // STAGE 2: retailer page -> extract GBP price
  if (ud.stage === 'retailer') {
    let price = null;
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const j = JSON.parse($(el).contents().text() || $(el).html());
        const arr = Array.isArray(j) ? j : (j['@graph'] || [j]);
        arr.forEach(o => {
          let off = o && o.offers; if (!off) return;
          const p = Array.isArray(off) ? off[0] : off;
          if (p && p.price && !price) price = parseFloat(String(p.price).replace(',', '.'));
        });
      } catch (e) {}
    });
    if (!price) { const m = $('meta[property="product:price:amount"], meta[property="og:price:amount"]').attr('content'); if (m) price = parseFloat(m); }
    if (!price) { const t = ($('body').text().match(/£\\s?([0-9]+(?:\\.[0-9]{2})?)/) || [])[1]; if (t) price = parseFloat(t); }
    const eur = price ? Math.round(price * RATE * 100) / 100 : null;
    return { slug: ud.slug, retailer: (new URL(url)).hostname.replace('www.', ''), retailerUrl: url, priceGBP: price, priceEUR: eur, checkedAt: new Date().toISOString() };
  }

  // STAGE 1: St Tropez product page -> find first retailer "Buy Now" link and enqueue it
  const slug = (customData && customData.urlToSlug && customData.urlToSlug[url]) || ud.slug;
  let retailer = null;
  $('a[href^="http"]').each((i, el) => {
    const h = $(el).attr('href') || '';
    if (!retailer && h.indexOf('sttropeztan.com') === -1 &&
        /boots|superdrug|amazon|lookfantastic|cultbeauty|sephora|feelunique|ulta|veryexclusive|next\\.co/i.test(h)) {
      retailer = h.split('?')[0];
    }
  });
  if (retailer) { await enqueueRequest({ url: retailer, userData: { stage: 'retailer', slug } }); return; }
  return { slug, priceGBP: null, priceEUR: null, note: 'no retailer link found', checkedAt: new Date().toISOString() };
}`;

const input = {
  startUrls,
  globs: [],
  pseudoUrls: [],
  linkSelector: "",
  pageFunction,
  proxyConfiguration: { useApifyProxy: true, apifyProxyGroups: ["RESIDENTIAL"], apifyProxyCountry: "GB" },
  maxConcurrency: 5,
  maxRequestRetries: 3,
  maxPagesPerCrawl: 120,
  customData: { urlToSlug }
};

fs.writeFileSync(path.join(__dirname, "apify-task-input.json"), JSON.stringify(input, null, 2));
console.log("Wrote apify-task-input.json with", startUrls.length, "products.");
