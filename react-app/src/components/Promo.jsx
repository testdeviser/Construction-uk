import { useRef } from 'react';
import { promoImage, services } from '../data/site';
import { ArrowRight } from './Icons';
import { Img, Reveal, cx, useServices } from './common';
import { prefersReducedMotion, useInView, useScrollFrame } from '../hooks';

export default function Promo() {
  const { openService } = useServices();
  const reduce = prefersReducedMotion();
  const ctaRef = useRef(null);
  // Draw the blueprint once it's on screen
  const [secRef, drawn] = useInView({ threshold: 0.35 }, true);

  // Background parallax
  useScrollFrame(() => {
    const sec = secRef.current;
    if (reduce || !sec) return;
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom > 0 && r.top < vh) {
      const prog = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
      sec.style.setProperty('--py', (prog * 40).toFixed(1) + 'px');
    }
  });

  // Cursor-following glow + blueprint grid
  const onMouseMove = (e) => {
    if (reduce) return;
    const sec = e.currentTarget;
    const r = sec.getBoundingClientRect();
    sec.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
    sec.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
  };

  // Magnetic CTA
  const onCtaMove = (e) => {
    if (reduce) return;
    const cta = ctaRef.current;
    const r = cta.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    cta.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
  };

  const tickerSet = (hidden) => (
    <div className="promo-ticker__set" aria-hidden={hidden || undefined}>
      {services.map((s, i) => (
        <a key={s.title} tabIndex={hidden ? -1 : undefined} href="#services" className="promo-ticker__item" onClick={() => openService(i)}>{s.title}</a>
      ))}
    </div>
  );

  return (
    <section className="promo" id="promo" ref={secRef} onMouseMove={onMouseMove}>
      <div className="promo__bg" aria-hidden="true">
        <div className="media promo__media" data-label="Full-width promotional image">
          <Img src={promoImage} alt="" />
        </div>
        <div className="promo__overlay"></div>
        <div className="promo__grid"></div>
        <div className="promo__glow"></div>
      </div>

      <div className="container promo__inner">
        <div className="promo__content">
          <h2 className="h2 h2--light promo__title">
            <Reveal as="span" className="promo__line" d={0}>Big Plans for Your Home?</Reveal>
            <Reveal as="span" className="promo__line promo__line--accent" d={1}>Let's Build Them <em>Together.</em></Reveal>
          </h2>
          <Reveal as="p" d={2}>Whether it's a complete renovation or a small property improvement, we're here to help you take the next step.</Reveal>
          <Reveal className="promo__actions" d={3}>
            <a
              href="#contact" className="btn btn--primary promo__cta" id="promoCta" ref={ctaRef}
              onMouseMove={onCtaMove}
              onMouseLeave={() => { ctaRef.current.style.translate = ''; }}
            >
              <span>Discuss Your Project</span>
              <ArrowRight />
            </a>
          </Reveal>
        </div>

        {/* Blueprint drawing (decorative): draws itself when the banner scrolls into view */}
        <div className={cx('promo__plan', drawn && 'is-drawn')} aria-hidden="true">
          <svg viewBox="0 0 480 380" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g className="bp bp--soft">
              <path pathLength="1" style={{ '--i': 0 }} d="M20 330H460" />
              <path pathLength="1" style={{ '--i': 1 }} d="M40 352H440M40 346v12M440 346v12" />
              <path pathLength="1" style={{ '--i': 1 }} d="M466 150v180M460 150h12M460 330h12" />
            </g>
            <g className="bp">
              <path pathLength="1" style={{ '--i': 2 }} d="M80 330V170H400V330" />
              <path pathLength="1" style={{ '--i': 4 }} d="M200 330V250h80v80" />
              <path pathLength="1" style={{ '--i': 5 }} d="M112 200h56v48h-56zM140 200v48M112 224h56" />
              <path pathLength="1" style={{ '--i': 5 }} d="M312 200h56v48h-56zM340 200v48M312 224h56" />
              <path pathLength="1" style={{ '--i': 6 }} d="M190 110h100v30H190z" />
              <path pathLength="1" style={{ '--i': 6 }} d="M224 110v30M256 110v30" />
            </g>
            <g className="bp bp--accent">
              <path pathLength="1" style={{ '--i': 3 }} d="M56 178L240 52L424 178" />
              <path pathLength="1" style={{ '--i': 4 }} d="M318 105V64h34v64" />
            </g>
            <g className="bp-marks">
              <circle cx="240" cy="52" r="5" /><circle cx="56" cy="178" r="5" /><circle cx="424" cy="178" r="5" />
            </g>
          </svg>
        </div>
      </div>

      <div className="promo-ticker" aria-label="Our services">
        <div className="promo-ticker__track">
          {tickerSet(false)}
          {tickerSet(true)}
        </div>
      </div>
    </section>
  );
}
