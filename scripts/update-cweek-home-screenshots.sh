#!/usr/bin/env bash
# Convert Roborazzi PNGs to Fastlane phone screenshots (01_home.png).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ART="${ART:-/opt/cursor/artifacts}"

copy_one() {
  local src="$1"
  local dest="$2"
  if [[ ! -f "$src" ]]; then
    echo "Missing screenshot: $src" >&2
    exit 1
  fi
  mkdir -p "$(dirname "$dest")"
  cp "$src" "$dest"
  echo "Wrote $dest"
}

copy_one "$ART/cweek-home-zh-light-streak1.png" \
  "$ROOT/fastlane/metadata/android/zh-CN/images/phoneScreenshots/01_home.png"
copy_one "$ART/cweek-home-en-light-streak1.png" \
  "$ROOT/fastlane/metadata/android/en-US/images/phoneScreenshots/01_home.png"
