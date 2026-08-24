// Keeping portfolio content separate from presentation makes future project and link
// updates safe to make without touching the component structure.
//
// `image` values are keys in src/data/images.json, which the image pipeline writes
// with intrinsic dimensions so every <img> can reserve the right space up front.
export const projects = [
  {
    number: '01',
    title: 'NETS Pay Together',
    eyebrow: 'Mobile banking prototype · five-person team',
    label: 'Distinction Presentation',
    bleed: true,
    summary:
      'A NETS lifestyle banking prototype where payments, bill splitting, group hangouts and an XP rewards economy all run on one shared transaction ledger.',
    problem:
      'E-wallet adoption is growing, but NETS had no reason for Gen Z and millennial users to come back after a payment. A rewards layer only helps if it cannot be gamed — and if the value is obvious at the counter.',
    approach:
      'I owned the XP Rewards Store. Earning is derived from the shared transaction table rather than stored as a balance, outlets are ranked by real distance, cashback writes back to the same ledger the home screen reads, and merchants can run campaigns and buy labelled placement.',
    outcome:
      'Redeeming cashback moves the wallet balance immediately because it is a real credit on the same ledger, and every point is traceable in both directions. Figures shown are seeded demo data in a prototype, not production measurements.',
    highlight: {
      eyebrow: 'Highlighted feature',
      title: 'XP Rewards Store',
      blurb:
        'The change that turned a screen of rewards into a loyalty system that holds up against real transaction data.',
      points: [
        'Only merchant purchases earn. Repayments, top-ups and cashback earn nothing, which closes the loop where two users could repay each other and mint XP out of nothing.',
        '10 XP per $1, doubled automatically at heartland merchants — a $1.60 kopi earns 32 XP.',
        'Cashback posts into the wallet instantly as a credit on the same ledger, so the balance moves before you leave the counter.',
        'Every point is traceable with references, and a redemption can never push the balance below zero.',
      ],
    },
    stack: ['React', 'TypeScript', 'Vite', 'SQLite (WASM)', 'Node', 'Playwright'],
    note: 'Balances are derived, never stored: there is no balance or xp column anywhere in the schema, and the admin database explorer re-checks that at render time. Merchant QR payments use the real NETS Sandbox; peer-to-peer repayment is a clearly labelled simulation.',
    demo: 'https://nets-grp-prototype.vercel.app/',
    images: [
      {
        image: 'nets-xp-rewards',
        alt: 'NETS XP Rewards home beside the Rewards Store, showing XP balance, tier progress and redeemable rewards ranked by distance',
      },
      { image: 'nets-wallet-ledger', alt: 'NETS voucher wallet beside the XP ledger showing expiry dates' },
      {
        image: 'nets-home-history',
        alt: 'NETS home screen with card carousel beside the traceable XP history',
      },
    ],
  },
  {
    number: '02',
    title: 'PulseOps EMS Command Center',
    eyebrow: 'Operational web application',
    label: 'Distinction Presentation',
    summary:
      'A workforce command center that turns fragmented EMS planning into one operational flow for rosters, absence coverage, staff health, payroll, and reporting.',
    problem:
      'Manual crew rostering and fleet coordination make it difficult to fill urgent gaps, balance fatigue, and verify payroll accurately.',
    approach:
      'Designed a connected interface for calendar-based rostering, last-minute replacement matching, staff availability, fatigue signals, CPF-aware payroll, and exportable reports.',
    outcome:
      'Workflow comparison modeled up to 50% less manual planning time. This is a projected result based on reduced coordination steps, not a production measurement.',
    highlight: {
      eyebrow: 'Highlighted feature',
      title: 'Rule-based roster validation',
      blurb:
        'Assignment is not a drag-and-drop with a warning afterwards — the rules run before a crew member can be placed on a shift.',
      points: [
        'Checks role, service qualification, availability, shift duration, rotation and rest period on every assignment.',
        'Absence reporting ranks replacement candidates instead of leaving a manager to scan a list.',
        'Fatigue scores surface consecutive-shift risk on the dashboard rather than inside a report nobody opens.',
      ],
    },
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Workflow design'],
    note: 'A front-end prototype: it stores data in the browser and uses demo sign-in flows. Payroll, CPF, fatigue and scheduling results are operational estimates that need review before real-world use.',
    demo: 'https://emspulseops.vercel.app/',
    images: [
      {
        image: 'pulseops-dashboard',
        alt: 'PulseOps operations command center showing staffing status, crew gaps and fatigue watch',
      },
      { image: 'pulseops-roster', alt: 'PulseOps roster builder with shift demand and crew assignment' },
      {
        image: 'pulseops-coverage',
        alt: 'PulseOps emergency coverage view for reporting MC and finding replacements',
      },
      {
        image: 'pulseops-staff',
        alt: 'PulseOps staff management view with availability and fatigue indicators',
      },
      { image: 'pulseops-attendance', alt: 'PulseOps events and attendance tracking view' },
      { image: 'pulseops-payroll', alt: 'PulseOps payroll view with overtime and CPF estimates' },
    ],
  },
  {
    number: '03',
    title: 'Global Food Insecurity Dashboard',
    eyebrow: 'Business analytics · four-person team',
    summary:
      'An interactive Tableau view connecting conflict, political instability, drought, food prices, and human impact to help decision-makers identify areas of escalating need.',
    problem:
      'NGOs and governments need a consolidated view of overlapping risk factors to prioritize aid and detect potential crisis escalation earlier.',
    approach:
      'My contribution focused on sourcing and merging inconsistent datasets in Tableau Prep, engineering severity and impact measures, and building geospatial and diagnostic views with time and event filters.',
    outcome:
      'The analysis supported prioritizing regions with the greatest overlap between instability and food insecurity, with geospatial monitoring proposed as an early-warning input.',
    stack: ['Tableau Desktop', 'Tableau Prep', 'Excel', 'Data cleaning', 'Geospatial analysis'],
    note: 'Used descriptive and diagnostic analysis, plus MODEL_QUANTILE and MODEL_PERCENTILE functions to explore incident trends. Sensitive conflict data was presented in a neutral academic frame.',
    images: [
      {
        image: 'food-insecurity-dashboard',
        alt: 'Tableau food scarcity dashboard with regional, time-series, and geospatial views',
      },
    ],
  },
  {
    number: '04',
    title: 'FairPrice Shopping Simulation',
    eyebrow: 'Python application',
    summary:
      'A script-based e-commerce simulation that models the logic behind product discovery, cart changes, checkout, receipts, and expenditure tracking.',
    problem:
      'A shopping flow must preserve correct state, handle invalid input, and produce clear feedback across many user decisions.',
    approach:
      'Built reusable Python functions for browsing, adding and removing products, validating inputs, calculating totals, and generating an itemized receipt.',
    outcome:
      'Created a complete terminal workflow and strengthened practical understanding of control flow, data structures, validation, and user-oriented program design.',
    stack: ['Python', 'Algorithms', 'Data structures', 'Input validation'],
  },
  {
    number: '05',
    title: 'Clinic Digitalisation Concept',
    eyebrow: 'Python 3.5 web concept',
    summary:
      'A simple operational concept for moving clinic bookings, records, queues, and staff coordination out of disconnected manual processes.',
    problem:
      'Manual clinic workflows create repeated handoffs across appointment booking, patient records, queues, and staff coordination.',
    approach:
      'Mapped the current and proposed workflows, then designed patient and staff views around a clearer queue and record-management flow.',
    outcome:
      'Shared the concept with several doctors. They responded positively to the simplicity of the application and its workflow design.',
    stack: ['Python 3.5', 'Workflow mapping', 'Interface design', 'User feedback'],
  },
];
