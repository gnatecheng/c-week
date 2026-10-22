#!/usr/bin/env python3
"""Decode QR SVGs and assert they match scripts/site-download-config.mjs URLs."""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QR_DIR = ROOT / "site" / "assets" / "qr"

EXPECTED = {
    "c-week.svg": "https://dl.etais.dev/c-week-1.5.2.apk",
    "easy-ledger.svg": "https://dl.etais.dev/easy-ledger-1.3.3.apk",
    "group-matters.svg": "https://dl.etais.dev/group-matters-1.5.3.apk",
}


def decode_svg(path: Path) -> str:
    png = path.with_suffix(".png")
    try:
        import cairosvg  # type: ignore

        cairosvg.svg2png(url=str(path), write_to=str(png), output_width=400, output_height=400)
    except Exception:
        subprocess.run(
            ["rsvg-convert", "-w", "400", "-h", "400", str(path), "-o", str(png)],
            check=True,
            capture_output=True,
        )
    from PIL import Image
    from pyzbar.pyzbar import decode as zbar_decode

    data = zbar_decode(Image.open(png))
    if not data:
        raise RuntimeError(f"no QR payload in {path}")
    return data[0].data.decode("utf-8")


def main() -> int:
    ok = True
    for name, want in EXPECTED.items():
        path = QR_DIR / name
        got = decode_svg(path)
        if got != want:
            print(f"FAIL {name}: got {got!r} want {want!r}")
            ok = False
        else:
            print(f"OK {name} -> {got}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
