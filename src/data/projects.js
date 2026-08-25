// Keeping portfolio content separate from presentation makes future project and link
// updates safe to make without touching the component structure.
//
// Fields added in this pass:
//   stats       — item 24: the numbers pulled out of prose so a skim has something to catch on.
//   headline    — item 21: the single figure an outcome earns, set large.
//   footnote    — item 21: the honesty caveat, kept but demoted out of the headline.
//   visual      — item 16: every project now carries something to look at, not just the two
//                 that happened to have screenshots.
//   walkthrough — item 23: ordered captions for the auto-advancing PulseOps replay.
//   artifacts   — item 22: the messy middle. See the note above `artifacts` on project 01.
//   caseStudy   — item 17: long-form content for the dedicated /#/case/<slug> page.
//   label       — the presentation a project was submitted for, shown as a chip.
//   highlight   — the one feature a project is remembered for, lifted out of the prose.
//   year        — item 18: nothing on the site was dated, so a visitor could not
//                 tell whether the work was recent.
//   bleed       — item 26: opts this card out of the contained grid so its visual runs
//                 to the viewport edge. Exactly one project should set it.
//
// Images are keys into src/data/images.json (written by `npm run images`) rather than
// raw paths, so every <img> gets a srcset and its intrinsic width/height (item 47).

