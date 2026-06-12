
export function init3DTilt() {
  document.querySelectorAll('.card, .stat-box, .community-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
      const rotateX = clamp((centerY - y) / 45, -3.5, 3.5);
      const rotateY = clamp((x - centerX) / 45, -3.5, 3.5);
      
      card.style.setProperty('--tilt-x', rotateX + 'deg');
      card.style.setProperty('--tilt-y', rotateY + 'deg');
      
      const oldX = parseFloat(card.dataset.shineX || x);
      const shineX = oldX + (x - oldX) * 0.22;
      card.dataset.shineX = shineX;
      card.style.setProperty('--shine-x', shineX + 'px');
      card.style.transition = 'border-color 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      delete card.dataset.shineX;
      card.style.transition = '';
    });
  });
}
