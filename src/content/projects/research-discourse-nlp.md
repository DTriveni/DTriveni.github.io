---
title: 'Tracking the Evolution of AI, Machine Learning, and NLP Research Discourse, 2000–2021'
shortTitle: 'AI Research Discourse, 2000–2021'
summary: 'A five-person group study of 24,677 arXiv abstracts that combined topic models, word embeddings and transformer embeddings to separate changes in what researchers say from changes in how often they say it.'
type: 'MSc group research project, University of Bristol'
year: '2026'
grade: 'Distinction'
tags: ['NLP', 'Machine learning', 'Analytics']
featured: true
order: 3
links:
  - { label: 'GitHub repository', href: 'https://github.com/k7official/Team38_AI_and_Text_Analytics' }
---

## 1. Project Overview

Our five-person team analysed 24,677 arXiv abstracts in AI, machine learning and NLP from 2000 to 2021 to separate changes in how often terms are used from changes in what they mean. Several methods converged on 2014–2016 as the main transition, and 13 of 36 tracked terms shifted context without a matching rise in frequency.

- **Grade:** Distinction
- **Code:** [GitHub repository](https://github.com/k7official/Team38_AI_and_Text_Analytics)
- **My role:** co-project manager; built the shared cleaning pipeline and the terminology-diffusion analysis; assembled the final report
- **Methods and tools:** Python, TF-IDF, Word2Vec, Sentence-BERT, SPECTER2, LDA, NMF, PCA, UMAP, logistic regression, Jira, Overleaf

## 2. Aim

To investigate how AI, machine learning and NLP research discourse evolved between 2000 and 2021, using complementary methods for frequency, context, semantic meaning, topics and temporal separability.

## 3. Objectives

1. Build a temporally organised corpus with one shared preprocessing pipeline.
2. Measure changes in terminology and topic prevalence across five-year periods.
3. Compare contextual and semantic representations to identify meaning shifts.
4. Test whether early and late abstracts are distinguishable from their text.
5. Integrate evidence across methods, reporting agreement, disagreement and failure.

## 4. Data and Preparation

The corpus comes from the Hugging Face *arxiv-abstracts-2021* dataset [3], filtered to abstracts whose primary category is cs.LG, cs.CL or cs.AI, with at least 50 words and complete metadata.

Classical methods used normalised, lemmatised text; transformer models received raw abstracts, because normalisation strips the sentence structure they rely on.

The corpus is heavily imbalanced (261 abstracts in 2000–04, 7,677 in 2020–21) and shifts from cs.CL towards cs.LG after 2015. Details are in Appendix A.

## 5. Methodology

Earlier scientometric studies typically rely on one representation [1, 2], so method artefacts are hard to separate from real change. We treated agreement between methods as the main evidence.

### 5.1 Text Representation and Feature Extraction

TF-IDF captures distinctive vocabulary, Word2Vec a term’s neighbouring words, Sentence-BERT an abstract’s general meaning, and SPECTER2 [4], trained on citation links, its position within the scientific literature.

### 5.2 Topic Modelling

We compared LDA and NMF across topic counts by Cv coherence. NMF with 10 topics scored highest (Cv = 0.55, against 0.48 for LDA); topics were labelled manually as theory- or application-oriented.

### 5.3 Temporal Classification

A logistic regression on TF-IDF features separated 2010–13 from 2018–20 abstracts under five-fold stratified cross-validation, excluding the transition years. This tests lexical separability; because its strongest features reflected subfield vocabulary, it is not direct evidence of semantic drift.

### 5.4 Semantic Drift and Temporal Comparison

At corpus level, we measured year-on-year movement of the average abstract in TF-IDF and Sentence-BERT space. At term level, my diffusion analysis combined TF-IDF rise, Procrustes-aligned Word2Vec drift and SPECTER2 drift, splitting normalised scores into four quadrants.

### 5.5 Dimensionality Reduction and Pattern Analysis

PCA and UMAP were exploratory. Their leading components mainly separated subfields rather than years, and neither establishes statistical significance.

## 6. Results and Key Findings

- **2014–16:** main transition period
- **13 of 36:** tracked terms shifted context without a matching rise in frequency
- **r = 0.863:** agreement between TF-IDF and Sentence-BERT drift
- **About 13%:** abstracts using ethics terms by 2020–21, from near-absence before 2015

**A shared transition.** Application keywords overtook theory keywords in 2014–15, and both drift series placed their largest movements in 2014–16, with Sentence-BERT moving slightly earlier.

**Frequency and meaning diverge.** Thirteen terms changed context more, relative to other terms, than their frequency rose; *pre-training* showed the reverse, suggesting a template copied at scale. Frequency counts alone would miss both patterns.

**Expansion, not replacement.** Application topics grew while theory topics persisted, and UMAP showed periods overlapping.

**Ethics entered the vocabulary**, with terms such as *bias* and *fairness* in about 13% of recent abstracts.

## 7. Visualisations and Research Evidence

Figures are from the group report in the project repository.

**Centroid drift, TF-IDF vs Sentence-BERT** (report Fig. 2)
*Question:* Do lexical and semantic representations agree on timing?
*Finding:* Both rise through 2014–16 and fall to their lowest point in 2017, suggesting corpus-level change lags landmark papers.

**Four-quadrant diffusion typology** (report Fig. 7)
*Question:* Did terms spread through frequency, meaning change, or both?
*Finding:* Thirteen terms are semantic-shift-only, against six that rose in both frequency and drift.

**Per-term trajectory cards** (report Fig. 8)
*Question:* How do the three diffusion signals evolve for each term?
*Finding:* *Encoder* shows the strongest agreement across all three, with near-total replacement of its nearest neighbours.

**Embedding components over time** (report Fig. 4)
*Question:* Does temporal change appear in the main sources of variance?
*Finding:* A clear time trend appears only in the fourth component, linked to socially aware research, and is invisible in 2D.

**Top classifier features** (report Fig. 6)
*Question:* What separates early from late abstracts?
*Finding:* Broad topical words such as *Bayesian* and *neural*, rather than limitation-specific language.

**To generate: topic prevalence over time.** The report describes the rising share of application-oriented NMF topics but does not chart it; a stacked area chart by period can be produced from the existing topic outputs.

## 8. Evaluation

### Classification evaluation

The classifier reached 85.8% mean accuracy, with F1 of 0.71 for the smaller early period and 0.92 for the later one, reflecting class imbalance and more uniform recent vocabulary. Errors were one-sided (108 late abstracts labelled early, 35 the reverse). Without reported class sizes or a majority-class baseline, accuracy cannot be compared with chance, and because folds were not split by year it shows separability, not generalisation to unseen years.

### Cross-method evaluation

With no external ground truth for discourse change, the evidence is convergence: methods with different assumptions agreed on timing. They share one corpus and pipeline, however, so convergence is not independent validation, and the classifier cannot corroborate timing because it excluded the transition years.

### Research and delivery evaluation

The team delivered a group report and a public repository with six analysis notebooks, and reported two diagnostic failures rather than hiding them: the classifier tracked subfield vocabulary, and TF-IDF PCA captured subfield composition.

## 9. Limitations

- Early periods are sparse and subfields unequally represented.
- The shift from cs.CL to cs.LG means trends may reflect which subfields published, not language change within them.
- Topic labels involve human judgement.
- SPECTER2 coverage excludes the newest terms, such as *transformer*.
- Procrustes alignment used 6.9% of the vocabulary as anchors; 2D projections retained little variance.
- No external ground truth exists for discourse change.

## 10. Conclusion and Future Work

Word frequency and semantic context are distinct dimensions of research change: over a third of tracked terms changed context without rising in use. Combining complementary methods, and reporting where they fail, makes conclusions about long-term trends more defensible, provided composition effects are acknowledged.

Future work could stratify by subfield, validate on held-out years, add human evaluation of drift cases, and test robustness to embedding choice and period boundaries.

## 11. Reflection and Individual Contribution

The findings belong to the team. My contribution was:

- **Shared pipeline:** I merged all members’ preparation code into the pipeline every workstream used.
- **Terminology diffusion:** I designed and built the three-signal analysis behind the 13-of-36 result.
- **Project management:** I administered Jira, maintained the decision log and co-managed coordination.
- **Report delivery:** I converted the draft to LaTeX, integrated each analysis and finalised the submission.

Balancing coordination against technical depth was the most demanding and rewarding part of the project.

## 12. Project Management and Team Collaboration

The project ran from 18 March to 3 May 2026. Each of five members owned one analytical workstream and all contributed to exploration, writing and peer review. I shared project management with one teammate.

| Area | Practice |
| --- | --- |
| Planning | Team and individual Gantt charts scheduled the five workstreams. |
| Dependencies | Every workstream needed clean data, so I first merged everyone’s preparation code into one GitHub pipeline; joint exploration then fixed shared parameters such as five-year periods. |
| Tracking | I administered a Jira board and a shared decision log; twice-weekly check-ins reviewed progress and agreed next steps. |
| Decisions | When I raised that TF-IDF could not separate meaning change from rising use, the team added contextual signals. |
| Integration | I moved the draft to LaTeX, integrated each member’s analysis and finalised the submission. |

This was an iterative, check-in-driven workflow rather than a formal framework such as Scrum.

## 13. References

1. Chavalarias, D., and Cointet, J.-P. “Phylomemetic patterns in science evolution.” *PLOS ONE*, 8(2), e54847, 2013.
2. Krenn, M., and Zeilinger, A. “Predicting research trends with semantic and neural networks.” *PNAS*, 117(4), 1910–1916, 2020.
3. Fissore, G. *arxiv-abstracts-2021* [dataset]. Hugging Face, 2021. https://huggingface.co/datasets/gfissore/arxiv-abstracts-2021
4. Allen Institute for AI. *SPECTER2* [model]. Hugging Face, 2023. https://huggingface.co/allenai/specter2

## 14. Technical Appendix

<details>
<summary>A. Corpus construction and preprocessing</summary>

1. Load the Hugging Face dataset (1,999,486 preprints).
2. Standardise arXiv IDs and strip version suffixes.
3. Extract publication year from the ID.
4. Clean text: ASCII filtering, punctuation removal and lowercasing.
5. Keep abstracts whose primary (first author-assigned) category is cs.LG, cs.CL or cs.AI; papers listing these only as secondary categories are excluded.
6. Assign five-year periods (2000–04 to 2020–21). Yearly groups were too small before 2005, and ten-year groups would mask the 2014–15 change.
7. Tokenise and lemmatise with NLTK and WordNet; remove NLTK English stopwords plus a 24-term domain list (e.g. *paper*, *study*, *approach*, *based*).
8. Filter records to a 50-word minimum with year and category present.
9. Output id, year, title, abstract, category and period. Raw abstracts are stored separately for Sentence-BERT and SPECTER2.

</details>

<details>
<summary>B. Topic-model selection</summary>

| Model | Representation | Topics | Cv |
| --- | --- | ---: | ---: |
| LDA | Bag of words | 6 | 0.43 |
| LDA | Bag of words | 8 | 0.46 |
| LDA | Bag of words | 10 | 0.48 |
| NMF | TF-IDF | 6 | 0.49 |
| NMF | TF-IDF | 8 | 0.52 |
| NMF | TF-IDF | 10 | 0.55 |

Topics were labelled from their top ten words. Theory-oriented topics were dominated by terms such as *algorithm*, *optimisation* and *inference*; application-oriented topics by *dataset*, *healthcare*, *translation* and *recommendation*. Both LDA and NMF recovered the rising application share.

</details>

<details>
<summary>C. Classification details</summary>

- **Task:** binary classification of 2010–13 versus 2018–20 abstracts; 2014–17 excluded.
- **Features:** TF-IDF word features; logistic regression.
- **Validation:** five-fold stratified cross-validation; per-class precision, recall and F1 reported alongside accuracy.
- **Errors:** 108 late abstracts predicted as early; 35 early abstracts predicted as late.
- **Top features:** *algorithm*, *Bayesian* and *probability* (early); *neural*, *deep* and *embeddings* (late). Only one top feature matched the limitation keyword lists, so the classifier tracks subfield vocabulary rather than limitation framing.

</details>

<details>
<summary>D. Corpus-level drift and embedding structure</summary>

- **Drift measure:** distance between consecutive yearly centroids, d(y) = ‖μ(y) − μ(y − 1)‖, computed in 50-component PCA space for TF-IDF and 384-dimensional space for Sentence-BERT (all-MiniLM-L6-v2, mean-pooled), then normalised to [0, 1].
- **Agreement:** Pearson r = 0.863 between the TF-IDF and Sentence-BERT series; Euclidean and cosine distances agree almost perfectly (r ≈ 1.00).
- **Selected years:** 2014 (TF-IDF 0.655, 5th; SBERT 0.890, 3rd), 2015 (0.754, 4th; 0.935, 2nd), 2016 (0.959, 2nd; 0.831, 4th); 2017 ranks lowest in both.
- **Variance retained:** 2D TF-IDF PCA about 1.6%; 50 components about 14%.
- **Embedding structure:** PC4 shows a monotonic time trend (Kendall’s τ = +0.667, p < 0.001); within-year variation decreases over time (τ ≈ −0.5); k-means (k = 8) shows declining symbolic AI, stable core-task clusters and emerging neural and safety-related clusters.

</details>

<details>
<summary>E. Terminology-diffusion configuration</summary>

- **Candidates:** top 60 rising TF-IDF terms per period (sublinear TF); about 37% removed as subsumed n-grams, leaving about 48 candidates. 174 multi-word compounds merged into single tokens before Word2Vec training.
- **Word2Vec:** skip-gram per period (vector size 300, window 12, min count 2, negative 10, epochs 30, seed 42); window 12 chosen to capture longer scientific context.
- **Alignment:** orthogonal Procrustes on 1,436 shared anchor terms (6.9% of a 20,631-term combined vocabulary); reliability weights of 0.27 and 0.49 for the two earliest periods.
- **SPECTER2:** raw abstracts, batch size 64, L2-normalised; bootstrap aggregation with B = 100 per term-period cell; cells with fewer than five abstracts excluded, leaving 30 of 48 candidates with full coverage.
- **Typology:** normalised TF-IDF rise against mean Word2Vec and SPECTER2 drift, thresholded at (0.5, 0.5). Semantic shift only, 13; stable or peripheral, 16; diffused, 6; actively diffusing, 1 (*pre-training*).
- **Cases:** *encoder* had the highest consensus score (0.63), highest SPECTER2 drift (0.0424) and near-total neighbour replacement (Jaccard ≈ 0.001); *pre-training* had the highest TF-IDF rise (≈ 0.84) but near-zero SPECTER2 drift (0.0021).

</details>

<details>
<summary>F. Hypothesis outcomes</summary>

- **H1, supported:** NMF recovered the theory-to-application shift and hybrid topics missed by keywords.
- **H2, partly supported:** embeddings detected conceptual change before TF-IDF for *encoder*, but SPECTER2 coverage prevented testing the most emergent terms.
- **H3, partly supported:** centroid drift captured the 2017 lag; classification captured separability but conflated topical and framing effects.
- **H4, supported:** lexical, topic and embedding-drift methods converged on 2014–16.

</details>