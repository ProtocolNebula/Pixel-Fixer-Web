(() => {
  const controls = document.getElementById('controls');
  const btnPause = document.getElementById('btn-pause');
  const overlay = document.getElementById('overlay');
  let hideTimer;

  function resetHideTimer() {
    controls.classList.remove('hidden');
    overlay.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { controls.classList.add('hidden'); overlay.classList.remove('visible'); }, 5000);
  }

  document.addEventListener('mousemove', resetHideTimer);
  document.addEventListener('click', resetHideTimer);
  resetHideTimer();

  document.getElementById('btn-fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });

  btnPause.addEventListener('click', () => {
    if (PixelFixer.isPaused()) {
      PixelFixer.resume();
      btnPause.textContent = '⏸ Pause';
    } else {
      PixelFixer.pause();
      btnPause.textContent = '▶ Play';
    }
  });

  document.getElementById('pixel-size').addEventListener('input', e => {
    PixelFixer.setPixelSize(Number(e.target.value));
  });

  document.getElementById('speed').addEventListener('input', e => {
    PixelFixer.setSpeed(Number(e.target.value));
  });

  const btnMode = document.getElementById('btn-mode');
  btnMode.addEventListener('click', () => {
    const isPixel = PixelFixer.togglePixelMode();
    btnMode.textContent = isPixel ? '🔲 Single Color' : '🔳 Pixel Mode';
    if (PixelFixer.isPaused()) { PixelFixer.resume(); btnPause.textContent = '⏸ Pause'; }
  });

  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      PixelFixer.solidColor(btn.dataset.color);
      btnPause.textContent = '▶ Play';
    });
  });
})();
