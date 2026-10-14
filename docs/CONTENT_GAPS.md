# Content gaps

Every item here is marked in the source files and listed, with file and line, by `npm run gaps`.
Markers are highlighted in local preview (`npm run dev`) and removed automatically from the published site.
Resolve an item by replacing its marker with the confirmed fact, or removing the claim.

## Critical — confirm before publishing

| # | Item | Where |
| --- | --- | --- |
| 1 | Permission to name AstraZeneca and publish this level of detail about CellLineSelector | `projects/celllineselector.md`, home page (About, Journey) |
| 2 | CellLineSelector held-out validation and concordance results, and the metric used | `projects/celllineselector.md` |
| 3 | CellLineSelector datasets: which, and whether they can be named | `projects/celllineselector.md` |
| 4 | Household deprivation: individual or group project (this also affects the CVs, which present it as your own work) | `projects/household-deprivation.md` |
| 5 | Deprivation rate: exact definition and unit (for MAE/RMSE and the Newham figures) | `projects/household-deprivation.md` |
| 6 | Were R², MAE, RMSE and interval coverage measured in-sample or on held-out areas? Nominal interval width? | `projects/household-deprivation.md` |
| 7 | NLP project: your individual contribution | `projects/research-discourse-nlp.md` |
| 8 | Clinical ML: which stages were run on data, and any results | `projects/clinical-ml-generalisation.md` |
| 9 | eICU demo size: patients or ICU stays, and the hospital count | `projects/clinical-ml-generalisation.md` |
| 10 | ProblemSolvers Lab: paid, part-time or voluntary | `data/experience.ts`, `projects/problemsolvers-lab.md` |
| 11 | Permission to name the seven PSL partner organisations | `projects/problemsolvers-lab.md` |
| 12 | Reap Benefit: 121,000+ students reached by the modules, or the programme's size | home page, Beyond the data (`pages/index.astro`) |
| 13 | STEM programme: how the 40% participation rise was measured, and the baseline | `data/experience.ts` |
| 14 | Unevidenced skills: R, JavaScript, Bash, Flask, Django, Power BI, Looker Studio, Matplotlib, Seaborn, Plotly, Git/GitHub, Linux, LaTeX. Currently shown only in local preview. Add where each was used, or remove. (Scikit-learn was left out because it is not in the master database.) | `data/skills.ts` |

## Useful — would make the site stronger

| # | Item | Where |
| --- | --- | --- |
| 15 | Personal story: why physics → technology, why data, why the MSc | `data/journey.ts` |
| 16 | "What I learned" for each of the six case studies (add as `reflection:`) | `content/projects/` |
| 17 | Why this work matters to you, in your own words | `pages/index.astro` (Beyond the data) |
| 18 | Challenges for ProblemSolvers Lab and Akanksha (sections hidden until written) | those case studies |
| 19 | Dashboard tool used at Akanksha and PSL | experience, skills, two case studies |
| 20 | Akanksha pipeline: refresh frequency, time the manual process took | `projects/akanksha-school-data.md` |
| 21 | One example of a PSL programme decision changed by your analysis | `projects/problemsolvers-lab.md` |
| 22 | Screenshots: CellLineSelector interface, Tableau dashboards, anonymised PSL/Akanksha dashboards | case studies |
| 23 | Public links: CellLineSelector repository, Tableau Public, NLP report | case studies |
| 24 | Dates: Founder's Office role, Indian School of Leadership mentoring, MSc start month and submission status | `data/experience.ts`, `data/education.ts` |
| 25 | Data Art Modules and the Reap Benefit water-system project: details, or remove (not shown on the site) | `data/otherWork.ts` |
| 26 | Mission Samriddhi: not in the master database; should it appear? | — |
| 27 | Check the "Decisions and trade-offs" reasons match your own reasoning | CellLineSelector, clinical ML |

## Optional — can come later

| # | Item |
| --- | --- |
| 28 | PG Diploma: key modules or projects worth naming |
| 29 | Infrastructure KPI examples from Akanksha, if shareable |
| 30 | A custom domain |
| 31 | A professional photo for the About chapter (none is used now, by design) |
