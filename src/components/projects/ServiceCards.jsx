import { projectsPage, services } from '../../data/site';
import { ArrowRight, Ico } from '../Icons';
import { A, Img, Reveal, Title, usePage } from '../common';

/* Photo card per service (data from `services`).
   Projects page: all six ("What We Work On"). Service pages: the others (`exclude` = this service's title).
   Services with their own page link to it; the rest link to the quote form. */
export default function ServiceCards({ head = projectsPage.services, exclude, id = 'what-we-do' }) {
  const { quoteHref } = usePage();
  const list = services.filter((s) => s.title !== exclude);
  return (
    <section className="section svc-cards" id={id}>
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal as="p" className="eyebrow" d={0}>{head.eyebrow}</Reveal>
            <Reveal as="h2" className="h2" d={1}><Title text={head.title} accent={head.accent} /></Reveal>
          </div>
          <Reveal as="p" className="section-head__text" d={2}>{head.text}</Reveal>
        </div>

        <div className="svc-cards__grid">
          {list.map((s, i) => (
            <Reveal as="article" className="scard" d={i % 3} key={s.title}>
              <div className="scard__media media" data-label={`${s.title} image`}>
                <Img src={s.image} alt={s.alt} />
                <span className="scard__num" aria-hidden="true">{String(services.indexOf(s) + 1).padStart(2, '0')}</span>
              </div>
              <div className="scard__body">
                <span className="scard__icon" aria-hidden="true"><Ico d={s.icon} /></span>
                <h3 className="scard__title">{s.title}</h3>
                <p className="scard__text">{s.text}</p>
                <ul className="scard__tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <A href={s.href || quoteHref} className="scard__link">
                  {s.href ? 'View Service' : 'Request a Quote'} <span className="scard__go"><ArrowRight /></span>
                  <span className="sr-only"> for {s.title}</span>
                </A>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
