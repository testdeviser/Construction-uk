import { useEffect, useRef } from 'react';
import { services } from '../data/site';
import { ArrowRight, Ico } from './Icons';
import { Img, Reveal, cx, useServices } from './common';
import { prefersReducedMotion } from '../hooks';

export default function Services() {
  const { active, setActive, lockUntil } = useServices();
  const paused = useRef(false);
  const panelRefs = useRef([]);
  const n = services.length;

  // Gentle auto-advance until the visitor interacts
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // On small screens the panels stack vertically; auto-advancing would make the page jump
    const stacked = window.matchMedia('(max-width: 900px)');
    const id = setInterval(() => {
      if (!paused.current && !stacked.matches && Date.now() >= lockUntil.current) setActive((i) => (i + 1) % n);
    }, 4500);
    return () => clearInterval(id);
  }, [n, setActive, lockUntil]);

  const onKeyDown = (e, i) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); panelRefs.current[(i + 1) % n].focus(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); panelRefs.current[(i - 1 + n) % n].focus(); }
  };

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal as="p" className="eyebrow">What We Do</Reveal>
            <Reveal as="h2" className="h2" d={1}>Complete Solutions for Every Part of Your <em className="hl">Home</em></Reveal>
          </div>
          <Reveal className="services__intro" d={2}>
            <p className="section-head__text">From the foundations to the roof, we offer a comprehensive range of building, renovation and property improvement services.</p>
            <div className="svc-nav" aria-hidden="true">
              <span className="svc-nav__count"><b>{active + 1}</b> / {n}</span>
              <span className="svc-nav__bar"><i style={{ width: ((active + 1) / n) * 100 + '%' }}></i></span>
            </div>
          </Reveal>
        </div>

        <div
          className="svc-row"
          id="svcRow"
          onMouseEnter={() => (paused.current = true)}
          onFocus={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {services.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              ref={(el) => (panelRefs.current[i] = el)}
              className={cx('svc', i === active && 'is-active')}
              tabIndex={0}
              d={i}
              aria-expanded={i === active}
              onMouseEnter={() => { if (Date.now() >= lockUntil.current) setActive(i); }}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <div className="media svc__media" data-label={`${s.title} image`}><Img src={s.image} alt={s.alt} /></div>
              <div className="svc__shade"></div>
              <span className="svc__icon"><Ico d={s.icon} /></span>
              <h3 className="svc__vtitle" aria-hidden="true">{s.title}</h3>
              <div className="svc__body">
                <h3 className="svc__title">{s.title}</h3>
                <p>{s.text}</p>
                <ul className="svc__tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <a href="#" className="svc__link">Learn More <span><ArrowRight /></span></a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="services__foot">
          <p><strong>Not sure which service you need?</strong> Tell us about your project and we'll point you in the right direction.</p>
          <div className="btn-group">
            <a href="#contact" className="btn btn--primary">Discuss Your Project <ArrowRight /></a>
            <a href="#" className="btn btn--dark">View All Services <ArrowRight /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
