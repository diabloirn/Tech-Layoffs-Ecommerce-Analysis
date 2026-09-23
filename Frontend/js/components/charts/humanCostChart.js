/* ==========================================================================
   humanCostChart.js - Linear Regression Scatter Plot (r = -0.758)
   ========================================================================== */

import { THEME, getGlassTooltipConfig } from '../../config/theme.js';

export function renderHumanCostChart(canvasId, humanCostData) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || !humanCostData) return null;

  const minX = 0;
  const maxX = 30;
  const trendline = [
    { x: minX, y: humanCostData.intercept + humanCostData.slope * minX },
    { x: maxX, y: Math.max(0, humanCostData.intercept + humanCostData.slope * maxX) }
  ];

  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Data Perusahaan',
          data: humanCostData.points,
          backgroundColor: 'rgba(194, 78, 63, 0.45)',
          borderColor: THEME.terracotta.primary,
          borderWidth: 1,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: `Garis Regresi Linear (r = ${humanCostData.r})`,
          data: trendline,
          type: 'line',
          borderColor: THEME.wood.deep,
          borderWidth: 2.8,
          borderDash: [6, 4],
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          ...getGlassTooltipConfig(),
          callbacks: {
            label(context) {
              return ` PHK: ${context.parsed.x}% | Skor Keamanan Kerja: ${context.parsed.y}/10`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Faktor: Persentase PHK (%)', color: THEME.wood.soft },
          grid: { color: 'rgba(74, 59, 50, 0.06)' },
          min: 0,
          max: 30
        },
        y: {
          title: { display: true, text: 'Realisasi: Skor Keamanan Kerja (1–10)', color: THEME.wood.soft },
          grid: { color: 'rgba(74, 59, 50, 0.06)' },
          min: 1,
          max: 10
        }
      }
    }
  });
}

