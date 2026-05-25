---
layout: post
title: Building a Citi Bike Analytics Platform with DuckDB, dbt, and Dagster
date: 2026-05-25
author: Mahima Kaur
description: Building a reproducible mobility analytics pipeline from Citi Bike trips and NOAA weather data using Parquet, DuckDB, dbt, Dagster, and Streamlit.
tags: [data-engineering, projects, reproducibility]
related_posts: false
---

I built the [Citi Bike Analytics Platform]({{ '/projects/citibike-analytics-platform/' | relative_url }}) to practice a complete analytics engineering workflow on public mobility data. The platform combines monthly Citi Bike trip records with NOAA daily weather observations and turns them into dashboard-ready analytical models.

## Why This Stack

The architecture is intentionally lightweight and reproducible:

- **Parquet** provides compact, query-friendly bronze storage.
- **DuckDB** makes it possible to build a local analytical warehouse without a hosted database.
- **dbt** organizes staging and mart transformations as documented, testable SQL models.
- **Dagster** coordinates monthly ingestion and transformations.
- **Streamlit** exposes model outputs in an interactive dashboard.

## Ingestion To Bronze Storage

The trip-ingestion script downloads one monthly Citi Bike ZIP archive, reads CSV content with DuckDB, normalizes the schema, and writes a partitioned Parquet output:

```text
data/bronze/year=YYYY/month=MM/trips.parquet
```

A monthly load can be run with:

```bash
python scripts/download_citibike_data.py --year 2026 --month 4
python scripts/download_weather_noaa.py --year 2026 --month 4
```

This partition design keeps incremental monthly runs simple and makes historical backfills explicit.

## Transforming Trips Into Analytics Marts

dbt reads the bronze layer and builds a DuckDB warehouse at `warehouse/citibike.duckdb`. The modeled outputs support multiple analysis levels: trip, day, station, station flow, and hour.

An enriched daily mart joins trip counts with weather and calendar context:

{% raw %}
```sql
select
  t.trip_date,
  t.total_trips,
  t.member_trips,
  t.casual_trips,
  t.avg_trip_duration_minutes,
  w.temperature_max_c,
  w.precipitation_mm,
  coalesce(h.is_holiday, false) as is_holiday,
  case
    when strftime(t.trip_date, '%w') in ('0', '6') then true
    else false
  end as is_weekend
from {{ ref('fct_trip_daily') }} t
left join {{ ref('stg_weather_daily') }} w
  on t.trip_date = w.weather_date
left join {{ ref('holiday_calendar') }} h
  on t.trip_date = h.holiday_date
```
{% endraw %}

This creates a reusable data product for questions such as how membership patterns, precipitation, weekends, or holidays relate to trip activity.

## Orchestrating Monthly Runs

The Dagster job runs ingestion and modeling in dependency order:

```python
@job
def monthly_pipeline_job():
    trip = run_trip_ingestion_op()
    weather = run_weather_ingestion_op(start=trip)
    run_dbt_build_op(start=weather)
```

The included schedule defaults to the previous completed month, while manual run configuration supports reruns and backfills.

## Serving The Dashboard

After building the data models, the Streamlit dashboard reads directly from DuckDB:

```bash
cd dbt
dbt build
cd ../app
streamlit run dashboard.py
```

The resulting analytical interface is structured for trip KPIs, member-versus-casual trends, weather relationships, station maps, origin-destination flows, and hourly mobility exploration.

## Project Links

- [Full project overview]({{ '/projects/citibike-analytics-platform/' | relative_url }})
- [Source code on GitHub](https://github.com/KaurMahima/citibike-analytics-platform)
