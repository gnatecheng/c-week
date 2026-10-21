-- etai-access-log (D1): HTML page visit logs from the etai Worker.
-- Retention: no auto-delete (keep forever unless you run manual DELETE).

CREATE TABLE IF NOT EXISTS access_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,
  ip TEXT,
  method TEXT NOT NULL,
  host TEXT NOT NULL,
  path TEXT NOT NULL,
  query TEXT,
  status INTEGER NOT NULL,
  referer TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  asn INTEGER,
  accept_language TEXT
);

CREATE INDEX IF NOT EXISTS idx_access_log_ts ON access_log (ts);
CREATE INDEX IF NOT EXISTS idx_access_log_ip ON access_log (ip);
