# AGENTS.md

## Project

Pixel Fixer — browser tool that cycles colors to fix stuck pixels. Plain JS, no dependencies.

## Files

- `index.html` — markup and control bar (buttons, inputs)
- `styles.css` — fullscreen layout, controls, overlay, cursor hiding
- `pixel-fixer.js` — core logic: canvas pixel drawing, color cycling, pause/resume, speed/size control. Exposes `PixelFixer` global
- `ui.js` — wires DOM events to `PixelFixer` API, handles auto-hide (controls + overlay), fullscreen toggle

## Architecture

`pixel-fixer.js` is a self-executing IIFE returning a public API (`pause`, `resume`, `solidColor`, `isPaused`, `togglePixelMode`, `setPixelSize`, `setSpeed`). `ui.js` consumes that API — no other coupling. Overlay div sits between screen and controls to restore cursor visibility when UI is active.

## Conventions

- No build tools, no frameworks, no bundlers
- One concern per file
- All state lives in `pixel-fixer.js`
- UI is purely event-driven via `ui.js`
