---
layout: page
title: Projects
permalink: /projects/
description: Applied health data and analytics projects.
nav: true
nav_order: 3
---

<div class="projects">
  <div class="row row-cols-1 row-cols-md-2">
    {% assign sorted_projects = site.projects | sort: 'importance' %}
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