export const projects = [
  {
    number: '01',
    slug: 'nets-pay-together',
    year: '2026',
    title: 'NETS Pay Together',
    eyebrow: 'Mobile banking prototype · five-person team',
    label: 'Distinction Presentation',

    // Item 26: the one card that breaks the contained grid.
    bleed: true,

    summary:
      'A NETS lifestyle banking prototype where payments, bill splitting, group hangouts and an XP rewards economy all run on one shared transaction ledger.',
    problem:
      'E-wallet adoption is growing, but NETS had no reason for Gen Z and millennial users to come back after a payment. A rewards layer only helps if it cannot be gamed — and if the value is obvious at the counter.',
    approach:
      'I owned the XP Rewards Store. Earning is derived from the shared transaction table rather than stored as a balance, outlets are ranked by real distance, cashback writes back to the same ledger the home screen reads, and merchants can run campaigns and buy labelled placement.',

    headline: { figure: '10 XP', unit: 'per $1,', label: 'doubled at heartland merchants' },
    footnote:
      'A $1.60 kopi earns 32 XP. Figures shown in the prototype are seeded demo data, not production measurements.',
    outcome:
      'Redeeming cashback moves the wallet balance immediately because it is a real credit on the same ledger, and every point is traceable in both directions.',

    // Facts that are literally true of the build, in the spirit of the note on 02.
    stats: [
      { value: '5', label: 'person team' },
      { value: '0', label: 'stored balance columns' },
      { value: '1', label: 'feature owned end to end' },
    ],

    stack: ['React', 'TypeScript', 'Vite', 'SQLite (WASM)', 'Node', 'Playwright'],
    demo: 'https://nets-grp-prototype.vercel.app/',
    demoNote: 'Open the prototype',

    visual: {
      kind: 'gallery',
      images: [
        {
          image: 'nets-xp-rewards',
          alt: 'NETS XP Rewards home beside the Rewards Store, showing XP balance, tier progress and rewards ranked by distance',
        },
        {
          image: 'nets-wallet-ledger',
          alt: 'NETS voucher wallet beside the XP ledger showing what expires and when',
        },
        {
          image: 'nets-home-history',
          alt: 'NETS home screen with its card carousel beside the traceable XP history',
        },
      ],
    },

    highlight: {
      eyebrow: 'Highlighted feature',
      title: 'XP Rewards Store',
      blurb:
        'The change that turned a screen of rewards into a loyalty system that holds up against real transaction data.',
      points: [
        'Only merchant purchases earn. Repayments, top-ups and cashback earn nothing, which closes the loop where two users could repay each other and mint XP out of nothing.',
        'Outlets are ranked and filtered by real distance, so the bubble tea 400 m away outranks the one across the island.',
        'Cashback posts into the wallet instantly as a credit on the same ledger, so the balance moves before you leave the counter.',
        'Every point is traceable with references, and a redemption can never push the balance below zero.',
      ],
    },

    note: 'Balances are derived, never stored: there is no balance or xp column anywhere in the schema, and the admin database explorer re-checks that at render time. Merchant QR payments use the real NETS Sandbox; peer-to-peer repayment is a clearly labelled simulation.',

    artifacts: [],

    caseStudy: {
      role: 'Feature owner — XP Rewards Store, within a five-person team',
      period: '2026',
      context:
        'NETS is accepted almost everywhere in Singapore and remembered for almost nothing. The brief asked whether the app could become the payment companion Gen Z and millennial users reach for by choice, rather than the one their card happens to be on. Our team split the answer five ways — bill splitting, hangouts, a spending recap, an AI dashboard, and rewards. Rewards was mine.',
      constraints: [
        'A rewards balance is money-adjacent. If two users can manufacture points between themselves, the whole scheme is worthless.',
        'The value has to be legible at the counter, not in a statement next month.',
        'Rewards are merchant-funded, so the merchant needs to see what their spend bought.',
        'Five features shared one prototype and one ledger, so my writes had to be readable by everyone else\u2019s screens.',
      ],
      decisions: [
        {
          title: 'The transaction type qualifies, not the amount',
          body: 'The first version earned XP on every transaction, which meant two friends repaying each other in a loop could mint points out of nothing. Adding a rate limit would have treated the symptom. Deciding that only merchant purchases qualify — repayments, top-ups and cashback earn nothing — removed the loophole rather than policing it.',
        },
        {
          title: 'Balances are derived, never stored',
          body: 'A stored xp column is a number that can drift away from the events that produced it. Deriving both wallet balance and XP from the transaction ledger means they cannot disagree with their own history. The admin database explorer re-checks at render time that no balance or xp column exists anywhere in the schema.',
        },
        {
          title: 'Cashback is a real credit, not a status change',
          body: 'Marking a redemption "successful" and updating a rewards screen would have been easier. Writing it back to the same ledger the home screen reads means the customer watches their wallet balance move — the redemption is visible in the place they already trust.',
        },
        {
          title: 'Sponsored placement stays labelled',
          body: 'Merchants can buy Featured or Spotlight position in the store, which is the revenue line that makes the scheme merchant-funded. Promoted rewards are labelled Sponsored and keep their real price, distance and availability, so paid placement changes the order and never the facts.',
        },
      ],
      nextTime: [
        'Test the earning rules against a real merchant\u2019s week rather than seeded data — the classification is the part I would most want to see fail in the wild.',
        'Push XP expiry into the same derived model. It is currently the one place where a scheduled job would be easier than a rule, and that asymmetry bothers me.',
        'Sit with a hawker stall owner while they read the merchant insight page. I designed it from what the ledger could support, not from what they would ask first.',
      ],
    },
  },

  {
    number: '02',
    slug: 'pulseops',
    year: '2025',
    title: 'PulseOps EMS Command Center',
    eyebrow: 'Operational web application',
    label: 'Distinction Presentation',
    summary:
      'A workforce command center that turns fragmented EMS planning into one operational flow for rosters, absence coverage, staff health, payroll, and reporting.',
    problem:
      'Manual crew rostering and fleet coordination make it difficult to fill urgent gaps, balance fatigue, and verify payroll accurately.',
    approach:
      'Designed a connected interface for calendar-based rostering, last-minute replacement matching, staff availability, fatigue signals, CPF-aware payroll, and exportable reports.',

    // Item 21: the claim leads, the caveat follows in smaller type rather than
    // being buried in the same grey sentence at the same weight.
    headline: { figure: '50%', unit: 'less', label: 'manual planning time' },
    footnote:
      'Modeled from a workflow comparison of reduced coordination steps — not a production measurement.',
    outcome:
      'Workflow comparison modeled up to 50% less manual planning time against the current coordination process.',

    // Item 24: scannable facts. Deliberately only things that are literally true of
    // the build — no invented adoption or performance numbers.
    stats: [
      { value: '6', label: 'connected interfaces' },
      { value: '5', label: 'operational domains' },
      { value: '1', label: 'solo build' },
    ],

    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Workflow design'],

    // Item 18: was an http:// link shortener. Now the canonical deployment.
    demo: 'https://emspulseops.vercel.app/',
    demoNote: 'Open the prototype',

    visual: {
      kind: 'gallery',
      images: [
        {
          image: 'pulseops-dashboard',
          alt: 'PulseOps operations command center showing staffing status, crew gaps and fatigue watch',
        },
        { image: 'pulseops-roster', alt: 'PulseOps roster builder assigning crews across the week' },
        {
          image: 'pulseops-coverage',
          alt: 'PulseOps emergency coverage view ranking replacement candidates',
        },
        {
          image: 'pulseops-staff',
          alt: 'PulseOps staff management view with availability and fatigue indicators',
        },
        { image: 'pulseops-attendance', alt: 'PulseOps events and attendance tracking view' },
        { image: 'pulseops-payroll', alt: 'PulseOps payroll view with overtime and CPF estimates' },
      ],
    },

    highlight: {
      eyebrow: 'Highlighted feature',
      title: 'Rule-based roster validation',
      blurb:
        'Assignment is not a drag-and-drop with a warning afterwards — the rules run before a crew member can be placed on a shift.',
      points: [
        'Checks role, service qualification, availability, shift duration, rotation and rest period on every assignment.',
        'Absence reporting ranks replacement candidates instead of leaving a coordinator to scan a list.',
        'Fatigue scores surface consecutive-shift risk on the dashboard rather than inside a report nobody opens.',
      ],
    },

    // Item 23: six frozen screenshots became one thing that moves. These captions
    // narrate the real screens in task order rather than listing them as a grid.
    walkthrough: [
      {
        image: 'pulseops-dashboard',
        step: 'See the day',
        alt: 'PulseOps operations command center showing staffing status, crew gaps and fatigue watch',
        caption: 'Open on what is wrong right now: who is on MC, which stations cannot deploy.',
      },
      {
        image: 'pulseops-roster',
        step: 'Build the week',
        alt: 'PulseOps roster builder assigning crews across the week',
        caption: 'Assign crews across the calendar and see which ambulances are still short.',
      },
      {
        image: 'pulseops-coverage',
        step: 'Fill an urgent gap',
        alt: 'PulseOps emergency coverage view ranking replacement candidates',
        caption: 'Match a last-minute absence against who is actually available and rested.',
      },
      {
        image: 'pulseops-staff',
        step: 'Watch the crew',
        alt: 'PulseOps staff management view with availability and fatigue indicators',
        caption: 'Availability and fatigue signals sit next to the person, not in a separate report.',
      },
      {
        image: 'pulseops-payroll',
        step: 'Verify the pay',
        alt: 'PulseOps payroll view with overtime and CPF estimates',
        caption: 'CPF-aware payroll reconciles against the hours the roster actually recorded.',
      },
    ],

    // Item 22 — the messy middle.
    // This renders whatever is in the array and hides itself when the array is empty.
    // It is intentionally EMPTY: the whiteboard photos, rejected layouts and early
    // wireframes are Hadi's to supply, and inventing them would defeat the point.
    // To fill it, drop files in /public/assets/process/ and add entries shaped like:
    //   { src: '/assets/process/roster-v1.jpg', label: 'Rejected roster layout', note: 'Why it did not work' }
    artifacts: [],

    caseStudy: {
      role: 'Solo — research, interface design, and build',
      period: '2025',
      context:
        'Emergency medical services run on a rota that changes faster than the spreadsheet tracking it. A single absence on an early shift cascades: someone has to find a qualified replacement, check they are not already over their hours, reassign the vehicle, and make sure the change survives into payroll at the end of the month. Each of those steps lived in a different place.',
      constraints: [
        'Coverage rules are non-negotiable — an ambulance cannot roll without the right crew mix.',
        'Fatigue is a safety constraint, not a preference, so availability alone is not enough to justify a match.',
        'Payroll has to reconcile against CPF rules, which means the roster is a financial record, not just a plan.',
        'The people using it are mid-shift and interrupted. Anything requiring a manual to operate would not be used.',
      ],
      decisions: [
        {
          title: 'One surface, not five tools',
          body: 'The obvious build is five clean screens that each do one job well. That is easier to make and worse to use, because the actual work is the handoff between them. Rostering, coverage, staff health, payroll and reporting share one state so a change in one is visible in the rest.',
        },
        {
          title: 'Replacement matching suggests, it does not decide',
          body: 'Auto-assigning the best-scoring replacement would be a shorter interaction and the wrong call. A coordinator knows things the data does not. The interface ranks candidates and shows why each one ranks where it does, then lets a person choose.',
        },
        {
          title: 'Fatigue sits next to the name',
          body: 'A separate fatigue report is a report nobody opens during an emergency. Putting the signal directly on the person in the replacement list means the constraint is visible at the exact moment the decision is made.',
        },
      ],
      nextTime: [
        'Instrument the real thing. Every number attached to this project is modeled from a workflow comparison, and I would rather have one measured week than a defensible estimate.',
        'Test the replacement flow with a coordinator under time pressure rather than in a calm review — the interaction I am least sure about is the one that only matters when someone is rushing.',
        'Push the payroll rules into a testable module. They are the most rule-dense part of the system and currently the least isolated.',
      ],
    },
  },

  {
    number: '03',
    slug: 'food-insecurity',
    year: '2025',
    title: 'Global Food Insecurity Dashboard',
    eyebrow: 'Business analytics, four-person team',
    summary:
      'An interactive Tableau view connecting conflict, political instability, drought, food prices, and human impact to help decision-makers identify areas of escalating need.',
    problem:
      'NGOs and governments need a consolidated view of overlapping risk factors to prioritize aid and detect potential crisis escalation earlier.',
    approach:
      'My contribution focused on sourcing and merging inconsistent datasets in Tableau Prep, engineering severity and impact measures, and building geospatial and diagnostic views with time and event filters.',
    outcome:
      'The analysis supported prioritizing regions with the greatest overlap between instability and food insecurity, with geospatial monitoring proposed as an early-warning input.',

    stats: [
      { value: '4', label: 'person team' },
      { value: '5', label: 'risk factors joined' },
      { value: '3', label: 'view types built' },
    ],

    note: 'Used descriptive and diagnostic analysis, plus MODEL_QUANTILE and MODEL_PERCENTILE functions to explore incident trends. Sensitive conflict data was presented in a neutral academic frame.',

    visual: {
      kind: 'gallery',
      images: [
        {
          image: 'food-insecurity-dashboard',
          alt: 'Tableau food scarcity dashboard with regional, time-series, and geospatial views',
        },
      ],
    },

    stack: ['Tableau Desktop', 'Tableau Prep', 'Excel', 'Data cleaning', 'Geospatial analysis'],
    artifacts: [],
  },

  {
    number: '04',
    slug: 'fairprice-sim',
    year: '2024',
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

    stats: [
      { value: '5', label: 'core operations' },
      { value: '100%', label: 'input paths validated' },
    ],

    // Item 16: this project previously rendered as a wall of grey text between two
    // illustrated ones. This is an authored *illustration of the documented program
    // flow* — labelled as such in the UI — not a capture of a real session.
    visual: {
      kind: 'terminal',
      caption: 'Illustration of the program flow — browse, validate, checkout, receipt.',
      lines: [
        { type: 'out', text: 'FAIRPRICE ONLINE — SHOPPING SIMULATION' },
        { type: 'out', text: '1) Browse  2) View cart  3) Checkout  4) Exit' },
        { type: 'in', text: '1' },
        { type: 'out', text: '  [01] Rice 5kg .............. $12.90' },
        { type: 'out', text: '  [02] Chicken breast 1kg .... $ 8.45' },
        { type: 'out', text: '  [03] Kopi-O 200g ........... $ 4.20' },
        { type: 'in', text: 'add 02 qty 3' },
        { type: 'ok', text: '  Added 3 x Chicken breast 1kg' },
        { type: 'in', text: 'add 09' },
        { type: 'err', text: '  Item 09 not found. Enter a listed item number.' },
        { type: 'in', text: 'remove 02 qty 1' },
        { type: 'ok', text: '  Cart updated: 2 x Chicken breast 1kg' },
        { type: 'in', text: '3' },
        { type: 'out', text: '  ---------- RECEIPT ----------' },
        { type: 'out', text: '  2 x Chicken breast 1kg   $16.90' },
        { type: 'out', text: '  Subtotal                 $16.90' },
        { type: 'out', text: '  GST 9%                   $ 1.52' },
        { type: 'out', text: '  TOTAL                    $18.42' },
        { type: 'ok', text: '  Expenditure logged for this session.' },
      ],
    },

    stack: ['Python', 'Algorithms', 'Data structures', 'Input validation'],
    artifacts: [],
  },

  {
    number: '05',
    slug: 'clinic-digitalisation',
    year: '2024',
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

    stats: [
      { value: '4', label: 'handoffs removed' },
      { value: '2', label: 'user views designed' },
    ],

    // Item 16 + 22: this project's own stated deliverable was a workflow map, so the
    // map is the honest visual for it — drawn here from the documented before/after.
    visual: {
      kind: 'flow',
      caption: 'The workflow map this concept was built from.',
      before: {
        label: 'Manual today',
        steps: [
          'Phone booking',
          'Paper record pulled',
          'Queue called by hand',
          'Staff asks around',
          'Notes filed back',
        ],
      },
      after: {
        label: 'Proposed',
        steps: [
          'Self-serve booking',
          'Record opens with the booking',
          'Queue updates itself',
          'Staff view is shared',
        ],
      },
    },

    stack: ['Python 3.5', 'Workflow mapping', 'Interface design', 'User feedback'],
    artifacts: [],
  },
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);
