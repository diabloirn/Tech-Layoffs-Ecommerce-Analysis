/* ==========================================================================
   statsTableComponent.js - Empirical Statistical Validation Matrix
   ========================================================================== */

import { StatsService } from '../services/statsService.js';

export class StatsTableComponent {
  constructor(tbodyId, statsData) {
    this.tbody = document.getElementById(tbodyId);
    this.statsData = statsData || [];
  }

  render() {
    if (!this.tbody) return;

    let html = '';
    this.statsData.forEach(item => {
      const isSig = item.status === 'Signifikan';
      const statusBadge = isSig
        ? `<span class="badge-clean badge-sage">Signifikan (p &lt; 0.05)</span>`
        : `<span class="badge-clean badge-yellow">Tidak Signifikan</span>`;

      const rBadge = StatsService.getCorrelationBadge(item.r);
      const rColor = item.r < 0 ? 'text-terracotta' : item.r > 0.4 ? 'text-cloud-blue' : 'text-wood-warm';

      html += `
        <tr class="border-b border-wood-border-subtle hover:bg-wood-tint/50">
          <td class="p-4">
            <span class="font-bold text-wood-deep block text-sm">${item.hypothesis}</span>
            <div class="flex items-center gap-2 mt-1">
              <span class="badge-clean badge-wood text-[11px]">${item.tag}</span>
              <span class="badge-clean ${rBadge.color} text-[10px]">${rBadge.label}</span>
            </div>
          </td>
          <td class="p-4 font-mono-numbers font-bold ${rColor} text-base">${item.r > 0 ? '+' : ''}${item.r}</td>
          <td class="p-4 font-mono-numbers text-xs text-wood-soft">${item.p_value}</td>
          <td class="p-4">${statusBadge}</td>
          <td class="p-4 text-xs text-wood-warm leading-relaxed">${item.insight}</td>
        </tr>
      `;
    });

    this.tbody.innerHTML = html;
  }
}

