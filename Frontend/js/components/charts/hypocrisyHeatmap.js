/* ==========================================================================
   hypocrisyHeatmap.js - Interactive Crosstab Heatmap Matrix
   ========================================================================== */

import { THEME } from '../../config/theme.js';

export function renderHypocrisyHeatmap(containerId, crosstabData) {
  const container = document.getElementById(containerId);
  if (!container || !crosstabData) return;

  const matrix = crosstabData.matrix;
  const reasons = crosstabData.reasons;
  const roles = crosstabData.roles;

  let maxVal = 0;
  let minVal = Infinity;
  matrix.forEach(row => {
    row.forEach(val => {
      if (val > maxVal) maxVal = val;
      if (val < minVal) minVal = val;
    });
  });

  let html = `
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="p-3 text-left font-semibold text-xs text-wood-soft uppercase tracking-wider border-b border-wood-border">
              Alasan Resmi (Retorika Publik)
            </th>
            ${roles.map(r => `
              <th class="p-3 text-center font-semibold text-xs text-wood-soft uppercase tracking-wider border-b border-wood-border">
                ${r}
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
  `;

  reasons.forEach((reason, rIdx) => {
    const reasonPillColor = reason === 'Restructuring' ? 'bg-terracotta' : reason === 'Cost Cutting' ? 'bg-yellow-warm' : 'bg-cloud-blue';

    html += `
      <tr>
        <td class="p-3 font-semibold text-sm border-b border-wood-border-subtle whitespace-nowrap text-wood-deep">
          <span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background-color: ${reason === 'Restructuring' ? THEME.terracotta.primary : reason === 'Cost Cutting' ? THEME.warmYellow.primary : THEME.cloudBlue.primary}"></span>
          ${reason}
        </td>
    `;

    matrix[rIdx].forEach((val, cIdx) => {
      const ratio = (val - minVal) / (maxVal - minVal);
      const isHotspot = val >= 54;

      let bgColor = '';
      let textColor = '';
      let borderColor = '';

      if (isHotspot) {
        bgColor = `rgba(194, 78, 63, ${0.35 + ratio * 0.55})`;
        textColor = '#ffffff';
        borderColor = THEME.terracotta.primary;
      } else {
        bgColor = `rgba(235, 242, 247, ${0.4 + ratio * 0.6})`;
        textColor = THEME.wood.deep;
        borderColor = THEME.wood.borderSubtle;
      }

      html += `
        <td class="p-2 border-b border-wood-border-subtle text-center">
          <div class="heatmap-cell" 
               style="background-color: ${bgColor}; color: ${textColor}; border: 1px solid ${borderColor};"
               title="${reason} ➔ Rekrut ${roles[cIdx]}: ${val} Perusahaan">
            <span class="font-bold">${val}</span>
            ${isHotspot ? '<span class="text-[10px] uppercase font-bold tracking-tight opacity-95 mt-0.5">Hotspot</span>' : ''}
          </div>
        </td>
      `;
    });
    html += `</tr>`;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
}

