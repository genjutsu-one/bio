
const widgetBase = 'https://raw.githubusercontent.com/genjutsu-one/bio/main/media/widget';
const widgetCount = 9;

function pickWidgetUrl() {
  const n = Math.floor(Math.random() * widgetCount) + 1;
  return n === 1 ? widgetBase + '.mp4' : widgetBase + n + '.mp4';
}

export function initWidget() {
  const vid = document.getElementById('widget-vid');
  if (!vid) return;

  vid.play().catch(() => {});

  setInterval(() => {
    vid.src = pickWidgetUrl();
    vid.load();
    vid.play().catch(() => {});
  }, 30 * 60 * 1000);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) vid.play().catch(() => {});
      else vid.pause();
    });
  }, { threshold: 0.15 });
  observer.observe(vid);
}
