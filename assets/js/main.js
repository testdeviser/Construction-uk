/* =========================================================
   UK Construction – Homepage scripts
   ========================================================= */
(function () {
  // Sticky header shadow once the page scrolls
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Services dropdown: click / keyboard support (hover handled in CSS)
  document.querySelectorAll('.has-dropdown').forEach((item) => {
    const toggle = item.querySelector('.nav__toggle');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = item.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        item.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  });

  // Close dropdowns when clicking elsewhere
  document.addEventListener('click', () => {
    document.querySelectorAll('.has-dropdown.is-open').forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false');
    });
  });
})();

(function () {
  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---------- Hero: slideshow ---------- */
(function () {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  const DURATION = 6000;
  let current = 0, timer;
  document.documentElement.style.setProperty('--slide-time', DURATION / 1000 + 's');

  const go = (i) => {
    slides[current].classList.remove('is-active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots.forEach((d, n) => {
      d.classList.remove('is-active', 'is-done');
      void d.offsetWidth; // restart progress animation
      if (n < current) d.classList.add('is-done');
      if (n === current) d.classList.add('is-active');
    });
    clearTimeout(timer);
    timer = setTimeout(() => go(current + 1), DURATION);
  };
  if (slides.length) {
    dots.forEach((d) => d.addEventListener('click', () => go(+d.dataset.slide)));
    timer = setTimeout(() => go(1), DURATION);
  }

})();

/* ---------- Scroll reveal ---------- */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-visible')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach((e) => io.observe(e));
})();

/* ---------- Services: expanding panels ---------- */
(function () {
  const row = document.getElementById('svcRow');
  if (!row) return;
  const panels = [...row.querySelectorAll('.svc')];
  const cur = document.getElementById('svcCurrent');
  const bar = document.getElementById('svcBar');
  let auto, paused = false;

  const activate = (i) => {
    panels.forEach((p, n) => {
      p.classList.toggle('is-active', n === i);
      p.setAttribute('aria-expanded', n === i);
    });
    cur.textContent = i + 1;
    bar.style.width = ((i + 1) / panels.length * 100) + '%';
  };
  const idx = () => panels.findIndex((p) => p.classList.contains('is-active'));

  panels.forEach((p, i) => {
    p.addEventListener('mouseenter', () => { if (Date.now() < (window.svcLockUntil || 0)) return; activate(i); });
    p.addEventListener('click', () => activate(i));
    p.addEventListener('focus', () => activate(i));
    p.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); panels[(i + 1) % panels.length].focus(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); panels[(i - 1 + panels.length) % panels.length].focus(); }
    });
  });

  // Gentle auto-advance until the visitor interacts
  row.addEventListener('mouseenter', () => { paused = true; });
  row.addEventListener('focusin', () => { paused = true; });
  row.addEventListener('mouseleave', () => { paused = false; });
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) auto = setInterval(() => { if (!paused && Date.now() >= (window.svcLockUntil || 0)) activate((idx() + 1) % panels.length); }, 4500);
})();

