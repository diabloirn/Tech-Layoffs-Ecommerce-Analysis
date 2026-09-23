/* ==========================================================================
   theme.js - Central Theme Tokens & Chart Defaults
   Warm Organic Light Palette: Broken White, Wood, Sage, Cloud Blue, Warm Yellow, Terracotta
   ========================================================================== */

export const THEME = {
  brokenWhite: '#F9F7F2',
  surface: '#FFFFFF',
  
  wood: {
    deep: '#2C221E',
    warm: '#4A3B32',
    soft: '#7D6B5D',
    border: '#E6DED6',
    borderSubtle: '#EEE7DF',
    tint: '#F5EFE8'
  },
  
  sage: {
    primary: '#5B7057',
    dark: '#435440',
    tint: '#E9EFE7',
    border: '#C9D8C5'
  },
  
  cloudBlue: {
    primary: '#4B739B',
    dark: '#375778',
    tint: '#EBF2F7',
    border: '#C5D9E8'
  },
  
  warmYellow: {
    primary: '#D9822B',
    dark: '#B3661A',
    tint: '#FEF7EB',
    border: '#FADBB3'
  },
  
  terracotta: {
    primary: '#C24E3F',
    dark: '#9E392C',
    tint: '#FDF1F0',
    border: '#F7D1CC'
  }
};

export function setupChartDefaults() {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
  Chart.defaults.color = THEME.wood.soft;
  Chart.defaults.borderColor = 'rgba(74, 59, 50, 0.08)';
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.boxHeight = 8;
  Chart.defaults.plugins.legend.labels.color = THEME.wood.warm;
}

export function getGlassTooltipConfig() {
  return {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderColor: THEME.wood.border,
    borderWidth: 1,
    titleColor: THEME.wood.deep,
    bodyColor: THEME.wood.warm,
    titleFont: { weight: '600', size: 13 },
    bodyFont: { size: 12 },
    padding: 10,
    boxPadding: 4,
    cornerRadius: 8,
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    shadowBlur: 12,
    shadowColor: 'rgba(74, 59, 50, 0.1)'
  };
}

