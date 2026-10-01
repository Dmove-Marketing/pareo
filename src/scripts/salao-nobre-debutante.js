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
  // Palco (cerimonial/valsa): painel ativo se expande; avança sozinho ao fim da barra de progresso
  document.querySelectorAll('[data-palco]').forEach(function (palco) {
    var paineis = palco.querySelectorAll('.palco-painel');

    function ativar(i) {
      paineis.forEach(function (p, j) {
        p.classList.toggle('is-active', j === i);
        p.setAttribute('aria-pressed', j === i ? 'true' : 'false');
      });
    }

    paineis.forEach(function (p, i) {
      p.addEventListener('click', function () { ativar(i); });
      p.querySelector('.palco-progresso').addEventListener('animationend', function () {
        ativar((i + 1) % paineis.length);
      });
    });

    // só roda o autoplay com a seção na tela
    new IntersectionObserver(function (entries) {
      palco.classList.toggle('is-visivel', entries[0].isIntersecting);
    }, { threshold: 0.4 }).observe(palco);
  });
})();

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
