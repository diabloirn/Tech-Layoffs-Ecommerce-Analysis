/* ==========================================================================
   yearlyChart.js - Yearly Layoff Dynamics & Stock Reaction
   ========================================================================== */

import { THEME, getGlassTooltipConfig } from '../../config/theme.js';
import { StatsService } from '../../services/statsService.js';

export function renderYearlyChart(canvasId, yearlyTrends) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || !yearlyTrends) return null;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: yearlyTrends.years.map(y => `Tahun ${y}`),
      datasets: [
        {
          label: 'Total PHK (Karyawan)',
          data: yearlyTrends.total_layoffs,
          backgroundColor: THEME.terracotta.tint,
          borderColor: THEME.terracotta.primary,
          borderWidth: 1.5,
          borderRadius: 8,
          yAxisID: 'y'
        },
        {
          label: 'Pertumbuhan Saham (%)',
          data: yearlyTrends.avg_stock_growth,
          type: 'line',
          borderColor: THEME.sage.primary,
          backgroundColor: THEME.sage.primary,
          borderWidth: 3,
          tension: 0.35,
          pointRadius: 6,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: THEME.sage.primary,
          pointBorderWidth: 2.5,
          pointHoverRadius: 8,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      plugins: {
        tooltip: {
          ...getGlassTooltipConfig(),
          callbacks: {
            label(context) {
              if (context.datasetIndex === 0) {
                return ` Total PHK: ${StatsService.formatNumber(context.raw)} staf`;
              }
              return ` Respon Saham: +${context.raw}%`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          type: 'linear',
          position: 'left',
          grid: { color: 'rgba(74, 59, 50, 0.06)' },
          ticks: {
            callback: val => (val / 1000000).toFixed(1) + 'M'
          }
        },
        y1: {
          type: 'linear',
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            callback: val => `+${val}%`
          }
        }
      }
    }
  });
}

