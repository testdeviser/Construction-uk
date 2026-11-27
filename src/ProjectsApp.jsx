import Header, { Topbar } from './components/Header';
import Footer from './components/Footer';
import PageHero from './components/PageHero';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/CtaBanner';
import ServiceCards from './components/projects/ServiceCards';
import { ServicesProvider } from './components/common';
import { projectsPage } from './data/site';

/* Our Projects page (projects.html) – reuses the homepage gallery, process and testimonials */
export default function ProjectsApp() {
  return (
    <ServicesProvider>
      <Topbar />
      <Header />
      <main>
        <PageHero data={projectsPage.hero} />
        <Projects head={projectsPage.gallery} showMore={false} />
        <ServiceCards />
        <Process />
        <Testimonials />
        <CtaBanner data={projectsPage.cta} />
      </main>
      <Footer />
    </ServicesProvider>
  );
}
