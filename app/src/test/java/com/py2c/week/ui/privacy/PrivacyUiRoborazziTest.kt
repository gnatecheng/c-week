package com.py2c.week.ui.privacy

import androidx.compose.foundation.ScrollState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.activity.ComponentActivity
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performScrollTo
import com.py2c.week.ContactEmail
import androidx.test.core.app.ApplicationProvider
import com.github.takahirom.roborazzi.captureRoboImage
import com.py2c.week.Py2CApplication
import com.py2c.week.data.AppContainer
import com.py2c.week.data.AppLocale
import com.py2c.week.data.CheckInClock
import com.py2c.week.data.ProgressSnapshot
import com.py2c.week.data.UserPreferences
import com.py2c.week.ui.home.HomeScreen
import com.py2c.week.ui.lesson.LessonScreen
import com.py2c.week.ui.navigation.LocalContainer
import com.py2c.week.ui.settings.SettingsScreen
import com.py2c.week.ui.strings.LocalAppLocale
import com.py2c.week.ui.strings.LocalStrings
import com.py2c.week.ui.strings.stringsFor
import com.py2c.week.ui.theme.Py2CTheme
import java.io.File
import java.security.MessageDigest
import org.junit.After
import org.junit.Assert.assertNotEquals
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.FixMethodOrder
import org.junit.runners.MethodSorters
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.RuntimeEnvironment
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode
import java.time.LocalDate
import kotlinx.coroutines.runBlocking

@RunWith(RobolectricTestRunner::class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [33], application = Py2CApplication::class, qualifiers = "w360dp-h720dp-480dpi")
class PrivacyUiRoborazziTest {
    @get:Rule
    val composeRule = createAndroidComposeRule<ComponentActivity>()

    private val phoneQualifiers = "w360dp-h720dp-480dpi"
    private val fixedToday = LocalDate.of(2026, 9, 28)

    private val noticeZhPath = "/opt/cursor/artifacts/cweek-privacy-notice-zh-light.png"
    private val noticeEnPath = "/opt/cursor/artifacts/cweek-privacy-notice-en-dark.png"

    @Before
    fun fixClock() {
        CheckInClock.fixedToday = fixedToday
    }

    @After
    fun resetClock() {
        CheckInClock.clearFixedToday()
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
        captureNoticeOverHome(
            locale = AppLocale.EN,
            darkTheme = true,
            roboQualifiers = "en-rUS-w360dp-h720dp-480dpi",
            extraNight = true,
            output = noticeEnPath,
        )
    }

    @Test
    fun privacyNoticeZhLight() {
        captureNoticeOverHome(
            locale = AppLocale.ZH,
            darkTheme = false,
            roboQualifiers = "zh-rCN-w360dp-h720dp-480dpi",
            extraNight = false,
            output = noticeZhPath,
        )
    }

