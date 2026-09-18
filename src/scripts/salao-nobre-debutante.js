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

(function () {
  // Mini-carousel (cerimonial/valsa e festa/pista)
  document.querySelectorAll('[data-carrossel]').forEach(function (car) {
    var track = car.querySelector('.mini-carrossel-track');
    var slides = car.querySelectorAll('.mini-carrossel-slide');
    var dotsWrap = car.querySelector('.mini-carrossel-dots');
    var index = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Ir para foto ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    function update() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dotsWrap.querySelectorAll('button').forEach(function (d, i) {
        d.classList.toggle('is-active', i === index);
      });
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    car.querySelector('.prev').addEventListener('click', function () { goTo(index - 1); });
    car.querySelector('.next').addEventListener('click', function () { goTo(index + 1); });
  });
})();
