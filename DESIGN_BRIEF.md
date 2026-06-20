# Design brief — dsaenztagarro.github.io

> Hand this to the **Claude Design** session. It is a Claude Code session working on
> this repository, on branch `design/refresh` (cut from `migrate/astro`).

## Goal

Style the public blog `dsaenztagarro.github.io` to match the **"Engineer"** product
aesthetic. It's an **Astro 5** site. The structure, content and routing are already in
place — this pass is **styling only**.

## You own (and may edit)

- `src/styles/global.css` — design tokens as CSS variables: color, type scale, spacing,
  radii, shadows. This is the primary surface.
- The markup and scoped `<style>` blocks in `src/components/*` and `src/layouts/*`.
- The Expressive Code code-block theme in `astro.config.mjs` (the `themes` /
  `styleOverrides` of the `expressiveCode({...})` integration only).

## Do NOT touch

- `src/content/*` (post content), the routing logic in `src/pages/*`, the integration
  wiring in `astro.config.mjs`, `src/content.config.ts`, or `.github/workflows/`.
  Keep content and routes intact — style, don't restructure.

## Visual direction

Reference Engineer's visual language (<https://engineer.dsaenz.dev>): calm, editorial,
serif headings over a warm off-white, restrained accent palette, generous whitespace,
and the donut/bar data-viz styling seen in the MCP analysis app.

## Deliverables

1. A light **and** dark token set in `global.css`.
2. A refined post-reading layout (`src/layouts/BlogPost.astro`): ~70ch measure, strong
   typographic hierarchy, styled code blocks, and figure/caption treatment for the
   mcp-rune screenshots.
3. An index / post-list (`src/pages/index.astro` + `src/components/PostCard.astro`) with
   hero-image cards.
4. Header and footer (`src/components/Header.astro`, `Footer.astro`) with GitHub and
   LinkedIn links (already wired via `src/consts.ts`).

## Constraints & workflow

- Keep it fast and static — no heavy JS frameworks.
- Verify with `npm run dev` and `npm run build` before committing.
- Commit to `design/refresh`. Changes are reviewed and merged back into `migrate/astro`.
