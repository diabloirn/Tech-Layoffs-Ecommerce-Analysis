/* ==========================================================================
   univariateChart.js - Baseline Distributions (Layoff % & AI Adoption)
   ========================================================================== */

import { THEME, getGlassTooltipConfig } from '../../config/theme.js';

export function renderUnivariateCharts(records) {
  if (!records || !records.length) return {};

  // 1. Layoff % Histogram
  const ctx1 = document.getElementById('layoffDistChart');
  let layoffChart = null;
  if (ctx1) {
    const bins = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 25];
    const counts = new Array(bins.length - 1).fill(0);
    records.forEach(r => {
      for (let i = 0; i < bins.length - 1; i++) {
        if (r.layoff_pct >= bins[i] && r.layoff_pct < bins[i + 1]) {
          counts[i]++;
          break;
        }
      }
    });

    layoffChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: bins.slice(0, -1).map((b, i) => `${b}-${bins[i + 1]}%`),
        datasets: [{
          label: 'Jumlah Perusahaan',
          data: counts,
          backgroundColor: THEME.terracotta.tint,
          borderColor: THEME.terracotta.primary,
          borderWidth: 1.5,
          borderRadius: 6
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: getGlassTooltipConfig()
        },
        scales: {
          x: { 
            title: { display: true, text: 'Persentase PHK (%)', color: THEME.wood.soft },
            grid: { display: false }
          },
          y: { 
            title: { display: true, text: 'Frekuensi Perusahaan', color: THEME.wood.soft },
            grid: { color: 'rgba(74, 59, 50, 0.06)' }
          }
        }
      }
    });
  }

  // 2. AI Adoption Histogram
  const ctx2 = document.getElementById('aiDistChart');
  let aiChart = null;
  if (ctx2) {
    const aiLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const aiCounts = new Array(10).fill(0);
    records.forEach(r => {
      const idx = Math.min(Math.max(Math.floor(r.ai_adoption) - 1, 0), 9);
      aiCounts[idx]++;
    });

    aiChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: aiLevels.map(l => `Skor ${l}`),
        datasets: [{
          label: 'Jumlah Perusahaan',
          data: aiCounts,
          backgroundColor: THEME.cloudBlue.tint,
          borderColor: THEME.cloudBlue.primary,
          borderWidth: 1.5,
          borderRadius: 6
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: getGlassTooltipConfig()
        },
        scales: {
          x: { 
            title: { display: true, text: 'Tingkat Adopsi AI (1-10)', color: THEME.wood.soft },
            grid: { display: false }
          },
          y: { 
            title: { display: true, text: 'Frekuensi Perusahaan', color: THEME.wood.soft },
            grid: { color: 'rgba(74, 59, 50, 0.06)' }
          }
        }
      }
    });
  }

  return { layoffChart, aiChart };
}

