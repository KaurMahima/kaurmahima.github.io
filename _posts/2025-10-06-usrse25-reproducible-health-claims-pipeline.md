---
layout: post
title: Presenting a reproducible health claims data pipeline at USRSE'25
date: 2025-10-06
author: Mahima Kaur
description: A presentation on building a modular, scalable workflow for transforming Medicare administrative data into analysis-ready datasets.
thumbnail: /assets/img/USRSEConference2025_1029.jpg
tags: [data-engineering, research-software, reproducibility, presentation]
categories: [presentations]
related_posts: false
---

On October 6, 2025, I presented **"A reproducible and scalable pipeline for processing administrative health claims data"** at [USRSE'25](https://us-rse.org/usrse25/), the US Research Software Engineering Conference in Philadelphia. The conference theme, *Code, Practices, and People*, was a natural setting for work centered on scalable data engineering and reproducible research workflows.

{% include figure.liquid path="assets/img/USRSEConference2025_1029.jpg" alt="Mahima Kaur presenting at USRSE 2025 in Philadelphia" caption="Presenting at USRSE'25 in Philadelphia." class="img-fluid rounded z-depth-1" %}

## Motivation

Administrative health claims data support important research on healthcare utilization, disease burden, and policy impact. They are also difficult to work with at scale: file formats and variables can change across years, coding conventions require careful harmonization, and repeated preprocessing creates duplicated effort across research teams.

Our goal was to make that preprocessing more transparent and reusable by developing a pipeline that transforms raw CMS Medicare files into validated, analysis-ready datasets.

## Pipeline overview

The presentation described a modular workflow with four main stages:

1. Parse raw fixed-width Medicare files and metadata into columnar Parquet data.
2. Harmonize year-to-year differences through declarative YAML transformation rules.
3. Normalize the processed information into beneficiaries, enrollment, and admissions datasets.
4. Generate materialized views for rapid cohort creation, longitudinal follow-up, and outcome-based analyses.

The implementation uses **Snakemake** for workflow orchestration, **Docker** for portability, and **DuckDB** for efficient SQL queries over partitioned Parquet files. Together, these tools support a reproducible workflow without requiring a centralized database infrastructure.

## Why this work matters

For research teams working with complex administrative data, a reusable pipeline can reduce repeated cleaning, improve traceability, and make downstream analyses easier to reproduce. This approach also aligns with FAIR data principles by improving how derived data products and transformation steps are managed and reused.

## Collaborators and resources

This work was completed with Shreya Nalluri, James C. Kitch, Tinashe M. Tapera, Jonathan Gilmour, Michelle Audirac, and Danielle Braun.

- [Presentation record and slides on Zenodo](https://doi.org/10.5281/zenodo.17281686)
- [USRSE'25 conference website](https://us-rse.org/usrse25/)

Presenting this work at USRSE'25 provided an opportunity to share a practical data engineering approach with a community focused on reliable and sustainable research software.
