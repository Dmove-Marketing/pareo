(function () {
  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.close');

  document.querySelectorAll('.galeria-grid button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var full = btn.getAttribute('data-full');
      var alt = btn.querySelector('img').getAttribute('alt');
      lightboxImg.setAttribute('src', full);
      lightboxImg.setAttribute('alt', alt);
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
