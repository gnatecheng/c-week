# Export etais.dev access logs (Cloudflare D1)

Database name: **`etai-access-log`** (Worker binding: **`ACCESS_LOG`**).

Schema: `migrations/0001_access_log.sql`.

## Apply migration (once)

After you create the D1 database and set `database_id` in `wrangler.jsonc`:

```bash
npx wrangler d1 execute etai-access-log --remote --file=./migrations/0001_access_log.sql
```

Local (optional):

```bash
npx wrangler d1 execute etai-access-log --local --file=./migrations/0001_access_log.sql
```

## Export JSON (full table)

```bash
npx wrangler d1 execute etai-access-log --remote --command \
  "SELECT id, ts, ip, method, host, path, query, status, referer, user_agent, country, city, region, asn, accept_language FROM access_log ORDER BY ts DESC LIMIT 5000;" \
  --json > access-log-export.json
```

Adjust `LIMIT` or add `WHERE ts >= '2026-10-01'` for smaller pulls.

## Export CSV (via jq)

```bash
npx wrangler d1 execute etai-access-log --remote --command \
  "SELECT ts, ip, method, path, query, status, country, city, region, referer, user_agent FROM access_log ORDER BY ts DESC LIMIT 10000;" \
  --json \
| jq -r '.[0].results[] | [.ts, .ip, .method, .path, .query, .status, .country, .city, .region, .referer, .user_agent] | @csv' \
> access-log.csv
```

(jq path may vary slightly by wrangler JSON shape; inspect `access-log-export.json` first if needed.)

## Example stats queries

**Page views per day (UTC date from `ts`):**

```bash
npx wrangler d1 execute etai-access-log --remote --command \
  "SELECT substr(ts, 1, 10) AS day, COUNT(*) AS views FROM access_log GROUP BY day ORDER BY day DESC LIMIT 90;"
```

**Top referers (non-empty):**

```bash
npx wrangler d1 execute etai-access-log --remote --command \
  "SELECT referer, COUNT(*) AS n FROM access_log WHERE referer IS NOT NULL AND referer != '' GROUP BY referer ORDER BY n DESC LIMIT 20;"
```

**Top countries:**

```bash
npx wrangler d1 execute etai-access-log --remote --command \
  "SELECT country, COUNT(*) AS n FROM access_log WHERE country IS NOT NULL GROUP BY country ORDER BY n DESC LIMIT 20;"
```

**Views by path (last 30 days, example):**

```bash
npx wrangler d1 execute etai-access-log --remote --command \
  "SELECT path, COUNT(*) AS n FROM access_log WHERE ts >= datetime('now', '-30 days') GROUP BY path ORDER BY n DESC LIMIT 50;"
```

Note: `ts` is stored as ISO-8601 UTC text; for heavy analytics consider a derived date column later.
