/* Scripts da página /pareo-corporativo — carrossel mobile e lightbox do
   mosaico de ambientes (o carrossel de gastronomia e clientes são
   infinitos/automáticos via CSS) */

// ---------- carrossel de ambientes (mobile, mesmo padrão de /salao-nobre-casamento) ----------
(function () {
  const slider = document.querySelector('.ambientes-slider');
  if (!slider) return;
  const track = slider.querySelector('.mosaico-ambientes');
  const slides = Array.prototype.slice.call(track.children);
  const dots = Array.prototype.slice.call(slider.querySelectorAll('.slider-dots button'));
  let current = 0;

  // no desktop o mosaico é grid; o carrossel só existe quando vira flex (≤640px)
  function isCarrossel() { return getComputedStyle(track).display === 'flex'; }

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const s = slides[i];
    track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2 });
  }

  function update() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    slides.forEach(function (s, i) {
      const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    current = best;
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === best); });
    dots.forEach(function (d, i) {
      if (i === best) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  }

  dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); }); });

  // tocar numa foto lateral centraliza ela em vez de abrir o lightbox
  track.addEventListener('click', function (e) {
    if (!isCarrossel()) return;
    const btn = e.target.closest('button');
    const i = slides.indexOf(btn);
    if (i !== -1 && i !== current) { e.stopPropagation(); goTo(i); }
  }, true);

  let raf;
  track.addEventListener('scroll', function () {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// ---------- lightbox do mosaico ----------
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close');

  document.querySelectorAll('.mosaico-ambientes button').forEach(function (btn) {
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
