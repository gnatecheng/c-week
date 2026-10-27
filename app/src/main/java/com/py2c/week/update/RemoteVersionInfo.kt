package com.py2c.week.update

import com.py2c.week.data.AppLocale
import org.json.JSONObject

/**
 * Remote sideload version manifest served at [VERSION_JSON_URL].
 *
 * Example (published by `.github/workflows/release-apk.yml` to R2 / dl.etais.dev):
 * ```json
 * {
 *   "versionCode": 9,
 *   "versionName": "1.5.2",
 *   "apkUrl": "https://dl.etais.dev/c-week-1.5.2.apk",
 *   "releaseNotes": { "zh": "…", "en": "…" }
 * }
 * ```
 * `releaseNotes` is optional; may be a `{ "zh", "en" }` object or a single string.
 * `apkUrl` is optional; defaults to `https://dl.etais.dev/c-week-{versionName}.apk`.
 */
const val VERSION_JSON_URL = "https://dl.etais.dev/c-week-version.json"

data class RemoteVersionInfo(
    val versionCode: Int,
    val versionName: String,
    val apkUrl: String,
    val releaseNotes: RemoteReleaseNotes?,
)

data class RemoteReleaseNotes(
    val zh: String?,
    val en: String?,
    val plain: String?,
) {
    fun forLocale(locale: AppLocale): String? {
        val localized = when (locale) {
            AppLocale.ZH -> zh
            AppLocale.EN -> en
        }?.takeIf { it.isNotBlank() }
        return localized ?: plain?.takeIf { it.isNotBlank() }
    }
}

fun defaultApkUrl(versionName: String): String =
    "https://dl.etais.dev/c-week-$versionName.apk"

fun parseRemoteVersionJson(json: String): RemoteVersionInfo? = runCatching {
    val root = JSONObject(json)
    val versionCode = root.getInt("versionCode")
    val versionName = root.getString("versionName")
    val apkUrl = root.optString("apkUrl").takeIf { it.isNotBlank() }
        ?: defaultApkUrl(versionName)
    val releaseNotes = parseReleaseNotes(root.opt("releaseNotes"))
    RemoteVersionInfo(versionCode, versionName, apkUrl, releaseNotes)
}.getOrNull()

private fun parseReleaseNotes(raw: Any?): RemoteReleaseNotes? = when (raw) {
    null -> null
    is JSONObject -> RemoteReleaseNotes(
        zh = raw.optString("zh").takeIf { it.isNotBlank() },
        en = raw.optString("en").takeIf { it.isNotBlank() },
        plain = null,
    )
    is String -> RemoteReleaseNotes(zh = null, en = null, plain = raw.takeIf { it.isNotBlank() })
    else -> null
}
