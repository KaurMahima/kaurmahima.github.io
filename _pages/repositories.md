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

## Highlights

{% for project in site.data.repositories.highlights %}
- [{{ project.name }}]({{ project.url }}): {{ project.description }}
{% endfor %}

## Public Repositories

The cards below link to all public repositories on [my GitHub profile](https://github.com/KaurMahima).

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
