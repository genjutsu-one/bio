import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { trackView, loadReviews, setSb } from './db.js';
import { initUI } from './ui.js';
import { initMusicPlayer } from './player.js';
import { initBackground } from './background.js';
import { bootSequence } from './boot.js';
import { init3DTilt } from './tilt.js';

const sbClient = createClient(SUPABASE_URL, SUPABASE_KEY);
window._sbClient = sbClient;
setSb(sbClient);

bootSequence();

document.addEventListener('DOMContentLoaded', () => {
  trackView();
  setTimeout(loadReviews, 300);
  
  initUI();
  initMusicPlayer();
  initBackground();
  init3DTilt();
  
  document.querySelectorAll('.stat-box').forEach(box => {
    box.addEventListener('touchstart', () => {
      box.classList.add('is-active');
      box.classList.remove('shine-run');
      void box.offsetWidth;
      box.classList.add('shine-run');
    }, { passive: true });

    box.addEventListener('touchend', () => setTimeout(() => {
      box.classList.remove('is-active');
      box.classList.remove('shine-run');
    }, 300));

    box.addEventListener('touchcancel', () => {
      box.classList.remove('is-active');
      box.classList.remove('shine-run');
    });
  });
});
