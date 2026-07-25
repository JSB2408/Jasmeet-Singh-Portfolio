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

  // 5. Hero Dynamic Counter Animation (0 -> 4+)
  initStatCounter();

  // 6. Interactive Hero Matrix Grid Parallax
  initGridParallax();

  // 7. Radial Spotlight Beam Effect
  initSpotlightBeam();

  // 8. Word-by-Word Rise Title Animation
  initWordRiseAnimation();
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

/**
 * Dynamic Number Counter for Hero Stat Cards (0 -> 4+)
 */
function initStatCounter() {
  const statNum = document.querySelector('.hero-stat-card .stat-number');
  if (!statNum) return;

  const targetText = statNum.textContent.trim(); // e.g. "4+"
  const targetVal = parseInt(targetText, 10);
  if (isNaN(targetVal)) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let current = 0;
  const duration = 1000;
  const stepTime = Math.max(Math.floor(duration / targetVal), 100);

  const timer = setInterval(() => {
    current += 1;
    statNum.textContent = current + '+';
    if (current >= targetVal) {
      clearInterval(timer);
      statNum.textContent = targetText;
    }
  }, stepTime);
}

/**
 * Interactive Hero Grid Parallax Effect on Mouse Movement
 */
function initGridParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const offsetX = Math.round(x * 14);
    const offsetY = Math.round(y * 14);

    document.body.style.backgroundPosition = `calc(50% + ${offsetX}px) ${offsetY}px`;
  });

  hero.addEventListener('mouseleave', () => {
    document.body.style.backgroundPosition = 'center top';
  });
}

/**
 * Interactive Radial Spotlight Beam Tracking Mouse Movement
 */
function initSpotlightBeam() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    hero.style.setProperty('--spotlight-x', `${x.toFixed(1)}%`);
    hero.style.setProperty('--spotlight-y', `${y.toFixed(1)}%`);
  });
}

/**
 * Word-by-Word Smooth Rise Animation for Hero Title
 */
function initWordRiseAnimation() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const childNodes = Array.from(heroTitle.childNodes);
  heroTitle.innerHTML = '';
  let wordIndex = 0;

  childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.trim().split(/\s+/);
      words.forEach(wordStr => {
        if (!wordStr) return;
        const wrap = document.createElement('span');
        wrap.className = 'word-wrap';
        const inner = document.createElement('span');
        inner.className = 'word';
        inner.textContent = wordStr;
        inner.style.setProperty('--word-delay', `${wordIndex * 60}ms`);
        wrap.appendChild(inner);
        heroTitle.appendChild(wrap);
        wordIndex++;
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const wrap = document.createElement('span');
      wrap.className = 'word-wrap';
      const cloned = node.cloneNode(true);
      cloned.classList.add('word');
      cloned.style.setProperty('--word-delay', `${wordIndex * 60}ms`);
      wrap.appendChild(cloned);
      heroTitle.appendChild(wrap);
      wordIndex++;
    }
  });
}
