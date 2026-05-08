(function () {
  const audio = new Audio('assets/music/gta4song.mp3');
  const startAtSeconds = 20;
  let hasStarted = false;
  let isPlaying = false;
  let wantsAudio = true;
  let toggleButton = null;
  let toggleLabel = null;

  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = 'auto';

  function syncToggle() {
    if (!toggleButton || !toggleLabel) {
      return;
    }

    toggleButton.classList.toggle('is-playing', wantsAudio);
    toggleButton.setAttribute('aria-pressed', String(wantsAudio));
    toggleLabel.textContent = wantsAudio ? 'MUSIC ON' : 'MUSIC OFF';
    toggleButton.setAttribute('aria-label', wantsAudio ? 'Muzigi kapat' : 'Muzigi ac');
  }

  function playAudio() {
    if (!wantsAudio) {
      return;
    }

    hasStarted = true;
    audio.currentTime = startAtSeconds;

    const playAttempt = audio.play();

    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.then(() => {
        isPlaying = true;
        syncToggle();
      }).catch(() => {
        hasStarted = false;
        isPlaying = false;
        syncToggle();
      });
      return;
    }

    isPlaying = true;
    syncToggle();
  }

  function startAudio() {
    if (hasStarted || !wantsAudio) {
      return;
    }

    playAudio();
  }

  function toggleAudio() {
    if (wantsAudio) {
      wantsAudio = false;
      audio.pause();
      isPlaying = false;
      hasStarted = false;
      syncToggle();
      return;
    }

    wantsAudio = true;
    syncToggle();
    playAudio();
  }

  function initAudioToggle() {
    toggleButton = document.getElementById('siteAudioToggle');
    if (!toggleButton) {
      return;
    }

    toggleLabel = toggleButton.querySelector('.footer__audio-label');
    toggleButton.addEventListener('click', toggleAudio);
    syncToggle();
  }

  document.addEventListener('DOMContentLoaded', initAudioToggle);
  window.addEventListener('load', startAudio, { once: true });
  window.addEventListener('scroll', startAudio, { once: true, passive: true });
})();
