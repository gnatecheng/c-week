package com.py2c.week.update

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL

object SideloadUpdateFetcher {

    suspend fun fetchRemoteVersion(): RemoteVersionInfo? = withContext(Dispatchers.IO) {
        runCatching {
            val connection = (URL(VERSION_JSON_URL).openConnection() as HttpURLConnection).apply {
                connectTimeout = 15_000
                readTimeout = 15_000
                requestMethod = "GET"
                setRequestProperty("Accept", "application/json")
            }
            try {
                val code = connection.responseCode
                if (code !in 200..299) return@withContext null
                val body = connection.inputStream.bufferedReader().use { it.readText() }
                parseRemoteVersionJson(body)
            } finally {
                connection.disconnect()
            }
        }.getOrNull()
    }
}
