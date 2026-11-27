/* =========================================================
   Site pages: URL, menu key, browser-tab title and search description.
   Used by the app (React Router) AND by vite.config.js, which writes a
   real folder per page at build time (about/index.html …) so that
   opening or refreshing /about works on the server without rewrite rules.
   Plain JS (no JSX) so vite.config.js can import it.
   ========================================================= */
export const SITE_TITLE = 'Building & Home Renovation Services UK';

export const pages = [
  {
    path: '/', page: 'home',
    title: SITE_TITLE,
    description: 'Transform your home with building, renovation, roofing, kitchen, bathroom, garden, driveway and property repair services.',
  },
  {
    path: '/about', page: 'about',
    title: `About Us | ${SITE_TITLE}`,
    description: 'Building better homes and creating better spaces: comprehensive building, renovation and property improvement solutions to transform your house into a home that works for you.',
  },
  {
    path: '/projects', page: 'projects',
    title: `Our Projects | ${SITE_TITLE}`,
    description: 'Explore our building, renovation, kitchen, bathroom, roofing, loft, garden and driveway projects, and see how property improvements can transform a home.',
  },
  /* Service pages: page 'services' highlights "Services" in the menu; `slug` picks the content in servicePages (data/site.jsx) */
  {
    path: '/services/building-renovations', page: 'services', slug: 'building-renovations',
    title: `Building & Renovations | ${SITE_TITLE}`,
    description: 'Complete house rebuilds and home renovations designed around your needs and lifestyle – building solutions that transform your property from the ground up.',
  },
  {
    path: '/services/kitchen-bathroom', page: 'services', slug: 'kitchen-bathroom',
    title: `Kitchen & Bathroom | ${SITE_TITLE}`,
    description: 'Create practical, stylish and comfortable spaces with kitchen and bathroom renovation solutions designed around the way you live.',
  },
  {
    path: '/services/roofing-loft', page: 'services', slug: 'roofing-loft',
    title: `Roofing & Loft Solutions | ${SITE_TITLE}`,
    description: "Improve your property's protection and maximise unused space with roofing services and loft storage installations.",
  },
  {
    path: '/services/gardens-driveways', page: 'services', slug: 'gardens-driveways',
    title: `Gardens & Driveways | ${SITE_TITLE}`,
    description: "Enhance your outdoor living space and your property's kerb appeal with garden improvements and driveway installations.",
  },
  {
    path: '/services/windows-installation', page: 'services', slug: 'windows-installation',
    title: `Windows & Installation | ${SITE_TITLE}`,
    description: "Refresh your property's appearance, comfort and functionality with window installation and replacement services.",
  },
  {
    path: '/services/repairs-maintenance', page: 'services', slug: 'repairs-maintenance',
    title: `Repairs & Maintenance | ${SITE_TITLE}`,
    description: 'Keep your property in good condition with general repairs and ongoing home maintenance solutions.',
  },
  {
    path: '/privacy-policy', page: 'privacy',
    title: `Privacy Policy | ${SITE_TITLE}`,
    description: 'How we collect, use and protect your personal information when you use our website or contact us about your project.',
  },
  {
    path: '/terms-conditions', page: 'terms',
    title: `Terms & Conditions | ${SITE_TITLE}`,
    description: 'The terms that apply when you use our website and request a quote for building, renovation or property improvement work.',
  },
  {
    path: '/contact', page: 'contact',
    title: `Contact Us | ${SITE_TITLE}`,
    description: 'Get in touch to discuss your building, renovation or property improvement project and request a free, no-obligation quote.',
  },
];

export const pageByPath = (pathname) => {
  const p = pathname.replace(/\/+$/, '') || '/';
  return pages.find((x) => x.path === p) || pages[0];
};
