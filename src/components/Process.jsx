import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { processSteps } from '../data/site';
import { ArrowRight } from './Icons';
import { Reveal, cx } from './common';
import { prefersReducedMotion, useInView } from '../hooks';

const DUR = 5000;

export default function Process() {
  const reduce = prefersReducedMotion();
  const n = processSteps.length;
  const [cur, setCur] = useState(0);
  const [run, setRun] = useState(0);        // bumps on every change to restart the step's progress bar
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const [tlRef, inView] = useInView({ threshold: 0.35 });

  const stepRefs = useRef([]);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const bgRef = useRef(null);

  const set = useCallback((i) => { setCur(i); setRun((r) => r + 1); }, []);

  // Restart the current step when the timeline comes into view
  useEffect(() => { if (inView) set(cur); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [inView]);

  // Auto-advance (waits while hovered)
  useEffect(() => {
    if (reduce || !inView) return;
    let t;
    const tick = () => {
      if (pausedRef.current) { t = setTimeout(tick, 200); return; }
      set((cur + 1) % n);
    };
    t = setTimeout(tick, DUR);
    return () => clearTimeout(t);
  }, [cur, run, inView, reduce, n, set]);

  // Size the track + progress fill to the node positions
  // (measured in the timeline's content box, so it also works while the row is scrolled sideways on tablet/phone)
  const layout = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    const tlLeft = tl.getBoundingClientRect().left;
    const nodeX = (i) => {
      const node = stepRefs.current[i].querySelector('.step__node');
      const r = node.getBoundingClientRect();
      return r.left + r.width / 2 - tlLeft + tl.scrollLeft;
    };
    const start = nodeX(0);
    trackRef.current.style.left = start + 'px';
    trackRef.current.style.width = nodeX(n - 1) - start + 'px';
    fillRef.current.style.width = Math.max(0, nodeX(cur) - start) + 'px';
    bgRef.current.style.setProperty('--gx', 12 + cur * 25 + '%');
  }, [cur, n, tlRef]);

  // Tablet/phone: the steps sit in a sideways-scrolling row – slide the active card into view
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || tl.scrollWidth <= tl.clientWidth + 1) return; // desktop: everything already visible
    const step = stepRefs.current[cur];
    const fullyVisible = step.offsetLeft >= tl.scrollLeft - 1 && step.offsetLeft + step.offsetWidth <= tl.scrollLeft + tl.clientWidth + 1;
    if (!fullyVisible) tl.scrollTo({ left: step.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  }, [cur, run, reduce, tlRef]);

  // …and when the visitor swipes the row, make the card they stopped on the active step
  const scrollTimer = useRef(0);
  const onTimelineScroll = () => {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const tl = tlRef.current;
      if (!tl) return;
      const active = stepRefs.current[cur];
      const activeVisible = active.offsetLeft >= tl.scrollLeft - 1 && active.offsetLeft + active.offsetWidth <= tl.scrollLeft + tl.clientWidth + 1;
      if (activeVisible) return; // includes the end of the row, where two cards share the view
      let best = 0;
      stepRefs.current.forEach((s, i) => {
        if (Math.abs(s.offsetLeft - tl.scrollLeft) < Math.abs(stepRefs.current[best].offsetLeft - tl.scrollLeft)) best = i;
      });
      set(best);
    }, 140);
  };
  useEffect(() => () => clearTimeout(scrollTimer.current), []);
  useLayoutEffect(layout, [layout, run]);
  useEffect(() => {
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }, [layout]);

  const running = !reduce && inView;

  const onKeyDown = (e, i) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); stepRefs.current[(i + 1) % n].focus(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); stepRefs.current[(i - 1 + n) % n].focus(); }
  };

  return (
    <section className={cx('section process', paused && 'is-paused')} id="process">
      <div className="process__bg" aria-hidden="true" ref={bgRef}></div>
      <div className="container process__inner">
        <div className="section-head section-head--split process__head">
          <Reveal d={0}>
            <p className="eyebrow eyebrow--light">How We Work</p>
            <h2 className="h2 h2--light">From Your First Idea to the Finishing <em className="hl">Touches</em></h2>
          </Reveal>
          <Reveal as="p" className="section-head__text" d={1}>We aim to make your home improvement journey straightforward, with a clear approach from the initial discussion to project completion.</Reveal>
        </div>

        <ol
          className="timeline" id="timeline" ref={tlRef}
          onScroll={onTimelineScroll}
          onMouseEnter={() => { pausedRef.current = true; setPaused(true); }}
          onMouseLeave={() => { pausedRef.current = false; setPaused(false); set(cur); }}
        >
          <li className="timeline__track" aria-hidden="true" ref={trackRef}><i className="timeline__fill" ref={fillRef}></i></li>
          {processSteps.map((s, i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <Reveal
                as="li"
                key={s.title}
                ref={(el) => (stepRefs.current[i] = el)}
                className={cx('step', i === cur && 'is-active', i < cur && 'is-done', running && i === cur && 'is-running')}
                tabIndex={0}
                d={i + 2}
                style={{ '--dur': DUR + 'ms' }}
                aria-current={i === cur ? 'step' : 'false'}
                onClick={() => set(i)}
                onMouseEnter={() => { if (i !== cur) set(i); }}
                onFocus={() => set(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="step__node" aria-hidden="true"><b>{num}</b></span>
                <div className="step__card">
                  <span className="step__ghost" aria-hidden="true">{num}</span>
                  <span className="step__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{s.svg}</svg>
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="step__bar" aria-hidden="true"><i key={i === cur ? run : 'idle'}></i></span>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="center process__more">
          <a href="#contact" className="btn btn--primary process__cta">Start Your Project <ArrowRight /></a>
        </Reveal>
      </div>
    </section>
  );
}