/* ---------- Promo banner: parallax, cursor glow, blueprint, ticker ---------- */
(function () {
  const sec = document.getElementById('promo');
  if (!sec) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const plan = sec.querySelector('.promo__plan');

  // Draw the blueprint once it's on screen
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((en) => {
      if (en[0].isIntersecting) { plan.classList.add('is-drawn'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(sec);
  } else plan.classList.add('is-drawn');

  if (!reduce) {
    // Background parallax
    let ticking = false;
    const update = () => {
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom > 0 && r.top < vh) {
        const prog = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
        sec.style.setProperty('--py', (prog * 40).toFixed(1) + 'px');
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();

    // Cursor-following glow + blueprint grid
    sec.addEventListener('mousemove', (e) => {
      const r = sec.getBoundingClientRect();
      sec.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      sec.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });

    // Magnetic CTA
    const cta = document.getElementById('promoCta');
    cta.addEventListener('mousemove', (e) => {
      const r = cta.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      cta.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
    });
    cta.addEventListener('mouseleave', () => { cta.style.translate = ''; });
  }

  // Ticker items open the matching Services panel
  const panels = document.querySelectorAll('#svcRow .svc');
  sec.querySelectorAll('.promo-ticker__item').forEach((a) => {
    a.addEventListener('click', () => {
      const p = panels[+a.dataset.svc];
      if (p) { window.svcLockUntil = Date.now() + 1500; p.click(); }
    });
  });
})();

/* ---------- Projects: sliding filters, animated re-layout, cursor, lightbox ---------- */
(function () {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrap = document.querySelector('.filters');
  const pill = wrap.querySelector('.filters__pill');
  const filters = [...wrap.querySelectorAll('.filter')];
  const items = [...gallery.querySelectorAll('.project')];

  // Counts on each filter
  filters.forEach((b) => {
    const f = b.dataset.filter;
    b.querySelector('.filter__count').textContent = f === 'all' ? items.length : items.filter((p) => p.dataset.cat === f).length;
  });

  const movePill = (btn) => {
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
  };
  movePill(filters[0]);
  window.addEventListener('load', () => movePill(wrap.querySelector('.filter.is-active')));
  if (document.fonts) document.fonts.ready.then(() => movePill(wrap.querySelector('.filter.is-active')));

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return;
      filters.forEach((b) => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      movePill(btn);

      const f = btn.dataset.filter;
      const before = new Map(items.filter((p) => !p.classList.contains('is-hidden')).map((p) => [p, p.getBoundingClientRect()]));
      items.forEach((p) => { p.classList.remove('is-entering'); p.classList.toggle('is-hidden', f !== 'all' && p.dataset.cat !== f); });
      gallery.classList.toggle('is-filtered', f !== 'all');
      if (reduce) return;

      items.filter((p) => !p.classList.contains('is-hidden')).forEach((p, n) => {
        const a = before.get(p);
        if (!a) { p.style.animationDelay = (n * 60) + 'ms'; void p.offsetWidth; p.classList.add('is-entering'); return; }
        const b = p.getBoundingClientRect();
        p.animate([
          { transform: `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`, transformOrigin: 'top left' },
          { transform: 'none', transformOrigin: 'top left' }
        ], { duration: 550, easing: 'cubic-bezier(.2,.7,.2,1)' });
      });
    });
  });

  // Custom cursor
  const cur = document.getElementById('projCursor');
  if (!reduce && cur) {
    gallery.addEventListener('mousemove', (e) => {
      cur.style.setProperty('--cx', e.clientX + 'px');
      cur.style.setProperty('--cy', e.clientY + 'px');
      cur.classList.add('is-on');
    });
    gallery.addEventListener('mouseleave', () => cur.classList.remove('is-on'));
    window.addEventListener('scroll', () => cur.classList.remove('is-on'), { passive: true });
  }

  // Lightbox (cycles through the projects currently shown)
  const lb = document.getElementById('lightbox');
  const lbMedia = lb.querySelector('.lightbox__media');
  const lbCat = lb.querySelector('.lightbox__cat');
  const lbTitle = lb.querySelector('.lightbox__title');
  const lbCur = lb.querySelector('.lightbox__cur');
  const lbTotal = lb.querySelector('.lightbox__total');
  let list = [], i = 0, lastFocus = null;

  const render = () => {
    const p = list[i];
    const img = p.querySelector('img');
    lbMedia.innerHTML = '';
    if (img) {
      const big = img.cloneNode();
      big.loading = 'eager';
      big.src = img.src.replace(/w=\d+/, 'w=1800');
      big.onerror = () => big.remove();
      lbMedia.appendChild(big);
    }
    lbCat.textContent = p.querySelector('figcaption span').textContent;
    lbTitle.textContent = p.querySelector('figcaption strong').textContent;
    lbCur.textContent = i + 1;
    lbTotal.textContent = list.length;
  };
  const open = (p) => {
    list = items.filter((x) => !x.classList.contains('is-hidden'));
    i = list.indexOf(p);
    lastFocus = document.activeElement;
    render();
    lb.hidden = false;
    document.body.classList.add('lb-open');
    if (cur) cur.classList.remove('is-on');
    lb.querySelector('.lightbox__close').focus();
  };
  const close = () => {
    lb.hidden = true;
    document.body.classList.remove('lb-open');
    if (lastFocus) lastFocus.focus();
  };
  const step = (d) => { i = (i + d + list.length) % list.length; render(); };

  items.forEach((p) => p.querySelector('.project__open').addEventListener('click', () => open(p)));
  lb.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', close));
  lb.querySelector('[data-prev]').addEventListener('click', () => step(-1));
  lb.querySelector('[data-next]').addEventListener('click', () => step(1));
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'Tab') { // keep focus inside the dialog
      const f = [...lb.querySelectorAll('button')];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

/* ---------- Process: interactive timeline ---------- */
(function () {
  const sec = document.getElementById('process');
  if (!sec) return;
  const tl = document.getElementById('timeline');
  const steps = [...tl.querySelectorAll('.step')];
  const fill = tl.querySelector('.timeline__fill');
  const track = tl.querySelector('.timeline__track');
  const bg = sec.querySelector('.process__bg');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = 5000;
  let cur = 0, timer = null, inView = false, paused = false;

  const nodeX = (i) => {
    const n = steps[i].querySelector('.step__node');
    return n.getBoundingClientRect().left + n.offsetWidth / 2 - tl.getBoundingClientRect().left - 28;
  };
  const set = (i) => {
    cur = i;
    steps.forEach((s, n) => {
      s.classList.toggle('is-active', n === i);
      s.classList.toggle('is-done', n < i);
      s.classList.remove('is-running');
      s.setAttribute('aria-current', n === i ? 'step' : 'false');
    });
    track.style.width = nodeX(steps.length - 1) + 'px';
    fill.style.width = Math.max(0, nodeX(i)) + 'px';
    bg.style.setProperty('--gx', (12 + i * 25) + '%');
    schedule();
  };
  const schedule = () => {
    clearTimeout(timer);
    if (reduce || !inView) return;
    const s = steps[cur];
    void s.offsetWidth;
    s.style.setProperty('--dur', DUR + 'ms');
    s.classList.add('is-running');
    timer = setTimeout(function tick() {
      if (paused) { timer = setTimeout(tick, 200); return; }
      set((cur + 1) % steps.length);
    }, DUR);
  };

  // Pause while the visitor is hovering or focused inside the timeline
  tl.addEventListener('mouseenter', () => { paused = true; sec.classList.add('is-paused'); });
  tl.addEventListener('mouseleave', () => { paused = false; sec.classList.remove('is-paused'); set(cur); });

  steps.forEach((s, i) => {
    s.addEventListener('click', () => set(i));
    s.addEventListener('mouseenter', () => { if (i !== cur) set(i); });
    s.addEventListener('focus', () => set(i));
    s.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); steps[(i + 1) % steps.length].focus(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); steps[(i - 1 + steps.length) % steps.length].focus(); }
    });
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((en) => {
      const was = inView;
      inView = en[0].isIntersecting;
      if (inView && !was) set(cur);
      if (!inView) clearTimeout(timer);
    }, { threshold: 0.35 }).observe(tl);
  } else { inView = true; set(0); }
  window.addEventListener('resize', () => { track.style.width = nodeX(steps.length - 1) + 'px'; fill.style.width = Math.max(0, nodeX(cur)) + 'px'; });
})();

