package com.py2c.week.update

import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.IntentSenderRequest
import com.google.android.play.core.appupdate.AppUpdateManagerFactory
import com.google.android.play.core.appupdate.AppUpdateOptions
import com.google.android.play.core.install.model.AppUpdateType
import com.google.android.play.core.install.model.UpdateAvailability

enum class PlayUpdateCheckResult {
    /** Play In-App Update flow was started (flexible). */
    FLOW_STARTED,
    /** Device is on the latest Play-track version. */
    ALREADY_LATEST,
    /** Update exists but flexible flow could not be started; user may open Play manually. */
    UPDATE_ON_PLAY,
    /** Play Core error or unavailable (e.g. sideload with Play libraries present). */
    FAILED,
}

fun checkPlayStoreUpdate(
    activity: ComponentActivity,
    launcher: ActivityResultLauncher<IntentSenderRequest>,
    onResult: (PlayUpdateCheckResult) -> Unit,
) {
    val manager = AppUpdateManagerFactory.create(activity)
    manager.appUpdateInfo
        .addOnSuccessListener { info ->
            when (info.updateAvailability()) {
                UpdateAvailability.UPDATE_AVAILABLE -> {
                    if (info.isUpdateTypeAllowed(AppUpdateType.FLEXIBLE)) {
                        manager.startUpdateFlowForResult(
                            info,
                            launcher,
                            AppUpdateOptions.newBuilder(AppUpdateType.FLEXIBLE).build(),
                        )
                        onResult(PlayUpdateCheckResult.FLOW_STARTED)
                    } else {
                        onResult(PlayUpdateCheckResult.UPDATE_ON_PLAY)
                    }
                }
                UpdateAvailability.UPDATE_NOT_AVAILABLE -> {
                    onResult(PlayUpdateCheckResult.ALREADY_LATEST)
                }
                else -> onResult(PlayUpdateCheckResult.ALREADY_LATEST)
            }
        }
        .addOnFailureListener {
            onResult(PlayUpdateCheckResult.FAILED)
        }
}
