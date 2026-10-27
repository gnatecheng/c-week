package com.py2c.week.update

import android.content.Context
import android.os.Build

/** Google Play Store installer package (PackageManager install source). */
const val PLAY_STORE_INSTALLER = "com.android.vending"

/**
 * Returns true when this APK was installed from Google Play (installer is Play Store).
 * Sideloads, website APKs, debug builds, and unknown installers use the dl.etais.dev JSON channel.
 */
fun isInstalledFromPlayStore(context: Context): Boolean {
    val installer = installingPackageName(context) ?: return false
    return installer == PLAY_STORE_INSTALLER
}

internal fun installingPackageName(context: Context): String? {
    val pm = context.packageManager
    val packageName = context.packageName
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        runCatching { pm.getInstallSourceInfo(packageName).installingPackageName }.getOrNull()
    } else {
        @Suppress("DEPRECATION")
        pm.getInstallerPackageName(packageName)
    }
}
