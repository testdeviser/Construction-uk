import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import ContactApp from './ContactApp.jsx';
import { scrollToHash } from './components/common';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactApp />
  </StrictMode>
);
scrollToHash();
