---
layout: page
permalink: /repositories/
title: repositories
description: Main GitHub profile and featured project(s).
nav: true
nav_order: 4
---

## GitHub Profile

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_user.liquid username="KaurMahima" %}
</div>

## Featured Project

- [Diabetes Risk Calculator](https://github.com/KaurMahima/BIS-634-Assignments/tree/main/FinalProject): Built a diabetes risk prediction model on 70K records and deployed a dashboard using Flask and Plotly.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
