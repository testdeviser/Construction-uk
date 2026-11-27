import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { mergeRefs, useInView } from '../hooks';
import { pageByPath } from '../pages';

export const cx = (...c) => c.filter(Boolean).join(' ');

/* Section heading with the last word in orange + brush underline (the site's heading style) */
export const Title = ({ text, accent }) => <>{text} <em className="hl">{accent}</em></>;

/* Which page is showing ('home', 'about', 'projects', 'contact'), from the URL */
export function usePage() {
  const { pathname } = useLocation();
  const currentPage = pageByPath(pathname).page;
  /* Where "Get a Free Quote" buttons go: the form on the homepage, or the Contact page form */
  const quoteHref = currentPage === 'home' ? '#contact' : '/contact#quote';
  return { currentPage, quoteHref };
}

/* Site link. Page links ('/about', '/contact#quote') go through React Router (no reload).
   Section links ('#projects') stay plain anchors on the homepage; on other pages they
   lead back to that section of the homepage. Anything else (tel:, mailto:, '#') is a plain <a>. */
export function A({ href, ...rest }) {
  const { currentPage } = usePage();
  const to = href.startsWith('/') ? href
    : href.startsWith('#') && href.length > 1 && currentPage !== 'home' ? '/' + href
    : null;
  return to ? <Link to={to} {...rest} /> : <a href={href} {...rest} />;
}

/* Scroll position on navigation: new page → top; URL with #section → that section.
   React draws the page after the browser's own jump, so retry once fonts/images settle. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const go = () => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' });
    const t = setTimeout(go, 50);
    const onLoad = () => setTimeout(go, 50);
    window.addEventListener('load', onLoad, { once: true });
    return () => { clearTimeout(t); window.removeEventListener('load', onLoad); };
  }, [pathname, hash, key]);
  return null;
}

/* Browser-tab title and search description for the current page */
export function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const p = pageByPath(pathname);
    document.title = p.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', p.description);
  }, [pathname]);
  return null;
}

/* Scroll-reveal wrapper: renders any tag with data-reveal and adds
   `is-visible` once it scrolls into view (same as the original script). */
export function Reveal({ as: Tag = 'div', className, d, style, ref, children, ...rest }) {
  const [revealRef, visible] = useInView({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }, true);
  const s = d != null ? { '--d': d, ...style } : style;
  return (
    <Tag ref={mergeRefs(revealRef, ref)} data-reveal="" className={cx(className, visible && 'is-visible')} style={s} {...rest}>
      {children}
    </Tag>
  );
}

/* Image that removes itself if it fails to load, leaving the .media placeholder */
export function Img({ loading = 'lazy', ...props }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img loading={loading} {...props} onError={() => setFailed(true)} />;
}

/* Services panel state shared by the Services section, promo ticker and footer links */
const ServicesCtx = createContext(null);

export function ServicesProvider({ children }) {
  const [active, setActive] = useState(0);
  const lockUntil = useRef(0);
  // Open a panel from elsewhere on the page; briefly ignore hover so it stays put
  const openService = useCallback((i) => {
    lockUntil.current = Date.now() + 1500;
    setActive(i);
  }, []);
  return (
    <ServicesCtx.Provider value={{ active, setActive, openService, lockUntil }}>
      {children}
    </ServicesCtx.Provider>
  );
}

export const useServices = () => useContext(ServicesCtx);
