"""
Puts the real CloudTech logo on the AI Studio product photos.

The generated photos carried invented logos (a cloud, "ACME Global Solutions", a lion crest). For each
photo this script fills the fake logo with the surrounding material, then draws the CloudTech mark
(one gold square and four beige squares) and the "CloudTech / ANALYTICS" wordmark, finished to suit
the surface: embroidery on fabric, gold foil or blind deboss on leather and card, ink on the white tee.

Run:  python scripts/brand_photos.py   (sources in ../collection-aistudio/src/assets/images)
Out:  public/products/*.jpg
Needs: pip install opencv-python-headless pillow numpy
"""
from __future__ import annotations

import math
import os
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.environ.get("AISTUDIO_IMAGES", os.path.join(ROOT, "..", "collection-aistudio", "src", "assets", "images"))
OUT = os.path.join(ROOT, "public", "products")
FONT_DIR = os.environ.get("BRAND_FONTS", os.path.join(HERE, "fonts"))
SERIF = os.path.join(FONT_DIR, "Playfair-700.ttf")
SANS = os.path.join(os.environ.get("WINDIR", "C:/Windows"), "Fonts", "segoeuib.ttf")

GOLD = (201, 164, 92)  # #C9A45C, the logo's gold square
BEIGE = (228, 218, 202)  # #E4DACA, the logo's four light squares
INK = (23, 23, 23)
NAVY = (7, 27, 51)

SS = 4  # supersampling for crisp edges


# ----------------------------------------------------------------------------------------------- logo art
def _mark_parts(size: int):
    """Masks (float 0..1) for the gold square and the four beige squares, `size` px square, supersampled."""
    S = size * SS
    k = S / 682
    gold = Image.new("L", (S, S), 0)
    soft = Image.new("L", (S, S), 0)
    dg, ds = ImageDraw.Draw(gold), ImageDraw.Draw(soft)
    dg.rounded_rectangle([0, 0, 170 * k, 170 * k], radius=30 * k, fill=255)
    for x, y, w, r in [(256, 0, 170, 30), (512, 0, 170, 30), (0, 256, 170, 30), (0, 512, 170, 30), (256, 256, 426, 44)]:
        ds.rounded_rectangle([x * k, y * k, (x + w) * k, (y + w) * k], radius=r * k, fill=255)
    return gold, soft


def _text_mask(text: str, font_path: str, px: float, tracking: float = 0.0):
    font = ImageFont.truetype(font_path, int(px * SS))
    widths = [font.getlength(c) for c in text]
    w = int(sum(widths) + tracking * SS * (len(text) - 1)) + 4
    asc, desc = font.getmetrics()
    im = Image.new("L", (w, asc + desc), 0)
    d = ImageDraw.Draw(im)
    x = 0.0
    for c, cw in zip(text, widths):
        d.text((x, 0), c, font=font, fill=255)
        x += cw + tracking * SS
    return im, asc  # mask and baseline offset (supersampled px)


