package com.py2c.week.ui.privacy

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.core.app.ApplicationProvider
import com.py2c.week.data.AppContainer
import com.py2c.week.data.AppLocale
import com.py2c.week.ui.strings.LocalAppLocale
import com.py2c.week.ui.strings.LocalStrings
import com.py2c.week.ui.strings.stringsFor
import com.py2c.week.ui.theme.Py2CTheme
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
class PrivacyNoticeOverlayTest {
    @get:Rule
    val composeRule = createComposeRule()

    @Test
    fun zhShowsGotItAndReadFull_notEnglish() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val strings = stringsFor(AppLocale.ZH, context.resources)
        composeRule.setContent {
            Py2CTheme {
                CompositionLocalProvider(
                    LocalStrings provides strings,
                    LocalAppLocale provides AppLocale.ZH,
                ) {
                    PrivacyNoticeOverlay(strings, onDismiss = {}, onReadFull = {})
                }
            }
        }
        composeRule.onNodeWithText("我知道了").assertIsDisplayed()
        composeRule.onNodeWithText("查看全文").assertIsDisplayed()
        assertTrue(composeRule.onAllNodesWithText("Got it").fetchSemanticsNodes().isEmpty())
    }

    @Test
    fun enShowsEnglishButtons() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val strings = stringsFor(AppLocale.EN, context.resources)
        composeRule.setContent {
            Py2CTheme(darkTheme = true) {
                CompositionLocalProvider(
                    LocalStrings provides strings,
                    LocalAppLocale provides AppLocale.EN,
                ) {
                    PrivacyNoticeOverlay(strings, onDismiss = {}, onReadFull = {})
                }
            }
        }
        composeRule.onNodeWithText("Got it").assertIsDisplayed()
        composeRule.onNodeWithText("Read full policy").assertIsDisplayed()
    }

    @Test
    fun dismissInvokedWhenGotItClicked() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val strings = stringsFor(AppLocale.ZH, context.resources)
        var dismissCount = 0
        composeRule.setContent {
            Py2CTheme {
                CompositionLocalProvider(LocalStrings provides strings, LocalAppLocale provides AppLocale.ZH) {
                    PrivacyNoticeOverlay(
                        strings = strings,
                        onDismiss = { dismissCount++ },
                        onReadFull = {},
                    )
                }
            }
        }
        composeRule.onNodeWithText("我知道了").performClick()
        assertEquals(1, dismissCount)
    }

}