/* ---------- Testimonials: spotlight carousel ---------- */
(function () {
  const stage = document.getElementById('tStage');
  if (!stage) return;
  const sec = document.getElementById('testimonials');
  const cards = [...stage.querySelectorAll('.review')];
  const dots = [...document.querySelectorAll('#tDots .tdot')];
  const n = cards.length;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = 6000;
  let cur = 0, timer = null, paused = false, inView = false;

  const go = (i) => {
    cur = (i + n) % n;
    cards.forEach((c, k) => {
      let pos = k - cur;
      if (pos > n / 2) pos -= n;
      if (pos < -n / 2) pos += n;
      c.dataset.pos = Math.max(-2, Math.min(2, pos));
      c.setAttribute('aria-hidden', pos !== 0);
    });
    dots.forEach((d, k) => { d.classList.toggle('is-active', k === cur); d.classList.remove('is-running'); d.setAttribute('aria-current', k === cur); });
    schedule();
  };
  const schedule = () => {
    clearTimeout(timer);
    if (reduce || !inView) return;
    const d = dots[cur]; void d.offsetWidth;
    d.style.setProperty('--dur', DUR + 'ms');
    d.classList.add('is-running');
    timer = setTimeout(function tick() {
      if (paused) { timer = setTimeout(tick, 200); return; }
      go(cur + 1);
    }, DUR);
  };

  document.getElementById('tPrev').addEventListener('click', () => go(cur - 1));
  document.getElementById('tNext').addEventListener('click', () => go(cur + 1));
  dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
  cards.forEach((c, k) => c.addEventListener('click', () => { if (k !== cur) go(k); }));
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
  });
  stage.addEventListener('mouseenter', () => { paused = true; sec.classList.add('is-paused'); });
  stage.addEventListener('mouseleave', () => { paused = false; sec.classList.remove('is-paused'); });

  // Drag / swipe with the mouse
  let startX = null;
  stage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  window.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX; startX = null;
    if (Math.abs(dx) > 60) go(cur + (dx < 0 ? 1 : -1));
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((en) => {
      const was = inView; inView = en[0].isIntersecting;
      if (inView && !was) schedule();
      if (!inView) clearTimeout(timer);
    }, { threshold: 0.4 }).observe(stage);
  } else inView = true;
  go(0);
})();

