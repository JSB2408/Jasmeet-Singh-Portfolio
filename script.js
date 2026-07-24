/**
 * Jasmeet Singh Bhatia — Power BI Developer Portfolio
 * Interactivity, Scroll Triggers, and Chart Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Update Footer Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Inject SVG Linear Gradient for Sales Line Chart Area
  injectSvgGradients();

  // 3. Scroll Reveal Observer for Sections & Cards
  initScrollObservers();

  // 4. Bar Chart Target Height Initialization
  initBarChartVisuals();
});

/**
 * Dynamically inject SVG defs for area gradient fills
 */
function injectSvgGradients() {
  const lineSvg = document.querySelector('.line-chart-visual .widget-svg');
  if (lineSvg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="amberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#e3a548" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#e3a548" stop-opacity="0.0"/>
      </linearGradient>
    `;
    lineSvg.insertBefore(defs, lineSvg.firstChild);
  }
}

/**
 * Initialize IntersectionObserver for scroll-triggered animations
 */
function initScrollObservers() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Generic reveal elements
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger');

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.project-card').forEach(card => card.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Trigger once only per requirement
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Project Cards Specific Visual Observer
  const projectCards = document.querySelectorAll('.project-card');
  const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  projectCards.forEach(card => projectObserver.observe(card));
}

/**
 * Read data-height attribute on bar charts and set as CSS custom property
 */
function initBarChartVisuals() {
  const barFills = document.querySelectorAll('.bar-fill');
  barFills.forEach(fill => {
    const target = fill.getAttribute('data-height') || '75%';
    fill.style.setProperty('--target-height', target);
  });
}
