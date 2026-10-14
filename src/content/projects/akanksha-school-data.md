---
title: 'Using School Data for Automated Reporting and Programme Prioritisation'
shortTitle: 'Akanksha School Data'
summary: 'Replaced manual download-and-spreadsheet reporting with an automated API-to-database workflow across 28 schools, and built school-level KPIs to help decide where attention and resources should go.'
type: 'Professional project, The Akanksha Foundation'
year: '2024–2025'
role: 'Associate Data Analyst: designed and built the workflow, KPIs and dashboards'
status: { kind: 'built', label: 'Built and used in reporting' }
tags: ['Data engineering', 'Analytics', 'Social impact']
featured: true
order: 6
ledger:
  domain: 'Schools'
  before: 'Assessment and attendance data downloaded by hand and pasted into Google Sheets'
  after: 'API ingestion, Python cleaning and a MySQL-backed dashboard across 28 schools'
metrics:
  - { value: '28', label: 'schools', context: 'Covered by the automated reporting', kind: 'scope' }
  - { value: '15,490', label: 'students', context: 'In the assessment and attendance data', kind: 'scope' }
  - { value: '760+', label: 'educators', kind: 'scope' }
flows:
  - title: 'Before'
    tone: 'before'
    steps:
      - { name: 'Download data manually from each source' }
      - { name: 'Consolidate in Google Sheets' }
      - { name: 'Analyse and report by hand, every cycle' }
  - title: 'After'
    note: 'Open any stage for detail.'
    steps:
      - { name: 'Source systems', detail: 'Assessment and attendance data.' }
      - { name: 'REST API extraction', detail: 'Data pulled programmatically instead of downloaded.' }
      - { name: 'Clean and standardise', detail: 'Python with Pandas and NumPy.' }
      - { name: 'MySQL database', detail: 'Structured storage for recurring analysis.' }
      - { name: 'Dashboard', detail: 'Refreshed metrics for stakeholders. [NEEDS CONFIRMATION: tool]' }
      - { name: 'Reporting and decisions', detail: 'Programme and school-level reporting.' }
stack: ['REST APIs', 'Python', 'Pandas', 'NumPy', 'MySQL', 'Dashboards [NEEDS CONFIRMATION: tool]']
links: []
openQuestions:
  - '[NEEDS PERSONAL STORY: for example, data quality issues in the source systems, or agreeing KPI definitions]'
  - '[NEEDS PERSONAL STORY: What I learned. Add it as `reflection:` in this file and it will appear as its own section]'
  - '[NEEDS CONFIRMATION: dashboard tool]'
  - '[NEEDS CONFIRMATION: how often reports refreshed, and roughly how long the manual process used to take]'
  - '[NEEDS CONFIRMATION: examples of the infrastructure KPIs, if they can be shared]'
---

## Context

The Akanksha Foundation works with schools on student outcomes. My work covered two linked problems: getting reliable assessment and attendance data into a usable form, and using school-level data to decide where attention and resources should go.

## Problem

**Reporting.** Assessment and attendance data was downloaded manually and consolidated in Google Sheets before anyone could analyse it. Every recurring report repeated that work, and depended on it being done correctly by hand.

**Prioritisation.** Schools had different infrastructure and resource needs, and treating every school the same way would not show where support mattered most.

## Objective

Make recurring assessment and attendance reporting automatic and reusable, and give the community-development team a consistent, data-based way to compare schools.

## My role

I designed and built the automated workflow and the reporting dashboard, and developed the infrastructure KPIs and analysis with the community-development team.

## Data

Assessment and attendance data for 28 schools, 15,490 students and 760+ educators, plus school infrastructure and resource data.

## Approach and technical implementation

### Automated assessment and attendance workflow

I replaced the manual process with a pipeline: data is extracted from the source systems through REST APIs, cleaned and standardised in Python with Pandas and NumPy, and stored in a MySQL database. A reporting dashboard connects to that database, so stakeholders see refreshed metrics without anyone downloading and consolidating data first.

### School infrastructure and resource analytics

Working with the community-development team, I:

1. clarified the decision the analysis had to support;
2. defined KPIs for school infrastructure and resources;
3. combined school-level information and compared schools against those KPIs;
4. identified which schools needed greater attention;
5. presented the findings in dashboards.

## Results

- Manual download-and-consolidation for assessment and attendance reporting was replaced by an automated, reusable workflow covering 28 schools.
- The infrastructure analysis identified schools needing greater attention and supported conversations about school improvements and resource allocation.

I have not included a time saving or percentage improvement because neither was measured. [NEEDS CONFIRMATION: any before/after figure you can support]

## Evidence

The evidence is the working pipeline, database and dashboard, and the KPI analysis used in prioritisation discussions. [DETAILS REQUIRED BEFORE PUBLICATION: an anonymised screenshot, if permitted]

## Decisions and trade-offs

- **API extraction over manual export**, so the pipeline can run repeatedly without human steps.
- **A database behind the dashboard, not a spreadsheet**, so cleaned data is stored once and reused across reports.
- **KPIs defined around the decision**, so the comparison between schools answers the question the team was asking.

## Limitations

The work improved how data was produced and used for decisions. It did not measure the downstream effect of those decisions on schools or students.
