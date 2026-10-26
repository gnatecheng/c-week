/**
 * Insert public contact email into site/index.html footer (data-i18n for /en/ clone).
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from "./site-contact.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "site/index.html");

let html = await readFile(indexPath, "utf8");
const marker = 'class="footer-contact"';
if (html.includes(marker)) {
  console.log("site/index.html footer contact already present");
} else {
  const insert = `\n        <p class="footer-contact"><a href="${PUBLIC_CONTACT_MAILTO}" data-i18n="footer.contactEmail">${PUBLIC_CONTACT_EMAIL}</a></p>`;
  const replaced = html.replace(/(<p class="footer-links">[\s\S]*?<\/p>)/, `$1${insert}`);
  if (replaced === html) {
    throw new Error("Could not insert footer contact into site/index.html");
  }
  await writeFile(indexPath, replaced, "utf8");
  console.log("Inserted footer contact into site/index.html");
}
