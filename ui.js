(() => {
  const controls = document.getElementById('controls');
  const btnPause = document.getElementById('btn-pause');
  const overlay = document.getElementById('overlay');
  const shortcuts = document.getElementById('shortcuts');
  const adLeft = document.getElementById('ad-left');
  const adRight = document.getElementById('ad-right');
  const speedInput = document.getElementById('speed');
  const pxInput = document.getElementById('pixel-size');
  const btnMode = document.getElementById('btn-mode');
  const uiElements = [controls, shortcuts, adLeft, adRight].filter(Boolean);
  let hideTimer;
  let forceHidden = false;

  function showUI() {
    forceHidden = false;
    uiElements.forEach(el => el.classList.remove('hidden'));
    overlay.classList.add('visible');
  }

  function hideUI() {
    uiElements.forEach(el => el.classList.add('hidden'));
    overlay.classList.remove('visible');
  }

  function resetHideTimer() {
    if (forceHidden) return;
    showUI();
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideUI, 5000);
  }

  function forceHide() {
    forceHidden = true;
    clearTimeout(hideTimer);
    hideUI();
  }

  function isInput(e) { return e.target.tagName === 'INPUT'; }

  function togglePause() {
    if (PixelFixer.isPaused()) {
      PixelFixer.resume();
      btnPause.textContent = '⏸ Pause';
    } else {
      PixelFixer.pause();
      btnPause.textContent = '▶ Play';
    }
  }

  function syncInputs() {
    speedInput.value = PixelFixer.getSpeed();
    pxInput.value = PixelFixer.getPixelSize();
  }

  document.addEventListener('mousemove', () => { forceHidden = false; resetHideTimer(); });
  document.addEventListener('click', resetHideTimer);
  document.addEventListener('keydown', e => {
    if (isInput(e)) return;
    if (e.code !== 'KeyH') resetHideTimer();
    switch (e.code) {
      case 'Space': e.preventDefault(); togglePause(); break;
      case 'KeyF':
        if (!document.fullscreenElement && !document.webkitFullscreenElement)
          (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen).call(document.documentElement);
        else
          (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        break;
      case 'KeyT': btnMode.click(); break;
      case 'KeyH': forceHide(); break;
      case 'KeyR': PixelFixer.solidColor('red'); btnPause.textContent = '▶ Play'; break;
      case 'KeyG': PixelFixer.solidColor('green'); btnPause.textContent = '▶ Play'; break;
      case 'KeyB': PixelFixer.solidColor('blue'); btnPause.textContent = '▶ Play'; break;
      case 'ArrowUp': e.preventDefault(); PixelFixer.setSpeed(PixelFixer.getSpeed() - 10); syncInputs(); break;
      case 'ArrowDown': e.preventDefault(); PixelFixer.setSpeed(PixelFixer.getSpeed() + 10); syncInputs(); break;
      case 'ArrowLeft': e.preventDefault(); PixelFixer.setPixelSize(PixelFixer.getPixelSize() - 1); syncInputs(); break;
      case 'ArrowRight': e.preventDefault(); PixelFixer.setPixelSize(PixelFixer.getPixelSize() + 1); syncInputs(); break;
    }
  });
  resetHideTimer();

  document.getElementById('btn-fullscreen').addEventListener('click', () => {
    const el = document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    }
  });

  document.getElementById('btn-hide').addEventListener('click', e => { e.stopPropagation(); forceHide(); });
  btnPause.addEventListener('click', togglePause);
  pxInput.addEventListener('input', e => PixelFixer.setPixelSize(Number(e.target.value)));
  speedInput.addEventListener('input', e => PixelFixer.setSpeed(Number(e.target.value)));

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
