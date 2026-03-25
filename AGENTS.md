# AGENTS.md

## Project

Pixel Fixer — browser tool that cycles colors to fix stuck pixels. Plain JS, no dependencies.

## Files

- `index.html` — markup and control bar (buttons, inputs, ad slots)
- `styles.css` — fullscreen layout, controls, overlay, shortcuts panel, ad slots, responsive/mobile rules
- `pixel-fixer.js` — core logic: canvas pixel drawing, color cycling, pause/resume, speed/size control. Exposes `PixelFixer` global
- `ui.js` — wires DOM events to `PixelFixer` API, handles auto-hide (controls + shortcuts + ads + overlay), fullscreen toggle, keyboard shortcuts

## Architecture

`pixel-fixer.js` is a self-executing IIFE returning a public API (`pause`, `resume`, `solidColor`, `isPaused`, `togglePixelMode`, `setPixelSize`, `setSpeed`, `getSpeed`, `getPixelSize`). `ui.js` consumes that API — no other coupling. Overlay div sits between screen and controls to restore cursor visibility when UI is active.

## UI Visibility Rules

- All UI elements (controls, shortcuts, ads, overlay) show/hide together
- Auto-hide after 5s of inactivity; reappear on mousemove or click
- `H` key / Hide button force-hides until next mouse movement
- Shortcuts panel and ad slots hidden on mobile (`max-width: 768px`)

## Ad Slots

Two `div.ad-slot` elements (`#ad-left`, `#ad-right`), 300×250px, vertically centered on each side. Replace inner content with actual ad tags as needed.

## Conventions

- No build tools, no frameworks, no bundlers
- One concern per file
- All state lives in `pixel-fixer.js`
- UI is purely event-driven via `ui.js`

## Rules

- Update `AGENTS.md` when adding or changing anything relevant (files, API, architecture, UI rules)
- Update `README.md` when changes affect usability (new features, config options, behavior changes)
- New buttons should include a keyboard shortcut when it makes sense
- New shortcuts must be added to the shortcuts panel in `index.html` and the shortcuts table in `README.md`
