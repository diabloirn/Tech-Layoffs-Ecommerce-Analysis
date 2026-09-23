/* ==========================================================================
   kpiComponent.js - 6 KPI Scorecard Widgets
   ========================================================================== */

import { StatsService } from '../services/statsService.js';

export class KpiComponent {
  constructor(kpis) {
    this.kpis = kpis;
  }

  render() {
    if (!this.kpis) return;

    this.setText('kpiTotalLayoffs', StatsService.formatNumber(this.kpis.total_layoffs));
    this.setText('kpiAvgLayoffPct', `${this.kpis.avg_layoff_percentage}%`);
    this.setText('kpiAvgAIAdoption', `${this.kpis.avg_ai_adoption} / 10`);
    this.setText('kpiAvgJobSecurity', `${this.kpis.avg_job_security} / 10`);
    this.setText('kpiAvgSentiment', `${this.kpis.avg_employee_sentiment} / 10`);
    this.setText('kpiAvgStockGrowth', StatsService.formatPercent(this.kpis.avg_stock_growth));
  }

  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
}

