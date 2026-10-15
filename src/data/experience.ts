// Roles, in reverse chronological order of start date.
// Every fact here comes from the Master Experience Database.
// Metrics use kind 'scope' (how big the work was) or 'result' (what changed).

export interface Metric {
  value: string;
  label: string;
  context?: string;
  kind: 'scope' | 'result';
}

export interface Role {
  id: string;
  org: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  kind: 'Employment' | 'Leadership' | 'Mentorship';
  context: string;
  responsibilities: string[];
  accomplishments: string[];
  problems?: string[];
  tech?: string[];
  metrics?: Metric[];
  projects?: { label: string; href: string }[];
}

export const roles: Role[] = [
  {
    id: 'psl-data',
    org: 'ProblemSolvers Lab',
    role: 'Data & Evaluation Lead',
    start: 'Oct 2023',
    end: 'Present',
    kind: 'Employment',
    context:
      'ProblemSolvers Lab is a nonprofit that helps school students apply what they learn to real problems. I own its data, evaluation and monitoring function. [NEEDS CONFIRMATION: is this role paid, part-time or voluntary, and was it ever full-time?]',
    responsibilities: [
      'Run the full data lifecycle: collection, validation, cleaning, analysis, evaluation, dashboards and reporting.',
      'Work with 24 programme managers to decide what should be measured and how the results will be used.',
      'Translate programme objectives into measurable student, teacher and programme indicators.',
      'Produce impact, donor, partner, beginning-of-year and end-of-year reports, and programme presentations.',
    ],
    accomplishments: [
      'Established and led the organisation’s data and evaluation function across 9 partner organisations, 36 schools and 800+ students, creating standardised measurement frameworks, reporting processes and data systems to improve programme oversight and provide leadership with a consistent view of performance and outcomes.',
      'Designed a longitudinal monitoring and evaluation framework across 6 problem-solving competencies, translating student and teacher observations into measurable baseline and endline indicators and using structured data analysis to assess progress, compare outcomes across partner organisations and identify areas for programme improvement.',
      'Automated programme data collection, consolidation and reporting using Google Apps Script and Google Sheets, replacing repetitive manual processes with reliable workflows, pivot-table analysis and live dashboards that enabled programme managers to independently monitor progress and access actionable insights.',
      'Evaluated programme effectiveness through cohort-level analysis of baseline and endline data, identifying a 65% improvement in student problem-solving competencies and translating findings into evidence-based recommendations to strengthen programme delivery, inform strategic priorities and guide future scaling.',
      'Produced annual impact reports combining quantitative analysis and qualitative evidence, synthesising programme outcomes, partner-level performance and key learnings into clear insights and recommendations for leadership and external stakeholders, supporting programme reviews, impact communication and decisions on improvement and expansion.',
    ],
    problems: [
      'Programme objectives existed, but there was no consistent evidence base for judging programme effectiveness.',
      'Partner data arrived in different shapes and needed manual consolidation before it could be analysed.',
    ],
    tech: ['Data collection and validation', 'Data cleaning', 'Dashboards [NEEDS CONFIRMATION: tool used]', 'KPI design', 'Reporting'],
    metrics: [
      { value: '13', label: 'partner organisations', context: 'Programme scope, not an outcome', kind: 'scope' },
      { value: '36', label: 'schools', kind: 'scope' },
      { value: '800+', label: 'students', kind: 'scope' },
      { value: '109', label: 'teachers', kind: 'scope' },
      { value: '24', label: 'programme managers I work with', kind: 'scope' },
    ],
  },
  {
    id: 'akanksha-analyst',
    org: 'The Akanksha Foundation',
    role: 'Associate Data Analyst',
    start: 'May 2024',
    end: 'Aug 2025',
    location: 'Pune, India',
    kind: 'Employment',
    context:
      'The Akanksha Foundation runs education programmes in schools. I worked on school, student, assessment, attendance and infrastructure data, replacing manual data handling with automated workflows and using data to support prioritisation.',
    responsibilities: [
      'Automated the extraction, cleaning and storage of assessment and attendance data.',
      'Built and maintained reporting dashboards for stakeholders.',
      'Worked with the community-development team on school infrastructure and resource data.',
    ],
    accomplishments: [
      'Transformed a previously manual, Excel-based reporting process across 25 schools into an automated, end-to-end data pipeline using REST APIs, Python and MySQL, reducing report-generation time by 80% and reporting errors by 90% compared with the previous year.',
      'Analysed school-level and student outcome data to identify performance gaps, translating findings into KPIs and dashboards that helped programme teams prioritise interventions.',
      'Used KPI analysis to identify schools requiring targeted support, informing intervention planning across approximately 60% of schools.',
      'Developed analytical reports connecting school performance trends with programme needs, supporting data-informed decisions on resource allocation and targeted initiatives.',
    ],
    problems: [
      'Recurring reporting depended on repeatedly downloading data and consolidating it by hand.',
      'Schools had different infrastructure and resource needs, but there was no shared way to compare them.',
    ],
    tech: ['REST APIs', 'Python', 'Pandas', 'NumPy', 'MySQL', 'Dashboards [NEEDS CONFIRMATION: tool used]'],
    metrics: [
      { value: '25', label: 'schools', context: 'Covered by the automated reporting', kind: 'scope' },
      { value: '15,490', label: 'students', context: 'In the assessment and attendance data', kind: 'scope' },
      { value: '760+', label: 'educators', kind: 'scope' },
    ],
  },
  {
    id: 'psl-founding',
    org: 'ProblemSolvers Lab',
    role: 'Associate, Founder’s Office',
    start: '[NEEDS CONFIRMATION: start]',
    end: '[NEEDS CONFIRMATION: end]',
    kind: 'Leadership',
    context:
      'Before leading data and evaluation, I worked directly with the founder during the organisation’s early development.',
    responsibilities: [
      'Programme design, pilot implementation, school outreach and partnership development.',
      'Testing programme approaches and supporting early scaling.',
    ],
    accomplishments: [
      'Helped run a six-week pilot with 30 students and one partner organisation, a small setting in which programme assumptions could be tested before expansion.',
      'Contributed to the partnership development and early scaling that took the organisation to its current scope of 13 partner organisations and 36 schools.',
    ],
    metrics: [
      { value: '30', label: 'students in the first pilot', context: 'Six weeks, one partner organisation', kind: 'scope' },
    ],
  },
  {
    id: 'akanksha-board',
    org: 'The Akanksha Foundation',
    role: 'Alumni Board Member',
    start: 'Sep 2021',
    end: 'Sep 2023',
    location: 'Pune, India',
    kind: 'Leadership',
    context:
      'A strategic and governance role alongside my engineering job, focused on educational impact.',
    responsibilities: [
      'Took part in strategic decision-making and alumni programme governance.',
      'Partnered with senior leadership to strengthen mentorship and career-guidance initiatives.',
      'Co-organised major fundraising events: logistics, agendas, senior participants, stakeholder liaison, community engagement and volunteer mobilisation.',
    ],
    accomplishments: [
      'Contributed to strategic decision-making and programme governance, using student and alumni needs to advocate for stronger pathways in STEM, higher education, employability and leadership development.',
      'Advocated for a comprehensive STEM enrichment pathway for students from underrepresented backgrounds; the resulting programme was launched across 15 partner schools and was associated with a 40% increase in student participation in STEM extracurricular activities as compared to 2021-2022.',
      'Partnered with senior leadership to strengthen mentorship, career guidance, university exploration and skills-development opportunities for alumni, helping expand pathways beyond formal schooling.',
      'Supported initiatives connecting alumni with leadership and skills-development opportunities; the Foundation reports 95% of participating alumni securing admission to colleges or vocational programmes, with 15 alumni admitted to leading universities for graduate programmes beginning AY 2024–25.',
      'Helped strengthen alumni partnerships and external collaborations across education, vocational training, skills development, mentoring and scholarships, contributing to a network of 35+ partnerships formed or retained.',
      'Co-organised major fundraising events for schools in India, contributing to $1 million raised through engagement with high-net-worth individuals and donors; coordinated event logistics, agendas and senior stakeholder participation.',
      'Led community engagement and volunteer mobilisation, supporting the Foundation\'s broader objective of expanding educational and career opportunities for students and alumni.',
    ],
    metrics: [
      { value: '15', label: 'partner schools in the STEM programme', kind: 'scope' },
      { value: '40%', label: 'reported rise in STEM extracurricular participation', context: 'Compared with 2021-2022, as reported by the programme', kind: 'result' },
      { value: '~$1M', label: 'raised at events I co-organised', context: 'Team result, not individual', kind: 'result' },
    ],
  },
  {
    id: 'tech-mahindra',
    org: 'Tech Mahindra',
    role: 'Systems Integration Engineer',
    start: 'Apr 2019',
    end: 'Aug 2022',
    location: 'Pune, India',
    kind: 'Employment',
    context:
      'Enterprise integration for mission-critical business processes. The systems I worked on moved data and messages between enterprise applications, so a failure could interrupt business operations.',
    responsibilities: [
      'Developed and maintained integration workflows in Microsoft BizTalk.',
      'Coordinated application deployments across test and production environments.',
      'Acted as primary technical contact for enterprise customers in the Netherlands.',
    ],
    accomplishments: [
      'Investigated recurring application and production issues by analysing incident patterns, identifying root causes and implementing corrective actions, contributing to a 40% reduction in recurring incidents.',
      'Tested applications across pre-production environments, documented test outcomes and generated test reports to support release readiness and identify issues before deployment.',
      'Coordinated application deployments to production, managing release activities and validating deployments to support business continuity.',
      'Developed and maintained standard operating procedures (SOPs) for resolving recurring issues, standardising troubleshooting practices and improving consistency in incident resolution.',
      'Analysed incident trends and produced stability and improvement reports, providing evidence to prioritise corrective actions and strengthen application reliability.',
      'Acted as a technical point of contact for enterprise customers in the Netherlands, translating requirements into integration solutions and coordinating issue resolution across technical teams.',
      'Received the Pat on the Back Award (2020) for ownership and initiative.',
    ],
    problems: [
      'Integration failures in production could affect business-critical processes.',
      'Recurring incidents needed root causes, not repeated one-off fixes.',
    ],
    tech: ['Microsoft BizTalk', 'Enterprise integration', 'Production deployment', 'Root-cause analysis'],
  },
  {
    id: 'isl',
    org: 'Indian School of Leadership',
    role: 'Mentor',
    start: '[NEEDS CONFIRMATION: dates]',
    end: '',
    kind: 'Mentorship',
    context: 'Mentoring students who were developing social-impact projects.',
    responsibilities: [
      'Mentored student projects on environmental sustainability, gender equality, education and leadership.',
      'Facilitated design-thinking workshops covering empathy, problem definition, ideation and prototyping.',
      'Connected students with changemakers and practitioners who could offer relevant expertise.',
    ],
    accomplishments: [
      'Supported a student who developed a project on personalised learning and leadership for junior-high students.',
    ],
  },
];
