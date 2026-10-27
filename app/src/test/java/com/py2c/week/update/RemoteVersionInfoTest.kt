package com.py2c.week.update

import com.py2c.week.data.AppLocale
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [33])
class RemoteVersionInfoTest {

    @Test
    fun parseFullJson() {
        val json = """
            {
              "versionCode": 9,
              "versionName": "1.5.2",
              "apkUrl": "https://dl.etais.dev/c-week-1.5.2.apk",
              "releaseNotes": { "zh": "修复", "en": "Fixes" }
            }
        """.trimIndent()
        val info = parseRemoteVersionJson(json)!!
        assertEquals(9, info.versionCode)
        assertEquals("1.5.2", info.versionName)
        assertEquals("https://dl.etais.dev/c-week-1.5.2.apk", info.apkUrl)
        assertEquals("修复", info.releaseNotes?.forLocale(AppLocale.ZH))
        assertEquals("Fixes", info.releaseNotes?.forLocale(AppLocale.EN))
    }

    @Test
    fun parseDefaultsApkUrl() {
        val json = """{"versionCode": 10, "versionName": "2.0.0"}"""
        val info = parseRemoteVersionJson(json)!!
        assertEquals(defaultApkUrl("2.0.0"), info.apkUrl)
    }

    @Test
    fun parsePlainReleaseNotesString() {
        val json = """{"versionCode": 1, "versionName": "1.0.0", "releaseNotes": "All good"}"""
        val info = parseRemoteVersionJson(json)!!
        assertEquals("All good", info.releaseNotes?.forLocale(AppLocale.EN))
    }

    @Test
    fun parseInvalidReturnsNull() {
        assertNull(parseRemoteVersionJson("{}"))
        assertNull(parseRemoteVersionJson("not json"))
    }
}
