const nav = document.getElementById('nav');
let lastY = 0;
const onScroll = () => {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 40);
  nav.classList.toggle('hidden', y > lastY && y > 500 && !document.body.classList.contains('menu-open'));
  lastY = y;
};
addEventListener('scroll', onScroll, {passive: true});
onScroll();
document.getElementById('year').textContent = new Date().getFullYear();

const burger = document.getElementById('burger');
const toggleMenu = open => {
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
burger.addEventListener('click', () => toggleMenu(!document.body.classList.contains('menu-open')));
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

const toc = document.querySelectorAll('.toc a');
if (toc.length) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) toc.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
  }), {rootMargin: '-15% 0px -75% 0px'});
  document.querySelectorAll('.prose h2[id]').forEach(h => io.observe(h));
}

const q = document.getElementById('q');
if (q) {
  const rows = [...document.querySelectorAll('.post-row')];
  const chips = [...document.querySelectorAll('.chip')];
  const count = document.getElementById('count');
  const empty = document.getElementById('empty');
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  let topic = '';
  const run = () => {
    const t = norm(q.value.trim());
    let n = 0;
    rows.forEach(r => {
      const ok = (!topic || r.dataset.topic === topic) && (!t || norm(r.dataset.text).includes(t));
      r.hidden = !ok;
      if (ok) n++;
    });
    count.textContent = n === 1 ? '1 artículo' : `${n} artículos`;
    empty.hidden = n > 0;
    document.getElementById('empty-q').textContent = q.value.trim() || topic;
  };
  q.addEventListener('input', run);
  chips.forEach(c => c.addEventListener('click', () => {
    topic = c.dataset.filter;
    chips.forEach(x => x.setAttribute('aria-pressed', x === c));
    run();
  }));
  document.getElementById('reset').addEventListener('click', () => {
    q.value = ''; topic = '';
    chips.forEach((x, i) => x.setAttribute('aria-pressed', i === 0));
    run(); q.focus();
  });
}
