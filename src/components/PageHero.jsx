import { company } from '../data/site';
import { PhoneIcon } from './Icons';
import { A, Img } from './common';

/* Banner at the top of inner pages (About, Contact…):
   eyebrow, two-line heading, intro text, and a bottom bar with breadcrumb + phone number.
   `data` = { eyebrow, title: [line1, line2], text, image, alt } */
export default function PageHero({ data }) {
  return (
    <section className="page-hero" id="home">
      <div className="page-hero__media media" data-label="Banner image">
        <Img src={data.image} alt={data.alt} loading="eager" />
      </div>
      <div className="page-hero__overlay" aria-hidden="true"></div>
      <div className="page-hero__glow" aria-hidden="true"></div>

      <div className="container page-hero__inner">
        <p className="eyebrow eyebrow--light reveal" style={{ '--d': 0 }}>{data.eyebrow}</p>
        <h1 className="page-hero__title">
          {data.title.map((line, i) => (
            <span className="reveal-line" key={line}><span style={{ '--d': i + 1 }}>{line}</span></span>
          ))}
        </h1>
        <p className="page-hero__text reveal" style={{ '--d': 3 }}>{data.text}</p>
      </div>

      <div className="page-hero__bottom">
        <div className="container page-hero__bottom-inner">
          <nav className="breadcrumb reveal" style={{ '--d': 4 }} aria-label="Breadcrumb">
            <ol>
              <li><A href="/">Home</A></li>
              <li aria-current="page">{data.eyebrow}</li>
            </ol>
          </nav>
          <a href={company.phoneHref} className="page-hero__call reveal" style={{ '--d': 4 }}>
            <span className="page-hero__call-icon"><PhoneIcon /></span>
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
