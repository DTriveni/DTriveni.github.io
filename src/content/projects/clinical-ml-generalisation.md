---
title: 'A Pre-Deployment and Post-Deployment Diagnostic Framework for Generalisation Failure in Clinical Prediction Models'
shortTitle: 'Clinical ML Deployment Diagnostics'
summary: 'An individual research design for estimating, before deployment, whether a clinical prediction model is likely to fail on a new patient population, using distributional divergence, cross-context feature stability and a deployment decision matrix.'
type: 'MSc individual research portfolio, University of Bristol'
year: '2026'
grade: 'Distinction'
tags: ['Machine learning', 'Healthcare', 'Research design', 'Responsible AI']
featured: true
order: 4
ledger:
  domain: 'Clinical machine learning'
  before: 'Clinical models judged on cross-validation against data that resembles their training set'
  after: 'A three-stage check that estimates deployment risk before a model reaches new patients'
links:
  - { label: 'GitHub repository', href: 'https://github.com/DTriveni/Pre-Deployment-Generalisation-Diagnostics-for-Clinical-Prediction-Models' }
---

## 1. Project Overview

Clinical prediction models often perform well in development and then fail on new hospitals, regions or trials, yet teams have few practical ways to anticipate this before deployment. I designed a three-stage framework that measures how far a target population differs from the training data, identifies which features stay reliable across settings, and turns both into a deployment recommendation with post-deployment monitoring.

