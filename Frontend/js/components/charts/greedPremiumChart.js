/* ==========================================================================
   greedPremiumChart.js - Greed Premium vs Panic Penalty Grouped Bar Chart
   ========================================================================== */

import { THEME, getGlassTooltipConfig } from '../../config/theme.js';

export function renderGreedPremiumChart(canvasId, greedPremiumData) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || !greedPremiumData) return null;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: greedPremiumData.categories,
      datasets: [
        {
          label: 'PHK Rendah (Low Intensity)',
          data: greedPremiumData.low_layoff,
          backgroundColor: THEME.wood.warm,
          borderRadius: 8
        },
        {
          label: 'PHK Ekstrem (High Intensity)',
          data: greedPremiumData.high_layoff,
          backgroundColor: THEME.terracotta.primary,
          borderRadius: 8
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          ...getGlassTooltipConfig(),
          callbacks: {
            label(context) {
              return ` ${context.dataset.label}: +${context.raw}% Respon Saham`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Status Fundamental Pendapatan Perusahaan', color: THEME.wood.soft },
          grid: { display: false }
        },
        y: {
          title: { display: true, text: 'Rata-rata Pertumbuhan Saham (%)', color: THEME.wood.soft },
          grid: { color: 'rgba(74, 59, 50, 0.06)' },
          ticks: { callback: v => `+${v}%` }
        }
      }
    }
  });
}

