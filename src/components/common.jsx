import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { mergeRefs, useInView } from '../hooks';

export const cx = (...c) => c.filter(Boolean).join(' ');

/* Section heading with the last word in orange + brush underline (the site's heading style) */
export const Title = ({ text, accent }) => <>{text} <em className="hl">{accent}</em></>;

/* Which page is showing – set by <html data-page="…"> in each HTML file (index.html = home) */
export const currentPage = document.documentElement.dataset.page || 'home';

/* Homepage section links (#projects …) work as-is on the homepage;
   on other pages they lead back to that section of the homepage. */
export const pageHref = (href) => (href.startsWith('#') && currentPage !== 'home' ? './' + href : href);

/* Where "Get a Free Quote" buttons go: the form on the homepage, or the Contact page form */
export const quoteHref = currentPage === 'home' ? '#contact' : currentPage === 'contact' ? '#quote' : 'contact.html#quote';

/* Arriving from another page with a #section link: React draws the page after the browser's
   own jump, so scroll to the section once it exists (and again when fonts/images settle). */
export function scrollToHash() {
  const go = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'start' });
  };
  if (!window.location.hash) return;
  setTimeout(go, 50);
  window.addEventListener('load', () => setTimeout(go, 50), { once: true });
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
