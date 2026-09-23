/* ==========================================================================
   tableComponent.js - Searchable, Sortable, Paginated Data Explorer
   ========================================================================== */

import { dataService } from '../services/dataService.js';
import { StatsService } from '../services/statsService.js';

export class TableComponent {
  constructor(onSelectRecord) {
    this.onSelectRecord = onSelectRecord;
    this.searchQuery = '';
    this.activeYear = 'All';
    this.activeReason = 'All';
    this.sortCol = 'layoffs';
    this.sortAsc = false;
    this.currentPage = 1;
    this.pageSize = 20;
    this.currentData = [];
  }

  init() {
    this.bindEvents();
    this.populateReasons();
    this.refresh();
  }

  bindEvents() {
    // Search
    const searchInput = document.getElementById('tableSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.currentPage = 1;
        this.refresh();
      });
    }

    // Reason
    const reasonSelect = document.getElementById('reasonFilterSelect');
    if (reasonSelect) {
      reasonSelect.addEventListener('change', (e) => {
        this.activeReason = e.target.value;
        this.currentPage = 1;
        this.refresh();
      });
    }

    // Year
    const yearBtns = document.querySelectorAll('.year-filter-btn');
    yearBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        yearBtns.forEach(b => b.classList.remove('active', 'bg-cloud-blue', 'text-white'));
        btn.classList.add('active', 'bg-cloud-blue', 'text-white');
        this.activeYear = btn.dataset.year;
        this.currentPage = 1;
        this.refresh();
      });
    });

    // Pagination
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.renderRows();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const maxPage = Math.ceil(this.currentData.length / this.pageSize);
        if (this.currentPage < maxPage) {
          this.currentPage++;
          this.renderRows();
        }
      });
    }

    // Sorting
    document.querySelectorAll('[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.dataset.sort;
        if (this.sortCol === col) {
          this.sortAsc = !this.sortAsc;
        } else {
          this.sortCol = col;
          this.sortAsc = false;
        }
        this.updateSortHeaders();
        this.refresh();
      });
    });
  }

  populateReasons() {
    const select = document.getElementById('reasonFilterSelect');
    if (!select) return;
    const all = dataService.getAllRecords();
    const reasons = Array.from(new Set(all.map(r => r.reason))).sort();

    let html = `<option value="All">Semua Alasan PHK (${all.length})</option>`;
    reasons.forEach(r => {
      const count = all.filter(item => item.reason === r).length;
      html += `<option value="${r}">${r} (${count})</option>`;
    });
    select.innerHTML = html;
  }

  refresh() {
    this.currentData = dataService.filterRecords({
      search: this.searchQuery,
      year: this.activeYear,
      reason: this.activeReason,
      sortCol: this.sortCol,
      sortAsc: this.sortAsc
    });

    const totalBadge = document.getElementById('tableTotalCount');
    if (totalBadge) {
      totalBadge.textContent = `${this.currentData.length.toLocaleString('id-ID')} Perusahaan`;
    }

    this.renderRows();
  }

  updateSortHeaders() {
    document.querySelectorAll('[data-sort]').forEach(th => {
      const col = th.dataset.sort;
      const indicator = th.querySelector('.sort-indicator');
      if (indicator) {
        if (this.sortCol === col) {
          indicator.textContent = this.sortAsc ? ' ↑' : ' ↓';
          indicator.classList.remove('opacity-30');
          indicator.classList.add('opacity-100', 'text-cloud-blue');
        } else {
          indicator.textContent = ' ↕';
          indicator.classList.remove('opacity-100', 'text-cloud-blue');
          indicator.classList.add('opacity-30');
        }
      }
    });
  }

  renderRows() {
    const tbody = document.getElementById('tableBody');
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (!tbody) return;

    if (this.currentData.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="p-8 text-center text-wood-soft">
            Tidak ditemukan data yang cocok dengan kriteria pencarian.
          </td>
        </tr>
      `;
      if (pageInfo) pageInfo.textContent = 'Halaman 0 dari 0';
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }

    const maxPage = Math.ceil(this.currentData.length / this.pageSize);
    if (this.currentPage > maxPage) this.currentPage = maxPage;

    const start = (this.currentPage - 1) * this.pageSize;
    const end = Math.min(start + this.pageSize, this.currentData.length);
    const slice = this.currentData.slice(start, end);

    let html = '';
    slice.forEach(r => {
      const stockColor = r.stock_growth >= 0 ? 'text-sage font-semibold' : 'text-terracotta font-semibold';
      const reasonBadge = r.reason === 'Restructuring' ? 'badge-terracotta' : r.reason === 'Cost Cutting' ? 'badge-yellow' : 'badge-wood';

      html += `
        <tr class="cursor-pointer hover:bg-wood-tint/60 transition-colors" data-id="${r.id}">
          <td class="p-3 font-semibold text-wood-deep">
            <div class="flex items-center gap-2">
              <span>${r.company}</span>
              <span class="text-[11px] px-1.5 py-0.5 rounded bg-wood-tint text-wood-soft">${r.country}</span>
            </div>
          </td>
          <td class="p-3 font-mono-numbers text-sm font-semibold">${StatsService.formatNumber(r.layoffs)}</td>
          <td class="p-3 font-mono-numbers text-sm">${r.layoff_pct}%</td>
          <td class="p-3">
            <span class="badge-clean ${reasonBadge}">${r.reason}</span>
          </td>
          <td class="p-3">
            <div class="flex items-center gap-2">
              <div class="w-16 bg-wood-border-subtle rounded-full h-2 overflow-hidden">
                <div class="bg-cloud-blue h-2 rounded-full" style="width: ${r.ai_adoption * 10}%"></div>
              </div>
              <span class="font-mono-numbers text-xs font-semibold text-wood-deep">${r.ai_adoption}/10</span>
            </div>
          </td>
          <td class="p-3 text-xs text-wood-warm">${r.top_role}</td>
          <td class="p-3 font-mono-numbers text-sm ${stockColor}">
            ${r.stock_growth >= 0 ? '+' : ''}${r.stock_growth}%
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    // Attach row click events
    tbody.querySelectorAll('tr[data-id]').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.id;
        const record = dataService.getRecordById(id);
        if (record && this.onSelectRecord) {
          this.onSelectRecord(record);
        }
      });
    });

    if (pageInfo) {
      pageInfo.textContent = `Menampilkan ${start + 1}–${end} dari ${this.currentData.length.toLocaleString('id-ID')}`;
    }

    if (prevBtn) prevBtn.disabled = this.currentPage <= 1;
    if (nextBtn) nextBtn.disabled = this.currentPage >= maxPage;
  }
}