- **Grade:** Distinction
- **Code:** [GitHub repository](https://github.com/DTriveni/Pre-Deployment-Generalisation-Diagnostics-for-Clinical-Prediction-Models)
- **Status:** research design with a specified evaluation; validation results are not yet reported
- **Methods and tools:** Python, MMD, KL divergence, Wasserstein distance, leave-one-context-out permutation importance, eICU data, Jira, LaTeX

## 2. Aim

To develop a practical diagnostic that estimates, before deployment, whether a clinical prediction model is likely to lose performance on a new patient population, and that recommends whether to deploy, retrain, restrict or withhold it.

## 3. Objectives

1. Compare MMD, KL divergence and Wasserstein distance as predictors of the real loss in balanced accuracy across clinical settings.
2. Label each feature as stable or shift-sensitive, targeting at least 70% agreement with observed cross-context performance.
3. Combine both outputs into a four-option decision flowchart, tested on at least one separate setting.
4. Benchmark the framework against naive cross-validation, importance weighting and random feature subsets.

## 4. Project Planning and Management

I tracked the project on a Jira board, with a Gantt chart in the repository. The work ran over eight weeks:

- **Weeks 1–5:** literature review and critical analysis, about two weeks longer than an experienced researcher might need, because causal modelling and dataset-shift theory were new to me.
- **Week 2 onwards:** report writing ran alongside the analysis rather than being left to the end.
- **Weeks 6–7:** methodology, data preparation and implementation ran concurrently.
- **Week 8:** submission.

A separate Jira board holds a hypothetical 12-week plan for running the project again. It sequences the dependencies (the research gap before the design, and each stage before the next) and adds validation on the full eICU database and MIMIC-IV plus a dedicated writing week. Its main schedule risk is the move from literature to design: if the gap is unclear by Week 3, everything slips.

## 5. Data and Preparation

The primary dataset is the freely downloadable eICU Collaborative Research Database demo [10], a multi-hospital US intensive-care dataset with demographics, physiology scores, laboratory results, diagnoses and in-hospital mortality. Its hospitals provide the cross-context variation the framework needs; because each contributes few patients, they are grouped into four US regions.

Preparation combines CSV tables, handles missing values and corrects age records, reusing the YAIB pipeline [11] for standard modelling. The data is US-only and around 80% Caucasian, which limits subgroup analysis.

## 6. Methodology

### 6.1 Literature Review and Research Gap

The review found strong tools for explaining generalisation failure after it happens, but few for predicting it beforehand; one landmark study saw accuracy fall from 0.72 within trial to 0.54 on independent trials [1]. Causal feature selection [6] and invariant risk minimisation [7] need expert causal graphs or multiple training environments, which clinical teams rarely have, so the framework integrates existing measures rather than proposing a new correction.

### 6.2 Stage 1: Divergence Scoring

Three measures quantify how far the target population differs from the training data: MMD, which assumes no distribution shape [5]; KL divergence, sensitive to patients unlike any seen in training; and Wasserstein distance, robust when populations barely overlap. Prior work lists all three without testing which best predicts performance loss [4], so the framework correlates each with the observed drop and keeps the strongest.

### 6.3 Stage 2: Feature Stability

Each context (region, hospital or site) is held out in turn: a model is trained on the rest and permutation importance is computed on the held-out context. Features are labelled shift-stable (consistency above 0.6), uncertain (0.3–0.6) or shift-sensitive (below 0.3). This approximates what causal methods identify, without requiring a causal diagram.

### 6.4 Stage 3: Decision Framework and Monitoring

Divergence level and the share of stable features map to four recommendations: deploy with routine monitoring, deploy with closer monitoring, retrain on stable features, or restrict or do not deploy (Appendix B). After deployment, divergence is recomputed on incoming data. If it crosses the upper threshold, the model is flagged for human review; if balanced accuracy falls below 0.60, it is paused.

## 7. Evaluation Design

The primary measure is the Spearman correlation between the performance drop predicted from Stage 1 and the drop actually observed on external data, which directly tests the framework’s central claim. Secondary measures are balanced accuracy, calibration slope [9], balanced accuracy by demographic subgroup, following TRIPOD+AI [8], and the concordance between predicted and observed feature instability, targeting at least 70%.

Three baselines set the bar: naive cross-validation (current practice), importance weighting (the strongest single correction reviewed [4]) and random feature subsets of the same size, which test whether Stage 2 selects genuinely better features.

## 8. Visualisations and Research Evidence

**Diagnostic pipeline** (report Fig. 1)
*Question:* How do the three stages connect?
*Content:* Flowchart from divergence scoring through feature stability to the deployment decision and monitoring loop.

**Deployment decision matrix** (Appendix B)
*Question:* What should a practitioner do for each combination of divergence and stability?
*Content:* Five rules mapping divergence level and stable-feature share to a recommendation.

**Hypothetical 12-week plan** (report Fig. 2 and Jira board)
*Question:* How would the full project run with hindsight?
*Content:* Gantt chart of dependent phases from literature review to external validation and submission.

**To generate after validation:** a scatter plot of predicted against observed performance drop for each divergence measure, and a per-feature stability chart by region.

## 9. Ethics and Governance

| Risk | Mitigation |
| --- | --- |
| Thresholds calibrated on a mostly Caucasian population | Report all results by demographic subgroup and state calibration limits |
| Re-identification in small hospitals | No subgroup statistics below n = 10; divergence computed on aggregate distributions; no data linkage |
| Automation bias | Show the divergence score and its uncertainty alongside each recommendation; require a documented human decision |
| Dropping features harms specific groups | Check subgroup impact before removing shift-sensitive features; recalibrate if needed |
| Governance breach | Follow PhysioNet terms; in UK settings, meet the Data (Use and Access) Act 2025 human-review and audit requirements |

Regional differences are already visible: the Northeast has the highest mortality (11.9%, against 7.1% in the Midwest). A “low divergence” result for a whole population could still falsely reassure its least-represented patients.

## 10. Limitations

- Divergence thresholds are not yet set and must be learned from validation data.
- US-only, demographically narrow data limits how far thresholds transfer.
- Four regional contexts give few rounds for leave-one-context-out analysis.
- The framework diagnoses risk; it does not repair a failing model.

## 11. Conclusion and Future Work

The project reframes generalisation failure as a pre-deployment question: how different is the target population, and which features can be trusted there? Its contribution is integration rather than new theory, combining established divergence measures, feature stability and explicit decision rules into a process that needs only standard Python skills.

The next step is validation: run all three stages on the eICU demo, test thresholds on the full eICU database, and evaluate on MIMIC-IV against the three baselines.

## 12. Reflection

The literature phase took five weeks, because I was learning causal modelling and dataset-shift theory for the first time and had to revisit papers before the ideas fitted together. Writing from Week 2 kept the argument coherent. With hindsight, my 12-week plan protects the move from literature to design, adds external validation and gives the write-up its own week.

## 13. References

1. Chekroud, A. M., et al. “Illusory generalizability of clinical prediction models.” *Science*, 383(6679), 164–167, 2024.
2. Whalen, S., Schreiber, J., Noble, W. S., and Pollard, K. S. “Navigating the pitfalls of applying machine learning in genomics.” *Nature Reviews Genetics*, 23(3), 169–181, 2022.
3. Ben-David, S., Blitzer, J., Crammer, K., Kulesza, A., Pereira, F., and Vaughan, J. W. “A theory of learning from different domains.” *Machine Learning*, 79(1–2), 151–175, 2010.
4. Dockès, J., Varoquaux, G., and Poline, J.-B. “Preventing dataset shift from breaking machine-learning biomarkers.” *GigaScience*, 10(9), giab055, 2021.
5. Gretton, A., Borgwardt, K. M., Rasch, M. J., Schölkopf, B., and Smola, A. “A kernel two-sample test.” *Journal of Machine Learning Research*, 13, 723–773, 2012.
6. Pavlović, M., et al. “Improving generalization of machine learning-identified biomarkers using causal modelling with examples from immune receptor diagnostics.” *Nature Machine Intelligence*, 6, 1–12, 2024.
7. Arjovsky, M., Bottou, L., Gulrajani, I., and Lopez-Paz, D. “Invariant risk minimization.” arXiv:1907.02893, 2020.
8. Collins, G. S., et al. “TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods.” *BMJ*, 385, e078378, 2024.
9. Steyerberg, E. W., et al. “Assessing the performance of prediction models: a framework for some traditional and novel measures.” *Epidemiology*, 21(1), 128–138, 2010.
10. Pollard, T. J., Johnson, A. E. W., Raffa, J. D., Celi, L. A., Mark, R. G., and Badawi, O. “The eICU collaborative research database, a freely available multi-center database for critical care research.” *Scientific Data*, 5, 180178, 2018.
11. Yèche, R., et al. “YAIB: Yet another ICU benchmark.” arXiv:2306.05109, 2023.
12. Subbaswamy, A., and Saria, S. “From development to deployment: dataset shift, causality, and shift-stable models in health AI.” *Biostatistics*, 21(2), 345–352, 2020.
13. Freiesleben, T., and Grote, T. “Beyond generalization: a theory of robustness in machine learning.” *Synthese*, 201, 1–28, 2023.

## 14. Technical Appendix

<details>
<summary>A. Literature synthesis</summary>

The review grouped explanations of generalisation failure into three views:

- **Methodological:** avoidable pitfalls such as leakage, non-independent splits and confounding [2], and reporting standards such as TRIPOD+AI [8]. Careful method is necessary but not sufficient: models still fail when methods are sound [1].
- **Data-centred:** training and deployment populations differ, and beyond a certain divergence no correction can recover performance [3]. Corrections are model-dependent; importance weighting helps simple models but can harm gradient boosting [4].
- **Learning-theoretic:** standard training rewards spurious correlations; causal and invariant approaches [6, 7, 12] address this but are hard to apply clinically.

Cross-validation measures statistical generalisation within a population, whereas deployment needs robustness when the population changes [13]. The review identified three gaps: no method predicts failure before deployment; post-deployment monitoring is under-researched; and the most principled fix, causal modelling, needs expertise most clinical teams lack.

</details>

<details>
<summary>B. Deployment decision matrix</summary>

| Divergence | Stable features | Recommendation |
| --- | --- | --- |
| Low | Any | Deploy, quarterly monitoring |
| Moderate | ≥ 70% | Deploy, monthly monitoring |
| Moderate | 50–70% | Retrain on stable features only |
| Moderate or high | < 50% | Restrict or do not deploy |
| High | Any | Do not deploy |

</details>

<details>
<summary>C. Pipeline specification</summary>

- **Stage 1 inputs:** training data and target data, both standardised using training statistics.
- **Stage 1 measures:** MMD with a Gaussian kernel; KL divergence via per-feature kernel density estimates; Wasserstein distance on empirical distributions. Repeated for every train–target pair; each measure is correlated with the actual performance drop (Spearman), and the best becomes the divergence score.
- **Stage 2:** for each of K contexts, train on all others and compute permutation importance on the held-out context; consistency is measured across the K rounds. Sensitive features are checked against those that actually hurt cross-context performance.
- **Monitoring:** divergence is recomputed on incoming data at regular intervals; crossing the threshold triggers human review, and balanced accuracy below 0.60 pauses the model.

</details>

<details>
<summary>D. Data readiness</summary>

On Lawrence’s data readiness scale, the demo data starts at DRL-3, organised but needing preparation, and reaches DRL-5 after the CSV tables are combined, missing values handled and age records adjusted. Reported demographics are about 80% Caucasian, 9.2% African American, 5% Hispanic and 1.2% Asian.

</details>