---

layout: page
title: projects
permalink: /projects/
description: Featured project(s).
nav: true
nav_order: 3
---

## Diabetes Risk Calculator

- [GitHub Repository](https://github.com/KaurMahima/BIS-634-Assignments/tree/main/FinalProject)
- Built a diabetes risk prediction model on 70K records and deployed a dashboard using Flask and Plotly.

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>
    {% endif %}
