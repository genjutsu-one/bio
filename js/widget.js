const widgetBase = 'https://raw.githubusercontent.com/genjutsu-one/bio/main/media/widget';
const widgetCount = 9;
const widgetInterval = 30 * 60 * 1000;

function widgetUrlForSlot(slot) {
  const hash = Math.abs(Math.sin(slot) * 10000);
  const n = Math.floor(hash % widgetCount) + 1;
  return n === 1 ? widgetBase + '.mp4' : widgetBase + n + '.mp4';
}

export function initWidget() {
  const vid = document.getElementById('widget-vid');
  if (!vid) return;

  function applyCurrentSlot() {
    const slot = Math.floor(Date.now() / widgetInterval);
    vid.src = widgetUrlForSlot(slot);
    vid.load();
    vid.play().catch(() => {});
  }

  function scheduleNext() {
    const delay = widgetInterval - (Date.now() % widgetInterval);
    setTimeout(() => {
      applyCurrentSlot();
      scheduleNext();
    }, delay);
  }

  applyCurrentSlot();
  scheduleNext();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) vid.play().catch(() => {});
      else vid.pause();
    });
  }, { threshold: 0.15 });
  observer.observe(vid);
}
