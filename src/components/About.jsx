import { about, company } from '../data/site';
import { ArrowRight, PhoneIcon } from './Icons';
import { Img, Reveal } from './common';

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <Reveal className="about__visual">
          <span className="about__deco" aria-hidden="true"></span>
          <div className="media about__img-main" data-label="Renovation / construction image">
            <Img src={about.imgMain.src} alt={about.imgMain.alt} />
          </div>
          <div className="media about__img-small" data-label="Interior detail image">
            <Img src={about.imgSmall.src} alt={about.imgSmall.alt} />
          </div>
          <div className="about__badge">
            <span className="about__badge-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3 10h2.5v10h13V10H21L12 3Zm-1.5 15v-5h3v5h-3Z" fill="currentColor" /></svg></span>
            <span><strong>Interior &amp; Exterior</strong>Improvements</span>
          </div>
          <ul className="about__tags" aria-label="What we cover">
            {about.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </Reveal>

        <div className="about__content">
          <Reveal as="p" className="eyebrow" d={0}>Your Home. Our Commitment.</Reveal>
          <Reveal as="h2" className="h2" d={1}>Building Better Spaces for Better <em className="hl">Living</em></Reveal>
          <Reveal as="p" className="lead" d={1}>Your home deserves care, attention and quality workmanship. Whether you're planning a complete property transformation or making improvements to an individual room, we're here to help bring your vision to life.</Reveal>
          <Reveal as="p" d={2}>From structural rebuilds and interior renovations to outdoor improvements and general repairs, our range of services helps you create a home that is functional, comfortable and built around your lifestyle.</Reveal>

          <ul className="hl-grid">
            {about.highlights.map((h, i) => (
              <Reveal as="li" className="hl-card" d={i + 2} key={h.label}>
                <span className="hl-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true">{h.svg}</svg></span>
                <span className="hl-card__label">{h.label}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal className="about__actions" d={5}>
            <a href="#" className="btn btn--dark">More About Us <ArrowRight /></a>
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
