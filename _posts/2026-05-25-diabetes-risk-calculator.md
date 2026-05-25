---
layout: post
title: Building a Diabetes Risk Calculator with Flask and Random Forests
date: 2026-05-25
author: Mahima Kaur
description: A project note on turning BRFSS health survey data into an interactive diabetes risk exploration and modeling application.
tags: [projects, health-data, data-engineering]
related_posts: false
---

The [Diabetes Risk Calculator]({{ '/projects/diabetes-risk-calculator/' | relative_url }}) is a health data application I built to combine exploratory analysis and a predictive model in one interface. It uses a BRFSS 2015-derived dataset of approximately 70,000 records and presents both interactive analysis views and an individual risk estimation form.

## From Data to Interface

The application uses pandas to prepare survey indicators for display and analysis. Encoded features such as high blood pressure, general health, age bands, physical activity, and smoking status are translated into readable categories so users can explore the dataset through tables and Plotly charts.

The predictive component uses a scikit-learn random forest classifier trained on selected health and demographic indicators. A Flask route accepts form inputs, calculates an estimated risk score, and presents the model response in the web interface.

## Why I Built It

This project was an opportunity to connect public health data analysis with an interactive application workflow:

- Prepare and interpret a structured health survey dataset.
- Build exploratory views for understanding variables and relationships.
- Train a classification model using selected risk indicators.
- Deploy model interaction through a Flask-based web application.

## Scope and Limitations

The calculator is an educational project and is not intended for diagnosis or clinical decision-making. A modeled estimate based on survey data cannot replace screening, medical history, or guidance from a healthcare professional.

## Project Links

- [Full project overview]({{ '/projects/diabetes-risk-calculator/' | relative_url }})
- [Source code on GitHub](https://github.com/KaurMahima/BIS-634-Assignments/tree/main/FinalProject)
