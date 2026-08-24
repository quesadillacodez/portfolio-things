// Item 17 (round two): the notes were three paragraphs on the index with no dates, no
// links and nothing to read — writing-shaped furniture rather than writing. Each one now
// has a slug, a date and a page of its own at #/note/<slug>.
//
// `dek` is what the index shows. `body` is the note itself.
export const notes = [
  {
    slug: 'cpf-edge-cases',
    title: 'What CPF rules taught me about edge cases',
    date: '2026-06-14',
    project: 'PulseOps',
    minutes: 3,
    dek: 'Payroll looks like arithmetic until you write the contribution logic. Then it turns out the interesting part is never the formula.',
    body: [
      'Payroll looks like arithmetic. Hours times rate, add overtime, subtract deductions, done. I believed that for about a day and a half.',
      'CPF contribution rates depend on age band. They also depend on whether the money is an ordinary wage or an additional wage, and each of those has its own ceiling, and the additional-wage ceiling is calculated against what the ordinary wages did across the whole year. None of that is visible in the happy path. A 25-year-old paramedic on a normal week gives you the right answer with the naive formula, which is exactly why the naive formula survives so long.',
      'What broke it was a crew member turning 55 mid-month. The rate changes, and the sensible question — changes from when? — has an answer in the rules that I would never have guessed and had to go and read.',
      'The thing I actually took from it is not about CPF. It is that a spec describes the middle of a range, and the bugs live at both ends. Now the first question I ask about any rule is not "what does this do" but "where does this stop being true".',
      'It also changed how I write the tests. I used to test the case in the spec. I now test the case just before the boundary, the boundary itself, and the case just after, and I write those three before I write the function.',
    ],
  },
  {
    slug: 'first-roster-ui',
    title: 'Why I threw out my first roster UI',
    date: '2026-07-02',
    project: 'PulseOps',
    minutes: 3,
    dek: 'It let you assign anyone to anything and complained afterwards. It looked flexible. It was useless.',
    body: [
      'The first roster builder let you drag any crew member onto any shift. If the assignment broke a rule, a red banner appeared underneath explaining what you had done wrong.',
      'I was pleased with it. It was flexible, it did not get in your way, and it explained itself. Every one of those is a virtue in the abstract and a mistake here.',
      'A coordinator filling an urgent gap is not exploring options. Someone has called in sick, an ambulance cannot roll, and there are maybe ninety seconds of attention available. In that state a warning after the fact is not information, it is rework. You made a choice, the screen told you the choice was invalid, and now you are back where you started with less time.',
      'The version that replaced it inverts the order. The system works out who can legally take the shift before you touch anything, ranks them by how tired they are, and shows the reasoning next to each name. Two of the four candidates in the demo on the home page cannot take the shift at all, and the interface says so before you can pick them.',
      'The screen got smaller and did less. It also got about four times faster to use, which is the only measurement that mattered.',
      'The general version of this: validation placed after an action is a report. Validation placed before it is a tool. They cost roughly the same to build and they are not remotely the same product.',
    ],
  },
  {
    slug: 'rewards-loophole',
    title: 'Every rewards system has a loophole',
    date: '2026-08-09',
    project: 'NETS',
    minutes: 3,
    dek: 'The first version of the XP store earned points on every transaction. Two friends could sit in a café and mint XP out of nothing.',
    body: [
      'The first version of the XP Rewards Store awarded points on every transaction that moved money. It was one line of logic and it felt obviously correct: you used NETS, you get XP.',
      'Then someone on the team asked what happens if two users repay each other. I paid you five dollars, you paid me five dollars back, and we both earned. Do it in a loop and you mint XP out of nothing while the net balance never moves.',
      'The tempting fix is a limit. Cap the XP per day, or flag accounts with suspicious repayment patterns, or add a cooldown. All of those work, and all of them are the same mistake: they leave the rule wrong and add machinery to contain it.',
      'The actual fix was to decide that the transaction type is what qualifies, not the amount. Merchant purchases earn. Repayments, top-ups, cashback and goal contributions earn nothing, because none of them are the behaviour the scheme is trying to buy. The loop stops existing rather than being policed.',
      'That also made the rest of the system simpler. Because earning is derived from the transaction ledger rather than stored as a balance, and because only one transaction type qualifies, the XP figure cannot drift away from the events that produced it. There is no balance column anywhere in the schema, and the admin database explorer re-checks that at render time.',
      'The rule I keep from this: when you find a loophole, look for the version of the rule that closes it by being more precise, before you reach for the version that closes it by adding a guard.',
    ],
  },
];

export const getNote = (slug) => notes.find((note) => note.slug === slug);
