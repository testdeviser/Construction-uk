import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import { scrollToHash } from './components/common';
import AboutApp from './AboutApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutApp />
  </StrictMode>
);
scrollToHash();
