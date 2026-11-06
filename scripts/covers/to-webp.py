#!/usr/bin/env python3
"""Converts cover rasters (-800.png / -1600.png) to WebP and removes the PNGs."""
import sys, pathlib
from PIL import Image
root = pathlib.Path(__file__).resolve().parents[2] / "public"
for d in ("project_images/covers", "article_images/covers"):
    for png in sorted((root / d).glob("cover-*-*00.png")):
        im = Image.open(png).convert("RGB")
        out = png.with_suffix(".webp")
        im.save(out, "WEBP", quality=82, method=6)
        png.unlink()
        print(out.name, out.stat().st_size // 1024, "KB")
