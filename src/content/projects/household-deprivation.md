---
title: 'Visualising Household Deprivation in England and Wales: A Comparative Analysis of the 2011 and 2021 Censuses'
shortTitle: 'Household Deprivation, 2011 vs 2021'
summary: 'Harmonised two Censuses across 175 local authorities, found the main dimensions of deprivation, modelled change with uncertainty, and built Tableau dashboards that were tested with users.'
type: 'MSc academic project, University of Bristol'
year: '2026'
grade: 'Distinction'
order: 2
tags: ['Analytics', 'Statistics', 'Visualisation', 'Public data']
links:
  - { label: 'GitHub repository', href: 'https://github.com/DTriveni/Visualising-Household-Deprivation-in-England-and-Wales' }
ledger:
  domain: 'Public data'
  before: '12 Census files with changed categories and redrawn local-authority boundaries'
  after: 'One comparable 175-area dataset, modelled with uncertainty and explorable in Tableau'
---

## 1. Project Overview

Harmonised the 2011 and 2021 Censuses across 175 local authorities in England and Wales to measure how household deprivation changed, identify its underlying structure and model its association with earlier conditions. Deprivation fell from 58.7% to 52.4% and declined in every matched authority, PCA separated broad deprivation from a distinct heating-related dimension, and a Bayesian regression explained 92.8% of variation in 2021 rates, with results delivered through user-tested Tableau dashboards.

