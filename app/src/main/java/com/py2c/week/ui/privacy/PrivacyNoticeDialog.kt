package com.py2c.week.ui.privacy

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import com.py2c.week.ui.strings.AppStrings

@Composable
fun PrivacyNoticeDialog(
    strings: AppStrings,
    onDismiss: () -> Unit,
    onReadFull: () -> Unit,
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(strings.privacyNoticeTitle) },
        text = { Text(strings.privacyNoticeBody) },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text(strings.privacyNoticeGotIt)
            }
        },
        dismissButton = {
            TextButton(onClick = onReadFull) {
                Text(strings.privacyNoticeReadFull)
            }
        },
    )
}
