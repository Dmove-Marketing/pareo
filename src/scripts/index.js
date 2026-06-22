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
  const originals=Array.from(car.children);
  originals.forEach(s=>car.appendChild(s.cloneNode(true)));
  originals.forEach(s=>car.insertBefore(s.cloneNode(true),car.firstChild));

  const half=()=>car.scrollWidth/3;
  const recenter=()=>{car.scrollLeft=half();};
  window.addEventListener('load',recenter);
  recenter();

  const step=()=>Math.min(car.clientWidth*.8,600);

  // jump instantâneo ANTES do scroll suave para não duplicar frame
  const scrollNext=()=>{
    const block=half();
    if(car.scrollLeft+step()>=block*2) car.scrollLeft-=block;
    car.scrollBy({left:step(),behavior:'smooth'});
  };
  const scrollPrev=()=>{
    const block=half();
    if(car.scrollLeft-step()<block) car.scrollLeft+=block;
    car.scrollBy({left:-step(),behavior:'smooth'});
  };

  // fallback para arrasto manual
  let dragTimer;
  car.addEventListener('scroll',()=>{
    clearTimeout(dragTimer);
    dragTimer=setTimeout(()=>{
      const block=half();
      if(car.scrollLeft<block) car.scrollLeft+=block;
      else if(car.scrollLeft>=block*2) car.scrollLeft-=block;
    },80);
  });

  document.getElementById('next').addEventListener('click',scrollNext);
  document.getElementById('prev').addEventListener('click',scrollPrev);

  let auto=setInterval(scrollNext,4200);
  const carWrap=car.closest('.carousel-wrap');
  carWrap.addEventListener('mouseenter',()=>clearInterval(auto));
  carWrap.addEventListener('mouseleave',()=>{auto=setInterval(scrollNext,4200);});