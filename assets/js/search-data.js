// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Selected analytics engineering projects with implementation details.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-code",
          title: "Code",
          description: "Public repositories with live GitHub activity and implementation stacks.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "Essays on analytics engineering, reproducible workflows, data quality, and scalable data products.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Professional experience, education, skills, and projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-building-analytics-marts-with-dbt-and-duckdb",
        
          title: "Building Analytics Marts with dbt and DuckDB",
        
        description: "How dbt and DuckDB work together to create transparent, testable analytical models from Parquet data.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/building-analytics-marts-with-dbt-and-duckdb/";
          
        },
      },{id: "post-designing-analytical-data-pipelines-with-parquet-and-duckdb",
        
          title: "Designing Analytical Data Pipelines with Parquet and DuckDB",
        
        description: "Practical design decisions for turning large, multi-file datasets into queryable analytical layers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/designing-health-data-pipelines-with-parquet-and-duckdb/";
          
        },
      },{id: "post-serving-analytical-data-products-with-streamlit",
        
          title: "Serving Analytical Data Products with Streamlit",
        
        description: "Designing dashboards that consume modeled metrics rather than repeating transformation logic in the app layer.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/serving-analytical-data-with-streamlit/";
          
        },
      },{id: "post-validating-analytics-ready-data-before-analysis",
        
          title: "Validating analytics-ready data before analysis",
        
        description: "A validation checklist for identifiers, time logic, duplication, measures, and cohort-ready data products.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/validating-analytics-ready-health-data/";
          
        },
      },{id: "post-reliable-incremental-loads-and-backfills-for-time-partitioned-data",
        
          title: "Reliable Incremental Loads and Backfills for Time-Partitioned Data",
        
        description: "How to design monthly data workflows that rerun safely, expose lineage, and support historical corrections.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/reliable-incremental-loads-and-backfills/";
          
        },
      },{id: "post-presenting-a-reproducible-health-claims-data-pipeline-at-usrse-39-25",
        
          title: "Presenting a reproducible health claims data pipeline at USRSE&#39;25",
        
        description: "A presentation on building a modular, scalable workflow for transforming Medicare administrative data into analysis-ready datasets.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/usrse25-reproducible-health-claims-pipeline/";
          
        },
      },{id: "projects-citi-bike-analytics-platform",
          title: 'Citi Bike Analytics Platform',
          description: "An analytics pipeline combining Citi Bike trip data and NYC weather for mobility analysis.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/citibike-analytics-platform/";
            },},{id: "projects-cms-hospitalization-risk-pipeline",
          title: 'CMS Hospitalization Risk Pipeline',
          description: "A reproducible pipeline and dashboard for exploring hospitalization risk in Medicare claims data.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/cms-hospitalization-risk-pipeline/";
            },},{id: "projects-diabetes-risk-calculator",
          title: 'Diabetes Risk Calculator',
          description: "An interactive BRFSS-based application for exploring modeled diabetes risk.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/diabetes-risk-calculator/";
            },},{id: "projects-healthcare-sql-analytics",
          title: 'Healthcare SQL Analytics',
          description: "A DuckDB and SQL analytics pipeline for admissions, billing, length-of-stay, and readmission analysis.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/healthcare-sql-analytics/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6D%61%68%69%6D%61%6B%61%75%72%32%30@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/KaurMahima", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=bBCrQ-sAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://linkedin.com/in/mahima--kaur", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
