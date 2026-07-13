// reveal on scroll
const io = new IntersectionObserver((es) => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// gastronomia carousel
const track = document.getElementById('track');
const prev = document.getElementById('prev'), next = document.getElementById('next');
const step = () => { const f = track.querySelector('figure'); const g = parseFloat(getComputedStyle(track).gap) || 20; return f.getBoundingClientRect().width + g; };
let pos = 0;
const maxPos = () => track.scrollWidth - track.parentElement.clientWidth;
const apply = () => { pos = Math.max(0, Math.min(pos, maxPos())); track.style.transform = `translateX(${-pos}px)`; prev.disabled = pos <= 0; next.disabled = pos >= maxPos() - 1; };
next.addEventListener('click', () => { pos += step(); apply(); });
prev.addEventListener('click', () => { pos -= step(); apply(); });
window.addEventListener('resize', () => { pos = 0; apply(); });
apply();

// lightbox
const figs = [...document.querySelectorAll('#gallery figure img')];
const lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img');
let idx = 0;
const show = i => { idx = (i + figs.length) % figs.length; lbImg.src = figs[idx].src; lbImg.alt = figs[idx].alt; };
figs.forEach((img, i) => img.parentElement.addEventListener('click', () => { show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }));
const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
document.getElementById('lbClose').addEventListener('click', close);
document.getElementById('lbNext').addEventListener('click', () => show(idx + 1));
document.getElementById('lbPrev').addEventListener('click', () => show(idx - 1));
lb.addEventListener('click', e => { if (e.target === lb) close(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') show(idx + 1);
  if (e.key === 'ArrowLeft') show(idx - 1);
});
