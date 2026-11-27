import { projectsPage, services } from '../../data/site';
import { ArrowRight, Ico } from '../Icons';
import { Img, Reveal, Title, quoteHref } from '../common';

const { services: head } = projectsPage;

/* "What We Work On": one photo card per service (data from `services`) */
export default function ServiceCards() {
  return (
    <section className="section svc-cards" id="what-we-do">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal as="p" className="eyebrow" d={0}>{head.eyebrow}</Reveal>
            <Reveal as="h2" className="h2" d={1}><Title text={head.title} accent={head.accent} /></Reveal>
          </div>
          <Reveal as="p" className="section-head__text" d={2}>{head.text}</Reveal>
        </div>

        <div className="svc-cards__grid">
          {services.map((s, i) => (
            <Reveal as="article" className="scard" d={i % 3} key={s.title}>
              <div className="scard__media media" data-label={`${s.title} image`}>
                <Img src={s.image} alt={s.alt} />
                <span className="scard__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="scard__body">
                <span className="scard__icon" aria-hidden="true"><Ico d={s.icon} /></span>
                <h3 className="scard__title">{s.title}</h3>
                <p className="scard__text">{s.text}</p>
                <ul className="scard__tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <a href={quoteHref} className="scard__link">
                  Request a Quote <span className="scard__go"><ArrowRight /></span>
                  <span className="sr-only"> for {s.title}</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
