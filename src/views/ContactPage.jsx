import PageHero from '../components/PageHero';
import { contactPage } from '../data/site';
import { ContactOptions, Enquiry, Location } from '../components/contact/ContactSections';

/* Contact Us page (/contact) – shares the quote form, header and footer with the homepage */
export default function ContactPage() {
  return (
    <>
      <PageHero data={contactPage.hero} />
      <ContactOptions />
      <Enquiry />
      <Location />
    </>
  );
}
