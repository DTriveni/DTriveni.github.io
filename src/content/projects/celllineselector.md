---
title: 'Cell Line Selector: An Integrated Multi-Omics Recommendation System for Cell-Line Selection'
shortTitle: 'Cell Line Selector, MSc Dissertation'
summary: 'An MSc dissertation for an AstraZeneca brief that harmonised 19 public datasets into an auditable corpus of 2,127 cell lines and ranks them for a target gene, with separate score, confidence and provenance, a constrained explanation agent and a deployed interface.'
type: 'MSc Data Science dissertation, University of Bristol, with an AstraZeneca industrial brief'
year: '2026'
grade: 'Yet to come'
tags: ['Bioinformatics', 'Data engineering', 'Statistics', 'Agentic AI']
featured: true
order: 1
ledger:
  domain: 'Bioinformatics'
  before: '19 public datasets with incompatible identifiers, scales and coverage'
  after: 'One auditable corpus of 2,127 cell lines × 20,163 genes, ranked with separate score, confidence and provenance'
links:
  - { label: 'GitHub repository', href: 'https://github.com/UoB-AstraZeneca-25-26/UoB-GeneTraceAI-25-26' }
  - { label: 'Live application', href: 'http://genetraceai-cellline-ui.s3-website.eu-north-1.amazonaws.com' }
---

## 1. Project Overview

For an AstraZeneca brief, our team built a system that integrates 19 public multi-omics datasets and returns, for any target gene, a ranked shortlist of cell lines with a confidence tier, supporting evidence and alternatives screened for misidentification [4]. Against independent CRISPR and drug-sensitivity screens, the score works as a reliable filter rather than a fine-grained ranker, and a re-audit retracted one of our own early claims.

