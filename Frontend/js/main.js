/* ==========================================================================
   main.js - Application Bootstrap & Micro-Component Orchestrator
   ========================================================================== */

import { setupChartDefaults } from './config/theme.js';
import { dataService } from './services/dataService.js';
import { HeaderComponent } from './components/headerComponent.js';
import { KpiComponent } from './components/kpiComponent.js';
import { StatsTableComponent } from './components/statsTableComponent.js';
import { TableComponent } from './components/tableComponent.js';
import { DrawerComponent } from './components/drawerComponent.js';
import { RecommendationsComponent } from './components/recommendationsComponent.js';

// Chart modules
import { renderYearlyChart } from './components/charts/yearlyChart.js';
import { renderUnivariateCharts } from './components/charts/univariateChart.js';
import { renderAIParadoxChart } from './components/charts/aiParadoxChart.js';
import { renderHypocrisyHeatmap } from './components/charts/hypocrisyHeatmap.js';
import { renderGreedPremiumChart } from './components/charts/greedPremiumChart.js';
import { renderBudgetIllusionChart } from './components/charts/budgetIllusionChart.js';
import { renderHumanCostChart } from './components/charts/humanCostChart.js';

class App {
  constructor() {
    this.charts = {};
    this.drawer = null;
    this.table = null;
  }

  async start() {
    try {
      setupChartDefaults();

      // 1. Initialize Drawer Component
      this.drawer = new DrawerComponent('drawerBackdrop', 'drawerDetailBody', 'closeDrawerBtn');

      // 2. Initialize Header Component
      const header = new HeaderComponent((sectionId) => {
        this.handleSectionChange(sectionId);
      });
      header.init();

      // 3. Load Data from Microservice
      const data = await dataService.load();

      // 4. Initialize KPI Scorecard Component
      const kpiComp = new KpiComponent(data.kpis);
      kpiComp.render();

      // 5. Initialize Overview Charts
      this.charts.yearly = renderYearlyChart('yearlyTrendChart', data.yearly_trends);
      const univariate = renderUnivariateCharts(data.records);
      this.charts.layoffDist = univariate.layoffChart;
      this.charts.aiDist = univariate.aiChart;

      // 6. Initialize Deep-Dive Charts
      this.charts.aiParadox = renderAIParadoxChart('aiParadoxChart', data.ai_paradox);
      renderHypocrisyHeatmap('hypocrisyHeatmapContainer', data.crosstab_hypocrisy);
      this.charts.greedPremium = renderGreedPremiumChart('greedPremiumChart', data.greed_premium);
      this.charts.budgetIllusion = renderBudgetIllusionChart('budgetIllusionChart', data.budget_illusion);
      this.charts.humanCost = renderHumanCostChart('humanCostChart', data.human_cost);

      // 7. Initialize Empirical Statistical Validation Table
      const statsComp = new StatsTableComponent('statsTableBody', data.statistical_validation);
      statsComp.render();

      // 8. Initialize Data Explorer Table Component
      this.table = new TableComponent((record) => {
        this.drawer.open(record);
      });
      this.table.init();

      // 9. Initialize Recommendations Component
      const recComp = new RecommendationsComponent('recommendationsContainer');
      recComp.render();

      // 10. Hide Global Loader
      const loader = document.getElementById('globalLoader');
      if (loader) loader.style.display = 'none';

      // 11. Activate Lucide Icons
      if (window.lucide) {
        window.lucide.createIcons();
      }

      console.log('E-Commerce Tech Layoffs Executive Dashboard successfully booted with micro-architecture.');
    } catch (err) {
      console.error('Fatal initialization error:', err);
      const loader = document.getElementById('globalLoader');
      if (loader) {
        loader.innerHTML = `
          <div class="p-6 rounded-xl border border-terracotta bg-white text-center">
            <p class="font-bold text-terracotta mb-1">Gagal memuat dashboard analitik</p>
            <p class="text-xs text-wood-soft">${err.message}</p>
          </div>
        `;
      }
    }
  }

  handleSectionChange(sectionId) {
    // Resize active charts to avoid rendering artifacts
    Object.values(this.charts).forEach(c => {
      if (c && typeof c.resize === 'function') {
        c.resize();
      }
    });
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
  app.start();
});

