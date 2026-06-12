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
});