def logo(mark: int, layout: str = "row", word: bool = True, sub: str | None = "ANALYTICS"):
    """
    The CloudTech lockup as a dict of supersampled masks: {"gold", "soft", "word", "sub"} plus size.
    Proportions follow public/brand/cloudtech-logo.svg: mark 52, "CloudTech" 30px at x 70, ANALYTICS 10.5px,
    tracking 4.4. `layout` is "row" (mark beside words) or "stack" (mark above, centred).
    """
    u = mark / 52.0  # logo units per px
    gold, soft = _mark_parts(mark)
    parts = []
    if word:
        wm, wb = _text_mask("CloudTech", SERIF, 30 * u, -0.3 * u)
        parts.append(("word", wm, wb))
    if sub:
        sm, sb = _text_mask(sub, SANS, 10.5 * u, 4.4 * u)
        parts.append(("sub", sm, sb))
    M = mark * SS
    if layout == "row":
        W = int(M + 18 * u * SS + max([p[1].width for p in parts] + [0]))
        H = M
        canvas = {k: Image.new("L", (W, H), 0) for k in ("gold", "soft", "word", "sub")}
        canvas["gold"].paste(gold, (0, 0))
        canvas["soft"].paste(soft, (0, 0))
        x = int(M + 18 * u * SS)
        for name, m, base in parts:
            # Baselines at 28 and 47 logo units from the top of the mark.
            target = (28 if name == "word" else 47) * u * SS
            canvas[name].paste(m, (x if name == "word" else int(x + 1.5 * u * SS), int(target - base)), m)
    else:
        widths = [M] + [p[1].width for p in parts]
        W = max(widths)
        H = int(M + (14 + 30 + (16 if sub else 0)) * u * SS)
        canvas = {k: Image.new("L", (W, H), 0) for k in ("gold", "soft", "word", "sub")}
        canvas["gold"].paste(gold, ((W - M) // 2, 0))
        canvas["soft"].paste(soft, ((W - M) // 2, 0))
        y = M + 36 * u * SS
        for name, m, base in parts:
            canvas[name].paste(m, ((W - m.width) // 2, int(y - base)), m)
            y += 18 * u * SS
    return {k: np.asarray(v, dtype=np.float32) / 255.0 for k, v in canvas.items()}


# ----------------------------------------------------------------------------------------------- finishes
def _bevel(mask: np.ndarray, radius: float, strength: float):
    """Shading for a raised (strength > 0) or pressed-in (strength < 0) shape, lit from the top left."""
    h = cv2.GaussianBlur(mask, (0, 0), radius)
    gy, gx = np.gradient(h)
    return 1.0 + strength * (-gx - gy) * radius * 1.6


def _satin(shape, angle_deg: float, period: float, depth: float):
    """Satin-stitch ripple: thin parallel threads at an angle."""
    H, W = shape
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    a = math.radians(angle_deg)
    t = (xx * math.cos(a) + yy * math.sin(a)) / period
    return 1.0 + depth * np.sin(2 * math.pi * t) + depth * 0.5 * np.sin(2 * math.pi * t * 0.5 + 1.3)


def render(L: dict, finish: str, colors: dict):
    """Turns lockup masks into an RGBA float image (supersampled) plus a shadow mask, for one finish."""
    H, W = L["gold"].shape
    rgb = np.zeros((H, W, 3), np.float32)
    alpha = np.zeros((H, W), np.float32)
    shadow = np.zeros((H, W), np.float32)
    rng = np.random.default_rng(7)
    for name, mask in L.items():
        if mask.max() == 0:
            continue
        col = np.array(colors.get(name, GOLD), np.float32) / 255.0
        if finish == "embroidery":
            angle = {"gold": 45, "soft": -45, "word": 90, "sub": 90}[name]
            tex = _satin((H, W), angle, 2.4 * SS, 0.10)
            shade = _bevel(mask, 2.2 * SS, 0.9)
            layer = col * (tex * shade)[..., None] * 1.02
            sh = 1.0
        elif finish == "foil":
            yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
            sweep = 0.92 + 0.18 * np.sin((xx * 0.7 + yy) / (W * 0.35) * math.pi)
            grain = 1 + 0.035 * rng.standard_normal((H, W)).astype(np.float32)
            shade = _bevel(mask, 1.2 * SS, -0.5)
            layer = col * (sweep * grain * shade)[..., None]
            sh = 0.35
        elif finish == "deboss":
            shade = _bevel(mask, 1.5 * SS, -1.4)
            layer = np.ones((H, W, 3), np.float32) * (0.78 * shade)[..., None]  # multiplier on the surface
            sh = 0.0
        else:  # print
            layer = np.broadcast_to(col, (H, W, 3)).copy()
            sh = 0.0
        a = mask
        rgb = rgb * (1 - a[..., None]) + np.clip(layer, 0, 1.6) * a[..., None]
        alpha = np.maximum(alpha, a)
        shadow = np.maximum(shadow, mask * sh)
    return rgb, alpha, shadow


# ----------------------------------------------------------------------------------------------- photo edits
def _tile(patch: np.ndarray, h: int, w: int):
    """Mirror-tiles a patch to h x w so its edges meet without seams."""
    reps_y, reps_x = h // patch.shape[0] + 2, w // patch.shape[1] + 2
    rows = [np.concatenate([patch if i % 2 == 0 else patch[:, ::-1] for i in range(reps_x)], axis=1) for _ in range(reps_y)]
    rows = [r if j % 2 == 0 else r[::-1] for j, r in enumerate(rows)]
    return np.concatenate(rows, axis=0)[:h, :w]


def fill(img: np.ndarray, box, src, feather: int = 6, sigma: float = 7.0, auto: str | None = None, grow: int = 7, clip=None):
    """
    Covers `box` with clean material. The light (low frequencies) comes from inpainting from the box's own
    surroundings, so shading and folds carry on; the texture (weave, grain) comes from `src`, a clean patch.
    """
    x0, y0, x1, y1 = box
    sx0, sy0, sx1, sy1 = src
    f = img.astype(np.float32)
    m = np.zeros(img.shape[:2], np.uint8)
    if auto:
        # Only the fake logo's own pixels: brighter (or darker) than the material around them.
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)[y0:y1, x0:x1].astype(np.float32)
        hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)[y0:y1, x0:x1].astype(np.float32)
        if auto == "strokes":
            # Light lettering and line logos on dark material: light pixels that form thin shapes.
            # Large light areas (the table, the studio wall) are excluded, so edges stay untouched.
            light = (gray > np.percentile(gray, 30) + 35).astype(np.uint8)
            big = cv2.morphologyEx(light, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
            big = cv2.dilate(big, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
            sel = (light > 0) & (big == 0)
        elif auto == "bright":
            sel = (gray > np.percentile(gray, 30) + 40) | ((hsv[..., 1] > 90) & (gray > np.percentile(gray, 30) + 18))
        else:
            sel = gray < np.percentile(gray, 70) - 40
        sel = cv2.dilate(sel.astype(np.uint8) * 255, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * grow + 1, 2 * grow + 1)))
        m[y0:y1, x0:x1] = sel
        if clip is not None:
            # Keep the clean-up inside the object's outline (e.g. the cap, not the studio behind it).
            keep = np.zeros_like(m)
            cv2.fillPoly(keep, [np.int32(clip)], 255)
            m &= keep
            # Don't let the repair borrow colour from outside the outline either.
            ignore = np.zeros_like(m)
            ignore[max(0, y0 - 40):y1 + 40, max(0, x0 - 40):x1 + 40] = 255
            ignore &= cv2.bitwise_not(keep)
    else:
        m[y0:y1, x0:x1] = 255
    if not m.any():
        return img
    src_mask = m | ignore if auto and clip is not None else m
    light = cv2.inpaint(img, src_mask, 9, cv2.INPAINT_TELEA).astype(np.float32)
    light = cv2.GaussianBlur(light, (0, 0), sigma)
    patch = f[sy0:sy1, sx0:sx1]
    detail = patch - cv2.GaussianBlur(patch, (0, 0), sigma)
    pad = feather * 2
    H, W = y1 - y0 + 2 * pad, x1 - x0 + 2 * pad
    det = _tile(detail, H, W)
    Y0, X0 = max(0, y0 - pad), max(0, x0 - pad)
    Y1, X1 = min(img.shape[0], y1 + pad), min(img.shape[1], x1 + pad)
    region = light[Y0:Y1, X0:X1] + det[: Y1 - Y0, : X1 - X0]
    a = (m > 0).astype(np.float32)
    a = cv2.GaussianBlur(a, (0, 0), feather)[Y0:Y1, X0:X1]
    a = np.clip(a * 1.6, 0, 1)[..., None]
    out = f.copy()
    out[Y0:Y1, X0:X1] = out[Y0:Y1, X0:X1] * (1 - a) + region * a
    return np.clip(out, 0, 255).astype(np.uint8)


def heal(img: np.ndarray, box, radius: int = 7):
    """Inpaints a small box (for tiny marks on smooth surfaces)."""
    x0, y0, x1, y1 = box
    m = np.zeros(img.shape[:2], np.uint8)
    m[y0:y1, x0:x1] = 255
    return cv2.inpaint(img, m, radius, cv2.INPAINT_TELEA)


def heal_poly(img: np.ndarray, poly, radius: int = 3):
    """Inpaints a thin polygon (for small text on smooth, glossy surfaces)."""
    m = np.zeros(img.shape[:2], np.uint8)
    cv2.fillPoly(m, [np.int32(poly)], 255)
    return cv2.inpaint(img, m, radius, cv2.INPAINT_TELEA)


def place(img: np.ndarray, L: dict, finish: str, quad, colors: dict | None = None, opacity: float = 1.0):
    """Draws the lockup into `quad` (TL, TR, BR, BL in photo px)."""
    colors = colors or {}
    rgb, alpha, shadow = render(L, finish, colors)
    H, W = alpha.shape
    srcq = np.float32([[0, 0], [W, 0], [W, H], [0, H]])
    dstq = np.float32(quad)
    M = cv2.getPerspectiveTransform(srcq, dstq)
    size = (img.shape[1], img.shape[0])
    warp = lambda a, interp=cv2.INTER_AREA: cv2.warpPerspective(a, M, size, flags=interp, borderValue=0)
    # Downsampling through the warp: blur first so supersampled edges average out.
    k = SS / 2
    rgb_w = warp(cv2.GaussianBlur(rgb, (0, 0), k))
    a_w = warp(cv2.GaussianBlur(alpha, (0, 0), k)) * opacity
    s_w = warp(cv2.GaussianBlur(shadow, (0, 0), SS * 1.6))
    base = img.astype(np.float32) / 255.0
    # A soft contact shadow below raised work.
    if s_w.max() > 0:
        Ms = M.copy()
        sh = cv2.warpAffine(s_w, np.float32([[1, 0, 1.2], [0, 1, 2.0]]), size)
        base *= (1 - 0.45 * sh)[..., None]
    lum = cv2.GaussianBlur(base.mean(axis=2), (0, 0), 3)
    if finish == "deboss":
        out = base * (1 - a_w[..., None]) + base * rgb_w * a_w[..., None]
    elif finish == "print":
        # Ink takes on the fabric's folds and light.
        ref = np.percentile(lum, 95)
        fold = np.clip(lum / max(ref, 1e-3), 0.55, 1.05)[..., None]
        out = base * (1 - a_w[..., None]) + (rgb_w * fold) * a_w[..., None]
    else:
        # Thread and foil pick up some of the scene's light.
        local = np.clip(lum / max(np.percentile(lum, 60), 1e-3), 0.7, 1.15)[..., None] if finish == "embroidery" else 1.0
        out = base * (1 - a_w[..., None]) + np.clip(rgb_w * (0.65 + 0.35 * local), 0, 1) * a_w[..., None]
    out = np.clip(out, 0, 1)
    # Match the photo's grain.
    noise = np.random.default_rng(3).normal(0, 0.008, out.shape).astype(np.float32)
    out = np.where(a_w[..., None] > 0.02, np.clip(out + noise, 0, 1), out)
    return (out * 255).astype(np.uint8)


def rect_quad(x, y, w, h, angle=0.0, skew=(0, 0, 0, 0)):
    """Quad for a box at (x, y) with size (w, h), rotated `angle` degrees clockwise about its centre.
    `skew` nudges each corner vertically (TL, TR, BR, BL) for gentle perspective."""
    cx, cy = x + w / 2, y + h / 2
    pts = [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)]
    a = math.radians(angle)
    out = []
    for (px, py), dy in zip(pts, skew):
        rx = px * math.cos(a) - py * math.sin(a)
        ry = px * math.sin(a) + py * math.cos(a)
        out.append((cx + rx, cy + ry + dy))
    return out


def fit(L, width=None, height=None):
    H, W = L["gold"].shape
    if width:
        return width, width * H / W
    return height * W / H, height


THREAD = {"gold": GOLD, "soft": BEIGE, "word": BEIGE, "sub": GOLD}
FOIL = {"gold": (214, 176, 98), "soft": (226, 205, 160), "word": (214, 176, 98), "sub": (214, 176, 98)}


# ----------------------------------------------------------------------------------------------- the photos
def polo(img):
    img = fill(img, (712, 436, 918, 608), (690, 622, 900, 770), auto="bright")
    L = logo(46)
    w, h = fit(L, width=196)
    return place(img, L, "embroidery", rect_quad(720, 482, w, h), THREAD)


def cap(img):
    crown = [(446, 262), (640, 262), (640, 492), (346, 492), (354, 440), (370, 392), (392, 348), (418, 306)]
    img = fill(img, (356, 280, 610, 486), (612, 236, 742, 476), auto="bright", feather=3, clip=crown)
    img = fill(img, (922, 466, 990, 546), (870, 396, 930, 462), auto="bright", feather=3)
    L = logo(120, word=False, sub=None)
    # The cap's front faces left: a little narrower, slightly turned, following the crown.
    return place(img, L, "embroidery", [(420, 330), (544, 321), (548, 448), (418, 462)], THREAD)


def journal(img):
    img = fill(img, (418, 498, 558, 594), (366, 386, 452, 452))
    L = logo(40, layout="stack", sub="ANALYTICS")
    w, h = fit(L, width=96)
    return place(img, L, "foil", rect_quad(442, 492, w, h, angle=19, skew=(0, -4, -2, 2)), FOIL)


def kit(img):
    # Lid: ACME -> CloudTech, gold foil.
    img = fill(img, (758, 244, 928, 348), (626, 150, 752, 240))
    L = logo(46, layout="stack", sub="COLLECTION")
    w, h = fit(L, width=150)
    img = place(img, L, "foil", rect_quad(838 - w / 2, 296 - h / 2, w, h, angle=-1.5, skew=(-3, 3, 3, -3)), FOIL)
    # Polo neck label: a small gold CloudTech mark.
    img = fill(img, (334, 320, 408, 352), (340, 352, 398, 372), auto="strokes", grow=3, feather=2, sigma=3)
    img = place(img, logo(14, word=False, sub=None), "foil", rect_quad(363, 328, 15, 15), FOIL)
    # Polo chest.
    img = fill(img, (506, 398, 562, 448), (450, 380, 500, 430), auto="strokes", grow=4, feather=3)
    img = place(img, logo(30, word=False, sub=None), "embroidery", rect_quad(518, 404, 30, 30, angle=-12), THREAD)
    # Pen barrel text.
    img = heal_poly(img, [(483, 479), (533, 471), (535, 477), (485, 485)], 3)
    # Notebook: blind-debossed mark where ACME GLOBAL was.
    img = fill(img, (452, 556, 566, 616), (486, 632, 540, 676))
    img = place(img, logo(30, layout="stack", sub=None), "deboss", rect_quad(486, 556, 46, 48, angle=14, skew=(0, -3, 0, 3)))
    # Bottle.
    img = fill(img, (740, 566, 826, 624), (668, 540, 712, 600), feather=4, sigma=4)
    img = place(img, logo(22, word=False, sub=None), "foil", rect_quad(768, 578, 26, 26, angle=-26), FOIL)
    # ID card: a printed CloudTech card.
    img = heal(img, (844, 534, 930, 604), 5)
    return place(img, logo(22, layout="stack", sub="ANALYTICS"), "print", rect_quad(858, 534, 58, 56, angle=-6), {"gold": GOLD, "soft": BEIGE, "word": INK, "sub": (140, 106, 44)})


def hero(img):
    # Polo chest.
    img = fill(img, (384, 266, 504, 342), (206, 280, 300, 360), auto="strokes", grow=4, feather=3)
    L = logo(26)
    w, h = fit(L, width=110)
    img = place(img, L, "embroidery", rect_quad(390, 290, w, h), THREAD)
    # Notebook cover: gold foil.
    img = fill(img, (626, 286, 748, 318), (604, 232, 740, 282))
    L = logo(30, layout="stack")
    w, h = fit(L, width=96)
    img = place(img, L, "foil", rect_quad(687 - w / 2, 250, w, h), FOIL)
    # White tee: printed lockup.
    img = fill(img, (962, 258, 1204, 344), (962, 184, 1202, 252))
    L = logo(46)
    w, h = fit(L, width=210)
    img = place(img, L, "print", rect_quad(1084 - w / 2, 278, w, h), {"gold": GOLD, "soft": BEIGE, "word": INK, "sub": (140, 106, 44)})
    # Cap: crown logo and the brim texts.
    img = fill(img, (346, 518, 420, 616), (286, 470, 344, 528), auto="strokes", grow=4, feather=3)
    img = place(img, logo(52, word=False, sub=None), "embroidery", rect_quad(356, 541, 52, 52, angle=-8), THREAD)
    img = fill(img, (430, 474, 512, 554), (430, 560, 470, 600), auto="strokes", grow=3, feather=2, sigma=3)
    img = fill(img, (240, 654, 344, 700), (300, 610, 340, 650), auto="strokes", grow=3, feather=2, sigma=3)
    # Bottle: vertical foil lockup, reading top to bottom.
    img = fill(img, (702, 580, 756, 664), (630, 580, 690, 664), feather=4, sigma=4)
    L = logo(22)
    w, h = fit(L, width=80)
    cx = 729
    img = place(img, L, "foil", [(cx + h / 2, 582), (cx + h / 2, 582 + w), (cx - h / 2, 582 + w), (cx - h / 2, 582)], FOIL)
    # Presentation box.
    img = fill(img, (1032, 538, 1158, 604), (1160, 506, 1216, 602))
    L = logo(28, layout="stack", sub="COLLECTION")
    w, h = fit(L, width=104)
    return place(img, L, "foil", rect_quad(1095 - w / 2, 532, w, h), FOIL)


JOBS = {
    "product_signature_polo_1790936379925.jpg": ("signature-polo.jpg", polo),
    "product_executive_cap_1790936389185.jpg": ("executive-cap.jpg", cap),
    "product_hardcover_journal_pen_1790936403080.jpg": ("journal-and-pen.jpg", journal),
    "corporate_gift_kit_box_1790936414645.jpg": ("corporate-kit.jpg", kit),
    "hero_merchandise_collection_1790936368317.jpg": ("collection-flatlay.jpg", hero),
}


# Single-product pictures cut from the edited group photos (source, box, output).
CROPS = [
    ("collection-flatlay.jpg", (900, 96, 1272, 412), "essential-tee.jpg"),
    ("corporate-kit.jpg", (586, 396, 886, 696), "thermal-bottle.jpg"),
    ("journal-and-pen.jpg", (740, 370, 1080, 800), "executive-pen.jpg"),
]


def main(only: list[str]):
    os.makedirs(OUT, exist_ok=True)
    for src, (dst, fn) in JOBS.items():
        if only and not any(o in dst for o in only):
            continue
        img = cv2.imread(os.path.join(SRC, src), cv2.IMREAD_COLOR)
        if img is None:
            sys.exit(f"missing {src}")
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        out = fn(img)
        Image.fromarray(out).save(os.path.join(OUT, dst), quality=90, optimize=True, progressive=True)
        print("wrote", dst)
    for src, box, dst in CROPS:
        if only and not any(o in dst or o in src for o in only):
            continue
        im = Image.open(os.path.join(OUT, src)).crop(box)
        im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
        im.save(os.path.join(OUT, dst), quality=90, optimize=True, progressive=True)
        print("wrote", dst)


if __name__ == "__main__":
    main(sys.argv[1:])
