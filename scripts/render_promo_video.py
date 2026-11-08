"""
Deterministic 1920x1080 60fps Promo Video Renderer for Flank.
Drives website/promo.html frame-by-frame via Playwright + Microsoft Edge
and pipes frames directly into FFmpeg with the synchronized reference audio track.
"""
import os
import subprocess
import sys
import time
from playwright.sync_api import sync_playwright

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_PATH = "file:///" + os.path.join(ROOT_DIR, "website", "promo.html").replace("\\", "/")
AUDIO_SOURCE = r"C:\Users\NANDHA KRISHNA\.gemini\antigravity\brain\197882d8-da8e-4a6a-96e1-9fcb71435b9f\.user_uploaded\media_1794150447210_9f325c40.mp4"
OUT_VIDEO = os.path.join(ROOT_DIR, "website", "assets", "flank-promo.mp4")

FPS = 60
DURATION = 35.05
TOTAL_FRAMES = int(round(DURATION * FPS))


def main() -> None:
    os.makedirs(os.path.dirname(OUT_VIDEO), exist_ok=True)
    print(f"[render_promo] Rendering {TOTAL_FRAMES} frames at {FPS} fps (1920x1080) -> {OUT_VIDEO}")

    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-f", "image2pipe",
        "-vcodec", "mjpeg",
        "-framerate", str(FPS),
        "-i", "-",
    ]
    if os.path.isfile(AUDIO_SOURCE):
        ffmpeg_cmd.extend(["-i", AUDIO_SOURCE, "-map", "0:v:0", "-map", "1:a:0", "-c:a", "aac", "-b:a", "192k"])
    else:
        ffmpeg_cmd.extend(["-map", "0:v:0"])

    ffmpeg_cmd.extend([
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "17",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-shortest",
        OUT_VIDEO,
    ])

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)
    assert proc.stdin is not None

    t0 = time.time()
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge")
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto(HTML_PATH, wait_until="networkidle")
        page.wait_for_timeout(400)

        for frame_idx in range(TOTAL_FRAMES):
            t_sec = frame_idx / float(FPS)
            page.evaluate(f"window.setVideoTime({t_sec:.5f})")
            jpg_bytes = page.screenshot(type="jpeg", quality=94)
            proc.stdin.write(jpg_bytes)

            if (frame_idx + 1) % 150 == 0 or frame_idx == TOTAL_FRAMES - 1:
                elapsed = time.time() - t0
                rate = (frame_idx + 1) / max(0.01, elapsed)
                print(f"[render_promo] Frame {frame_idx + 1}/{TOTAL_FRAMES} ({t_sec:.1f}s) - {rate:.1f} fps")

        browser.close()

    proc.stdin.close()
    ret = proc.wait()
    if ret != 0:
        print(f"[render_promo] FFmpeg exited with code {ret}", file=sys.stderr)
        sys.exit(ret)

    print(f"[render_promo] Done in {time.time() - t0:.1f}s! Output: {OUT_VIDEO} ({os.path.getsize(OUT_VIDEO)} bytes)")


if __name__ == "__main__":
    main()
