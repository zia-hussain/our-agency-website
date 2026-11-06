#!/usr/bin/env python3
"""Quantises freshly rendered OG PNGs (gradients + text) to ~100 KB each."""
import pathlib
from PIL import Image
root = pathlib.Path(__file__).resolve().parents[2] / "public"
targets = list((root/"og").glob("portfolio-*.png")) + list((root/"og").glob("articles-*.png")) + list(root.glob("*/covers/*-og.png"))
for p in targets:
    im = Image.open(p).convert("RGB")
    q = im.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
    q.save(p, optimize=True)
print(len(targets), "files")
