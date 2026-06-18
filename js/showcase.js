export function initShowcase() {
  const vid = document.getElementById('showcase-vid');
  if (!vid) return;

  const soundIcon = document.getElementById('showcase-sound');
  const fill = document.getElementById('showcase-fill');
  const timeEl = document.getElementById('showcase-time');

  function fmt(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    return Math.floor(sec / 60) + ':' + String(Math.floor(sec % 60)).padStart(2, '0');
  }

  vid.addEventListener('timeupdate', () => {
    if (!vid.duration) return;
    fill.style.width = (vid.currentTime / vid.duration) * 100 + '%';
    timeEl.textContent = fmt(vid.currentTime) + ' / ' + fmt(vid.duration);
  });

  document.getElementById('showcase-progress').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (vid.duration) {
      vid.currentTime = (e.clientX - rect.left) / rect.width * vid.duration;
    }
  });

  // autoplay muted, browsers don't complain about that without a click
  vid.play().catch(() => {});

  // no point keeping it running once it's scrolled way off screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) vid.play().catch(() => {});
      else vid.pause();
    });
  }, { threshold: 0.15 });
  observer.observe(vid);

  window.toggleShowcaseSound = function () {
    vid.muted = !vid.muted;
    soundIcon.classList.toggle('is-muted', vid.muted);
  };
}
