/* =========================================================
   PRIVACY POLICY (/privacy-policy) and TERMS & CONDITIONS (/terms-conditions)
   ---------------------------------------------------------
   IMPORTANT: this is template wording written to match how this website
   works (quote form, email delivery, Google Fonts, no tracking cookies).
   It is not legal advice – have it reviewed by a solicitor, fill in every
   [placeholder] and update `updated` before launch.

   Paragraph format (inside `blocks`):
     'Plain text'                                   – a paragraph
     ['Text with ', { label: 'a link', href: '/privacy-policy' }, '.']
                                                    – a paragraph with links
     { list: ['item', 'item', …] }                  – a bulleted list (items can use the array form too)
   Links: '/page' = page on this site, 'https://…' = opens in a new tab, 'mailto:' / 'tel:' as normal.
   ========================================================= */
import { company } from './site';

const img = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const emailLink = { label: company.email, href: `mailto:${company.email}` };
const phoneLink = { label: company.phone, href: company.phoneHref };

/* ---------------------------------------------------------
   Privacy Policy
   --------------------------------------------------------- */
export const privacyPage = {
  hero: {
    eyebrow: 'Privacy Policy',
    title: ['Your Privacy', 'Matters to Us.'],
    text: 'How we collect, use and protect your personal information when you use our website or contact us about your project.',
    image: img('1583847268964-b28dc8f51f92', 2000),
    alt: 'Renovated living room with a large window',
  },
  updated: '27 November 2026',
  intro: `This Privacy Policy explains how ${company.name} ("we", "us", "our") collects and uses personal information when you visit our website, request a quote or get in touch with us. We are committed to protecting your privacy and handling your information in line with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.`,
  help: 'Questions about how we use your information? Get in touch and we\'ll be happy to help.',

  sections: [
    {
      id: 'who-we-are', title: 'Who We Are',
      blocks: [
        `${company.name} is the data controller responsible for your personal information. This means we decide how and why it is used.`,
        { list: [
          `Company: ${company.name} [registered company name and number, if applicable]`,
          `Address: ${company.address}`,
          ['Email: ', emailLink],
          ['Phone: ', phoneLink],
        ] },
      ],
    },
    {
      id: 'information-we-collect', title: 'Information We Collect',
      blocks: [
        'When you request a quote through the form on our website, we collect:',
        { list: [
          'the service you are interested in',
          'your name, phone number and email address',
          'your postcode (optional)',
          'any project details you choose to share with us',
        ] },
        'When you contact us by phone or email, or when we carry out work for you, we may also collect your address, details about your property and project, and records of our communications.',
        'Like most websites, our hosting provider automatically records basic technical information when you visit, such as your IP address, browser type, the pages you view and the date and time of your visit. This is used to keep the website running securely.',
      ],
    },
    {
      id: 'how-we-use', title: 'How We Use Your Information',
      blocks: [
        'We use your personal information to:',
        { list: [
          'respond to your enquiry and prepare a quotation',
          'contact you about your project and arrange visits or consultations',
          'carry out and manage any work you ask us to do',
          'keep records for accounting, tax and legal purposes',
          'protect our website from spam and misuse',
        ] },
        'We will not use your information for marketing without your permission, and we never sell your personal information.',
      ],
    },
    {
      id: 'legal-basis', title: 'Our Legal Basis',
      blocks: [
        'Under UK data protection law, we must have a legal basis for using your personal information. We rely on:',
        { list: [
          'Contract – to take steps at your request before entering into a contract (such as preparing a quote), and to carry out work for you.',
          'Legitimate interests – to run our business, respond to enquiries, keep records and protect our website, where this does not override your rights.',
          'Legal obligation – where we must keep records or share information to comply with the law.',
          'Consent – where we ask for your permission for a specific purpose. You can withdraw consent at any time.',
        ] },
      ],
    },
    {
      id: 'sharing', title: 'Sharing Your Information',
      blocks: [
        'We only share your information where necessary, with:',
        { list: [
          'service providers who help us run our business, such as our website hosting and email providers',
          'suppliers or subcontractors involved in your project, where needed to carry out the work',
          'professional advisers such as accountants, insurers or legal advisers',
          'authorities or regulators where we are required to by law',
        ] },
        'Anyone we share information with must keep it secure and only use it for the purpose it was shared.',
      ],
    },
    {
      id: 'cookies', title: 'Cookies & Third-Party Services',
      blocks: [
        'Our website does not use cookies for tracking, analytics or advertising, and we do not store anything on your device.',
        'To display the website, your browser loads fonts from Google Fonts and some images from Unsplash. When this happens, these services receive your IP address so they can deliver the content. Their use of this information is covered by their own privacy policies.',
        'Our website also links to our social media pages. If you follow these links, the social media platform\'s own privacy policy applies.',
      ],
    },
    {
      id: 'retention', title: 'How Long We Keep Your Information',
      blocks: [
        'We keep personal information only for as long as we need it:',
        { list: [
          'Enquiries that do not lead to work – up to [12 months] after our last contact with you.',
          'Customer and project records – for as long as needed to complete the work and then up to [6 years] for accounting, tax and legal purposes.',
          'Spam protection – to prevent repeated form submissions, our website briefly keeps a coded (one-way) version of your IP address, which is removed after a short period.',
        ] },
        'When information is no longer needed, we delete it securely.',
      ],
    },
    {
      id: 'security', title: 'Keeping Your Information Secure',
      blocks: [
        'We take appropriate technical and organisational measures to protect your personal information against loss, misuse and unauthorised access. Our website uses a secure (HTTPS) connection, and enquiry details are sent to us by email through secure providers.',
        'Unfortunately, no method of transmitting information over the internet is completely secure, but we do our best to protect the information you share with us.',
      ],
    },
    {
      id: 'international', title: 'International Transfers',
      blocks: [
        'Some of our service providers, such as email and hosting providers, may store or process information outside the UK. Where this happens, we make sure appropriate safeguards are in place to protect your information, as required by UK data protection law.',
      ],
    },
    {
      id: 'your-rights', title: 'Your Rights',
      blocks: [
        'You have the right to:',
        { list: [
          'access the personal information we hold about you',
          'ask us to correct information that is inaccurate or incomplete',
          'ask us to delete your information',
          'ask us to restrict how we use your information',
          'object to us using your information',
          'ask for your information to be transferred to you or another organisation',
          'withdraw your consent at any time, where we rely on consent',
        ] },
        ['To use any of these rights, contact us at ', emailLink, '. We will respond within one month. There is usually no charge.'],
      ],
    },
    {
      id: 'complaints', title: 'Complaints',
      blocks: [
        'If you have any concerns about how we use your personal information, please contact us first so we can try to put things right.',
        ['You also have the right to complain to the Information Commissioner\'s Office (ICO), the UK\'s data protection regulator, at ', { label: 'ico.org.uk', href: 'https://ico.org.uk/make-a-complaint/' }, ' or by calling 0303 123 1113.'],
      ],
    },
    {
      id: 'changes', title: 'Changes to This Policy',
      blocks: [
        'We may update this Privacy Policy from time to time. The latest version will always be available on this page, with the date it was last updated shown at the top.',
      ],
    },
    {
      id: 'contact', title: 'Contact Us',
      blocks: [
        'If you have any questions about this Privacy Policy or how we handle your personal information, please get in touch:',
        { list: [
          ['Email: ', emailLink],
          ['Phone: ', phoneLink],
          `Address: ${company.address}`,
        ] },
      ],
    },
  ],
};

