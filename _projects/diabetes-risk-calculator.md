---
layout: page
title: Diabetes Risk Calculator
description: An interactive BRFSS-based application for exploring modeled diabetes risk.
permalink: /projects/diabetes-risk-calculator/
importance: 1
img: /assets/img/github_repo.png
github: https://github.com/KaurMahima/BIS-634-Assignments/tree/main/FinalProject
---

**Technologies:** Python · Flask · Plotly · pandas · scikit-learn

[View source code on GitHub](https://github.com/KaurMahima/BIS-634-Assignments/tree/main/FinalProject) · [Read the project note on the blog]({% post_url 2026-05-25-diabetes-risk-calculator %})

## Overview

The Diabetes Risk Calculator is an interactive health data application that explores diabetes-associated risk factors and estimates an individual's modeled diabetes risk from submitted health indicators. I built it as a final project using the 2015 Behavioral Risk Factor Surveillance System (BRFSS) dataset, with approximately 70,000 records used in the project dataset.

The project combines exploratory analysis, predictive modeling, and web application development: users can examine summary statistics and interactive Plotly visualizations before entering inputs into the risk calculator.

## What It Does

- Presents background information and documentation for variables used in the analysis.
- Provides summary tables and interactive univariate and bivariate visualizations.
- Collects risk indicators including blood pressure, BMI, physical and mental health, age, education, income, smoking status, and sex.
- Uses a random forest classifier to generate a modeled diabetes risk estimate through a Flask application.

## Implementation

The Flask application loads the BRFSS-derived dataset with pandas, transforms encoded variables into readable categories for analysis pages, and serves interactive charts built with Plotly. For prediction, a `RandomForestClassifier` is trained on selected indicators using a train/test split and exposed through the application's risk calculator form.

This project demonstrates an end-to-end workflow: preparing public health survey data, building visual analytics, training a classification model, and presenting model output through an accessible web interface.

## Responsible Use

This calculator is an educational analytics project, not a clinical diagnostic tool. Its output should not replace medical evaluation, clinical screening, or advice from a qualified health professional.

## Related Writing

- [Building a Diabetes Risk Calculator with Flask and Random Forests]({% post_url 2026-05-25-diabetes-risk-calculator %})
- [Blog]({{ '/blog/' | relative_url }})
