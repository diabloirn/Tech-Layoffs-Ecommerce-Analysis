/* ==========================================================================
   statsService.js - Statistical & Analytical Calculation Helpers
   ========================================================================== */

export const StatsService = {
  formatNumber(val) {
    if (val === null || val === undefined) return '0';
    return Number(val).toLocaleString('id-ID');
  },

  formatPercent(val, withSign = true) {
    if (val === null || val === undefined) return '0%';
    const num = Number(val);
    const sign = withSign && num > 0 ? '+' : '';
    return `${sign}${num.toFixed(1)}%`;
  },

  formatScore(val) {
    if (val === null || val === undefined) return '0';
    return Number(val).toFixed(1);
  },

  getCorrelationBadge(r) {
    if (Math.abs(r) >= 0.7) {
      return { label: 'Korelasi Sangat Kuat', color: 'badge-terracotta' };
    } else if (Math.abs(r) >= 0.5) {
      return { label: 'Korelasi Kuat', color: 'badge-cloud' };
    } else if (Math.abs(r) >= 0.3) {
      return { label: 'Korelasi Sedang', color: 'badge-yellow' };
    } else {
      return { label: 'Korelasi Nihil / Lemah', color: 'badge-wood' };
    }
  }
};

