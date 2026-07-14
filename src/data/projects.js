// Keeping portfolio content separate from presentation makes future project and link
// updates safe to make without touching the component structure.
export const projects = [
  {
    number: '01',
    title: 'PulseOps EMS Command Center',
    eyebrow: 'Operational web application',
    summary:
      'A workforce command center that turns fragmented EMS planning into one operational flow for rosters, absence coverage, staff health, payroll, and reporting.',
    problem:
      'Manual crew rostering and fleet coordination make it difficult to fill urgent gaps, balance fatigue, and verify payroll accurately.',
    approach:
      'Designed a connected interface for calendar-based rostering, last-minute replacement matching, staff availability, fatigue signals, CPF-aware payroll, and exportable reports.',
    outcome:
      'Workflow comparison modeled up to 50% less manual planning time. This is a projected result based on reduced coordination steps, not a production measurement.',
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Workflow design'],
    demo: 'http://bit.ly/3RzZDjx',
    images: [
      { src: '/assets/pulseops-roster.jpeg', alt: 'PulseOps weekly roster builder with ambulance coverage planning' },
      { src: '/assets/pulseops-1.jpeg', alt: 'PulseOps emergency coverage center showing staff replacement matching' },
      { src: '/assets/pulseops-2.jpeg', alt: 'PulseOps staff management view with availability and fatigue indicators' },
      { src: '/assets/pulseops-3.jpeg', alt: 'PulseOps payroll verification interface' },
      { src: '/assets/pulseops-4.jpeg', alt: 'PulseOps service plan interface' },
      { src: '/assets/pulseops-5.jpeg', alt: 'PulseOps operational reports interface' },
    ],
  },
  {
    number: '02',
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
    stack: ['Tableau Desktop', 'Tableau Prep', 'Excel', 'Data cleaning', 'Geospatial analysis'],
    note:
      'Used descriptive and diagnostic analysis, plus MODEL_QUANTILE and MODEL_PERCENTILE functions to explore incident trends. Sensitive conflict data was presented in a neutral academic frame.',
    images: [
      { src: '/assets/food-insecurity-dashboard.png', alt: 'Tableau food scarcity dashboard with regional, time-series, and geospatial views' },
    ],
  },
  {
    number: '03',
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
    number: '04',
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
