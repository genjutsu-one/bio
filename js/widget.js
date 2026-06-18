export function initWidget() {
  const vid = document.getElementById('widget-vid');
  if (!vid) return;

  vid.play().catch(() => {});

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) vid.play().catch(() => {});
      else vid.pause();
    });
  }, { threshold: 0.15 });
  observer.observe(vid);
}
