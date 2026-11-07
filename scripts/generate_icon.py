import os
import struct
import zlib

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ASSETS_DIR = os.path.join(ROOT_DIR, 'assets')


def make_png(width: int, height: int) -> bytes:
    """
    Generates a crisp anti-aliased RGBA PNG icon for Flank:
    Warm ink rounded square (#171614) with warm paper dock pill & terracotta accent badge (#C85428).
    """
    raw_rows = []
    cx, cy = width / 2.0, height / 2.0
    radius = width * 0.22

    for y in range(height):
        row = bytearray([0])  # filter type 0
        for x in range(width):
            # Rounded rect SDF
            dx = max(abs(x + 0.5 - cx) - (width / 2.0 - radius - 2), 0.0)
            dy = max(abs(y + 0.5 - cy) - (height / 2.0 - radius - 2), 0.0)
            dist = (dx * dx + dy * dy) ** 0.5 - radius

            if dist > 1.0:
                row.extend((0, 0, 0, 0))
                continue

            alpha = int(max(0.0, min(1.0, 0.5 - dist)) * 255)

            # Base warm stone dark background (#1C1A17)
            r, g, b = 28, 26, 23

            # Right-hand vertical dock pill inside icon (Paper #FBFAF7)
            pill_x0, pill_x1 = width * 0.62, width * 0.78
            pill_y0, pill_y1 = height * 0.20, height * 0.80
            if pill_x0 <= x <= pill_x1 and pill_y0 <= y <= pill_y1:
                r, g, b = 251, 250, 247

            # Terracotta accent tile at top of dock (#C85428)
            acc_x0, acc_x1 = width * 0.22, width * 0.52
            acc_y0, acc_y1 = height * 0.24, height * 0.46
            if acc_x0 <= x <= acc_x1 and acc_y0 <= y <= acc_y1:
                r, g, b = 200, 84, 40

            # Subtle secondary card bar (#38342E)
            sub_x0, sub_x1 = width * 0.22, width * 0.52
            sub_y0, sub_y1 = height * 0.54, height * 0.74
            if sub_x0 <= x <= sub_x1 and sub_y0 <= y <= sub_y1:
                r, g, b = 62, 58, 52

            row.extend((r, g, b, alpha))
        raw_rows.append(bytes(row))

    raw_data = b''.join(raw_rows)

    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', crc)

    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    idat = zlib.compress(raw_data, 9)
    return (
        b'\x89PNG\r\n\x1a\n'
        + chunk(b'IHDR', ihdr)
        + chunk(b'IDAT', idat)
        + chunk(b'IEND', b'')
    )


def generate_ico() -> str:
    os.makedirs(ASSETS_DIR, exist_ok=True)
    ico_path = os.path.join(ASSETS_DIR, 'flank.ico')
    sizes = [16, 32, 48, 64, 128, 256]
    pngs = [make_png(s, s) for s in sizes]

    header = struct.pack('<HHH', 0, 1, len(sizes))
    offset = 6 + 16 * len(sizes)
    entries = []
    for s, data in zip(sizes, pngs):
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

    with open(ico_path, 'wb') as f:
        f.write(header)
        for e in entries:
            f.write(e)
        for data in pngs:
            f.write(data)

    print(f'Generated multi-resolution icon at {ico_path}')
    return ico_path


if __name__ == '__main__':
    generate_ico()

