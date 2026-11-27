import { company } from '../../data/site';
import { ArrowRight, PhoneIcon } from '../Icons';
import { A, Img, Reveal, Title, usePage } from '../common';
import { prefersReducedMotion } from '../../hooks';

/* Sections for a service page. Each takes its slice of a servicePages entry (data/site.jsx). */

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ---------- Overview: centred intro + what's included (no image) ---------- */
export function ServiceOverview({ data }) {
  const { quoteHref } = usePage();
  return (
    <section className="section svc-intro" id="overview">
      <span className="svc-intro__dots svc-intro__dots--tl" aria-hidden="true"></span>
      <span className="svc-intro__dots svc-intro__dots--br" aria-hidden="true"></span>

      <div className="container svc-intro__inner">
        <Reveal as="p" className="eyebrow" d={0}>{data.eyebrow}</Reveal>
        <Reveal as="h2" className="h2" d={1}><Title text={data.title} accent={data.accent} /></Reveal>
        <Reveal as="p" className="svc-intro__lead" d={2}>{data.lead}</Reveal>
        <Reveal as="p" className="svc-intro__text" d={3}>{data.text}</Reveal>

        <Reveal className="svc-intro__actions" d={4}>
          <A href={quoteHref} className="btn btn--primary">Get a Free Quote <ArrowRight /></A>
          <a href={company.phoneHref} className="about__call">
            <span className="about__call-icon"><PhoneIcon /></span>
            <span><small>Prefer to Talk?</small>{company.phone}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- What we offer: one large card per sub-service ---------- */
export function ServiceOfferings({ data }) {
  const { quoteHref } = usePage();
  return (
    <section className="section offer" id="services-offered">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal as="p" className="eyebrow" d={0}>{data.eyebrow}</Reveal>
          <Reveal as="h2" className="h2" d={1}><Title text={data.title} accent={data.accent} /></Reveal>
          <Reveal as="p" className="section-head__text" d={2}>{data.text}</Reveal>
        </div>

        {/* Horizontal cards: photo on one side, details on the other (alternating sides) */}
        <div className="offer__list">
          {data.items.map((item, i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <Reveal as="article" className="ocard" d={1} key={item.title}>
                <div className="ocard__media media" data-label={`${item.title} image`}>
                  <Img src={item.image} alt={item.alt} />
                  <span className="ocard__chip">
                    <b>{num}</b>
                    {item.title}
                  </span>
                </div>

                <div className="ocard__body">
                  <span className="ocard__ghost" aria-hidden="true">{num}</span>
                  <span className="ocard__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d={item.icon} /></svg>
                  </span>
                  <h3 className="ocard__title">{item.title}</h3>
                  <p className="ocard__text">{item.text}</p>
                  <ul className="checklist ocard__points">
                    {item.points.map((p) => <li key={p}><span className="checklist__tick"><Check /></span>{p}</li>)}
                  </ul>
                  <div className="ocard__actions">
                    <A href={quoteHref} className="btn btn--primary">
                      Request a Quote <ArrowRight />
                      <span className="sr-only"> for {item.title}</span>
                    </A>
                    <a href={company.phoneHref} className="ocard__call">
                      <span className="ocard__call-icon"><PhoneIcon /></span>
                      {company.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Benefits: homepage feature cards, stacked ---------- */
const onCardMove = (e) => { // cursor spotlight, as on the homepage cards
  if (prefersReducedMotion()) return;
  const c = e.currentTarget;
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', e.clientX - r.left + 'px');
  c.style.setProperty('--my', e.clientY - r.top + 'px');
};

export function ServiceBenefits({ data }) {
  return (
    <section className="section why-us" id="benefits">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal as="p" className="eyebrow" d={0}>{data.eyebrow}</Reveal>
          <Reveal as="h2" className="h2" d={1}><Title text={data.title} accent={data.accent} /></Reveal>
        </div>
        <div className="why-us__cards">
          {data.cards.map((c, i) => (
            <Reveal as="article" className="wcard wcard--stack" d={i} key={c.title} onMouseMove={onCardMove}>
              <span className="wcard__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="wcard__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={c.icon} /></svg></span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
