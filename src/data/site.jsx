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
   Links starting with # point at homepage sections; on other pages they lead back to the homepage. */
export const navLinks = [
  { label: 'Home', href: '#home', page: 'home' },
  { label: 'About Us', href: 'about.html', page: 'about' },
  { label: 'Services', dropdown: true },
  { label: 'Our Projects', href: 'projects.html', page: 'projects' },
  { label: 'Contact Us', href: 'contact.html', page: 'contact' },
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
    title: 'Building & Renovations', icon: icons.house,
    image: img('1674649207083-281c2517ab49', 1100), alt: 'Builders working on a house renovation',
    text: 'Transform your property with complete house rebuilds and home renovations designed around your needs and lifestyle.',
    tags: ['Full House Rebuilds', 'Complete Home Renovations'],
  },
  {
    title: 'Kitchen & Bathroom', icon: icons.bath,
    image: img('1600489000022-c2086d79f9d4', 1100), alt: 'Renovated kitchen with white and wood cabinets',
    text: 'Create practical, stylish and comfortable spaces with kitchen and bathroom renovation solutions.',
    tags: ['Kitchen Renovations', 'Bathroom Renovations'],
  },
  {
    title: 'Roofing & Loft Solutions', icon: icons.roof,
    image: img('1763665814538-8ba04597286c', 1100), alt: 'Roofers installing new roof tiles',
    text: "Improve your property's protection and maximise unused space with roofing services and loft storage installations.",
    tags: ['Roofing', 'Loft Storage & Installation'],
  },
  {
    title: 'Gardens & Driveways', icon: icons.leaf,
    image: img('1668120089662-42642838cfef', 1100), alt: 'Landscaped garden lawn with shrubs and trees',
    text: "Enhance your outdoor living space and property's kerb appeal with garden improvements and driveway installations.",
    tags: ['Garden Improvements', 'Driveway Installation'],
  },
  {
    title: 'Windows & Installation', icon: icons.window,
    image: img('1604166167486-af78ebd50897', 1100), alt: 'White framed window on a brick house',
    text: "Refresh your property's appearance, comfort and functionality with window installation and replacement services.",
    tags: ['Window Installation', 'Window Replacement'],
  },
  {
    title: 'Repairs & Maintenance', icon: icons.wrench,
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
  { label: 'About Us', href: 'about.html' },
  { label: 'Our Services', href: '#services' },
  { label: 'Our Projects', href: 'projects.html' },
  { label: 'Contact Us', href: 'contact.html' },
];

/* =========================================================
   ABOUT US page (about.html)
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
   CONTACT US page (contact.html)
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

  enquiry: {
    eyebrow: 'Send an Enquiry',
    title: 'Tell Us About Your', accent: 'Project',
    text: 'Complete the short form and our team will get back to you to discuss your requirements and the next steps.',
    stepsTitle: 'What happens next?',
    steps: [
      { title: 'We review your enquiry', text: 'We look at the details of your project and requirements.' },
      { title: 'We get in touch', text: 'We contact you to discuss your ideas and answer any questions.' },
      { title: 'Consultation & quotation', text: 'We arrange the next steps and provide a quotation for the work.' },
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
   OUR PROJECTS page (projects.html)
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
