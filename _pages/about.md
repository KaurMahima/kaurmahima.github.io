---
layout: about
title: About
permalink: /
subtitle: Analytics Data Engineer | Public Health Data Platforms | Research Software

profile:
  align: right
  image: prof_pic.jpg
  image_circular: true

selected_papers: false
social: true
announcements:
  enabled: false
latest_posts:
  enabled: false
---

I build reproducible data platforms for public health research: ingestion and transformation pipelines, analytics-ready models, and practical tools that make complex data usable.

As a Data Engineer at Harvard T.H. Chan School of Public Health, I work on Python and SQL pipelines processing **10+ TB of multi-year data**, using tools including **DuckDB, Parquet, Snakemake, Hydra, Docker, and SLURM**. My work sits at the intersection of analytics engineering and research software: trustworthy transformations, scalable execution, and clear data products for analysis.

<p class="home-actions">
  <a class="btn btn-sm z-depth-0" href="{{ '/projects/' | relative_url }}">View projects</a>
  <a class="btn btn-sm z-depth-0" href="{{ '/cv/' | relative_url }}">View CV</a>
  <a class="btn btn-sm z-depth-0" href="https://github.com/KaurMahima" target="_blank" rel="noopener noreferrer">GitHub</a>
</p>

## Selected Work

<div class="projects home-projects">
  <div class="row row-cols-1">
    {% assign featured_projects = site.projects | sort: 'importance' %}
    {% for project in featured_projects limit: 3 %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>

## Technical Focus

<div class="home-focus-grid">
  <div class="home-focus-item">
    <h3>Data Platforms</h3>
    <p>ELT workflows, partitioned Parquet storage, DuckDB analytics, dbt modeling, and reusable data products.</p>
  </div>
  <div class="home-focus-item">
    <h3>Reliable Execution</h3>
    <p>Snakemake and Dagster orchestration, Dockerized workflows, validation, HPC execution, and reproducible delivery.</p>
  </div>
  <div class="home-focus-item">
    <h3>Health Analytics</h3>
    <p>Claims and survey data pipelines, hospitalization-risk exploration, and analytical tooling for research teams.</p>
  </div>
</div>

## Research Software Presentation

Presented **A reproducible and scalable pipeline for processing administrative health claims data** at USRSE'25. The work focuses on transforming Medicare administrative data into validated, analysis-ready datasets with reproducible workflows.

[Read the presentation note]({% post_url 2025-10-06-usrse25-reproducible-health-claims-pipeline %}) · [View the Zenodo record](https://doi.org/10.5281/zenodo.17281686)

## Background

- Data Engineer, Harvard T.H. Chan School of Public Health, July 2024 - present
- M.S. Health Informatics, Yale University, 2024
- M.S., University of Delhi, 2019

[Full CV]({{ '/cv/' | relative_url }}) · [Google Scholar](https://scholar.google.com/citations?user=bBCrQ-sAAAAJ&hl=en)
