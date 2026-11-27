import { aboutPage, company } from '../../data/site';
import { ArrowRight, Ico, PhoneIcon } from '../Icons';
import { Img, Reveal, Title } from '../common';
import { prefersReducedMotion } from '../../hooks';

const { whoWeAre, missionVision, whyUs, partners } = aboutPage;

/* ---------- 02 Who we are ---------- */
export function WhoWeAre() {
  return (
    <section className="section about" id="who-we-are">
      <div className="container about__grid">
        <Reveal className="about__visual">
          <span className="about__deco" aria-hidden="true"></span>
          <div className="media about__img-main" data-label="Building work image">
            <Img src={whoWeAre.imgMain.src} alt={whoWeAre.imgMain.alt} />
          </div>
          <div className="media about__img-small" data-label="Finished interior image">
            <Img src={whoWeAre.imgSmall.src} alt={whoWeAre.imgSmall.alt} />
          </div>
          <div className="about__badge">
            <span className="about__badge-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3 10h2.5v10h13V10H21L12 3Zm-1.5 15v-5h3v5h-3Z" fill="currentColor" /></svg></span>
            <span><strong>Complete Property</strong>Solutions</span>
          </div>
          <ul className="about__tags" aria-label="What we cover">
            {whoWeAre.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </Reveal>

        <div className="about__content">
          <Reveal as="p" className="eyebrow" d={0}>{whoWeAre.eyebrow}</Reveal>
          <Reveal as="h2" className="h2" d={1}><Title text={whoWeAre.title} accent={whoWeAre.accent} /></Reveal>
          <Reveal as="p" className="lead" d={1}>{whoWeAre.lead}</Reveal>
          {whoWeAre.paragraphs.map((p, i) => (
            <Reveal as="p" className="who__text" d={2 + i} key={i}>{p}</Reveal>
          ))}
          <Reveal className="about__actions who__actions" d={4}>
            <a href="./#services" className="btn btn--primary">{whoWeAre.cta} <ArrowRight /></a>
            <a href={company.phoneHref} className="about__call">
              <span className="about__call-icon"><PhoneIcon /></span>
              <span><small>Prefer to Talk?</small>{company.phone}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 Mission & vision ---------- */
export function MissionVision() {
  return (
    <section className="section mv" id="mission">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal as="p" className="eyebrow" d={0}>{missionVision.eyebrow}</Reveal>
          <Reveal as="h2" className="h2" d={1}><Title text={missionVision.title} accent={missionVision.accent} /></Reveal>
        </div>

        <div className="mv__grid">
          {missionVision.items.map((item, i) => (
            <Reveal as="article" className={`mv-card ${i === 0 ? 'mv-card--dark' : 'mv-card--light'}`} d={i + 2} key={item.label}>
              <span className="mv-card__ghost" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="mv-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{item.svg}</svg>
              </span>
              <h3 className="mv-card__label">{item.label}</h3>
              <p className="mv-card__text">{item.text}</p>
              <span className="mv-card__bar" aria-hidden="true"></span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 Why choose us ---------- */
const onCardMove = (e) => { // cursor spotlight, as on the homepage cards
  if (prefersReducedMotion()) return;
  const c = e.currentTarget;
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', e.clientX - r.left + 'px');
  c.style.setProperty('--my', e.clientY - r.top + 'px');
};

export function WhyUs() {
  return (
    <section className="section why-us" id="why-us">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal as="p" className="eyebrow" d={0}>{whyUs.eyebrow}</Reveal>
          <Reveal as="h2" className="h2" d={1}><Title text={whyUs.title} accent={whyUs.accent} /></Reveal>
        </div>
        <div className="why-us__cards">
          {whyUs.cards.map((c, i) => (
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

/* ---------- 05 Partners ---------- */
export function Partners() {
  return (
    <section className="section partners" id="partners">
      <div className="partners__bg" aria-hidden="true"></div>
      <div className="container partners__inner">
        <div className="section-head section-head--split">
          <Reveal d={0}>
            <p className="eyebrow eyebrow--light">{partners.eyebrow}</p>
            <h2 className="h2 h2--light"><Title text={partners.title} accent={partners.accent} /></h2>
          </Reveal>
          <Reveal as="p" className="section-head__text" d={1}>{partners.text}</Reveal>
        </div>

        <ul className="partners__grid" aria-label="Our partners">
          {partners.logos.map((p, i) => (
            <Reveal as="li" className="partner" d={i} key={p.name}>
              {p.logo
                ? <img src={p.logo} alt={p.name} loading="lazy" />
                : <span className="partner__placeholder"><Ico d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" />{p.name}</span>}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
