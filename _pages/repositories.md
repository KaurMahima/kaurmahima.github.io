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

## Featured Repositories

Selected data engineering and analytics projects. GitHub statistics are loaded live from shields.io.

<div class="repository-projects row row-cols-1 row-cols-md-2">
  {% for project in site.data.repositories.projects %}
    {% if project.featured %}
      <div class="col mb-4">
        {% include repository/project_card.liquid project=project %}
      </div>
    {% endif %}
  {% endfor %}
</div>

## More Public Repositories

Additional repositories from [my GitHub profile](https://github.com/KaurMahima).

<div class="repository-projects row row-cols-1 row-cols-md-2">
  {% for project in site.data.repositories.projects %}
    {% unless project.featured %}
      <div class="col mb-4">
        {% include repository/project_card.liquid project=project %}
      </div>
    {% endunless %}
  {% endfor %}
</div>