- **Grade:** Distinction
- **Tools:** Python (Pandas), Tableau
- **Code:** [GitHub repository](https://github.com/DTriveni/Visualising-Household-Deprivation-in-England-and-Wales)
- **Methods:** Correlation analysis, PCA, t-SNE, empirical Bayes, Bayesian linear regression, Random Forest, Usability testing

## 2. Aim

To build a harmonised 2011–2021 Census dataset, use it to examine the spatial and statistical structure of household deprivation and its relationship with earlier conditions, and communicate the findings through interactive visualisation.

## 3. Objectives

1. Reconcile category, boundary and naming changes so that local authorities are directly comparable across both Censuses.
2. Quantify change in deprivation and in related health, employment, education and housing indicators.
3. Identify latent dimensions and area groupings using multivariate methods.
4. Estimate how well 2011 indicators predict 2021 deprivation, with explicit uncertainty.
5. Design linked Tableau dashboards for policy analysts and evaluate them with users.

## 4. Data and Preparation

Because the English Indices of Deprivation do not support like-for-like comparison across Census years [1], I used 12 ONS Census files covering deprivation, health, economic activity, qualifications, heating and bedrooms. The matched set contains **175 local authorities, 350 area-year observations and 16 variables**, with no missing cells, so no imputation was needed. Preparation involved:

- **Harmonising categories** that changed between Censuses, such as health ratings and bedroom counts.
- **Reconciling boundaries and names**, combining merged authorities and apportioning two abolished counties to their successors following ONS guidance [4]. Apportionment assumes deprivation was uniform within each predecessor area.
- **Converting counts to percentages** of households or usual residents.

The headline **deprivation rate** is the share of households deprived in at least one dimension. Full mappings are in Appendix A.

## 5. Methodology

### 5.1 Exploratory Data Analysis and Feature Selection

Correlation analysis of seven candidate indicators revealed near-duplicates: poor health and long-term sickness (r = 0.96), and no qualifications and Level 4+ qualifications (r = −0.86). I removed one from each pair but retained poor health and no qualifications (r = 0.76) as distinct domains, leaving five standardised features.

### 5.2 Dimensionality Reduction and Pattern Analysis

PCA [10] provides interpretable linear axes, read through their loadings; the Kaiser criterion retained two components, with stable loadings across years. t-SNE [11] complements this by revealing local neighbourhoods. I ran it at perplexities of 20–50 to check that groupings were not setting artefacts, and treat them as exploratory.

### 5.3 Statistical Modelling and Uncertainty

A Beta-Binomial empirical-Bayes model estimated area-level rates with uncertainty. A Bayesian linear regression with a conjugate prior then predicted 2021 deprivation from 2011 indicators, compared against a mean baseline and a Random Forest. Each prediction carries a 95% credible interval; authorities outside it were flagged and ranked by residual.

### 5.4 Visualisation and User Evaluation

Linked Tableau dashboards cover geography, change, multivariate structure and predictions. Encodings follow the task: length and position for precise comparison, colour for spatial scanning, and a colourblind-safe diverging palette for change [6, 9], with selections filtering linked views [5, 8]. Five participants completed task-based tests.

## 6. Results and Key Findings

- **58.7% → 52.4%** household deprivation rate, 2011 to 2021
- **175 of 175** matched authorities recorded a lower rate
- **74.6%** of variance explained by two principal components
- **R² = 0.928** for the Bayesian regression (MAE 1.011 pp, RMSE 1.308 pp)
- **3 of 5** participants interpreted uncertainty correctly, against 5 of 5 for value lookup

**Deprivation declined unevenly and did not disappear.** The City of London fell 14.6 points and Newham 14.3, against 6.6 in Blackpool. Single-dimension deprivation rose slightly (32.7% to 33.5%), suggesting some households moved to milder rather than no deprivation.

**Deprivation has two dimensions.** PC1 (52.1%) captures broad deprivation across health, employment and education; PC2 (22.5%) captures a separate heating-related dimension consistent with rural fuel poverty. t-SNE grouped post-industrial towns, the Welsh valleys, London boroughs and wealthier southern counties.

**Earlier conditions remain strongly associated with deprivation.** The 2011 rate had the largest coefficient, and no-qualification rates stayed associated with 2021 deprivation after controlling for other indicators. The unemployment–health correlation fell from 0.554 to −0.038; COVID-era labour-market change is plausible but untested.

**Nine authorities diverged from prediction**, including Brighton and Hove (3.3 points above) and the City of London (5.6 below).

## 7. Visualisations and Dashboard Design

**Geographic overview**
*Question:* Where is deprivation concentrated in each year?
*Encoding:* point map coloured by deprivation, with a year filter and linked dimension bars.
*Insight:* High-deprivation authorities such as Newham stand out without large rural areas dominating.

**Change over time**
*Question:* Which authorities improved most?
*Encoding:* slope charts and a diverging blue–red change map.
*Insight:* Every authority declines, with large falls in inner London, including Newham, Tower Hamlets and Hackney.

**Multivariate structure**
*Question:* Do indicators form distinct dimensions or groups?
*Encoding:* PCA and t-SNE scatter plots with loadings, deprivation colour and tooltips.
*Insight:* Broad deprivation and heating form separate axes; all five participants identified the London grouping.

**Actual versus predicted deprivation**
*Question:* Which authorities differ from what 2011 conditions predict?
*Encoding:* scatter with a y = x line and credible-interval bands, plus a ranked residual chart.
*Insight:* Nine authorities fall outside their intervals, led by Brighton and Hove and the City of London.

## 8. Evaluation

### Statistical evaluation

| Model | R² | MAE (pp) | RMSE (pp) |
| --- | ---: | ---: | ---: |
| Mean baseline | −0.013 | 3.934 | 4.913 |
| Bayesian linear regression | 0.928 | 1.011 | 1.308 |
| Random Forest (comparison) | 0.881 | 1.221 | 1.681 |

The Bayesian regression outperformed both comparisons, and its 95% intervals contained 94.9% of observed values, close to nominal coverage. The report does not establish whether these metrics were calculated on held-out areas, so they demonstrate fit rather than out-of-sample performance.

### Usability evaluation

| Task | Mean time | Correct |
| --- | ---: | ---: |
| Look up a value | 12 s | 5 of 5 |
| Compare areas | 18 s | 4 of 5 |
| Identify a pattern | 8 s | 5 of 5 |
| Interpret uncertainty | Not recorded | 3 of 5 |
| Identify an outlier | 15 s | 5 of 5 |

Uncertainty was hardest: two participants located the widest interval but could not explain it, and three noted that income was missing. Five participants can expose usability problems, but cannot estimate success rates or represent policy users.

## 9. Limitations

- Local-authority aggregates cannot represent individual households.
- Income is absent; four or more bedrooms can indicate wealth rather than hardship.
- Boundary apportionment assumes uniform deprivation within predecessor areas.
- t-SNE separation is not global distance, and clusters are not causal.
- Regression generalisation is uncertain without documented held-out evaluation.
- Rate changes may reflect population composition.
- The usability sample is small.

## 10. Conclusion and Future Work

This project makes two Censuses comparable at local-authority level and shows that deprivation fell everywhere but unevenly, has a broad and a heating-related dimension, and remains strongly associated with 2011 conditions. The dashboards support lookup and pattern-finding, though uncertainty needs clearer explanation. These area-level associations should guide investigation, not causal conclusions.

Future work could:

- test the sensitivity of results to boundary-apportionment assumptions;
- report model performance on held-out authorities;
- annotate how interval width relates to population size.

## 11. References

1. Ministry of Housing, Communities and Local Government. *The English Indices of Deprivation 2019*. London, 2019.
2. Townsend, P. “Deprivation.” *Journal of Social Policy*, 16(2), 125–146, 1987.
3. Dorling, D., Rigby, J., Wheeler, B., Ballas, D., Thomas, B., Fahmy, E., Gordon, D., and Lupton, R. *Poverty, Wealth and Place in Britain, 1968 to 2005*. Policy Press, 2007.
4. Office for National Statistics. “Census maps update: Change over time,” 2023. https://www.ons.gov.uk/releases/censusmapsupdatechangeovertime
5. Munzner, T. *Visualization Analysis and Design*. CRC Press, 2014.
6. Cleveland, W. S., and McGill, R. “Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods.” *Journal of the American Statistical Association*, 79(387), 531–554, 1984.
7. Ware, C. *Information Visualization: Perception for Design*, 3rd ed. Morgan Kaufmann, 2012.
8. Shneiderman, B. “The Eyes Have It: A Task by Data Type Taxonomy for Information Visualizations.” *Proceedings of the IEEE Symposium on Visual Languages*, 336–343, 1996.
9. Brewer, C. A. “A Transition in Improving Maps: The ColorBrewer Example.” *Cartography and Geographic Information Science*, 30(2), 159–162, 2003.
10. Jolliffe, I. T. *Principal Component Analysis*, 2nd ed. Springer, 2002.
11. van der Maaten, L., and Hinton, G. “Visualizing Data Using t-SNE.” *Journal of Machine Learning Research*, 9, 2579–2605, 2008.

## Technical Appendix

<details>
<summary>A. Data preparation and boundary changes</summary>

**Source structure.** Files are grouped by local authority; 2011 and 2021 files use different header-row positions. 14 regional and national aggregate rows were removed, and a `ua-county09:` prefix in 2011 qualification names was stripped. Four authorities present only in 2021 fall outside the matched comparison. All 5,600 cells in the analysis set were complete.

**Denominators.** Deprivation, heating and bedrooms are percentages of households; health, economic activity and qualifications are percentages of usual residents. The deprivation rate is 100% minus the share of households reporting no deprivation.

**Category mappings.**

- “Bad” and “very bad” health were combined.
- Employment categories were harmonised, including working students in 2021.
- Heating fuel categories were mapped to common groups.
- 2011 “4 bedrooms” and “5 or more” were combined as “4 or more”; the absent 2021 “no bedrooms” category was set to zero.

**Boundary changes** (following ONS guidance [4]).

- Bournemouth and Poole were combined into Bournemouth, Christchurch and Poole.
- Cumbria was apportioned into Cumberland (66.7%) and Westmorland and Furness (33.3%).
- Northamptonshire was apportioned into North Northamptonshire (40.2%) and West Northamptonshire (59.8%).
- Rhondda Cynon Taf was treated as a rename.

Apportionment applies parent-area rates to successor areas.

</details>

<details>
<summary>B. PCA and t-SNE details</summary>

- Eigenvalues: PC1 = 2.60, PC2 = 1.13 (Kaiser rule retains both).
- Explained variance: PC1 52.1%, PC2 22.5%, cumulative 74.6%.
- PC1 loadings across years: poor health 0.527–0.529; no qualifications 0.498–0.564.
- t-SNE input: top three principal components; perplexities 20, 30, 40 and 50, with broadly consistent patterns.

</details>

<details>
<summary>C. Modelling details and posterior coefficients</summary>

The regression uses a conjugate Normal-Inverse-Gamma prior, giving an analytical posterior without MCMC sampling. A 95% credible interval is the range that, under the model, contains the observed value with 95% probability; residuals are observed minus predicted values.

| Feature | Posterior mean | 95% credible interval | Interval excludes zero |
| --- | ---: | --- | --- |
| Intercept | 52.349 | [52.168, 52.529] | Yes |
| Poor health % | −0.441 | [−0.820, −0.062] | Yes |
| Unemployed % | −0.064 | [−0.424, 0.295] | No |
| No qualifications % | 1.595 | [1.259, 1.930] | Yes |
| No central heating % | −0.231 | [−0.455, −0.008] | Yes |
| 4+ bedrooms % | 0.332 | [0.011, 0.653] | Yes |
| 2011 deprivation rate | 4.238 | [3.754, 4.721] | Yes |

Coefficients are conditional on the other predictors. Because several predictors are correlated (for example, poor health and no qualifications, r = 0.76), individual signs should not be read as independent effects.

**Education change.** The share with no qualifications fell from 22.9% to 18.5% (4.4 points). In a separate change model, higher baseline no-qualification rates were associated with less improvement (β = 1.464). The Bayesian regression and Random Forest did not agree on every outlier, including Newham.

</details>

<details>
<summary>D. Performance</summary>

Dashboards loaded in under 2 seconds and filters responded in under 0.5 seconds. The Python pipeline, including PCA, t-SNE and Bayesian cross-validation, ran in under 30 seconds on a standard laptop.

</details>