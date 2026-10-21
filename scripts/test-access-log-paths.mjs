/**
 * Quick checks for HTML page navigation detection.
 * Run: node scripts/test-access-log-paths.mjs
 */
import { isHtmlPageNavigation } from "../worker/access-log.js";

const cases = [
  ["/", true],
  ["/en/", true],
  ["/c-week/", true],
  ["/en/privacy/", true],
  ["/css/style.css", false],
  ["/js/site.js", false],
  ["/assets/screens/cweek/01-home.webp", false],
  ["/sitemap.xml", false],
  ["/robots.txt", false],
  ["/favicon.ico", false],
  ["/no-such-page", true],
  ["/fonts/foo.woff2", false],
];

let failed = 0;
for (const [path, expected] of cases) {
  const got = isHtmlPageNavigation(path);
  if (got !== expected) {
    console.error(`FAIL ${path}: expected ${expected}, got ${got}`);
    failed++;
  }
}
if (failed) process.exit(1);
console.log(`OK (${cases.length} cases)`);
