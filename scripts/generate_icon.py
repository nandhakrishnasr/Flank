"""
generate_icon.py - Verifies and manages Flank brand icon (flank.ico).
Ensures assets/brand/flank.ico exists with required frames (256, 128, 64, 48, 32, 24, 16),
or reconstructs it from official brand PNG frames if needed.
"""
import os
import shutil
import struct

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ASSETS_DIR = os.path.join(ROOT_DIR, 'assets')
BRAND_DIR = os.path.join(ASSETS_DIR, 'brand')
ICO_PATH = os.path.join(BRAND_DIR, 'flank.ico')
ROOT_ICO_PATH = os.path.join(ASSETS_DIR, 'flank.ico')
PNG_DIR = os.path.join(BRAND_DIR, 'png')

ICON_SIZES = [256, 128, 64, 48, 32, 24, 16]


def verify_or_build_ico() -> str:
    """Verifies assets/brand/flank.ico exists with valid frames, or reconstructs it."""
    os.makedirs(BRAND_DIR, exist_ok=True)

    valid = False
    if os.path.exists(ICO_PATH) and os.path.getsize(ICO_PATH) > 0:
        try:
            with open(ICO_PATH, 'rb') as f:
                header = f.read(6)
                if len(header) == 6:
                    reserved, type_, count = struct.unpack('<HHH', header)
                    if type_ == 1 and count >= len(ICON_SIZES):
                        valid = True
        except Exception:
            valid = False

    if not valid:
        print("[generate_icon] Assembling flank.ico from brand PNG frames...")
        png_data = []
        for s in ICON_SIZES:
            png_file = os.path.join(PNG_DIR, f"flank-app-icon-{s}.png")
            if not os.path.exists(png_file):
                raise FileNotFoundError(f"Missing required brand icon frame: {png_file}")
            with open(png_file, 'rb') as pf:
                png_data.append((s, pf.read()))

        header = struct.pack('<HHH', 0, 1, len(png_data))
        offset = 6 + 16 * len(png_data)
        entries = []
        for s, data in png_data:
            w_byte = 0 if s >= 256 else s
            h_byte = 0 if s >= 256 else s
            entry = struct.pack(
                '<BBBBHHII',
                w_byte,
                h_byte,
                0,
                0,
                1,
                32,
                len(data),
                offset,
            )
            entries.append(entry)
            offset += len(data)

        with open(ICO_PATH, 'wb') as f:
            f.write(header)
            for e in entries:
                f.write(e)
            for _, data in png_data:
                f.write(data)

        print(f"[generate_icon] Successfully generated {ICO_PATH}")
    else:
        print(f"[generate_icon] Verified {ICO_PATH} is valid ({os.path.getsize(ICO_PATH)} bytes).")

    # Sync to assets/flank.ico for backward compatibility with root lookups
    shutil.copyfile(ICO_PATH, ROOT_ICO_PATH)
    return ICO_PATH


if __name__ == '__main__':
    verify_or_build_ico()
