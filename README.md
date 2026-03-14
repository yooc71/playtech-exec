# Playtech Executive Intelligence Briefing 2026

An interactive executive presentation built for the Playtech leadership team.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Full executive briefing — stats, segments, financials, global reach, competitor analysis, AI strategy |
| `video.html` | 18-second COO cinematic briefing — 5 scenes, animated |
| `playtech-ecosystem.excalidraw` | Interactive strategic ecosystem diagram |

## Viewing

Open `index.html` in any browser. No build step required — fully self-contained HTML.

For the Excalidraw diagram: download and drag into [excalidraw.com](https://excalidraw.com).

## Video (Remotion source)

A Remotion React project lives in `playtech-video/` for rendering to MP4.

```bash
cd playtech-video
npm install
npm start        # Remotion Studio preview
npm run build    # Render to out/playtech-intro.mp4
```

## Deployment

Hosted via Netlify — connected to this repo for automatic deploys on push.
