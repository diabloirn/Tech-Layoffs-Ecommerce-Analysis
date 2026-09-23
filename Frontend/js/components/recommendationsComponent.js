/* ==========================================================================
   recommendationsComponent.js - 3 Transformation Pillars & ESG Strategy
   ========================================================================== */

export class RecommendationsComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-8">
        <div class="border-b border-wood-border pb-4">
          <div class="flex items-center gap-2">
            <span class="badge-clean badge-sage">Tahap 6: Actionable Strategy</span>
            <h2 class="text-2xl font-bold tracking-tight text-wood-deep">Rekomendasi Strategis: 3 Pilar Transformasi Manajemen</h2>
          </div>
          <p class="text-sm text-wood-soft mt-1 max-w-4xl">
            Menjawab kegagalan manajerial sistemik dengan kerangka kerja strategis yang menempatkan modal manusia sebagai aset esensial keberlanjutan bisnis jangka panjang.
          </p>
        </div>

        <!-- 3 Pillars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Pillar 1 -->
          <div class="glass-panel p-6 flex flex-col justify-between border-t-4 border-t-cloud-blue">
            <div>
              <div class="w-10 h-10 rounded-xl bg-cloud-blue-tint text-cloud-blue flex items-center justify-center mb-4">
                <i data-lucide="refresh-cw" class="w-5 h-5"></i>
              </div>
              <span class="text-xs font-bold text-cloud-blue uppercase tracking-wider block mb-1">Pilar 1</span>
              <h3 class="text-base font-bold text-wood-deep mb-3">Transisi dari "Firing" ke "Upskilling"</h3>
              <p class="text-xs text-wood-warm leading-relaxed">
                Hentikan ketergantungan pada PHK sebagai instrumen efisiensi semu. Lakukan investasi terarah pada <strong>Internal Mobility</strong>. Staf operasional yang ada harus dibekali kapabilitas kolaborasi dengan AI (<em>Human-in-the-loop</em>) daripada dipecat dan digantikan talenta baru berbiaya tinggi.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-wood-border text-xs text-wood-soft">
              <span class="font-semibold text-wood-deep">Target:</span> Mengeliminasi biaya perekrutan ulang dan mencegah hilangnya <em>domain knowledge</em>.
            </div>
          </div>

          <!-- Pillar 2 -->
          <div class="glass-panel p-6 flex flex-col justify-between border-t-4 border-t-yellow-warm">
            <div>
              <div class="w-10 h-10 rounded-xl bg-yellow-warm-tint text-yellow-warm flex items-center justify-center mb-4">
                <i data-lucide="file-text" class="w-5 h-5"></i>
              </div>
              <span class="text-xs font-bold text-yellow-warm uppercase tracking-wider block mb-1">Pilar 2</span>
              <h3 class="text-base font-bold text-wood-deep mb-3">Transparansi Anggaran (Budget Accountability)</h3>
              <p class="text-xs text-wood-warm leading-relaxed">
                Manajemen eksekutif wajib menghentikan retorika "krisis keuangan" jika data menunjukkan alokasi kompensasi dan rekrutmen tetap ekspansif. Komunikasi yang jujur mengenai roadmap transformasi teknologi jauh lebih melindungi sentimen karyawan daripada alasan restrukturisasi yang kabur.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-wood-border text-xs text-wood-soft">
              <span class="font-semibold text-wood-deep">Target:</span> Mencegah fenomena <em>quiet quitting</em> dan memulihkan rasa aman karyawan.
            </div>
          </div>

          <!-- Pillar 3 -->
          <div class="glass-panel p-6 flex flex-col justify-between border-t-4 border-t-sage">
            <div>
              <div class="w-10 h-10 rounded-xl bg-sage-tint text-sage flex items-center justify-center mb-4">
                <i data-lucide="leaf" class="w-5 h-5"></i>
              </div>
              <span class="text-xs font-bold text-sage uppercase tracking-wider block mb-1">Pilar 3</span>
              <h3 class="text-base font-bold text-wood-deep mb-3">ESG-Oriented Growth & Investor Education</h3>
              <p class="text-xs text-wood-warm leading-relaxed">
                Edukasi investor pasar modal untuk menilai perusahaan berdasarkan ketangguhan modal manusia (<em>Human Capital Resilience</em>) menghadapi disrupsi, bukan dari agresivitas memecat staf. Lonjakan saham sesaat akibat PHK massal adalah bentuk "kesuksesan beracun" yang merusak fondasi korporasi di masa depan.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-wood-border text-xs text-wood-soft">
              <span class="font-semibold text-wood-deep">Target:</span> Valuasi perusahaan yang stabil dan berkelanjutan tanpa kanibalisme talenta.
            </div>
          </div>
        </div>

        <!-- Manifesto Card -->
        <div class="glass-panel p-8 text-center max-w-4xl mx-auto space-y-4">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cloud-blue-tint text-cloud-blue mb-1">
            <i data-lucide="feather" class="w-6 h-6"></i>
          </div>
          <h3 class="text-xl font-bold tracking-tight text-wood-deep">Penutup: Data-Driven Humanity</h3>
          <blockquote class="text-sm text-wood-warm italic leading-relaxed max-w-2xl mx-auto">
            "Data tidak pernah berbohong, tapi narasi perusahaan bisa. Tugas kita bukan sekadar mengolah data untuk menghasilkan angka, melainkan untuk memperjuangkan masa depan kerja yang lebih berkeadilan dan manusiawi. Masa depan e-commerce bukan tentang siapa yang paling cepat memecat, tapi siapa yang paling cerdas mengintegrasikan teknologi tanpa menghancurkan kemanusiaan di dalamnya."
          </blockquote>
          <div class="text-xs text-wood-soft font-medium pt-2">
            Kesimpulan Riset Data Analytics Tech Layoffs (2024–2026)
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }
}

