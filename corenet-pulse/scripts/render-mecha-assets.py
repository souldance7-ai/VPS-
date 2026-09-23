#!/usr/bin/env python3
"""Rebuild the original PULSE mecha's static SVG, GIF and review contact sheet.

Requires Python 3, Pillow and Inkscape. No network or downloaded artwork is used.
The animated SVG is the source of truth; all frames are its native vector paths.
Usage: python3 scripts/render-mecha-assets.py
"""

from concurrent.futures import ThreadPoolExecutor
from copy import deepcopy
import math
from pathlib import Path
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "internal/hub/static/assets"
NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)
WIDTH, HEIGHT, FRAMES = 400, 375, 40
DARK = (9, 21, 35)


def by_id(tree, name):
    return next(el for el in tree.iter() if el.get("id") == name)


def static_source():
    tree = ET.parse(ASSETS / "pulse-mecha-animated.svg").getroot()
    for element in list(tree):
        if element.tag == f"{{{NS}}}style":
            tree.remove(element)
    for element in tree.iter():
        element.attrib.pop("class", None)
    by_id(tree, "thruster").set("opacity", "0.6")
    by_id(tree, "signal").set("opacity", "0.6")
    by_id(tree, "scanner").set("opacity", "0")
    return tree


def phase_source(base, i):
    tree = deepcopy(base)
    t = i / FRAMES
    bob = -3.5 + 3.5 * math.cos(t * 2 * math.pi)
    by_id(tree, "mecha-float").set("transform", f"translate(0 {bob:.3f})")
    by_id(tree, "eye-glow").set("opacity", f"{.79-.21*math.cos(t*4*math.pi):.3f}")
    by_id(tree, "thruster").set("opacity", f"{.625-.225*math.cos(t*8*math.pi):.3f}")
    by_id(tree, "signal").set("opacity", f"{.7-.25*math.cos(t*2*math.pi):.3f}")
    # Mirror the SVG's scan keyframes: invisible reset, sweep, hold, reset.
    if t < .75:
        dy = -110 + 220 * t / .75
        opacity = 0 if t < .18 else min(1, (t - .18) / .07) * .7
        if t > .65:
            opacity = .7 * max(0, (.75 - t) / .1)
    else:
        dy, opacity = 110, 0
    by_id(tree, "scanner").set("transform", f"translate(0 {dy:.3f})")
    by_id(tree, "scanner").set("opacity", f"{opacity:.3f}")
    return tree


def render(tree, stem, width=WIDTH):
    svg = stem.with_suffix(".svg")
    png = stem.with_suffix(".png")
    ET.ElementTree(tree).write(svg, encoding="utf-8", xml_declaration=True)
    subprocess.run(
        ["inkscape", str(svg), "--export-type=png", f"--export-filename={png}", f"--export-width={width}"],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    with Image.open(png) as image:
        return image.convert("RGBA")


def main():
    if not shutil.which("inkscape"):
        raise SystemExit("Inkscape must be installed to rasterize the native SVG.")
    base = static_source()
    static_path = ASSETS / "pulse-mecha-static.svg"
    ET.ElementTree(base).write(static_path, encoding="utf-8", xml_declaration=True)
    static_path.write_text("\n".join(line.rstrip() for line in static_path.read_text().splitlines()) + "\n")
    with tempfile.TemporaryDirectory(prefix="pulse-mecha-") as directory:
        temp = Path(directory)
        with ThreadPoolExecutor(max_workers=6) as pool:
            rgba = list(pool.map(lambda i: render(phase_source(base, i), temp / f"frame-{i:03d}"), range(FRAMES)))
        # Dark matte only affects partially transparent edge pixels; the GIF
        # background itself stays transparent. A shared palette prevents flicker.
        rgb = []
        for frame in rgba:
            canvas = Image.new("RGBA", frame.size, (*DARK, 255))
            canvas.alpha_composite(frame)
            rgb.append(canvas.convert("RGB"))
        atlas = Image.new("RGB", (WIDTH * 4, HEIGHT * 3), DARK)
        for n, i in enumerate(range(0, FRAMES, 4)):
            atlas.paste(rgb[i], ((n % 4) * WIDTH, (n // 4) * HEIGHT))
        palette = atlas.quantize(colors=63, method=Image.Quantize.MEDIANCUT)
        shifted_palette = [*DARK] + palette.getpalette()[:63 * 3] + [0] * (192 * 3)
        indexed = []
        for raw, opaque in zip(rgba, rgb):
            quant = opaque.quantize(palette=palette, dither=Image.Dither.NONE)
            quant = quant.point(lambda p: min(p + 1, 63))
            quant.putpalette(shifted_palette)
            quant.paste(0, mask=raw.getchannel("A").point(lambda a: 255 if a < 128 else 0))
            quant.info["transparency"] = 0
            indexed.append(quant)
        output = ASSETS / "pulse-mecha.gif"
        indexed[0].save(
            output, save_all=True, append_images=indexed[1:],
            duration=80, loop=0, disposal=2,
            transparency=0, optimize=True,
        )
        # Local review image: four loop phases on the dashboard's dark canvas.
        review = Image.new("RGB", (WIDTH * 4, HEIGHT + 42), DARK)
        draw = ImageDraw.Draw(review)
        for n, i in enumerate((0, 10, 20, 30)):
            review.paste(rgb[i], (WIDTH * n, 0))
            draw.text((WIDTH * n + 20, HEIGHT + 10), f"{i/12.5:.1f}s / 3.2s", fill="#8eb7c9")
        review.save(ASSETS / "pulse-mecha-review.jpg", quality=88)
    with Image.open(output) as image:
        durations = []
        for i in range(image.n_frames):
            image.seek(i)
            durations.append(image.info["duration"])
        assert image.size == (WIDTH, HEIGHT)
        assert image.n_frames == FRAMES, image.n_frames
        assert sum(durations) == 3200, sum(durations)
        assert image.info.get("loop") == 0
    assert output.stat().st_size < 1_000_000, output.stat().st_size
    print(f"GIF: {WIDTH}x{HEIGHT}, {FRAMES} frames, 3200 ms, infinite loop, {output.stat().st_size:,} bytes")
    print("Validated: native SVG source, static SVG, transparent GIF, four-phase review image")


if __name__ == "__main__":
    main()
