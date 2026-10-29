const U = 'assets/img/';
const local = u => 'servicios/' + u.split('/').filter(Boolean).pop() + '.html';
const SERVICES = [
  {t:'Osteopatía', u:'osteopatia/', img:U+'2024/12/servei-osteopatia-201671842-min.jpg-300x300-1.png',
   d:'Valoramos la mecánica, la anatomía y la fisiología del cuerpo para devolverle su capacidad de adaptarse. Un enfoque suave y global, también para embarazadas y bebés.',
   s:[['Osteopatía biodinámica','osteopatia/biodinamica/'],['Ginecología','osteopatia/ginecologia/'],['Embarazo','osteopatia/embarazo/'],['Pediatría','osteopatia/pediatria/']]},
  {t:'Fisioterapia', u:'fisioterapia/', img:U+'2024/12/servei-fisio-194689903trans-min.jpg-300x300-1.png',
   d:'Tratamos lesiones, dolor y procesos de recuperación con terapia manual, técnicas invasivas y ejercicio pautado por profesionales colegiados.',
   s:[['Fisioterapia deportiva','fisioterapia/fisioterapia-deportiva/'],['Masaje terapéutico','fisioterapia/masaje-terapeutico/'],['Masaje linfático','fisioterapia/masaje-linfatico/'],['Suelo pélvico','fisioterapia/suelo-pelvico/'],['Punción seca','fisioterapia/puncion-seca/'],['Fisioterapia respiratoria','fisioterapia/fisioterapia-respiratoria/'],['Ejercicio terapéutico','fisioterapia/programacion-de-ejercicio-terapeutico/']]},
  {t:'Dietética y nutrición', u:'dietetica-y-nutricion/', img:U+'2025/01/nutricion.jpg',
   d:'Planes de alimentación hechos a tu medida, con especial atención a la salud digestiva, el equilibrio hormonal y el metabolismo.',
   s:[['Nutrición digestiva','dietetica-y-nutricion/nutricion-digestiva/'],['Nutrición hormonal de la mujer','dietetica-y-nutricion/nutricion-hormonal-de-la-mujer/'],['Regulación metabólica','dietetica-y-nutricion/regulacion-metabolica/']]},
  {t:'Psiconeuroinmunología', u:'psiconeuroinmunologia/', img:U+'2024/12/servei-PNI-64817617_blank.jpg-300x300-1.png',
   d:'La PNI relaciona el sistema nervioso, el hormonal y el inmunitario con tus hábitos para encontrar el origen del síntoma, no solo aliviarlo.',
   s:[]},
  {t:'Kinesiología', u:'kinesiologia/', img:U+'2025/01/servei-kinesiolasia.png',
   d:'Utilizamos el test muscular como herramienta de valoración para detectar desequilibrios y orientar el tratamiento.',
   s:[]}
];
const TEAM = [
  {n:'Robert Quiroga Sepúlveda', r:'Fundador', img:U+'2024/12/ROBERT-min.png', c:'Fisioterapeuta (Gimbernat–UAB, col. 1.992) · Osteópata D.O. (E.O.B. / European School of Osteopathy)'},
  {n:'David Torcal Àlamo', r:'Colaborador', img:U+'2024/12/david-min.png', c:'Fisioterapeuta (Gimbernat–UAB, col. 1.191) · Osteópata D.O. (E.C.O.) · Cofundador de Hacktua'},
  {n:'Alba Valls Llobet', r:'Colaboradora', img:U+'2024/12/alba-min.png', c:'Fisioterapeuta (Gimbernat–UAB, col. 7365) · Osteópata C.O. (E.C.O.)'},
  {n:'Natalia de Dios Trabal', r:'Colaboradora', img:U+'2024/12/nut_400x400.png', c:'Dietética y nutrición (Universidad de Barcelona, col. CAT 001053)'},
  {n:'David Casaus Cantos', r:'Colaborador', c:'Fisioterapeuta (FCS Blanquerna – URL, col. 13726)'},
  {n:'Gabriel Clavero Polo', r:'Colaborador', c:'Fisioterapeuta (Gimbernat–UAB, col. 16503)'}
];
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = typeof gsap !== 'undefined' && !reduce;
document.getElementById('year').textContent = new Date().getFullYear();

