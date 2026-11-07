import os
import sys
import subprocess
import json
from PIL import Image

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
REPO_DIR = r"C:\Users\NANDHA KRISHNA\Documents\GitHub\Flank"
PUBLIC_DIR = os.path.join(REPO_DIR, "public")
OUT_DIR = os.path.join(REPO_DIR, "docs", "design", "verification")
os.makedirs(OUT_DIR, exist_ok=True)

THEMES = ['paper', 'glass', 'nord', 'terminal', 'rail', 'aurora']
WALLPAPERS = {
    'magenta': '#FF00FF',
    'white': '#FFFFFF',
    'black': '#000000',
}
SCALES = [1.0, 1.25, 1.5, 2.0]

# Generate a standalone harness HTML for pixel-perfect verification
def generate_harness_html(theme_id: str, wallpaper_hex: str, view: str) -> str:
    harness_path = os.path.join(PUBLIC_DIR, f"verify_{theme_id}_{view}.html")
    content = f"""<!doctype html>
<html lang="en" data-theme="{theme_id}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./fonts/fonts.css">
  <link rel="stylesheet" href="./tokens.css">
  <link rel="stylesheet" href="./components.css">
  <style>
    /* Simulation of the desktop wallpaper behind the transparent window */
    body.verify-root {{
      background: {wallpaper_hex} !important;
      margin: 0 !important;
      padding: 24px !important;
      width: 100vw !important;
      height: 100vh !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
    }}
    .verify-window-frame {{
      background: transparent !important;
      position: relative !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 !important;
      padding: 0 !important;
    }}
  </style>
</head>
<body class="verify-root" data-view="{view}">
  <div class="verify-window-frame">
    <div id="flank-stage" class="flank-stage"></div>
  </div>
  <script type="module" src="./bundle.js"></script>
</body>
</html>"""
    with open(harness_path, 'w', encoding='utf-8') as f:
        f.write(content)
    return harness_path

def run_verification():
    results = []
    print("Starting Part A Verification across 6 themes, 3 wallpapers, and 4 DPI scales...")
    
    for theme in THEMES:
        for wp_name, wp_hex in WALLPAPERS.items():
            for scale in SCALES:
                scale_pct = int(scale * 100)
                for view in ['dock', 'card']:
                    harness_file = generate_harness_html(theme, wp_hex, view)
                    file_url = f"file:///{harness_file.replace(os.sep, '/')}"
                    
                    # Window size for screenshot
                    w = 340 if view == 'dock' else 480
                    h = 920 if view == 'dock' else 440
                    
                    out_filename = f"{theme}_{wp_name}_{scale_pct}pct_{view}.png"
                    out_path = os.path.join(OUT_DIR, out_filename)
                    
                    cmd = [
                        EDGE_PATH,
                        "--headless=new",
                        "--allow-file-access-from-files",
                        "--enable-local-file-accesses",
                        "--disable-gpu",
                        f"--force-device-scale-factor={scale}",
                        f"--window-size={w},{h}",
                        f"--screenshot={out_path}",
                        file_url
                    ]
                    
                    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    if proc.returncode != 0 or not os.path.exists(out_path):
                        print(f"FAILED to render {out_filename}")
                        results.append({'theme': theme, 'wallpaper': wp_name, 'scale': scale, 'view': view, 'status': 'FAIL_RENDER'})
                        continue
                    
                    # Inspect pixels with PIL
                    im = Image.open(out_path).convert('RGB')
                    
                    # Target wallpaper RGB
                    target_rgb = (255, 0, 255) if wp_name == 'magenta' else ((255, 255, 255) if wp_name == 'white' else (0, 0, 0))
                    
                    # Sample corners: (2, 2), (width - 3, 2), (2, height - 3), (width - 3, height - 3)
                    corners = [
                        (4, 4),
                        (im.width - 5, 4),
                        (4, im.height - 5),
                        (im.width - 5, im.height - 5)
                    ]
                    
                    corner_colors = [im.getpixel(c) for c in corners]
                    all_corners_match = all(c == target_rgb for c in corner_colors)
                    
                    if not all_corners_match:
                        print(f"MISMATCH in {out_filename}: Expected {target_rgb}, got corners: {corner_colors}")
                        results.append({
                            'theme': theme, 'wallpaper': wp_name, 'scale': scale, 'view': view,
                            'status': 'FAIL_CORNER', 'corners': corner_colors
                        })
                    else:
                        results.append({
                            'theme': theme, 'wallpaper': wp_name, 'scale': scale, 'view': view,
                            'status': 'PASS', 'file': out_filename
                        })

    summary_file = os.path.join(OUT_DIR, "verification_summary.json")
    with open(summary_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
    
    passed = len([r for r in results if r['status'] == 'PASS'])
    total = len(results)
    print(f"\nVerification Complete: {passed}/{total} tests PASSED.")
    return passed == total

if __name__ == '__main__':
    success = run_verification()
    sys.exit(0 if success else 1)

