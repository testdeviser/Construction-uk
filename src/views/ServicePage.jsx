import { Navigate } from 'react-router';
import PageHero from '../components/PageHero';
import Faqs from '../components/Faqs';
import ServiceCards from '../components/projects/ServiceCards';
import { ServiceBenefits, ServiceOfferings, ServiceOverview } from '../components/service/ServiceSections';
import { servicePages } from '../data/site';

/* Service page (/services/<slug>) – one layout for every service; content from servicePages in data/site.jsx */
export default function ServicePage({ slug }) {
  const s = servicePages[slug];
  if (!s) return <Navigate to="/" replace />;
  return (
    <>
      <PageHero data={s.hero} />
      <ServiceOverview data={s.overview} />
      <ServiceOfferings data={s.offerings} />
      <ServiceBenefits data={s.benefits} />
      <Faqs items={s.faqs.items} head={s.faqs} />
      <ServiceCards head={s.others} exclude={s.service} id="other-services" />
    </>
  );
}
