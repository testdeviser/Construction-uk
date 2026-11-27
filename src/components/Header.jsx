import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { company, navLinks, services } from '../data/site';
import { ArrowRight, LogoMark, SocialList } from './Icons';
import { A, cx, usePage } from './common';

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
    <A href="/" className={cx('logo', light && 'logo--light')} aria-label={light ? undefined : 'Homepage'}>
      <LogoMark />
      <span className="logo__text">
        <span className="logo__name">{company.name}</span>
        <span className="logo__sub">{company.sub}</span>
      </span>
    </A>
  );
}

export default function Header() {
  const { currentPage, quoteHref } = usePage();
  const { pathname } = useLocation();
  const currentPath = pathname.replace(/\/+$/, '');   // e.g. '/services/kitchen-bathroom'
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile / tablet menu
  // Desktop: the dropdown also opens on hover/focus. After choosing a service, keep it
  // hidden until the pointer leaves "Services" – otherwise it stays open over the new page.
  const [suppressed, setSuppressed] = useState(false);
  const toggleRef = useRef(null);
  const burgerRef = useRef(null);

  // Mobile menu: lock page scroll, close on Escape or when the screen gets wide again
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') { setMenuOpen(false); burgerRef.current?.focus(); } };
    const mq = window.matchMedia('(min-width: 1101px)');
    const onWide = () => { if (mq.matches) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => { document.removeEventListener('keydown', onKey); mq.removeEventListener('change', onWide); };
  }, [menuOpen]);

  // Any link inside the menu closes it
  const onNavClick = (e) => { if (e.target.closest('a')) { setMenuOpen(false); setOpen(false); } };

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
    <header className={cx('header', scrolled && 'is-scrolled', menuOpen && 'is-menu-open')} id="siteHeader">
      <div className="header__inner">
        <Logo />

        <nav className="nav" id="mainNav" aria-label="Main" onClick={onNavClick}>
          <ul className="nav__list">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li
                  key={link.label}
                  className={cx('nav__item has-dropdown', open && 'is-open', suppressed && 'is-suppressed')}
                  onMouseLeave={() => setSuppressed(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
                  }}
                >
                  <button
                    ref={toggleRef}
                    className={cx('nav__link nav__toggle', currentPage === 'services' && 'is-active')}
                    aria-expanded={open}
                    aria-controls="servicesMenu"
                    onClick={(e) => { e.stopPropagation(); setSuppressed(false); setOpen((o) => !o); }}
                  >
                    {link.label}
                    <svg className="nav__caret" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <ul
                    className="dropdown" id="servicesMenu"
                    onClick={(e) => {
                      if (!e.target.closest('a')) return;
                      setSuppressed(true);            // hide straight away (hover would keep it open)
                      e.target.closest('a').blur();   // …and drop focus so :focus-within doesn't either
                    }}
                  >
                    {services.map((s) => {
                      const active = !!s.href && s.href === currentPath;   // the service page that's open
                      return <li key={s.title}><A href={s.href || '#'} className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined}>{s.title}</A></li>;
                    })}
                  </ul>
                </li>
              ) : (
                <li className="nav__item" key={link.label}>
                  <A href={link.href} className={cx('nav__link', link.page === currentPage && 'is-active')} aria-current={link.page === currentPage ? 'page' : undefined}>{link.label}</A>
                </li>
              )
            )}
          </ul>
          <A href={quoteHref} className="btn btn--primary nav__cta">
            Get a Free Quote
            <ArrowRight />
          </A>
        </nav>

        <A href={quoteHref} className="btn btn--primary header__cta">
          Get a Free Quote
          <ArrowRight />
        </A>

        <button
          ref={burgerRef}
          type="button"
          className="burger"
          aria-expanded={menuOpen}
          aria-controls="mainNav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
