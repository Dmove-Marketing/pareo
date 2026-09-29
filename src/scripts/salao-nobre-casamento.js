(function () {
  // Carrossel da Festa (scroll-snap nativo + bolinhas)
  var root = document.querySelector('.carrossel-festa');
  if (!root) return;

  var track = root.querySelector('.cf-track');
  var slides = Array.prototype.slice.call(track.querySelectorAll('.cf-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.cf-dots button'));
  var current = 0;

  // Slide ativo alinhado à esquerda: o padding-left do track é a margem do conteúdo
  function padLeft() { return parseFloat(getComputedStyle(track).paddingLeft) || 0; }

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: slides[i].offsetLeft - padLeft(), behavior: 'smooth' });
  }

  function update() {
    var start = track.scrollLeft + padLeft();
    var best = 0, bestDist = Infinity;
    slides.forEach(function (s, i) {
      var d = Math.abs(s.offsetLeft - start);
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
