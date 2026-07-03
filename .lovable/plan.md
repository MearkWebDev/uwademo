
# Rewrite to React + Vite + HashRouter for GitHub Pages

Convert the current TanStack Start app into a static client-side SPA using React 19 + Vite + `react-router-dom` v6 with `HashRouter`. All page content, styles, data, and imagery are preserved — only the framework shell and routing change.

## What changes

### Framework
- Remove TanStack Start, TanStack Router, Nitro, SSR entry, server functions, and the Lovable Vite Start config.
- Replace with a standard Vite React SPA: `vite`, `@vitejs/plugin-react`, `react`, `react-dom`, `react-router-dom`.
- New `vite.config.ts` with `base: './'` (relative asset paths — works on any GitHub Pages subpath and on `username.github.io/repo/`).
- New `index.html` at project root with `<div id="root">` and `<script type="module" src="/src/main.jsx">`.

### Entry & routing
- New `src/main.jsx` — ReactDOM root, wraps `<App />` in `<HashRouter>` and `<QueryClientProvider>`.
- New `src/App.jsx` — declares `<Routes>` with lazy-loaded pages, `<Suspense>` fallback, shared `<SiteHeader />` / `<SiteFooter />`, and a scroll-to-top-on-route-change helper.
- URLs use hash routing: `/#/`, `/#/study`, `/#/study/computer-science`, `/#/campuses`, `/#/campuses/mumbai`, `/#/about`, `/#/careers`, `/#/collaborate`, `/#/news`, `/#/contact`.

### Pages (moved from `src/routes/*` → `src/pages/*`)
Each existing route file is rewritten as a plain React component:
- `pages/Home.jsx`
- `pages/Study.jsx` (course explorer)
- `pages/CourseDetail.jsx` (uses `useParams()` for `courseId`)
- `pages/Campuses.jsx`
- `pages/CampusDetail.jsx` (uses `useParams()` for `campus`)
- `pages/About.jsx`, `Careers.jsx`, `Collaborate.jsx`, `News.jsx`, `Contact.jsx`
- `pages/NotFound.jsx`

All existing JSX, copy, imagery, animations, sticky sidebars, mega-menus, journey roadmap, salary indicators, etc. carry over unchanged.

### Navigation
- Replace every `import { Link } from "@tanstack/react-router"` with `Link` / `NavLink` from `react-router-dom`.
- Replace `to="/study/$courseId" params={{ courseId }}` with `to={`/study/${courseId}`}`.
- Site header mega-menus keep the same visual design; only link primitives change.

### Head metadata
- Add `react-helmet-async` and wrap the app in `<HelmetProvider>`.
- Each page sets its own `<Helmet>` with `<title>`, `<meta name="description">`, and OG/Twitter tags — matches the current per-route SEO.
- `index.html` carries default title, description, favicon, viewport, and the Google Fonts `<link>` (DM Serif Display + Fira Sans).

### Styles & assets
- `src/styles.css` → `src/styles/styles.css` (Oxford Navy & Gold theme kept verbatim, Tailwind v4 `@import "tailwindcss"` retained).
- All images already under `src/assets/*` continue to be imported as ES modules (Vite fingerprints and rewrites them with the relative `base`).
- No absolute `/foo.png` references anywhere.

### Removed
- `src/routes/`, `src/routeTree.gen.ts`, `src/router.tsx`, `src/server.ts`, `src/start.ts`
- Any `*.functions.ts` / `*.server.ts` (there are none in current app logic; only presentational code — safe).
- `@lovable.dev/vite-tanstack-config` and TanStack packages from `package.json`.

### Project structure after rewrite
```text
/
├── public/                  (favicon, robots.txt)
├── src/
│   ├── assets/              (images — unchanged)
│   ├── components/          (SiteHeader, SiteFooter, ui/*)
│   ├── layouts/             (SiteLayout wrapping header/outlet/footer)
│   ├── pages/               (all routes as components)
│   ├── sections/            (home editorial sections split out)
│   ├── hooks/               (use-scroll, use-mobile)
│   ├── utils/               (cn, formatters)
│   ├── data/                (courses.ts, course-meta.ts, site.ts — unchanged)
│   ├── styles/styles.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

### package.json scripts
```text
"dev":     "vite"
"build":   "vite build"
"preview": "vite preview"
"deploy":  "gh-pages -d dist"   (optional convenience)
```
`npm install && npm run build` produces a `dist/` folder that drops onto GitHub Pages with zero manual fixes. HashRouter guarantees refresh + deep links work without a 404 fallback.

### README.md
Short deployment guide: enable GitHub Pages on the `gh-pages` branch (or `/dist` on `main`), run `npm run build`, push `dist/`. Notes the hash URLs.

## Trade-offs the user should know

- **No SSR / no per-request head injection.** Social crawlers that don't execute JS won't see per-page OG tags (they'll fall back to the `index.html` defaults). HashRouter URLs (`/#/study`) also aren't ideal for SEO — search engines only index the base URL. This is the standard cost of GitHub Pages hosting.
- **Loses Lovable's managed publishing conveniences** (custom domain flow, previews) — that's inherent to hosting on GitHub Pages instead.
- **Large rewrite.** Every route file is rewritten. Visual design, copy, and interactions are preserved 1:1.

## Verification

- `bun run build` completes cleanly.
- `bun run preview` served locally — spot-check `/#/`, `/#/study`, `/#/study/computer-science`, `/#/campuses/mumbai`, refresh each, and confirm images/fonts load.
- Playwright smoke test on the preview server: hit each top-level route via hash, take screenshots, confirm no console errors.

Approve and I'll execute the rewrite in one pass.
