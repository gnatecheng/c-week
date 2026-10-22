package com.py2c.week.ui.privacy

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.ScrollState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.py2c.week.data.AppLocale
import com.py2c.week.ui.strings.AppStrings
import com.py2c.week.ui.strings.LocalAppLocale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PrivacyPolicyScreen(
    strings: AppStrings,
    onBack: () -> Unit,
    scrollState: ScrollState = rememberScrollState(),
) {
    val context = LocalContext.current
    val locale = LocalAppLocale.current
    val assetName = if (locale == AppLocale.EN) "privacy/privacy_en.txt" else "privacy/privacy_zh.txt"
    val body = remember(assetName) {
        context.assets.open(assetName).bufferedReader().use { it.readText() }
    }
    val webUrl = if (locale == AppLocale.EN) {
        "https://etais.dev/en/privacy/"
    } else {
        "https://etais.dev/privacy/"
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(strings.privacyPolicyTitle) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = strings.back)
                    }
                },
            )
        },
    ) { padding ->
        Column(
            Modifier
                .padding(padding)
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            Text(
                text = body,
                style = MaterialTheme.typography.bodyMedium,
            )
            OutlinedButton(
                onClick = {
                    context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(webUrl)))
                },
                modifier = Modifier.fillMaxWidth(),
            ) {
                Text(strings.privacyPolicyOpenWeb)
            }
        }
    }
}
