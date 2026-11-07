import os
import sys
import subprocess
import json
import shutil
from PIL import Image

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
REPO_DIR = r"C:\Users\NANDHA KRISHNA\Documents\GitHub\Flank"
PUBLIC_DIR = os.path.join(REPO_DIR, "public")
OUT_DIR = os.path.join(REPO_DIR, "docs", "design", "verification")
os.makedirs(OUT_DIR, exist_ok=True)

REF_WALLPAPER_CSS = "radial-gradient(700px 560px at 10% 16%, rgba(255,86,150,0.85), rgba(255,86,150,0) 70%), radial-gradient(760px 600px at 72% 6%, rgba(122,92,255,0.9), rgba(122,92,255,0) 70%), radial-gradient(800px 640px at 38% 92%, rgba(0,198,190,0.8), rgba(0,198,190,0) 70%), radial-gradient(620px 520px at 100% 100%, rgba(255,150,64,0.7), rgba(255,150,64,0) 70%), #0b1030"

TEST_WALLPAPERS = {
    'reference': REF_WALLPAPER_CSS,
    'magenta': '#FF00FF',
    'white': '#FFFFFF',
    'black': '#000000',
}

def generate_part_b_harness(wallpaper_css: str, view: str, widget: str = 'weather') -> str:
    harness_path = os.path.join(PUBLIC_DIR, f"verify_b_{view}.html")
    content = f"""<!doctype html>
<html lang="en" data-theme="liquid-glass">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./fonts/fonts.css">
  <link rel="stylesheet" href="./tokens.css">
  <link rel="stylesheet" href="./components.css">
  <style>
    body.verify-root {{
      background: {wallpaper_css} !important;
      margin: 0 !important;
      padding: 30px !important;
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

def run_part_b_verification():
    print("Running Part B Liquid Glass verification...")
    results = []

    for wp_name, wp_css in TEST_WALLPAPERS.items():
        for view in ['dock', 'card']:
            harness_file = generate_part_b_harness(wp_css, view)
            file_url = f"file:///{harness_file.replace(os.sep, '/')}"

            w = 360 if view == 'dock' else 480
            h = 960 if view == 'dock' else 440

            out_filename = f"liquid_glass_{wp_name}_{view}.png"
            out_path = os.path.join(OUT_DIR, out_filename)

            cmd = [
                EDGE_PATH,
                "--headless=new",
                "--allow-file-access-from-files",
                "--enable-local-file-accesses",
                "--disable-gpu",
                "--force-device-scale-factor=1.0",
                f"--window-size={w},{h}",
                f"--screenshot={out_path}",
                file_url
            ]

            proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if proc.returncode != 0 or not os.path.exists(out_path):
                print(f"FAILED to render {out_filename}")
                results.append({'wallpaper': wp_name, 'view': view, 'status': 'FAIL'})
            else:
                print(f"PASS: {out_filename}")
                results.append({'wallpaper': wp_name, 'view': view, 'status': 'PASS', 'file': out_filename})

    # Summary
    summary_path = os.path.join(OUT_DIR, "part_b_summary.json")
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    # Clean up temporary html
    for view in ['dock', 'card']:
        tmp = os.path.join(PUBLIC_DIR, f"verify_b_{view}.html")
        if os.path.exists(tmp):
            os.remove(tmp)

    print("Part B verification complete!")

if __name__ == "__main__":
    run_part_b_verification()