/* ---------- FAQs: animated accordion + live search ---------- */
(function () {
  const grid = document.getElementById('faqGrid');
  if (!grid) return;
  const faqs = [...grid.querySelectorAll('.faq')];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const anims = new Map();

  const setOpen = (d, open) => {
    const body = d.querySelector('.faq__body');
    if (anims.get(d)) anims.get(d).cancel();
    if (open) {
      d.open = true;
      d.classList.add('is-open');
      if (reduce) return;
      const h = body.scrollHeight;
      const a = body.animate([{ height: '0px' }, { height: h + 'px' }], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' });
      anims.set(d, a);
    } else {
      d.classList.remove('is-open');
      if (reduce) { d.open = false; return; }
      const a = body.animate([{ height: body.offsetHeight + 'px' }, { height: '0px' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' });
      anims.set(d, a);
      a.onfinish = () => { d.open = false; anims.delete(d); };
    }
  };

  faqs.forEach((d) => {
    if (d.open) d.classList.add('is-open');
    d.querySelector('summary').addEventListener('click', (e) => {
      e.preventDefault();
      const opening = !d.classList.contains('is-open');
      if (opening) faqs.forEach((o) => { if (o !== d && o.classList.contains('is-open')) setOpen(o, false); });
      setOpen(d, opening);
    });
  });

  // Live search with highlighted matches
  const input = document.getElementById('faqSearch');
  const count = document.getElementById('faqCount');
  const empty = document.getElementById('faqEmpty');
  const src = faqs.map((d) => ({ h: d.querySelector('h3'), p: d.querySelector('.faq__body p') }));
  src.forEach((x) => { x.hText = x.h.textContent; x.pText = x.p.textContent; });
  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const mark = (text, q) => {
    if (!q) return esc(text);
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.split(re).map((part, i) => i % 2 ? '<mark>' + esc(part) + '</mark>' : esc(part)).join('');
  };
  let firstHit = null;
  input.addEventListener('input', () => {
    const q = input.value.trim();
    const ql = q.toLowerCase();
    let shown = 0; firstHit = null;
    faqs.forEach((d, i) => {
      const x = src[i];
      const hit = !ql || x.hText.toLowerCase().includes(ql) || x.pText.toLowerCase().includes(ql);
      d.classList.toggle('is-hidden', !hit);
      x.h.innerHTML = mark(x.hText, q);
      x.p.innerHTML = mark(x.pText, q);
      if (hit) { shown++; if (!firstHit) firstHit = d; }
    });
    grid.classList.toggle('is-searching', !!ql);
    count.textContent = shown + (shown === 1 ? ' Question' : ' Questions');
    empty.hidden = shown !== 0;
  });
  // Enter opens the first matching question
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && firstHit) {
      e.preventDefault();
      if (!firstHit.classList.contains('is-open')) firstHit.querySelector('summary').click();
      firstHit.querySelector('summary').focus();
    }
  });
})();

/* ---------- 3-step quote forms: hero card + Final CTA (front-end only – connect to a backend/email service later) ---------- */
document.querySelectorAll('form[data-quote]').forEach(function (form) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const track = form.querySelector('.form__track');
  const viewport = form.querySelector('.form__viewport');
  const steps = [...form.querySelectorAll('.form__step')];
  const stepper = [...form.querySelectorAll('.stepper li')];
  const stepNo = form.querySelector('.form__stepno');
  const done = form.querySelector('.form__done');
  const doneMsg = form.querySelector('.form__done p');
  const submit = form.querySelector('.form__submit');
  const chosenBox = form.querySelector('[data-chosen]');
  const summary = form.querySelector('.form__summary');
  const msgArea = form.querySelector('textarea');
  const msgCount = form.querySelector('.field__count b');
  let cur = 0;

  const svc = () => form.querySelector('input[name="service"]:checked');
  const rules = {
    name: (v) => v ? '' : 'Please enter your name.',
    phone: (v) => v.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone number.',
    email: (v) => /^\S+@\S+\.\S+$/.test(v) ? '' : 'Please enter a valid email address.'
  };
  const check = (el, show) => {
    const f = el.closest('.field');
    const v = el.value.trim();
    const err = rules[el.name] ? rules[el.name](v) : '';
    f.classList.toggle('is-valid', !err && v !== '');
    if (show) {
      f.classList.toggle('has-error', !!err);
      f.querySelector('.field__err').textContent = err;
    } else if (!err) { f.classList.remove('has-error'); f.querySelector('.field__err').textContent = ''; }
    return !err;
  };

  const fit = () => { viewport.style.height = (steps[cur].offsetHeight + 28) + 'px'; }; // + viewport padding
  const go = (i, focus = true) => {
    cur = i;
    steps.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.disabled = false; s.toggleAttribute('inert', k !== i); });
    track.style.transform = `translateX(calc(${-i * 100}% - ${i * 40}px))`;
    stepper.forEach((li, k) => { li.classList.toggle('is-current', k === i); li.classList.toggle('is-done', k < i); });
    stepNo.textContent = `Step ${i + 1} of ${steps.length}`;
    if (i === 1) renderChosen();
    if (i === 2) renderSummary();
    fit();
    if (focus) {
      const target = i === 0 ? (svc() || steps[0].querySelector('input')) : steps[i].querySelector('input:not([type=radio]), textarea');
      setTimeout(() => target && target.focus({ preventScroll: true }), reduce ? 0 : 450);
    }
  };

  const svcLabel = () => svc() ? svc().value : '';
  const svcIcon = () => svc() ? svc().closest('.svc-pick').querySelector('.svc-pick__ico').outerHTML : '';
  function renderChosen() {
    chosenBox.innerHTML = svc() ? `${svcLabel().replace(/&/g, '&amp;')} <button type="button" data-goto="0">Change</button>` : '';
  }
  function renderSummary() {
    const e = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const n = form.elements.name.value.trim(), ph = form.elements.phone.value.trim(), em = form.elements.email.value.trim();
    summary.innerHTML = `${svcIcon()}<strong>${e(svcLabel())}</strong><small>${e(n)} · ${e(ph)} · ${e(em)}</small><button type="button" data-goto="1">Edit</button>`;
  }
  form.addEventListener('click', (e) => {
    const g = e.target.closest('[data-goto]');
    if (g) go(+g.dataset.goto);
  });

  const validateStep = (i) => {
    const msg = steps[i].querySelector('[data-msg]');
    let ok = true;
    if (i === 0) {
      ok = !!svc();
      steps[0].classList.toggle('has-error', !ok);
      msg.textContent = ok ? '' : 'Please choose a service to continue.';
    }
    if (i === 1) {
      let first = null;
      ['name', 'phone', 'email'].forEach((k) => { const el = form.elements[k]; if (!check(el, true)) { ok = false; first = first || el; } });
      msg.textContent = '';
      if (first) first.focus();
    }
    fit();
    return ok;
  };

  form.querySelectorAll('[data-next]').forEach((b) => b.addEventListener('click', () => { if (validateStep(cur)) go(cur + 1); }));
  form.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', () => go(cur - 1)));

  // Picking a service moves straight on to the details step
  form.addEventListener('change', (e) => {
    if (e.target.name !== 'service') return;
    steps[0].classList.remove('has-error');
    steps[0].querySelector('[data-msg]').textContent = '';
    if (cur === 0) setTimeout(() => go(1, e.isTrusted), reduce ? 0 : 320);
    else renderChosen();
  });

  ['name', 'phone', 'email', 'postcode'].forEach((k) => {
    const el = form.elements[k];
    el.addEventListener('input', () => { check(el, false); fit(); });
    el.addEventListener('blur', () => { if (el.value.trim()) { check(el, true); fit(); } });
  });
  msgArea.addEventListener('input', () => { msgCount.textContent = msgArea.value.length; });

  // Enter moves forward instead of submitting early
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && cur < steps.length - 1) {
      e.preventDefault();
      if (validateStep(cur)) go(cur + 1);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cur !== steps.length - 1) { if (validateStep(cur)) go(cur + 1); return; }
    if (!svc()) { go(0); validateStep(0); return; }
    if (!['name', 'phone', 'email'].every((k) => check(form.elements[k], true))) { go(1); return; }
    submit.classList.add('is-loading');
    setTimeout(() => {
      submit.classList.remove('is-loading');
      viewport.hidden = true;
      stepper.forEach((li) => { li.classList.remove('is-current'); li.classList.add('is-done'); });
      stepNo.textContent = '';
      form.classList.add('is-done');
      doneMsg.textContent = 'Thank you – your enquiry is ready to send. (Form submission to be connected.)';
      done.hidden = false;
      done.focus();
    }, reduce ? 0 : 900);
  });


  window.addEventListener('resize', fit);
  if (document.fonts) document.fonts.ready.then(fit);
  go(0, false);
});

