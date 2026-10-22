/**
 * Generate site/privacy/index.html and site/en/privacy/index.html.
 * Run from repo root: node scripts/build-privacy-pages.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { privacyBodyEn, privacyBodyZh } from "./privacy-page-content.mjs";
import { loadTranslations, t } from "./static-i18n.mjs";
import {
  CSS_V,
  GITHUB_META_JS_V,
  INIT_THEME_V,
  OG_IMAGE_V,
  SITE_JS_V,
  TRANSLATIONS_V,
} from "./site-cache-versions.mjs";
import { GITHUB_ICON_PATH } from "./site-app-config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function escAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function renderHubFooter(dict, isEn) {
  const privacyHref = isEn ? "/en/privacy/" : "/privacy/";
  const hubHref = isEn ? "/en/" : "/";
  return `    <footer class="site-footer">
      <div class="wrap inner">
        <p>${t(dict, "footer.copyright")}</p>
        <p class="footer-links">
          <a href="${privacyHref}">${t(dict, "footer.privacy")}</a>
          <a href="https://github.com/gnatecheng/c-week" rel="noopener noreferrer"
            ><svg class="icon-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"
              ><path d="${GITHUB_ICON_PATH}" /></svg
            ><span>${t(dict, "footer.linkCweek")}</span></a
          >
          <a href="https://github.com/gnatecheng/easy-ledger" rel="noopener noreferrer"
            ><svg class="icon-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"
              ><path d="${GITHUB_ICON_PATH}" /></svg
            ><span>${t(dict, "footer.linkQjz")}</span></a
          >
          <a href="https://github.com/gnatecheng/group-matters" rel="noopener noreferrer"
            ><svg class="icon-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"
              ><path d="${GITHUB_ICON_PATH}" /></svg
            ><span>${t(dict, "footer.linkClass")}</span></a
          >
        </p>
        <p class="footer-hub-link"><a href="${hubHref}">${t(dict, "privacy.backToHub")}</a></p>
      </div>
    </footer>`;
}

function renderPage(isEn, dict) {
  const htmlLang = isEn ? "en" : "zh-CN";
  const canonical = isEn ? "https://etais.dev/en/privacy/" : "https://etais.dev/privacy/";
  const zhHref = "https://etais.dev/privacy/";
  const enHref = "https://etais.dev/en/privacy/";
  const title = t(dict, "privacy.meta.title");
  const desc = t(dict, "privacy.meta.description");
  const body = isEn ? privacyBodyEn : privacyBodyZh;
  const hubHref = isEn ? "/en/" : "/";

  return `<!DOCTYPE html>
<html lang="${htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escAttr(title)}</title>
    <meta name="description" content="${escAttr(desc)}" />
    <link rel="alternate" hreflang="zh-CN" href="${zhHref}" />
    <link rel="alternate" hreflang="en" href="${enHref}" />
    <link rel="alternate" hreflang="x-default" href="${zhHref}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="/favicon.ico?v=1" sizes="any" />
    <link rel="icon" href="/assets/icon.svg?v=2" type="image/svg+xml" />
    <link rel="manifest" href="${isEn ? "/site.webmanifest.en.json?v=2" : "/site.webmanifest?v=3"}" />
    <meta name="theme-color" content="#0f766e" />
    <script src="/js/init-theme.js?v=${INIT_THEME_V}"></script>
    <link rel="stylesheet" href="/css/style.css?v=${CSS_V}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escAttr(t(dict, "meta.siteName"))}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escAttr(title)}" />
    <meta property="og:description" content="${escAttr(desc)}" />
    <meta property="og:locale" content="${isEn ? "en_US" : "zh_CN"}" />
    <meta property="og:locale:alternate" content="${isEn ? "zh_CN" : "en_US"}" />
    <meta property="og:image" content="https://etais.dev/assets/og-image.png?v=${OG_IMAGE_V}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escAttr(title)}" />
    <meta name="twitter:description" content="${escAttr(desc)}" />
  </head>
  <body data-page-lang="${isEn ? "en" : "zh"}" class="app-subpage privacy-page">
    <a class="skip-link" href="#main">${t(dict, "skipLink")}</a>
    <header class="site-header app-page-header">
      <div class="wrap header-shell app-page-header-shell">
        <a class="brand" href="${hubHref}">${t(dict, "meta.siteName")}</a>
        <div class="header-tools">
          <div class="site-prefs" id="lang-switch" role="group" aria-label="${escAttr(t(dict, "prefs.langLabel"))}">
            <button type="button" id="lang-zh" aria-pressed="${isEn ? "false" : "true"}">${t(dict, "prefs.langZh")}</button>
            <button type="button" id="lang-en" aria-pressed="${isEn ? "true" : "false"}">${t(dict, "prefs.langEn")}</button>
          </div>
          <button type="button" id="theme-toggle" aria-label="${escAttr(t(dict, "prefs.themeLabel"))}">
            <svg class="icon-sun" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            <svg class="icon-moon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <svg class="icon-system" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          </button>
        </div>
      </div>
    </header>
    <main id="main">
      <section class="app-page-block privacy-document" aria-labelledby="privacy-doc-title">
        <div class="wrap">
          <h1 id="privacy-doc-title" class="project-subhead">${t(dict, "privacy.pageTitle")}</h1>
          <div class="privacy-prose project-prose">
${body}
          </div>
        </div>
      </section>
    </main>
${renderHubFooter(dict, isEn)}
    <script src="/js/translations.js?v=${TRANSLATIONS_V}" defer></script>
    <script src="/js/site.js?v=${SITE_JS_V}" defer></script>
    <script src="/js/github-meta.js?v=${GITHUB_META_JS_V}" defer></script>
  </body>
</html>
`;
}

async function main() {
  const T = await loadTranslations(readFile, root);
  await mkdir(path.join(root, "site/privacy"), { recursive: true });
  await mkdir(path.join(root, "site/en/privacy"), { recursive: true });
  await writeFile(path.join(root, "site/privacy/index.html"), renderPage(false, T.zh), "utf8");
  await writeFile(path.join(root, "site/en/privacy/index.html"), renderPage(true, T.en), "utf8");
  console.log("Wrote site/privacy/index.html and site/en/privacy/index.html");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
