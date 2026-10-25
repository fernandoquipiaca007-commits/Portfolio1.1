/* Fernando Júnior — portfolio interactions */
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = () => typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  if (reduce) root.classList.add('no-motion');

  /* ---------- Clock (Luanda) + year ---------- */
  const tick = () => {
    let t = '';
    try { t = new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Luanda' }).format(new Date()); } catch (e) { t = ''; }
    $$('[data-clock]').forEach(el => { el.textContent = t; });
  };
  tick(); setInterval(tick, 30000);
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Mobile menu ---------- */
  const burger = $('.nav__burger');
  const menu = $('.menu');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', String(!open));
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('.menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Anchor links (smooth via Lenis when present) ---------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: id === '#top' ? 0 : -20, duration: 1.4 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* ---------- Nav: scrolled / hide on scroll down ---------- */
  const nav = $('.nav');
  const fab = $('.fab');
  let lastY = 0;
  const onScroll = (y) => {
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > lastY && y > 400 && !document.body.classList.contains('menu-open'));
    fab.classList.toggle('is-on', y > window.innerHeight * 0.8);
    lastY = y;
  };
  window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });

  /* ---------- Active section in nav ---------- */
  const links = $$('.nav__links a');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    ['trabalho', 'servicos', 'processo', 'sobre'].forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Quotes carousel ---------- */
  const quotes = $$('.quote');
  let qi = 0, qTimer;
  const showQuote = (n) => {
    qi = (n + quotes.length) % quotes.length;
    quotes.forEach((q, i) => q.classList.toggle('is-active', i === qi));
    $('[data-qi]').textContent = String(qi + 1).padStart(2, '0');
  };
  const autoQuote = () => { clearInterval(qTimer); if (!reduce) qTimer = setInterval(() => showQuote(qi + 1), 7000); };
  $$('[data-q]').forEach(b => b.addEventListener('click', () => { showQuote(qi + (b.dataset.q === 'next' ? 1 : -1)); autoQuote(); }));
  autoQuote();

  /* ---------- Archive hover preview ---------- */
  const prev = $('.archive__preview');
  const prevImg = prev && $('img', prev);
  if (prev && finePointer) {
    $$('.row[data-img]').forEach(r => {
      r.addEventListener('mouseenter', () => { prevImg.src = r.dataset.img; prev.classList.add('is-on'); });
      r.addEventListener('mouseleave', () => prev.classList.remove('is-on'));
    });
    window.addEventListener('mousemove', e => {
      prev.style.setProperty('--x', (e.clientX + 24) + 'px');
      prev.style.setProperty('--y', (e.clientY - 120) + 'px');
    }, { passive: true });
  }

  window.__fj = { $, $$, reduce, finePointer, hasGsap, onScroll };
})();

