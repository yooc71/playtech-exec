# Playtech Intro Video — Remotion

A 10-second cinematic intro for the Playtech executive presentation.

## Quick Start

```bash
cd playtech-video
npm install
npm start       # Opens Remotion Studio in browser (preview + scrub)
```

## Render to MP4

```bash
npm run build   # Outputs to out/playtech-intro.mp4
```

## Video Structure

| Scene | Frames | Duration | Content |
|-------|--------|----------|---------|
| Opening | 0–90 | 3s | PLAYTECH wordmark springs in with red glow |
| Stats | 90–200 | 3.7s | 4 key stats slide in sequentially |
| CTA | 200–300 | 3.3s | "The Future of Gaming Is Already Here" → fade to white |

## Files

- `src/index.ts` — Remotion entry point
- `src/Root.tsx` — Composition registration (1920×1080, 30fps, 10s)
- `src/PlaytechIntro.tsx` — All scenes and animation logic
