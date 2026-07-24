# Jasmeet Singh Bhatia — Power BI Developer Portfolio

A single-page, high-performance, dark data-dashboard-inspired portfolio website for Jasmeet Singh Bhatia, a freelance Power BI developer.

## Design Highlights

- **Aesthetic**: Charcoal ink canvas (`#11161a`) with custom graph-paper grid pattern, glassmorphism header, and subtle accent highlights.
- **Typography**: Google Fonts — `Space Grotesk` (Headings), `IBM Plex Sans` (Body), and `IBM Plex Mono` (Labels, stats, numbers).
- **Accents**:
  - **Amber (`#e3a548`)**: Sales & Revenue Intelligence
  - **Teal (`#5fb8a6`)**: Customer Retention & Churn Prediction
  - **Dusty Rose (`#c9707a`)**: Uber Operations & Logistics
  - **Soft Blue (`#7b9fd1`)**: Online Retail & Basket Velocity
- **Interactive Visuals**: Animated SVG sparklines in Hero, and scroll-triggered dashboard mini-charts (Bar, Line, Donut, Block) using `IntersectionObserver`.
- **Accessibility**: Support for `:focus-visible` keyboard states and `@media (prefers-reduced-motion: reduce)`.

---

## Direct Deployment to GitHub Pages

Since this portfolio is built with standalone semantic HTML5, CSS3, and vanilla JS, it requires **no build step or compiler**.

### Option A: GitHub Web Interface
1. Create a public repository named `jasmeet-portfolio` or `jasmeet-bhatia.github.io` on GitHub.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root (`main` branch).
3. Go to **Settings** > **Pages**.
4. Set **Source** to `Deploy from a branch`, select `main`, `/ (root)`, and click **Save**.
5. Your site will be live at `https://<your-username>.github.io/` within seconds!

### Option B: GitHub CLI / Git Terminal
```bash
git init
git add .
git commit -m "Initial portfolio release for Jasmeet Singh Bhatia"
git branch -M main
git remote add origin https://github.com/JSB2408/jasmeet-portfolio.git
git push -u origin main
```

---

## File Structure

```
jasmeet-portfolio/
├── index.html        # Main HTML5 document with structured sections
├── styles.css        # Dashboard CSS tokens, typography, grid layout, animations
├── script.js         # IntersectionObserver, SVG gradients, chart triggers
└── README.md         # Documentation & deployment guide
```
