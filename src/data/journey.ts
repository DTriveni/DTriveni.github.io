// The career story, oldest first. `role` links to the detailed record in
// experience.ts, which appears under "More detail". Dates are checked against
// the Master Experience Database.
export interface Stop {
  chapter: number;
  year: string;
  title: string;
  org: string;
  text: string;
  role?: string;
  link?: { label: string; href: string };
}

// The four chapters of the story on the home page.
export const chapters = [
  { n: 1, numeral: 'I', span: '2018', title: 'Foundations', intro: 'A physics degree and a habit of quantitative reasoning.' },
  { n: 2, numeral: 'II', span: '2019 to 2023', title: 'Systems', intro: 'Learning how data moves through real enterprise systems, and what happens when it fails.' },
  { n: 3, numeral: 'III', span: '2023 to 2025', title: 'Education data', intro: 'Turning school and programme data into evidence that managers, donors and leaders use.' },
  { n: 4, numeral: 'IV', span: '2025 to 2026', title: 'Data science', intro: 'Adding depth in statistics, machine learning and AI, and bringing the strands together.' },
];

export const journey: Stop[] = [
  {
    chapter: 1,
    year: '2018',
    title: 'BSc Physics (Honours)',
    org: 'Azim Premji University',
    text: 'A grounding in quantitative reasoning and analytical problem solving that still underpins how I approach data. [NEEDS PERSONAL STORY: why you moved from physics into technology]',
  },
  {
    chapter: 2,
    year: '2019',
    title: 'Systems Integration Engineer',
    org: 'Tech Mahindra, Pune, 2019 to 2022',
    text: 'Built and maintained Microsoft BizTalk integration workflows for mission-critical enterprise applications, coordinated production deployments, and served as primary technical contact for enterprise customers in the Netherlands. Treating recurring failures as patterns rather than isolated incidents shaped the way I work on problems today.',
    role: 'tech-mahindra',
  },
  {
    chapter: 2,
    year: '2021',
    title: 'Alumni Board Member',
    org: 'The Akanksha Foundation, 2021 to 2023',
    text: 'Alongside engineering, I contributed to strategy and governance, advocated for STEM opportunities that fed into an enrichment programme across 15 partner schools, and co-organised donor events that helped raise approximately $1 million for schools in India.',
    role: 'akanksha-board',
  },
  {
    chapter: 3,
    year: '2023',
    title: 'PG Diploma in Data Science and AI',
    org: 'Savitribai Phule Pune University – DOT',
    text: 'Formal training in data science and machine learning, completed with a GPA of 9.4/10. [NEEDS PERSONAL STORY: what prompted the move from engineering into data]',
  },
  {
    chapter: 3,
    year: '2023',
    title: 'Data & Evaluation Lead',
    org: 'ProblemSolvers Lab, 2023 to present',
    text: 'Having contributed to the organisation’s early development from a 30-student pilot, I built its data and evaluation function as it grew to 13 partner organisations and 36 schools: indicators, trackers, dashboards and the reports programme managers and donors rely on.',
    role: 'psl-data',
    link: { label: 'Read the case study', href: '/projects/problemsolvers-lab/' },
  },
  {
    chapter: 3,
    year: '2024',
    title: 'Associate Data Analyst',
    org: 'The Akanksha Foundation, Pune, 2024 to 2025',
    text: 'Replaced manual assessment and attendance reporting with an automated REST API, Python and MySQL workflow across 28 schools, and developed school-level KPIs to prioritise infrastructure and resource support.',
    role: 'akanksha-analyst',
    link: { label: 'Read the case study', href: '/projects/akanksha-school-data/' },
  },
  {
    chapter: 4,
    year: '2025',
    title: 'MSc Data Science, Chevening Scholar',
    org: 'University of Bristol',
    text: 'Selected for the UK government’s Chevening Scholarship and the University of Bristol’s Think Big Scholarship. The MSc added depth in statistical modelling, machine learning, natural language processing and uncertainty quantification. [NEEDS PERSONAL STORY: why this MSc, and why now]',
  },
  {
    chapter: 4,
    year: '2026',
    title: 'Dissertation with AstraZeneca',
    org: 'University of Bristol',
    text: 'Designed and built CellLineSelector, an evidence-ranking platform that brings together 19 biological datasets, statistical inference, uncertainty quantification and an LLM interface. Also completed the McKinsey Forward Programme.',
    link: { label: 'Read the case study', href: '/projects/celllineselector/' },
  },
];
