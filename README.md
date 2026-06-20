# dsaenztagarro.github.io

Personal blog of David Sáenz, built with [Astro](https://astro.build) and deployed to
GitHub Pages via GitHub Actions.

## Develop

```bash
npm install      # Node 20+ (see .nvmrc — 24)
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the built site locally
```

## Structure

- `src/content/blog/` — posts (`.md` / `.mdx`), schema in `src/content.config.ts`
- `src/layouts/`, `src/components/` — page shell and UI
- `src/styles/global.css` — design tokens (CSS variables); the styling surface
- `src/consts.ts` — site title, description, social links
- `public/` — static assets served as-is (`favicon.svg`, `.nojekyll`)

## Deploy

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds with
`withastro/action` and publishes via `actions/deploy-pages`. The repository's
**Settings → Pages → Source** must be set to **GitHub Actions** (not a branch).
