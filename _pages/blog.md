---
layout: page
permalink: /blog/
title: Blog
nav_title: Blog
nav: true
nav_order: 5
---

Documenting my learnings in health data engineering, reproducible research workflows, and scalable analytics. I also share conference presentations, research software, and projects.

<div class="tag-category-list">
  <ul>
    {% for tag in site.display_tags %}
      <li><a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}"># {{ tag }}</a></li>
    {% endfor %}
  </ul>
</div>

<ul class="post-list">
  {% for post in site.posts %}
    {% assign words = post.content | number_of_words %}
    {% assign reading_time = words | divided_by: 180 | plus: 1 %}
    <li>
      <div class="post-list-item{% if post.thumbnail %} has-thumbnail{% endif %}">
        {% if post.thumbnail %}
          <a class="post-thumbnail" href="{{ post.url | relative_url }}" aria-label="Read {{ post.title }}">
            <img src="{{ post.thumbnail | relative_url }}" alt="" loading="lazy">
          </a>
        {% endif %}
        <div class="post-summary">
          <h2>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h2>
          <p class="post-meta">{{ reading_time }} min read &nbsp; · &nbsp; {{ post.date | date: '%B %-d, %Y' }}</p>
          <p>{{ post.description }}</p>
          <p class="post-tags">
            <a href="{{ post.date | date: '%Y' | prepend: '/blog/' | relative_url }}">{{ post.date | date: '%Y' }}</a>
            &nbsp; · &nbsp;
            {% for tag in post.tags %}
              <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>
              {% unless forloop.last %}&nbsp; {% endunless %}
            {% endfor %}
            {% if post.categories.size > 0 %}
              &nbsp; · &nbsp;
              {% for category in post.categories %}
                <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}">{{ category }}</a>
              {% endfor %}
            {% endif %}
          </p>
        </div>
      </div>
    </li>
  {% endfor %}
</ul>
