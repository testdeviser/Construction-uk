import { company, contactPage } from '../../data/site';
import { ArrowRight, MailIcon, PhoneIcon, PinIcon, SocialList } from '../Icons';
import { Reveal, Title, quoteHref } from '../common';
import QuoteForm from '../QuoteForm';

const { options, enquiry, location } = contactPage;

const optionIcons = { phone: PhoneIcon, mail: MailIcon, pin: PinIcon };
const optionValues = {
  phone: { text: company.phone, href: company.phoneHref },
  email: { text: company.email, href: `mailto:${company.email}` },
  address: { text: company.address, href: null },
};

/* ---------- 02 Quick contact options ---------- */
export function ContactOptions() {
  return (
    <section className="section contact-options" id="get-in-touch" aria-label="Ways to contact us">
      <div className="container contact-options__grid">
        {options.map((o, i) => {
          const Icon = optionIcons[o.icon];
          const v = optionValues[o.key];
          return (
            <Reveal as={v.href ? 'a' : 'div'} href={v.href || undefined} className="copt" d={i} key={o.key}>
              <span className="copt__icon" aria-hidden="true"><Icon /></span>
              <span className="copt__label">{o.label}</span>
              <strong className="copt__value">{v.text}</strong>
              <span className="copt__note">{o.note}</span>
              {v.href && <span className="copt__go" aria-hidden="true"><ArrowRight /></span>}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- 03 Enquiry: next steps + quote form (homepage dark contact box) ---------- */
export function Enquiry() {
  return (
    <section className="section final-cta contact-enquiry" id="quote">
      <div className="container final-cta__box">
        <div className="final-cta__bg" aria-hidden="true"><span className="final-cta__orb final-cta__orb--1"></span><span className="final-cta__orb final-cta__orb--2"></span></div>

        <div className="final-cta__content">
          <Reveal as="p" className="eyebrow eyebrow--light" d={0}>{enquiry.eyebrow}</Reveal>
          <Reveal as="h2" className="h2 h2--light final-cta__title" d={1}><Title text={enquiry.title} accent={enquiry.accent} /></Reveal>
          <Reveal as="p" className="final-cta__lead" d={2}>{enquiry.text}</Reveal>

          <Reveal className="next-steps" d={3}>
            <p className="next-steps__title">{enquiry.stepsTitle}</p>
            <ol>
              {enquiry.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="next-steps__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span><b>{s.title}</b>{s.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="contact-enquiry__social" d={4}>
            <span>Follow Us</span>
            <SocialList className="footer__social" />
          </Reveal>
        </div>

        <QuoteForm
          idPrefix="cf"
          id="quoteForm"
          className="form"
          aria-label="Request a free quote"
          titleAs="h3"
          title={<>Request a Free <em className="hl">Quote</em></>}
        />
      </div>
    </section>
  );
}

/* ---------- 04 Find us: map, address, opening hours ---------- */
export function Location() {
  return (
    <section className="section location" id="find-us">
      <div className="container location__grid">
        <Reveal className="location__map">
          {location.mapEmbed ? (
            <iframe src={location.mapEmbed} title="Map showing our location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
          ) : (
            <div className="location__map-ph" aria-hidden="true">
              <span className="location__pin"><PinIcon /></span>
              <span className="location__map-label">Map</span>
            </div>
          )}
          <div className="location__card">
            <span className="location__card-icon" aria-hidden="true"><PinIcon /></span>
            <span><small>Our Address</small>{company.address}</span>
          </div>
        </Reveal>

        <div className="location__content">
          <Reveal as="p" className="eyebrow" d={0}>{location.eyebrow}</Reveal>
          <Reveal as="h2" className="h2" d={1}><Title text={location.title} accent={location.accent} /></Reveal>
          <Reveal as="p" className="lead" d={2}>{location.text}</Reveal>

          <Reveal className="hours" d={3}>
            <p className="hours__title">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
              Opening Hours
            </p>
            <ul>
              {location.hours.map((h) => (
                <li key={h.day}><span>{h.day}</span><b>{h.time}</b></li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="btn-group" d={4}>
            <a href={quoteHref} className="btn btn--primary">Get a Free Quote <ArrowRight /></a>
            <a href={company.phoneHref} className="btn btn--dark">Call {company.phone}</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
