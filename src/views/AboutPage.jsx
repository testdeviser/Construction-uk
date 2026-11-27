import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { aboutPage } from '../data/site';
import { MissionVision, Partners, WhoWeAre, WhyUs } from '../components/about/AboutSections';

/* About Us page (/about) – header, footer and styles are shared via App.jsx */
export default function AboutPage() {
  return (
    <>
      <PageHero data={aboutPage.hero} />
      <WhoWeAre />
      <MissionVision />
      <WhyUs />
      <Partners />
      <CtaBanner data={aboutPage.cta} />
    </>
  );
}
