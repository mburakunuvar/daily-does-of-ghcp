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

  // ── Category filter on main page ─────────────────────────────────────────
  const filterBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  if (filterBtns.length && cards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Toggle active state on buttons
        filterBtns.forEach(b => b.classList.remove('filter-active'));
        btn.classList.add('filter-active');

        // Show / hide cards
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.25s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Smooth scroll to top when navigating to a post page ──────────────────
  window.scrollTo({ top: 0, behavior: 'smooth' });

});
