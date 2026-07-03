# UWA India — Website

Premium multi-page website for The University of Western Australia India, built as a client-side SPA with **React 19 + Vite 6 + React Router v6 (HashRouter)** and Tailwind CSS v4.

## Quick start

```bash
npm install
npm run dev       # local dev server on http://localhost:8080
npm run build     # emits dist/
npm run preview   # serve the built dist/ locally
```

## Deploy to GitHub Pages

The site uses `HashRouter` and `base: "./"` in `vite.config.ts`, so the built `dist/` folder works from **any** GitHub Pages URL — `username.github.io/<repo>/`, a project subpath, or a custom domain — with **no additional configuration**.

### Option 1 — `gh-pages` branch (recommended)

```bash
npm run build
npx gh-pages -d dist
```

Then in your GitHub repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `gh-pages` / `(root)`**.

### Option 2 — GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: '${{ steps.deployment.outputs.page_url }}' }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Routes are served as hash URLs (`/#/study`, `/#/study/computer-science`, `/#/campuses/mumbai`, …), so **refreshing any page works** — GitHub Pages never needs a SPA fallback.

## Project structure

```
/
├── public/               # static files served as-is (favicon, robots.txt)
├── src/
│   ├── assets/           # images (imported as ES modules; Vite fingerprints them)
│   ├── components/       # SiteHeader / SiteFooter + shadcn/ui primitives
│   ├── data/             # courses.ts, course-meta.ts, site.ts
│   ├── hooks/            # useCountUp, useReveal, usePageMeta, useIsMobile
│   ├── lib/              # cn() utility
│   ├── pages/            # one component per route (lazy-loaded in App.tsx)
│   ├── styles.css        # Tailwind v4 + Oxford Navy & Gold theme
│   ├── App.tsx           # <Routes> + shared header/footer
│   └── main.tsx          # ReactDOM root + <HashRouter>
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Tech notes

- **No SSR, no server functions, no backend.** Pure static SPA.
- **All assets use relative paths** (`base: "./"`), so subpath hosting works.
- **Pages are code-split** via `React.lazy()` in `src/App.tsx`.
- **Per-page `<title>` / meta description** via the `usePageMeta` hook.
- **Fonts** (DM Serif Display + Fira Sans) load from Google Fonts via `<link>` in `index.html`.
