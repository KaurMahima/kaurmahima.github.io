---
layout: post
title: Serving Analytical Data Products with Streamlit
date: 2026-05-18
author: Mahima Kaur
description: Designing dashboards that consume modeled metrics rather than repeating transformation logic in the app layer.
tags: [analytics-engineering, data-engineering, data-quality]
related_posts: false
---

An analytical dashboard is most maintainable when it is a consumer of trusted data products, not the place where business logic is recreated. **Streamlit** makes it straightforward to publish interactive analyses in Python, but the reliability of the dashboard depends on how the data layer is structured.

## Keep Modeling Upstream

A common failure mode is to load raw files in the dashboard and calculate every metric in Python each time the app runs. That creates several problems:

- Metric definitions are harder to test separately from interface behavior.
- Loading and transformation costs slow interaction.
- Analysts cannot easily query the same modeled output outside the dashboard.
- Business logic becomes coupled to chart code.

A stronger architecture puts transformations in SQL models or pipeline steps and exposes analysis-ready tables to the application:

```text
Source files -> Parquet -> dbt/DuckDB marts -> Streamlit
```

## Design Dashboard Tables Around User Actions

The serving model should match the kinds of interactions users need. Common dashboard-ready tables include:

- Daily KPI tables for summary cards and trend charts.
- Entity-level aggregates for map or ranking views.
- Flow tables for origin-destination exploration.
- Hourly aggregates for time-of-day patterns.

For example, a daily KPI query should be compact:

```sql
select
  activity_date,
  total_events,
  active_entities,
  avg_duration_minutes
from mart_daily_kpis
where activity_date between ? and ?
order by activity_date;
```

The app filters and visualizes a defined model; it does not redefine the calculation.

## Query DuckDB Safely From Streamlit

DuckDB works well behind local analytical dashboards because it can serve modeled tables or directly query Parquet when appropriate:

```python
import duckdb
import streamlit as st

@st.cache_data
def load_daily_kpis(start_date, end_date):
    with duckdb.connect("warehouse/analytics.duckdb", read_only=True) as conn:
        return conn.execute(
            """
            select *
            from mart_daily_kpis
            where activity_date between ? and ?
            order by activity_date
            """,
            [start_date, end_date],
        ).df()
```

Using a read-only connection and cached results separates application reads from pipeline writes and improves dashboard responsiveness.

## Display Metric Definitions

Dashboards become easier to trust when the user can understand each metric. Include concise definitions for:

- The table grain.
- Date coverage.
- Filters applied.
- Whether a measure represents events, unique entities, averages, or rates.
- Refresh time or pipeline-run context.

This is especially important when similar measures can be interpreted differently, such as events versus users or totals versus normalized rates.

## Handle Empty And Partial Data

Applications need graceful behavior when:

- A date range has no records.
- A partition has not completed processing.
- A required model is unavailable.
- Filters reduce data below meaningful levels.

Instead of rendering misleading zeros, the interface should tell the user when data is unavailable or still processing.

## Takeaway

Streamlit is effective for analytical delivery when paired with modeled, tested, queryable data products. A dashboard should make insight accessible; it should not hide transformation logic that belongs in the data pipeline.