- **Grade:** Yet to come
- **Code:** [GitHub repository](https://github.com/UoB-AstraZeneca-25-26/UoB-GeneTraceAI-25-26)
- **Live application:** [Live application](http://genetraceai-cellline-ui.s3-website.eu-north-1.amazonaws.com/)
- **My Role:** Conducting Research, ETL Pipeline Development, Data Retrieval Mechanisms, Statistical Modelling, and Project Management
- **Methods and Tools:** Robust Standardisation, Inverse-Normal Combination, Shrinkage, Monte Carlo Uncertainty, Partial AUC, Python, DuckDB, FastAPI, React, AWS Bedrock

## 2. Aim

To build and assess an auditable multi-omics framework that prioritises cell lines for a target gene, reporting evidence strength, evidence availability and provenance separately.

## 3. Objectives

1. Integrate heterogeneous public multi-omics sources into one queryable corpus with provenance.
2. Model each evidence layer on its own terms and report confidence separately from score.
3. Support target, co-selection and exclusion queries, and suggest similar alternatives.
4. Quantify uncertainty and explain results without letting explanation alter rankings.
5. Assess biological usefulness against independent screens, despite no ground truth.

## 4. System Pipeline

The statistical pipeline fixes the ranking; the agent explains it but cannot change it.

1. **Harmonise:** Resolve identity through stable accessions, filter to human lines and protein-coding genes, and audit every join.
2. **Model each layer:** Standardise transcriptomic, proteomic and genomic evidence on its own terms, within lineage, without imputation.
3. **Score:** Combine RNA with RNA-residualised protein evidence into a bounded composite score.
4. **Assign confidence:** Classify each candidate by whether genomic alterations corroborate its abundance.
5. **Answer the query:** Single-target, co-selection and exclusion rankings, plus screened alternative lines.
6. **Explain:** A tool-bound agent resolves identifiers, explains scores and retrieves provenance.
7. **Present:** React interface with ranked results, confidence, evidence drill-down and a scoring walkthrough.


## 5. Data and Preparation

Nineteen public tables from seven programmes, including DepMap and CCLE [2, 3], the Human Protein Atlas, GEO, two proteomics platforms, COSMIC and Cellosaurus, were harmonised into **2,127 cell lines × 20,163 protein-coding genes** across nine measurement types.

- **Identity** is resolved by stable accession, not name: an audit found 580 names shared by human and non-human entries.
- **Joins** are kept one-to-one by storing alternative identifiers as sets; ambiguous rows are flagged, inflating counts by at most 0.08%.
- **Missing values** are never imputed in the scoring path, and data releases are pinned.
- **Coverage** ranges from 91.9% to 17.6% by measurement type, so it is reported rather than absorbed into the score.

## 6. Methodology

Three principles run through the model: standardise within a layer before combining, report score and confidence separately, and never treat absent evidence as low abundance.

### 6.1 Transcriptomic Layer

Expression is standardised by measurement method rather than source, since GEO alone has six processing families. Each method gets a detection floor and a median/MAD z-score within lineage, with small-lineage dispersion shrunk toward the global estimate; sparsely detected genes use a rank transform or receive no score. Scores combine by weighted inverse-normal combination [9].

### 6.2 Proteomic Layer

Two platforms measure protein on unrelated scales [5, 6]. Each is standardised independently and merged by coverage, and per-gene Spearman agreement between platforms attenuates the merged evidence, with thresholds derived from null correlation distributions rather than set by hand.

### 6.3 Composite Score and Confidence Interval

Protein is residualised against RNA so shared variance is not double-counted, then combined with RNA into a bounded score; lines without proteomics receive a neutral protein term. Genomic evidence sets a separate confidence tier (HIGH, MEDIUM, CONTEXT or LOW) according to whether alterations corroborate abundance in the expected direction.

### 6.4 Queries, Alternatives and Explanation

Co-selection ranks by the weakest target; exclusion multiplies target presence by excluded-gene absence, withholding Y-linked genes in female lines. Alternatives come from three similarity axes, screened against the Cellosaurus problematic-line register [1]. A Claude Haiku 4.5 agent on AWS Bedrock explains scores and retrieves provenance through fixed tools and has no path to change a ranking.

## 7. Results and Key Findings

- **Gate, not ranker:** above chance at excluding candidates; at chance (0.500–0.518) when ordering them
- **+0.186:** similar lines respond more alike to drugs than same-tissue pairs
- **98%:** of an early headline effect reproduced by shuffled labels, so it was retracted
- **0.91:** mean Spearman stability of rankings under perturbation

**The score is a filter.** Against Chronos CRISPR, Project Score and GDSC labels [10, 11, 7], partial AUC was above chance at exclusion for all three sources but near chance among admitted lines, so the shortlist is a set to examine, not a precise order.

**Alternatives are externally supported** across 649 cell lines and 150 compounds (95% CI +0.149 to +0.227), and the advantage held within lineage.

**The audit narrowed our claims.** An early finding that low expression predicts no CRISPR dependency was mostly a labelling artefact, with significance overstated by about five orders of magnitude. The small residual effect did not replicate in RNAi data and may reflect copy-number cutting toxicity [12].

**Protein helps at the top but adds volatility**, raising partial AUC (+0.023 GDSC, +0.017 Chronos) while driving about 91% of score uncertainty in lines with both layers.

## 8. Visualisations and Research Evidence

Figures are from the dissertation in the project repository.

**System architecture** (Fig. 3.1)
*Question:* How do raw data become an explained ranking?
*Finding:* Four stages share one harmonised database, and only the statistical stage can set a ranking.

**Expression before and after standardisation** (Fig. 3.4)
*Question:* Can three transcriptomic sources be compared directly?
*Finding:* Native scales are incompatible; after scale detection and robust standardisation all three centre on zero.

**Uncertainty intervals and rank stability** (Fig. 4.1)
*Question:* How secure is each top candidate for an EGFR query?
*Finding:* Point scores saturate near 1, so win-rates and intervals, not raw scores, separate the leaders.

**Gate versus ranker performance** (Fig. 4.2)
*Question:* Where in the ranking does the score carry information?
*Finding:* Above chance in the exclusion region for all label sources; at chance when ordering admitted lines.

**Driver-alteration lift** (Fig. 4.3)
*Question:* Does genomic corroboration bring drug-sensitive lines into the top 20?
*Finding:* All four estimates are positive, but none is statistically supported.

## 9. Evaluation

### Model evaluation

Executable tests confirmed the implementation matches the specification. Rankings were stable under perturbation, though some genes were more sensitive and two-thirds of two-layer lines sit near a rule boundary. Driver-alteration corroboration was positive but not significant (p = 0.057 to 0.198).

### Agent and interface evaluation

Of 61 agent and API tests, 60 passed; the failure was a fallback that did not run when both nomenclature services were down. One passing test exposed a provenance statement not grounded in tool output. The agent never altered a ranking. The interface was checked for faithful display, but no usability study was run.

### Delivery

The team delivered the full system, from pipeline to deployed interface, with a public repository.

## 10. Limitations

- No ground truth exists for cell-line selection; external tests use proxy screens.
- Confidence tiers are not validated against recommendation accuracy.
- Uncertainty covers measurement error only, not calibration, batch or parameter uncertainty.
- Lines without proteomics cannot reach the score extremes of two-layer lines.
- No multiplicity correction or user study.

## 11. Conclusion and Future Work

Every ranking traces to its evidence: missing data adds nothing, disagreement lowers confidence, and structural absence is withheld rather than scored. The surviving claim is narrower but better supported: abundance evidence reliably excludes poor candidates.

Next steps are to validate confidence tiers against outcomes, test the copy-number mechanism, reduce protein-term volatility, constrain agent provenance claims, and run a user study with bench scientists.

## 12. Reflection and Individual Contribution

The system and its results belong to the team of four. My contribution:

- **Coordination:** I created the Jira timeline and shared documents, structured the five phases, and coordinated the twice-weekly meetings.
- **Data engineering:** I ingested and audited raw source files, including fixing a malformed GEO file that collapsed into a single column.
- **Proteomics:** I developed the reconciliation approach of lineage-conditioned robust z-scores for both platforms, combined according to per-gene Spearman agreement.

I would do three things differently: understand the data and formally review team assumptions before modelling, since our late analysis forced a major revision; set up regular meetings and open feedback from day one; and review dependencies between phases more often, so upstream changes reach downstream plans promptly.

## 13. Project Management and Team Collaboration

I set up the project’s Jira timeline and shared documents, organising the work into five dependent phases: harmonisation, statistical modelling, evaluation, the agentic layer and the interface. The team met twice a week, once in person, alongside regular supervisor meetings, and code went through pull requests with branch protection.

Early communication was uneven until we established regular, open discussion. More consequentially, we under-explored the data at the start, so our first model fitted it poorly; a fuller analysis forced a revised approach and significant rework, which the phased timeline absorbed, and the project was delivered on time.

## 14. References

1. Bairoch, A. “The Cellosaurus, a cell-line knowledge resource.” *Journal of Biomolecular Techniques*, 29(2), 25–38, 2018.
2. Barretina, J., et al. “The Cancer Cell Line Encyclopedia enables predictive modelling of anticancer drug sensitivity.” *Nature*, 483, 603–607, 2012.
3. DepMap. *DepMap Portal Documentation*. Broad Institute, 2024. https://depmap.org/portal/documentation/
4. International Cell Line Authentication Committee. *Register of Misidentified Cell Lines*, version 14, 2026. https://iclac.org/databases/cross-contaminations/
5. Nusinow, D. P., et al. “Quantitative proteomics of the Cancer Cell Line Encyclopedia.” *Cell*, 180(2), 387–402, 2020.
6. Gonçalves, E., et al. “Pan-cancer proteomic map of 949 human cell lines.” *Cancer Cell*, 40(8), 835–849, 2022.
7. Yang, W., et al. “Genomics of Drug Sensitivity in Cancer (GDSC): a resource for therapeutic biomarker discovery in cancer cells.” *Nucleic Acids Research*, 41(D1), D955–D961, 2013.
8. Uhlén, M., et al. “Tissue-based map of the human proteome.” *Science*, 347(6220), 1260419, 2015.
9. Whitlock, M. C. “Combining probability from independent tests: the weighted Z-method is superior to Fisher’s approach.” *Journal of Evolutionary Biology*, 18(5), 1368–1373, 2005.
10. Dempster, J. M., et al. “Chronos: a cell population dynamics model of CRISPR experiments that improves inference of gene fitness effects.” *Genome Biology*, 22, 343, 2021.
11. Dwane, L., et al. “Project Score database: a resource for investigating cancer cell dependencies and prioritizing therapeutic targets.” *Nucleic Acids Research*, 49(D1), D1365–D1372, 2021.
12. Aguirre, A. J., et al. “Genomic copy number dictates a gene-independent cell response to CRISPR/Cas9 targeting.” *Cancer Discovery*, 6(8), 914–929, 2016.
13. McClish, D. K. “Analyzing a portion of the ROC curve.” *Medical Decision Making*, 9(3), 190–195, 1989.

## 15. Technical Appendix

<details>
<summary>A. Corpus coverage</summary>

| Measurement type | Cell lines | Coverage |
| --- | ---: | ---: |
| Genomic signatures | 1,955 | 91.9% |
| Somatic mutations | 1,744 | 82.0% |
| Gene fusions | 1,698 | 79.8% |
| DepMap expression [3] | 1,479 | 69.5% |
| HPA expression [8] | 1,105 | 52.0% |
| Proteomics, ProCan (DIA) [6] | 949 | 44.6% |
| Metabolomics | 927 | 43.6% |
| microRNA | 914 | 43.0% |
| GEO expression | 590 | 27.7% |
| Proteomics, CCLE (TMT) [5] | 375 | 17.6% |

237 lines carry every measurement type and 61 carry none. MicroRNA and metabolomics are harmonised for completeness but not scored, because neither has a justified normalisation and the metabolite matrix mixes measured and imputed values.

</details>

<details>
<summary>B. Model parameters</summary>

- **Transcriptomic calibration:** exhaustive search over 480 settings of four parameters on 1,200 genes, selected by the one-standard-error rule (floor quantile 0.2, shrinkage constant 100, detection cut-points 0.60 and 0.2). Ten settings fell within one standard error, so these are defensible defaults rather than a sharp optimum.
- **RNA–protein slope:** per-gene correlation shrunk toward a panel prior of 0.353 (K = 30, at least 30 shared lines).
- **Layer weights:** square root of the Kish effective sample size: 1.431 for three transcriptomic sources, 1.45 for two proteomic platforms.
- **Genomic channels:** Hill transforms on variant consequence, pathogenicity (AlphaMissense, CADD) and burden; fusion caller confidence, expression support and recurrence; combined by noisy-OR.
- **Thresholds:** confidence tier percentile τ = 0.80; co-selection retention floor 0.50.

</details>

<details>
<summary>C. External evaluation details</summary>

| Driver-alteration lift (Hit@20) | Value | 95% CI | p | Genes |
| --- | ---: | --- | ---: | ---: |
| Unweighted mean | +0.0261 | −0.003 to +0.068 | 0.198 | 15 |
| Sensitivity-weighted | +0.0132 | −0.001 to +0.030 | 0.093 | 15 |
| Unweighted, excluding 3 fragile genes | +0.0359 | −0.000 to +0.090 | 0.104 | 12 |
| Weighted, excluding 3 fragile genes | +0.0227 | +0.005 to +0.042 | 0.057 | 12 |

The twelve-gene rows exclude FGFR2, PIM1 and MAP2K1 after the full result was seen, so they are a sensitivity analysis. Partial AUC [13] was computed in the exclusion region (FPR 0.8–1.0) and the ranking region (FPR 0.0–0.2); ranking-region values were 0.500 (Chronos), 0.501 (Project Score) and 0.518 (GDSC), with no intervals reported. The query layer’s three-valued logic agreed with curated labels in just over 80% of committed answers and abstains for four recorded reasons.

</details>

<details>
<summary>D. Agent test suite</summary>

| Module | Tier | Tests | Result |
| --- | ---: | ---: | --- |
| Dataset information | 1 | 11 | 11 passed |
| Score explainer | 1 | 10 | 10 passed |
| Gene alias resolution | 1 and 3 | 10 | 9 passed, 1 failed |
| API | 2 | 15 | 15 passed |
| Latency | 2 | 8 | 8 passed |
| Tool calling | 3 | 1 | 1 passed |
| Deployed agent | 3 | 6 | 6 passed |

The agent runs Claude Haiku 4.5 on AWS Bedrock at temperature 0.0, orchestrated with LangChain and deployed on AWS Lambda behind an IAM allowlist.

</details>