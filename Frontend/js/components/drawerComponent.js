/* ==========================================================================
   drawerComponent.js - Slide-out Glass Detail Drawer
   ========================================================================== */

import { StatsService } from '../services/statsService.js';

export class DrawerComponent {
  constructor(backdropId, bodyId, closeBtnId) {
    this.backdrop = document.getElementById(backdropId);
    this.body = document.getElementById(bodyId);
    this.closeBtn = document.getElementById(closeBtnId);
    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        if (e.target === this.backdrop) this.close();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open(record) {
    if (!this.backdrop || !this.body || !record) return;

    const stockColor = record.stock_growth >= 0 ? 'text-sage' : 'text-terracotta';
    const revColor = record.revenue_growth >= 0 ? 'text-sage' : 'text-terracotta';

    this.body.innerHTML = `
      <div class="space-y-6">
        <!-- Header Info -->
        <div class="border-b border-wood-border pb-4">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold tracking-tight text-wood-deep">${record.company}</h3>
            <span class="badge-clean badge-yellow">${record.market}</span>
          </div>
          <p class="text-xs text-wood-soft mt-1">ID: ${record.id} • ${record.country} • Skala: ${record.size} • Periode: ${record.month} ${record.year}</p>
        </div>

        <!-- Highlight Grid -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl bg-wood-tint border border-wood-border">
            <span class="text-xs text-wood-soft block mb-1">Total Karyawan di-PHK</span>
            <span class="text-xl font-bold text-terracotta font-mono-numbers">${StatsService.formatNumber(record.layoffs)}</span>
            <span class="text-xs text-wood-soft block">(${record.layoff_pct}% Tenaga Kerja)</span>
          </div>
          <div class="p-3.5 rounded-xl bg-wood-tint border border-wood-border">
            <span class="text-xs text-wood-soft block mb-1">Pertumbuhan Saham</span>
            <span class="text-xl font-bold ${stockColor} font-mono-numbers">${record.stock_growth >= 0 ? '+' : ''}${record.stock_growth}%</span>
            <span class="text-xs text-wood-soft block">Reaksi Pasar Modal</span>
          </div>
        </div>

        <!-- AI & Otomasi -->
        <div class="p-4 rounded-xl border border-wood-border bg-white space-y-3">
          <h4 class="font-bold text-xs uppercase tracking-wider text-cloud-blue">Dinamika AI & Otomatisasi</h4>
          <div class="flex items-center justify-between text-xs">
            <span class="text-wood-warm">Tingkat Adopsi AI:</span>
            <span class="font-bold text-cloud-blue font-mono-numbers text-sm">${record.ai_adoption} / 10</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-wood-warm">Skor Keamanan Kerja:</span>
            <span class="font-bold ${record.security < 5 ? 'text-terracotta' : 'text-yellow-warm'} font-mono-numbers text-sm">${record.security} / 10</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-wood-warm">Sentimen Karyawan:</span>
            <span class="font-bold font-mono-numbers text-sm text-wood-deep">${record.sentiment} / 10</span>
          </div>
        </div>

        <!-- Retorika vs Rekrutmen -->
        <div class="p-4 rounded-xl border border-wood-border bg-white space-y-3">
          <h4 class="font-bold text-xs uppercase tracking-wider text-yellow-warm">Retorika Publik vs Realitas Rekrutmen</h4>
          <div>
            <span class="text-[11px] text-wood-soft block">Alasan Resmi yang Diumumkan:</span>
            <span class="badge-clean badge-terracotta mt-1 text-xs">${record.reason}</span>
          </div>
          <div class="mt-2">
            <span class="text-[11px] text-wood-soft block">Posisi yang Direkrut Masif:</span>
            <span class="badge-clean badge-cloud mt-1 text-xs">${record.top_role}</span>
          </div>
          <div class="mt-2">
            <span class="text-[11px] text-wood-soft block">Tren Rekrutmen:</span>
            <span class="font-semibold text-xs text-wood-deep">${record.hiring_trend} (Remote: ${record.remote_pct}%)</span>
          </div>
        </div>

        <!-- Keuangan & Gaji -->
        <div class="p-4 rounded-xl border border-wood-border bg-white space-y-2">
          <h4 class="font-bold text-xs uppercase tracking-wider text-wood-soft">Kondisi Finansial & Anggaran</h4>
          <div class="flex justify-between text-xs">
            <span class="text-wood-warm">Pertumbuhan Pendapatan:</span>
            <span class="font-bold ${revColor} font-mono-numbers">${record.revenue_growth >= 0 ? '+' : ''}${record.revenue_growth}%</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-wood-warm">Perubahan Anggaran Gaji:</span>
            <span class="font-bold text-wood-deep font-mono-numbers">${record.budget_change >= 0 ? '+' : ''}${record.budget_change}%</span>
          </div>
        </div>
      </div>
    `;

    this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.backdrop) {
      this.backdrop.classList.remove('active');
    }
    document.body.style.overflow = '';
  }
}

