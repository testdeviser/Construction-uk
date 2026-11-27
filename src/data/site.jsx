/* =========================================================
   All homepage content lives here.
   Edit this file to change text, images, services, projects etc.
   NOTE: 020 7946 0123 and info@example.com are DUMMY contact details
   (Ofcom drama-range number / reserved example domain). Replace before launch.
   ========================================================= */

const img = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const company = {
  name: 'Company Name',
  sub: 'Building & Renovations',
  tagline: 'Building & Renovation Specialists Across the UK',
  phone: '020 7946 0123',
  phoneHref: 'tel:+442079460123',
  email: 'info@example.com',
  address: '[Company Address]',
};

/* `page` marks which page a link belongs to (highlights it in the menu).
   Links starting with / are pages; links starting with # point at homepage sections (on other pages they lead back to the homepage). */
export const navLinks = [
  { label: 'Home', href: '#home', page: 'home' },
  { label: 'About Us', href: '/about', page: 'about' },
  { label: 'Services', dropdown: true },
  { label: 'Our Projects', href: '/projects', page: 'projects' },
  { label: 'Contact Us', href: '/contact', page: 'contact' },
];

/* Icon paths (24x24, stroked) */
export const icons = {
  house: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-5h4v5',
  bath: 'M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3ZM6 11V6a2 2 0 0 1 4 0M8 19l-1 2M16 19l1 2',
  roof: 'M2 14 12 5l10 9M6 11v2M18 11v2M15 7.5V4h3v6.2M8 17h8M10 20h4',
  leaf: 'M12 21v-8M12 13c-4 0-6-3-6-7 4 0 6 3 6 7Zm0 0c4 0 6-3 6-7-4 0-6 3-6 7Z',
  window: 'M5 3h14v18H5zM12 3v18M5 12h14',
  wrench: 'M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.4-.4-2.6 2.4-2.4Z',
};

export const services = [
  {
    // `href`: the service's own page (see servicePages below). Services without one link to the quote form.
    title: 'Building & Renovations', icon: icons.house, href: '/services/building-renovations',
    image: img('1674649207083-281c2517ab49', 1100), alt: 'Builders working on a house renovation',
    text: 'Transform your property with complete house rebuilds and home renovations designed around your needs and lifestyle.',
    tags: ['Full House Rebuilds', 'Complete Home Renovations'],
  },
  {
    title: 'Kitchen & Bathroom', icon: icons.bath, href: '/services/kitchen-bathroom',
    image: img('1600489000022-c2086d79f9d4', 1100), alt: 'Renovated kitchen with white and wood cabinets',
    text: 'Create practical, stylish and comfortable spaces with kitchen and bathroom renovation solutions.',
    tags: ['Kitchen Renovations', 'Bathroom Renovations'],
  },
  {
    title: 'Roofing & Loft Solutions', icon: icons.roof, href: '/services/roofing-loft',
    image: img('1763665814538-8ba04597286c', 1100), alt: 'Roofers installing new roof tiles',
    text: "Improve your property's protection and maximise unused space with roofing services and loft storage installations.",
    tags: ['Roofing', 'Loft Storage & Installation'],
  },
  {
    title: 'Gardens & Driveways', icon: icons.leaf, href: '/services/gardens-driveways',
    image: img('1668120089662-42642838cfef', 1100), alt: 'Landscaped garden lawn with shrubs and trees',
    text: "Enhance your outdoor living space and property's kerb appeal with garden improvements and driveway installations.",
    tags: ['Garden Improvements', 'Driveway Installation'],
  },
  {
    title: 'Windows & Installation', icon: icons.window, href: '/services/windows-installation',
    image: img('1604166167486-af78ebd50897', 1100), alt: 'White framed window on a brick house',
    text: "Refresh your property's appearance, comfort and functionality with window installation and replacement services.",
    tags: ['Window Installation', 'Window Replacement'],
  },
  {
    title: 'Repairs & Maintenance', icon: icons.wrench, href: '/services/repairs-maintenance',
    image: img('1581783898377-1c85bf937427', 1100), alt: 'Hammer and screwdriver for property repairs',
    text: 'Keep your property in good condition with general repairs and ongoing home maintenance solutions.',
    tags: ['General Property Repairs', 'Home Maintenance'],
  },
];

export const heroSlides = [
  { image: img('1732721176814-c0bc82db3971', 2000), alt: 'Red brick British house with white windows', label: 'Complete Home Renovations' },
  { image: img('1588854337236-6889d631faa8', 2000), alt: 'Modern kitchen with grey cabinets and marble worktops', label: 'Kitchen Renovations' },
  { image: img('1763485956310-55f3c0e822d5', 2000), alt: 'Modern bathroom with stone tiles and wooden vanity', label: 'Bathroom Renovations' },
];

