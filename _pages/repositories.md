---
layout: page
permalink: /repositories/
title: Code
description: Public repositories with live GitHub activity and implementation stacks.
nav: true
nav_order: 4
---

## Featured Repositories

<div class="repository-projects">
  {% for project in site.data.repositories.projects %}
    {% if project.featured %}
      <div class="repository-project mb-4">
        {% include repository/project_card.liquid project=project %}
      </div>
    {% endif %}
  {% endfor %}
</div>

## Additional Repositories

<div class="repository-projects">
  {% for project in site.data.repositories.projects %}
    {% unless project.featured %}
      <div class="repository-project mb-4">
        {% include repository/project_card.liquid project=project %}
      </div>
    {% endunless %}
  {% endfor %}
</div>
