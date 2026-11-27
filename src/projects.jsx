import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import { scrollToHash } from './components/common';
import ProjectsApp from './ProjectsApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectsApp />
  </StrictMode>
);
scrollToHash();
