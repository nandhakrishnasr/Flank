"""
Flank Wallpaper Sampler & Adaptive Glass Tint Provider
Implements Part B3 & B4 specifications:
- Reads Windows desktop wallpaper via SystemParametersInfoW(SPI_GETDESKWALLPAPER)
  and TranscodedWallpaper cache.
- Applies monitor fit mode (fill, fit, stretch, tile, center).
- Downscales to 25%, blurs once, and caches per monitor.
- Computes mean color under shape and smallest adaptive tint alpha for WCAG 4.5:1 text contrast.
- Detects Windows Transparency Effects setting for clean solid fallback.
"""

from __future__ import annotations

import base64
import ctypes
import io
import os
import winreg
from typing import Any, Dict, Optional, Tuple

from PIL import Image, ImageFilter, ImageOps

SPI_GETDESKWALLPAPER = 0x0073


def get_wallpaper_path() -> str:
    try:
        buf = ctypes.create_unicode_buffer(512)
        ctypes.windll.user32.SystemParametersInfoW(SPI_GETDESKWALLPAPER, 512, buf, 0)
        p = buf.value
        if p and os.path.exists(p):
            return p
    except Exception:
        pass

    try:
        tw = os.path.expandvars(r'%APPDATA%\Microsoft\Windows\Themes\TranscodedWallpaper')
        if os.path.exists(tw):
            return tw
    except Exception:
        pass

    return ''


def is_transparency_enabled() -> bool:
    try:
        with winreg.OpenKey(
            winreg.HKEY_CURRENT_USER,
            r'Software\Microsoft\Windows\CurrentVersion\Themes\Personalize',
        ) as k:
            val, _ = winreg.QueryValueEx(k, 'EnableTransparency')
            return bool(val)
    except Exception:
        return True


def get_wallpaper_style() -> Tuple[str, bool]:
    """Returns (style_name, is_tiled)."""
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r'Control Panel\Desktop') as k:
            ws, _ = winreg.QueryValueEx(k, 'WallpaperStyle')
            tw, _ = winreg.QueryValueEx(k, 'TileWallpaper')
            ws = str(ws).strip()
            tw = str(tw).strip()
            if tw == '1':
                return ('tile', True)
            if ws == '10':
                return ('fill', False)
            if ws == '6':
                return ('fit', False)
            if ws == '2':
                return ('stretch', False)
            if ws == '22':
                return ('span', False)
            return ('center', False)
    except Exception:
        return ('fill', False)


def relative_luminance(r: float, g: float, b: float) -> float:
    def ch(c: float) -> float:
        c = c / 255.0
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)


def compute_adaptive_tint_alpha(
    mean_rgb: Tuple[float, float, float],
    tint_rgb: Tuple[int, int, int] = (16, 20, 42),
    a_min: float = 0.34,
    a_max: float = 0.70,
) -> Tuple[float, bool]:
    """
    Finds smallest alpha in [a_min, a_max] that gives white text (#FFFFFF)
    at least 4.5:1 contrast ratio against the mixed background color.
    If even a_max fails, returns (a_max, use_text_shadow=True).
    """
    mr, mg, mb = mean_rgb
    tr, tg, tb = tint_rgb
    steps = int(round((a_max - a_min) * 100))

    for step in range(steps + 1):
        a = round(a_min + step * 0.01, 2)
        r = a * tr + (1.0 - a) * mr
        g = a * tg + (1.0 - a) * mg
        b = a * tb + (1.0 - a) * mb
        lum = relative_luminance(r, g, b)
        contrast = (1.0 + 0.05) / (lum + 0.05)
        if contrast >= 4.5:
            return (a, False)

    return (a_max, True)


