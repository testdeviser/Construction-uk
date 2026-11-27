import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { mergeRefs, useInView } from '../hooks';

export const cx = (...c) => c.filter(Boolean).join(' ');

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
