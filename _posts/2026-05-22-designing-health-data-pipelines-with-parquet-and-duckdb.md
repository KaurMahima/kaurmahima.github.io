---
layout: post
title: Designing Health Data Pipelines with Parquet and DuckDB
date: 2026-05-22
author: Mahima Kaur
description: Practical design decisions for turning large, multi-file health datasets into queryable analytical layers.
tags: [data-engineering, health-data, reproducibility]
related_posts: false
---

Health datasets often arrive as many files split by year, source, or population. Before an analyst can answer a research question, the data engineering work has to solve a more basic problem: how can these inputs be transformed into datasets that are consistent, traceable, and efficient to query?

A useful local-first architecture is to store standardized extracts as **partitioned Parquet** and query or transform them with **DuckDB**. This approach provides columnar storage and SQL analytics without requiring a long-running database service.

## Why Parquet For The Storage Layer

CSV files are useful as source inputs, but they are not an ideal analytical storage format. They require repeated parsing, do not preserve data types reliably, and often force queries to scan columns that are not needed.

Parquet improves that workflow by providing:

- Columnar storage, so analytical queries read only relevant fields.
- Preserved types, which reduces repeated cleaning logic.
- Compression, which helps when datasets span many files or years.
- Partition-friendly layouts for incremental processing.

A year- and month-partitioned layer can look like:

```text
data/bronze/
  year=2024/month=01/records.parquet
  year=2024/month=02/records.parquet
  year=2024/month=03/records.parquet
```

That layout makes data lineage understandable and supports targeted reprocessing when a single period needs correction.

## Using DuckDB As An Analytical Engine

DuckDB is effective for this pattern because it queries Parquet directly and supports familiar SQL transformation workflows. For example, an analyst can aggregate a partitioned dataset without first loading it into a server database:

```sql
select
  service_year,
  count(*) as records,
  count(distinct patient_id) as patients
from read_parquet('data/bronze/**/*.parquet', hive_partitioning = true)
group by service_year
order by service_year;
```

This is useful during pipeline development because validation queries can run against the stored output immediately.

## Bronze, Staging, And Mart Layers

Separating transformations into layers prevents cleaning rules from being mixed with analytical definitions:

1. **Bronze** stores standardized source extracts with minimal business logic.
2. **Staging** applies naming conventions, type casting, deduplication, and normalized codes.
3. **Marts** define analysis-ready outcomes, cohorts, or aggregate measures.

For health data, this separation matters. A transformation such as mapping diagnosis or enrollment values should be documented independently from a metric such as hospitalization counts or readmission rates.

## Validation At Each Boundary

A data pipeline is not complete when a file is written. Each transition should check what changed:

- Record counts before and after transformation.
- Null rates for critical identifiers and dates.
- Duplicates at the intended grain.
- Valid ranges for dates, amounts, durations, and category codes.
- Partition completeness for expected time periods.

An example validation query for a visit-level table:

```sql
select
  count(*) as visits,
  count(distinct visit_id) as distinct_visits,
  sum(case when patient_id is null then 1 else 0 end) as missing_patient_ids,
  sum(case when discharge_date < admission_date then 1 else 0 end) as invalid_stays
from analytics.visits;
```

## Practical Takeaway

Partitioned Parquet plus DuckDB is a strong foundation for analytical pipelines when teams need reproducible transformations, efficient local iteration, and clear data products. The technology is lightweight; the engineering standard should still be rigorous: explicit layers, documented grain, and validation that makes analytical results defensible.
