/* Scripts da página /salao-nobre — carrossel de gastronomia + lightbox da galeria */

// ---------- carrossel de gastronomia (padrão das demais páginas) ----------
(function () {
  const track = document.getElementById('track');
  if (!track) return;
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  const step = () => {
    const f = track.querySelector('figure');
    const g = parseFloat(getComputedStyle(track).gap) || 20;
    return f.getBoundingClientRect().width + g;
  };
  let pos = 0;
  const maxPos = () => track.scrollWidth - track.parentElement.clientWidth;
  const apply = () => {
    pos = Math.max(0, Math.min(pos, maxPos()));
    track.style.transform = `translateX(${-pos}px)`;
    if (prev) prev.disabled = pos <= 0;
    if (next) next.disabled = pos >= maxPos() - 1;
  };
  if (next) next.addEventListener('click', () => { pos += step(); apply(); });
  if (prev) prev.addEventListener('click', () => { pos -= step(); apply(); });
  window.addEventListener('resize', () => { pos = 0; apply(); });
  apply();
})();

// ---------- lightbox da galeria ----------
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close');

  document.querySelectorAll('.galeria-grid button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const full = btn.getAttribute('data-full');
      const img = btn.querySelector('img');
      lightboxImg.setAttribute('src', full);
      lightboxImg.setAttribute('alt', (img && img.getAttribute('alt')) || '');
      lightbox.classList.add('is-open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImg.setAttribute('src', '');
  }
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
})();
