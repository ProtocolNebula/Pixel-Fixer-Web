# Pixel Fixer

A browser-based tool to fix stuck pixels on your screen by rapidly cycling colors. Vibe coded using Claude Sonnet ✨

## Modes

- **Pixel Mode** (default) — fills the screen with random-colored pixel blocks, refreshing rapidly. Best for unsticking individual pixels.
- **Single Color Mode** — cycles the entire screen through red, green, blue, white, and black.
- **Solid Color** — press 🔴, 🟢, or 🔵 to pause and hold a single color across the screen.

## Configuration

- **Pixel Size** — adjustable from 1px (default) to 50px via the input in the control bar.
- **Speed (ms)** — set the interval between color cycles in milliseconds (default: 150ms). Lower = faster.
- **Fullscreen** — toggle fullscreen mode for maximum coverage.
- **Pause / Play** — pause the cycling at any time and resume when ready.

The control bar and cursor auto-hide after 5 seconds of inactivity and reappear on mouse movement or click.

## Running

Plain JavaScript — no build tools, no dependencies. Just open `index.html` in your browser.
