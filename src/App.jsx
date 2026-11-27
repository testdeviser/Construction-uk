import { Navigate, Route, Routes, useLocation } from 'react-router';
import Header, { Topbar } from './components/Header';
import Footer from './components/Footer';
import { PageMeta, ScrollManager, ServicesProvider } from './components/common';
import HomePage from './views/HomePage';
import AboutPage from './views/AboutPage';
import ProjectsPage from './views/ProjectsPage';
import ContactPage from './views/ContactPage';

/* Site layout: topbar, header and footer stay on screen; the page in <main> changes with the URL.
   URLs and tab titles live in src/pages.js – add a page there and here. */
export default function App() {
  const { pathname } = useLocation();
  return (
    <ServicesProvider>
      <ScrollManager />
      <PageMeta />
      <Topbar />
      <Header />
      {/* key: a fresh <main> per page so entrance animations replay */}
      <main key={pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </ServicesProvider>
  );
}
