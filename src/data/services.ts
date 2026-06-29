export type Category = {
  slug: string;
  name: string;
  tagline: string;
  included: string[];
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
      'Administrative support',
      'Calendar & email management',
      'Data entry',
      'Customer support',
      'Travel booking',
    ],
    whyUs,
  },
  {
    slug: 'resource-allocation',
    name: 'Resource Allocation',
    tagline:
      'Flexible staffing models that give you the right people, for the right duration — without the cost and long-term commitment of permanent hiring.',
    included: [
      'Dedicated remote teams',
      'Project-based staffing',
      'Contract staffing',
      'Temporary and permanent resource deployment',
    ],
    whyUs,
  },
  {
    slug: 'offshore-hr',
    name: 'Offshore HR Services',
    tagline:
      'End-to-end people operations — from hiring to compliance — handled by experienced offshore HR professionals.',
    included: [
      'Recruitment & talent acquisition',
      'Employee onboarding',
      'Payroll support',
      'Performance management',
      'HR administration',
      'Compliance documentation',
    ],
    whyUs,
  },
  {
    slug: 'it-services',
    name: 'IT Services',
    tagline:
      'Full-cycle software, web, and digital product delivery — from first design to launch and beyond.',
    included: [
      'Website design & development',
      'E-commerce development',
      'Mobile app development',
      'Software development',
      'UI/UX design',
      'Website maintenance',
      'Search Engine Optimization (SEO)',
      'Search Engine Marketing (SEM)',
    ],
    whyUs,
  },
  {
    slug: 'it-resource-allocation',
    name: 'IT Resource Allocation',
    tagline:
      'On-demand access to vetted technical specialists — embedded in your team and managed by us.',
    included: [
      'Dedicated software developers',
      'Front-end & back-end developers',
      'Full-stack developers',
      'DevOps engineers',
      'QA testers',
      'UI/UX designers',
      'Cloud engineers',
      'Data engineers',
    ],
    whyUs,
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing Services',
    tagline:
      'Data-driven digital marketing that grows reach, engagement, and conversions across every channel.',
    included: [
      'Social media management',
      'Content marketing',
      'PPC advertising',
      'Email marketing',
      'Brand strategy',
      'Online reputation management',
    ],
    whyUs,
  },
  {
    slug: 'customer-support',
    name: 'Customer Support Services',
    tagline:
      'Responsive, multi-channel customer support that keeps your customers happy — around the clock.',
    included: [
      '24/7 call center support',
      'Live chat support',
      'Email support',
      'Technical support',
      'Help desk services',
    ],
    whyUs,
  },
  {
    slug: 'back-office',
    name: 'Back Office Operations',
    tagline:
      'The essential back-office work that keeps your operations running — accurate, organised, and off your plate.',
    included: [
      'Document processing',
      'Data management',
      'CRM management',
      'Order processing',
      'Inventory management',
      'Database administration',
    ],
    whyUs,
  },
  {
    slug: 'rpo',
    name: 'Recruitment Process Outsourcing (RPO)',
    tagline:
      'End-to-end recruitment process outsourcing — from candidate sourcing to onboarding-ready hires.',
    included: [
      'Candidate sourcing',
      'Resume screening',
      'Interview coordination',
      'Background verification',
      'Recruitment administration',
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
