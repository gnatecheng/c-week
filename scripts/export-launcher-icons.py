#!/usr/bin/env python3
"""Export this app's adaptive launcher icon to Fastlane Play Store metadata PNGs."""
from __future__ import annotations

import subprocess
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SIZE = 512
RADIUS_RATIO = 24 / 108  # match adaptive icon corner feel

ANDROID_NS = "{http://schemas.android.com/apk/res/android}"

FASTLANE_ICONS = (
    ROOT / "fastlane/metadata/android/zh-CN/images/icon.png",
    ROOT / "fastlane/metadata/android/en-US/images/icon.png",
)


def android_paths_from_vector(xml_text: str) -> list[tuple[str, str]]:
    root = ET.fromstring(xml_text)
    out: list[tuple[str, str]] = []
    for path in root.iter("path"):
        d = path.get(f"{ANDROID_NS}pathData")
        fill = path.get(f"{ANDROID_NS}fillColor", "#000000")
        if d:
            out.append((d, fill))
    return out


def paths_to_svg_inner(paths: list[tuple[str, str]]) -> str:
    chunks = [f'<path d="{d}" fill="{fill}"/>' for d, fill in paths]
    return "\n    ".join(chunks)


def compose_svg(*layers: str) -> str:
    body = "\n    ".join(layers)
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">
  {body}
</svg>
"""


def rsvg_to_png(svg: str, out_png: Path) -> None:
    with tempfile.NamedTemporaryFile("w", suffix=".svg", delete=False, encoding="utf-8") as f:
        f.write(svg)
        svg_path = f.name
    subprocess.run(
        ["rsvg-convert", "-w", str(SIZE), "-h", str(SIZE), svg_path, "-o", str(out_png)],
        check=True,
    )
    Path(svg_path).unlink(missing_ok=True)


def round_mask_png(png_path: Path) -> None:
    from PIL import Image, ImageDraw

    im = Image.open(png_path).convert("RGBA")
    im = im.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    mask = Image.new("L", (SIZE, SIZE), 0)
    draw = ImageDraw.Draw(mask)
    r = int(SIZE * RADIUS_RATIO)
    draw.rounded_rectangle((0, 0, SIZE, SIZE), radius=r, fill=255)
    im.putalpha(mask)
    im.save(png_path, optimize=True)


def export_cweek_icon() -> None:
    bg = (ROOT / "app/src/main/res/drawable/ic_launcher_background.xml").read_text(encoding="utf-8")
    fg = (ROOT / "app/src/main/res/drawable/ic_launcher_foreground.xml").read_text(encoding="utf-8")
    svg = compose_svg(
        paths_to_svg_inner(android_paths_from_vector(bg)),
        paths_to_svg_inner(android_paths_from_vector(fg)),
    )
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as f:
        png = Path(f.name)
    rsvg_to_png(svg, png)
    round_mask_png(png)
    for dest in FASTLANE_ICONS:
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(png.read_bytes())
        print(dest.relative_to(ROOT), dest.stat().st_size, "bytes")
    png.unlink(missing_ok=True)


def main() -> None:
    export_cweek_icon()
    print("exported c-week from app/src/main/res/drawable/ic_launcher_{background,foreground}.xml")


if __name__ == "__main__":
    main()
