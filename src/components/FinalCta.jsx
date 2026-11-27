import { useRef, useState } from 'react';
import { company } from '../data/site';
import { ArrowRight, MailIcon, PhoneIcon, PinIcon } from './Icons';
import { Reveal, cx } from './common';
import { mergeRefs, prefersReducedMotion, useInView } from '../hooks';
import QuoteForm from './QuoteForm';

export default function FinalCta() {
  const formRef = useRef(null);
  const [highlight, setHighlight] = useState(false);
  const [revealRef, visible] = useInView({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }, true);

  // "Get a Free Quote" / "Contact Us": bring the form into focus
  const toForm = (e) => {
    e.preventDefault();
    formRef.current.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
    setHighlight(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setHighlight(true)));
  };

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
