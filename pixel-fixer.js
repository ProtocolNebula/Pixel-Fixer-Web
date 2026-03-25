const PixelFixer = (() => {
  const screen = document.getElementById('screen');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  screen.appendChild(canvas);

  let interval = null;
  let paused = false;
  let pixelMode = true;
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000'];
  let colorIndex = 0;
  let PIXEL_SIZE = 1;
  let speed = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function drawPixels() {
    const w = canvas.width, h = canvas.height;
    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let y = 0; y < h; y += PIXEL_SIZE) {
      for (let x = 0; x < w; x += PIXEL_SIZE) {
        const r = Math.random() * 255 | 0, g = Math.random() * 255 | 0, b = Math.random() * 255 | 0;
        for (let dy = 0; dy < PIXEL_SIZE && y + dy < h; dy++) {
          for (let dx = 0; dx < PIXEL_SIZE && x + dx < w; dx++) {
            const i = ((y + dy) * w + (x + dx)) * 4;
            d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function drawSolid() {
    screen.style.backgroundColor = colors[colorIndex];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    colorIndex = (colorIndex + 1) % colors.length;
  }

  function cycle() {
    if (pixelMode) drawPixels(); else drawSolid();
  }

  function start() {
    if (interval) return;
    paused = false;
    cycle();
    interval = setInterval(cycle, speed);
  }

  function pause() {
    clearInterval(interval);
    interval = null;
    paused = true;
  }

  function resume() {
    if (!paused) return;
    start();
  }

  function solidColor(color) {
    pause();
    screen.style.backgroundColor = color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function togglePixelMode() {
    pixelMode = !pixelMode;
    screen.style.backgroundColor = '#000';
    return pixelMode;
  }

  function isPaused() { return paused; }

  start();

  function setPixelSize(s) { PIXEL_SIZE = Math.max(1, Math.min(50, s | 0)); }

  function setSpeed(ms) {
    speed = Math.max(1, Math.min(5000, ms | 0));
    if (!paused) { clearInterval(interval); interval = null; start(); }
  }

  function getSpeed() { return speed; }
  function getPixelSize() { return PIXEL_SIZE; }

  return { pause, resume, solidColor, isPaused, togglePixelMode, setPixelSize, setSpeed, getSpeed, getPixelSize };
})();