class WallpaperManager:
    def __init__(self):
        self._cached_path: str = ''
        self._cached_mtime: float = 0.0
        self._cached_mon_size: Tuple[int, int] = (0, 0)
        self._blurred_small_image: Optional[Image.Image] = None
        self._data_uri: str = ''
        self._downscale_factor: float = 0.25

    def get_backdrop(
        self,
        mon_w: int,
        mon_h: int,
        shape_x: int,
        shape_y: int,
        shape_w: int,
        shape_h: int,
        tint_rgb: Tuple[int, int, int] = (16, 20, 42),
        a_min: float = 0.34,
        a_max: float = 0.70,
    ) -> Dict[str, Any]:
        """
        Prepares or retrieves cached blurred wallpaper and computes region-specific adaptive tint.
        """
        transparency = is_transparency_enabled()
        if not transparency:
            return {
                'enabled': False,
                'solidFallback': True,
                'wallpaperUrl': '',
                'adaptiveAlpha': 1.0,
                'useTextShadow': False,
                'monitorWidth': mon_w,
                'monitorHeight': mon_h,
            }

        path = get_wallpaper_path()
        if not path or not os.path.exists(path):
            return {
                'enabled': False,
                'solidFallback': False,
                'wallpaperUrl': '',
                'adaptiveAlpha': a_min,
                'useTextShadow': False,
                'monitorWidth': mon_w,
                'monitorHeight': mon_h,
            }

        mtime = os.path.getmtime(path)
        if (
            path != self._cached_path
            or mtime != self._cached_mtime
            or (mon_w, mon_h) != self._cached_mon_size
            or self._blurred_small_image is None
        ):
            self._generate_cache(path, mtime, mon_w, mon_h)

        if not self._blurred_small_image or not self._data_uri:
            return {
                'enabled': False,
                'solidFallback': False,
                'wallpaperUrl': '',
                'adaptiveAlpha': a_min,
                'useTextShadow': False,
                'monitorWidth': mon_w,
                'monitorHeight': mon_h,
            }

        # Crop small region under the shape to compute mean RGB
        bw, bh = self._blurred_small_image.size
        sx = max(0, min(bw - 1, int(round(shape_x * self._downscale_factor))))
        sy = max(0, min(bh - 1, int(round(shape_y * self._downscale_factor))))
        sw = max(1, min(bw - sx, int(round(shape_w * self._downscale_factor))))
        sh = max(1, min(bh - sy, int(round(shape_h * self._downscale_factor))))

        try:
            crop = self._blurred_small_image.crop((sx, sy, sx + sw, sy + sh))
            stat = crop.resize((1, 1), Image.Resampling.BILINEAR)
            pixel = stat.getpixel((0, 0))
            mean_rgb = (float(pixel[0]), float(pixel[1]), float(pixel[2]))
        except Exception:
            mean_rgb = (30.0, 30.0, 30.0)

        alpha, use_text_shadow = compute_adaptive_tint_alpha(
            mean_rgb, tint_rgb=tint_rgb, a_min=a_min, a_max=a_max
        )

        return {
            'enabled': True,
            'solidFallback': False,
            'wallpaperUrl': self._data_uri,
            'monitorWidth': mon_w,
            'monitorHeight': mon_h,
            'shapeX': shape_x,
            'shapeY': shape_y,
            'shapeW': shape_w,
            'shapeH': shape_h,
            'adaptiveAlpha': alpha,
            'useTextShadow': use_text_shadow,
        }

    def _generate_cache(self, path: str, mtime: float, mon_w: int, mon_h: int) -> None:
        try:
            raw = Image.open(path).convert('RGB')
            style, is_tiled = get_wallpaper_style()

            # Fit raw image to monitor resolution
            if style == 'stretch':
                fitted = raw.resize((mon_w, mon_h), Image.Resampling.BILINEAR)
            elif style == 'fit':
                fitted = ImageOps.pad(raw, (mon_w, mon_h), color=(0, 0, 0))
            elif style == 'tile' or is_tiled:
                fitted = Image.new('RGB', (mon_w, mon_h))
                rw, rh = raw.size
                for y in range(0, mon_h, rh):
                    for x in range(0, mon_w, rw):
                        fitted.paste(raw, (x, y))
            elif style == 'center':
                fitted = Image.new('RGB', (mon_w, mon_h))
                rw, rh = raw.size
                px = max(0, (mon_w - rw) // 2)
                py = max(0, (mon_h - rh) // 2)
                fitted.paste(raw, (px, py))
            else:  # 'fill' or default
                fitted = ImageOps.fit(raw, (mon_w, mon_h), method=Image.Resampling.BILINEAR)

            # Downscale to ~25% logical size
            small_w = max(100, int(mon_w * self._downscale_factor))
            small_h = max(100, int(mon_h * self._downscale_factor))
            small = fitted.resize((small_w, small_h), Image.Resampling.BILINEAR)

            # Blur once with Gaussian blur (radius=8 downscaled is ~32px at 100%)
            blurred = small.filter(ImageFilter.GaussianBlur(radius=8))

            buf = io.BytesIO()
            blurred.save(buf, format='JPEG', quality=82)
            b64 = base64.b64encode(buf.getvalue()).decode('ascii')
            self._data_uri = f'data:image/jpeg;base64,{b64}'

            self._blurred_small_image = blurred
            self._cached_path = path
            self._cached_mtime = mtime
            self._cached_mon_size = (mon_w, mon_h)
        except Exception:
            self._blurred_small_image = None
            self._data_uri = ''
