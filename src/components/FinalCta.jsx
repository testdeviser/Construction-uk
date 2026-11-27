import { useEffect, useRef, useState } from 'react';
import { company } from '../data/site';
import { ArrowRight, MailIcon, PhoneIcon, PinIcon } from './Icons';
import { Reveal, cx } from './common';
import { mergeRefs, prefersReducedMotion, useInView } from '../hooks';
import QuoteForm from './QuoteForm';

export default function FinalCta() {
  const formRef = useRef(null);
  const [highlight, setHighlight] = useState(false);
  const [revealRef, visible] = useInView({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }, true);

  // Scroll to the form and briefly highlight it.
  // Centre the form in the space below the sticky header when it fits; otherwise (phones, where the
  // form is taller than the screen) line its top up just below the header so its title isn't hidden.
  const goToForm = () => {
    const form = formRef.current;
    if (!form) return;
    const headerH = document.querySelector('.header')?.offsetHeight || 0;
    let shift = 0;   // the form may still be mid scroll-reveal (moved down) – aim for where it will end up
    try { shift = new DOMMatrixReadOnly(getComputedStyle(form).transform).m42; } catch { /* 'none' */ }
    const formTop = form.getBoundingClientRect().top - shift + window.scrollY;
    const space = window.innerHeight - headerH;
    const offset = form.offsetHeight + 32 <= space ? headerH + (space - form.offsetHeight) / 2 : headerH + 10;
    window.scrollTo({ top: formTop - offset, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    setHighlight(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setHighlight(true)));
  };

  // "Get a Free Quote" / "Contact Us" buttons in this section
  const toForm = (e) => { e.preventDefault(); goToForm(); };

  // Tablets & phones: this section stacks its text and contact cards ABOVE the form, so every
  // homepage button that links here (#contact – header, menu, "Discuss Your Project",
  // "Start Your Project"…) goes straight to the form instead. Desktop shows the form beside the
  // text, so those links keep jumping to the section as normal.
  const goToFormRef = useRef(goToForm);
  goToFormRef.current = goToForm;
  useEffect(() => {
    const stacked = window.matchMedia('(max-width: 1100px)');
    const onClick = (e) => {
      if (!stacked.matches || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (!e.target.closest?.('a[href="#contact"]')) return;
      e.preventDefault();
      // wait a moment so the mobile menu (if that's where the link was) has closed and unlocked scrolling
      setTimeout(() => goToFormRef.current(), 60);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <section className="section final-cta" id="contact">
      <div className="container final-cta__box" id="ctaBox">
        <div className="final-cta__bg" aria-hidden="true"><span className="final-cta__orb final-cta__orb--1"></span><span className="final-cta__orb final-cta__orb--2"></span></div>

        <div className="final-cta__content">
          <Reveal as="p" className="eyebrow eyebrow--light" d={0}>Let's Get Started</Reveal>
          <Reveal as="h2" className="h2 h2--light final-cta__title" d={1}>Ready to <em className="hl">Transform</em> Your Home?</Reveal>
          <Reveal as="p" className="final-cta__lead" d={2}>From small repairs to complete property transformations, take the first step towards creating a home that works better for you.</Reveal>

          <Reveal as="ul" className="contact-list" d={3}>
            <li>
              <a href={company.phoneHref} className="contact-card">
                <span className="contact-list__icon"><PhoneIcon /></span>
                <span className="contact-card__txt"><span>Phone</span><b>{company.phone}</b></span>
                <span className="contact-card__go"><ArrowRight /></span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="contact-card">
                <span className="contact-list__icon"><MailIcon /></span>
                <span className="contact-card__txt"><span>Email</span><b>{company.email}</b></span>
                <span className="contact-card__go"><ArrowRight /></span>
              </a>
            </li>
            <li>
              <div className="contact-card contact-card--static">
                <span className="contact-list__icon"><PinIcon /></span>
                <span className="contact-card__txt"><span>Location</span><b>{company.address}</b></span>
              </div>
            </li>
          </Reveal>

          <Reveal className="btn-group" d={4}>
            <a href="#quoteForm" className="btn btn--primary js-to-form" onClick={toForm}>Get a Free Quote <ArrowRight /></a>
            <a href="#quoteForm" className="btn btn--outline-light js-to-form" onClick={toForm}>Contact Us</a>
          </Reveal>
        </div>

        <QuoteForm
          idPrefix="f"
          id="quoteForm"
          formRef={mergeRefs(formRef, revealRef)}
          data-reveal=""
          className={cx('form', visible && 'is-visible', highlight && 'is-highlight')}
          style={{ '--d': 2 }}
          onAnimationEnd={(e) => { if (e.target === e.currentTarget) setHighlight(false); }}
          titleAs="h3"
          title={<>Request a Free <em className="hl">Quote</em></>}
        />
      </div>
    </section>
  );
}
