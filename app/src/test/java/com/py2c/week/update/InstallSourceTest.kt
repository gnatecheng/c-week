package com.py2c.week.update

import android.content.Context
import android.content.pm.PackageManager
import androidx.test.core.app.ApplicationProvider
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.Shadows.shadowOf
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [33])
class InstallSourceTest {

    @Test
    fun playStoreInstallerRecognized() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        val pm = context.packageManager
        shadowOf(pm).setInstallSourceInfo(
            context.packageName,
            PLAY_STORE_INSTALLER,
            PLAY_STORE_INSTALLER,
        )
        assertTrue(isInstalledFromPlayStore(context))
    }

    @Test
    fun unknownInstallerIsSideload() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        val pm = context.packageManager
        shadowOf(pm).setInstallSourceInfo(context.packageName, null, null)
        assertFalse(isInstalledFromPlayStore(context))
    }
}