/* "Get a Free Quote" / "Contact Us" buttons in the Final CTA: bring that form into focus */
(function () {
  const form = document.getElementById('quoteForm');
  if (!form) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.js-to-form').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    form.classList.remove('is-highlight'); void form.offsetWidth; form.classList.add('is-highlight');
  }));
})();

/* ---------- Footer: wordmark fill, service links, back-to-top ---------- */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const brand = document.querySelector('.footer__brand span');
  const toTop = document.getElementById('toTop');
  const ring = toTop && toTop.querySelector('.to-top__bar');

  let ticking = false;
  const update = () => {
    ticking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    if (toTop) {
      toTop.classList.toggle('is-on', window.scrollY > 600);
      ring.style.setProperty('--p', (100 - p * 100).toFixed(1));
    }
    // Wordmark fills with orange as it scrolls up into view
    if (brand) {
      const start = brand.getBoundingClientRect().top + window.scrollY - window.innerHeight - 450; // starts as the footer comes into view
      const span = Math.max(1, max - start);
      const t = reduce ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / span));
      brand.style.setProperty('--fill', (t * 100).toFixed(1) + '%');
    }
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();

  // Footer service links open the matching Services panel
  const panels = document.querySelectorAll('#svcRow .svc');
  document.querySelectorAll('.footer .flink[data-svc]').forEach((a) => a.addEventListener('click', () => {
    const p = panels[+a.dataset.svc];
    if (p) { window.svcLockUntil = Date.now() + 1500; p.click(); }
  }));
})();

