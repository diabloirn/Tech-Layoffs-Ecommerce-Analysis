/* ==========================================================================
   headerComponent.js - Modular Header & Navigation Controller
   ========================================================================== */

export class HeaderComponent {
  constructor(onSectionChange) {
    this.onSectionChange = onSectionChange;
    this.activeSection = 'section-overview';
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    const navButtons = document.querySelectorAll('.nav-tab-pill');
    const sections = document.querySelectorAll('.dashboard-section');

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        if (targetId === this.activeSection) return;

        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        sections.forEach(sec => {
          if (sec.id === targetId) {
            sec.classList.remove('hidden');
          } else {
            sec.classList.add('hidden');
          }
        });

        this.activeSection = targetId;
        if (this.onSectionChange) {
          this.onSectionChange(targetId);
        }

        window.dispatchEvent(new Event('resize'));
        if (window.lucide) window.lucide.createIcons();
      });
    });
  }
}

