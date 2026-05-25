---
layout: page
permalink: /repositories/
title: Repositories
description: Selected projects and public GitHub repositories.
nav: true
nav_order: 4
---

## Featured

<div class="repository-projects">
  {% for project in site.data.repositories.projects %}
    {% if project.featured %}
      <div class="repository-project mb-4">
        {% include repository/project_card.liquid project=project %}
      </div>
    {% endif %}
  {% endfor %}
</div>

## Public

<div class="repository-projects">
  {% for project in site.data.repositories.projects %}
    {% unless project.featured %}
      <div class="repository-project mb-4">
        {% include repository/project_card.liquid project=project %}
      </div>
    {% endunless %}
  {% endfor %}
</div>
