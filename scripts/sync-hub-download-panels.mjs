/**
 * Replace homepage download panels in site/index.html from site-download-config + APP_PAGES.
 * Run: node scripts/sync-hub-download-panels.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { APP_PAGES } from "./site-app-config.mjs";
import { renderDownloadPanel } from "./render-download-panel.mjs";
import { loadTranslations } from "./static-i18n.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "site/index.html");
const T = await loadTranslations(readFile, root);

let html = await readFile(indexPath, "utf8");

for (const app of APP_PAGES) {
  const re = new RegExp(
    `<div class="download-panel ${app.panelClass.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}" data-app-meta="${app.appMeta}">[\\s\\S]*?class="download-panel__source"[\\s\\S]*?</a>`,
    "m",
  );
  const block = renderDownloadPanel(app, T.zh, { hub: true });
  const next = html.replace(re, block);
  if (next === html) {
    throw new Error(`Could not find download panel for ${app.slug} in site/index.html`);
  }
  html = next;
}

await writeFile(indexPath, html, "utf8");
console.log("Updated download panels in site/index.html");
