/* ==========================================================================
   aiParadoxChart.js - 4D Bubble Chart & Flat Regression Line
   ========================================================================== */

import { THEME, getGlassTooltipConfig } from '../../config/theme.js';
import { StatsService } from '../../services/statsService.js';

export function renderAIParadoxChart(canvasId, aiParadoxData) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || !aiParadoxData) return null;

  const bubblePoints = aiParadoxData.points.map(p => ({
    x: p.ai_adoption,
    y: p.layoff_pct,
    r: Math.max(3.5, Math.min(18, Math.sqrt(p.layoffs_count) / 9.5)),
    company: p.company,
    layoffs: p.layoffs_count,
    aiImpact: p.ai_impact
  }));

  const trendline = [
    { x: 1, y: aiParadoxData.intercept + aiParadoxData.slope * 1 },
    { x: 10, y: aiParadoxData.intercept + aiParadoxData.slope * 10 }
  ];

  return new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'Perusahaan E-Commerce',
          data: bubblePoints,
          backgroundColor: 'rgba(75, 115, 155, 0.4)',
          borderColor: THEME.cloudBlue.primary,
          borderWidth: 1.2,
          hoverBackgroundColor: 'rgba(75, 115, 155, 0.8)'
        },
        {
          label: `Garis Tren Regresi Statis (slope = ${aiParadoxData.slope})`,
          data: trendline,
          type: 'line',
          borderColor: THEME.terracotta.primary,
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
              if (context.raw.company) {
                return ` ${context.raw.company}: Adopsi AI ${context.raw.x}/10 ➔ PHK ${context.raw.y}% (${StatsService.formatNumber(context.raw.layoffs)} staf)`;
              }
              return ` Garis Regresi: Slope Statis ≈ 0 (Ketiadaan Hubungan Kausal)`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Tingkat Adopsi AI (AI Adoption Level 1–10)', color: THEME.wood.soft },
          grid: { color: 'rgba(74, 59, 50, 0.06)' },
          min: 1,
          max: 10
        },
        y: {
          title: { display: true, text: 'Persentase Karyawan di-PHK (%)', color: THEME.wood.soft },
          grid: { color: 'rgba(74, 59, 50, 0.06)' },
          min: 0,
          max: 30
        }
      }
    }
  });
}

