import PageHero from '../components/PageHero';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import CtaBanner from '../components/CtaBanner';
import ServiceCards from '../components/projects/ServiceCards';
import { projectsPage } from '../data/site';

/* Our Projects page (/projects) – reuses the homepage gallery, process and testimonials */
export default function ProjectsPage() {
  return (
    <>
      <PageHero data={projectsPage.hero} />
      <Projects head={projectsPage.gallery} showMore={false} />
      <ServiceCards />
      <Process />
      <Testimonials />
      <CtaBanner data={projectsPage.cta} />
    </>
  );
}
