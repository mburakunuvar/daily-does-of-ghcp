/* ===============================
   Daily Dose of GHCP — script.js
   =============================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Highlight active sidebar link based on current page ──────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // ── Collapsible sidebar sections ─────────────────────────────────────────
  document.querySelectorAll('.section-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const section = toggle.closest('.sidebar-section');
      const isCollapsed = section.classList.toggle('is-collapsed');
      toggle.classList.toggle('is-collapsed', isCollapsed);
      toggle.setAttribute('aria-expanded', String(!isCollapsed));
    });

    toggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });

  // ── Category filter on main page ─────────────────────────────────────────
  const filterBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  if (filterBtns.length && cards.length) {
    const categoryParents = {
      'Beginners': ['Beginners', 'Copilot in IDE', 'Copilot in UI', 'Copilot CLI', 'Copilot SDK', 'Copilot coding agent'],
      'Copilot in UI': ['Copilot in UI', 'Copilot coding agent'],
    };

    const applyFilter = filter => {
      const matchCategories = categoryParents[filter] || [filter];
      filterBtns.forEach(b => b.classList.remove('filter-active'));
      document.querySelectorAll(`[data-filter="${filter}"]`).forEach(el => el.classList.add('filter-active'));

      cards.forEach(card => {
        const categories = (card.dataset.category || '')
          .split(',')
          .map(value => value.trim())
          .filter(Boolean);

        if (filter === 'all' || categories.some(cat => matchCategories.includes(cat))) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.25s ease';
        } else {
          card.style.display = 'none';
        }
      });
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        applyFilter(btn.dataset.filter);
      });
    });

    const initialFilter = new URLSearchParams(window.location.search).get('category');
    const hasMatchingFilter = initialFilter && Array.from(filterBtns).some(btn => btn.dataset.filter === initialFilter);
    applyFilter(hasMatchingFilter ? initialFilter : 'all');
  }

  // ── Mobile burger-menu toggle ─────────────────────────────────────────────
  const burgerBtn = document.getElementById('burgerBtn');
  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const sidebar = burgerBtn.closest('.sidebar');
      const isOpen = sidebar.classList.toggle('nav-open');
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ── Smooth scroll to top when navigating to a post page ──────────────────
  window.scrollTo({ top: 0, behavior: 'smooth' });

});
