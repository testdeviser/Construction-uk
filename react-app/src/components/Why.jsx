import { why } from '../data/site';
import { Img, Reveal } from './common';
import { prefersReducedMotion } from '../hooks';

// Cursor spotlight on cards
const onCardMove = (e) => {
  if (prefersReducedMotion()) return;
  const c = e.currentTarget;
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', e.clientX - r.left + 'px');
  c.style.setProperty('--my', e.clientY - r.top + 'px');
};

export default function Why() {
  return (
    <section className="section why" id="why">
      <div className="container why__grid">
        <div className="why__content">
          <Reveal as="p" className="eyebrow" d={0}>Built Around Your Needs</Reveal>
          <Reveal as="h2" className="h2" d={1}>Your Property Deserves the Right <em className="hl">Approach</em></Reveal>
          <Reveal as="p" className="lead" d={2}>We understand that every property and every homeowner has different requirements. Our approach focuses on understanding your vision and delivering solutions that suit your home.</Reveal>
          <Reveal className="why__photo" d={3}>
            <div className="media why__img" data-label="Project image"><Img src={why.image.src} alt={why.image.alt} /></div>
            <span className="why__ring" aria-hidden="true"></span>
          </Reveal>
        </div>

        <div className="why__cards" id="whyCards">
          {why.cards.map((c, i) => (
            <Reveal as="article" className="wcard" d={i} key={c.title} onMouseMove={onCardMove}>
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
