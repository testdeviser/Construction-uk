import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { heroSlides } from '../data/site';
import { ArrowRight } from './Icons';
import { Img, cx } from './common';
import QuoteForm from './QuoteForm';

const DURATION = 6000;

export default function Hero() {
  const heroRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [cycle, setCycle] = useState(0); // bumps on every change so the progress bar restarts

  const go = (i) => {
    setCurrent((i + heroSlides.length) % heroSlides.length);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--slide-time', DURATION / 1000 + 's');
  }, []);

  // Auto-advance
  useEffect(() => {
    const t = setTimeout(() => go(current + 1), DURATION);
    return () => clearTimeout(t);
  }, [current, cycle]);

  // Fit the first screen: hero height = viewport minus what sits above it
  useLayoutEffect(() => {
    const set = () => {
      const top = heroRef.current.getBoundingClientRect().top + window.scrollY;
      document.documentElement.style.setProperty('--hero-top', top + 'px');
    };
    set();
    window.addEventListener('resize', set);
    window.addEventListener('load', set);
    document.fonts?.ready.then(set);
    return () => { window.removeEventListener('resize', set); window.removeEventListener('load', set); };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__slides" aria-hidden="false">
        {heroSlides.map((s, i) => (
          <div key={s.image} className={cx('hero__slide', i === current && 'is-active')}>
            <Img src={s.image} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      <div className="hero__overlay"></div>
      <div className="hero__grain"></div>

      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow eyebrow--light reveal" style={{ '--d': 0 }}>Building. Renovating. Transforming.</p>
          <h1 className="hero__title">
            <span className="reveal-line"><span style={{ '--d': 1 }}>Transforming Houses</span></span>
            <span className="reveal-line"><span style={{ '--d': 2 }}>Into Exceptional<br className="hero__br" /> Homes</span></span>
          </h1>
          <p className="hero__text reveal" style={{ '--d': 3 }}>From complete house rebuilds and renovations to roofing, kitchens, bathrooms and everyday property repairs, we provide building and home improvement solutions tailored to your property.</p>
          <div className="btn-group reveal" style={{ '--d': 4 }}>
            <a href="#contact" className="btn btn--primary">Explore Our Services <ArrowRight /></a>
          </div>
        </div>

        <QuoteForm
          idPrefix="hf"
          id="heroForm"
          className="form form--hero reveal"
          style={{ '--d': 3 }}
          aria-label="Request a free quote"
          title="Request a Free Quote"
        />
      </div>

      <div className="hero__bottom">
        <div className="container hero__bottom-inner">
          <div className="hero__dots">
            {heroSlides.map((s, n) => (
              <button
                key={s.label}
                className={cx('hero__dot', n < current && 'is-done', n === current && 'is-active')}
                aria-label={`Show slide: ${s.label}`}
                onClick={() => go(n)}
              >
                <span className="hero__bar"><i key={n === current ? cycle : 'idle'}></i></span>
                <span className="hero__dot-label">{s.label}</span>
              </button>
            ))}
          </div>
          <a href="#about" className="hero__scroll" aria-label="Scroll to next section">
            <span>Scroll</span>
            <span className="hero__mouse"><i></i></span>
          </a>
        </div>
      </div>
    </section>
  );
}
