# main.py
import os
import uuid
import json
import shlex
import subprocess
import tempfile
import shutil
import logging
from datetime import timedelta, datetime
from pathlib import Path

from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

import cloudinary
import cloudinary.uploader
import whisper

from dotenv import load_dotenv

# ————— Setup & Config —————
load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cutalyst")

# Validate env
for var in ("CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"):
    if not os.getenv(var):
        raise RuntimeError(f"{var} is required")

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

# Use the medium Whisper model for better accuracy
model_whisper = whisper.load_model("base")


# ————— Helpers —————
def format_ts(sec: float) -> str:
    td = timedelta(seconds=sec)
    total = int(td.total_seconds())
    h, rem = divmod(total, 3600)
    m, s = divmod(rem, 60)
    ms = int((td.total_seconds() - total) * 1000)
    return f"{h:02}:{m:02}:{s:02}.{ms:03}"

def ts_to_sec(ts: str) -> float:
    h, m, rest = ts.split(":", 2)
    s, ms = rest.split(".", 1)
    return int(h)*3600 + int(m)*60 + int(s) + int(ms)/1000

def sec_to_srt(sec: float) -> str:
    t = int(sec)
    ms = int((sec - t)*1000)
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

def extract_trailer_beats(segments, num_beats=4):
    EMO = ["amazing","incredible","crazy","breathtaking","shocking","wow"]
    BAD = ["fuck","shit","damn"]
    cand = []
    # build 5–10s snippet candidates
    for i in range(len(segments)):
        for L in range(1,4):
            if i+L > len(segments): break
            start_s = segments[i]["start_s"]
            end_s   = segments[i+L-1]["end_s"]
            dur = end_s - start_s
            if not (5 <= dur <= 10): continue
            txt = " ".join(segments[j]["text"] for j in range(i,i+L)).strip()
            score = (
                len(txt)
                +15*txt.count("!")
                +8*txt.count("?")
                +20*sum(kw in txt.lower() for kw in EMO)
                +30*sum(b in txt.lower() for b in BAD)
            )
            cand.append({"start_s":start_s,"end_s":end_s,"text":txt,"score":score})

    if not cand:
        # fallback: take evenly spaced segments
        fallback = segments[:num_beats]
        return [
            {
                "start_s": s["start_s"],
                "end_s":   s["end_s"],
                "start":   format_ts(s["start_s"]),
                "end":     format_ts(s["end_s"]),
                "text":    s["text"]
            }
            for s in fallback
        ]

    max_t = max(c["end_s"] for c in cand)
    picks = []
    # bucket picks across timeline
    for q in range(num_beats):
        lo, hi = q*max_t/num_beats, (q+1)*max_t/num_beats
        bucket = [c for c in cand if lo <= c["start_s"] < hi]
        bucket.sort(key=lambda x:-x["score"])
        for c in bucket:
            if all(abs(c["start_s"]-p["start_s"])>=10 for p in picks):
                picks.append(c); break

    # fill missing top scorers
    for c in sorted(cand, key=lambda x:-x["score"]):
        if len(picks) >= num_beats: break
        if c not in picks and all(abs(c["start_s"]-p["start_s"])>=10 for p in picks):
            picks.append(c)

    picks.sort(key=lambda x:x["start_s"])
    # log for debug
    for idx, p in enumerate(picks,1):
        logger.info(f"Beat {idx}: {p['text'][:60]}...")

    return [
        {
            "start_s": p["start_s"],
            "end_s":   p["end_s"],
            "start":   format_ts(p["start_s"]),
            "end":     format_ts(p["end_s"]),
            "text":    p["text"],
        }
        for p in picks
    ]


# ————— FastAPI App —————
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.post("/upload")
async def make_trailer(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    workdir = Path(tempfile.mkdtemp(prefix="cutalyst_"))
    orig = workdir / f"orig_{uuid.uuid4().hex}.{file.filename.split('.')[-1]}"
    orig.write_bytes(await file.read())
    logger.info("Saved upload to %s", orig)

    try:
        # 1) Raw upload
        up = cloudinary.uploader.upload_large(str(orig), resource_type="video", folder="cutalyst_uploads")
        raw_url = up["secure_url"]

        # 2) Transcribe
        result = model_whisper.transcribe(str(orig))
        segments=[]
        for seg in result["segments"]:
            segments.append({
                "start_s": seg["start"],
                "end_s":   seg["end"],
                "start":   format_ts(seg["start"]),
                "end":     format_ts(seg["end"]),
                "text":    seg["text"].strip()
            })

        # 3) Plan beats
        beats = extract_trailer_beats(segments)

        # 4) Cut + subtitles + fade
        clips=[]
        for i,b in enumerate(beats, start=1):
            clip = workdir/f"clip_{i}.mp4"
            srt  = workdir/f"clip_{i}.srt"
            out  = workdir/f"clip_{i}_out.mp4"

            dur = b["end_s"] - b["start_s"]
            # write SRT
            with srt.open("w") as f:
                f.write("1\n")
                f.write(f"00:00:00,000 --> {sec_to_srt(dur)}\n")
                f.write(b["text"] + "\n")

            # trim
            subprocess.run(shlex.split(
                f'ffmpeg -y -ss {b["start"]} -to {b["end"]} -i "{orig}" -c copy "{clip}"'
            ), check=True)

             # escape Windows path for subtitles filter
            p = str(srt).replace("\\","/").replace(":", r"\:")
            vf = (
                f"fade=in:st=0:d=0.5,fade=out:st={dur-0.5}:d=0.5,"
                f"subtitles='{p}':"
                f"force_style='Alignment=2,Fontsize=18,PrimaryColour=&HFFFFFF&'"
            )

            subprocess.run(
                f'ffmpeg -y -i "{clip}" -vf "{vf}" "{out}"',
                shell=True, check=True
            )
            clips.append(out)

        # 5) Concat
        list_txt = workdir/"list.txt"
        with list_txt.open("w") as f:
            for c in clips:
                f.write(f"file '{c}'\n")
        final = workdir/"highlight_trailer.mp4"
        subprocess.run(shlex.split(
            f'ffmpeg -y -f concat -safe 0 -i "{list_txt}" -c copy "{final}"'
        ), check=True)

        # 6) Upload final
        up2 = cloudinary.uploader.upload_large(str(final), resource_type="video", folder="cutalyst_reels")
        short_url = up2["secure_url"]

        # Cleanup
        background_tasks.add_task(lambda: shutil.rmtree(workdir, ignore_errors=True))

        return {"raw_url": raw_url, "short_url": short_url, "beats": beats}

    except subprocess.CalledProcessError as e:
        logger.error("FFmpeg failed: %s", e)
        raise HTTPException(500, "Video processing failed")
    except Exception as e:
        logger.exception("Unexpected error")
        raise HTTPException(500, "Internal server error")


@app.get("/test")
def test():
    return {"message":"OK"}



















