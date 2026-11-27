import Header, { Topbar } from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Promo from './components/Promo';
import Why from './components/Why';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Faqs from './components/Faqs';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import { ServicesProvider } from './components/common';

export default function App() {
  return (
    <ServicesProvider>
      <Topbar />
      <Header />
      <main>
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
      </main>
      <Footer />
    </ServicesProvider>
  );
}
