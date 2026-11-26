import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Combine several refs (object or callback) into one callback ref */
export const mergeRefs = (...refs) => (node) => {
  refs.forEach((r) => {
    if (typeof r === 'function') r(node);
    else if (r) r.current = node;
  });
};

/* Is the element on screen? `once` = stop watching after the first hit */
export function useInView(options = {}, once = false) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0, rootMargin = '0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([en]) => {
      setInView(en.isIntersecting);
      if (en.isIntersecting && once) io.disconnect();
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/* Run a callback on window scroll, throttled to one call per animation frame */
export function useScrollFrame(cb, deps = []) {
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; cb(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', cb);
    cb();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', cb);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
