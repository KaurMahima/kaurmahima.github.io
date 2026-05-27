---
layout: page
title: Projects
permalink: /projects/
description: Selected data engineering case studies, from ingestion and modeling to reliable analytical delivery.
nav: true
nav_order: 3
---

<div class="projects project-showcase">
  {% assign sorted_projects = site.projects | sort: 'importance' %}
  {% assign featured_project = sorted_projects | first %}
  {% include project_featured.liquid project=featured_project %}

  <header class="project-section-heading">
    <p class="project-section-label">Additional Case Studies</p>
    <h2>Applied analytics projects</h2>
  </header>

  <div class="row row-cols-1 row-cols-md-3 project-grid">
    {% for project in sorted_projects offset: 1 %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
