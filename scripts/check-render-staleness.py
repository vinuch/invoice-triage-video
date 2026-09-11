#!/usr/bin/env python3
"""
Catches the failure mode check-scene-timing.ts can't see: a component that
*is* animating per its source code, but the actual rendered result still
reads as visually static for a long stretch (e.g. a slow fade on a tiny
element while the rest of the frame is frozen).

check-scene-timing.ts checks source code statically, before render.
This checks the actual rendered video, after render. Use both.

Usage:
    pip install pillow numpy --break-system-packages
    python3 scripts/check-render-staleness.py out/FinalVideoBuild21.mp4
    python3 scripts/check-render-staleness.py out/FinalVideoBuild21.mp4 --interval 2 --threshold 0.015

Requires ffmpeg on PATH.
"""
import argparse
import subprocess
import sys
import tempfile
import os
from pathlib import Path

def extract_frames(video_path: str, interval: float, out_dir: str) -> list[str]:
    pattern = os.path.join(out_dir, "frame_%06d.png")
    cmd = [
        "ffmpeg", "-y", "-i", video_path,
        "-vf", f"fps=1/{interval}",
        "-loglevel", "error",
        pattern,
    ]
    subprocess.run(cmd, check=True)
    frames = sorted(Path(out_dir).glob("frame_*.png"))
    return [str(f) for f in frames]

def mean_abs_diff(a, b) -> float:
    import numpy as np
    from PIL import Image
    ia = np.asarray(Image.open(a).convert("L"), dtype=np.float32)
    ib = np.asarray(Image.open(b).convert("L"), dtype=np.float32)
    if ia.shape != ib.shape:
        return 1.0
    return float(np.mean(np.abs(ia - ib)) / 255.0)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("video", help="Path to rendered mp4")
    parser.add_argument("--interval", type=float, default=2.0, help="Seconds between sampled frames")
    parser.add_argument("--threshold", type=float, default=0.01, help="Below this mean-abs-diff (0-1), frames count as 'same'")
    parser.add_argument("--min-static-seconds", type=float, default=20.0, help="Only report stretches at least this long")
    args = parser.parse_args()

    with tempfile.TemporaryDirectory() as tmp:
        print(f"Extracting frames every {args.interval}s from {args.video} ...")
        frames = extract_frames(args.video, args.interval, tmp)
        if len(frames) < 2:
            print("Not enough frames extracted — is the video path correct?")
            sys.exit(1)

        print(f"Comparing {len(frames)} sampled frames...\n")

        static_runs = []
        run_start_idx = None

        for i in range(1, len(frames)):
            diff = mean_abs_diff(frames[i - 1], frames[i])
            is_static = diff < args.threshold

            if is_static and run_start_idx is None:
                run_start_idx = i - 1
            elif not is_static and run_start_idx is not None:
                run_len = (i - 1 - run_start_idx) * args.interval
                if run_len >= args.min_static_seconds:
                    static_runs.append((run_start_idx * args.interval, (i - 1) * args.interval, run_len))
                run_start_idx = None

        if run_start_idx is not None:
            run_len = (len(frames) - 1 - run_start_idx) * args.interval
            if run_len >= args.min_static_seconds:
                static_runs.append((run_start_idx * args.interval, (len(frames) - 1) * args.interval, run_len))

        if not static_runs:
            print(f"No stretches of {args.min_static_seconds}s+ near-static content found.")
            return

        print(f"Found {len(static_runs)} near-static stretch(es) of {args.min_static_seconds}s or longer:\n")
        for start, end, length in static_runs:
            print(f"  {start:7.1f}s - {end:7.1f}s  ({length:.1f}s near-static, mean diff < {args.threshold})")
        print("\nCross-check these timestamps against src/data/timeline/*.ts to find the offending scene.")
        sys.exit(1)

if __name__ == "__main__":
    main()
