# Cutalyst

AI-powered video highlight generator that turns long-form videos into crisp, trailer‑style reels in seconds.

## 🚀 Features

* **Automatic Transcription**: Uses OpenAI Whisper to generate accurate timestamps and captions.
* **Smart Beat Extraction**: Scores and selects the most cinematic 5–10s snippets spread evenly across the video.
* **One‑pass Editing**: FFmpeg for trimming, fades, subtitles and crossfades, all in a single command per clip.
* **Cloud Storage**: Upload raw and final videos to Cloudinary for fast CDN delivery.
* **Lightning‑fast**: Base Whisper model on CPU/GPU plus optimized FFmpeg filters for near real‑time processing.
* **Modern Frontend**: Vite + React (MUI & Chakra UI) single‑page app with drag‑and‑drop upload, progress indicators & result sharing.

## 📦 Tech Stack

* **Backend**: Python 3.11, [FastAPI](https://fastapi.tiangolo.com/) for REST endpoints
* **Transcription**: [OpenAI Whisper](https://github.com/openai/whisper)
* **Video Editing**: [FFmpeg](https://ffmpeg.org/) via shell calls for trimming, fades, subtitles, concatenation
* **Storage**: [Cloudinary](https://cloudinary.com/) (upload\_large) for video hosting
* **Frontend**: Vite + React, using MUI (Material UI) & Chakra UI components
* **Deployment**: Uvicorn + (optional Docker/Kubernetes)

## 🔧 Installation

1. **Clone**

   ```bash
   git clone https://github.com/your‑org/cutalyst.git
   cd cutalyst/backend
   ```
2. **Dependencies**

   ```bash
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. **Environment**
   Create a `.env` in `backend/`:

   ```dotenv
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. **Run**

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## 🚀 Frontend Setup (Vite + React)

```bash
cd ../frontend
npm install
npm run dev
```

Navigate to `http://localhost:5173` (or the port Vite reports).

## 🔗 API Endpoints

| Method | Path      | Description                                                                  |
| ------ | --------- | ---------------------------------------------------------------------------- |
| `GET`  | `/test`   | Health check, returns `{message:OK}`                                         |
| `POST` | `/upload` | Accepts `multipart/form-data` video, returns `{ raw_url, short_url, beats }` |

**Response**

```json
{
  "raw_url": "https://.../orig.mp4",
  "short_url": "https://.../highlight_trailer.mp4",
  "beats": [
    { "start":"00:02:15.123","end":"00:02:22.456","text":"..." },
    ...
  ]
}
```

## 🎯 Project Flow

1. **Upload**: User drag‑and‑drops a video in the React SPA.
2. **Raw Upload**: FastAPI reads file, saves locally, pushes raw file to Cloudinary.
3. **Transcription**: Whisper generates timestamps & text segments.
4. **Beat Planning**: Python scores and picks four 5–10s highlights (hook, build‑up, climax, CTA).
5. **Clip Rendering**: FFmpeg trims, applies fades and burns in subtitles.
6. **Assembly**: Clips concatenated (with optional crossfades) into a 30–60s trailer.
7. **Final Upload**: Trailer sent to Cloudinary, URL returned to frontend.

## 👩‍💻 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/...`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature/...`)
5. Open a Pull Request

## 📄 License

[MIT](LICENSE) • Made with ❤️ by Cutalyst devs
