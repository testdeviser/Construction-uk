import { useEffect, useState } from 'react';
import { company } from '../../data/site';
import { MailIcon, PhoneIcon } from '../Icons';
import { A, Reveal, cx } from '../common';

/* Body of the Privacy Policy and Terms & Conditions pages:
   sticky "On this page" contents (highlights the section you're reading) + numbered sections.
   Content format is described at the top of data/legal.jsx. */

// One piece of text: a string, or { label, href } for a link
function Segment({ seg }) {
  if (typeof seg === 'string') return seg;
  if (/^https?:/.test(seg.href)) return <a href={seg.href} target="_blank" rel="noopener noreferrer">{seg.label}</a>;
  if (seg.href.startsWith('/')) return <A href={seg.href}>{seg.label}</A>;
  return <a href={seg.href}>{seg.label}</a>;   // mailto:, tel:
}
const Text = ({ value }) => (Array.isArray(value) ? value.map((s, i) => <Segment key={i} seg={s} />) : value);

function Block({ block }) {
  if (block && block.list) {
    return <ul className="legal-list">{block.list.map((item, i) => <li key={i}><Text value={item} /></li>)}</ul>;
  }
  return <p><Text value={block} /></p>;
}

function HelpCard({ text, className }) {
  return (
    <div className={cx('legal-help', className)}>
      <p className="legal-help__title">Have a Question?</p>
      <p className="legal-help__text">{text}</p>
      <a href={`mailto:${company.email}`} className="legal-help__link">
        <span className="legal-help__icon"><MailIcon /></span>{company.email}
      </a>
      <a href={company.phoneHref} className="legal-help__link">
        <span className="legal-help__icon"><PhoneIcon /></span>{company.phone}
      </a>
    </div>
  );
}

export default function LegalContent({ data }) {
  const [active, setActive] = useState(data.sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);   // small screens: contents list is collapsible

  // Highlight the section currently being read
  useEffect(() => {
    const els = data.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-120px 0px -55% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [data]);

  return (
    <section className="section legal" id="policy">
      <div className="container legal__grid">
        <aside className="legal__aside">
          <nav className={cx('legal-toc', tocOpen && 'is-open')} aria-label="On this page">
            <button type="button" className="legal-toc__toggle" aria-expanded={tocOpen} onClick={() => setTocOpen((o) => !o)}>
              On this page
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <p className="legal-toc__title">On this page</p>
            <ol>
              {data.sections.map((s, i) => (
                <li key={s.id}>
                  {/* plain #links: jump within this page */}
                  <a href={`#${s.id}`} className={cx(active === s.id && 'is-active')} aria-current={active === s.id ? 'true' : undefined} onClick={() => setTocOpen(false)}>
                    <span>{String(i + 1).padStart(2, '0')}</span>{s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <HelpCard text={data.help} className="legal-help--aside" />
        </aside>

        <Reveal as="article" className="legal__body">
          <p className="legal__updated">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
            Last updated: {data.updated}
          </p>
          <p className="legal__intro">{data.intro}</p>
          {data.sections.map((s, i) => (
            <section className="legal-sec" id={s.id} key={s.id}>
              <h2 className="legal-sec__title"><span className="legal-sec__num">{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>
              {s.blocks.map((b, k) => <Block block={b} key={k} />)}
            </section>
          ))}
        </Reveal>

        <HelpCard text={data.help} className="legal-help--bottom" />
      </div>
    </section>
  );
}
