import { GITHUB_ICON_PATH } from "./site-app-config.mjs";
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from "./site-contact.mjs";
import { t } from "./static-i18n.mjs";

/**
 * @param {Record<string, string>} dict
 * @param {{ isEn?: boolean, hub?: boolean, dataI18n?: boolean }} opts
 */
export function renderSiteFooterContactLine(dict, { dataI18n = false } = {}) {
  const i18n = dataI18n ? ' data-i18n="footer.contactEmail"' : "";
  return `        <p class="footer-contact"><a href="${PUBLIC_CONTACT_MAILTO}"${i18n}>${PUBLIC_CONTACT_EMAIL}</a></p>`;
}

/**
 * Hub footer (privacy pages + optional homepage sync).
 */
export function renderHubFooter(dict, isEn, { dataI18n = false } = {}) {
  const privacyHref = isEn ? "/en/privacy/" : "/privacy/";
  const hubHref = isEn ? "/en/" : "/";
  const priv = dataI18n ? ' data-i18n="footer.privacy"' : "";
  const copy = dataI18n ? ' data-i18n="footer.copyright"' : "";
  const linkC = dataI18n ? ' data-i18n="footer.linkCweek"' : "";
  const linkQ = dataI18n ? ' data-i18n="footer.linkQjz"' : "";
  const linkG = dataI18n ? ' data-i18n="footer.linkClass"' : "";
  const back = dataI18n ? ' data-i18n="privacy.backToHub"' : "";
  return `    <footer class="site-footer">
      <div class="wrap inner">
        <p${copy}>${t(dict, "footer.copyright")}</p>
        <p class="footer-links">
          <a href="${privacyHref}"${priv}>${t(dict, "footer.privacy")}</a>
          <a href="https://github.com/gnatecheng/c-week" rel="noopener noreferrer"
            ><svg class="icon-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"
              ><path d="${GITHUB_ICON_PATH}" /></svg
            ><span${linkC}>${t(dict, "footer.linkCweek")}</span></a
          >
          <a href="https://github.com/gnatecheng/easy-ledger" rel="noopener noreferrer"
            ><svg class="icon-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"
              ><path d="${GITHUB_ICON_PATH}" /></svg
            ><span${linkQ}>${t(dict, "footer.linkQjz")}</span></a
          >
          <a href="https://github.com/gnatecheng/group-matters" rel="noopener noreferrer"
            ><svg class="icon-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"
              ><path d="${GITHUB_ICON_PATH}" /></svg
            ><span${linkG}>${t(dict, "footer.linkClass")}</span></a
          >
        </p>
${renderSiteFooterContactLine(dict, { dataI18n })}
        <p class="footer-hub-link"><a href="${hubHref}"${back}>${t(dict, "privacy.backToHub")}</a></p>
      </div>
    </footer>`;
}

/**
 * App landing page footer.
 */
export function renderAppPageFooter(app, dict, isEn) {
  const privacyHref = isEn ? "/en/privacy/" : "/privacy/";
  return `    <footer class="site-footer app-page-footer">
      <div class="wrap inner">
        <p class="footer-copy">${t(dict, app.footerCopyrightKey)}</p>
        <div class="footer-actions">
          <a class="footer-repo-link" href="${privacyHref}">${t(dict, "footer.privacy")}</a>
          <a class="footer-repo-link" href="${PUBLIC_CONTACT_MAILTO}">${PUBLIC_CONTACT_EMAIL}</a>
          <a class="footer-repo-link" href="https://github.com/${app.github}" rel="noopener noreferrer"
            ><svg class="icon-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"
              ><path d="${GITHUB_ICON_PATH}" /></svg
            ><span>${t(dict, app.footerLinkLabelKey)}</span></a
          >
        </div>
      </div>
    </footer>`;
}
