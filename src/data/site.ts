const TBD = (label: string) => `[${label} — to be provided]`;

export const site = {
  name: 'Gotham City Holding Pty Ltd',
  shortName: 'Gotham City Holding',
  tagline:
    'An Australian-registered holding company providing vetted virtual assistants, offshore specialists, and HR support to the firms and businesses that rely on them.',
  country: 'Australia',
  // Legitimacy facts — PLACEHOLDERS until client provides
  abn: TBD('ABN'),
  acn: TBD('ACN'),
  established: TBD('Year'),
  headOffice: TBD('Head office'),
  // Contact — PLACEHOLDERS until client provides
  email: 'info@gothamcityholding.com.au', // TODO confirm/replace with real inbox
  phone: TBD('Phone'),
  address: TBD('Office address'),
  hours: 'Mon–Fri · 9:00am–5:00pm AEST',
  // About stats — PLACEHOLDERS
  stats: [
    { value: '[ X ]+', label: 'Professionals deployed' },
    { value: '[ X ]',  label: 'Clients served' },
    { value: '[ X ]',  label: 'Countries' },
    { value: '[ X ]+', label: 'Years of operation' },
  ],
  copyrightYear: 2026,
} as const;
