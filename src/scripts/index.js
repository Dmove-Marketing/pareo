/* Scripts extraídos de index.html */

// Sticky header background on scroll
  const bar=document.getElementById('bar');
  window.addEventListener('scroll',()=>{
    bar.classList.toggle('scrolled',window.scrollY>40);
  });

  // Scroll reveal
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Gastronomia carousel — loop infinito
  const car=document.getElementById('carousel');
  // duplica os slides para criar a ilusão de continuidade
  const originals=Array.from(car.children);
  originals.forEach(s=>car.appendChild(s.cloneNode(true)));
  originals.forEach(s=>car.insertBefore(s.cloneNode(true),car.firstChild));

  const half=()=>car.scrollWidth/3; // 1 bloco original entre as cópias
  // posiciona no bloco do meio ao carregar
  const recenter=()=>{car.scrollLeft=half();};
  window.addEventListener('load',recenter);
  recenter();

  const step=()=>Math.min(car.clientWidth*.8,600);
  const loopGuard=()=>{
    const block=half();
    if(car.scrollLeft<=block*0.05){car.scrollLeft+=block;}
    else if(car.scrollLeft>=block*1.95){car.scrollLeft-=block;}
  };
  car.addEventListener('scroll',()=>{window.requestAnimationFrame(loopGuard);});

  document.getElementById('next').addEventListener('click',()=>car.scrollBy({left:step(),behavior:'smooth'}));
  document.getElementById('prev').addEventListener('click',()=>car.scrollBy({left:-step(),behavior:'smooth'}));

  // avanço automático contínuo
  let auto=setInterval(()=>car.scrollBy({left:step(),behavior:'smooth'}),4200);
  const carWrap=car.closest('.carousel-wrap');
  carWrap.addEventListener('mouseenter',()=>clearInterval(auto));
  carWrap.addEventListener('mouseleave',()=>{auto=setInterval(()=>car.scrollBy({left:step(),behavior:'smooth'}),4200);});

