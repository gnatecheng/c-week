/**
 * Canonical APK download URLs for etais.dev (R2 via dl.etais.dev).
 * After each app release, update version here, regenerate QR SVGs, and run `node scripts/build-site.mjs`.
 */

export const R2_DOWNLOAD_BASE = "https://dl.etais.dev";

/** @type {Record<string, { version: string, fileBase: string }>} */
export const SITE_APK_RELEASES = {
  "easy-ledger": { version: "1.3.3", fileBase: "easy-ledger" },
  "group-matters": { version: "1.5.3", fileBase: "group-matters" },
  "c-week": { version: "1.5.2", fileBase: "c-week" },
};

export function apkFileName(slug) {
  const r = SITE_APK_RELEASES[slug];
  if (!r) throw new Error(`Unknown app slug for download config: ${slug}`);
  return `${r.fileBase}-${r.version}.apk`;
}

export function r2ApkUrl(slug) {
  return `${R2_DOWNLOAD_BASE}/${apkFileName(slug)}`;
}

export function releaseVersion(slug) {
  return SITE_APK_RELEASES[slug].version;
}

export function githubReleaseLatestUrl(githubRepo) {
  return `https://github.com/${githubRepo}/releases/latest`;
}

/** QR asset filenames under site/assets/qr/ */
export const QR_FILES = {
  "c-week": "c-week.svg",
  "easy-ledger": "easy-ledger.svg",
  "group-matters": "group-matters.svg",
};
