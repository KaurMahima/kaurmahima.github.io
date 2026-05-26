---
layout: post
title: Building Analytics Marts with dbt and DuckDB
date: 2026-05-24
author: Mahima Kaur
description: How dbt and DuckDB work together to create transparent, testable analytical models from Parquet data.
tags: [analytics-engineering, data-engineering, data-quality]
related_posts: false
---

A dashboard or recurring report is only as stable as the analytical tables behind it. When metric logic is embedded directly in application code or scattered across notebooks, changes become difficult to review and results become difficult to reproduce.

A practical alternative is to model analytical tables in **dbt** and execute them in **DuckDB**. dbt provides structure, dependencies, documentation, and testing; DuckDB provides a fast analytical engine that can read local Parquet inputs and materialize warehouse tables without operating a database server.

## Separate Staging From Business Logic

The first layer should make source data consistent, not answer every analytical question. A staging model typically handles:

- Renaming columns to stable conventions.
- Casting strings into dates, numeric values, and categories.
- Standardizing missing or malformed values.
- Defining a reliable row grain.

Once staging is stable, marts can focus on measures such as daily volume, member mix, average duration, cost, or event rates.

```text
Parquet inputs
    |
    v
stg_events + stg_context
    |
    v
fct_events -> fct_events_daily -> mart_dashboard_metrics
```

## Build Marts Around Questions

An analytical mart should have a clear consumer and grain. For example, a daily activity mart could contain one row per date and expose the measures used in a reporting interface:

{% raw %}
```sql
select
  event_date,
  count(*) as total_events,
  count_if(user_type = 'member') as member_events,
  avg(duration_minutes) as avg_duration_minutes
from {{ ref('stg_events') }}
group by event_date
```
{% endraw %}

A separate enrichment model can join contextual data such as weather, holidays, campaigns, regions, or other external features. Separating base aggregation from enrichment makes it easier to inspect where a metric changed.

## Add Tests At The Grain Of The Model

Testing is valuable when it asserts assumptions that downstream users depend on. Typical dbt checks include:

- Unique and non-null keys for fact and dimension models.
- Accepted categorical values.
- Referential integrity between fact and dimension tables.
- Custom tests for measures that cannot be negative.

For a daily mart, the date should generally be unique and not null. For a trip- or visit-level fact model, the event identifier should be unique. These tests turn model contracts into executable checks.

## Materialize Intentionally

DuckDB makes local transformations inexpensive, but materialization choices still matter:

- Use **views** for lightweight staging models and rapidly changing logic.
- Use **tables** for marts read repeatedly by dashboards or analysis queries.
- Use incremental or partition-based rebuilding when source history grows.

This avoids unnecessary compute while keeping presentation layers responsive.

## A Simple Build Workflow

```bash
cd dbt
dbt build
duckdb ../warehouse/analytics.duckdb
```

Within DuckDB, validation can continue at the model output:

```sql
select *
from mart_dashboard_metrics
order by event_date desc
limit 10;
```

## Takeaway

dbt and DuckDB are a strong combination for analytics engineering projects that need transparent SQL logic, fast local execution, and reliable marts for dashboards or recurring reporting. The essential practice is to make each model answer one clear question at a documented grain, with tests that protect downstream trust.
