/* Shared SVG icons used across the homepage */

export const ArrowRight = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const ArrowLeft = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10H5m4.5-4.5L5 10l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);

export const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 6l9 7 9-7" /></svg>
);

export const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);

export const Star = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" /></svg>
);

export const LogoMark = () => (
  <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 4 3 17.5h5.5V36h23V17.5H37L20 4Z" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
    <rect x="15" y="23" width="10" height="13" rx="1" fill="var(--accent)" />
  </svg>
);

/* Simple 24x24 stroke icon from a single path */
export const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);

export const socialIcons = {
  X: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z',
  Facebook: 'M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63A21 21 0 0 0 14.25 4.5c-2.25 0-3.79 1.37-3.79 3.9v2.16H7.92v2.94h2.54V21h3.04Z',
  YouTube: 'M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z',
  Instagram: 'M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3Zm0 7.76A3.06 3.06 0 1 1 15.06 12 3.06 3.06 0 0 1 12 15.06Zm5.99-7.95a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1ZM21.1 8.2a5.43 5.43 0 0 0-1.48-3.84A5.46 5.46 0 0 0 15.78 2.9C14.27 2.8 9.73 2.8 8.22 2.9a5.45 5.45 0 0 0-3.84 1.47A5.44 5.44 0 0 0 2.9 8.2c-.09 1.52-.09 6.06 0 7.58a5.43 5.43 0 0 0 1.48 3.84 5.47 5.47 0 0 0 3.84 1.48c1.51.09 6.05.09 7.56 0a5.43 5.43 0 0 0 3.84-1.48 5.46 5.46 0 0 0 1.48-3.84c.09-1.52.09-6.05 0-7.57Zm-1.96 9.2a3.1 3.1 0 0 1-1.75 1.75c-1.21.48-4.08.37-5.39.37s-4.19.1-5.39-.37a3.1 3.1 0 0 1-1.75-1.75C4.38 16.2 4.5 13.3 4.5 12s-.11-4.2.36-5.4a3.1 3.1 0 0 1 1.75-1.75C7.82 4.37 10.69 4.48 12 4.48s4.19-.1 5.39.37a3.1 3.1 0 0 1 1.75 1.75c.48 1.2.37 4.1.37 5.4s.11 4.2-.37 5.4Z',
};

export const SocialList = ({ className }) => (
  <ul className={className} aria-label="Social media">
    {Object.entries(socialIcons).map(([name, d]) => (
      <li key={name}>
        <a href="#" aria-label={name}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
        </a>
      </li>
    ))}
  </ul>
);
