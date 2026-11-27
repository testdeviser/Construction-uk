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
