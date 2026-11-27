import Header, { Topbar } from './components/Header';
import Footer from './components/Footer';
import PageHero from './components/PageHero';
import CtaBanner from './components/CtaBanner';
import { ServicesProvider } from './components/common';
import { aboutPage } from './data/site';
import { MissionVision, Partners, WhoWeAre, WhyUs } from './components/about/AboutSections';

/* About Us page (about.html) – shares the header, footer and styles with the homepage */
export default function AboutApp() {
  return (
    <ServicesProvider>
      <Topbar />
      <Header />
      <main>
        <PageHero data={aboutPage.hero} />
        <WhoWeAre />
        <MissionVision />
        <WhyUs />
        <Partners />
        <CtaBanner data={aboutPage.cta} />
      </main>
      <Footer />
    </ServicesProvider>
  );
}
