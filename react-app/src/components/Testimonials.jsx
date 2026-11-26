import { useCallback, useEffect, useRef, useState } from 'react';
import { testimonials } from '../data/site';
import { Reveal, cx } from './common';
import { Star } from './Icons';
import { mergeRefs, prefersReducedMotion, useInView } from '../hooks';

const DUR = 6000;

export default function Testimonials() {
  const reduce = prefersReducedMotion();
  const n = testimonials.length;
  const [cur, setCur] = useState(0);
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(-1);
  const pausedRef = useRef(false);
  const videoRefs = useRef([]);
  const startX = useRef(null);
  const [stageRef, inView] = useInView({ threshold: 0.4 });

  const go = useCallback((i) => { setCur(((i % n) + n) % n); setRun((r) => r + 1); }, [n]);

  // Auto-advance while on screen (waits while hovered)
  useEffect(() => {
    if (reduce || !inView) return;
    let t;
    const tick = () => {
      if (pausedRef.current) { t = setTimeout(tick, 200); return; }
      go(cur + 1);
    };
    t = setTimeout(tick, DUR);
    return () => clearTimeout(t);
  }, [cur, run, inView, reduce, go]);

  // Drag / swipe with the mouse
  useEffect(() => {
    const up = (e) => {
      if (startX.current === null) return;
      const dx = e.clientX - startX.current;
      startX.current = null;
      if (Math.abs(dx) > 60) go(cur + (dx < 0 ? 1 : -1));
    };
    window.addEventListener('pointerup', up);
    return () => window.removeEventListener('pointerup', up);
  }, [cur, go]);

  const play = (e, k) => {
    e.stopPropagation();
    const v = videoRefs.current[k];
    if (!v || !v.getAttribute('src')) return; // no video added yet
    videoRefs.current.forEach((o) => { if (o && o !== v) o.pause(); });
    v.controls = true;
    v.play();
  };

  const position = (k) => {
    let pos = k - cur;
    if (pos > n / 2) pos -= n;
    if (pos < -n / 2) pos += n;
    return pos;
  };

  const running = !reduce && inView;

  return (
    <section className={cx('section testimonials', paused && 'is-paused')} id="testimonials">
      <span className="testimonials__mark" aria-hidden="true">&ldquo;</span>
      <div className="container">
        <div className="section-head section-head--center testimonials__head">
          <Reveal as="p" className="eyebrow" d={0}>Customer Experiences</Reveal>
          <Reveal as="h2" className="h2" d={1}>What Our <em className="hl">Customers</em> Say</Reveal>
          <Reveal as="p" className="section-head__text" d={2}>Discover what homeowners have to say about their building, renovation and property improvement experiences.</Reveal>
        </div>

        <Reveal
          className="tstage" id="tStage" tabIndex={0} aria-roledescription="carousel" aria-label="Customer testimonials" d={3}
          ref={mergeRefs(stageRef)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
          }}
          onMouseEnter={() => { pausedRef.current = true; setPaused(true); }}
          onMouseLeave={() => { pausedRef.current = false; setPaused(false); }}
          onPointerDown={(e) => { startX.current = e.clientX; }}
        >
          {testimonials.map((t, k) => {
            const pos = position(k);
            return (
              <article
                key={t.name}
                className={cx('review', t.sample && 'review--sample')}
                data-i={k}
                data-pos={Math.max(-2, Math.min(2, pos))}
                aria-hidden={pos !== 0}
                aria-roledescription="slide"
                aria-label={`${k + 1} of ${n}`}
                onClick={() => { if (k !== cur) go(k); }}
              >
                {t.sample && <span className="review__sample">Sample Review</span>}
                <div className="review__main">
                  <div className={cx('review__media', t.video && 'has-video', playing === k && 'is-playing')}>
                    <video
                      className="review__video" preload="none" playsInline
                      src={t.video || undefined} poster={t.poster}
                      ref={(el) => (videoRefs.current[k] = el)}
                      onPlay={() => setPlaying(k)}
                      onPause={() => setPlaying((p) => (p === k ? -1 : p))}
                      onEnded={() => setPlaying((p) => (p === k ? -1 : p))}
                    ></video>
                    <button type="button" className="review__play" aria-label={`Play video review from ${t.name}`} onClick={(e) => play(e, k)}>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" /></svg>
                    </button>
                  </div>
                  <div className="review__body">
                    <div className="review__top">
                      <span className="review__quote" aria-hidden="true">&ldquo;</span>
                      <span className="review__stars" role="img" aria-label="5 out of 5">
                        {[0, 1, 2, 3, 4].map((s) => <Star key={s} />)}
                      </span>
                    </div>
                    <p className="review__text">{t.text}</p>
                  </div>
                </div>
                <div className="review__author">
                  <span className="avatar">{t.initials}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span className="review__loc">
                      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="10" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                      {t.location}
                    </span>
                  </div>
                  <span className="review__tag">{t.service}</span>
                </div>
              </article>
            );
          })}
        </Reveal>

        <Reveal className="tcontrols" d={4}>
          <button className="round-btn" id="tPrev" aria-label="Previous testimonial" onClick={() => go(cur - 1)}>
            <svg viewBox="0 0 20 20"><path d="M16 10H5m4.5 4.5L5 10l4.5-4.5" /></svg>
          </button>
          <div className="tdots" id="tDots">
            {testimonials.map((t, k) => (
              <button
                key={t.name} type="button"
                className={cx('tdot', k === cur && 'is-active', running && k === cur && 'is-running')}
                style={{ '--dur': DUR + 'ms' }}
                aria-label={`Show review ${k + 1}`}
                aria-current={k === cur}
                onClick={() => go(k)}
              >
                <i key={k === cur ? run : 'idle'}></i>
              </button>
            ))}
          </div>
          <button className="round-btn" id="tNext" aria-label="Next testimonial" onClick={() => go(cur + 1)}>
            <svg viewBox="0 0 20 20"><path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" /></svg>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
