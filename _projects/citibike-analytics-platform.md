---
layout: page
title: Citi Bike Analytics Platform
description: An analytics pipeline combining Citi Bike trip data and NYC weather for mobility analysis.
permalink: /projects/citibike-analytics-platform/
importance: 0
img: /assets/img/github_repo.png
github: https://github.com/KaurMahima/citibike-analytics-platform
tech: [Python, DuckDB, dbt, Dagster]
---

**Technologies:** Python · DuckDB · dbt · Dagster · Streamlit · Parquet · NOAA API

[View source code on GitHub](https://github.com/KaurMahima/citibike-analytics-platform)

## Overview

The Citi Bike Analytics Platform is an end-to-end data engineering project for analyzing New York City bike-share activity together with daily weather context. It ingests public Citi Bike trip files and NOAA weather data, converts raw inputs to partitioned Parquet storage, builds analytics marts in DuckDB with dbt, and serves dashboard-ready metrics through Streamlit.

The project is designed around a local, reproducible analytics stack: inexpensive columnar storage, SQL-modeled data products, testable transformations, and an orchestration layer for monthly refreshes and historical backfills.

## Data Flow

1. Python scripts ingest monthly Citi Bike trip ZIP files and NOAA API responses.
2. Raw extracts are converted into partitioned bronze Parquet datasets under `data/bronze/`.
3. dbt stages trip and weather sources, then materializes fact and mart tables into `warehouse/citibike.duckdb`.
4. A Streamlit dashboard reads the marts for trip KPIs, station activity, movement flows, and weather-based exploration.
5. Dagster runs monthly ingestion and `dbt build` as one scheduled workflow.

## Architecture

```text
Citi Bike S3 + NOAA API
          |
          v
   Python ingestion
          |
          v
 Bronze Parquet partitions
          |
          v
 dbt models in DuckDB
          |
          v
 Streamlit dashboard
```

## Analytics Models

The dbt project provides staging models for trips and weather, then builds marts including:

- `fct_trips` for trip-level records.
- `fct_trip_daily` for daily activity metrics.
- `fct_trip_daily_enriched` for weather, holiday, weekend, and seasonal context.
- `fct_station_daily` and hourly station marts for station activity.
- Daily and hourly station-flow marts for origin-destination analysis.

For example, the enriched daily mart joins weather and holiday dimensions onto daily trip aggregates:

{% raw %}
```sql
select
  t.trip_date,
  t.total_trips,
  t.member_trips,
  t.casual_trips,
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

## Running The Pipeline

After creating the environment and configuring a NOAA API token, the workflow can be executed locally:

```bash
conda env create -f environment.yml
conda activate citibike-analytics
export NOAA_API_TOKEN="your_token_here"

python scripts/download_citibike_data.py --year 2026 --month 4
python scripts/download_weather_noaa.py --year 2026 --month 4

cd dbt
dbt build
cd ../app
streamlit run dashboard.py
```

Monthly processing can also be launched through Dagster:

```bash
dagster dev -m citibike_analytics.dagster_pipeline.definitions
```

The scheduled pipeline processes the previously completed month and supports targeted manual runs for backfills.

## What The Dashboard Supports

- Daily total trip, member, and casual rider metrics.
- Trip trends alongside weather conditions.
- Station activity maps.
- Station-to-station flow exploration.
- Hourly mobility patterns derived from station and flow marts.

## Engineering Focus

This project demonstrates pipeline design across ingestion, storage, transformation, orchestration, and delivery. It uses Parquet and DuckDB to keep local analytics efficient, dbt to make transformations explicit and testable, Dagster to manage recurring data refreshes, and Streamlit to expose modeled data through an interactive analytical interface.
