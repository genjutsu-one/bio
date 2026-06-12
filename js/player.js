let musicStarted = false;

function setPlayingUI(isPlaying) {
  const coverEl = document.getElementById('cover');
  coverEl.classList.toggle('spinning', isPlaying);
}

function applyMuteUI(playing) {
  document.getElementById('ficon-vol').style.display = playing ? '' : 'none';
  document.getElementById('ficon-mute').style.display = playing ? 'none' : '';
}

export function initMusicPlayer() {
  const audio = document.getElementById('audio');
  const fill = document.getElementById('progress-fill');
  const ptimeEl = document.getElementById('ptime');

  function fmt(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    return Math.floor(seconds / 60) + ':' + String(Math.floor(seconds % 60)).padStart(2, '0');
  }

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    fill.style.width = percent + '%';
    ptimeEl.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
  });

  audio.addEventListener('ended', () => {
    setPlayingUI(false);
  });

  document.getElementById('progress-bar').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (audio.duration) {
      audio.currentTime = (e.clientX - rect.left) / rect.width * audio.duration;
    }
  });

  window.toggleMute = function() {
    if (!musicStarted) {
      audio.volume = 0.6;
      audio.play().then(() => {
        musicStarted = true;
        setPlayingUI(true);
        applyMuteUI(true);
      }).catch(() => {});
      return;
    }
    if (!audio.paused) {
      audio.pause();
      setPlayingUI(false);
      applyMuteUI(false);
    } else {
      audio.play();
      setPlayingUI(true);
      applyMuteUI(true);
    }
  };

  document.getElementById('floatmute').addEventListener('click', window.toggleMute);
}
