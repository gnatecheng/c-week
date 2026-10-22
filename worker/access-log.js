/** @typedef {import("@cloudflare/workers-types").D1Database} D1Database */

const STATIC_PATH_PREFIXES = ["/css/", "/js/", "/assets/"];

const STATIC_PATH_EXACT = new Set([
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/site.webmanifest",
  "/site.webmanifest.en.json",
]);

/** File extensions we never treat as HTML page navigations. */
const STATIC_EXTENSIONS = new Set([
  "js",
  "css",
  "webp",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "ico",
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  "map",
  "mp4",
  "webm",
  "json",
  "xml",
  "txt",
  "wasm",
]);

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export function isHtmlPageNavigation(pathname) {
  if (!pathname || pathname.startsWith("/.")) return false;
  if (STATIC_PATH_EXACT.has(pathname)) return false;
  for (const prefix of STATIC_PATH_PREFIXES) {
    if (pathname.startsWith(prefix)) return false;
  }
  const slash = pathname.lastIndexOf("/");
  const last = slash >= 0 ? pathname.slice(slash + 1) : pathname;
  if (!last.includes(".")) return true;
  const dot = last.lastIndexOf(".");
  const ext = last.slice(dot + 1).toLowerCase();
  if (!ext) return true;
  return !STATIC_EXTENSIONS.has(ext);
}

/**
 * @param {Request} request
 * @param {Response} response
 * @param {D1Database | undefined} db
 * @param {import("@cloudflare/workers-types").IncomingRequestCfProperties | undefined} cf
 */
export async function insertAccessLog(request, response, db, cf) {
  if (!db) return;
  const url = new URL(request.url);
  if (!isHtmlPageNavigation(url.pathname)) return;

  const headers = request.headers;
  const ts = new Date().toISOString();
  const ip = headers.get("CF-Connecting-IP") ?? headers.get("X-Forwarded-For") ?? null;
  const referer = headers.get("Referer");
  const userAgent = headers.get("User-Agent");
  const acceptLanguage = headers.get("Accept-Language");

  await db
    .prepare(
      `INSERT INTO access_log (
        ts, ip, method, host, path, query, status,
        referer, user_agent, country, city, region, asn, accept_language
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      ts,
      ip,
      request.method,
      url.hostname,
      url.pathname,
      url.search || null,
      response.status,
      referer,
      userAgent,
      cf?.country ?? null,
      cf?.city ?? null,
      cf?.region ?? cf?.regionCode ?? null,
      typeof cf?.asn === "number" ? cf.asn : null,
      acceptLanguage,
    )
    .run();
}

/**
 * @param {ExecutionContext} ctx
 * @param {Request} request
 * @param {Response} response
 * @param {D1Database | undefined} db
 * @param {import("@cloudflare/workers-types").IncomingRequestCfProperties | undefined} cf
 */
export function scheduleAccessLog(ctx, request, response, db, cf) {
  if (!db || !isHtmlPageNavigation(new URL(request.url).pathname)) return;
  ctx.waitUntil(
    insertAccessLog(request, response, db, cf).catch(() => {
      /* never fail the visitor response */
    }),
  );
}
