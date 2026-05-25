---
layout: post
title: Validating analytics-ready data before analysis
date: 2026-05-15
author: Mahima Kaur
description: A validation checklist for identifiers, time logic, duplication, measures, and cohort-ready data products.
tags: [data-engineering, data-quality, reproducibility]
related_posts: false
---

An analytics-ready dataset should be more than a cleaned table. It should have a documented grain, predictable identifiers, valid time relationships, and measurements that can be trusted in downstream analysis.

In analytical workflows, weak validation can quietly affect customer counts, utilization trends, costs, or modeled outcomes. The checks below are a practical baseline before exposing a dataset to analysts or dashboards.

## 1. Define The Grain First

Before validating a table, state what one row represents:

- One beneficiary.
- One enrollment period.
- One admission.
- One claim line.
- One patient-month summary.

Without a clear grain, duplicate checks and joins cannot be interpreted correctly. A duplicated beneficiary row may be a defect in a beneficiary table but completely expected in an admissions table.

## 2. Validate Identifiers

Identifiers determine whether records can be joined and whether events can be counted correctly. At minimum, check:

- Missing primary identifiers.
- Duplicate keys at the stated grain.
- Orphan records after joining source tables.
- Unexpected changes in distinct identifier counts between pipeline runs.

```sql
select
  count(*) as rows,
  count(distinct admission_id) as admissions,
  count_if(admission_id is null) as missing_admission_ids,
  count_if(patient_id is null) as missing_patient_ids
from mart_admissions;
```

## 3. Test Time Relationships

Date logic is central to utilization and outcomes analysis. Common checks include:

- Admission date is not after discharge date.
- Enrollment spans include the dates of eligible events.
- Year and month partitions agree with event dates.
- Follow-up windows are available before outcome calculation.

```sql
select count(*) as invalid_length_of_stay
from mart_admissions
where discharge_date < admission_date;
```

## 4. Monitor Clinical And Financial Measures

Pipelines should reject or flag impossible or implausible measures rather than silently carry them forward. Depending on the dataset, checks may include:

- Negative billing amounts.
- Impossible ages.
- Unknown categorical values after harmonization.
- Extremely high length-of-stay values requiring review.

The purpose is not to discard unusual data automatically. It is to make unusual values visible and auditable.

## 5. Compare Runs Over Time

A pipeline can pass row-level validation while still producing an unexpected change in aggregate outputs. Add run-level comparisons:

- Counts by year and source file.
- Event counts by demographic grouping.
- Missingness trends for key fields.
- Aggregate measures compared with prior runs.

A sudden shift may reflect a real source-data update, but it should be reviewed before publication or dashboard release.

## 6. Produce A Validation Artifact

Validation should leave evidence. A useful pipeline output includes:

- Rules executed.
- Pass/fail result.
- Number of failing records.
- Run timestamp and input partitions.
- Links to quarantined or reviewable records where applicable.

This turns quality checks into part of the data product rather than an informal step performed only during development.

## Closing Principle

Reliable analytics begins before the statistical model or visualization. When the dataset grain, identifiers, temporal logic, and validation outputs are explicit, analysts can spend less time questioning pipeline behavior and more time interpreting results responsibly.