/* Services tabs */
const tabs = document.getElementById('svc-tabs');
const panel = document.getElementById('svc-panel');
const inner = panel.querySelector('.inner');
SERVICES.forEach((s, i) => {
  const b = document.createElement('button');
  b.className = 'svc-tab'; b.role = 'tab'; b.id = 'tab-' + i;
  b.setAttribute('aria-controls', 'svc-panel');
  b.innerHTML = `<span class="t">${esc(s.t)}</span><span class="plus" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg></span>`;
  b.addEventListener('click', () => select(i));
  b.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const j = (i + (e.key === 'ArrowDown' ? 1 : -1) + SERVICES.length) % SERVICES.length;
      select(j); tabs.children[j].focus();
    }
  });
  tabs.appendChild(b);
});
function renderPanel(i){
  const s = SERVICES[i];
  inner.innerHTML = `<div class="ph"><img src="${s.img}" alt="" width="112" height="112"><h3>${esc(s.t)}</h3></div>
    <p>${esc(s.d)}</p>${s.s.length ? `<ul>${s.s.map(([n,u]) => `<li><a href="${local(u)}">${esc(n)}</a></li>`).join('')}</ul>` : '<div style="height:26px"></div>'}
    <div class="panel-actions"><a class="btn btn-primary" href="#contacto" data-book="${esc(s.t)}">Pedir cita de ${esc(s.t.toLowerCase())} <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></a>
    <a class="btn btn-link" href="${local(s.u)}">Más información <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></a></div>`;
  panel.setAttribute('aria-labelledby', 'tab-' + i);
}
let current = -1;
function select(i){
  if (i === current) return;
  [...tabs.children].forEach((b, j) => { b.setAttribute('aria-selected', j === i); b.tabIndex = j === i ? 0 : -1; });
  if (hasGsap && current !== -1) {
    gsap.to(inner, {opacity:0, y:12, duration:.2, ease:'power2.in', onComplete(){
      renderPanel(i);
      gsap.fromTo(inner, {opacity:0, y:-12}, {opacity:1, y:0, duration:.5, ease:'expo.out'});
      gsap.from(inner.querySelectorAll('li'), {opacity:0, x:-10, stagger:.04, duration:.4, ease:'power2.out'});
    }});
  } else renderPanel(i);
  current = i;
}
select(0);

/* Team */
const team = document.getElementById('team');
team.innerHTML = TEAM.map(m => {
  const initials = m.n.split(' ').slice(0,2).map(w => w[0]).join('');
  const av = m.img ? `<img class="av" src="${m.img}" alt="${esc(m.n)}" width="64" height="64" loading="lazy">` : `<span class="av" aria-hidden="true">${initials}</span>`;
  return `<li class="member" ${m.img ? `data-img="${m.img}"` : ''}>${av}<h3>${esc(m.n)}</h3><p class="cred">${esc(m.c)}</p><span class="role ${m.r === 'Fundador' ? 'founder' : ''}">${m.r}</span></li>`;
}).join('');

/* Nav: hide on scroll down, active link, mobile menu */
const nav = document.getElementById('nav');
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 40);
  nav.classList.toggle('hidden', y > lastY && y > 500 && !document.body.classList.contains('menu-open'));
  lastY = y;
}, {passive:true});
const links = document.querySelectorAll('.nav-links a');
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), {rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
const burger = document.getElementById('burger');
const toggleMenu = open => {
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
burger.addEventListener('click', () => toggleMenu(!document.body.classList.contains('menu-open')));
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

/* Booking buttons prefill the form */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-book]');
  if (!b) return;
  toggleMenu(false);
  setTimeout(() => document.getElementById('f-name').focus({preventScroll:true}), 900);
});


