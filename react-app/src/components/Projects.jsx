import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { projectFilters, projects } from '../data/site';
import { ArrowLeft, ArrowRight, ExpandIcon } from './Icons';
import { Img, Reveal, cx } from './common';
import { prefersReducedMotion } from '../hooks';

const matches = (f) => (p) => f === 'all' || p.cat === f;

export default function Projects() {
  const reduce = prefersReducedMotion();
  const [filter, setFilter] = useState('all');
  const [entering, setEntering] = useState({}); // id -> animation delay (ms)
  const [pill, setPill] = useState({});
  const [cursorOn, setCursorOn] = useState(false);
  const [lb, setLb] = useState(null);           // { list, i } while the lightbox is open

  const filterRefs = useRef({});
  const itemRefs = useRef({});
  const before = useRef(null);
  const cursorRef = useRef(null);
  const closeRef = useRef(null);
  const lbRef = useRef(null);
  const lastFocus = useRef(null);

  const visible = projects.filter(matches(filter));

  /* ---------- Sliding filter pill ---------- */
  const movePill = useCallback(() => {
    const btn = filterRefs.current[filter];
    if (btn) setPill({ width: btn.offsetWidth + 'px', transform: `translateX(${btn.offsetLeft}px)` });
  }, [filter]);
  useLayoutEffect(movePill, [movePill]);
  useEffect(() => {
    window.addEventListener('load', movePill);
    window.addEventListener('resize', movePill);
    document.fonts?.ready.then(movePill);
    return () => { window.removeEventListener('load', movePill); window.removeEventListener('resize', movePill); };
  }, [movePill]);

  /* ---------- Filtering with animated re-layout (FLIP) ---------- */
  const choose = (f) => {
    if (f === filter) return;
    const rects = new Map(visible.map((p) => [p.id, itemRefs.current[p.id].getBoundingClientRect()]));
    before.current = rects;
    const ent = {};
    if (!reduce) projects.filter(matches(f)).forEach((p, n) => { if (!rects.has(p.id)) ent[p.id] = n * 60; });
    setEntering(ent);
    setFilter(f);
  };

  useLayoutEffect(() => {
    const rects = before.current;
    before.current = null;
    if (!rects || reduce) return;
    visible.forEach((p) => {
      const a = rects.get(p.id);
      if (!a) return;
      const el = itemRefs.current[p.id];
      const b = el.getBoundingClientRect();
      el.animate([
        { transform: `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`, transformOrigin: 'top left' },
        { transform: 'none', transformOrigin: 'top left' },
      ], { duration: 550, easing: 'cubic-bezier(.2,.7,.2,1)' });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  /* ---------- Custom cursor over the gallery ---------- */
  const onGalleryMove = (e) => {
    if (reduce) return;
    cursorRef.current.style.setProperty('--cx', e.clientX + 'px');
    cursorRef.current.style.setProperty('--cy', e.clientY + 'px');
    setCursorOn(true);
  };
  useEffect(() => {
    const off = () => setCursorOn(false);
    window.addEventListener('scroll', off, { passive: true });
    return () => window.removeEventListener('scroll', off);
  }, []);

  /* ---------- Lightbox (cycles through the projects currently shown) ---------- */
  const open = (p) => {
    lastFocus.current = document.activeElement;
    setLb({ list: visible, i: visible.indexOf(p) });
    setCursorOn(false);
  };
  const close = useCallback(() => {
    setLb(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d) => setLb((s) => ({ ...s, i: (s.i + d + s.list.length) % s.list.length })), []);
  const isOpen = !!lb;

  useEffect(() => {
    document.body.classList.toggle('lb-open', isOpen);
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'Tab') { // keep focus inside the dialog
        const f = [...lbRef.current.querySelectorAll('button')];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close, step]);

  const shown = lb && lb.list[lb.i];

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-head section-head--center projects__head">
          <Reveal as="p" className="eyebrow" d={0}>Explore Our Work</Reveal>
          <Reveal as="h2" className="h2" d={1}>Turning Ideas Into Beautiful <em className="hl">Spaces</em></Reveal>
          <Reveal as="p" className="section-head__text" d={2}>Explore how building, renovation and property improvements can transform the way a home looks, feels and functions.</Reveal>
        </div>

        <Reveal className="filters" role="tablist" aria-label="Project categories" d={3}>
          <span className="filters__pill" aria-hidden="true" style={pill}></span>
          {projectFilters.map((f) => (
            <button
              key={f.key}
              ref={(el) => (filterRefs.current[f.key] = el)}
              className={cx('filter', filter === f.key && 'is-active')}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => choose(f.key)}
            >
              {f.label} <b className="filter__count">{projects.filter(matches(f.key)).length}</b>
            </button>
          ))}
        </Reveal>

        <div className={cx('gallery', filter !== 'all' && 'is-filtered')} id="gallery" onMouseMove={onGalleryMove} onMouseLeave={() => setCursorOn(false)}>
          {projects.map((p, i) => {
            const hidden = !matches(filter)(p);
            const enteringDelay = entering[p.id];
            return (
              <Reveal
                as="figure"
                key={p.id}
                ref={(el) => (itemRefs.current[p.id] = el)}
                className={cx('project', hidden && 'is-hidden', !hidden && enteringDelay != null && 'is-entering')}
                data-cat={p.cat}
                d={i % 4}
                style={enteringDelay != null ? { animationDelay: enteringDelay + 'ms' } : undefined}
              >
                <div className="media" data-label="Project photo"><Img src={p.image} alt={p.alt} /></div>
                <span className="project__num">{String(p.id).padStart(2, '0')}</span>
                <figcaption>
                  <span>{p.catLabel}</span><strong>{p.title}</strong>
                  <i className="project__go"><ExpandIcon /></i>
                </figcaption>
                <button className="project__open" type="button" aria-label={`Open project ${p.id}: ${p.title}`} onClick={() => open(p)}></button>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="center projects__more">
          <a href="#" className="btn btn--dark">View All Projects <ArrowRight /></a>
        </Reveal>
      </div>

      {/* Custom cursor over the gallery (decorative) */}
      <div className={cx('proj-cursor', cursorOn && 'is-on')} id="projCursor" ref={cursorRef} aria-hidden="true"><ExpandIcon /></div>

      {/* Lightbox */}
      <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Project viewer" hidden={!isOpen} ref={lbRef}>
        <div className="lightbox__backdrop" onClick={close}></div>
        <div className="lightbox__frame">
          <div className="lightbox__media media" data-label="Project photo">
            {shown && <Img key={shown.id} src={shown.image.replace(/w=\d+/, 'w=1800')} alt={shown.alt} loading="eager" />}
          </div>
          <div className="lightbox__bar">
            <div className="lightbox__info"><span className="lightbox__cat">{shown?.catLabel}</span><strong className="lightbox__title">{shown?.title}</strong></div>
            <div className="lightbox__count"><b className="lightbox__cur">{lb ? lb.i + 1 : 1}</b> / <span className="lightbox__total">{lb ? lb.list.length : projects.length}</span></div>
            <div className="lightbox__nav">
              <button type="button" className="lightbox__btn" aria-label="Previous project" onClick={() => step(-1)}><ArrowLeft /></button>
              <button type="button" className="lightbox__btn" aria-label="Next project" onClick={() => step(1)}><ArrowRight /></button>
            </div>
          </div>
          <button type="button" className="lightbox__close" aria-label="Close" ref={closeRef} onClick={close}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
