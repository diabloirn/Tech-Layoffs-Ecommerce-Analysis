# Design System Specification: E-Commerce Tech Layoffs Executive Dashboard

> **Design Philosophy**: Clear, Clean, Simple, Organic & Insight-Driven  
> **Framework & Guidance**: UI/UX Pro Max Intelligence ([skills.sh](https://www.skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max))  
> **Theme Strategy**: Dedicated Light Mode Only (Warm Organic Modernism)  
> **Target Audience**: C-Level Executives, People & HR Leaders, Data Journalists, and Tech Strategists.

---

## 1. Visual Strategy & Aesthetic Direction

1. **Warm Organic Modernism**:
   - Palette inspired by natural elements: **Broken White, Wood, Sage, Cloud Blue, Glasses (Frosted Glass), and Warm Yellow**.
   - Elimination of dark mode creates a dedicated, unified visual hierarchy with high contrast and zero visual fatigue.
   - Minimalist header with centered title: **Tech Layoffs & Hiring Trends**.

2. **Clarity First & Glassmorphic Surfaces**:
   - Translucent glassmorphic card containers (`rgba(255, 255, 255, 0.75)` with `backdrop-filter: blur(12px)`) layered over a soft Broken White canvas (`#F9F7F2`).
   - Delicate warm wood borders (`#E6DED6`) create structural grounding without heavy, harsh drop shadows.
   - Micro-interactions (hover elevation, smooth transitions) reinforce tactile engagement.

3. **Data Integrity & Contextual Truth**:
   - Preserves all 6 stages of `Data Analytics_Tech_Layoffs.ipynb`:
     - **The AI Paradox**: 4D Bubble Chart & flat regression line demonstrating AI as an executive PR scapegoat.
     - **The Hypocrisy Check**: Heatmap crosstab revealing skill-shifting (cutting operational staff while hiring ML/Frontend developers).
     - **The Greed Premium vs Panic Penalty**: Dualism where profitable companies gain +25.1% stock surges from layoffs, while losing companies are penalized (+20.7%).
     - **The Budget Illusion & Human Cost**: High-layoff firms continue spending on compensation ($r = -0.758$ job security collapse).

---

## 2. Color Palette & Semantic Tokens (Light Mode Dedicated)

Complies strictly with WCAG 2.1 AA (minimum contrast ratio ≥ 4.5:1 for body copy and ≥ 3:1 for graphical UI components).

### Core Organic Palette

| Token Name | Hex Code | Description | Role / Usage Context |
| :--- | :--- | :--- | :--- |
| **Broken White** | `#F9F7F2` | Warm Ivory Canvas | Global dashboard background canvas |
| **Pure White** | `#FFFFFF` | Surface Solid | Card body backgrounds, input fields, table bases |
| **Glasses (Frosted)** | `rgba(255, 255, 255, 0.75)` | Translucent Glass | Navigation bar, modal drawers, hover overlays |
| **Deep Wood** | `#2C221E` | Espresso / Deep Walnut | Primary headlines, major KPI numerical totals |
| **Warm Wood** | `#4A3B32` | Natural Timber | Primary body text, table text, structural gridlines |
| **Soft Wood** | `#7D6B5D` | Teak / Muted Wood | Secondary captions, axis labels, table column headers |
| **Wood Border** | `#E6DED6` | Fine Woodgrain Border | Card borders, table dividers, tab outlines |

### Semantic Accent Colors

| Role | Color Name | Hex Code | Soft Tint Hex | Mapping & Context |
| :--- | :--- | :--- | :--- | :--- |
| **Stability & Growth** | **Sage Green** | `#5B7057` | `#E9EFE7` | Stock growth, positive revenue, low-layoff cluster, valid tests |
| **Tech & AI Dynamics** | **Cloud Blue** | `#4B739B` | `#EBF2F7` | AI adoption level, tech roles (ML/Cloud/DevOps), navigation active |
| **Alerts & Anomaly** | **Warm Yellow** | `#D9822B` | `#FEF7EB` | Hypocrisy alerts, restrukturisasi kedok, anomalous correlations |
| **Layoff Impact** | **Terracotta** | `#C24E3F` | `#FDF1F0` | Layoff volumes, high layoff intensity group, job security collapse |

---

## 3. Typography & Hierarchy

- **Primary UI Typeface**: `Inter`, `Plus Jakarta Sans`, system-ui.
- **Data & Numerical Typeface**: `JetBrains Mono`, `SF Mono`, monospace (tabular figures).

| Scale | Size / Line-Height | Weight | Applied To |
| :--- | :--- | :--- | :--- |
| **Display** | 24px (1.5rem) / 1.2 | Bold (700) | Centered Header Title: Tech Layoffs & Hiring Trends |
| **KPI Total** | 24px (1.50rem) / 1.1 | Bold (700) | Scorecard Primary Metric Values |
| **Section Title** | 18px (1.125rem) / 1.3 | SemiBold (600) | Card Headers, Deep-Dive Titles |
| **Body Standard** | 14px (0.875rem) / 1.5 | Regular (400) | Analytical notes, table rows, drawer body |
| **Data Metric** | 13px (0.8125rem) / 1.0 | Medium / SemiBold | Badges, status pills, axis values |
| **Micro Caption** | 11px (0.6875rem) / 1.4 | Medium (500) | Footnotes, timestamps, record identifiers |

---

## 4. Micro-Service & Modular Component Architecture

The frontend is structured into decoupled, maintainable ES6 modules:

```
frontend/
├── index.html                   # HTML Shell Orchestrator
├── css/dashboard.css            # Palette tokens, glassmorphic effects, typography
├── data/analytics_data.json     # 1,732 E-commerce records
└── js/
    ├── main.js                  # Main Application Bootstrap
    ├── config/theme.js          # Centralized palette tokens & Chart.js theme
    ├── services/
    │   ├── dataService.js       # Data fetching, caching, querying, filtering
    │   └── statsService.js      # Statistical tests & aggregations
    └── components/
        ├── headerComponent.js   # Navigation tabs controller
        ├── kpiComponent.js      # 6 KPI Scorecard widgets
        ├── statsTableComponent.js # Pearson validation matrix
        ├── tableComponent.js    # Data Explorer with search & sorting
        ├── drawerComponent.js   # Glassmorphic slide-out detail drawer
        ├── recommendationsComponent.js # 3 Transformation Pillars
        └── charts/
            ├── yearlyChart.js
            ├── univariateChart.js
            ├── aiParadoxChart.js
            ├── hypocrisyHeatmap.js
            ├── greedPremiumChart.js
            ├── budgetIllusionChart.js
            └── humanCostChart.js
```
