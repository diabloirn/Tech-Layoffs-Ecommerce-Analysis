/* ==========================================================================
   dataService.js - Data Access & Query Microservice
   Handles dataset fetching, indexing, querying, filtering, and caching
   ========================================================================== */

class DataService {
  constructor() {
    this.data = null;
    this.isLoaded = false;
  }

  async load() {
    if (this.isLoaded) return this.data;
    const response = await fetch('./data/analytics_data.json');
    if (!response.ok) {
      throw new Error(`Gagal memuat data analitik: HTTP ${response.status}`);
    }
    this.data = await response.json();
    this.isLoaded = true;
    return this.data;
  }

  getKpis() {
    return this.data?.kpis || null;
  }

  getYearlyTrends() {
    return this.data?.yearly_trends || null;
  }

  getStatisticalValidation() {
    return this.data?.statistical_validation || [];
  }

  getCrosstabHypocrisy() {
    return this.data?.crosstab_hypocrisy || null;
  }

  getGreedPremium() {
    return this.data?.greed_premium || null;
  }

  getHumanCost() {
    return this.data?.human_cost || null;
  }

  getAIParadox() {
    return this.data?.ai_paradox || null;
  }

  getBudgetIllusion() {
    return this.data?.budget_illusion || null;
  }

  getAllRecords() {
    return this.data?.records || [];
  }

  getRecordById(id) {
    return this.data?.records?.find(r => r.id === id) || null;
  }

  filterRecords({ search = '', year = 'All', reason = 'All', sortCol = 'layoffs', sortAsc = false }) {
    const records = this.getAllRecords();
    const query = search.toLowerCase().trim();

    const filtered = records.filter(r => {
      const matchYear = year === 'All' || r.year.toString() === year;
      const matchReason = reason === 'All' || r.reason === reason;
      const matchSearch = !query || 
        r.company.toLowerCase().includes(query) ||
        r.country.toLowerCase().includes(query) ||
        r.top_role.toLowerCase().includes(query) ||
        r.reason.toLowerCase().includes(query);

      return matchYear && matchReason && matchSearch;
    });

    filtered.sort((a, b) => {
      let valA = a[sortCol];
      let valB = b[sortCol];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return filtered;
  }
}

export const dataService = new DataService();