/* Form */
const form = document.getElementById('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const set = (f, e2, msg) => { document.getElementById(e2).textContent = msg; document.getElementById(f).closest('.field')?.classList.toggle('invalid', !!msg); };
  let ok = true;
  const contact = v('f-contact');
  const validContact = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || /^\+?[\d\s]{9,15}$/.test(contact);
  set('f-name', 'e-name', v('f-name') ? '' : 'Escribe tu nombre.'); ok = ok && !!v('f-name');
  set('f-contact', 'e-contact', validContact ? '' : 'Necesitamos un email o un teléfono válido.'); ok = ok && validContact;
  set('f-msg', 'e-msg', v('f-msg').length >= 10 ? '' : 'Cuéntanos un poco más (mínimo 10 caracteres).'); ok = ok && v('f-msg').length >= 10;
  const accepted = document.getElementById('f-ok').checked;
  document.getElementById('e-ok').textContent = accepted ? '' : 'Debes aceptar la política de privacidad.'; ok = ok && accepted;
  if (!ok) return;
  const body = `Nombre: ${v('f-name')}\nContacto: ${contact}\n\n${v('f-msg')}`;
  location.href = `mailto:info@espaiterapeutic.es?subject=${encodeURIComponent('Consulta desde la web')}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = 'Abrimos tu correo con la consulta lista para enviar.';
});

/* Motion */
if (hasGsap) {
  gsap.registerPlugin(ScrollTrigger);
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({lerp:.1});
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      const t = a && a.getAttribute('href').length > 1 && document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); lenis.scrollTo(t, {offset: -60}); }
    });
  }

  // Hero: split headline into masked words
  const h1 = document.getElementById('hero-title');
  const splitWords = el => [...el.childNodes].forEach(node => {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part.trim()) { frag.append(part); return; }
        const w = document.createElement('span'); w.className = 'w';
        const s = document.createElement('span'); s.textContent = part; w.append(s); frag.append(w);
      });
      node.replaceWith(frag);
    } else splitWords(node);
  });
  splitWords(h1);
  const tl = gsap.timeline({defaults:{ease:'expo.out'}});
  tl.from('#hero-media', {clipPath:'inset(100% 0 0 0 round 28px)', duration:1.6, ease:'expo.inOut'})
    .from('#hero-media img', {scale:1.35, duration:2}, '<')
    .from('#hero-title .w > span', {yPercent:110, duration:1.3, stagger:.07}, '-=1.5')
    .from('[data-hero]', {opacity:0, y:24, duration:1, stagger:.1}, '-=1')
    .from('.nav-in > *', {opacity:0, y:-12, duration:.8, stagger:.06}, '-=1');
  gsap.to('#hero-media img', {yPercent:12, scale:1.08, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}});

  // About: word-by-word highlight on scroll
  const at = document.getElementById('about-text');
  at.innerHTML = at.textContent.split(' ').map(w => `<span class="wd">${esc(w)}</span>`).join(' ');
  gsap.to('#about-text .wd', {opacity:1, stagger:.1, ease:'none', scrollTrigger:{trigger:at, start:'top 80%', end:'bottom 45%', scrub:true}});
  gsap.to('[data-parallax]', {yPercent:-16, ease:'none', scrollTrigger:{trigger:'#nosotros', start:'top bottom', end:'bottom top', scrub:true}});

  // Generic reveals
  gsap.utils.toArray('[data-reveal-group]').forEach(g => gsap.from(g.children, {opacity:0, y:36, duration:1, stagger:.09, ease:'expo.out', scrollTrigger:{trigger:g, start:'top 85%'}}));
  gsap.from('.svc-tab', {opacity:0, x:-30, duration:1, stagger:.08, ease:'expo.out', scrollTrigger:{trigger:'#svc-tabs', start:'top 80%'}});
  gsap.from('#svc-panel', {opacity:0, y:60, rotate:1.5, duration:1.3, ease:'expo.out', scrollTrigger:{trigger:'#svc-panel', start:'top 85%'}});

  const mm = gsap.matchMedia();
  mm.add('(min-width: 961px)', () => {
    // Pinned horizontal gallery
    const track = document.getElementById('gallery-track');
    const dist = () => track.scrollWidth - innerWidth;
    gsap.to(track, {x:() => -dist(), ease:'none', scrollTrigger:{trigger:'#gallery-pin', start:'top top', end:() => '+=' + dist(), pin:true, scrub:1, invalidateOnRefresh:true}});


  });
  mm.add('(hover: hover) and (pointer: fine)', () => {
    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        gsap.to(b, {x:(e.clientX - r.left - r.width/2) * .25, y:(e.clientY - r.top - r.height/2) * .35, duration:.4, ease:'power3'});
      });
      b.addEventListener('mouseleave', () => gsap.to(b, {x:0, y:0, duration:.8, ease:'elastic.out(1,.4)'}));
    });
  });
  addEventListener('load', () => {
    ScrollTrigger.refresh();
    let t = null;
    try { t = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch {}
    if (t && lenis) { lenis.resize(); lenis.scrollTo(t, {offset: -60, immediate: true, force: true}); }
    else if (t) t.scrollIntoView();
  });
}
