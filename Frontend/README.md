# Frontend: E-Commerce Tech Layoffs Executive Intelligence Dashboard

Interactive executive data dashboard presenting empirical findings from `Data Analytics_Tech_Layoffs.ipynb` and `tech_layoffs_hiring_trends_elite_v2.csv` (1,732 isolated E-Commerce records).

Built with **UI/UX Pro Max Intelligence** ([skills.sh](https://www.skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max)) featuring a **Clear, Clean, Simple, Organic Light Theme** (Broken White, Wood, Sage, Cloud Blue, Glasses, Warm Yellow).

---

## Architecture (Micro-Components & Micro-Services)

- `index.html`: Clean HTML orchestrator shell.
- `css/dashboard.css`: Organic tokens, glassmorphism (`backdrop-filter: blur(14px)`), tactile shadows, and custom typography.
- `data/analytics_data.json`: 1,732 precomputed records and metrics.
- `js/config/theme.js`: Central theme tokens and Chart.js theme options.
- `js/services/`: Isolated data query and statistical calculation microservices.
- `js/components/`: Decoupled components (Header, KPI Scorecards, Empirical Matrix Table, Data Explorer, Glass Drawer, Recommendations).
- `js/components/charts/`: Dedicated chart modules (Yearly Dynamics, Univariate Distributions, AI Paradox 4D Bubble, Hypocrisy Heatmap, Greed Premium Bar, Budget Illusion Cluster, Human Cost Regression).

---

## How to Run Locally

```bash
# Option 1: Using NPM
cd Frontend
npm start

# Option 2: Using Python HTTP server
python -m http.server 8080 --directory Frontend
```
Open your browser at `http://localhost:8080`.
