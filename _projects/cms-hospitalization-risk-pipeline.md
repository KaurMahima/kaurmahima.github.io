---
layout: page
title: CMS Hospitalization Risk Pipeline
description: A reproducible pipeline and dashboard for exploring hospitalization risk in Medicare claims data.
permalink: /projects/cms-hospitalization-risk-pipeline/
importance: 1
img: /assets/img/github_repo.png
github: https://github.com/KaurMahima/cms-hospitalization-risk-pipeline
tech: [Python, Snakemake, Dash, CMS Data]
---

**Technologies:** Python · Snakemake · pandas · Dask · Plotly · Dash · CMS Claims Data

[View source code on GitHub](https://github.com/KaurMahima/cms-hospitalization-risk-pipeline)

## Overview

This project builds a reproducible workflow for downloading, processing, combining, and analyzing CMS beneficiary summary and inpatient claims data. The processed dataset supports an interactive Dash application for exploring hospitalization-risk patterns across years and population segments.

The workflow is designed to turn a multi-step claims preparation process into an explicit pipeline that can be rerun consistently, rather than a series of manual analysis steps.

## Pipeline Workflow

1. Download beneficiary summary and inpatient claims source files.
2. Combine beneficiary files for 2008, 2009, and 2010.
3. Combine inpatient claims inputs into an analysis dataset.
4. Merge beneficiary and inpatient claims records.
5. Generate exploratory hospitalization-risk outputs.
6. Serve risk trends through a Dash dashboard.

The repository exposes the processing path through Snakemake:

```bash
pip install -r requirements.txt
snakemake --cores all
```

## Dashboard Capabilities

The application enables analysis by:

- Year and state.
- Age group, race, and gender segmentation.
- Hospitalization-risk trends over time.
- Comparative views of average risk across demographic groupings.

## Engineering Value

This project demonstrates workflow orchestration around health claims processing and dashboard delivery. The core value is not only visualization: it is a repeatable lineage from downloaded CMS inputs through joined analytical data and user-facing exploration.

## Related Presentation

The broader problem of building reproducible administrative health data workflows is also the subject of my [USRSE'25 presentation note]({% post_url 2025-10-06-usrse25-reproducible-health-claims-pipeline %}).
