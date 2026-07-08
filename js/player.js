let musicStarted = false;

function getCurrentRotation(el) {
  const st = window.getComputedStyle(el, null);
  const tr = st.getPropertyValue('transform');
  if (!tr || tr === 'none') return 0;
  const vals = tr.split('(')[1].split(')')[0].split(',');
  const a = parseFloat(vals[0]);
  const b = parseFloat(vals[1]);
  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}

function setPlayingUI(isPlaying) {
  const coverEl = document.getElementById('cover');
  document.querySelector('.music-card .dot').classList.toggle('playing', isPlaying);
  if (isPlaying) {
    coverEl.style.transform = '';
    coverEl.classList.add('spinning');
  } else {
    const deg = getCurrentRotation(coverEl);
    coverEl.classList.remove('spinning');
    coverEl.style.transform = `rotate(${deg}deg)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        coverEl.style.transform = 'rotate(0deg)';
      });
    });
  }
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
    e.stopPropagation();
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
}
