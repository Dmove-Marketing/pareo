/* Scripts da página /salao-nobre — lightbox da galeria
   (o carrossel de gastronomia é infinito/automático via CSS) */

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
