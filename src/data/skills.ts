// Skills by capability. Each row says what the skill was used for and where,
// so the page reads as evidence rather than a keyword list.
// A skill without an evidence link belongs in `unevidenced` until one exists.

interface Where { label: string; href: string }
export interface SkillRow { skill: string; usedFor: string; where: Where[] }
export interface SkillGroup { name: string; intro: string; rows: SkillRow[] }

const P = {
  cls: { label: 'CellLineSelector', href: '/projects/celllineselector/' },
  census: { label: 'Household deprivation', href: '/projects/household-deprivation/' },
  nlp: { label: 'Research discourse (group)', href: '/projects/research-discourse-nlp/' },
  clinical: { label: 'Clinical ML framework (designed)', href: '/projects/clinical-ml-generalisation/' },
  psl: { label: 'ProblemSolvers Lab', href: '/projects/problemsolvers-lab/' },
  aka: { label: 'Akanksha Foundation', href: '/projects/akanksha-school-data/' },
  tm: { label: 'Tech Mahindra', href: '/experience/#tech-mahindra' },
};

export const skillGroups: SkillGroup[] = [
  {
    name: 'Data engineering',
    intro: 'Getting fragmented or manually handled data into a validated, queryable shape.',
    rows: [
      { skill: 'ETL design', usedFor: 'Modular, resumable Python ETL that recovers from interruptions instead of rerunning everything.', where: [P.cls] },
      { skill: 'REST API ingestion', usedFor: 'Pulling assessment and attendance data from source systems instead of downloading it by hand.', where: [P.aka] },
      { skill: 'Schema harmonisation', usedFor: 'Aligning 19 biomedical sources; reconciling changed Census categories and local-authority boundaries.', where: [P.cls, P.census] },
      { skill: 'Entity resolution', usedFor: 'Accession-based matching of biological entities across sources.', where: [P.cls] },
      { skill: 'Data validation', usedFor: 'Automated checks on schema validity, row counts, join cardinality and cross-source consistency.', where: [P.cls, P.psl] },
      { skill: 'Enterprise integration', usedFor: 'Microsoft BizTalk workflows moving data and messages between mission-critical applications.', where: [P.tm] },
    ],
  },
  {
    name: 'Programming and databases',
    intro: 'The languages and stores behind the pipelines, models and interfaces on this site.',
    rows: [
      { skill: 'Python (Pandas, NumPy)', usedFor: 'Cleaning, transformation, ETL, statistical modelling and analysis.', where: [P.cls, P.aka, P.census] },
      { skill: 'SQL', usedFor: 'Querying the MySQL reporting database and the DuckDB analytical store.', where: [P.aka, P.cls] },
      { skill: 'DuckDB', usedFor: 'A single analytical store for 19 harmonised datasets.', where: [P.cls] },
      { skill: 'MySQL', usedFor: 'Structured storage behind recurring school reporting.', where: [P.aka] },
      { skill: 'TypeScript and React', usedFor: 'The web interface presenting rankings, uncertainty and evidence.', where: [P.cls] },
    ],
  },
  {
    name: 'Statistics and uncertainty',
    intro: 'Methods chosen to say how sure a result is, not only what it is.',
    rows: [
      { skill: 'Empirical Bayes', usedFor: 'Shrinking noisy per-source evidence before fusion; Beta-Binomial estimates of deprivation.', where: [P.cls, P.census] },
      { skill: 'Bayesian linear regression', usedFor: 'Predicting 2021 deprivation from 2011 indicators with credible intervals.', where: [P.census] },
      { skill: 'Monte Carlo uncertainty propagation', usedFor: 'Confidence intervals and rank-stability estimates for each recommendation.', where: [P.cls] },
      { skill: 'Correlation analysis and PCA', usedFor: 'Finding redundant variables and the main dimensions of deprivation.', where: [P.census] },
      { skill: 'Cross-validation', usedFor: 'Estimating classifier accuracy across folds.', where: [P.nlp] },
    ],
  },
  {
    name: 'Machine learning',
    intro: 'Supervised models, dimensionality reduction and robustness under distribution shift.',
    rows: [
      { skill: 'Logistic regression', usedFor: 'Classifying abstracts by time period.', where: [P.nlp] },
      { skill: 'Random Forest', usedFor: 'A comparison baseline for the Bayesian deprivation model.', where: [P.census] },
      { skill: 't-SNE and UMAP', usedFor: 'Exploring cluster structure in Census areas and research embeddings.', where: [P.census, P.nlp] },
      { skill: 'Distribution-shift diagnostics', usedFor: 'MMD, KL divergence and Wasserstein distance between training and deployment populations.', where: [P.clinical] },
      { skill: 'Permutation importance', usedFor: 'Leave-one-context-out feature stability across hospitals or regions.', where: [P.clinical] },
    ],
  },
  {
    name: 'Natural language processing',
    intro: 'Methods used in the research-discourse project, which was group work.',
    rows: [
      { skill: 'TF-IDF', usedFor: 'Tracking which terms gained or lost weight over time.', where: [P.nlp] },
      { skill: 'Word2Vec with Procrustes alignment', usedFor: 'Measuring how a term’s context changed between periods.', where: [P.nlp] },
      { skill: 'LDA and NMF topic modelling', usedFor: 'Comparing topic models by coherence; NMF with 10 topics was selected.', where: [P.nlp] },
      { skill: 'Sentence-BERT and SPECTER2', usedFor: 'Semantic representations of abstracts for drift analysis.', where: [P.nlp] },
    ],
  },
  {
    name: 'AI and applications',
    intro: 'Putting analysis behind an interface people can query.',
    rows: [
      { skill: 'Amazon Bedrock and LLM function calling', usedFor: 'An inference layer that retrieves from the analytical store and validates quantitative outputs.', where: [P.cls] },
      { skill: 'FastAPI, AWS Lambda, API Gateway', usedFor: 'Serving the analytical system to the web interface.', where: [P.cls] },
    ],
  },
  {
    name: 'Visualisation and reporting',
    intro: 'Getting evidence to the people who make the decision.',
    rows: [
      { skill: 'Tableau', usedFor: 'A multi-dashboard system with maps, slope charts, PCA and residual views, tested with users.', where: [P.census] },
      { skill: 'KPI dashboards', usedFor: 'Assessment, attendance, learning and programme KPIs. [NEEDS CONFIRMATION: which tool]', where: [P.aka, P.psl] },
      { skill: 'Impact and donor reporting', usedFor: 'Beginning- and end-of-year, impact, donor and partner reports for non-technical readers.', where: [P.psl] },
    ],
  },
];

// Listed in the master database but not yet tied to any piece of work on this site.
export const unevidenced = {
  note: '[NEEDS CONFIRMATION: add where you used each of these, or remove them before publishing]',
  items: ['R', 'JavaScript', 'Bash', 'Flask', 'Django', 'Power BI', 'Looker Studio', 'Matplotlib', 'Seaborn', 'Plotly', 'Git and GitHub', 'Linux', 'LaTeX'],
};