/* ===== Pointer effects: cursor, magnetic buttons, 3D tilt ===== */
(() => {
  const { $, $$, reduce, finePointer } = window.__fj;
  if (!finePointer || reduce) return;
  document.documentElement.classList.add('has-cursor');

  const cursor = $('.cursor');
  const label = $('.cursor__label');
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  const loop = () => {
    cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
    cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    requestAnimationFrame(loop);
  };
  loop();

  $$('a, button, summary').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const txt = el.closest('[data-cursor]')?.dataset.cursor;
      if (txt) { label.textContent = txt; cursor.classList.add('is-view'); }
      else cursor.classList.add('is-hover');
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover', 'is-view'));
  });

  /* magnetic */
  $$('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.4;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1), color .4s, border-color .4s';
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, 600);
    });
  });

  /* 3D tilt on project cards */
  $$('[data-tilt]').forEach(card => {
    const frame = $('.frame', card);
    let raf;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(1400px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
        if (frame) frame.style.transform = `translateZ(30px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
      });
    });
    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      card.style.transition = 'transform .9s cubic-bezier(.16,1,.3,1)';
      card.style.transform = '';
      if (frame) frame.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 900);
    });
  });
})();

/* ===== Scroll motion (GSAP + Lenis) ===== */
(() => {
  const { $, $$, reduce, hasGsap, onScroll } = window.__fj;
  const root = document.documentElement;
  const loader = $('.loader');

  /* split manifesto into words */
  const mText = $('[data-words]');
  if (mText) mText.innerHTML = mText.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');

  /* counters */
  const runCounter = (el) => {
    const to = +el.dataset.to; const dur = 1800; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1); const e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * e).toLocaleString('pt-PT');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* --- Fallback: no GSAP or reduced motion --- */
  if (!hasGsap() || reduce) {
    root.classList.add('no-motion', 'is-loaded');
    if (loader) loader.remove();
    $$('[data-to]').forEach(el => { el.textContent = (+el.dataset.to).toLocaleString('pt-PT'); });
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  /* Lenis smooth scroll */
  if (typeof window.Lenis !== 'undefined') {
    const lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll); window.__scrollVel = e.velocity; });
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  /* initial hidden states */
  gsap.set('.hero .line__in', { yPercent: 110 });
  gsap.set(['.hero__top', '.hero__bottom > *', '.nav'], { autoAlpha: 0, y: 24 });

  /* Loader */
  const count = $('[data-count]');
  const bar = $('.loader__bar span');
  const prog = { v: 0 };
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to(prog, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { count.textContent = Math.round(prog.v); bar.style.transform = `scaleX(${prog.v / 100})`; } })
    .to('.loader__inner', { yPercent: -40, autoAlpha: 0, duration: .6, ease: 'power3.in' })
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=.15')
    .add(() => { root.classList.add('is-loaded'); loader.remove(); window.__lenis && window.__lenis.start(); })
    .to('.hero .line__in', { yPercent: 0, duration: 1.4, stagger: .12 }, '-=.55')
    .to(['.nav', '.hero__top', '.hero__bottom > *'], { autoAlpha: 1, y: 0, duration: 1.1, stagger: .08 }, '-=1.1')
    .add(() => window.dispatchEvent(new Event('fj:intro')), '-=1.4');

  /* Hero parallax out */
  gsap.to('.hero__title', { yPercent: -18, opacity: .15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__bottom', { yPercent: -40, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true } });

  /* Marquee driven by scroll velocity */
  $$('.marquee__row').forEach(row => {
    const track = $('.marquee__track', row);
    for (let i = 0; i < 3; i++) row.appendChild(track.cloneNode(true));
    const tracks = $$('.marquee__track', row);
    const dir = +row.dataset.dir;
    let x = 0;
    gsap.ticker.add(() => {
      const w = tracks[0].offsetWidth; if (!w) return;
      const v = Math.min(Math.abs(window.__scrollVel || 0), 60);
      x -= (0.6 + v * 0.25) * dir;
      if (x <= -w) x += w; if (x > 0) x -= w;
      tracks.forEach(t => { t.style.transform = `translate3d(${x}px,0,0)`; });
    });
  });

  /* Manifesto words scrub */
  gsap.to('.manifesto__text .w', { opacity: 1, stagger: .05, ease: 'none', scrollTrigger: { trigger: '.manifesto__text', start: 'top 80%', end: 'bottom 45%', scrub: true } });

  /* Counters */
  $$('[data-to]').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => runCounter(el) }));

  window.__fjMotion = { gsap, ScrollTrigger };
})();

/* ===== Section animations ===== */
(() => {
  if (!window.__fjMotion) return;
  const { $, $$ } = window.__fj;
  const { gsap, ScrollTrigger } = window.__fjMotion;
  const root = document.documentElement;

  /* Generic reveals */
  const revealSel = ['.label', '.h2', '.manifesto__meta > div', '.stat', '.services__side .muted', '.svc', '.step', '.row', '.quotes__stage', '.xp__list li', '.xp__certs', '.faq__list details', '.cta__row', '.footer__row'];
  $$(revealSel.join(',')).forEach(el => {
    if (el.closest('.hero')) return;
    el.setAttribute('data-reveal', '');
    gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  /* Horizontal project gallery (desktop) */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    root.classList.add('is-horizontal');
    const pin = $('.work__pin');
    const track = $('.work__track');
    const dist = () => track.scrollWidth - innerWidth;
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    gsap.to('.work__progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist(), scrub: true } });
    /* parallax image inside each frame while sliding */
    $$('.card .frame img').forEach(img => {
      gsap.fromTo(img, { xPercent: -4, scale: 1.1 }, { xPercent: 4, scale: 1.1, ease: 'none', scrollTrigger: { trigger: img.closest('.card'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
    });
    return () => root.classList.remove('is-horizontal');
  });
  mm.add('(max-width: 1023px)', () => {
    $$('.card').forEach(card => gsap.from(card, { y: 60, opacity: 0, rotateX: 8, transformPerspective: 1000, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } }));
  });

  /* Process progress line */
  gsap.to('.process__line span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.process__grid', start: 'top 75%', end: 'bottom 60%', scrub: true } });

  /* CTA title */
  gsap.set('.cta .line__in', { yPercent: 110 });
  gsap.to('.cta .line__in', { yPercent: 0, duration: 1.3, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: '.cta__title', start: 'top 80%', once: true } });

  /* Footer big name slides in */
  gsap.from('.footer__big', { xPercent: -10, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  /* Recalc after fonts/images */
  addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
