import { ArrowRight } from './Icons';
import { A, Reveal, Title, usePage } from './common';

/* Closing call to action on inner pages: the homepage dark box, centred, two buttons.
   `data` = { eyebrow, title, accent, text, primary, secondary } */
export default function CtaBanner({ data }) {
  const { quoteHref } = usePage();
  return (
    <section className="section final-cta" id="contact">
      <div className="container final-cta__box final-cta__box--center">
        <div className="final-cta__bg" aria-hidden="true"><span className="final-cta__orb final-cta__orb--1"></span><span className="final-cta__orb final-cta__orb--2"></span></div>
        <Reveal as="p" className="eyebrow eyebrow--light" d={0}>{data.eyebrow}</Reveal>
        <Reveal as="h2" className="h2 h2--light final-cta__title" d={1}><Title text={data.title} accent={data.accent} /></Reveal>
        <Reveal as="p" className="final-cta__lead" d={2}>{data.text}</Reveal>
        <Reveal className="btn-group" d={3}>
          <A href={quoteHref} className="btn btn--primary">{data.primary} <ArrowRight /></A>
          <A href="/contact" className="btn btn--outline-light">{data.secondary}</A>
        </Reveal>
      </div>
    </section>
  );
}