/* ---------------------------------------------------------
   Terms & Conditions
   --------------------------------------------------------- */
export const termsPage = {
  hero: {
    eyebrow: 'Terms & Conditions',
    title: ['Clear Terms for', 'Using Our Website.'],
    text: 'The terms that apply when you use our website and request a quote for building, renovation or property improvement work.',
    image: img('1732721176814-c0bc82db3971', 2000),
    alt: 'Red brick British house with white windows',
  },
  updated: '27 November 2026',
  intro: `These Terms & Conditions apply to your use of the ${company.name} website and to enquiries and quote requests made through it. Please read them carefully. By using our website, you agree to these terms.`,
  help: 'Questions about these terms or a quotation? Get in touch and we\'ll be happy to help.',

  sections: [
    {
      id: 'about', title: 'About Us',
      blocks: [
        `This website is operated by ${company.name} [registered company name and number, if applicable], ${company.address}.`,
        ['You can contact us by email at ', emailLink, ' or by phone on ', phoneLink, '.'],
      ],
    },
    {
      id: 'using-our-website', title: 'Using Our Website',
      blocks: [
        'You may use our website for lawful purposes only. You must not:',
        { list: [
          'use the website in any way that breaks the law or is fraudulent',
          'try to gain unauthorised access to the website, its server or any connected systems',
          'introduce viruses or any other harmful material',
          'send spam, automated or misleading enquiries through our forms',
          'copy or reproduce content from the website for commercial purposes without our permission',
        ] },
        'We may suspend or restrict access to the website at any time, for example for maintenance.',
      ],
    },
    {
      id: 'website-information', title: 'Information on Our Website',
      blocks: [
        'The information on our website is provided for general information only. It is not professional advice and should not be relied on as such. Every property and project is different, so we will always discuss your specific requirements with you.',
        'We aim to keep the website accurate and up to date, but we do not guarantee that all content is complete or current. Images, project examples and sample content are for illustration and may not represent the exact materials, finishes or results of your project.',
      ],
    },
    {
      id: 'quotes', title: 'Enquiries & Quotations',
      blocks: [
        'Submitting an enquiry or quote request through our website does not create a contract and does not commit you or us to any work.',
        { list: [
          'Quotations are based on the information you provide and may require a site visit before they can be confirmed.',
          'Unless stated otherwise, a quotation is valid for [30 days] from the date it is issued.',
          'Any work we carry out will be subject to a separate written quotation or agreement, which will set out the scope of work, price and payment terms.',
          'If anything in that agreement differs from these website terms, the agreement for your project applies.',
        ] },
      ],
    },
    {
      id: 'intellectual-property', title: 'Intellectual Property',
      blocks: [
        'The content on this website, including text, design, graphics and logos, is owned by or licensed to us and is protected by copyright and other intellectual property rights. Some images are used under licence from third parties.',
        'You may view and print pages for your own personal use, but you must not copy, reproduce or distribute any content without our written permission.',
      ],
    },
    {
      id: 'links', title: 'Links to Other Websites',
      blocks: [
        'Our website may contain links to other websites, such as our social media pages. These are provided for your convenience only. We have no control over the content of those websites and are not responsible for them or for any loss that may arise from your use of them.',
      ],
    },
    {
      id: 'liability', title: 'Our Liability',
      blocks: [
        'We take care to provide a reliable website, but it is provided "as is". To the extent permitted by law, we are not responsible for any loss or damage arising from your use of the website, from any interruption to it, or from relying on information on it.',
        'Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot be excluded or limited by law. Nothing in these terms affects your statutory rights as a consumer.',
      ],
    },
    {
      id: 'privacy', title: 'Your Privacy',
      blocks: [
        ['We use any personal information you give us in line with our ', { label: 'Privacy Policy', href: '/privacy-policy' }, ', which explains what we collect, how we use it and your rights.'],
      ],
    },
    {
      id: 'changes', title: 'Changes to These Terms',
      blocks: [
        'We may update these Terms & Conditions from time to time. The latest version will always be available on this page, with the date it was last updated shown at the top. Please check this page whenever you use our website.',
      ],
    },
    {
      id: 'governing-law', title: 'Governing Law',
      blocks: [
        'These terms are governed by the laws of England and Wales, and the courts of England and Wales have jurisdiction over any disputes. If you live in Scotland or Northern Ireland, you may also bring proceedings in your local courts.',
      ],
    },
    {
      id: 'contact', title: 'Contact Us',
      blocks: [
        'If you have any questions about these Terms & Conditions, please get in touch:',
        { list: [
          ['Email: ', emailLink],
          ['Phone: ', phoneLink],
          `Address: ${company.address}`,
        ] },
      ],
    },
  ],
};