export const about = {
  imgMain: { src: img('1768839725085-829e6ac7ac26', 1000), alt: 'Plasterer finishing an interior wall during a home renovation' },
  imgSmall: { src: img('1556911220-bff31c812dba', 700), alt: 'Modern white kitchen with a marble island' },
  tags: ['Structural Rebuilds', 'Interior Renovations', 'Outdoor Improvements', 'General Repairs'],
  highlights: [
    { label: 'Comprehensive Building Solutions', svg: <path d={icons.house} /> },
    { label: 'Attention to Every Detail', svg: <><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5M11 8.5v5M8.5 11h5" /></> },
    { label: 'Interior & Exterior Improvements', svg: <path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6M2 20h20" /> },
    { label: 'Customer-Focused Approach', svg: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></> },
  ],
};

export const promoImage = img('1772442198624-4fc4d7281e89', 2000);

export const why = {
  image: { src: img('1778438387226-73b14195c492', 1000), alt: 'House under construction with scaffolding and brickwork' },
  cards: [
    { title: 'Quality Workmanship', text: 'A focus on care, precision and attention to detail throughout your project.', icon: 'm12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z' },
    { title: 'Complete Property Solutions', text: 'A comprehensive range of interior and exterior building services in one place.', icon: icons.house },
    { title: 'Tailored Approach', text: "Solutions designed around your property's requirements, preferences and budget.", icon: 'M4 7h10M18 7h2M4 17h4M12 17h8M14 4.5v5M8 14.5v5' },
    { title: 'Clear Communication', text: 'Keeping you informed throughout the different stages of your project.', icon: 'M4 5h16v11H9l-5 4V5ZM8 9.5h8M8 12.5h5' },
    { title: 'Practical Solutions', text: 'Creating spaces that balance appearance, functionality and everyday comfort.', icon: icons.wrench },
    { title: 'Customer-Focused Service', text: 'Putting your requirements at the centre of every home improvement project.', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0' },
  ],
};

export const projectFilters = [
  { key: 'all', label: 'All Projects' },
  { key: 'renovation', label: 'Home Renovations' },
  { key: 'kitchen', label: 'Kitchens & Bathrooms' },
  { key: 'roofing', label: 'Roofing & Loft Storage' },
  { key: 'garden', label: 'Gardens & Driveways' },
];

const catLabel = Object.fromEntries(projectFilters.map((f) => [f.key, f.label]));

export const projects = [
  { cat: 'renovation', image: img('1598307754921-da47ead0ad5f', 800), alt: 'Renovated brick house with a white front door' },
  { cat: 'kitchen', image: img('1617228069096-4638a7ffc906', 800), alt: 'Modern kitchen with island and large window' },
  { cat: 'garden', image: img('1782594700873-bbeefef37e11', 1200), alt: 'House with a winding driveway and manicured lawn' },
  { cat: 'roofing', image: img('1792628952403-2e6db62a9e76', 800), alt: 'Converted loft room with light wood flooring' },
  { cat: 'kitchen', image: img('1584622650111-993a426fbf0a', 800), alt: 'Modern bathroom with shower and vanity' },
  { cat: 'renovation', image: img('1583847268964-b28dc8f51f92', 800), alt: 'Renovated living room with a large window' },
  { cat: 'garden', image: img('1711098256664-d2ea62e6e376', 1200), alt: 'Brick house with a new driveway' },
  { cat: 'roofing', image: img('1763665814965-b5c4b3547908', 800), alt: 'New roof tiles being installed on a house' },
].map((p, i) => ({ ...p, id: i + 1, title: 'Project Title', catLabel: catLabel[p.cat] }));

export const processSteps = [
  {
    title: 'Initial Consultation', text: 'We discuss your requirements, ideas and expectations to understand your project.',
    svg: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" /><path d="M8.5 8.5h7M8.5 11.5h4.5" /></>,
  },
  {
    title: 'Planning & Quotation', text: 'We establish the scope of work and discuss suitable solutions and estimated costs.',
    svg: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 3.5V2.5h6v1M8.5 9h7M8.5 12.5h7M8.5 16h4" /></>,
  },
  {
    title: 'Project Execution', text: 'The agreed building, renovation or improvement work gets underway.',
    svg: <><path d="M3.5 17.5h17M5.5 17.5v-3a6.5 6.5 0 0 1 13 0v3" /><path d="M10 8.3V6a2 2 0 0 1 4 0v2.3M3.5 20.5h17" /></>,
  },
  {
    title: 'Completion & Review', text: 'We review the completed work with you and address any outstanding requirements.',
    svg: <><circle cx="12" cy="12" r="8.5" /><path d="M8.2 12.3l2.6 2.6 5-5.3" /></>,
  },
];

/* SAMPLE reviews (dummy names, places and quotes) for layout only.
   Replace with genuine testimonials before launch and set `sample: false`.
   Add a real video URL in `video` (and optionally `poster`). */
export const testimonials = [
  { name: 'Sarah M.', initials: 'SM', location: 'Guildford, Surrey', service: 'Kitchen & Bathroom', video: '', sample: true,
    text: 'From the first visit to the final walk-through, everything was explained clearly. Our kitchen renovation finished on schedule and the attention to detail is brilliant.' },
  { name: 'James & Priya K.', initials: 'JK', location: 'St Albans, Hertfordshire', service: 'Building & Renovations', video: '', sample: true,
    text: 'They transformed our tired 1930s semi into a home we love. The team kept us updated every week and left the site tidy each evening.' },
  { name: 'David R.', initials: 'DR', location: 'Reading, Berkshire', service: 'Roofing & Loft Solutions', video: '', sample: true,
    text: 'Our loft is now proper storage instead of a dusty void, and the roof repairs were done at the same time. A really straightforward process from start to finish.' },
  { name: 'Helen T.', initials: 'HT', location: 'Sevenoaks, Kent', service: 'Gardens & Driveways', video: '', sample: true,
    text: 'The new driveway and garden have completely changed the front of the house. Neighbours keep stopping to ask who did the work.' },
  { name: 'Mark & Lucy B.', initials: 'MB', location: 'Chelmsford, Essex', service: 'Windows & Installation', video: '', sample: true,
    text: 'Quick to respond, a clear quotation and a quality finish on our replacement windows. The house already feels warmer and quieter.' },
];

/* FAQs: `col` = which column (0 = left, 1 = right) */
export const faqs = [
  { col: 0, q: 'What Building and Home Improvement Services Do You Offer?', a: 'Our services include full house rebuilds, complete renovations, kitchen and bathroom improvements, roofing, loft storage, windows, gardens, driveways and general property repairs.' },
  { col: 0, q: 'Do You Undertake Both Large and Small Projects?', a: 'Our range of services covers everything from complete property rebuilds and renovations to individual home improvements and general repairs.' },
  { col: 0, q: 'Can I Renovate My Kitchen and Bathroom as Part of a Larger Project?', a: 'Yes, kitchen and bathroom renovations can form part of a wider home improvement project, depending on your requirements.' },
  { col: 0, q: 'Do You Provide Outdoor Property Improvements?', a: "Yes, our outdoor services include garden improvements and driveway installations to enhance your property's appearance and functionality." },
  { col: 1, q: 'How Much Will My Home Renovation Cost?', a: 'The cost depends on the size of your property, materials, project requirements and scope of work. Contact us to discuss your project and request a quotation.' },
  { col: 1, q: 'Will My Project Require Planning Permission?', a: 'Some building and renovation projects may require planning permission or Building Regulations approval. Requirements depend on the property, location and proposed work.' },
  { col: 1, q: 'How Do I Get Started?', a: 'Contact us with details of your project so we can discuss your requirements and the next steps.' },
];

export const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
];

/* =========================================================
   ABOUT US page (/about)
   ========================================================= */
export const aboutPage = {
  hero: {
    eyebrow: 'About Us',
    title: ['Building Better Homes.', 'Creating Better Spaces.'],
    text: 'Providing comprehensive building, renovation and property improvement solutions to transform your house into a home that works for you.',
    image: img('1732721176814-c0bc82db3971', 2000),
    alt: 'Red brick British house with white windows',
  },

  whoWeAre: {
    eyebrow: 'Get to Know Us',
    title: 'Your Partner in Building & Home', accent: 'Improvements',
    lead: 'We are a building and property improvement company committed to creating functional, comfortable and beautifully finished homes.',
    paragraphs: [
      'From complete house rebuilds and renovations to kitchens, bathrooms, roofing, loft storage, windows, gardens, driveways and general repairs, we offer comprehensive solutions for your property.',
      "Whether you're planning a major transformation or a small improvement, our approach focuses on quality workmanship, attention to detail and understanding your individual requirements.",
    ],
    cta: 'Explore Our Services',
    imgMain: { src: img('1674649207083-281c2517ab49', 1000), alt: 'Builders working on a house renovation' },
    imgSmall: { src: img('1600489000022-c2086d79f9d4', 700), alt: 'Renovated kitchen with white and wood cabinets' },
    // the services named in the copy, shown as tags over the photo
    tags: ['Rebuilds & Renovations', 'Kitchens & Bathrooms', 'Roofing & Lofts', 'Gardens & Driveways'],
  },

  missionVision: {
    eyebrow: 'What Drives Us',
    title: 'Building With', accent: 'Purpose',
    items: [
      {
        label: 'Our Mission',
        text: 'To provide dependable building and renovation solutions that enhance the comfort, functionality and value of every home.',
        svg: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
      },
      {
        label: 'Our Vision',
        text: 'To become a trusted name in home improvements by creating lasting spaces through quality workmanship and customer-focused service.',
        svg: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
      },
    ],
  },

  whyUs: {
    eyebrow: 'Our Commitment to You',
    title: 'Built on Quality, Care and', accent: 'Commitment',
    cards: [
      { title: 'Quality Workmanship', text: 'Care and precision in every aspect of your project.', icon: 'm12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z' },
      { title: 'Complete Property Solutions', text: 'A comprehensive range of building and home improvement services under one roof.', icon: icons.house },
      { title: 'Tailored Approach', text: 'Practical solutions that suit your property, lifestyle and budget.', icon: 'M4 7h10M18 7h2M4 17h4M12 17h8M14 4.5v5M8 14.5v5' },
      { title: 'Clear Communication', text: 'Open and transparent communication throughout your project.', icon: 'M4 5h16v11H9l-5 4V5ZM8 9.5h8M8 12.5h5' },
    ],
  },

  partners: {
    eyebrow: 'Stronger Together',
    title: 'Building Better Through Trusted', accent: 'Partnerships',
    text: 'We believe exceptional results begin with quality materials and strong partnerships. By working with reliable suppliers and industry partners, we aim to bring dependable products and practical solutions to every project.',
    // PLACEHOLDERS – add each partner's `logo` (image URL) and real `name` before launch
    logos: Array.from({ length: 6 }, (_, i) => ({ name: `Partner Logo ${String(i + 1).padStart(2, '0')}`, logo: '' })),
  },

  cta: {
    eyebrow: "Let's Get Started",
    title: 'Your Vision. Our', accent: 'Commitment.',
    text: "From minor repairs to complete home transformations, we're here to help bring your ideas to life.",
    primary: 'Get a Free Quote',
    secondary: 'Contact Us',
  },
};

/* =========================================================
   CONTACT US page (/contact)
   Copy written to match the rest of the site – edit freely.
   Phone, email and address come from `company` at the top of this file.
   ========================================================= */
export const contactPage = {
  hero: {
    eyebrow: 'Contact Us',
    title: ["Let's Talk About", 'Your Next Project.'],
    text: "Whether you're planning a complete renovation or a small repair, get in touch to discuss your requirements and request a free, no-obligation quote.",
    image: img('1588854337236-6889d631faa8', 2000),
    alt: 'Modern kitchen with grey cabinets and marble worktops',
  },

  // three quick ways to get in touch (values filled from `company`)
  options: [
    { key: 'phone', label: 'Call Us', note: 'Speak to us about your project', icon: 'phone' },
    { key: 'email', label: 'Email Us', note: "Send us your project details and we'll respond", icon: 'mail' },
    { key: 'address', label: 'Visit Us', note: 'Find us at our office', icon: 'pin' },
  ],

  // the quote form section
  enquiry: {
    eyebrow: 'Free Quote',
    title: 'Tell Us About Your', accent: 'Project',
    text: 'Complete the short form below and we will get back to you to discuss your requirements and the next steps.',
    perks: [
      { icon: 'tag', title: 'Free, No-Obligation Quote', text: 'Find out what your project involves' },
      { icon: 'steps', title: 'Just 3 Quick Steps', text: 'Service, your details and your project' },
      { icon: 'shield', title: 'Your Details Stay Private', text: 'See our Privacy Policy', link: { href: '/privacy-policy' } },
    ],
  },

  location: {
    eyebrow: 'Find Us',
    title: 'Building & Renovation Specialists Across the', accent: 'UK',
    text: 'From complete house rebuilds to everyday repairs, we provide building and home improvement solutions for properties across the UK.',
    // PLACEHOLDERS – replace with your real opening hours before launch
    hours: [
      { day: 'Monday – Friday', time: '[Opening Hours]' },
      { day: 'Saturday', time: '[Opening Hours]' },
      { day: 'Sunday', time: '[Opening Hours]' },
    ],
    // Paste a Google Maps embed URL here (Share › Embed a map › copy the src="…" value) to show a live map
    mapEmbed: '',
  },
};

/* =========================================================
   OUR PROJECTS page (/projects)
   The gallery itself uses `projects` and `projectFilters` above –
   add real project titles / photos there and they show on both pages.
   ========================================================= */
export const projectsPage = {
  hero: {
    eyebrow: 'Our Projects',
    title: ['Turning Ideas Into', 'Beautiful Spaces.'],
    text: 'Explore how building, renovation and property improvements can transform the way a home looks, feels and functions.',
    image: img('1598307754921-da47ead0ad5f', 2000),
    alt: 'Renovated brick house with a white front door',
  },

  gallery: {
    eyebrow: 'Explore Our Work',
    title: 'A Look at Our Recent', accent: 'Projects',
    text: 'From complete renovations and kitchens to roofing, loft storage, gardens and driveways – filter by category and select any project to view it in full.',
  },

  services: {
    eyebrow: 'What We Work On',
    title: 'Complete Solutions for Every Part of Your', accent: 'Home',
    text: 'From the foundations to the roof, our projects cover a comprehensive range of building, renovation and property improvement services.',
  },

  cta: {
    eyebrow: 'Have a Project in Mind?',
    title: "Let's Bring Your Ideas to", accent: 'Life.',
    text: "Whether it's a complete renovation or a small property improvement, we're here to help you take the next step.",
    primary: 'Get a Free Quote',
    secondary: 'Contact Us',
  },
};

/* =========================================================
   SERVICE PAGES (/services/<slug>)
   One entry per service page – all use the same layout (src/views/ServicePage.jsx).
   To add another service page: copy this entry, give it a new key (the URL slug),
   add `href` to that service in `services` above, and add the URL to src/pages.js.
   Copy written to match the rest of the site – edit freely.
   ========================================================= */
export const servicePages = {
  'building-renovations': {
    service: 'Building & Renovations',   // must match the title in `services` (used for "Other Services")

    hero: {
      eyebrow: 'Building & Renovations',
      title: ['Complete Rebuilds &', 'Home Renovations.'],
      text: 'Transform your property with complete house rebuilds and home renovations designed around your needs and lifestyle.',
      image: img('1674649207083-281c2517ab49', 2000),
      alt: 'Builders working on a house renovation',
    },

    overview: {
      eyebrow: 'Service Overview',
      title: 'Transforming Your Property From the', accent: 'Ground Up',
      lead: "Whether your property needs a complete rebuild or a full renovation, we provide building solutions that create a home that's functional, comfortable and built around your lifestyle.",
      text: 'From structural rebuild work to interior transformations, our approach focuses on quality workmanship, attention to detail and understanding your individual requirements at every stage of the project.',
    },

    offerings: {
      eyebrow: 'What We Offer',
      title: 'Our Building & Renovation', accent: 'Services',
      text: 'Two ways to transform your property – choose the approach that suits your home, your plans and your budget.',
      items: [
        {
          title: 'Full House Rebuilds', icon: icons.house,
          text: "When a property needs more than a refresh, a complete rebuild lets you create the home you want – with a layout, structure and finish designed around the way you live.",
          image: img('1598307754921-da47ead0ad5f', 1100), alt: 'Renovated brick house with a white front door',
          points: ['Planning the scope of work with you', 'Structural building work', 'Interior and exterior finishing', 'A home designed around your lifestyle'],
        },
        {
          title: 'Complete Home Renovations', icon: 'M4 4h13v5H4zM17 6.5h3v6h-8v3M10.5 15.5h3V21h-3z',  // paint roller
          text: 'Bring new life to your existing home with a renovation that improves the way it looks, feels and functions – whether that means one room or the whole property.',
          image: img('1617228069096-4638a7ffc906', 1100), alt: 'Modern kitchen with island and large window',
          points: ['Whole-home or room-by-room renovation', 'Layout and interior improvements', 'Kitchen and bathroom renovations', 'Quality finishes throughout'],
        },
      ],
    },

    benefits: {
      eyebrow: 'Why Renovate?',
      title: 'Create a Home That Works Better for', accent: 'You',
      cards: [
        { title: 'Improved Comfort', text: 'Create spaces that feel better to live in, every day.', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0' },
        { title: 'Better Functionality', text: 'Layouts and spaces that suit the way you use your home.', icon: 'M4 7h10M18 7h2M4 17h4M12 17h8M14 4.5v5M8 14.5v5' },
        { title: 'Refreshed Appearance', text: 'A finish that transforms the look of your property inside and out.', icon: 'm12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z' },
        { title: 'Added Value', text: 'Improvements that can enhance the value of your home.', icon: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-5h4v5' },
      ],
    },

    faqs: {
      eyebrow: 'Building & Renovation FAQs',
      title: 'Questions About Your', accent: 'Project',
      // `col` = which column (0 = left, 1 = right)
      items: [
        { col: 0, q: 'Do You Carry Out Full House Rebuilds?', a: 'Yes, our building services include complete house rebuilds as well as full home renovations, depending on your property and requirements.' },
        { col: 0, q: 'Can a Renovation Be Done Room by Room?', a: 'Yes, a renovation can cover a single room, several rooms or the complete property – we discuss what suits your home, plans and budget.' },
        { col: 0, q: 'Can Kitchens and Bathrooms Be Part of My Renovation?', a: 'Yes, kitchen and bathroom renovations can form part of a wider home improvement project, depending on your requirements.' },
        { col: 1, q: 'Will My Project Require Planning Permission?', a: 'Some building and renovation projects may require planning permission or Building Regulations approval. Requirements depend on the property, location and proposed work.' },
        { col: 1, q: 'How Much Will My Renovation Cost?', a: 'The cost depends on the size of your property, materials, project requirements and scope of work. Contact us to discuss your project and request a quotation.' },
        { col: 1, q: 'How Do I Get Started?', a: 'Contact us with details of your project so we can discuss your requirements and the next steps.' },
      ],
    },

    others: {
      eyebrow: 'Explore More',
      title: 'Our Other', accent: 'Services',
      text: 'From kitchens and bathrooms to roofing, gardens and repairs – complete solutions for every part of your home.',
    },
  },

  /* ---------------------------------------------------------
     Kitchen & Bathroom
     --------------------------------------------------------- */
  'kitchen-bathroom': {
    service: 'Kitchen & Bathroom',

    hero: {
      eyebrow: 'Kitchen & Bathroom',
      title: ['Kitchens & Bathrooms', 'Made for Living.'],
      text: 'Create practical, stylish and comfortable spaces with kitchen and bathroom renovation solutions designed around the way you live.',
      image: img('1588854337236-6889d631faa8', 2000),
      alt: 'Modern kitchen with grey cabinets and marble worktops',
    },

    overview: {
      eyebrow: 'Service Overview',
      title: 'Spaces You Use Every Day, Designed', accent: 'Around You',
      lead: 'Kitchens and bathrooms are two of the most used rooms in any home. We renovate them to be practical, comfortable and beautifully finished – spaces that work for your household every day.',
      text: 'From layout changes to fittings and finishes, our approach focuses on quality workmanship, attention to detail and understanding how you want to use each space.',
    },

    offerings: {
      eyebrow: 'What We Offer',
      title: 'Our Kitchen & Bathroom', accent: 'Services',
      text: 'Renovate one room or both – as a standalone project or as part of a wider home improvement.',
      items: [
        {
          title: 'Kitchen Renovations', icon: 'M4 3h16v18H4zM4 9h16M8 6h.01M12 6h.01M9 13h6v4H9z',  // cooker
          text: 'Transform the heart of your home with a kitchen renovation that improves the layout, storage and finish – a space that suits the way you cook, eat and live.',
          image: img('1617228069096-4638a7ffc906', 1100), alt: 'Modern kitchen with island and large window',
          points: ['Planning the layout with you', 'Units, worktops and storage', 'Fitting and finishing', 'A kitchen designed around your routine'],
        },
        {
          title: 'Bathroom Renovations', icon: icons.bath,
          text: 'Create a bathroom that feels fresh, comfortable and easy to use – from a simple update to a complete transformation of the room.',
          image: img('1763485956310-55f3c0e822d5', 1100), alt: 'Modern bathroom with stone tiles and wooden vanity',
          points: ['Complete bathroom transformations', 'Showers, baths and fittings', 'Tiling and finishing', 'Practical, comfortable spaces'],
        },
      ],
    },

    benefits: {
      eyebrow: 'Why Renovate?',
      title: 'Rooms That Work Better for', accent: 'You',
      cards: [
        { title: 'Everyday Comfort', text: 'Spaces that feel better to use, morning to night.', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0' },
        { title: 'Smarter Layouts', text: 'Make better use of the space you have.', icon: 'M4 7h10M18 7h2M4 17h4M12 17h8M14 4.5v5M8 14.5v5' },
        { title: 'A Stylish Finish', text: 'A fresh look that suits the rest of your home.', icon: 'm12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z' },
        { title: 'Added Value', text: 'Improvements that can enhance the value of your home.', icon: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-5h4v5' },
      ],
    },

    faqs: {
      eyebrow: 'Kitchen & Bathroom FAQs',
      title: 'Questions About Your', accent: 'Project',
      items: [
        { col: 0, q: 'Do You Renovate Both Kitchens and Bathrooms?', a: 'Yes, we provide both kitchen and bathroom renovations – as separate projects or together, depending on your requirements.' },
        { col: 0, q: 'Can I Change the Layout of My Kitchen?', a: 'In many cases, yes. We discuss what you would like to change and what suits your space, plans and budget.' },
        { col: 0, q: 'Can This Be Part of a Larger Renovation?', a: 'Yes, kitchen and bathroom renovations can form part of a wider home improvement project, depending on your requirements.' },
        { col: 1, q: 'Can You Update an Existing Bathroom Rather Than Replace It?', a: 'Yes, a renovation can range from updating fittings and finishes to a complete transformation of the room.' },
        { col: 1, q: 'How Much Will My Renovation Cost?', a: 'The cost depends on the size of the room, materials, fittings and scope of work. Contact us to discuss your project and request a quotation.' },
        { col: 1, q: 'How Do I Get Started?', a: 'Contact us with details of your project so we can discuss your requirements and the next steps.' },
      ],
    },

    others: {
      eyebrow: 'Explore More',
      title: 'Our Other', accent: 'Services',
      text: 'From complete renovations to roofing, gardens and repairs – complete solutions for every part of your home.',
    },
  },

  /* ---------------------------------------------------------
     Roofing & Loft Solutions
     --------------------------------------------------------- */
  'roofing-loft': {
    service: 'Roofing & Loft Solutions',

    hero: {
      eyebrow: 'Roofing & Loft Solutions',
      title: ['Protect Your Home.', 'Make the Most of It.'],
      text: "Improve your property's protection and maximise unused space with roofing services and loft storage installations.",
      image: img('1763665814538-8ba04597286c', 2000),
      alt: 'Roofers installing new roof tiles',
    },

    overview: {
      eyebrow: 'Service Overview',
      title: 'From the Roof Over Your Head to the Space', accent: 'Beneath It',
      lead: "Your roof protects everything beneath it, and your loft is often a home's most underused space. We help you look after one and make better use of the other.",
      text: 'From roofing work to practical loft storage, our approach focuses on quality workmanship, attention to detail and understanding your individual requirements.',
    },

    offerings: {
      eyebrow: 'What We Offer',
      title: 'Our Roofing & Loft', accent: 'Services',
      text: 'Keep your property protected and turn unused roof space into somewhere useful.',
      items: [
        {
          title: 'Roofing', icon: icons.roof,
          text: 'Keep your home protected with roofing work carried out with care – helping your property stay sound, dry and looking its best.',
          image: img('1763665814965-b5c4b3547908', 1100), alt: 'New roof tiles being installed on a house',
          points: ['Assessing your roof with you', 'Roof repairs and roofing work', 'Quality materials and finishing', 'Protection for your property'],
        },
        {
          title: 'Loft Storage & Installation', icon: 'M3 21h18M5 21V11l7-6 7 6v10M9 21v-4h6v4M9 13h6',  // house with loft
          text: 'Turn an unused loft into practical storage space – making better use of your home and freeing up room elsewhere.',
          image: img('1792628952403-2e6db62a9e76', 1100), alt: 'Converted loft room with light wood flooring',
          points: ['Loft storage installations', 'Making use of unused space', 'Practical, accessible storage', 'Tidy, quality finishing'],
        },
      ],
    },

    benefits: {
      eyebrow: 'Why It Matters',
      title: 'A Home That’s Protected and', accent: 'Practical',
      cards: [
        { title: 'Better Protection', text: 'Help keep your home sound, dry and secure.', icon: 'M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z' },
        { title: 'More Storage', text: 'Make use of space that would otherwise go unused.', icon: 'M3 7l9-4 9 4v10l-9 4-9-4V7ZM3 7l9 4 9-4M12 11v10' },
        { title: 'Kerb Appeal', text: 'A well-kept roof improves the look of your property.', icon: 'm12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z' },
        { title: 'Added Value', text: 'Improvements that can enhance the value of your home.', icon: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-5h4v5' },
      ],
    },

    faqs: {
      eyebrow: 'Roofing & Loft FAQs',
      title: 'Questions About Your', accent: 'Project',
      items: [
        { col: 0, q: 'What Roofing Work Do You Carry Out?', a: 'Our roofing services cover roofing work and repairs. Contact us with details of your roof so we can discuss what it needs.' },
        { col: 0, q: 'Can You Install Storage in My Loft?', a: 'Yes, we provide loft storage installations to help you make better use of your roof space, depending on your property.' },
        { col: 0, q: 'Can Roofing and Loft Work Be Done Together?', a: 'Yes, roofing and loft work can be carried out as part of the same project, depending on your requirements.' },
        { col: 1, q: 'Will My Project Require Planning Permission?', a: 'Some roofing and loft projects may require planning permission or Building Regulations approval. Requirements depend on the property, location and proposed work.' },
        { col: 1, q: 'How Much Will the Work Cost?', a: 'The cost depends on your property, materials, project requirements and scope of work. Contact us to discuss your project and request a quotation.' },
        { col: 1, q: 'How Do I Get Started?', a: 'Contact us with details of your project so we can discuss your requirements and the next steps.' },
      ],
    },

    others: {
      eyebrow: 'Explore More',
      title: 'Our Other', accent: 'Services',
      text: 'From complete renovations to kitchens, gardens and repairs – complete solutions for every part of your home.',
    },
  },

  /* ---------------------------------------------------------
     Gardens & Driveways
     --------------------------------------------------------- */
  'gardens-driveways': {
    service: 'Gardens & Driveways',

    hero: {
      eyebrow: 'Gardens & Driveways',
      title: ['Outdoor Spaces', 'That Make an Impression.'],
      text: "Enhance your outdoor living space and your property's kerb appeal with garden improvements and driveway installations.",
      image: img('1782594700873-bbeefef37e11', 2000),
      alt: 'House with a winding driveway and manicured lawn',
    },

    overview: {
      eyebrow: 'Service Overview',
      title: 'First Impressions Start', accent: 'Outside',
      lead: 'Your garden and driveway are the first things people see and an extension of your living space. We create outdoor areas that look great and are practical to use.',
      text: 'From garden improvements to new driveways, our approach focuses on quality workmanship, attention to detail and understanding how you want to use your outdoor space.',
    },

    offerings: {
      eyebrow: 'What We Offer',
      title: 'Our Garden & Driveway', accent: 'Services',
      text: 'Improve the space you relax in and the approach to your home – separately or as one project.',
      items: [
        {
          title: 'Garden Improvements', icon: icons.leaf,
          text: 'Create an outdoor space you will enjoy spending time in – with improvements designed around the way you want to use your garden.',
          image: img('1668120089662-42642838cfef', 1100), alt: 'Landscaped garden lawn with shrubs and trees',
          points: ['Planning your outdoor space with you', 'Garden improvements', 'Practical, usable areas', 'A space designed around your lifestyle'],
        },
        {
          title: 'Driveway Installation', icon: 'M7 21 10 3M17 21 14 3M12 5v2M12 10v2M12 15v2',  // road
          text: "Give your property a practical, attractive approach with a new driveway that improves access and adds to your home's kerb appeal.",
          image: img('1711098256664-d2ea62e6e376', 1100), alt: 'Brick house with a new driveway',
          points: ['New driveway installations', 'Improved access and parking', 'Quality materials and finishing', 'Enhanced kerb appeal'],
        },
      ],
    },

    benefits: {
      eyebrow: 'Why Improve Outside?',
      title: 'Outdoor Spaces That Work Better for', accent: 'You',
      cards: [
        { title: 'More Living Space', text: 'An outdoor area you can relax and spend time in.', icon: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' },
        { title: 'Easier Access', text: 'A practical approach and parking for your home.', icon: 'M4 7h10M18 7h2M4 17h4M12 17h8M14 4.5v5M8 14.5v5' },
        { title: 'Kerb Appeal', text: 'Make a great first impression from the street.', icon: 'm12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z' },
        { title: 'Added Value', text: 'Improvements that can enhance the value of your home.', icon: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-5h4v5' },
      ],
    },

    faqs: {
      eyebrow: 'Garden & Driveway FAQs',
      title: 'Questions About Your', accent: 'Project',
      items: [
        { col: 0, q: 'What Garden Improvements Do You Offer?', a: 'Our outdoor services include garden improvements designed around how you want to use your space. Contact us to discuss your ideas.' },
        { col: 0, q: 'Do You Install New Driveways?', a: "Yes, we provide driveway installations to improve access and your property's appearance." },
        { col: 0, q: 'Can I Have My Garden and Driveway Done Together?', a: 'Yes, garden and driveway work can be carried out as one project, depending on your requirements.' },
        { col: 1, q: 'Will My Driveway Need Planning Permission?', a: 'Some outdoor projects, including some driveways, may require planning permission. Requirements depend on the property, location and proposed work.' },
        { col: 1, q: 'How Much Will the Work Cost?', a: 'The cost depends on the size of the area, materials, project requirements and scope of work. Contact us to discuss your project and request a quotation.' },
        { col: 1, q: 'How Do I Get Started?', a: 'Contact us with details of your project so we can discuss your requirements and the next steps.' },
      ],
    },

    others: {
      eyebrow: 'Explore More',
      title: 'Our Other', accent: 'Services',
      text: 'From complete renovations to kitchens, roofing and repairs – complete solutions for every part of your home.',
    },
  },

  /* ---------------------------------------------------------
     Windows & Installation
     --------------------------------------------------------- */
  'windows-installation': {
    service: 'Windows & Installation',

    hero: {
      eyebrow: 'Windows & Installation',
      title: ['A Fresh View of', 'Your Home.'],
      text: "Refresh your property's appearance, comfort and functionality with window installation and replacement services.",
      image: img('1604166167486-af78ebd50897', 2000),
      alt: 'White framed window on a brick house',
    },

    overview: {
      eyebrow: 'Service Overview',
      title: 'Windows That Look Good and', accent: 'Work Well',
      lead: "Windows shape how your home looks from outside and how it feels inside. We install and replace windows to refresh your property's appearance, comfort and functionality.",
      text: 'From new installations to replacing tired windows, our approach focuses on quality workmanship, attention to detail and understanding your individual requirements.',
    },

    offerings: {
      eyebrow: 'What We Offer',
      title: 'Our Window', accent: 'Services',
      text: 'New windows where you need them, or replacements for the ones you have.',
      items: [
        {
          title: 'Window Installation', icon: icons.window,
          text: 'Bring more light and a fresh look to your home with new windows, fitted with care to suit your property.',
          image: img('1583847268964-b28dc8f51f92', 1100), alt: 'Renovated living room with a large window',
          points: ['Discussing your options with you', 'Careful installation', 'Neat, quality finishing', 'Windows to suit your property'],
        },
        {
          title: 'Window Replacement', icon: 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4',  // swap arrows
          text: "Replace tired or worn windows to refresh your property's appearance and improve comfort and everyday use.",
          image: img('1732721176814-c0bc82db3971', 1100), alt: 'Red brick British house with white windows',
          points: ['Replacing existing windows', 'Improved comfort and function', 'A refreshed appearance', 'Tidy, careful fitting'],
        },
      ],
    },

    benefits: {
      eyebrow: 'Why Upgrade?',
      title: 'Windows That Work Better for', accent: 'You',
      cards: [
        { title: 'Improved Comfort', text: 'Help your home feel more comfortable inside.', icon: 'M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0Z' },
        { title: 'More Natural Light', text: 'Brighter rooms that are nicer to spend time in.', icon: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' },
        { title: 'Refreshed Appearance', text: 'A fresh look for your property inside and out.', icon: 'm12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z' },
        { title: 'Added Value', text: 'Improvements that can enhance the value of your home.', icon: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-5h4v5' },
      ],
    },

    faqs: {
      eyebrow: 'Window FAQs',
      title: 'Questions About Your', accent: 'Windows',
      items: [
        { col: 0, q: 'Do You Install New Windows and Replace Existing Ones?', a: 'Yes, our services include both new window installations and replacements for existing windows.' },
        { col: 0, q: 'Can You Replace Just One or Two Windows?', a: 'Yes, we can replace a single window, several windows or all the windows in your property, depending on your requirements.' },
        { col: 0, q: 'Can Windows Be Part of a Larger Renovation?', a: 'Yes, window installation can form part of a wider home improvement project, depending on your requirements.' },
        { col: 1, q: 'Will My Windows Need Building Regulations Approval?', a: 'Some window work may need to meet Building Regulations requirements. Requirements depend on the property, location and proposed work.' },
        { col: 1, q: 'How Much Will New Windows Cost?', a: 'The cost depends on the number and size of windows, materials and scope of work. Contact us to discuss your project and request a quotation.' },
        { col: 1, q: 'How Do I Get Started?', a: 'Contact us with details of your project so we can discuss your requirements and the next steps.' },
      ],
    },

    others: {
      eyebrow: 'Explore More',
      title: 'Our Other', accent: 'Services',
      text: 'From complete renovations to kitchens, roofing and gardens – complete solutions for every part of your home.',
    },
  },

  /* ---------------------------------------------------------
     Repairs & Maintenance
     --------------------------------------------------------- */
  'repairs-maintenance': {
    service: 'Repairs & Maintenance',

    hero: {
      eyebrow: 'Repairs & Maintenance',
      title: ['Keeping Your Home', 'in Good Condition.'],
      text: 'Keep your property in good condition with general repairs and ongoing home maintenance solutions.',
      image: img('1581783898377-1c85bf937427', 2000),
      alt: 'Hammer and screwdriver for property repairs',
    },

    overview: {
      eyebrow: 'Service Overview',
      title: 'Small Jobs Done', accent: 'Properly',
      lead: 'Every home needs care from time to time. From fixing what needs repairing to ongoing maintenance, we help keep your property in good condition.',
      text: 'Whatever the job, our approach focuses on quality workmanship, attention to detail and understanding your individual requirements.',
    },

    offerings: {
      eyebrow: 'What We Offer',
      title: 'Our Repair & Maintenance', accent: 'Services',
      text: 'Put right what needs fixing today and keep your home in good shape for the future.',
      items: [
        {
          title: 'General Property Repairs', icon: icons.wrench,
          text: 'From everyday wear and tear to issues that need putting right, we carry out general repairs to keep your home safe, comfortable and looking its best.',
          image: img('1768839725085-829e6ac7ac26', 1100), alt: 'Plasterer finishing an interior wall during a home renovation',
          points: ['Interior and exterior repairs', 'Assessing what needs doing', 'Careful, quality workmanship', 'Tidy finishing'],
        },
        {
          title: 'Home Maintenance', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M9 15l2 2 4-4',  // calendar tick
          text: 'Keep your property in good condition with maintenance that helps prevent small problems becoming bigger ones.',
          image: img('1598307754921-da47ead0ad5f', 1100), alt: 'Well-kept brick house with a white front door',
          points: ['Ongoing home maintenance', 'Keeping your property in good condition', 'Spotting issues early', 'Reliable, careful work'],
        },
      ],
    },

    benefits: {
      eyebrow: 'Why Maintain?',
      title: 'Look After Your Home and It Looks After', accent: 'You',
      cards: [
        { title: 'Peace of Mind', text: 'Know your home is being looked after properly.', icon: 'M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z' },
        { title: 'Prevent Bigger Problems', text: 'Deal with small issues before they grow.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2' },
        { title: 'Well-Kept Appearance', text: 'A property that looks cared for, inside and out.', icon: 'm12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z' },
        { title: 'Protected Value', text: 'Help protect the value of your home.', icon: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-5h4v5' },
      ],
    },

    faqs: {
      eyebrow: 'Repairs & Maintenance FAQs',
      title: 'Questions About Your', accent: 'Property',
      items: [
        { col: 0, q: 'What Kind of Repairs Do You Carry Out?', a: 'We carry out general property repairs, inside and out. Contact us with details of what needs doing so we can discuss it with you.' },
        { col: 0, q: 'Do You Take On Small Jobs?', a: 'Yes, our services cover everything from small repairs to larger home improvement projects.' },
        { col: 0, q: 'Do You Offer Ongoing Maintenance?', a: 'Yes, we provide home maintenance to help keep your property in good condition.' },
        { col: 1, q: 'Can Repairs Be Part of a Larger Project?', a: 'Yes, repairs can be carried out alongside other building or renovation work, depending on your requirements.' },
        { col: 1, q: 'How Much Will a Repair Cost?', a: 'The cost depends on the type of repair, materials and scope of work. Contact us to discuss what needs doing and request a quotation.' },
        { col: 1, q: 'How Do I Get Started?', a: 'Contact us with details of the work you need so we can discuss your requirements and the next steps.' },
      ],
    },

    others: {
      eyebrow: 'Explore More',
      title: 'Our Other', accent: 'Services',
      text: 'From complete renovations to kitchens, roofing and gardens – complete solutions for every part of your home.',
    },
  },
};
