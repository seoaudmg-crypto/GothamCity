export type IncludedItem = { name: string; icon: string; desc: string };

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  included: IncludedItem[];
  whyUs: { title: string; desc: string }[];
  count: number;
};

// Why Us cards are consistent across all category pages (from design frames)
const whyUs: Category['whyUs'] = [
  {
    title: 'Time-Zone Aligned',
    desc: 'Teams that work in your hours, not against them.',
  },
  {
    title: 'Vetted Professionals',
    desc: 'Carefully screened talent, matched to your needs.',
  },
  {
    title: 'Flexible Engagement',
    desc: 'Scale up or down with no long-term lock-in.',
  },
  {
    title: 'Transparent Billing',
    desc: 'Clear hours and costs, billed through Gotham City Holding.',
  },
];

const raw: Omit<Category, 'count'>[] = [
  {
    slug: 'virtual-assistant',
    name: 'Virtual Assistant Services',
    tagline:
      'Reliable remote support for your day-to-day operations. Our virtual assistants handle the administrative load so your team stays lean, focused, and free to do higher-value work.',
    included: [
      {
        name: 'Administrative Support',
        icon: 'clipboard-list',
        desc: 'Day-to-day admin handled — documentation, file organisation, and the routine tasks that keep operations moving.',
      },
      {
        name: 'Calendar & Email Management',
        icon: 'calendar',
        desc: 'Inbox triage, scheduling, and calendar coordination so your day stays organised and nothing slips.',
      },
      {
        name: 'Data Entry',
        icon: 'keyboard',
        desc: 'Accurate, timely entry and upkeep of records across your systems, CRMs, and spreadsheets.',
      },
      {
        name: 'Customer Support',
        icon: 'headset',
        desc: 'Friendly, responsive support for your customers across email, live chat, and phone.',
      },
      {
        name: 'Travel Booking',
        icon: 'plane',
        desc: 'End-to-end travel arrangements — flights, accommodation, and itineraries managed for you.',
      },
    ],
    whyUs,
  },
  {
    slug: 'resource-allocation',
    name: 'Resource Allocation',
    tagline:
      'Flexible staffing models that give you the right people, for the right duration — without the cost and long-term commitment of permanent hiring.',
    included: [
      {
        name: 'Dedicated Remote Teams',
        icon: 'users',
        desc: 'A consistent, ring-fenced team that works exclusively on your account.',
      },
      {
        name: 'Project-Based Staffing',
        icon: 'clipboard-list',
        desc: 'Scaled-up capacity for a defined project, then wound down on delivery.',
      },
      {
        name: 'Contract Staffing',
        icon: 'file-text',
        desc: 'Skilled professionals engaged for a fixed term, fully managed by us.',
      },
      {
        name: 'Temporary & Permanent Deployment',
        icon: 'user-plus',
        desc: 'Short-term cover or long-term hires — deployed to suit your needs.',
      },
    ],
    whyUs,
  },
  {
    slug: 'offshore-hr',
    name: 'Offshore HR Services',
    tagline:
      'End-to-end people operations — from hiring to compliance — handled by experienced offshore HR professionals.',
    included: [
      {
        name: 'Recruitment & Talent Acquisition',
        icon: 'user-search',
        desc: 'Sourcing and securing the right candidates for your open roles.',
      },
      {
        name: 'Employee Onboarding',
        icon: 'user-plus',
        desc: 'Smooth, structured onboarding that gets new hires productive faster.',
      },
      {
        name: 'Payroll Support',
        icon: 'wallet',
        desc: 'Accurate, on-time payroll processing and coordination.',
      },
      {
        name: 'Performance Management',
        icon: 'trending-up',
        desc: 'Frameworks and support to track, review, and grow your people.',
      },
      {
        name: 'HR Administration',
        icon: 'folder',
        desc: 'Day-to-day HR paperwork, records, and process management.',
      },
      {
        name: 'Compliance Documentation',
        icon: 'file-check',
        desc: 'Keeping your HR records audit-ready and compliant.',
      },
    ],
    whyUs,
  },
  {
    slug: 'it-services',
    name: 'IT Services',
    tagline:
      'Full-cycle software, web, and digital product delivery — from first design to launch and beyond.',
    included: [
      {
        name: 'Website Design & Development',
        icon: 'code',
        desc: 'Custom, responsive websites built for performance and clarity.',
      },
      {
        name: 'E-commerce Development',
        icon: 'shopping-cart',
        desc: 'Online stores and checkout experiences that convert.',
      },
      {
        name: 'Mobile App Development',
        icon: 'smartphone',
        desc: 'Native and cross-platform apps for iOS and Android.',
      },
      {
        name: 'Software Development',
        icon: 'terminal',
        desc: 'Bespoke software and tools built around your workflows.',
      },
      {
        name: 'UI/UX Design',
        icon: 'palette',
        desc: 'Intuitive, considered interfaces that users enjoy.',
      },
      {
        name: 'Website Maintenance',
        icon: 'wrench',
        desc: 'Ongoing updates, fixes, and support to keep sites healthy.',
      },
      {
        name: 'Search Engine Optimization (SEO)',
        icon: 'search',
        desc: 'Improving visibility and rankings in organic search.',
      },
      {
        name: 'Search Engine Marketing (SEM)',
        icon: 'megaphone',
        desc: 'Paid search campaigns that drive qualified traffic.',
      },
    ],
    whyUs,
  },
  {
    slug: 'it-resource-allocation',
    name: 'IT Resource Allocation',
    tagline:
      'On-demand access to vetted technical specialists — embedded in your team and managed by us.',
    included: [
      {
        name: 'Dedicated Software Developers',
        icon: 'code',
        desc: 'Developers embedded in your team, working only on your product.',
      },
      {
        name: 'Front-End & Back-End Developers',
        icon: 'layout',
        desc: 'Specialists across the full web stack, matched to your needs.',
      },
      {
        name: 'Full-Stack Developers',
        icon: 'layers',
        desc: 'Versatile engineers who handle end-to-end delivery.',
      },
      {
        name: 'DevOps Engineers',
        icon: 'settings',
        desc: 'Automation, CI/CD, and reliable infrastructure operations.',
      },
      {
        name: 'QA Testers',
        icon: 'bug',
        desc: 'Rigorous testing to ship stable, high-quality releases.',
      },
      {
        name: 'UI/UX Designers',
        icon: 'palette',
        desc: 'Product designers who shape intuitive experiences.',
      },
      {
        name: 'Cloud Engineers',
        icon: 'cloud',
        desc: 'Scalable, secure cloud architecture and management.',
      },
      {
        name: 'Data Engineers',
        icon: 'database',
        desc: 'Pipelines and platforms that make your data usable.',
      },
    ],
    whyUs,
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing Services',
    tagline:
      'Data-driven digital marketing that grows reach, engagement, and conversions across every channel.',
    included: [
      {
        name: 'Social Media Management',
        icon: 'share-2',
        desc: 'Planning, posting, and growing your social presence.',
      },
      {
        name: 'Content Marketing',
        icon: 'pen-tool',
        desc: 'Content that attracts, informs, and builds trust.',
      },
      {
        name: 'PPC Advertising',
        icon: 'mouse-pointer-click',
        desc: 'Paid campaigns optimised for return on ad spend.',
      },
      {
        name: 'Email Marketing',
        icon: 'mail',
        desc: 'Campaigns and automations that nurture and convert.',
      },
      {
        name: 'Brand Strategy',
        icon: 'sparkles',
        desc: 'Positioning and messaging that set you apart.',
      },
      {
        name: 'Online Reputation Management',
        icon: 'shield-check',
        desc: 'Monitoring and protecting how your brand is seen.',
      },
    ],
    whyUs,
  },
  {
    slug: 'customer-support',
    name: 'Customer Support Services',
    tagline:
      'Responsive, multi-channel customer support that keeps your customers happy — around the clock.',
    included: [
      {
        name: '24/7 Call Center Support',
        icon: 'phone-call',
        desc: 'Round-the-clock voice support for your customers.',
      },
      {
        name: 'Live Chat Support',
        icon: 'message-circle',
        desc: 'Real-time chat assistance on your website or app.',
      },
      {
        name: 'Email Support',
        icon: 'mail',
        desc: 'Timely, professional handling of customer email queries.',
      },
      {
        name: 'Technical Support',
        icon: 'wrench',
        desc: 'Knowledgeable help for product and technical issues.',
      },
      {
        name: 'Help Desk Services',
        icon: 'headset',
        desc: 'Structured ticketing and resolution at scale.',
      },
    ],
    whyUs,
  },
  {
    slug: 'back-office',
    name: 'Back Office Operations',
    tagline:
      'The essential back-office work that keeps your operations running — accurate, organised, and off your plate.',
    included: [
      {
        name: 'Document Processing',
        icon: 'file-text',
        desc: 'Fast, accurate handling of forms and paperwork.',
      },
      {
        name: 'Data Management',
        icon: 'database',
        desc: 'Organising and maintaining clean, reliable data.',
      },
      {
        name: 'CRM Management',
        icon: 'users',
        desc: 'Keeping your customer records accurate and current.',
      },
      {
        name: 'Order Processing',
        icon: 'package',
        desc: 'Smooth handling of orders from receipt to fulfilment.',
      },
      {
        name: 'Inventory Management',
        icon: 'boxes',
        desc: 'Tracking stock levels and keeping records in sync.',
      },
      {
        name: 'Database Administration',
        icon: 'server',
        desc: 'Maintaining secure, well-organised databases.',
      },
    ],
    whyUs,
  },
  {
    slug: 'rpo',
    name: 'Recruitment Process Outsourcing (RPO)',
    tagline:
      'End-to-end recruitment process outsourcing — from candidate sourcing to onboarding-ready hires.',
    included: [
      {
        name: 'Candidate Sourcing',
        icon: 'user-search',
        desc: 'Finding qualified candidates through targeted search.',
      },
      {
        name: 'Resume Screening',
        icon: 'file-check',
        desc: 'Filtering applicants to surface the strongest fits.',
      },
      {
        name: 'Interview Coordination',
        icon: 'calendar',
        desc: 'Scheduling and managing the interview process end to end.',
      },
      {
        name: 'Background Verification',
        icon: 'shield-check',
        desc: 'Confirming credentials and references with care.',
      },
      {
        name: 'Recruitment Administration',
        icon: 'clipboard-list',
        desc: 'Handling the admin that keeps hiring on track.',
      },
    ],
    whyUs,
  },
];

export const services: Category[] = raw.map((c) => ({
  ...c,
  count: c.included.length,
}));

export const getCategory = (slug: string) =>
  services.find((c) => c.slug === slug);
