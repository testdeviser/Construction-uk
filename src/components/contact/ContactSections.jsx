import { company, contactPage } from '../../data/site';
import { ArrowRight, MailIcon, PhoneIcon, PinIcon } from '../Icons';
import { A, Reveal, Title, usePage } from '../common';
import QuoteForm from '../QuoteForm';

const { options, location } = contactPage;

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

/* ---------- 03 Enquiry: heading, the quote form on a "stacked" orange card, contact cards + reassurance ---------- */
const perkIcons = {
  tag: 'M3 12V4h8l10 10-8 8L3 12ZM7.5 7.5h.01',
  steps: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3ZM9 12l2 2 4-4',
};

export function Enquiry() {
  const { enquiry } = contactPage;
  return (
    <section className="section contact-enquiry" id="quote">
      <span className="contact-enquiry__dots contact-enquiry__dots--tl" aria-hidden="true"></span>
      <span className="contact-enquiry__dots contact-enquiry__dots--br" aria-hidden="true"></span>

      <div className="container">
        <div className="section-head section-head--center contact-enquiry__head">
          <Reveal as="p" className="eyebrow" d={0}>{enquiry.eyebrow}</Reveal>
          <Reveal as="h2" className="h2" d={1}><Title text={enquiry.title} accent={enquiry.accent} /></Reveal>
          <Reveal as="p" className="section-head__text" d={2}>{enquiry.text}</Reveal>
        </div>

        <div className="contact-enquiry__stage">
          {/* other ways to get in touch, floating beside the form on wide screens */}
          <a href={company.phoneHref} className="enq-float enq-float--left">
            <span className="enq-float__icon"><PhoneIcon /></span>
            <span><small>Prefer to Talk?</small>{company.phone}</span>
          </a>
          <a href={`mailto:${company.email}`} className="enq-float enq-float--right">
            <span className="enq-float__icon"><MailIcon /></span>
            <span><small>Email Us</small>{company.email}</span>
          </a>

          <div className="contact-enquiry__formwrap">
            <QuoteForm
              idPrefix="cf"
              id="quoteForm"
              className="form"
              aria-label="Request a free quote"
              titleAs="h3"
              title={<>Request a Free <em className="hl">Quote</em></>}
            />
          </div>
        </div>

        <ul className="enq-perks">
          {enquiry.perks.map((p, i) => (
            <Reveal as="li" className="enq-perk" d={i} key={p.title}>
              <span className="enq-perk__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={perkIcons[p.icon]} /></svg></span>
              <span>
                <b>{p.title}</b>
                {p.link ? <A href={p.link.href}>{p.text}</A> : p.text}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 04 Find us: map, address, opening hours ---------- */
export function Location() {
  const { quoteHref } = usePage();
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
            <A href={quoteHref} className="btn btn--primary">Get a Free Quote <ArrowRight /></A>
            <a href={company.phoneHref} className="btn btn--dark">Call {company.phone}</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
