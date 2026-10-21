package com.py2c.week.ui.privacy

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.activity.ComponentActivity
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onRoot
import androidx.test.core.app.ApplicationProvider
import com.github.takahirom.roborazzi.captureRoboImage
import com.py2c.week.Py2CApplication
import com.py2c.week.data.AppContainer
import com.py2c.week.data.AppLocale
import com.py2c.week.data.CheckInClock
import com.py2c.week.data.ProgressSnapshot
import com.py2c.week.data.UserPreferences
import com.py2c.week.ui.navigation.LocalContainer
import com.py2c.week.ui.settings.SettingsScreen
import com.py2c.week.ui.strings.LocalAppLocale
import com.py2c.week.ui.strings.LocalStrings
import com.py2c.week.ui.strings.stringsFor
import com.py2c.week.ui.theme.Py2CTheme
import org.junit.After
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import java.time.LocalDate
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.RuntimeEnvironment
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode

@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [33], application = Py2CApplication::class, qualifiers = "w360dp-h720dp-480dpi")
class PrivacyUiRoborazziTest {
    @get:Rule
    val composeRule = createAndroidComposeRule<ComponentActivity>()

    private val phoneQualifiers = "w360dp-h720dp-480dpi"
    private val fixedToday = LocalDate.of(2026, 9, 28)

    @Before
    fun fixClock() {
        CheckInClock.fixedToday = fixedToday
    }

    @After
    fun resetClock() {
        CheckInClock.clearFixedToday()
    }

    @After
    fun resetQualifiers() {
        RuntimeEnvironment.setQualifiers(phoneQualifiers)
    }

    @Test
    fun settingsPrivacyEntryZhLight() {
        captureSettings(
            locale = AppLocale.ZH,
            darkTheme = false,
            output = "/opt/cursor/artifacts/cweek-settings-privacy-zh-light.png",
        )
    }

    @Test
    fun privacyNoticeEnDark() {
        captureNotice(
            locale = AppLocale.EN,
            darkTheme = true,
            output = "/opt/cursor/artifacts/cweek-privacy-notice-en-dark.png",
        )
    }

    @Test
    fun privacyNoticeZhLight() {
        captureNotice(
            locale = AppLocale.ZH,
            darkTheme = false,
            output = "/opt/cursor/artifacts/cweek-privacy-notice-zh-light.png",
        )
    }

    @Test
    fun privacyPolicyScreenZhLight() {
        capturePolicy(
            locale = AppLocale.ZH,
            darkTheme = false,
            output = "/opt/cursor/artifacts/cweek-privacy-policy-zh-light.png",
        )
    }

    @Test
    fun fastlaneHomeZhLight() {
        // Re-use home capture dimensions for Play Store screenshots (1080×2160 px).
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val container = AppContainer(context)
        val curriculum = container.curriculumFor(AppLocale.ZH)
        val strings = stringsFor(AppLocale.ZH, context.resources)
        RuntimeEnvironment.setQualifiers(phoneQualifiers)
        composeRule.setContent {
            Py2CTheme(darkTheme = false) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides AppLocale.ZH,
                        LocalContainer provides container,
                    ) {
                        com.py2c.week.ui.home.HomeScreen(
                            curriculum = curriculum,
                            progress = ProgressSnapshot(
                                checkinDates = setOf(fixedToday.toString()),
                                checkedCourseDays = setOf(1),
                            ),
                            onOpenDay = {},
                            onOpenWrongBook = {},
                            onOpenReport = {},
                            onOpenSettings = {},
                            onReset = {},
                        )
                    }
                }
            }
        }
        composeRule.waitForIdle()
        composeRule.onRoot().captureRoboImage(
            "/workspace/fastlane/metadata/android/zh-CN/images/phoneScreenshots/01_home.png",
        )
    }

    @Test
    fun fastlaneHomeEnLight() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val container = AppContainer(context)
        val curriculum = container.curriculumFor(AppLocale.EN)
        val strings = stringsFor(AppLocale.EN, context.resources)
        RuntimeEnvironment.setQualifiers(phoneQualifiers)
        composeRule.setContent {
            Py2CTheme(darkTheme = false) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides AppLocale.EN,
                        LocalContainer provides container,
                    ) {
                        com.py2c.week.ui.home.HomeScreen(
                            curriculum = curriculum,
                            progress = ProgressSnapshot(
                                checkinDates = setOf(fixedToday.toString()),
                                checkedCourseDays = setOf(1),
                            ),
                            onOpenDay = {},
                            onOpenWrongBook = {},
                            onOpenReport = {},
                            onOpenSettings = {},
                            onReset = {},
                        )
                    }
                }
            }
        }
        composeRule.waitForIdle()
        composeRule.onRoot().captureRoboImage(
            "/workspace/fastlane/metadata/android/en-US/images/phoneScreenshots/01_home.png",
        )
    }

    private fun captureSettings(locale: AppLocale, darkTheme: Boolean, output: String) {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val container = AppContainer(context)
        val strings = stringsFor(locale, context.resources)
        RuntimeEnvironment.setQualifiers(phoneQualifiers)
        if (darkTheme) RuntimeEnvironment.setQualifiers("+night")
        composeRule.setContent {
            Py2CTheme(darkTheme = darkTheme) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides locale,
                        LocalContainer provides container,
                    ) {
                        SettingsScreen(
                            strings = strings,
                            preferences = UserPreferences(),
                            store = container.userPreferencesStore,
                            onBack = {},
                            onOpenPrivacyPolicy = {},
                        )
                    }
                }
            }
        }
        composeRule.waitForIdle()
        composeRule.onRoot().captureRoboImage(output)
    }

    private fun captureNotice(locale: AppLocale, darkTheme: Boolean, output: String) {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val strings = stringsFor(locale, context.resources)
        RuntimeEnvironment.setQualifiers(phoneQualifiers)
        if (darkTheme) RuntimeEnvironment.setQualifiers("+night")
        captureRoboImage(output) {
            Py2CTheme(darkTheme = darkTheme) {
                Box(Modifier.fillMaxSize()) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides locale,
                    ) {
                        PrivacyNoticeDialog(
                            strings = strings,
                            onDismiss = {},
                            onReadFull = {},
                        )
                    }
                }
            }
        }
    }

    private fun capturePolicy(locale: AppLocale, darkTheme: Boolean, output: String) {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val strings = stringsFor(locale, context.resources)
        RuntimeEnvironment.setQualifiers(phoneQualifiers)
        if (darkTheme) RuntimeEnvironment.setQualifiers("+night")
        composeRule.setContent {
            Py2CTheme(darkTheme = darkTheme) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides locale,
                    ) {
                        PrivacyPolicyScreen(strings = strings, onBack = {})
                    }
                }
            }
        }
        composeRule.waitForIdle()
        composeRule.onRoot().captureRoboImage(output)
    }
}
