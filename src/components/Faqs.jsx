import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { faqs as defaultFaqs } from '../data/site';
import { Reveal, Title, cx } from './common';
import { prefersReducedMotion } from '../hooks';

const EASE = 'cubic-bezier(.2,.7,.2,1)';

/* Wrap search matches in <mark> */
function Highlight({ text, q }) {
  if (!q) return text;
  const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

function Faq({ item, num, isOpen, hidden, q, d, onToggle, summaryRef }) {
  const reduce = prefersReducedMotion();
  const [domOpen, setDomOpen] = useState(isOpen); // <details open> stays true until the close animation ends
  const bodyRef = useRef(null);
  const detailsRef = useRef(null);
  const anim = useRef(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    const body = bodyRef.current;
    anim.current?.cancel();
    if (isOpen) {
      detailsRef.current.open = true; // open now so the body has a height to animate to
      setDomOpen(true);
      if (reduce) return;
      anim.current = body.animate([{ height: '0px' }, { height: body.scrollHeight + 'px' }], { duration: 420, easing: EASE });
    } else {
      if (reduce) { setDomOpen(false); return; }
      const a = body.animate([{ height: body.offsetHeight + 'px' }, { height: '0px' }], { duration: 320, easing: EASE });
      anim.current = a;
      a.onfinish = () => { setDomOpen(false); anim.current = null; };
    }
  }, [isOpen, reduce]);

  return (
    <Reveal as="details" className={cx('faq', isOpen && 'is-open', hidden && 'is-hidden')} open={domOpen} d={d} ref={detailsRef}>
      <summary ref={summaryRef} onClick={(e) => { e.preventDefault(); onToggle(); }}>
        <span className="faq__num">{num}</span>
        <h3><Highlight text={item.q} q={q} /></h3>
        <span className="faq__icon" aria-hidden="true"></span>
      </summary>
      <div className="faq__body" ref={bodyRef}><p><Highlight text={item.a} q={q} /></p></div>
    </Reveal>
  );
}

const defaultHead = { eyebrow: 'Have a Question?', title: 'Frequently Asked', accent: 'Questions' };

/* FAQ accordion with search. Homepage/Contact: the general FAQs; service pages pass their own `items` + `head`. */
export default function Faqs({ items: faqs = defaultFaqs, head = defaultHead }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState('');
  const summaryRefs = useRef([]);
  const pendingFocus = useRef(null);

  const q = query.trim();
  const ql = q.toLowerCase();
  const hit = (f) => !ql || f.q.toLowerCase().includes(ql) || f.a.toLowerCase().includes(ql);
  const shown = faqs.filter(hit).length;
  const firstHit = faqs.findIndex(hit);

  const toggle = (i) => setOpenIndex((o) => (o === i ? -1 : i));

  // Enter opens the first matching question
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && firstHit !== -1 && shown) {
      e.preventDefault();
      setOpenIndex(firstHit);
      pendingFocus.current = firstHit;
    }
  };
  useEffect(() => {
    if (pendingFocus.current != null) {
      summaryRefs.current[pendingFocus.current]?.focus();
      pendingFocus.current = null;
    }
  });

  const column = (col) =>
    faqs.map((f, i) => ({ f, i })).filter(({ f }) => f.col === col).map(({ f, i }, k) => (
      <Faq
        key={i}
        item={f}
        num={String(i + 1).padStart(2, '0')}
        isOpen={openIndex === i}
        hidden={!hit(f)}
        q={q}
        d={k}
        onToggle={() => toggle(i)}
        summaryRef={(el) => (summaryRefs.current[i] = el)}
      />
    ));

  return (
    <section className="section faqs" id="faqs">
      <div className="container">
        <div className="section-head section-head--center faqs__head">
          <Reveal as="p" className="eyebrow" d={0}>{head.eyebrow}</Reveal>
          <Reveal as="h2" className="h2" d={1}><Title text={head.title} accent={head.accent} /></Reveal>
          <Reveal className="faq-search" d={2}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4.2-4.2" /></svg>
            <label htmlFor="faqSearch" className="sr-only">Search Questions</label>
            <input type="search" id="faqSearch" placeholder="Search Questions…" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onKeyDown} />
            <span className="faq-search__count" id="faqCount" aria-live="polite">{shown} {shown === 1 ? 'Question' : 'Questions'}</span>
          </Reveal>
        </div>

        <div className={cx('faq-grid', ql && 'is-searching')} id="faqGrid">
          <div className="faq-col">{column(0)}</div>
          <div className="faq-col">{column(1)}</div>
        </div>
        <p className="faq-empty" id="faqEmpty" hidden={shown !== 0}>No questions match your search.</p>
      </div>
    </section>
  );
}
