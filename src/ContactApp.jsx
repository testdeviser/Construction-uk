import Header, { Topbar } from './components/Header';
import Footer from './components/Footer';
import PageHero from './components/PageHero';
import Faqs from './components/Faqs';
import { ServicesProvider } from './components/common';
import { contactPage } from './data/site';
import { ContactOptions, Enquiry, Location } from './components/contact/ContactSections';

/* Contact Us page (contact.html) – shares the header, footer, quote form, FAQs and styles with the homepage */
export default function ContactApp() {
  return (
    <ServicesProvider>
      <Topbar />
      <Header />
      <main>
        <PageHero data={contactPage.hero} />
        <ContactOptions />
        <Enquiry />
        <Location />
        <Faqs />
      </main>
      <Footer />
    </ServicesProvider>
  );
}
