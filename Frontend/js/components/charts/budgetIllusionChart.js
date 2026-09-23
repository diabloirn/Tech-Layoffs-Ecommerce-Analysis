/* ==========================================================================
   budgetIllusionChart.js - Salary Budget vs Sentiment Cluster Plot
   ========================================================================== */

import { THEME, getGlassTooltipConfig } from '../../config/theme.js';

export function renderBudgetIllusionChart(canvasId, budgetIllusionData) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || !budgetIllusionData) return null;

  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Klaster PHK Ekstrem (High Layoff)',
          data: budgetIllusionData.high_group.map(p => ({ x: p.budget_change, y: p.sentiment })),
          backgroundColor: 'rgba(194, 78, 63, 0.65)',
          borderColor: THEME.terracotta.primary,
          borderWidth: 1,
          pointRadius: 4.5,
          pointHoverRadius: 7
        },
        {
          label: 'Klaster PHK Rendah (Low Layoff)',
          data: budgetIllusionData.low_group.map(p => ({ x: p.budget_change, y: p.sentiment })),
          backgroundColor: 'rgba(91, 112, 87, 0.6)',
          borderColor: THEME.sage.primary,
          borderWidth: 1,
          pointRadius: 4.5,
          pointHoverRadius: 7
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          ...getGlassTooltipConfig(),
          callbacks: {
            label(context) {
              return ` Anggaran: ${context.parsed.x}% | Sentimen: ${context.parsed.y}/10`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Perubahan Anggaran Gaji (%)', color: THEME.wood.soft },
          grid: { color: 'rgba(74, 59, 50, 0.06)' },
          ticks: { callback: v => `${v}%` }
        },
        y: {
          title: { display: true, text: 'Skor Sentimen Karyawan (1–10)', color: THEME.wood.soft },
          grid: { color: 'rgba(74, 59, 50, 0.06)' },
          min: 1,
          max: 10
        }
      }
    }
  });
}

