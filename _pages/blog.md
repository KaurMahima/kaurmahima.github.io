---
layout: page
permalink: /blog/
title: Blog
description: Blogs on analytics engineering, reproducible workflows, data quality, and scalable data products.
nav_title: Blog
nav: true
nav_order: 5
---

<div class="tag-category-list" aria-label="Browse topics">
  <span class="topic-label">Topics</span>
  <ul>
    {% for tag in site.display_tags %}
      <li><a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a></li>
    {% endfor %}
  </ul>
</div>

<ul class="post-list blog-index">
  {% for post in site.posts %}
    {% assign words = post.content | number_of_words %}
    {% assign reading_time = words | divided_by: 200 | plus: 1 %}
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
          <p class="post-excerpt">{{ post.description }}</p>
          <p class="post-meta">{{ post.date | date: '%B %-d, %Y' }} &nbsp; · &nbsp; {{ reading_time }} min read</p>
          <p class="post-tags">
            {% for tag in post.tags %}
              <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>
            {% endfor %}
            {% if post.categories.size > 0 %}
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