    @Test
    fun zz_privacyNoticeZhAndEnPngMd5Differ() {
        val zhMd5 = MessageDigest.getInstance("MD5").digest(File(noticeZhPath).readBytes())
        val enMd5 = MessageDigest.getInstance("MD5").digest(File(noticeEnPath).readBytes())
        assertNotEquals(
            "Notice PNG MD5 must differ (locale/theme/home under scrim)",
            zhMd5.contentToString(),
            enMd5.contentToString(),
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
    fun privacyPolicyContactEmailZhLight() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val strings = stringsFor(AppLocale.ZH, context.resources)
        RuntimeEnvironment.setQualifiers("zh-rCN-w360dp-h720dp-480dpi")
        val scrollRef = arrayOfNulls<ScrollState>(1)
        composeRule.setContent {
            val scrollState = rememberScrollState()
            scrollRef[0] = scrollState
            Py2CTheme(darkTheme = false) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides AppLocale.ZH,
                    ) {
                        PrivacyPolicyScreen(
                            strings = strings,
                            onBack = {},
                            scrollState = scrollState,
                        )
                    }
                }
            }
        }
        composeRule.waitForIdle()
        composeRule.waitUntil(timeoutMillis = 10_000) { (scrollRef[0]?.maxValue ?: 0) > 0 }
        val scrollState = scrollRef[0]!!
        composeRule.runOnIdle {
            runBlocking {
                // Single Text block for policy body — scroll to bottom so 联系方式 + email are in view.
                scrollState.scrollTo(scrollState.maxValue)
            }
        }
        composeRule.waitForIdle()
        composeRule.onRoot().captureRoboImage(
            "/opt/cursor/artifacts/cweek-privacy-policy-contact-zh-light.png",
        )
    }

    @Test
    fun settingsAboutContactEmailZhLight() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val container = AppContainer(context)
        val strings = stringsFor(AppLocale.ZH, context.resources)
        RuntimeEnvironment.setQualifiers("zh-rCN-w360dp-h720dp-480dpi")
        composeRule.setContent {
            Py2CTheme(darkTheme = false) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides AppLocale.ZH,
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
        composeRule
            .onNodeWithText("${strings.aboutContact}: ${ContactEmail.PUBLIC}", substring = true)
            .performScrollTo()
        composeRule.waitForIdle()
        composeRule.onRoot().captureRoboImage(
            "/opt/cursor/artifacts/cweek-settings-about-contact-zh-light.png",
        )
    }

    @Test
    fun fastlaneHomeZhLight() {
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
                        HomeScreen(
                            curriculum = curriculum,
                            progress = demoProgress(),
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
    fun fastlaneLessonZhLight() {
        captureLesson(
            locale = AppLocale.ZH,
            lessonId = "d1-l2",
            output = "/workspace/fastlane/metadata/android/zh-CN/images/phoneScreenshots/02_lesson.png",
        )
    }

    @Test
    fun fastlaneLessonEnLight() {
        captureLesson(
            locale = AppLocale.EN,
            lessonId = "d1-l2",
            output = "/workspace/fastlane/metadata/android/en-US/images/phoneScreenshots/02_lesson.png",
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
                        HomeScreen(
                            curriculum = curriculum,
                            progress = demoProgress(),
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

    private fun demoProgress() = ProgressSnapshot(
        checkinDates = setOf(fixedToday.toString()),
        checkedCourseDays = setOf(1),
    )

    private fun captureLesson(locale: AppLocale, lessonId: String, output: String) {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val container = AppContainer(context)
        val curriculum = container.curriculumFor(locale)
        val day = curriculum.days.first { it.id == 1 }
        val lesson = day.lessons.first { it.id == lessonId }
        val strings = stringsFor(locale, context.resources)
        RuntimeEnvironment.setQualifiers(phoneQualifiers)
        composeRule.setContent {
            Py2CTheme(darkTheme = false) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides locale,
                        LocalContainer provides container,
                    ) {
                        LessonScreen(
                            day = day,
                            lesson = lesson,
                            demos = curriculum.demos,
                            videos = curriculum.videos,
                            completed = false,
                            onBack = {},
                            onOpenDemo = {},
                            onMarkDone = {},
                        )
                    }
                }
            }
        }
        composeRule.waitForIdle()
        composeRule.onRoot().captureRoboImage(output)
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

    private fun captureNoticeOverHome(
        locale: AppLocale,
        darkTheme: Boolean,
        roboQualifiers: String,
        output: String,
        extraNight: Boolean = false,
    ) {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val container = AppContainer(context)
        val curriculum = container.curriculumFor(locale)
        val strings = stringsFor(locale, context.resources)
        RuntimeEnvironment.setQualifiers(roboQualifiers)
        if (extraNight) {
            RuntimeEnvironment.setQualifiers("+night")
        }
        composeRule.setContent {
            Py2CTheme(darkTheme = darkTheme) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    CompositionLocalProvider(
                        LocalStrings provides strings,
                        LocalAppLocale provides locale,
                        LocalContainer provides container,
                    ) {
                        Box(Modifier.fillMaxSize()) {
                            HomeScreen(
                                curriculum = curriculum,
                                progress = demoProgress(),
                                onOpenDay = {},
                                onOpenWrongBook = {},
                                onOpenReport = {},
                                onOpenSettings = {},
                                onReset = {},
                            )
                            PrivacyNoticeOverlay(
                                strings = strings,
                                onDismiss = {},
                                onReadFull = {},
                            )
                        }
                    }
                }
            }
        }
        composeRule.waitForIdle()
        composeRule.onRoot().captureRoboImage(output)
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
