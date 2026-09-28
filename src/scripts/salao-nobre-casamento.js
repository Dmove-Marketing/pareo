(function () {
  // Carrossel da Festa (scroll-snap nativo + setas e bolinhas)
  var root = document.querySelector('.carrossel-festa');
  if (!root) return;

  var track = root.querySelector('.cf-track');
  var slides = Array.prototype.slice.call(track.querySelectorAll('.cf-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.cf-dots button'));
  var prev = root.querySelector('.cf-prev');
  var next = root.querySelector('.cf-next');
  var current = 0;

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    var s = slides[i];
    track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: 'smooth' });
  }

  function update() {
    var center = track.scrollLeft + track.clientWidth / 2;
    var best = 0, bestDist = Infinity;
    slides.forEach(function (s, i) {
      var d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    current = best;
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === best); });
    dots.forEach(function (d, i) {
      if (i === best) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    prev.disabled = best === 0;
    next.disabled = best === slides.length - 1;
  }

  prev.addEventListener('click', function () { goTo(current - 1); });
  next.addEventListener('click', function () { goTo(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); }); });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });

  var raf;
  track.addEventListener('scroll', function () {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
