---
layout: page
permalink: /repositories/
title: Repositories
description: Public data engineering, analytics, and research software repositories.
nav: true
nav_order: 4
---

## GitHub Profile

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_user.liquid username="KaurMahima" %}
</div>

## Public Repositories

The cards below link to public repositories on [my GitHub profile](https://github.com/KaurMahima). GitHub statistics are loaded live from shields.io.

<div class="repository-projects row row-cols-1 row-cols-md-2">
  {% for project in site.data.repositories.projects %}
    <div class="col mb-4">
      {% include repository/project_card.liquid project=project %}
    </div>
  {% endfor %}
</div>