/* ---------- Why Choose Us: cursor spotlight on cards ---------- */
(function () {
  const wrap = document.getElementById('whyCards');
  if (!wrap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  wrap.querySelectorAll('.wcard').forEach((c) => c.addEventListener('mousemove', (e) => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));
})();

/* ---------- Hero: fit the first screen (height = viewport minus what sits above the hero) ---------- */
(function () {
  const hero = document.getElementById('home');
  if (!hero) return;
  const set = () => document.documentElement.style.setProperty('--hero-top', (hero.getBoundingClientRect().top + window.scrollY) + 'px');
  set();
  window.addEventListener('resize', set);
  window.addEventListener('load', set);
  if (document.fonts) document.fonts.ready.then(set);
})();

/* ---------- Testimonials: play the video in a review card ---------- */
(function () {
  document.querySelectorAll('.review__media').forEach((m) => {
    const v = m.querySelector('video');
    const btn = m.querySelector('.review__play');
    if (v.getAttribute('src')) m.classList.add('has-video');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!v.getAttribute('src')) return; // no video added yet
      document.querySelectorAll('.review__video').forEach((o) => { if (o !== v) o.pause(); });
      v.controls = true;
      v.play();
    });
    v.addEventListener('play', () => m.classList.add('is-playing'));
    v.addEventListener('pause', () => m.classList.remove('is-playing'));
    v.addEventListener('ended', () => m.classList.remove('is-playing'));
  });
})();
