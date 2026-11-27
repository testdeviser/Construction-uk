import { useRef, useState } from 'react';
import { company, quickLinks, services } from '../data/site';
import { ArrowRight, MailIcon, PhoneIcon, PinIcon, SocialList } from './Icons';
import { Reveal, cx, useServices } from './common';
import { Logo } from './Header';
import { prefersReducedMotion, useScrollFrame } from '../hooks';

const FLink = ({ href, label, onClick }) => (
  <li><a href={href} className="flink" onClick={onClick}><ArrowRight /><span>{label}</span></a></li>
);

export default function Footer() {
  const { openService } = useServices();
  const brandRef = useRef(null);
  const ringRef = useRef(null);
  const [toTopOn, setToTopOn] = useState(false);

  useScrollFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    setToTopOn(window.scrollY > 600);
    ringRef.current?.style.setProperty('--p', (100 - p * 100).toFixed(1));

    // Wordmark fills with orange as it scrolls up into view
    const brand = brandRef.current;
    if (brand) {
      const start = brand.getBoundingClientRect().top + window.scrollY - window.innerHeight - 450;
      const span = Math.max(1, max - start);
      const t = prefersReducedMotion() ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / span));
      brand.style.setProperty('--fill', (t * 100).toFixed(1) + '%');
    }
  });

  return (
    <>
      <footer className="footer" id="footer">
        <div className="footer__glow" aria-hidden="true"></div>
        <div className="container footer__grid">
          <Reveal className="footer__col footer__about" d={0}>
            <Logo light />
            <p>Providing comprehensive building, renovation and property improvement solutions, from complete house rebuilds to everyday repairs.</p>
            <SocialList className="footer__social" />
          </Reveal>

          <Reveal className="footer__col" d={1}>
            <h4>Quick Links</h4>
            <ul className="flinks">
              {quickLinks.map((l) => <FLink key={l.label} {...l} />)}
            </ul>
          </Reveal>

          <Reveal className="footer__col" d={2}>
            <h4>Our Services</h4>
            <ul className="flinks">
              {services.map((s, i) => <FLink key={s.title} href="#services" label={s.title} onClick={() => openService(i)} />)}
            </ul>
          </Reveal>

          <Reveal className="footer__col" d={3}>
            <h4>Contact Information</h4>
            <ul className="footer__contact">
              <li><a href={company.phoneHref} className="fcontact"><span className="fcontact__icon"><PhoneIcon /></span><span><small>Phone</small>{company.phone}</span></a></li>
              <li><a href={`mailto:${company.email}`} className="fcontact"><span className="fcontact__icon"><MailIcon /></span><span><small>Email</small>{company.email}</span></a></li>
              <li><div className="fcontact"><span className="fcontact__icon"><PinIcon /></span><span><small>Location</small>{company.address}</span></div></li>
            </ul>
          </Reveal>
        </div>

        {/* Oversized wordmark (decorative) */}
        <div className="footer__brand" aria-hidden="true"><span ref={brandRef}>{company.name}</span></div>

        <div className="footer__bottom">
          <div className="container footer__bottom-inner">
            <p>&copy; <span>{new Date().getFullYear()}</span> {company.name}. All rights reserved.</p>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Back to top with scroll-progress ring */}
      <a href="#home" className={cx('to-top', toTopOn && 'is-on')} id="toTop" aria-label="Back to top">
        <svg className="to-top__ring" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="25" /><circle className="to-top__bar" cx="28" cy="28" r="25" pathLength="100" ref={ringRef} /></svg>
        <svg className="to-top__arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16V5m-4.5 4.5L10 5l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </>
  );
}
