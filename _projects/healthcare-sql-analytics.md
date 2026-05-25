---
layout: page
title: Healthcare SQL Analytics
description: A DuckDB and SQL analytics pipeline for admissions, billing, length-of-stay, and readmission analysis.
permalink: /projects/healthcare-sql-analytics/
importance: 2
img: /assets/img/github_repo.png
github: https://github.com/KaurMahima/healthcare-sql-analytics
tech: [SQL, DuckDB, Python]
---

**Technologies:** SQL · DuckDB · Python · Window Functions · Kaggle API

[View source code on GitHub](https://github.com/KaurMahima/healthcare-sql-analytics)

## Overview

Healthcare SQL Analytics is an end-to-end analytics project built on **49,904 admissions** across 2019-2024. It creates a DuckDB analytical database, cleans and validates source records with SQL, and answers operational questions about billing, admissions, length of stay, conditions, and readmissions.

## Data Preparation

The SQL pipeline includes:

- Standardizing source column names and text values.
- Identifying and removing 534 duplicate records.
- Validating dates and billing values.
- Generating patient and visit identifiers with window functions.
- Correcting age inconsistencies for longitudinal patient records.

## Analytical Questions

The modeled data is used to evaluate:

- Admissions and conditions by age and gender.
- Billing and payer concentration.
- Length-of-stay and cost-per-day patterns.
- Thirty-day readmissions using `LAG()` window logic.
- Patient comorbidity distributions.

## Example Outputs

The repository documents several analysis results:

- **$1.28B** total billing across five years.
- **47,875** unique patients in the cleaned admissions analysis.
- **1.05%** identified 30-day readmission rate in the project dataset.
- Approximately **$1,650 per day** across admission types.

## Running The Analysis

```bash
conda env create -f environment.yml
conda activate healthcare-analytics
python scripts/download_data.py
python scripts/create_db.py
duckdb data/processed/healthcare_data.duckdb < sql/02_data_cleaning.sql
duckdb data/processed/healthcare_data.duckdb < sql/03_exploratory_analysis.sql
```

## Engineering Value

The project demonstrates analytical SQL beyond one-off queries: ingestion, a local DuckDB warehouse, validation and cleaning, reproducible query assets, and documented metrics that answer healthcare operations questions.
