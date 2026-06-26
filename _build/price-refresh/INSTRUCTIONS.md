# Apify price-refresh job — St.Tropez ES

Keeps EUR prices up to date by scraping each product's UK retailer price (mostly Boots) and converting GBP → EUR at the rate in `sttdata.js` (`RATE`, default 1.16).

## How it works
The St.Tropez brand site shows no price — each product page links out to a retailer. So the job runs in two hops:
1. Open each St.Tropez UK product page → find the first retailer "Buy Now" link → enqueue it.
2. Open the retailer page → read the GBP price (from JSON-LD `offers.price`, `og:price:amount`, or a `£` match) → output GBP + EUR per product slug.

## One-time setup on Apify
1. Generate the task input:
   ```bash
   node make-input.js        # writes apify-task-input.json
   ```
2. In the Apify console, create a new task from the **`apify/web-scraper`** Actor.
3. Open the task's **JSON input** editor and paste the contents of `apify-task-input.json`. Save.
   - It already includes the 38 start URLs, the GB residential proxy, the `urlToSlug` map, and the `pageFunction`.
4. Run once to confirm it returns rows like `{ slug, retailer, priceGBP, priceEUR, checkedAt }`.

## Schedule it
In the Apify console: **Schedules → Create schedule** → add this task → set cadence (e.g. weekly, `0 6 * * 1` = Mondays 06:00). Apify stores each run's dataset.

## Apply prices back to the site
1. After a run, export the dataset: **Dataset → Export → JSON**. Save it here as `prices.json`.
2. Apply and regenerate:
   ```bash
   node apply-prices.js                 # patches ../sttdata.js
   cd ../.. && OUT=. node _build/sttgen.js   # rebuilds the site
   git add -A && git commit -m "Refresh prices" && git push
   ```

## Notes
- If a product returns no price (retailer out of stock / blocked), its row has `priceGBP: null` and `apply-prices.js` keeps the existing value.
- To change the FX rate, edit `RATE` in `sttdata.js` (and in `make-input.js` if you want the job's `priceEUR` to match).
- Want this fully hands-off (auto-apply + auto-push on a schedule)? That can be wired up separately — ask and it can be set up.
