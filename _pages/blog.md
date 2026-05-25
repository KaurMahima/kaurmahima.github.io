---
layout: page
permalink: /blog/
title: blog
description: Notes on data engineering, reproducible workflows, and research software.
nav: true
nav_order: 5
---

{% for post in site.posts %}
  <article class="mb-4">
    <h2>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h2>
    <p class="post-meta">{{ post.date | date: '%B %-d, %Y' }}</p>
    <p>{{ post.description }}</p>
    <a href="{{ post.url | relative_url }}">Read more</a>
  </article>
{% endfor %}
