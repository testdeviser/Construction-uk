import { useEffect, useRef, useState } from 'react';
import { company, navLinks, services } from '../data/site';
import { ArrowRight, LogoMark, SocialList } from './Icons';
import { cx } from './common';

export function Topbar() {
  return (
    <div className="topbar-wrap">
      <div className="topbar">
        <p className="topbar__tagline">{company.tagline}</p>
        <div className="topbar__right">
          <ul className="topbar__contact">
            <li>
              <span className="topbar__label">Call Us:</span>
              <a href={company.phoneHref} className="topbar__value">{company.phone}</a>
            </li>
            <li className="topbar__sep" aria-hidden="true"></li>
            <li>
              <span className="topbar__label">Mail Us:</span>
              <a href={`mailto:${company.email}`} className="topbar__value">{company.email}</a>
            </li>
          </ul>
          <SocialList className="topbar__social" />
        </div>
      </div>
    </div>
  );
}

export function Logo({ light }) {
  return (
    <a href="/" className={cx('logo', light && 'logo--light')} aria-label={light ? undefined : 'Homepage'}>
      <LogoMark />
      <span className="logo__text">
        <span className="logo__name">{company.name}</span>
        <span className="logo__sub">{company.sub}</span>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  // Sticky header shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the dropdown when clicking elsewhere
  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <header className={cx('header', scrolled && 'is-scrolled')} id="siteHeader">
      <div className="header__inner">
        <Logo />

        <nav className="nav" aria-label="Main">
          <ul className="nav__list">
            {navLinks.map((link, i) =>
              link.dropdown ? (
                <li
                  key={link.label}
                  className={cx('nav__item has-dropdown', open && 'is-open')}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
                  }}
                >
                  <button
                    ref={toggleRef}
                    className="nav__link nav__toggle"
                    aria-expanded={open}
                    aria-controls="servicesMenu"
                    onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
                  >
                    {link.label}
                    <svg className="nav__caret" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <ul className="dropdown" id="servicesMenu">
                    {services.map((s) => <li key={s.title}><a href="#">{s.title}</a></li>)}
                  </ul>
                </li>
              ) : (
                <li className="nav__item" key={link.label}>
                  <a href={link.href} className={cx('nav__link', i === 0 && 'is-active')} aria-current={i === 0 ? 'page' : undefined}>{link.label}</a>
                </li>
              )
            )}
          </ul>
        </nav>

        <a href="#contact" className="btn btn--primary">
          Get a Free Quote
          <ArrowRight />
        </a>
      </div>
    </header>
  );
}
