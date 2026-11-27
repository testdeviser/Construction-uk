import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Promo from '../components/Promo';
import Why from '../components/Why';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Faqs from '../components/Faqs';
import FinalCta from '../components/FinalCta';

/* Homepage (/) */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Promo />
      <Why />
      <Projects />
      <Process />
      <Testimonials />
      <Faqs />
      <FinalCta />
    </>
  );
}
