import { GITHUB_ICON_PATH } from "./site-app-config.mjs";
import { githubReleaseLatestUrl, releaseVersion, r2ApkUrl } from "./site-download-config.mjs";
import { t } from "./static-i18n.mjs";

function escAttrLocal(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * @param {import("./site-app-config.mjs").APP_PAGES[number]} app
 * @param {Record<string, string>} dict
 * @param {{ hub?: boolean }} [opts] hub=true keeps data-i18n on site/index.html panels
 */
export function renderDownloadPanel(app, dict, opts = {}) {
  const hub = !!opts.hub;
  const name = t(dict, app.keys.name);
  const ver = releaseVersion(app.slug);
  const apkUrl = r2ApkUrl(app.slug);
  const mirrorUrl = githubReleaseLatestUrl(app.github);
  const i18n = (key, attr) => (hub ? ` data-i18n${attr}="${key}"` : "");
  const dlBtn = t(dict, app.keys.downloadApk);
  const note = t(dict, "download.releasesNote");
  const mirrorLabel = t(dict, "download.githubMirror");
  const scanOr = t(dict, "download.scanOr");
  const qrCaption = t(dict, "download.qrCaption");
  const qrAlt = t(dict, app.qrAltKey);
  const viewGh = t(dict, app.keys.viewGithub);

  return `              <div class="download-panel ${app.panelClass}" data-app-meta="${app.appMeta}">
                <div class="download-panel__body">
                  <div class="download-panel__left">
                  <div class="download-panel__head">
                  <img
                    class="download-panel__icon"
                    src="${app.iconSrc}"
                    width="44"
                    height="44"
                    alt="${escAttrLocal(name)}"${i18n(app.keys.name, "-alt")}
                    decoding="async"
                  />
                  <div>
                    <p class="download-panel__name"${i18n(app.keys.name, "")}>${name}</p>
                    <p class="download-panel__version">
                      v<span class="app-meta-version">${ver}</span><span aria-hidden="true"> · </span
                      ><span${i18n("download.androidMin", "")}>${t(dict, "download.androidMin")}</span><span aria-hidden="true"> · </span
                      ><span${i18n("download.apkLabel", "")}>${t(dict, "download.apkLabel")}</span>
                    </p>
                  </div>
                </div>
                  <div class="download-panel__primary">
                    <a
                      class="btn btn-primary"
                      href="${apkUrl}"
                      rel="noopener noreferrer"${i18n(app.keys.downloadApk, "")}
                    >
                      ${dlBtn}
                    </a>
                    <p class="download-panel__note"${i18n("download.releasesNote", "")}>${note}</p>
                    <p class="download-panel__mirror">
                      <a href="${mirrorUrl}" rel="noopener noreferrer"${i18n("download.githubMirror", "")}>${mirrorLabel}</a>
                    </p>
                  </div>
                  </div>
                  <div class="download-panel__divider" role="presentation">
                    <div class="download-panel__divider-track">
                      <span class="download-panel__divider-label"${i18n("download.scanOr", "")}>${scanOr}</span>
                    </div>
                  </div>
                  <div class="download-panel__scan">
                    <figure class="download-panel__qr">
                      <div class="download-panel__qr-frame">
                        <img src="${app.qrSrc}" width="120" height="120"${i18n(app.qrAltKey, "-alt")} alt="${escAttrLocal(qrAlt)}" decoding="async" />
                      </div>
                      <figcaption${i18n("download.qrCaption", "")}>${qrCaption}</figcaption>
                    </figure>
                  </div>
                </div>
              </div>
              <a
                class="download-panel__source"
                href="https://github.com/${app.github}"
                rel="noopener noreferrer"
              >
                <svg class="icon-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path d="${GITHUB_ICON_PATH}" />
                </svg>
                <span${i18n(app.keys.viewGithub, "")}>${viewGh}</span>
              </a>`;
}
