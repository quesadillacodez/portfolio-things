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

export const projects = [
  {
    number: '01',
    slug: 'pulseops',
    title: 'PulseOps EMS Command Center',
    eyebrow: 'Operational web application',
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

    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Workflow design'],

    // Item 18: upgraded from `http://` to `https://`. This is still a shortener and
    // should be replaced with the canonical deployment URL — see README "Known gaps".
    demo: 'https://bit.ly/3RzZDjx',
    demoNote: 'Opens the interactive prototype',

    visual: {
      kind: 'gallery',
      images: [
        { src: '/assets/pulseops-roster.jpeg', alt: 'PulseOps weekly roster builder with ambulance coverage planning' },
        { src: '/assets/pulseops-1.jpeg', alt: 'PulseOps emergency coverage center showing staff replacement matching' },
        { src: '/assets/pulseops-2.jpeg', alt: 'PulseOps staff management view with availability and fatigue indicators' },
        { src: '/assets/pulseops-3.jpeg', alt: 'PulseOps payroll verification interface' },
        { src: '/assets/pulseops-4.jpeg', alt: 'PulseOps service plan interface' },
        { src: '/assets/pulseops-5.jpeg', alt: 'PulseOps operational reports interface' },
      ],
    },

    // Item 23: six frozen screenshots became one thing that moves. These captions
    // narrate the real screens in task order rather than listing them as a grid.
    walkthrough: [
      { src: '/assets/pulseops-roster.jpeg', step: 'Build the week', caption: 'Assign crews across the calendar and see which ambulances are still short.' },
      { src: '/assets/pulseops-1.jpeg', step: 'Fill an urgent gap', caption: 'Match a last-minute absence against who is actually available and rested.' },
      { src: '/assets/pulseops-2.jpeg', step: 'Watch the crew', caption: 'Availability and fatigue signals sit next to the person, not in a separate report.' },
      { src: '/assets/pulseops-3.jpeg', step: 'Verify the pay', caption: 'CPF-aware payroll reconciles against the hours the roster actually recorded.' },
      { src: '/assets/pulseops-5.jpeg', step: 'Export the answer', caption: 'Operational reports leave the system in a form a manager can forward.' },
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
    number: '02',
    slug: 'food-insecurity',
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

    note:
      'Used descriptive and diagnostic analysis, plus MODEL_QUANTILE and MODEL_PERCENTILE functions to explore incident trends. Sensitive conflict data was presented in a neutral academic frame.',

    visual: {
      kind: 'gallery',
      images: [
        { src: '/assets/food-insecurity-dashboard.png', alt: 'Tableau food scarcity dashboard with regional, time-series, and geospatial views' },
      ],
    },

    stack: ['Tableau Desktop', 'Tableau Prep', 'Excel', 'Data cleaning', 'Geospatial analysis'],
    artifacts: [],
  },

  {
    number: '03',
    slug: 'fairprice-sim',
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
    number: '04',
    slug: 'clinic-digitalisation',
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
        steps: ['Phone booking', 'Paper record pulled', 'Queue called by hand', 'Staff asks around', 'Notes filed back'],
      },
      after: {
        label: 'Proposed',
        steps: ['Self-serve booking', 'Record opens with the booking', 'Queue updates itself', 'Staff view is shared'],
      },
    },

    stack: ['Python 3.5', 'Workflow mapping', 'Interface design', 'User feedback'],
    artifacts: [],
  },
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);
